/**
 * analyzer.js - Analysis engine for Googlebot log data
 * Computes crawl budget insights, wasted budget, undercrawled pages, etc.
 */

/**
 * @typedef {Object} LogRecord
 * @property {string} ipAddress
 * @property {string} requestUrl
 * @property {number} statusCode
 * @property {string} userAgent
 * @property {string} timeLocal
 * @property {Date|null} parsedDate
 * @property {number} responseSize
 */

/**
 * @typedef {Object} AnalysisResult
 * @property {SummaryStats} summary
 * @property {WastedBudgetEntry[]} wastedBudget
 * @property {UndercrawledEntry[]} undercrawled
 * @property {TimelineData} timeline
 * @property {StatusDistribution[]} statusDistribution
 */

/**
 * @typedef {Object} SummaryStats
 * @property {number} totalRequests
 * @property {number} uniqueUrls
 * @property {number} errors4xx
 * @property {number} errors5xx
 * @property {number} avgCrawlsPerUrl
 * @property {Date|null} firstCrawl
 * @property {Date|null} lastCrawl
 */

/**
 * @typedef {Object} WastedBudgetEntry
 * @property {string} url
 * @property {number} totalRequests
 * @property {number} errorCount
 * @property {number} lastStatus
 * @property {number} errorRate
 */

/**
 * @typedef {Object} UndercrawledEntry
 * @property {string} url
 * @property {number} crawlCount
 * @property {number} belowAvgPercent
 */

/**
 * @typedef {Object} TimelineData
 * @property {Record<string, number>} daily  - date string -> count
 * @property {Record<string, number>} hourly - "YYYY-MM-DD HH" -> count
 */

/**
 * @typedef {Object} StatusDistribution
 * @property {string} status
 * @property {number} count
 * @property {number} percent
 */

/**
 * Analyze Googlebot log records and return full analysis
 * @param {LogRecord[]} records
 * @returns {AnalysisResult}
 */
export function analyze(records) {
  if (!records || records.length === 0) {
    return {
      summary: { totalRequests: 0, uniqueUrls: 0, errors4xx: 0, errors5xx: 0, avgCrawlsPerUrl: 0, firstCrawl: null, lastCrawl: null },
      wastedBudget: [],
      undercrawled: [],
      timeline: { daily: {}, hourly: {} },
      statusDistribution: []
    };
  }

  // Group records by URL
  /** @type {Map<string, LogRecord[]>} */
  const urlMap = new Map();
  
  for (const record of records) {
    const url = record.requestUrl;
    if (!urlMap.has(url)) urlMap.set(url, []);
    urlMap.get(url).push(record);
  }

  // Summary statistics
  const totalRequests = records.length;
  const uniqueUrls = urlMap.size;
  const errors4xx = records.filter(r => r.statusCode >= 400 && r.statusCode < 500).length;
  const errors5xx = records.filter(r => r.statusCode >= 500).length;
  const avgCrawlsPerUrl = totalRequests / uniqueUrls;

  // Date range
  const dates = records
    .map(r => r.parsedDate)
    .filter(Boolean)
    .sort((a, b) => a - b);
  
  const firstCrawl = dates[0] || null;
  const lastCrawl = dates[dates.length - 1] || null;

  /** @type {SummaryStats} */
  const summary = { totalRequests, uniqueUrls, errors4xx, errors5xx, avgCrawlsPerUrl, firstCrawl, lastCrawl };

  // Wasted Crawl Budget: URLs with 4xx/5xx errors, crawled more than once
  /** @type {WastedBudgetEntry[]} */
  const wastedBudget = [];
  
  for (const [url, urlRecords] of urlMap) {
    const errorRecords = urlRecords.filter(r => r.statusCode >= 400);
    if (errorRecords.length > 1) {
      const sorted = [...urlRecords].sort((a, b) => {
        if (a.parsedDate && b.parsedDate) return b.parsedDate - a.parsedDate;
        return 0;
      });
      wastedBudget.push({
        url,
        totalRequests: urlRecords.length,
        errorCount: errorRecords.length,
        lastStatus: sorted[0].statusCode,
        errorRate: Math.round((errorRecords.length / urlRecords.length) * 100)
      });
    }
  }
  
  // Sort by error count descending
  wastedBudget.sort((a, b) => b.errorCount - a.errorCount);

  // Undercrawled Valuable Pages: 200 OK pages crawled less than average
  /** @type {UndercrawledEntry[]} */
  const undercrawled = [];
  
  for (const [url, urlRecords] of urlMap) {
    const successRecords = urlRecords.filter(r => r.statusCode === 200);
    if (successRecords.length > 0 && successRecords.length < avgCrawlsPerUrl) {
      const belowAvgPercent = Math.round(((avgCrawlsPerUrl - successRecords.length) / avgCrawlsPerUrl) * 100);
      undercrawled.push({
        url,
        crawlCount: successRecords.length,
        belowAvgPercent,
      });
    }
  }
  
  // Sort by crawl count ascending (least crawled first)
  undercrawled.sort((a, b) => a.crawlCount - b.crawlCount);

  // Timeline data
  /** @type {Record<string, number>} */
  const daily = {};
  /** @type {Record<string, number>} */
  const hourly = {};
  
  for (const record of records) {
    if (record.parsedDate) {
      const d = record.parsedDate;
      const dayKey = d.toISOString().split('T')[0]; // YYYY-MM-DD
      const hourKey = `${dayKey} ${String(d.getUTCHours()).padStart(2, '0')}`;
      
      daily[dayKey] = (daily[dayKey] || 0) + 1;
      hourly[hourKey] = (hourly[hourKey] || 0) + 1;
    }
  }

  // Status distribution
  /** @type {Map<number, number>} */
  const statusMap = new Map();
  for (const record of records) {
    statusMap.set(record.statusCode, (statusMap.get(record.statusCode) || 0) + 1);
  }
  
  /** @type {StatusDistribution[]} */
  const statusDistribution = [];
  for (const [status, count] of statusMap) {
    statusDistribution.push({
      status: String(status),
      count,
      percent: Math.round((count / totalRequests) * 100)
    });
  }
  statusDistribution.sort((a, b) => b.count - a.count);

  return { summary, wastedBudget, undercrawled, timeline: { daily, hourly }, statusDistribution };
}

/**
 * Compare two subsets of records (e.g., different time ranges)
 * @param {LogRecord[]} recordsA
 * @param {LogRecord[]} recordsB
 * @returns {{ a: AnalysisResult, b: AnalysisResult, diff: object }}
 */
export function compareRanges(recordsA, recordsB) {
  const a = analyze(recordsA);
  const b = analyze(recordsB);
  
  const diff = {
    requestsDiff: b.summary.totalRequests - a.summary.totalRequests,
    requestsDiffPercent: a.summary.totalRequests > 0
      ? Math.round(((b.summary.totalRequests - a.summary.totalRequests) / a.summary.totalRequests) * 100)
      : 0,
    errors4xxDiff: b.summary.errors4xx - a.summary.errors4xx,
    errors5xxDiff: b.summary.errors5xx - a.summary.errors5xx,
    wastedUrlsDiff: b.wastedBudget.length - a.wastedBudget.length,
  };
  
  return { a, b, diff };
}

/**
 * Filter records by date range
 * @param {LogRecord[]} records
 * @param {Date} start
 * @param {Date} end
 * @returns {LogRecord[]}
 */
export function filterByDateRange(records, start, end) {
  return records.filter(r => {
    if (!r.parsedDate) return false;
    return r.parsedDate >= start && r.parsedDate <= end;
  });
}
