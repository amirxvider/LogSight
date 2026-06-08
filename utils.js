/**
 * utils.js - Utility functions for LogSight
 * Covers: formatting, CSV export, localStorage helpers, file reading
 */

/**
 * Format a number with locale-friendly separators
 * @param {number} n
 * @returns {string}
 */
export function formatNumber(n) {
  return n.toLocaleString('en-US');
}

/**
 * Format a date for display
 * @param {Date|null} date
 * @returns {string}
 */
export function formatDate(date) {
  if (!date) return '-';
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

/**
 * Format bytes to human-readable size
 * @param {number} bytes
 * @returns {string}
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Get the appropriate status badge color class
 * @param {number} status
 * @returns {string} Tailwind CSS classes
 */
export function getStatusColor(status) {
  if (status >= 500) return 'bg-red-900/50 text-red-300 border border-red-700';
  if (status >= 400) return 'bg-orange-900/50 text-orange-300 border border-orange-700';
  if (status >= 300) return 'bg-blue-900/50 text-blue-300 border border-blue-700';
  if (status >= 200) return 'bg-green-900/50 text-green-300 border border-green-700';
  return 'bg-gray-800 text-gray-300 border border-gray-600';
}

/**
 * Export data to CSV file
 * @param {string[][]} rows - 2D array, first row is headers
 * @param {string} filename
 */
export function exportToCSV(rows, filename) {
  const csv = rows.map(row =>
    row.map(cell => {
      const str = String(cell ?? '');
      // Escape quotes and wrap in quotes if needed
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    }).join(',')
  ).join('\r\n');

  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Debounce a function call
 * @param {Function} fn
 * @param {number} delay ms
 * @returns {Function}
 */
export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * localStorage helpers with error handling
 */
export const storage = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch {}
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch {}
  }
};

/**
 * Read a file as text using FileReader
 * @param {File} file
 * @returns {Promise<string>}
 */
export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = () => reject(new Error('File read error'));
    reader.readAsText(file, 'UTF-8');
  });
}

/**
 * Truncate a URL for display
 * @param {string} url
 * @param {number} maxLen
 * @returns {string}
 */
export function truncateUrl(url, maxLen = 60) {
  if (url.length <= maxLen) return url;
  return url.slice(0, maxLen - 3) + '...';
}

/**
 * Filter an array of objects by a search term across specified keys
 * @param {object[]} arr
 * @param {string} term
 * @param {string[]} keys
 * @returns {object[]}
 */
export function filterByTerm(arr, term, keys) {
  if (!term) return arr;
  const lower = term.toLowerCase();
  return arr.filter(obj =>
    keys.some(k => String(obj[k] ?? '').toLowerCase().includes(lower))
  );
}
