/* excel-auto-loader.js
   ============================================
   Automatically loads data from Excel file
   Detects all quarters (Q1, Q2, Q3, Q4)
   Updates dropdown dynamically
   ============================================ */

(function() {
  
  async function loadExcelData() {
    try {
      console.log('📁 Loading Excel file...');
      
      // Fetch Excel file from project root
      const response = await fetch('./Dm_Dashboard_-_Data_s.xlsx');
      if (!response.ok) {
        throw new Error('Excel file not found in project root');
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      
      console.log('✓ Excel file loaded');
      console.log('📊 Sheets:', workbook.SheetNames);
      
      // Parse DM Leads sheet
      const dmLeadsSheet = workbook.Sheets['DM Leads'];
      if (!dmLeadsSheet) {
        throw new Error('DM Leads sheet not found');
      }
      
      const dmLeadsData = XLSX.utils.sheet_to_json(dmLeadsSheet);
      console.log('✓ Parsed DM Leads data:', dmLeadsData.length, 'rows');
      
      // Extract leads data (skip empty rows and non-month rows)
      const leadsData = [];
      const monthMap = {
        46023: 'January', 46054: 'February', 46082: 'March',
        46113: 'April', 46143: 'May', 46174: 'June',
        46205: 'July', 46235: 'August', 46266: 'September',
        46296: 'October', 46327: 'November', 46357: 'December'
      };
      
      dmLeadsData.forEach((row, idx) => {
        // Skip header rows and total rows
        if (!row['S.No'] || row['S.No'] === 'S.No' || row['S.No'] === 'Total') return;
        
        const monthKey = row['Month'];
        let monthName = monthMap[monthKey] || monthKey;
        
        // Try parsing month if it's a serial number
        if (typeof monthKey === 'number') {
          monthName = monthMap[monthKey] || `Month${monthKey}`;
        }
        
        // Only add if we have total leads
        const totalLeads = parseFloat(row['TotaL Leads']) || 0;
        if (totalLeads > 0) {
          leadsData.push({
            month: monthName,
            website: parseFloat(row['Website']) || 0,
            call: parseFloat(row['Call']) || 0,
            whatsapp: parseFloat(row['Whatsapp']) || 0,
            mail: parseFloat(row['Mail']) || 0,
            tollFree: parseFloat(row['Toll-Free']) || 0,
            ecommerce: parseFloat(row['E-commerce']) || 0,
            facebook: parseFloat(row['Facebook']) || 0,
            total: totalLeads
          });
        }
      });
      
      console.log('✓ Extracted leads:', leadsData.map(d => d.month).join(', '));
      
      // Extract conversion/pipeline data
      const pipelineData = [];
      const conversionStartIdx = dmLeadsData.findIndex(row => 
        row['S.No'] === 'S.No' && row['Conversion'] !== undefined
      );
      
      if (conversionStartIdx > -1) {
        const conversionRows = dmLeadsData.slice(conversionStartIdx + 1);
        
        conversionRows.forEach(row => {
          if (!row['S.No'] || row['S.No'] === 'S.No' || row['S.No'] === 'Total') return;
          
          const monthKey = row['Month'];
          let monthName = monthMap[monthKey] || monthKey;
          if (typeof monthKey === 'number') {
            monthName = monthMap[monthKey] || `Month${monthKey}`;
          }
          
          const conversions = parseFloat(row['Conversion']) || 0;
          if (conversions > 0 || conversions === 0) {
            pipelineData.push({
              month: monthName,
              conversions: conversions,
              value: parseFloat(row['Conversion Value']) || 0,
              followUp: parseFloat(row['Follow Up']) || 0,
              quoteGiven: parseFloat(row['Quote Given']) || 0,
              converted: parseFloat(row['Converted']) || 0,
              quoteLive: parseFloat(row['Quote Live']) || 0,
              quoteLost: parseFloat(row['Quote Lost']) || 0,
              saleLost: parseFloat(row['Sale Lost']) || 0,
              noResponse: parseFloat(row['No response']) || 0,
              coldEnquiry: parseFloat(row['Cold Enquiry']) || 0
            });
          }
        });
      }
      
      console.log('✓ Extracted conversions:', pipelineData.map(d => d.month).join(', '));
      
      // Update global data with loaded data
      if (window.DashboardData && leadsData.length > 0) {
        window.DashboardData.leadsData = leadsData;
        if (pipelineData.length > 0) {
          window.DashboardData.pipelineData = pipelineData;
        }
        
        console.log('✓ Dashboard data updated');
        console.log('📊 Months loaded:', leadsData.map(d => d.month).join(', '));
        
        return true;
      } else {
        console.warn('⚠ No valid data found in Excel');
        return false;
      }
      
    } catch (error) {
      console.error('❌ Excel loading error:', error.message);
      console.log('ℹ Using fallback hardcoded data from data.js');
      return false;
    }
  }
  
  // Load Excel when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadExcelData);
  } else {
    loadExcelData();
  }
  
})();
