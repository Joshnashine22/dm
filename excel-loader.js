// ============================================
// EXCEL DATA LOADER + VALIDATOR
// Handles real Excel files with proper type parsing
// ============================================

// Helper: Convert Excel serial date to JS Date
function excelDateToJSDate(serialDate) {
  // Excel starts from Jan 1, 1900 (serial 1)
  // JavaScript epoch is Jan 1, 1970
  const excelEpoch = new Date(1900, 0, 1);
  const jsDate = new Date(excelEpoch.getTime() + (serialDate - 1) * 24 * 60 * 60 * 1000);
  return jsDate;
}

// Helper: Get month name from serial date or string
function parseMonth(value) {
  if (typeof value === 'number') {
    const date = excelDateToJSDate(value);
    const months = ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"];
    return months[date.getMonth()];
  }
  return String(value).trim();
}

// ============================================
// DATA VALIDATION SCHEMA
// ============================================
const DATA_SCHEMA = {
  leadsData: {
    expectedColumns: ['Month', 'Website', 'Call', 'Whatsapp', 'Mail', 'Toll-Free', 'Ecommerce', 'Facebook', 'Total'],
    rules: {
      Month: { type: 'string', required: true },
      Website: { type: 'number', required: true, min: 0 },
      Call: { type: 'number', required: true, min: 0 },
      Whatsapp: { type: 'number', required: true, min: 0 },
      Mail: { type: 'number', required: true, min: 0 },
      'Toll-Free': { type: 'number', required: true, min: 0 },
      Ecommerce: { type: 'number', required: true, min: 0 },
      Facebook: { type: 'number', required: true, min: 0 },
      Total: { type: 'number', required: true, min: 0 }
    }
  },
  pipelineData: {
    expectedColumns: ['Month', 'Conversions', 'Value', 'FollowUp', 'QuoteGiven', 'Converted', 'QuoteLive', 'QuoteLost', 'SaleLost', 'NoResponse', 'ColdEnquiry'],
    rules: {
      Month: { type: 'string', required: true },
      Conversions: { type: 'number', required: true, min: 0 },
      Value: { type: 'number', required: true, min: 0 },
      FollowUp: { type: 'number', required: true, min: 0 },
      QuoteGiven: { type: 'number', required: true, min: 0 },
      Converted: { type: 'number', required: true, min: 0 },
      QuoteLive: { type: 'number', required: true, min: 0 },
      QuoteLost: { type: 'number', required: true, min: 0 },
      SaleLost: { type: 'number', required: true, min: 0 },
      NoResponse: { type: 'number', required: true, min: 0 },
      ColdEnquiry: { type: 'number', required: true, min: 0 }
    }
  }
};

// ============================================
// VALIDATION FUNCTION
// ============================================
function validateRow(row, schema, rowIndex) {
  const errors = [];
  
  for (const [col, rule] of Object.entries(schema.rules)) {
    const value = row[col];
    
    // Check required
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors.push(`Row ${rowIndex}, ${col}: Required field is empty`);
      continue;
    }
    
    // Check type
    if (value !== undefined && value !== null) {
      if (rule.type === 'number' && typeof value !== 'number') {
        errors.push(`Row ${rowIndex}, ${col}: Expected number, got "${value}" (type: ${typeof value})`);
      }
      if (rule.type === 'string' && typeof value !== 'string') {
        errors.push(`Row ${rowIndex}, ${col}: Expected string, got "${value}"`);
      }
      
      // Check min value
      if (rule.min !== undefined && typeof value === 'number' && value < rule.min) {
        errors.push(`Row ${rowIndex}, ${col}: Value ${value} is below minimum ${rule.min}`);
      }
    }
  }
  
  return errors;
}

// ============================================
// RECONCILIATION - Compare to Hardcoded Data
// ============================================
function reconcileData(loadedData, hardcodedData) {
  const report = {
    leadsData: { match: true, mismatches: [] },
    pipelineData: { match: true, mismatches: [] }
  };
  
  // Check Leads
  if (loadedData.leadsData && hardcodedData.leadsData) {
    loadedData.leadsData.forEach((loaded, idx) => {
      const hardcoded = hardcodedData.leadsData[idx];
      if (hardcoded) {
        const keys = ['website', 'call', 'whatsapp', 'mail', 'tollFree', 'ecommerce', 'facebook', 'total'];
        keys.forEach(key => {
          if (loaded[key] !== hardcoded[key]) {
            report.leadsData.match = false;
            report.leadsData.mismatches.push({
              month: loaded.month,
              field: key,
              excel: loaded[key],
              hardcoded: hardcoded[key]
            });
          }
        });
      }
    });
  }
  
  // Check Pipeline
  if (loadedData.pipelineData && hardcodedData.pipelineData) {
    loadedData.pipelineData.forEach((loaded, idx) => {
      const hardcoded = hardcodedData.pipelineData[idx];
      if (hardcoded) {
        const keys = ['conversions', 'value', 'followUp', 'quoteGiven', 'converted', 'quoteLive', 'quoteLost', 'saleLost', 'noResponse', 'coldEnquiry'];
        keys.forEach(key => {
          if (loaded[key] !== hardcoded[key]) {
            report.pipelineData.match = false;
            report.pipelineData.mismatches.push({
              month: loaded.month,
              field: key,
              excel: loaded[key],
              hardcoded: hardcoded[key],
              diff: Math.abs(loaded[key] - hardcoded[key])
            });
          }
        });
      }
    });
  }
  
  return report;
}

// ============================================
// MAIN PARSER
// ============================================
async function parseExcelFile(file) {
  // You'll need to add: <script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script> to HTML
  
  if (!window.XLSX) {
    console.error("XLSX library not loaded. Add to HTML: <script src=\"https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js\"><\/script>");
    return null;
  }
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = window.XLSX.read(data, { type: 'array' });
        
        console.log("✓ Excel loaded. Sheets:", workbook.SheetNames);
        
        const parsedData = {
          leadsData: [],
          pipelineData: [],
          errors: []
        };
        
        // ========== Parse DM Leads Sheet ==========
        const leadsSheet = workbook.Sheets["DM Leads"];
        if (leadsSheet) {
          const leadsRows = window.XLSX.utils.sheet_to_json(leadsSheet);
          
          leadsRows.forEach((row, idx) => {
            // Skip empty rows or total rows
            if (!row['S.No'] || row['S.No'] === 'Total') return;
            
            const parsed = {
              month: parseMonth(row['Month']),
              website: parseInt(row['Website']) || 0,
              call: parseInt(row['Call']) || 0,
              whatsapp: parseInt(row['Whatsapp']) || 0,
              mail: parseInt(row['Mail']) || 0,
              tollFree: parseInt(row['Toll-Free']) || 0,
              ecommerce: parseInt(row['E-commerce']) || 0,
              facebook: parseInt(row['Facebook']) || 0,
              total: parseInt(row['TotaL Leads']) || 0
            };
            
            // Validate
            const validation = validateRow(parsed, DATA_SCHEMA.leadsData, idx);
            if (validation.length > 0) {
              parsedData.errors.push(...validation);
            }
            
            parsedData.leadsData.push(parsed);
          });
        }
        
        // ========== Parse Pipeline (Conversion) Data ==========
        const conversionRows = leadsRows.filter((row, idx) => {
          // These are typically in rows with 'Conversion' column
          return row['Conversion'] !== undefined && row['Conversion'] !== 'Total';
        });
        
        conversionRows.forEach((row, idx) => {
          const parsed = {
            month: parseMonth(row['Month']),
            conversions: parseInt(row['Conversion']) || 0,
            value: parseFloat(row['Conversion Value']) || 0,
            followUp: parseInt(row['Follow Up']) || 0,
            quoteGiven: parseInt(row['Quote Given']) || 0,
            converted: parseInt(row['Converted']) || 0,
            quoteLive: parseInt(row['Quote Live']) || 0,
            quoteLost: parseInt(row['Quote Lost']) || 0,
            saleLost: parseInt(row['Sale Lost']) || 0,
            noResponse: parseInt(row['No response']) || 0,
            coldEnquiry: parseInt(row['Cold Enquiry']) || 0
          };
          
          const validation = validateRow(parsed, DATA_SCHEMA.pipelineData, idx);
          if (validation.length > 0) {
            parsedData.errors.push(...validation);
          }
          
          parsedData.pipelineData.push(parsed);
        });
        
        // Report errors
        if (parsedData.errors.length > 0) {
          console.warn("⚠️  Validation errors found:");
          parsedData.errors.forEach(err => console.warn("  -", err));
        } else {
          console.log("✓ All data validated successfully");
        }
        
        resolve(parsedData);
      } catch (err) {
        reject(err);
      }
    };
    
    reader.onerror = () => reject(new Error("File read failed"));
    reader.readAsArrayBuffer(file);
  });
}

// ============================================
// EXPORT FOR USE IN app.js
// ============================================
window.ExcelLoader = {
  parseExcelFile,
  reconcileData,
  validateRow,
  excelDateToJSDate,
  parseMonth
};

console.log("✓ Excel Loader module loaded");
