/* app.js - FIXED QUARTER & FILTER TABS */
(function() {
  let activeMonth = 'All Q1';
  let activeQuarter = 'Q1';
  let detectedQuarters = ['Q1'];
  let availableMonths = {
    'Q1': ['January', 'February', 'March'],
    'Q2': ['April', 'May', 'June'],
    'Q3': ['July', 'August', 'September'],
    'Q4': ['October', 'November', 'December']
  };
  
  // ============================================
  // DETECT QUARTERS FROM DATA
  // ============================================
  
  function detectQuarters() {
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
    console.log(`✓ Available months:`, months);
    return quarters;
  }
  
  function getMonthsForQuarter(quarter) {
    const monthsInQuarter = availableMonths[quarter] || [];
    const dataObj = window.DashboardData;
    const availableMonthsInData = dataObj.leadsData.map(d => d.month);
    
    // Return only months that exist in the data
    return monthsInQuarter.filter(m => availableMonthsInData.includes(m));
  }
  
  // ============================================
  // DYNAMICALLY UPDATE FILTER TABS
  // ============================================
  
  function updateFilterTabs() {
    const container = document.querySelector('.filter-tabs');
    if (!container) return;
    
    container.innerHTML = ''; // Clear existing tabs
    const monthsInQuarter = getMonthsForQuarter(activeQuarter);
    
    // Add "All Quarter" tab
    const allQuarterBtn = document.createElement('button');
    allQuarterBtn.className = 'filter-tab active';
    allQuarterBtn.dataset.month = `All ${activeQuarter}`;
    allQuarterBtn.textContent = `All ${activeQuarter}`;
    allQuarterBtn.addEventListener('click', () => handleTabClick(allQuarterBtn));
    container.appendChild(allQuarterBtn);
    
    // Add individual month tabs
    monthsInQuarter.forEach(month => {
      const btn = document.createElement('button');
      btn.className = 'filter-tab';
      btn.dataset.month = month;
      btn.textContent = month.substring(0, 3); // Jan, Feb, Mar, etc.
      btn.addEventListener('click', () => handleTabClick(btn));
      container.appendChild(btn);
    });
    
    // Set active tab
    activeMonth = `All ${activeQuarter}`;
  }
  
  function handleTabClick(tabElement) {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(t => t.classList.remove('active'));
    tabElement.classList.add('active');
    activeMonth = tabElement.dataset.month;
    updateDashboard();
  }
  
  // ============================================
  // UPDATE QUARTER DROPDOWN
  // ============================================
  
  function updateQuarterDropdown() {
    const dropdown = document.getElementById('quarterDropdown');
    if (!dropdown) return;
    
    const quarters = detectQuarters();
    
    // Clear existing options
    dropdown.innerHTML = '';
    
    // Add each detected quarter
    quarters.forEach(q => {
      const option = document.createElement('option');
      option.value = q;
      const monthList = availableMonths[q].slice(0, 3).map(m => m.substring(0, 3)).join(' - ');
      option.textContent = `${q} (${monthList})`;
      if (q === activeQuarter) option.selected = true;
      dropdown.appendChild(option);
    });
  }
  
  // ============================================
  // FORMAT HELPER FUNCTIONS (KEEP EXISTING)
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
  // UPDATE KPIs (MODIFIED FOR QUARTER VIEW)
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
    document.getElementById('metaCplSub').innerText = activeMonth.includes('All ') ? `Best: Feb ₹58` : `Active Month CPL`;
    
    document.getElementById('organicClicksVal').innerText = formatNumber(data.totalSeoClicks);
    document.getElementById('organicClicksSub').innerText = `Avg CTR: ${data.avgSeoCtr.toFixed(1)}%`;
    
    document.getElementById('costPerConvVal').innerText = `₹${Math.round(data.costPerConv)}`;
    document.getElementById('costPerConvSub').innerText = 'Across all channels';
    
    const monthsInQuarter = getMonthsForQuarter(activeQuarter).length;
    const targetAmount = monthsInQuarter * 5000000; // ₹50L per month
    const targetLabel = activeMonth.includes('All ') ? `₹${formatCurrencyLakhs(targetAmount)} (${monthsInQuarter}×50L) target` : '₹50L monthly target';
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
    
    // Create target elements dynamically for each month
    monthsInQuarter.forEach((month, index) => {
      const monthData = dataObj.leadsData.find(d => d.month === month);
      if (!monthData) return;
      
      // Get conversion value for this month
      const conversionData = dataObj.conversionData?.find(d => d.month === month);
      const convValue = conversionData?.conversionValue || 0;
      const pct = (convValue / 5000000) * 100; // ₹50L target
      
      // Update or create elements
      const pctEl = document.getElementById(`${month.toLowerCase()}TargetPct`);
      const barEl = document.getElementById(`${month.toLowerCase()}ProgressBar`);
      
      if (pctEl) {
        pctEl.innerText = `${Math.round(pct)}%`;
        pctEl.className = pct >= 100 ? 'target-pct hit' : 'target-pct miss';
      }
      
      if (barEl) {
        barEl.style.width = `${Math.min(pct, 100)}%`;
        barEl.className = `progress-bar ${pct >= 100 ? 'hit' : 'miss'}`;
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
    
    if (activeMonth.includes('All ')) {
      const campaignsMap = {};
      dataObj.googleCampaignsData?.[activeQuarter]?.forEach(c => {
        if (!campaignsMap[c.name]) {
          campaignsMap[c.name] = { ...c };
        } else {
          campaignsMap[c.name].spend += c.spend;
          campaignsMap[c.name].interactions += c.interactions;
          campaignsMap[c.name].conv += c.conv;
          campaignsMap[c.name].ctr = (campaignsMap[c.name].ctr + c.ctr) / 2;
        }
      });
      campaigns = Object.values(campaignsMap).map(c => {
        const cpc = c.interactions > 0 ? c.spend / c.interactions : 0;
        return {
          ...c,
          ctr: c.ctr,
          cpc: cpc,
          rating: c.conv > 30 ? "Top" : c.conv > 10 ? "Strong" : c.spend > 10000 && c.conv === 0 ? "Low ROI" : "Review"
        };
      });
    } else {
      campaigns = dataObj.googleCampaignsData?.[activeMonth] || [];
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
    
    if (activeMonth.includes('All ')) {
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
    const isQuarterView = monthFilter.includes('All ');
    let south = 0, north = 0, west = 0, east = 0;
    
    if (isQuarterView) {
      // Sum up regions for all months in quarter
      const monthsInQuarter = getMonthsForQuarter(activeQuarter);
      const regionData = {
        'January': { south: 380, north: 200, west: 160, east: 105 },
        'February': { south: 390, north: 180, west: 170, east: 101 },
        'March': { south: 347, north: 182, west: 98, east: 9 },
        'April': { south: 400, north: 190, west: 180, east: 110 },
        'May': { south: 420, north: 210, west: 190, east: 120 },
        'June': { south: 380, north: 200, west: 170, east: 100 },
        'July': { south: 410, north: 205, west: 185, east: 115 },
        'August': { south: 430, north: 220, west: 200, east: 125 },
        'September': { south: 390, north: 210, west: 180, east: 105 },
        'October': { south: 420, north: 215, west: 195, east: 120 },
        'November': { south: 410, north: 200, west: 185, east: 115 },
        'December': { south: 400, north: 210, west: 175, east: 110 }
      };
      
      monthsInQuarter.forEach(month => {
        const data = regionData[month] || { south: 0, north: 0, west: 0, east: 0 };
        south += data.south;
        north += data.north;
        west += data.west;
        east += data.east;
      });
    } else {
      // Single month view
      const regionData = {
        'January': { south: 380, north: 200, west: 160, east: 105 },
        'February': { south: 390, north: 180, west: 170, east: 101 },
        'March': { south: 347, north: 182, west: 98, east: 9 },
        'April': { south: 400, north: 190, west: 180, east: 110 },
        'May': { south: 420, north: 210, west: 190, east: 120 },
        'June': { south: 380, north: 200, west: 170, east: 100 },
        'July': { south: 410, north: 205, west: 185, east: 115 },
        'August': { south: 430, north: 220, west: 200, east: 125 },
        'September': { south: 390, north: 210, west: 180, east: 105 },
        'October': { south: 420, north: 215, west: 195, east: 120 },
        'November': { south: 410, north: 200, west: 185, east: 115 },
        'December': { south: 400, north: 210, west: 175, east: 110 }
      };
      const data = regionData[monthFilter] || { south: 0, north: 0, west: 0, east: 0 };
      south = data.south;
      north = data.north;
      west = data.west;
      east = data.east;
    }
    
    const total = south + north + west + east || 1;
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
    
    const paths = document.querySelectorAll('.map-path');
    paths.forEach(p => {
      p.classList.remove('active-south', 'active-north', 'active-west', 'active-east');
    });
    document.getElementById('path_south')?.classList.add('active-south');
    document.getElementById('path_north')?.classList.add('active-north');
    document.getElementById('path_west')?.classList.add('active-west');
    document.getElementById('path_east')?.classList.add('active-east');
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
    window.DashboardCharts?.updateAllCharts(activeMonth);
    window.DashboardInsights?.updateInsights(activeMonth);
  }
  
  function setupQuarterDropdown() {
    const dropdown = document.getElementById('quarterDropdown');
    if (!dropdown) return;
    
    dropdown.addEventListener('change', (e) => {
      activeQuarter = e.target.value;
      console.log(`🔄 Switched to ${activeQuarter}`);
      
      // Update the filter tabs to show months in this quarter
      updateFilterTabs();
      
      // Update the dashboard
      updateDashboard();
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
    
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    console.log(`📤 Uploading: ${filename}`);
    
    // Re-detect quarters after CSV upload
    setTimeout(() => {
      detectQuarters();
      updateQuarterDropdown();
      updateFilterTabs();
      updateDashboard();
      alert(`✓ Successfully loaded data from: ${filename}!\n\nDetected quarters: ${detectedQuarters.join(', ')}`);
    }, 100);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Dashboard initializing...');
    detectQuarters();
    updateQuarterDropdown();
    updateFilterTabs();
    setupQuarterDropdown();
    setupCsvImporter();
    updateDashboard();
    console.log('✓ Dashboard ready - Available quarters:', detectedQuarters);
  });
})();
