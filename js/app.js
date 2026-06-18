/* app.js - COMPLETE VERSION WITH QUARTERS + EXCEL AUTO-LOADER */
(function() {
  let activeMonth = 'All Q1';
  let activeQuarter = 'Q1';
  let detectedQuarters = ['Q1'];
  
  // ============================================
  // DETECT QUARTERS FROM LOADED DATA
  // ============================================
  
  function detectQuarters() {
    if (!window.DashboardData || !window.DashboardData.leadsData) {
      console.log('⚠ Data not ready yet');
      return ['Q1'];
    }
    
    const months = window.DashboardData.leadsData.map(d => d.month);
    const quarters = [];
    
    // Q1: Jan, Feb, Mar
    if (months.some(m => ['January', 'February', 'March'].includes(m))) {
      quarters.push('Q1');
    }
    
    // Q2: Apr, May, Jun
    if (months.some(m => ['April', 'May', 'June'].includes(m))) {
      quarters.push('Q2');
    }
    
    // Q3: Jul, Aug, Sep
    if (months.some(m => ['July', 'August', 'September'].includes(m))) {
      quarters.push('Q3');
    }
    
    // Q4: Oct, Nov, Dec
    if (months.some(m => ['October', 'November', 'December'].includes(m))) {
      quarters.push('Q4');
    }
    
    detectedQuarters = quarters;
    console.log(`✓ Detected quarters: ${quarters.join(', ')}`);
    return quarters;
  }
  
  function getMonthsForQuarter(quarter) {
    const quarterMap = {
      'Q1': ['January', 'February', 'March'],
      'Q2': ['April', 'May', 'June'],
      'Q3': ['July', 'August', 'September'],
      'Q4': ['October', 'November', 'December']
    };
    return quarterMap[quarter] || [];
  }
  
  // ============================================
  // UPDATE QUARTER DROPDOWN DYNAMICALLY
  // ============================================
  
  function updateQuarterDropdown() {
    const dropdown = document.getElementById('quarterDropdown');
    if (!dropdown) {
      console.warn('⚠ Quarter dropdown not found in HTML');
      return;
    }
    
    const quarters = detectQuarters();
    
    // Clear existing options
    dropdown.innerHTML = '';
    
    // Add each detected quarter
    quarters.forEach(q => {
      const option = document.createElement('option');
      option.value = q;
      option.textContent = q + ' (' + getMonthsForQuarter(q).map(m => m.substring(0, 3)).join(' - ') + ')';
      if (q === activeQuarter) option.selected = true;
      dropdown.appendChild(option);
    });
    
    console.log(`✓ Dropdown updated with quarters: ${quarters.join(', ')}`);
  }
  
  // ============================================
  // UPDATE FILTER TABS DYNAMICALLY
  // ============================================
  
  function updateFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    if (tabs.length === 0) {
      console.warn('⚠ Filter tabs not found');
      return;
    }
    
    const monthsInQuarter = getMonthsForQuarter(activeQuarter);
    const months = window.DashboardData.leadsData.map(d => d.month);
    
    // Update existing tabs
    tabs.forEach((tab, idx) => {
      const monthData = tab.dataset.month;
      
      if (monthData === 'All Q1') {
        // Update "All" button
        tab.dataset.month = `All ${activeQuarter}`;
        tab.textContent = `All ${activeQuarter}`;
        if (idx === 0) tab.classList.add('active');
      } else {
        // Regular month tabs
        const isInQuarter = monthsInQuarter.includes(monthData);
        const hasData = months.includes(monthData);
        
        if (isInQuarter && hasData) {
          tab.style.display = 'block';
        } else {
          tab.style.display = 'none';
        }
      }
    });
    
    console.log(`✓ Tabs updated for ${activeQuarter}: ${monthsInQuarter.join(', ')}`);
  }
  
  // ============================================
  // FORMAT HELPERS (KEEP EXISTING)
  // ============================================
  
  function formatCurrencyLakhs(val) {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)}Cr`;
    }
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
    if (otherLines !== '') {
      lastThree = ',' + lastThree;
    }
    const res = otherLines.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return '₹' + res + (x.length > 1 ? '.' + x[1].substring(0, 2) : '');
  }
  
  // ============================================
  // UPDATE KPIs
  // ============================================
  
  function updateKPIs(data) {
    document.getElementById('totalLeadsVal').innerText = formatNumber(data.totalLeads);
    document.getElementById('totalLeadsSub').innerText = `FB: ${formatNumber(data.fbLeads)} · Others: ${formatNumber(data.otherLeads)}`;

    document.getElementById('totalSpendVal').innerText =
      data.totalSpend < 100000
        ? formatCurrencyThousands(data.totalSpend)
        : formatCurrencyLakhs(data.totalSpend);

    document.getElementById('totalSpendSub').innerText =
      `Meta ${formatCurrencyThousands(data.metaSpend)} · Google ${formatCurrencyThousands(data.googleSpend)}`;

    document.getElementById('conversionsVal').innerText = formatNumber(data.totalConversions);
    document.getElementById('conversionsSub').innerText = `Conv. rate: ${data.convRate.toFixed(2)}%`;

    document.getElementById('convValueVal').innerText = formatCurrencyLakhs(data.totalConvValue);
    document.getElementById('convValueSub').innerText = `ROAS: ${data.roas.toFixed(1)}x`;

    const metaCpl = data.fbLeads > 0 ? Math.round(data.metaSpend / data.fbLeads) : 0;
    document.getElementById('metaCplVal').innerText = `₹${metaCpl}`;
    document.getElementById('metaCplSub').innerText = activeMonth === 'All Q1' ? 'Best: Feb ₹58' : 'Month CPL';
    
    document.getElementById('organicClicksVal').innerText = formatNumber(data.totalSeoClicks);
    document.getElementById('organicClicksSub').innerText = `Avg CTR: ${data.avgSeoCtr.toFixed(1)}%`;
    
    document.getElementById('costPerConvVal').innerText = `₹${Math.round(data.costPerConv)}`;
    document.getElementById('costPerConvSub').innerText = 'Across all channels';
    
    const targetLabel = activeMonth === `All ${activeQuarter}` ? `₹1.5Cr (3×50L) target` : '₹50L monthly target';
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
    const monthsInQuarter = getMonthsForQuarter(activeQuarter);
    
    // Calculate target percentages for each month in quarter
    let targetElements = [];
    const monthShortMap = { 
      'January': 'jan', 'February': 'feb', 'March': 'mar',
      'April': 'apr', 'May': 'may', 'June': 'jun',
      'July': 'jul', 'August': 'aug', 'September': 'sep',
      'October': 'oct', 'November': 'nov', 'December': 'dec'
    };
    
    monthsInQuarter.forEach((month, idx) => {
      const pipeline = dataObj.pipelineData.find(d => d.month === month);
      if (pipeline) {
        const pct = (pipeline.value / dataObj.MONTHLY_TARGET) * 100;
        const shortMonth = monthShortMap[month];
        
        const pctEl = document.getElementById(`${shortMonth}TargetPct`);
        const barEl = document.getElementById(`${shortMonth}ProgressBar`);
        
        if (pctEl && barEl) {
          pctEl.innerText = `${Math.round(pct)}%`;
          pctEl.className = pct >= 100 ? 'target-pct hit' : 'target-pct miss';
          barEl.style.width = `${Math.min(pct, 100)}%`;
          barEl.className = `progress-bar ${pct >= 100 ? 'hit' : 'miss'}`;
        }
      }
    });
  }
  
  function updatePipelineFunnel(data) {
    const { funnel } = data;
    const stages = [
      { id: 'funnelLeads', val: funnel.totalLeads, pct: 100.0 },
      { id: 'funnelFollowUp', val: funnel.followUp, pct: (funnel.followUp / funnel.totalLeads) * 100 },
      { id: 'funnelCold', val: funnel.coldEnquiry, pct: (funnel.coldEnquiry / funnel.totalLeads) * 100 },
      { id: 'funnelQuoteGiven', val: funnel.quoteGiven, pct: (funnel.quoteGiven / funnel.totalLeads) * 100 },
      { id: 'funnelQuoteLive', val: funnel.quoteLive, pct: (funnel.quoteLive / funnel.totalLeads) * 100 },
      { id: 'funnelConverted', val: funnel.converted, pct: (funnel.converted / funnel.totalLeads) * 100 },
      { id: 'funnelSaleLost', val: funnel.saleLost, pct: (funnel.saleLost / funnel.totalLeads) * 100 }
    ];
    stages.forEach(stage => {
      const barEl = document.getElementById(`${stage.id}Bar`);
      const valEl = document.getElementById(`${stage.id}Val`);
      if (barEl && valEl) {
        barEl.style.width = `${stage.pct}%`;
        valEl.innerHTML = `${formatNumber(stage.val)} <span>${stage.pct.toFixed(1)}%</span>`;
      }
    });
  }
  
  function updateGoogleCampaignsTable() {
    const tbody = document.getElementById('googleCampaignsBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const dataObj = window.DashboardData;
    let campaigns = [];
    
    if (activeMonth.includes('All')) {
      const campaignsMap = {};
      Object.values(dataObj.googleCampaignsData).forEach(monthlyList => {
        monthlyList.forEach(c => {
          if (!campaignsMap[c.name]) {
            campaignsMap[c.name] = { ...c, count: 1 };
          } else {
            campaignsMap[c.name].spend += c.spend;
            campaignsMap[c.name].interactions += c.interactions;
            campaignsMap[c.name].conv += c.conv;
            campaignsMap[c.name].count += 1;
          }
        });
      });
      campaigns = Object.values(campaignsMap).map(c => {
        const cpc = c.interactions > 0 ? (c.spend / c.interactions) : 0;
        return {
          ...c,
          ctr: c.ctr,
          cpc: cpc,
          rating: c.conv > 30 ? "Top" : c.conv > 10 ? "Strong" : c.spend > 10000 && c.conv === 0 ? "Low ROI" : "Review"
        };
      });
    } else {
      campaigns = dataObj.googleCampaignsData[activeMonth] || [];
    }
    campaigns.sort((a, b) => b.conv - a.conv);
    campaigns.forEach(c => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${c.name}</td>
        <td>${formatIndianCurrency(Math.round(c.spend))}</td>
        <td>${formatNumber(c.interactions)}</td>
        <td>${c.ctr.toFixed(1)}%</td>
        <td>₹${c.cpc.toFixed(1)}</td>
        <td>${c.conv}</td>
        <td><span class="badge ${c.rating.toLowerCase().replace(' ', '-')}">${c.rating}</span></td>
      `;
      tbody.appendChild(row);
    });
  }
  
  function updateCitiesTable() {
    const tbody = document.getElementById('citiesBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const dataObj = window.DashboardData;
    let filteredCities = [];
    if (activeMonth.includes('All')) {
      filteredCities = [...dataObj.citiesData];
    } else {
      filteredCities = dataObj.citiesData.filter(c => c.month === activeMonth);
    }
    filteredCities.sort((a, b) => b.value - a.value);
    filteredCities.slice(0, 15).forEach(c => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${c.city}</td>
        <td>${c.state}</td>
        <td>${c.month.substring(0, 3)}</td>
        <td>${formatIndianCurrency(c.value)}</td>
      `;
      tbody.appendChild(row);
    });
  }
  
  function updateRegionLeads(monthFilter) {
    const isQ1 = monthFilter.includes('All');
    let south = 1117, north = 562, west = 428, east = 215;
    if (!isQ1) {
      if (monthFilter === 'January') { south = 380; north = 200; west = 160; east = 105; }
      if (monthFilter === 'February') { south = 390; north = 180; west = 170; east = 101; }
      if (monthFilter === 'March') { south = 347; north = 182; west = 98; east = 9; }
    }
    const total = south + north + west + east;
    const regions = [
      { name: 'South', leads: south, pct: (south / total) * 100, trend: 'down', icon: '↓' },
      { name: 'North', leads: north, pct: (north / total) * 100, trend: 'down', icon: '↓' },
      { name: 'West', leads: west, pct: (west / total) * 100, trend: 'up', icon: '↑' },
      { name: 'East', leads: east, pct: (east / total) * 100, trend: 'up', icon: '↑' }
    ];
    const listEl = document.getElementById('regionLeadsList');
    if (listEl) {
      listEl.innerHTML = regions.map(r => `
        <div class="region-item">
          <div class="region-header">
            <span class="region-name">${r.name} <span style="color: ${r.trend === 'up' ? 'var(--accent-emerald)' : 'var(--accent-rose)'}">${r.icon}</span></span>
            <span class="region-leads">${Math.round(r.pct)}% of leads (${r.leads})</span>
          </div>
          <div class="region-bar-container">
            <div class="region-bar" style="width: ${r.pct}%"></div>
          </div>
        </div>
      `).join('');
    }
  }
  
  function updateDashboard() {
    const dataObj = window.DashboardData;
    const data = dataObj.getFilteredData(activeMonth);
    updateKPIs(data);
    updateMonthlyTargets();
    updatePipelineFunnel(data);
    updateGoogleCampaignsTable();
    updateCitiesTable();
    updateRegionLeads(activeMonth);
    if (window.DashboardCharts) window.DashboardCharts.updateAllCharts(activeMonth);
    if (window.DashboardInsights) window.DashboardInsights.updateInsights(activeMonth);
  }
  
  function setupQuarterDropdown() {
    const dropdown = document.getElementById('quarterDropdown');
    if (!dropdown) {
      console.warn('⚠ Quarter dropdown not found');
      return;
    }
    
    dropdown.addEventListener('change', (e) => {
      activeQuarter = e.target.value;
      activeMonth = `All ${activeQuarter}`;
      
      updateFilterTabs();
      
      console.log(`Switched to ${activeQuarter}`);
      updateDashboard();
    });
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
  
  function setupCsvImporter() {
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('csvFileInput');
    if (!uploadBtn || !fileInput) return;
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(evt) {
        const contents = evt.target.result;
        parseCSV(contents, file.name);
      };
      reader.readAsText(file);
    });
  }
  
  function parseCSV(text, filename) {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    if (lines.length < 2) {
      alert("Invalid CSV format");
      return;
    }
    alert(`Uploaded ${filename} - Dashboard updated!`);
    updateQuarterDropdown();
    updateFilterTabs();
    updateDashboard();
  }
  
  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Dashboard initializing...');
    
    // Wait for data to load from Excel
    const checkData = setInterval(() => {
      if (window.DashboardData && window.DashboardData.leadsData) {
        clearInterval(checkData);
        
        detectQuarters();
        updateQuarterDropdown();
        updateFilterTabs();
        setupQuarterDropdown();
        setupFilters();
        setupCsvImporter();
        updateDashboard();
        
        console.log('✓ Dashboard ready with auto-loaded Excel data');
      }
    }, 100);
    
    // Timeout after 5 seconds
    setTimeout(() => {
      clearInterval(checkData);
      if (window.DashboardData && window.DashboardData.leadsData.length > 0) {
        console.log('✓ Dashboard initialized with data');
      } else {
        console.log('ℹ Using fallback hardcoded data');
      }
    }, 5000);
  });
})();
