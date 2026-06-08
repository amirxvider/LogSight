/**
 * charts.js - Chart rendering module using Chart.js
 * Renders crawl timeline and status distribution charts
 */

/** @type {Chart|null} */
let timelineChart = null;
/** @type {Chart|null} */
let statusChart = null;

/**
 * Color palette for charts — adapts to dark/light mode
 */
const CHART_COLORS = {
  primary: '#6366f1',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  purple: '#a855f7',
  teal: '#14b8a6',
  orange: '#f97316',
};

const STATUS_COLOR_MAP = {
  '200': '#22c55e',
  '301': '#3b82f6',
  '302': '#6366f1',
  '304': '#8b5cf6',
  '400': '#f59e0b',
  '403': '#f97316',
  '404': '#ef4444',
  '410': '#dc2626',
  '500': '#991b1b',
  '503': '#7f1d1d',
};

/**
 * Get Chart.js global defaults for dark mode
 * @param {boolean} isDark
 */
function getChartDefaults(isDark) {
  return {
    textColor: isDark ? '#e5e7eb' : '#1f2937',
    gridColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    backgroundColor: isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)',
    borderColor: '#6366f1',
  };
}

/**
 * Render or update the crawl timeline chart
 * @param {Record<string, number>} daily
 * @param {Record<string, number>} hourly
 * @param {'daily'|'hourly'} mode
 * @param {boolean} isDark
 */
export function renderTimeline(daily, hourly, mode = 'daily', isDark = true) {
  const canvas = document.getElementById('timeline-chart');
  if (!canvas) return;
  
  if (timelineChart) {
    timelineChart.destroy();
    timelineChart = null;
  }
  
  const data = mode === 'daily' ? daily : hourly;
  const sortedKeys = Object.keys(data).sort();
  const values = sortedKeys.map(k => data[k]);
  
  const defaults = getChartDefaults(isDark);
  
  timelineChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: sortedKeys,
      datasets: [{
        label: 'Googlebot Requests',
        data: values,
        borderColor: defaults.borderColor,
        backgroundColor: defaults.backgroundColor,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: sortedKeys.length > 50 ? 0 : 4,
        pointHoverRadius: 6,
        pointBackgroundColor: defaults.borderColor,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: isDark ? '#1f2937' : '#fff',
          titleColor: isDark ? '#f9fafb' : '#111827',
          bodyColor: isDark ? '#d1d5db' : '#374151',
          borderColor: '#6366f1',
          borderWidth: 1,
          padding: 12,
        }
      },
      scales: {
        x: {
          grid: { color: defaults.gridColor },
          ticks: {
            color: defaults.textColor,
            maxTicksLimit: 15,
            maxRotation: 45,
            font: { size: 11 }
          }
        },
        y: {
          grid: { color: defaults.gridColor },
          ticks: {
            color: defaults.textColor,
            font: { size: 11 }
          },
          beginAtZero: true,
        }
      }
    }
  });
}

/**
 * Render or update the status distribution chart
 * @param {Array<{status: string, count: number, percent: number}>} statusData
 * @param {boolean} isDark
 */
export function renderStatusChart(statusData, isDark = true) {
  const canvas = document.getElementById('status-chart');
  if (!canvas) return;
  
  if (statusChart) {
    statusChart.destroy();
    statusChart = null;
  }
  
  const labels = statusData.map(d => `HTTP ${d.status}`);
  const values = statusData.map(d => d.count);
  const colors = statusData.map(d => STATUS_COLOR_MAP[d.status] || '#6366f1');
  
  const defaults = getChartDefaults(isDark);
  
  statusChart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors.map(c => c + 'cc'), // semi-transparent
        borderColor: colors,
        borderWidth: 2,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: defaults.textColor,
            padding: 16,
            font: { size: 12 },
            usePointStyle: true,
            pointStyleWidth: 12,
          }
        },
        tooltip: {
          backgroundColor: isDark ? '#1f2937' : '#fff',
          titleColor: isDark ? '#f9fafb' : '#111827',
          bodyColor: isDark ? '#d1d5db' : '#374151',
          borderColor: '#6366f1',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: (ctx) => {
              const item = statusData[ctx.dataIndex];
              return ` ${item.count} requests (${item.percent}%)`;
            }
          }
        }
      }
    }
  });
}

/**
 * Render comparison bar chart
 * @param {{a: object, b: object}} compareData
 * @param {boolean} isDark
 */
export function renderCompareChart(compareData, isDark = true) {
  const canvas = document.getElementById('compare-chart');
  if (!canvas) return;
  
  const existingChart = Chart.getChart(canvas);
  if (existingChart) existingChart.destroy();

  const defaults = getChartDefaults(isDark);
  const { a, b } = compareData;

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['Total Requests', '4xx Errors', '5xx Errors', 'Unique URLs', 'Wasted URLs'],
      datasets: [
        {
          label: 'Range A (Before)',
          data: [
            a.summary.totalRequests,
            a.summary.errors4xx,
            a.summary.errors5xx,
            a.summary.uniqueUrls,
            a.wastedBudget.length
          ],
          backgroundColor: 'rgba(99,102,241,0.7)',
          borderColor: '#6366f1',
          borderWidth: 1,
        },
        {
          label: 'Range B (After)',
          data: [
            b.summary.totalRequests,
            b.summary.errors4xx,
            b.summary.errors5xx,
            b.summary.uniqueUrls,
            b.wastedBudget.length
          ],
          backgroundColor: 'rgba(34,197,94,0.7)',
          borderColor: '#22c55e',
          borderWidth: 1,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: defaults.textColor, font: { size: 12 } }
        },
        tooltip: {
          backgroundColor: isDark ? '#1f2937' : '#fff',
          titleColor: isDark ? '#f9fafb' : '#111827',
          bodyColor: isDark ? '#d1d5db' : '#374151',
          borderColor: '#6366f1',
          borderWidth: 1,
        }
      },
      scales: {
        x: {
          grid: { color: defaults.gridColor },
          ticks: { color: defaults.textColor }
        },
        y: {
          grid: { color: defaults.gridColor },
          ticks: { color: defaults.textColor },
          beginAtZero: true,
        }
      }
    }
  });
}

/**
 * Update all chart colors when theme changes
 * @param {boolean} isDark
 */
export function updateChartsTheme(isDark) {
  if (timelineChart) timelineChart.update();
  if (statusChart) statusChart.update();
}

/**
 * Destroy all charts (cleanup)
 */
export function destroyCharts() {
  if (timelineChart) { timelineChart.destroy(); timelineChart = null; }
  if (statusChart) { statusChart.destroy(); statusChart = null; }
}
