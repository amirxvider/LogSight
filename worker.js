/**
 * worker.js - Web Worker for parsing server log files
 * Runs in a separate thread to prevent UI blocking on large files
 */

/**
 * Apache/Nginx Combined Log Format regex
 * Format: IP - user [time] "METHOD URL HTTP/x.x" status size "referer" "user-agent"
 */
const LOG_REGEX = /^(\S+)\s+(\S+)\s+(\S+)\s+\[([^\]]+)\]\s+"([A-Z]+)\s+(\S+)\s+HTTP\/(\S+)"\s+(\d{3})\s+(\S+)\s+"([^"]*)"\s+"([^"]*)"/;

/**
 * Parse a single log line into a structured object
 * @param {string} line
 * @returns {object|null}
 */
function parseLine(line) {
  line = line.trim();
  if (!line) return null;

  const match = line.match(LOG_REGEX);
  if (!match) return null;

  const [, ipAddress, remoteIdent, remoteUser, timeLocal, requestMethod, requestUrl, httpVersion, statusCode, responseSize, referer, userAgent] = match;

  return {
    ipAddress,
    remoteIdent,
    remoteUser,
    timeLocal,
    requestMethod,
    requestUrl,
    httpVersion,
    statusCode: parseInt(statusCode, 10),
    responseSize: responseSize === '-' ? 0 : parseInt(responseSize, 10),
    referer: referer === '-' ? null : referer,
    userAgent,
  };
}

/**
 * Parse the timeLocal string from Apache/Nginx logs
 * Format: "15/Jan/2025:08:01:23 +0000"
 * @param {string} timeLocal
 * @returns {Date|null}
 */
function parseLogDate(timeLocal) {
  // Apache/Nginx format: "15/Jan/2025:08:01:23 +0000"
  const months = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };
  
  const m = timeLocal.match(/(\d{2})\/(\w{3})\/(\d{4}):(\d{2}):(\d{2}):(\d{2})\s+([+-]\d{4})/);
  if (!m) return null;
  
  const [, day, month, year, hour, min, sec, tz] = m;
  const tzOffset = parseInt(tz.slice(0, 3)) * 60 + parseInt(tz.slice(3));
  
  return new Date(Date.UTC(
    parseInt(year),
    months[month] || 0,
    parseInt(day),
    parseInt(hour) - Math.floor(tzOffset / 60),
    parseInt(min) - (tzOffset % 60),
    parseInt(sec)
  ));
}

/**
 * Main message handler for the worker
 */
self.onmessage = function(e) {
  const { type, data } = e.data;
  
  if (type === 'PARSE') {
    const { text, chunkSize } = data;
    const lines = text.split('\n');
    const total = lines.length;
    
    /** @type {object[]} */
    const records = [];
    let parsed = 0;
    let errors = 0;
    let lastProgress = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Only process lines containing Googlebot
      if (!line.includes('Googlebot')) {
        parsed++;
        continue;
      }
      
      try {
        const record = parseLine(line);
        if (record) {
          // Add parsed date
          record.parsedDate = parseLogDate(record.timeLocal);
          records.push(record);
        }
      } catch (err) {
        errors++;
      }
      
      parsed++;
      
      // Report progress every 1% or every 1000 lines
      const progress = Math.floor((parsed / total) * 100);
      if (progress > lastProgress || parsed % 1000 === 0) {
        lastProgress = progress;
        self.postMessage({
          type: 'PROGRESS',
          data: { progress, parsed, total, found: records.length }
        });
      }
    }
    
    self.postMessage({
      type: 'COMPLETE',
      data: { records, total, errors }
    });
  }
};

self.onerror = function(err) {
  self.postMessage({
    type: 'ERROR',
    data: { message: err.message || 'Unknown worker error' }
  });
};
