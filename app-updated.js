/* app.js - UPDATED WITH EXCEL LOADING */
(function() {
  let activeMonth = 'All Q1';
  let currentData = null;  // Store loaded Excel data
  
  // ... [KEEP ALL EXISTING FORMATTING FUNCTIONS] ...
  function formatCurrencyLakhs(val) {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
    return `₹${(val / 100000).toFixed(2)}L`;
  }
  function formatCurrencyThousands(val) {
    return `₹${(val / 1000).toFixed(1)}K`;
  }
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function formatIndianCurrency(num) {
    const x = num.toString().split('.');
    let lastThree = x[0].substring(x[0].length - 3);
    const otherLines = x[0].substring(0, x[0].length - 3);
    if (otherLines !== '') lastThree = ',' + lastThree;
    const res = otherLines.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return '₹' + res + (x.length > 1 ? '.' + x[1].substring(0, 2) : '');
  }

  // ============================================
  // NEW: EXCEL UPLOAD HANDLER
  // ============================================
  function setupExcelUploader() {
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('csvFileInput');
    
    if (!uploadBtn || !fileInput) return;
    
    uploadBtn.addEventListener('click', () => {
      fileInput.value = '';  // Reset
      fileInput.click();
    });
    
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      // Check file type
      if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        alert('⚠️  Please upload an Excel file (.xlsx or .xls)');
        return;
      }
      
      try {
        console.log("📊 Loading Excel file:", file.name);
        uploadBtn.innerText = "Loading...";
        uploadBtn.disabled = true;
        
        // Parse Excel
        const parsedData = await window.ExcelLoader.parseExcelFile(file);
        
        if (!parsedData) {
          alert('❌ Failed to parse Excel file');
          uploadBtn.innerText = "Import Excel CSV";
          uploadBtn.disabled = false;
          return;
        }
        
        // Check for validation errors
        if (parsedData.errors && parsedData.errors.length > 0) {
          console.warn("⚠️  Data validation errors:", parsedData.errors);
          const shouldContinue = confirm(
            `Found ${parsedData.errors.length} validation issues.\n\nSee console for details.\n\nContinue anyway?`
          );
          if (!shouldContinue) {
            uploadBtn.innerText = "Import Excel CSV";
            uploadBtn.disabled = false;
            return;
          }
        }
        
        // Store parsed data
        currentData = parsedData;
        
        // Reconcile with hardcoded data to show mismatches
        const report = window.ExcelLoader.reconcileData(parsedData, window.DashboardData);
        
        if (!report.leadsData.match || !report.pipelineData.match) {
          console.warn("📊 Reconciliation Report:");
          console.table(report.leadsData.mismatches);
          console.table(report.pipelineData.mismatches);
          
          const mismatchCount = (report.leadsData.mismatches.length + report.pipelineData.mismatches.length);
          console.warn(`Found ${mismatchCount} data mismatches between Excel and hardcoded values`);
        }
        
        alert(`✅ Successfully loaded ${file.name}!\n\n` +
              `Leads: ${parsedData.leadsData.length} rows\n` +
              `Pipeline: ${parsedData.pipelineData.length} rows\n\n` +
              `Check console for reconciliation details.`);
        
        uploadBtn.innerText = "Import Excel CSV";
        uploadBtn.disabled = false;
        
        // Update dashboard with new data
        updateDashboardWithExcelData(parsedData);
        
      } catch (err) {
        console.error("Error loading Excel:", err);
        alert(`❌ Error: ${err.message}`);
        uploadBtn.innerText = "Import Excel CSV";
        uploadBtn.disabled = false;
      }
    });
  }

  // ============================================
  // NEW: UPDATE DASHBOARD WITH EXCEL DATA
  // ============================================
  function updateDashboardWithExcelData(excelData) {
    if (!excelData.leadsData || excelData.leadsData.length === 0) {
      alert("No valid data found in Excel");
      return;
    }
    
    // Update window.DashboardData with Excel data
    window.DashboardData.leadsData = excelData.leadsData.map(row => ({
      month: row.month,
      website: row.website,
      call: row.call,
      whatsapp: row.whatsapp,
      mail: row.mail,
      tollFree: row.tollFree,
      ecommerce: row.ecommerce,
      facebook: row.facebook,
      total: row.total
    }));
    
    if (excelData.pipelineData && excelData.pipelineData.length > 0) {
      window.DashboardData.pipelineData = excelData.pipelineData.map(row => ({
        month: row.month,
        conversions: row.conversions,
        value: row.value,
        followUp: row.followUp,
        quoteGiven: row.quoteGiven,
        converted: row.converted,
        quoteLive: row.quoteLive,
        quoteLost: row.quoteLost,
        saleLost: row.saleLost,
        noResponse: row.noResponse,
        coldEnquiry: row.coldEnquiry
      }));
    }
    
    console.log("✓ Dashboard updated with Excel data");
    updateDashboard();
  }

  // ... [KEEP ALL EXISTING UPDATE FUNCTIONS: updateKPIs, updateMonthlyTargets, etc.] ...
  
  function updateKPIs(data) {
    document.getElementById('totalLeadsVal').innerText = formatNumber(data.totalLeads);
    document.getElementById('totalLeadsSub').innerText = `FB: ${formatNumber(data.fbLeads)} · Others: ${formatNumber(data.otherLeads)}`;
    document.getElementById('totalSpendVal').innerText = data.totalSpend < 100000 ? formatCurrencyThousands(data.totalSpend) : formatCurrencyLakhs(data.totalSpend);
    document.getElementById('totalSpendSub').innerText = `Meta ${formatCurrencyThousands(data.metaSpend)} · Google ${formatCurrencyThousands(data.googleSpend)}`;
    document.getElementById('conversionsVal').innerText = formatNumber(data.totalConversions);
    document.getElementById('conversionsSub').innerText = `Conv. rate: ${data.convRate.toFixed(2)}%`;
    document.getElementById('convValueVal').innerText = formatCurrencyLakhs(data.totalConvValue);
    document.getElementById('convValueSub').innerText = `ROAS: ${data.roas.toFixed(1)}x`;
    const metaCpl = data.fbLeads > 0 ? Math.round(data.metaSpend / data.fbLeads) : 0;
    document.getElementById('metaCplVal').innerText = `₹${metaCpl}`;
    document.getElementById('metaCplSub').innerText = activeMonth === 'All Q1' ? 'Best: Feb ₹58' : `Active Month CPL`;
    document.getElementById('organicClicksVal').innerText = formatNumber(data.totalSeoClicks);
    document.getElementById('organicClicksSub').innerText = `Avg CTR: ${data.avgSeoCtr.toFixed(1)}%`;
    document.getElementById('costPerConvVal').innerText = `₹${Math.round(data.costPerConv)}`;
    document.getElementById('costPerConvSub').innerText = 'Across all channels';
    const targetLabel = activeMonth === 'All Q1' ? '₹1.5Cr (3×50L) target' : '₹50L monthly target';
    document.getElementById('targetAchievedVal').innerText = `${Math.round(data.targetPct)}%`;
    document.getElementById('targetAchievedSub').innerText = `vs ${targetLabel}`;
    const targetStatusEl = document.getElementById('targetStatusText');
    if (data.targetPct >= 100) {
      targetStatusEl.innerText = "Exceeded monthly target";
      targetStatusEl.style.color = "var(--accent-emerald)";
    } else {
      targetStatusEl.innerText = "Below monthly target";
      targetStatusEl.style.color = "var(--accent-rose)";
    }
  }
  
  function updateMonthlyTargets() {
    const dataObj = window.DashboardData;
    const janVal = 2708243;
    const febVal = 2553303;
    const marVal = 7985951;
    const janPct = (janVal / dataObj.MONTHLY_TARGET) * 100;
    const febPct = (febVal / dataObj.MONTHLY_TARGET) * 100;
    const marPct = (marVal / dataObj.MONTHLY_TARGET) * 100;
    document.getElementById('janTargetPct').innerText = `${Math.round(janPct)}%`;
    document.getElementById('febTargetPct').innerText = `${Math.round(febPct)}%`;
    document.getElementById('marTargetPct').innerText = `${Math.round(marPct)}%`;
    const janBar = document.getElementById('janProgressBar');
    const febBar = document.getElementById('febProgressBar');
    const marBar = document.getElementById('marProgressBar');
    janBar.style.width = `${Math.min(janPct, 100)}%`;
    febBar.style.width = `${Math.min(febPct, 100)}%`;
    marBar.style.width = `${Math.min(marPct, 100)}%`;
    janBar.className = `progress-bar ${janPct >= 100 ? 'hit' : 'miss'}`;
    febBar.className = `progress-bar ${febPct >= 100 ? 'hit' : 'miss'}`;
    marBar.className = `progress-bar ${marPct >= 100 ? 'hit' : 'miss'}`;
    document.getElementById('janTargetPct').className = janPct >= 100 ? 'target-pct hit' : 'target-pct miss';
    document.getElementById('febTargetPct').className = febPct >= 100 ? 'target-pct hit' : 'target-pct miss';
    document.getElementById('marTargetPct').className = marPct >= 100 ? 'target-pct hit' : 'target-pct miss';
  }

  // ... [KEEP ALL OTHER FUNCTIONS UNCHANGED] ...
  
  function updateDashboard() {
    const dataObj = window.DashboardData;
    const data = dataObj.getFilteredData(activeMonth);
    updateKPIs(data);
    updateMonthlyTargets();
    // ... call other update functions
    console.log("✓ Dashboard updated");
  }

  function setupFilters() {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeMonth = tab.dataset.month;
        updateDashboard();
      });
    });
  }

  // ============================================
  // INIT
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Dashboard initializing...");
    
    // Check if Excel loader is available
    if (!window.ExcelLoader) {
      console.warn("⚠️  Excel Loader not loaded. Add excel-loader.js to HTML");
    }
    
    setupFilters();
    setupExcelUploader();
    updateDashboard();
    console.log("✓ Dashboard ready");
  });
})();
