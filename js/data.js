/**
 * data.js — Syona Roots DM Dashboard Data
 * Source: Dm_Dashboard_-_Data_s.xlsx
 * Period: January 2026 – March 2026
 * Generated: 2026-06-19
 * 
 * VALIDATION APPLIED:
 * • Excel date serials → month names
 * • Scientific notation → plain decimals
 * • Missing cells → null (not 0 or undefined)
 * • All numbers cast to Number type
 */

window.DashboardData = {
  leadsData: [
    { month: "January", website: 66, call: 118, whatsapp: 23, mail: 5, tollFree: 5, ecommerce: 1, facebook: 626, total: 845 },
    { month: "February", website: 20, call: 139, whatsapp: 41, mail: 3, tollFree: 7, ecommerce: 0, facebook: 629, total: 841 },
    { month: "March", website: 36, call: 142, whatsapp: 49, mail: 1, tollFree: 9, ecommerce: 1, facebook: 568, total: 806 }
  ],

  pipelineData: [
    {
      month: "January",
      conversions: 13,
      value: 2708243,
      followUp: 478,
      quoteGiven: 14,
      converted: 8,
      quoteLive: 5,
      quoteLost: 1,
      saleLost: 45,
      noResponse: 22,
      coldEnquiry: 49
    },
    {
      month: "February",
      conversions: 18,
      value: 2553303,
      followUp: 613,
      quoteGiven: 23,
      converted: 13,
      quoteLive: 10,
      quoteLost: 0,
      saleLost: 45,
      noResponse: 26,
      coldEnquiry: 93
    },
    {
      month: "March",
      conversions: 13,
      value: 7985951,
      followUp: 619,
      quoteGiven: 18,
      converted: 4,
      quoteLive: 14,
      quoteLost: 0,
      saleLost: 26,
      noResponse: 21,
      coldEnquiry: 91
    }
  ],

  seoData: [
    { month: "January", clicks: 1280, impressions: 48900, ctr: 2.6, position: 10.8 },
    { month: "February", clicks: 1130, impressions: 53300, ctr: 2.1, position: 11.0 },
    { month: "March", clicks: 1220, impressions: 70700, ctr: 1.7, position: 8.4 }
  ],

  regionalLeadsMonthly: [
    { month: "January", south: 376, north: 210, west: 124, east: 68 },
    { month: "February", south: 403, north: 196, west: 132, east: 62 },
    { month: "March", south: 338, north: 156, west: 172, east: 85 }
  ],

  productEnquiriesMonthly: [
    { month: "January", office: 215, gantry: 243, hospital: 188, education: 136, allProds: 27, chairs: 23, cafe: 8, tables: 5 },
    { month: "February", office: 207, gantry: 199, hospital: 239, education: 118, allProds: 35, chairs: 27, cafe: 13, tables: 3 },
    { month: "March", office: 180, gantry: 202, hospital: 236, education: 110, allProds: 39, chairs: 33, cafe: 3, tables: 3 }
  ],

  customerTypeMonthly: [
    { month: "January", healthcare: 391, officeOrg: 187, education: 101, reseller: 44, individual: 47, others: 63, hotelCafe: 4, architect: 8 },
    { month: "February", healthcare: 421, officeOrg: 186, education: 113, reseller: 53, individual: 36, others: 16, hotelCafe: 10, architect: 6 },
    { month: "March", healthcare: 347, officeOrg: 196, education: 115, reseller: 58, individual: 47, others: 31, hotelCafe: 6, architect: 6 }
  ],

  channelConversionsMonthly: [
    { month: "January", call: 9, website: 3, facebook: 0, whatsapp: 0, ecommerce: 2 },
    { month: "February", call: 3, website: 2, facebook: 3, whatsapp: 4, ecommerce: 6 },
    { month: "March", call: 5, website: 0, facebook: 2, whatsapp: 3, ecommerce: 3 }
  ],

  googleCampaignsData: {
    January: [
      { name: "School Furniture - S", spend: 12944.72, interactions: 326, ctr: 9.86, cpc: 39.71, conv: 17, rating: "Strong" },
      { name: "School Furniture - Search", spend: 3959.72, interactions: 222, ctr: 8.21, cpc: 17.84, conv: 34, rating: "Top" },
      { name: "Performance Max-14- Shop Ad", spend: 6059.52, interactions: 1446, ctr: 1.64, cpc: 4.19, conv: 0, rating: "Low ROI" },
      { name: "Display Intent Ads- WFH", spend: 2775.46, interactions: 8365, ctr: 32.13, cpc: 0.33, conv: 0, rating: "Review" }
    ],
    February: [
      { name: "School Furniture - S", spend: 12794.27, interactions: 370, ctr: 8.74, cpc: 34.58, conv: 41, rating: "Top" },
      { name: "School Furniture - Search", spend: 3827.57, interactions: 218, ctr: 7.24, cpc: 17.56, conv: 31, rating: "Top" },
      { name: "Performance Max-14- Shop Ad", spend: 3186.53, interactions: 1659, ctr: 2.05, cpc: 1.92, conv: 0, rating: "Low ROI" },
      { name: "Intent Display Ads", spend: 3065.76, interactions: 487, ctr: 8.51, cpc: 6.30, conv: 0, rating: "No conv." },
      { name: "Display Intent Ads- WFH", spend: 3040.57, interactions: 2247, ctr: 6.90, cpc: 1.35, conv: 0, rating: "No conv." },
      { name: "Office series Campaign", spend: 1382.38, interactions: 2346, ctr: 5.60, cpc: 0.59, conv: 72, rating: "Efficient" }
    ],
    March: [
      { name: "AI-Ad-Leads-Search-59", spend: 14400.29, interactions: 1626, ctr: 5.85, cpc: 8.86, conv: 6, rating: "Review" },
      { name: "Fans-Leads-Search-61", spend: 13996.20, interactions: 1291, ctr: 1.34, cpc: 10.84, conv: 0, rating: "No conv." },
      { name: "School Furniture - S", spend: 6169.69, interactions: 161, ctr: 12.33, cpc: 38.32, conv: 13, rating: "Strong" },
      { name: "Performance Max-14- Shop Ad", spend: 4309.61, interactions: 2272, ctr: 1.95, cpc: 1.90, conv: 1, rating: "Low ROI" },
      { name: "Waiting-Chair-Leads-Search-62", spend: 3954.72, interactions: 395, ctr: 4.0, cpc: 10.01, conv: 0, rating: "No conv." },
      { name: "School Furniture - Search", spend: 3672.95, interactions: 222, ctr: 7.86, cpc: 16.54, conv: 40, rating: "Top" },
      { name: "Display Intent Ads- WFH", spend: 3048.13, interactions: 1339, ctr: 13.77, cpc: 2.28, conv: 0, rating: "No conv." },
      { name: "Intent Display Ads", spend: 3040.32, interactions: 536, ctr: 15.95, cpc: 5.67, conv: 0, rating: "No conv." },
      { name: "Office series Campaign", spend: 380.89, interactions: 524, ctr: 7.73, cpc: 0.73, conv: 17, rating: "Efficient" },
      { name: "Hyderabad - School Furniture 2022", spend: 82.93, interactions: 33, ctr: 1.73, cpc: 2.51, conv: 0, rating: "No conv." },
      { name: "Chennai - Hospital Chairs 2022", spend: 35.58, interactions: 5, ctr: 2.76, cpc: 7.12, conv: 0, rating: "No conv." }
    ]
  },

  metaAdsMonthly: [
    { month: "January", spend: 45274.54, leads: 626, cpl: 72.21 },
    { month: "February", spend: 39677.04, leads: 629, cpl: 58.18 },
    { month: "March", spend: 40034.91, leads: 568, cpl: 70.24 }
  ],

  citiesData: [
    { city: "Kondapur, Hyderabad", state: "Telangana", month: "March", value: 1508276 },
    { city: "Chinnasalem, Kallakuruchi", state: "Tamil Nadu", month: "January", value: 1022369 },
    { city: "Chennai (multiple)", state: "Tamil Nadu", month: "March", value: 976328 },
    { city: "Marathahalli Whitefield, Bengaluru", state: "Karnataka", month: "March", value: 649376 },
    { city: "Coimbatore", state: "Tamil Nadu", month: "March", value: 633250 },
    { city: "Virar (West)", state: "Maharashtra", month: "March", value: 541474 },
    { city: "Sarjapur, Bengaluru", state: "Karnataka", month: "March", value: 479760 },
    { city: "Waidhan, Singrauli", state: "Madhya Pradesh", month: "January", value: 465510 },
    { city: "Viman Nagar, Pune", state: "Maharashtra", month: "March", value: 460718 },
    { city: "Koramangala, Bengaluru", state: "Karnataka", month: "March", value: 374640 },
    { city: "Indira Nagar, Bengaluru", state: "Karnataka", month: "March", value: 374640 },
    { city: "VV Mohlla, Mysore", state: "Karnataka", month: "March", value: 374640 },
    { city: "Mandya", state: "Karnataka", month: "February", value: 287209 },
    { city: "Indore", state: "Madhya Pradesh", month: "March", value: 301630 },
    { city: "Bellandur, Bengaluru", state: "Karnataka", month: "March", value: 324688 }
  ],

  MONTHLY_TARGET: 5000000,

  getFilteredData: function(monthFilter) {
    const isQ1 = monthFilter === "All Q1";
    
    const leads = isQ1
      ? this.leadsData
      : this.leadsData.filter(d => d.month === monthFilter);
    
    const totalLeads = leads.reduce((acc, curr) => acc + curr.total, 0);
    const fbLeads = leads.reduce((acc, curr) => acc + curr.facebook, 0);
    const otherLeads = totalLeads - fbLeads;
    
    const pipeline = isQ1
      ? this.pipelineData
      : this.pipelineData.filter(d => d.month === monthFilter);
    
    const totalConversions = pipeline.reduce((acc, curr) => acc + curr.conversions, 0);
    const totalConvValue = pipeline.reduce((acc, curr) => acc + curr.value, 0);
    const totalFollowUp = pipeline.reduce((acc, curr) => acc + curr.followUp, 0);
    const totalQuoteGiven = pipeline.reduce((acc, curr) => acc + curr.quoteGiven, 0);
    const totalConverted = pipeline.reduce((acc, curr) => acc + curr.converted, 0);
    const totalQuoteLive = pipeline.reduce((acc, curr) => acc + curr.quoteLive, 0);
    const totalQuoteLost = pipeline.reduce((acc, curr) => acc + curr.quoteLost, 0);
    const totalSaleLost = pipeline.reduce((acc, curr) => acc + curr.saleLost, 0);
    const totalNoResponse = pipeline.reduce((acc, curr) => acc + curr.noResponse, 0);
    const totalColdEnquiry = pipeline.reduce((acc, curr) => acc + curr.coldEnquiry, 0);
    
    let googleSpend = 0;
    if (isQ1) {
      Object.values(this.googleCampaignsData).forEach(campaigns => {
        googleSpend += campaigns.reduce((acc, c) => acc + c.spend, 0);
      });
    } else {
      const campaigns = this.googleCampaignsData[monthFilter] || [];
      googleSpend = campaigns.reduce((acc, c) => acc + c.spend, 0);
    }
    
    const meta = isQ1
      ? this.metaAdsMonthly
      : this.metaAdsMonthly.filter(d => d.month === monthFilter);
    
    const metaSpend = meta.reduce((acc, curr) => acc + curr.spend, 0);
    const totalSpend = googleSpend + metaSpend;
    const roas = totalSpend > 0 ? (totalConvValue / totalSpend) : 0;
    const convRate = totalLeads > 0 ? (totalConversions / totalLeads) * 100 : 0;
    const costPerConv = totalConversions > 0 ? (totalSpend / totalConversions) : 0;
    
    const seo = isQ1
      ? this.seoData
      : this.seoData.filter(d => d.month === monthFilter);
    
    const totalSeoClicks = seo.reduce((acc, curr) => acc + curr.clicks, 0);
    const avgSeoCtr = seo.length > 0 ? (seo.reduce((acc, curr) => acc + curr.ctr, 0) / seo.length) : 0;
    
    const targetToCompare = isQ1 ? (this.MONTHLY_TARGET * 3) : this.MONTHLY_TARGET;
    const targetPct = (totalConvValue / targetToCompare) * 100;

    return {
      totalLeads,
      fbLeads,
      otherLeads,
      totalSpend,
      googleSpend,
      metaSpend,
      totalConversions,
      totalConvValue,
      roas,
      convRate,
      costPerConv,
      totalSeoClicks,
      avgSeoCtr,
      targetPct,
      funnel: {
        totalLeads,
        followUp: totalFollowUp,
        coldEnquiry: totalColdEnquiry,
        quoteGiven: totalQuoteGiven,
        quoteLive: totalQuoteLive,
        converted: totalConverted,
        saleLost: totalSaleLost,
        noResponse: totalNoResponse
      }
    };
  }
};
