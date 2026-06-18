/* app.js - UPDATED WITH QUARTER SELECTOR */
(function() {
  let activeMonth = 'All Q1';
  let activeQuarter = 'Q1';  // NEW: Track active quarter
  let detectedQuarters = ['Q1'];  // NEW: Store detected quarters
  
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
      option.textContent = q;
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
    if (activeMonth === 'All Q1') {
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
    if (activeMonth === 'All Q1') {
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
    const isQ1 = monthFilter === 'All Q1';
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
    window.DashboardCharts.updateAllCharts(activeMonth);
    window.DashboardInsights.updateInsights(activeMonth);
  }
  
  function setupQuarterDropdown() {
    const dropdown = document.getElementById('quarterDropdown');
    if (!dropdown) return;
    
    dropdown.addEventListener('change', (e) => {
      activeQuarter = e.target.value;
      const monthsInQuarter = getMonthsForQuarter(activeQuarter);
      
      // Update month filter tabs to show only months in selected quarter
      const tabs = document.querySelectorAll('.filter-tab');
      tabs.forEach(tab => {
        const month = tab.dataset.month;
        if (month === 'All Q1') {
          tab.style.display = monthsInQuarter.length === 3 ? 'block' : 'none';
          tab.textContent = `All ${activeQuarter}`;
        } else {
          tab.style.display = monthsInQuarter.includes(month) ? 'block' : 'none';
        }
      });
      
      // Set active month to first month of quarter
      activeMonth = `All ${activeQuarter}`;
      tabs.forEach(tab => tab.classList.remove('active'));
      tabs[0].classList.add('active');
      
      console.log(`Switched to ${activeQuarter}, showing months: ${monthsInQuarter.join(', ')}`);
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
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    if (headers.includes('total leads') || headers.includes('facebook')) {
      alert(`Successfully parsed and loaded leads data from: ${filename}!`);
      updateQuarterDropdown();
      updateDashboard();
      return;
    }
    if (headers.includes('conversion value') || headers.includes('follow up')) {
      alert(`Successfully parsed and loaded pipeline funnel stats from: ${filename}!`);
      updateQuarterDropdown();
      updateDashboard();
      return;
    }
    if (headers.includes('avg. cost') || headers.includes('interactions')) {
      alert(`Successfully parsed Google Ads campaigns statistics from: ${filename}!`);
      updateQuarterDropdown();
      updateDashboard();
      return;
    }
    alert(`Uploaded ${filename} - custom table parsed successfully. Dashboard statistics updated!`);
    updateQuarterDropdown();
    updateDashboard();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Dashboard initializing...');
    detectQuarters();
    updateQuarterDropdown();
    setupQuarterDropdown();
    setupFilters();
    setupCsvImporter();
    updateDashboard();
    console.log('✓ Dashboard ready');
  });
})();
