/**
 * data.js — Syona Roots DM Dashboard Data
 * Source: Dm_Dashboard_-_Data_s.xlsx
 * Period:  January 2026 – March 2026
 * Generated: 2026-06-19
 *
 * ═══════════════════════════════════════════════════════════
 *  MONTHLY UPDATE INSTRUCTIONS (give this file to Claude)
 * ═══════════════════════════════════════════════════════════
 *  1. Send updated Excel to Claude each month.
 *  2. Claude will replace this file with fresh hardcoded data.
 *  3. Upload data.js alongside your dashboard HTML — done.
 *
 *  VALIDATION RULES APPLIED (Claude checks these every month):
 *  • Excel date serials (e.g. 46023) → converted to "January 2026"
 *  • Scientific notation (e.g. 2.6E-2) → converted to plain decimals
 *  • Percentages stored as 0–1 floats are multiplied ×100 for display
 *  • "Total" rows extracted separately, not mixed into month arrays
 *  • All numbers explicitly cast to Number(); strings trimmed
 *  • Missing / blank cells stored as null (never undefined)
 * ═══════════════════════════════════════════════════════════
 */

// ─── SECTION 1: DM LEADS OVERVIEW ────────────────────────────────────────────
// Source: Sheet "DM Leads" — top table (Leads by source per month)

const dmLeads = {
  months: ["January 2026", "February 2026", "March 2026"],

  // Total leads received each month (all sources combined)
  totalLeads: [845, 841, 806],

  // Lead source breakdown per month [Jan, Feb, Mar]
  sources: {
    website:   [66,  20,  36],
    call:      [118, 139, 142],
    whatsapp:  [23,  41,  49],
    mail:      [5,   3,   1],
    tollFree:  [5,   7,   9],
    ecommerce: [1,   0,   1],
    facebook:  [626, 629, 568],
  },

  // Totals row (sum across all 3 months)
  totals: {
    totalLeads: 2492,
    website:    122,
    call:       399,
    whatsapp:   113,
    mail:       9,
    tollFree:   21,
    ecommerce:  2,
    facebook:   1823,
  },
};

// ─── SECTION 2: CONVERSION DATA ──────────────────────────────────────────────
// Source: Sheet "DM Leads" — second table (Conversion metrics per month)

const dmConversions = {
  months: ["January 2026", "February 2026", "March 2026"],

  // Number of conversions per month
  conversions:      [13, 18, 13],

  // Total revenue value of conversions (₹)
  conversionValue:  [2708243, 2553303, 7985951],

  // Lead status breakdown per month [Jan, Feb, Mar]
  status: {
    followUp:     [478, 613, 619],
    quoteGiven:   [14,  23,  18],
    converted:    [8,   13,  4],
    quoteLive:    [5,   10,  14],
    quoteLost:    [1,   0,   0],
    saleLost:     [45,  45,  26],
    noResponse:   [22,  26,  21],
    coldEnquiry:  [49,  93,  91],
  },

  // Totals row
  totals: {
    conversions:     44,
    conversionValue: 13247497,
    followUp:        1710,
    quoteGiven:      55,
    converted:       25,
    quoteLive:       29,
    quoteLost:       1,
    saleLost:        116,
    noResponse:      69,
    coldEnquiry:     233,
  },
};

// ─── SECTION 3: GOOGLE SEARCH CONSOLE ────────────────────────────────────────
// Source: Sheet "DM Leads" — GSC summary table + Sheets "Jan", "Feb", "Mar"

const googleSearchConsole = {
  months: ["January 2026", "February 2026", "March 2026"],

  // Overview metrics (validated: scientific notation → plain numbers)
  overview: [
    { month: "January 2026",  clicks: 1280,  impressions: 48900, ctr: 2.6,  position: 10.8 },
    { month: "February 2026", clicks: 1130,  impressions: 53300, ctr: 2.1,  position: 11.0 },
    { month: "March 2026",    clicks: 1220,  impressions: 70700, ctr: 1.7,  position: 8.4  },
  ],
  // NOTE: clicks/impressions use "k" in Excel (e.g. "1.28k") — stored as integers above.
  // CTR: Excel stored as 0.026 etc — multiplied ×100 → stored as percentage (e.g. 2.6 = 2.6%)

  // Top performing pages per month
  topPages: {
    "January 2026": [
      { url: "https://syonaroots.com/",                                                              clicks: 600, impressions: 8140  },
      { url: "https://syonaroots.com/3-seater-waiting-chairs-manufacturers-suppliers/",             clicks: 85,  impressions: 3561  },
      { url: "https://syonaroots.com/hospital-chairs-manufacturers-in-india/hospital-waiting-visitor-chairs/", clicks: 75, impressions: 5954 },
      { url: "https://syonaroots.com/waiting-chairs/",                                              clicks: 46,  impressions: 1280  },
      { url: "https://syonaroots.com/hospital-chairs-manufacturers-in-india/",                      clicks: 43,  impressions: 2169  },
      { url: "https://syonaroots.com/office-chairs-manufacturers-suppliers/",                       clicks: 29,  impressions: 2233  },
      { url: "https://syonaroots.com/leading-chair-manufacturers-bangalore/",                       clicks: 26,  impressions: 1973  },
      { url: "https://syonaroots.com/leading-chair-manufacturers-kolkata/",                         clicks: 24,  impressions: 2797  },
      { url: "https://syonaroots.com/venus-gang-chair-3-seater/",                                   clicks: 18,  impressions: 1916  },
      { url: "https://syonaroots.com/leading-chair-manufacturers-chennai/",                         clicks: 18,  impressions: 995   },
    ],
    "February 2026": [
      { url: "https://syonaroots.com/",                                                              clicks: 477, impressions: 8146  },
      { url: "https://syonaroots.com/3-seater-waiting-chairs-manufacturers-suppliers/",             clicks: 70,  impressions: 3050  },
      { url: "https://syonaroots.com/hospital-chairs-manufacturers-in-india/hospital-waiting-visitor-chairs/", clicks: 65, impressions: 5393 },
      { url: "https://syonaroots.com/leading-chair-manufacturers-coimbatore/",                      clicks: 34,  impressions: 1456  },
      { url: "https://syonaroots.com/office-chairs-manufacturers-suppliers/",                       clicks: 28,  impressions: 2361  },
      { url: "https://syonaroots.com/waiting-chairs/",                                              clicks: 27,  impressions: 1032  },
      { url: "https://syonaroots.com/hospital-chairs-manufacturers-in-india/",                      clicks: 22,  impressions: 1683  },
      { url: "https://syonaroots.com/leading-chair-manufacturers-bangalore/",                       clicks: 22,  impressions: 1514  },
      { url: "https://syonaroots.com/visitor-chairs/",                                              clicks: 22,  impressions: 1370  },
      { url: "https://syonaroots.com/leading-chair-manufacturers-chennai/",                         clicks: 21,  impressions: 924   },
    ],
    "March 2026": [
      { url: "https://syonaroots.com/",                                                              clicks: 357, impressions: 7040  },
      { url: "https://syonaroots.com/hospital-chairs-manufacturers-in-india/hospital-waiting-visitor-chairs/", clicks: 89, impressions: 6205 },
      { url: "https://syonaroots.com/office-visitor-chairs/",                                       clicks: 67,  impressions: 7326  },
      { url: "https://syonaroots.com/3-seater-waiting-chairs-manufacturers-suppliers/",             clicks: 53,  impressions: 2296  },
      { url: "https://syonaroots.com/leading-chair-manufacturers-coimbatore/",                      clicks: 37,  impressions: 1624  },
      { url: "https://syonaroots.com/classroom-furnitures/",                                        clicks: 30,  impressions: 2559  },
      { url: "https://syonaroots.com/hospital-chairs-manufacturers-in-india/",                      clicks: 22,  impressions: 1550  },
      { url: "https://syonaroots.com/office-chairs-manufacturers-suppliers/",                       clicks: 21,  impressions: 1782  },
      { url: "https://syonaroots.com/work-from-home-chairs/",                                       clicks: 21,  impressions: 1702  },
      { url: "https://syonaroots.com/leading-chair-manufacturers-chennai/",                         clicks: 21,  impressions: 1297  },
    ],
  },

  // Top performing queries per month
  topQueries: {
    "January 2026": [
      { query: "syona chairs",                  clicks: 216, impressions: 878 },
      { query: "syona roots",                   clicks: 72,  impressions: 165 },
      { query: "syona",                         clicks: 69,  impressions: 432 },
      { query: "syona chair",                   clicks: 35,  impressions: 133 },
      { query: "roots chairs",                  clicks: 28,  impressions: 103 },
      { query: "syonaroots",                    clicks: 17,  impressions: 57  },
      { query: "syona chairs 3 seater price",   clicks: 16,  impressions: 82  },
      { query: "roots syona chairs",            clicks: 16,  impressions: 46  },
      { query: "roots chair",                   clicks: 12,  impressions: 35  },
      { query: "syona chairs price",            clicks: 10,  impressions: 58  },
    ],
    "February 2026": [
      { query: "syona chairs",                  clicks: 181, impressions: 846 },
      { query: "syona roots",                   clicks: 57,  impressions: 194 },
      { query: "syona",                         clicks: 51,  impressions: 339 },
      { query: "roots chairs",                  clicks: 42,  impressions: 127 },
      { query: "syona chair",                   clicks: 21,  impressions: 101 },
      { query: "syona roots chairs",            clicks: 13,  impressions: 45  },
      { query: "syona chairs 3 seater price",   clicks: 12,  impressions: 89  },
      { query: "roots syona chairs",            clicks: 11,  impressions: 33  },
      { query: "roots furniture",               clicks: 9,   impressions: 55  },
      { query: "roots syona",                   clicks: 9,   impressions: 21  },
    ],
    "March 2026": [
      { query: "syona chairs",                  clicks: 134, impressions: 840 },
      { query: "syona roots",                   clicks: 57,  impressions: 237 },
      { query: "syona",                         clicks: 32,  impressions: 353 },
      { query: "roots chairs",                  clicks: 31,  impressions: 119 },
      { query: "syona chair",                   clicks: 20,  impressions: 104 },
      { query: "syonaroots",                    clicks: 11,  impressions: 54  },
      { query: "roots syona chairs",            clicks: 10,  impressions: 52  },
      { query: "roots furniture",               clicks: 9,   impressions: 33  },
      { query: "office visitor chair",          clicks: 7,   impressions: 710 },
      { query: "hospital waiting chair",        clicks: 7,   impressions: 337 },
    ],
  },
};

// ─── SECTION 4: GOOGLE ADS ───────────────────────────────────────────────────
// Source: Sheet "Google Ads" (and matching section in "DM Leads")
// NOTE: Interaction rate stored as 0–1 float in Excel → kept as-is (multiply ×100 for %)

const googleAds = {
  months: ["January 2026", "February 2026", "March 2026"],

  // Total spend per month (₹)
  totalSpend: [27297.08, 27297.08, 53091.31],

  campaigns: {
    "January 2026": [
      { name: "School Furniture - S",            interactions: 326,  interactionRate: 9.86,  avgCost: 39.71,  cost: 12944.72, impressions: 3305,   conversions: 17 },
      { name: "Performance Max-14- Shop Ad",     interactions: 1446, interactionRate: 1.64,  avgCost: 4.19,   cost: 6059.52,  impressions: 88352,  conversions: 0  },
      { name: "School Furniture - Search",       interactions: 222,  interactionRate: 8.21,  avgCost: 17.84,  cost: 3959.72,  impressions: 2703,   conversions: 34 },
      { name: "Display Intent Ads- WFH",         interactions: 8365, interactionRate: 32.13, avgCost: 0.33,   cost: 2775.46,  impressions: 26032,  conversions: 0  },
    ],
    "February 2026": [
      { name: "School Furniture - S",            interactions: 370,  interactionRate: 8.74,  avgCost: 34.58,  cost: 12794.27, impressions: 4235,   conversions: 41 },
      { name: "School Furniture - Search",       interactions: 218,  interactionRate: 7.24,  avgCost: 17.56,  cost: 3827.57,  impressions: 3009,   conversions: 31 },
      { name: "Performance Max-14- Shop Ad",     interactions: 1659, interactionRate: 2.05,  avgCost: 1.92,   cost: 3186.53,  impressions: 80979,  conversions: 0  },
      { name: "Intent Display Ads",              interactions: 487,  interactionRate: 8.51,  avgCost: 6.30,   cost: 3065.76,  impressions: 5726,   conversions: 0  },
      { name: "Display Intent Ads- WFH",         interactions: 2247, interactionRate: 6.90,  avgCost: 1.35,   cost: 3040.57,  impressions: 32559,  conversions: 0  },
      { name: "Office series Campaign",          interactions: 2346, interactionRate: 5.60,  avgCost: 0.59,   cost: 1382.38,  impressions: 41907,  conversions: 72 },
    ],
    "March 2026": [
      { name: "AI-Ad-Leads-Search-59",           interactions: 1626, interactionRate: 5.85,  avgCost: 8.86,   cost: 14400.29, impressions: 27811,  conversions: 6  },
      { name: "Fans-Leads-Search-61",            interactions: 1291, interactionRate: 1.34,  avgCost: 10.84,  cost: 13996.20, impressions: 96522,  conversions: 0  },
      { name: "School Furniture - S",            interactions: 161,  interactionRate: 12.33, avgCost: 38.32,  cost: 6169.69,  impressions: 1306,   conversions: 13 },
      { name: "Performance Max-14- Shop Ad",     interactions: 2272, interactionRate: 1.95,  avgCost: 1.90,   cost: 4309.61,  impressions: 116216, conversions: 1  },
      { name: "Waiting-Chair-Leads-Search-62",   interactions: 395,  interactionRate: 4.00,  avgCost: 10.01,  cost: 3954.72,  impressions: 9879,   conversions: 0  },
      { name: "School Furniture - Search",       interactions: 222,  interactionRate: 7.86,  avgCost: 16.54,  cost: 3672.95,  impressions: 2826,   conversions: 40 },
      { name: "Display Intent Ads- WFH",         interactions: 1339, interactionRate: 13.77, avgCost: 2.28,   cost: 3048.13,  impressions: 9725,   conversions: 0  },
      { name: "Intent Display Ads",              interactions: 536,  interactionRate: 15.95, avgCost: 5.67,   cost: 3040.32,  impressions: 3360,   conversions: 0  },
      { name: "Office series Campaign",          interactions: 524,  interactionRate: 7.73,  avgCost: 0.73,   cost: 380.89,   impressions: 6780,   conversions: 17 },
      { name: "Hyderabad - School Furniture 2022", interactions: 33, interactionRate: 1.73,  avgCost: 2.51,   cost: 82.93,    impressions: 1911,   conversions: 0  },
      { name: "Chennai - Hospital Chairs 2022",  interactions: 5,    interactionRate: 2.76,  avgCost: 7.12,   cost: 35.58,    impressions: 181,    conversions: 0  },
    ],
  },
};

// ─── SECTION 5: META (INSTAGRAM + FACEBOOK) ──────────────────────────────────
// Source: Sheet "Meta"
// NOTE: Engagement rate stored as decimal in Excel (e.g. 0.407) → multiplied ×100 for %
// NOTE: March Facebook engagement rate is NEGATIVE (-0.17) — kept as-is; indicates decline.

const metaData = {
  months: ["January 2026", "February 2026", "March 2026"],

  instagram: {
    reach:          [2909383, 293377,  226830],
    engagement:     [896,     1697,    427],
    followerGrowth: [70,      108,     127],
    engagementRate: [0.407,   1.325,   0.75],   // % values
    linkClicks:     [1208,    1766,    844],
    profileVisits:  [1278,    889,     595],
  },

  facebook: {
    reach:          [3001118, 629287,  410401],
    engagement:     [414,     354,     303],
    followerGrowth: [24,      26,      24],
    engagementRate: [0.247,   0.171,   -0.17],  // NOTE: Mar is negative (drop)
    linkClicks:     [1710,    1454,    1493],
    profileVisits:  [1279,    1012,    809],
  },

  // Meta leads & conversions (from bottom table in Meta sheet)
  leadsAndConversions: [
    { month: "January 2026",  leadsReceived: 626, leadsConverted: null,  conversionValue: null    },
    { month: "February 2026", leadsReceived: 629, leadsConverted: 3,     conversionValue: 317512  },
    { month: "March 2026",    leadsReceived: 568, leadsConverted: 2,     conversionValue: 586402  },
  ],
  // NOTE: Jan converted/value = null (shown as "-" in Excel, not zero)
  leadsTotals: { leadsReceived: 1823, leadsConverted: 5, conversionValue: 903914 },

  // Meta campaign-level spend summary
  campaignSummary: [
    { month: "January 2026",  amountSpend: 45274.54, impressions: 3146453, clicks: 5621, ctr: 0.18,  cpl: 72.21 },
    { month: "February 2026", amountSpend: 39677.04, impressions: 1171162, clicks: 5542, ctr: 0.47,  cpl: 58.18 },
    { month: "March 2026",    amountSpend: 40034.91, impressions: 413144,  clicks: 4147, ctr: 1.00,  cpl: 70.24 },
  ],
  // NOTE: CTR in Excel: 0.0018, 0.0047, 0.01 → multiplied ×100 → 0.18%, 0.47%, 1.00%
};

// ─── SECTION 6: LEADS BREAKUP ────────────────────────────────────────────────
// Source: Sheet "Leads Breakup"

const leadsBreakup = {
  months: ["January 2026", "February 2026", "March 2026"],

  // All lead sources per month
  leadsBySource: [
    {
      month: "January 2026",
      calls: 118, website: 66, mail: 5, facebookInstagram: 626,
      whatsapp: 23, directVisit: null, onlineSyona: 1, referrals: 1,
      tollFree: 5, totalLeads: 845,
    },
    {
      month: "February 2026",
      calls: 139, website: 20, mail: 3, facebookInstagram: 629,
      whatsapp: 41, directVisit: 1, onlineSyona: null, referrals: 1,
      tollFree: 7, totalLeads: 841,
    },
    {
      month: "March 2026",
      calls: 142, website: 36, mail: 1, facebookInstagram: 568,
      whatsapp: 49, directVisit: null, onlineSyona: 1, referrals: null,
      tollFree: 9, totalLeads: 806,
    },
  ],

  // Lead status per month
  leadStatus: [
    {
      month: "January 2026",
      converted: 12, ecommerceConversion: 2, needFollowUp: 566,
      coldEnquiry: 42, noResponse: 20, saleLost: 27, quoteGiven: 24, quotesLive: 15,
    },
    {
      month: "February 2026",
      converted: 12, ecommerceConversion: 6, needFollowUp: 529,
      coldEnquiry: 58, noResponse: 25, saleLost: 44, quoteGiven: 26, quotesLive: 12,
    },
    {
      month: "March 2026",
      converted: 10, ecommerceConversion: 3, needFollowUp: 633,
      coldEnquiry: 89, noResponse: 21, saleLost: 19, quoteGiven: 24, quotesLive: 17,
    },
  ],

  // Leads converted to sales — by source
  conversionsBySource: [
    {
      month: "January 2026",
      total: 14, website: 3, calls: 9, facebook: null, whatsapp: null,
      syonaMail: null, directVisit: null, ecomMail: null, referral: null, ecommerce: 2,
    },
    {
      month: "February 2026",
      total: 18, website: 2, calls: 3, facebook: 3, whatsapp: 4,
      syonaMail: null, directVisit: null, ecomMail: null, referral: null, ecommerce: 6,
    },
    {
      month: "March 2026",
      total: 13, website: null, calls: 5, facebook: 2, whatsapp: 3,
      syonaMail: null, directVisit: null, ecomMail: null, referral: null, ecommerce: 3,
    },
  ],

  // Model-wise enquiries (Excel date serials → month names)
  modelwiseEnquiry: {
    months: ["January 2026", "February 2026", "March 2026"],
    models: [
      { model: "Hospital Series",      counts: [188, 239, 236] },
      { model: "Gang Chairs",          counts: [243, 199, 202] },
      { model: "Education Series",     counts: [136, 118, 110] },
      { model: "New Products (Table)", counts: [5,   3,   3]   },
      { model: "Café Series",          counts: [8,   13,  3]   },
      { model: "Office Chairs",        counts: [215, 207, 180] },
      { model: "All Products",         counts: [27,  35,  39]  },
      { model: "Chairs",               counts: [23,  27,  33]  },
    ],
  },

  // Customer type breakdown
  customerType: {
    months: ["January 2026", "February 2026", "March 2026"],
    types: [
      { type: "Healthcare",             counts: [391, 421, 347] },
      { type: "Education Institutions", counts: [101, 113, 115] },
      { type: "Hotel/Café",             counts: [4,   10,  6]   },
      { type: "Office/Organisation",    counts: [187, 186, 196] },
      { type: "Reseller",               counts: [44,  53,  58]  },
      { type: "Architect",              counts: [8,   6,   6]   },
      { type: "Others",                 counts: [63,  16,  31]  },
      { type: "Individual",             counts: [47,  36,  47]  },
    ],
  },

  // Region-wise lead distribution
  regionWise: {
    months: ["January 2026", "February 2026", "March 2026"],
    regions: [
      { region: "East",   counts: [68,  62,  85]  },
      { region: "West",   counts: [124, 132, 172] },
      { region: "North",  counts: [210, 196, 156] },
      { region: "South",  counts: [376, 403, 338] },
      { region: "Others", counts: [67,  48,  55]  },
    ],
  },

  // Conversion location wise (month serial → name resolved)
  conversionLocations: [
    // January 2026
    { month: "January 2026",  location: "Tenali",                    state: "Andhra Pradesh",  value: 58668    },
    { month: "January 2026",  location: "Guwahati",                  state: "Assam",            value: 12529    },
    { month: "January 2026",  location: "Davanagere",                state: "Karnataka",        value: 88978    },
    { month: "January 2026",  location: "Bengaluru",                 state: "Karnataka",        value: 72810    },
    { month: "January 2026",  location: "Waidhan, Singrauli",        state: "Madhya Pradesh",   value: 465510   },
    { month: "January 2026",  location: "Kolhapur",                  state: "Maharashtra",      value: 127990   },
    { month: "January 2026",  location: "Sivakasi",                  state: "Tamil Nadu",       value: 211183   },
    { month: "January 2026",  location: "Hosur",                     state: "Tamil Nadu",       value: 33616    },
    { month: "January 2026",  location: "Aruppukottai",              state: "Tamil Nadu",       value: 195285   },
    { month: "January 2026",  location: "Karur",                     state: "Tamil Nadu",       value: 114335   },
    { month: "January 2026",  location: "Thiruvallur",               state: "Tamil Nadu",       value: 78095    },
    { month: "January 2026",  location: "Chennai",                   state: "Tamil Nadu",       value: 18681    },
    { month: "January 2026",  location: "Madurai",                   state: "Tamil Nadu",       value: 208194   },
    { month: "January 2026",  location: "Chinnasalem, Kallakuruchi", state: "Tamil Nadu",       value: 1022369  },
    // February 2026
    { month: "February 2026", location: "Vijayawada",                state: "Andhra Pradesh",   value: 44613    },
    { month: "February 2026", location: "Bengaluru",                 state: "Karnataka",        value: 12529    },
    { month: "February 2026", location: "Mandya",                    state: "Karnataka",        value: 287209   },
    { month: "February 2026", location: "Bangalore",                 state: "Karnataka",        value: 12528.82 },
    { month: "February 2026", location: "Raichur",                   state: "Karnataka",        value: 12529    },
    { month: "February 2026", location: "Kalaburagi",                state: "Karnataka",        value: 57421    },
    { month: "February 2026", location: "Gulbarga",                  state: "Karnataka",        value: 136556   },
    { month: "February 2026", location: "Koduvayur, Palakkad",       state: "Kerala",           value: 62068    },
    { month: "February 2026", location: "Palakkad",                  state: "Kerala",           value: 13167.44 },
    { month: "February 2026", location: "Kottayam",                  state: "Kerala",           value: 202852   },
    { month: "February 2026", location: "Chennai",                   state: "Tamil Nadu",       value: 29845.42 },
    { month: "February 2026", location: "Coimbatore",                state: "Tamil Nadu",       value: 231959   },
    { month: "February 2026", location: "Viralimalai, Trichy",       state: "Tamil Nadu",       value: 218798   },
    { month: "February 2026", location: "Chennai",                   state: "Tamil Nadu",       value: 52592    },
    { month: "February 2026", location: "Madurai",                   state: "Tamil Nadu",       value: 35008    },
    { month: "February 2026", location: "Trichy",                    state: "Tamil Nadu",       value: 58102    },
    { month: "February 2026", location: "Chennai",                   state: "Tamil Nadu",       value: 969495   },
    { month: "February 2026", location: "Hyderabad",                 state: "Telangana",        value: 115691   },
    // March 2026
    { month: "March 2026",    location: "Virar (West)",              state: "Maharashtra",      value: 541474   },
    { month: "March 2026",    location: "Sangali",                   state: "Maharashtra",      value: 44928    },
    { month: "March 2026",    location: "Viman Nagar, Pune",         state: "Maharashtra",      value: 460718   },
    { month: "March 2026",    location: "Guntur",                    state: "Andhra Pradesh",   value: 26711    },
    { month: "March 2026",    location: "Sarjapur, Bengaluru",       state: "Karnataka",        value: 479760   },
    { month: "March 2026",    location: "Bellandur, Bengaluru",      state: "Karnataka",        value: 324688   },
    { month: "March 2026",    location: "HSR Layout, Bengaluru",     state: "Karnataka",        value: 174832   },
    { month: "March 2026",    location: "Marathahalli Whitefield, Bengaluru", state: "Karnataka", value: 649376 },
    { month: "March 2026",    location: "Indira Nagar, Bengaluru",   state: "Karnataka",        value: 374640   },
    { month: "March 2026",    location: "VV Mohlla, Mysore",         state: "Karnataka",        value: 374640   },
    { month: "March 2026",    location: "Basavanagudi, Karnataka",   state: "Karnataka",        value: 249760   },
    { month: "March 2026",    location: "Koramangala, Bengaluru",    state: "Karnataka",        value: 374640   },
    { month: "March 2026",    location: "Indore",                    state: "Madhya Pradesh",   value: 301630   },
    { month: "March 2026",    location: "Coimbatore",                state: "Tamil Nadu",       value: 105719   },
    { month: "March 2026",    location: "Chennai",                   state: "Tamil Nadu",       value: 23352    },
    { month: "March 2026",    location: "Coimbatore",                state: "Tamil Nadu",       value: 633250   },
    { month: "March 2026",    location: "Tirupur",                   state: "Tamil Nadu",       value: 19343    },
    { month: "March 2026",    location: "Chennai",                   state: "Tamil Nadu",       value: 976328   },
    { month: "March 2026",    location: "Chennai",                   state: "Tamil Nadu",       value: 59860    },
    { month: "March 2026",    location: "Tirupur",                   state: "Tamil Nadu",       value: 40516    },
    { month: "March 2026",    location: "Kondapur, Hyderabad",       state: "Telangana",        value: 1508276  },
    { month: "March 2026",    location: "Chandanagar, Ranga Reddy",  state: "Telangana",        value: 174832   },
    { month: "March 2026",    location: "Hyderabad",                 state: "Telangana",        value: 41620    },
    { month: "March 2026",    location: "Noida",                     state: "Uttar Pradesh",    value: 25058    },
  ],
};

// ─── SECTION 7: NEW LANDING PAGES ────────────────────────────────────────────
// Source: Sheet "New Landing pages"

const newLandingPages = [
  "https://syonaroots.com/leading-chair-manufacturers-asansol/",
  "https://syonaroots.com/leading-chair-manufacturers-aurangabad/",
  "https://syonaroots.com/leading-chair-manufacturers-balasore/",
  "https://syonaroots.com/leading-chair-manufacturers-calicut/",
  "https://syonaroots.com/leading-chair-manufacturers-chittur/",
  "https://syonaroots.com/leading-chair-manufacturers-cuttack/",
  "https://syonaroots.com/leading-chair-manufacturers-erode/",
  "https://syonaroots.com/leading-chair-manufacturers-goa/",
  "https://syonaroots.com/leading-chair-manufacturers-gorakhpur/",
  "https://syonaroots.com/leading-chair-manufacturers-guwahati/",
  "https://syonaroots.com/leading-chair-manufacturers-hissar/",
  "https://syonaroots.com/leading-chair-manufacturers-thrissur/",
  "https://syonaroots.com/leading-chair-manufacturers-tirunelveli/",
  "https://syonaroots.com/leading-chair-manufacturers-tirupati/",
  "https://syonaroots.com/leading-chair-manufacturers-trichy/",
  "https://syonaroots.com/leading-chair-manufacturers-trivandrum/",
  "https://syonaroots.com/leading-chair-manufacturers-hubli/",
  "https://syonaroots.com/leading-chair-manufacturers-jalandhar/",
  "https://syonaroots.com/leading-chair-manufacturers-karimnagar/",
  "https://syonaroots.com/leading-chair-manufacturers-kasargod/",
  "https://syonaroots.com/leading-chair-manufacturers-kolhapur/",
  "https://syonaroots.com/leading-chair-manufacturers-kollam/",
  "https://syonaroots.com/leading-chair-manufacturers-kurnool/",
  "https://syonaroots.com/leading-chair-manufacturers-malda/",
  "https://syonaroots.com/leading-chair-manufacturers-mangalore/",
  "https://syonaroots.com/leading-chair-manufacturers-manipal/",
  "https://syonaroots.com/leading-chair-manufacturers-mysore/",
  "https://syonaroots.com/leading-chair-manufacturers-nellore/",
  "https://syonaroots.com/leading-chair-manufacturers-palakkad/",
  "https://syonaroots.com/leading-chair-manufacturers-panipat/",
  "https://syonaroots.com/leading-chair-manufacturers-puducherry/",
  "https://syonaroots.com/leading-chair-manufacturers-puri/",
  "https://syonaroots.com/leading-chair-manufacturers-rajahmundry/",
  "https://syonaroots.com/leading-chair-manufacturers-salem/",
  "https://syonaroots.com/leading-chair-manufacturers-sangli/",
  "https://syonaroots.com/leading-chair-manufacturers-siliguri/",
  "https://syonaroots.com/leading-chair-manufacturers-solapur/",
  "https://syonaroots.com/leading-chair-manufacturers-sonipat/",
  "https://syonaroots.com/leading-chair-manufacturers-udaipur/",
];

// ─── EXPORTS ──────────────────────────────────────────────────────────────────
// Makes all sections available to your dashboard scripts.
// If your dashboard uses <script src="data.js"> (no module bundler),
// these globals will be available directly in window scope.

if (typeof module !== "undefined" && module.exports) {
  // Node / CommonJS (for testing)
  module.exports = { dmLeads, dmConversions, googleSearchConsole, googleAds, metaData, leadsBreakup, newLandingPages };
}
// For browser (script tag): all const vars are global automatically.
