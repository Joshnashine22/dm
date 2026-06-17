// ============================================
// AUTO-LOADING EXCEL DATA MODULE
// Loads Excel file from project folder + validates
// Updates dashboard data automatically
// ============================================

window.ExcelDataLoader = {
  
  excelFilePath: './Dm_Dashboard_-_Data_s.xlsx',
  validationErrors: [],
  validationWarnings: [],
  
  // ============================================
  // EXCEL DATE CONVERSION
  // ============================================
  
  excelDateToJSDate(serialDate) {
    if (typeof serialDate !== 'number' || serialDate < 1) return null;
    try {
      const excelEpoch = new Date(1900, 0, 1);
      const jsDate = new Date(excelEpoch.getTime() + (serialDate - 1) * 24 * 60 * 60 * 1000);
      return jsDate;
    } catch (e) {
      return null;
    }
  },
  
  getMonthName(serialDate) {
    if (typeof serialDate === 'string') {
      return serialDate.trim();
    }
    const date = this.excelDateToJSDate(serialDate);
    if (!date) return `Date_${serialDate}`;
    const months = ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"];
    return months[date.getMonth()];
  },
  
  // ============================================
  // DATA VALIDATION
  // ============================================
  
  validateLeadsRow(row, rowIndex) {
    const errors = [];
    const warnings = [];
    
    // Check required fields
    if (!row.month) errors.push(`Row ${rowIndex}: Missing month`);
    if (row.total === undefined || row.total === null || row.total === '') {
      errors.push(`Row ${rowIndex}: Missing total leads`);
    }
    
    // Check numeric fields
    const numericFields = ['website', 'call', 'whatsapp', 'mail', 'tollFree', 'ecommerce', 'facebook', 'total'];
    numericFields.forEach(field => {
      if (row[field] !== undefined && row[field] !== null && row[field] !== '') {
        const val = parseFloat(row[field]);
        if (isNaN(val)) {
          errors.push(`Row ${rowIndex}, ${field}: "${row[field]}" is not a number`);
        } else if (val < 0) {
          errors.push(`Row ${rowIndex}, ${field}: Value ${val} cannot be negative`);
        } else {
          row[field] = val; // Ensure it's a number
        }
      }
    });
    
    // Cross-validation: total should roughly equal sum
    const sum = (row.website || 0) + (row.call || 0) + (row.whatsapp || 0) + 
                (row.mail || 0) + (row.tollFree || 0) + (row.ecommerce || 0) + (row.facebook || 0);
    if (row.total && Math.abs(sum - row.total) > 5) {
      warnings.push(`Row ${rowIndex} (${row.month}): Total (${row.total}) ≠ sum of channels (${sum})`);
    }
    
    return { valid: errors.length === 0, errors, warnings };
  },
  
  validatePipelineRow(row, rowIndex) {
    const errors = [];
    const warnings = [];
    
    // Check required fields
    if (!row.month) errors.push(`Row ${rowIndex}: Missing month`);
    if (row.conversions === undefined || row.conversions === null || row.conversions === '') {
      errors.push(`Row ${rowIndex}: Missing conversions`);
    }
    if (row.value === undefined || row.value === null || row.value === '') {
      errors.push(`Row ${rowIndex}: Missing conversion value`);
    }
    
    // Check numeric fields
    const numericFields = ['conversions', 'value', 'followUp', 'quoteGiven', 'converted', 'quoteLive', 'quoteLost', 'saleLost', 'noResponse', 'coldEnquiry'];
    numericFields.forEach(field => {
      if (row[field] !== undefined && row[field] !== null && row[field] !== '') {
        const val = parseFloat(row[field]);
        if (isNaN(val)) {
          errors.push(`Row ${rowIndex}, ${field}: "${row[field]}" is not a number`);
        } else if (val < 0) {
          errors.push(`Row ${rowIndex}, ${field}: Value ${val} cannot be negative`);
        } else {
          row[field] = val;
        }
      }
    });
    
    return { valid: errors.length === 0, errors, warnings };
  },
  
  // ============================================
  // EXCEL PARSING
  // ============================================
  
  parseExcelData(workbook) {
    console.log('📊 Parsing Excel data...');
    
    const sheet = workbook.Sheets["DM Leads"];
    if (!sheet) {
      throw new Error("❌ Sheet 'DM Leads' not found");
    }
    
    const allRows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    console.log(`✓ Read ${allRows.length} rows from sheet`);
    
    // Convert to array to handle column offset
    const rowsAsArrays = allRows.map(row => Object.values(row));
    
    // Detect empty first column offset
    let colOffset = 0;
    if (rowsAsArrays[0] && rowsAsArrays[0][0] === '') {
      colOffset = 1;
      console.warn(`⚠️ Empty first column detected`);
    }
    
    const leadsData = [];
    const pipelineData = [];
    
    let leadsStart = -1;
    let convStart = -1;
    
    // Find table boundaries
    for (let i = 0; i < rowsAsArrays.length; i++) {
      const row = rowsAsArrays[i];
      const col1 = row[colOffset];
      
      if (col1 === 'S.No' && row.includes('TotaL Leads')) {
        leadsStart = i + 1;
        console.info(`✓ Found Leads header at row ${i}`);
      }
      
      if (col1 === 'S.No' && row.includes('Conversion')) {
        convStart = i + 1;
        console.info(`✓ Found Conversion header at row ${i}`);
      }
    }
    
    // Extract leads data
    if (leadsStart > 0) {
      console.info(`📋 Extracting leads data...`);
      
      for (let i = leadsStart; i < rowsAsArrays.length; i++) {
        const row = rowsAsArrays[i];
        if (!row || row.length < colOffset + 2) continue;
        
        const sno = row[colOffset];
        
        if (sno === 'Total' || sno === 'S.No' || sno === '' || sno === undefined) break;
        if (row.includes('Conversion') && row.includes('Follow Up')) break;
        if (isNaN(sno)) continue;
        
        const month = this.getMonthName(row[colOffset + 1]);
        const leadsRow = {
          month,
          website: row[colOffset + 3] || 0,
          call: row[colOffset + 4] || 0,
          whatsapp: row[colOffset + 5] || 0,
          mail: row[colOffset + 6] || 0,
          tollFree: row[colOffset + 7] || 0,
          ecommerce: row[colOffset + 8] || 0,
          facebook: row[colOffset + 9] || 0,
          total: row[colOffset + 2] || 0
        };
        
        const validation = this.validateLeadsRow(leadsRow, i);
        if (!validation.valid) {
          this.validationErrors.push(...validation.errors);
        }
        if (validation.warnings.length > 0) {
          this.validationWarnings.push(...validation.warnings);
        }
        
        leadsData.push(leadsRow);
        console.log(`  ✓ ${month}: ${leadsRow.total} leads`);
      }
    }
    
    // Extract pipeline data
    if (convStart > 0) {
      console.info(`📋 Extracting conversion data...`);
      
      for (let i = convStart; i < rowsAsArrays.length; i++) {
        const row = rowsAsArrays[i];
        if (!row || row.length < colOffset + 2) continue;
        
        const sno = row[colOffset];
        
        if (sno === 'Total' || sno === 'S.No' || sno === '' || sno === undefined) break;
        if (isNaN(sno)) continue;
        
        const month = this.getMonthName(row[colOffset + 1]);
        const pipelineRow = {
          month,
          conversions: row[colOffset + 2] || 0,
          value: row[colOffset + 3] || 0,
          followUp: row[colOffset + 4] || 0,
          quoteGiven: row[colOffset + 5] || 0,
          converted: row[colOffset + 6] || 0,
          quoteLive: row[colOffset + 7] || 0,
          quoteLost: row[colOffset + 8] || 0,
          saleLost: row[colOffset + 9] || 0,
          noResponse: row[colOffset + 10] || 0,
          coldEnquiry: row[colOffset + 11] || 0
        };
        
        const validation = this.validatePipelineRow(pipelineRow, i);
        if (!validation.valid) {
          this.validationErrors.push(...validation.errors);
        }
        if (validation.warnings.length > 0) {
          this.validationWarnings.push(...validation.warnings);
        }
        
        pipelineData.push(pipelineRow);
        console.log(`  ✓ ${month}: ${pipelineRow.conversions} conversions, ₹${(pipelineRow.value/100000).toFixed(2)}L`);
      }
    }
    
    return { leadsData, pipelineData };
  },
  
  // ============================================
  // PRINT VALIDATION REPORT
  // ============================================
  
  printReport() {
    console.log('%c📊 EXCEL DATA VALIDATION REPORT', 'color: #1f4e79; font-size: 14px; font-weight: bold;');
    console.log(`Loaded from: ${this.excelFilePath}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('---');
    
    if (this.validationErrors.length > 0) {
      console.error(`❌ Errors (${this.validationErrors.length}):`);
      this.validationErrors.forEach(err => console.error(`  • ${err}`));
    } else {
      console.log(`✓ No errors`);
    }
    
    if (this.validationWarnings.length > 0) {
      console.warn(`⚠️ Warnings (${this.validationWarnings.length}):`);
      this.validationWarnings.forEach(warn => console.warn(`  • ${warn}`));
    }
    
    if (this.validationErrors.length === 0 && this.validationWarnings.length === 0) {
      console.log('%c✓ ALL DATA VALIDATED SUCCESSFULLY!', 'color: green; font-weight: bold;');
    }
  },
  
  // ============================================
  // MAIN LOAD FUNCTION
  // ============================================
  
  async load() {
    return new Promise((resolve, reject) => {
      console.log(`📁 Loading Excel file: ${this.excelFilePath}`);
      
      if (!window.XLSX) {
        console.error('❌ XLSX library not loaded. Add to HTML: <script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>');
        reject(new Error('XLSX library not found'));
        return;
      }
      
      fetch(this.excelFilePath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`❌ Could not find ${this.excelFilePath} - Make sure Excel file is in same folder as index.html`);
          }
          return response.arrayBuffer();
        })
        .then(arrayBuffer => {
          try {
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            console.log(`✓ Excel file loaded`);
            
            const { leadsData, pipelineData } = this.parseExcelData(workbook);
            
            // Update dashboard data
            window.DashboardData.leadsData = leadsData;
            window.DashboardData.pipelineData = pipelineData;
            
            this.printReport();
            
            console.log(`✓ Dashboard data updated: ${leadsData.length} months of leads, ${pipelineData.length} months of pipeline`);
            
            resolve({ leadsData, pipelineData });
          } catch (err) {
            console.error(`❌ Error parsing Excel: ${err.message}`);
            reject(err);
          }
        })
        .catch(err => {
          console.error(`❌ Error loading Excel file:`, err.message);
          reject(err);
        });
    });
  }
};

// ============================================
// AUTO-LOAD ON PAGE INIT
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 Initializing Excel Data Loader...');
  
  try {
    await window.ExcelDataLoader.load();
    
    // If dashboard update function exists, call it
    if (typeof updateDashboard === 'function') {
      console.log('📊 Updating dashboard with Excel data...');
      updateDashboard();
      console.log('✓ Dashboard updated');
    }
  } catch (err) {
    console.error('❌ Failed to load Excel data:', err.message);
    console.warn('⚠️ Dashboard will use hardcoded fallback data from data.js');
  }
});

console.log('✓ Excel Data Loader module loaded');
