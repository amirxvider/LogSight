/**
 * i18n.js - Internationalization module for LogSight
 * Supports English (en) and Persian/Farsi (fa) with full RTL support
 */

/** @type {Record<string, Record<string, string>>} */
const translations = {
  en: {
    // Header
    appName: "LogSight",
    appTagline: "Server Log Analyzer for SEO",
    langToggle: "فارسی",
    themeToggle: "Toggle Theme",
    githubLink: "GitHub",

    // Hero / Upload Area
    heroTitle: "Analyze Your Server Logs",
    heroSubtitle: "Optimize Googlebot's Crawl Budget with actionable insights",
    privacyBadge: "🔒 100% Private",
    privacyText: "All processing is done in your browser. Your log files never leave your device.",
    
    // Upload
    uploadTitle: "Upload Log File",
    uploadDrag: "Drag & drop your log file here",
    uploadOr: "or",
    uploadBtn: "Choose File",
    uploadFormats: "Supported: Apache/Nginx Combined Log Format (.log, .txt)",
    uploadMaxSize: "Max file size: 50 MB",
    loadSample: "Load Sample Log",
    
    // Processing
    processing: "Processing...",
    processingLines: "Processing lines",
    cancel: "Cancel",
    complete: "Complete",
    error: "Error",
    
    // Summary Cards
    totalRequests: "Total Googlebot Requests",
    uniqueUrls: "Unique URLs",
    errors4xx: "4xx Client Errors",
    errors5xx: "5xx Server Errors",
    avgResponseNote: "Response time not in standard log format",
    
    // Tabs
    tabWasted: "Wasted Crawl Budget",
    tabUndercrawled: "Undercrawled Pages",
    tabTimeline: "Crawl Timeline",
    tabStatus: "Status Distribution",
    
    // Wasted Budget Table
    wastedTitle: "Wasted Crawl Budget",
    wastedDesc: "URLs with 4xx/5xx errors crawled more than once — wasting Googlebot's budget",
    colUrl: "URL",
    colTotalRequests: "Total Requests",
    colErrors: "Errors",
    colLastStatus: "Last Status",
    colErrorRate: "Error Rate",
    searchPlaceholder: "Search URLs...",
    filterStatus: "Filter by status",
    allStatuses: "All Statuses",
    exportCSV: "Export CSV",
    noData: "No data found",
    
    // Undercrawled Table
    undercrawledTitle: "Undercrawled Valuable Pages",
    undercrawledDesc: "200-OK pages crawled less than average — potentially undervalued by Googlebot",
    colCrawlCount: "Crawl Count",
    colBelowAvg: "Below Average",
    filterPath: "Filter by path (e.g. /blog)",
    avgCrawls: "Average crawls",
    
    // Charts
    timelineTitle: "Crawl Timeline",
    timelineDesc: "Googlebot requests over time",
    viewDaily: "Daily",
    viewHourly: "Hourly",
    statusTitle: "Status Code Distribution",
    statusDesc: "HTTP status codes received by Googlebot",
    requests: "Requests",
    
    // Compare
    compareTitle: "Compare Time Ranges",
    compareDesc: "Compare Googlebot activity between two date ranges",
    rangeA: "Range A (Before)",
    rangeB: "Range B (After)",
    startDate: "Start Date",
    endDate: "End Date",
    compareBtn: "Compare",
    
    // Errors
    errInvalidFormat: "Invalid log format. Please use Apache/Nginx Combined Log Format.",
    errFileSize: "File too large. Maximum size is 50 MB.",
    errFileType: "Unsupported file type. Use .log, .txt files.",
    errWorker: "Processing error occurred. Please try again.",
    errNoGooglebot: "No Googlebot entries found in this log file.",
    errParsing: "Error parsing log file. Check the format and try again.",
    
    // Footer
    footerText: "Built with ❤️ for SEO professionals",
    footerPrivacy: "All data stays in your browser",
    
    // Misc
    rows: "rows",
    of: "of",
    showing: "Showing",
  },
  fa: {
    // Header
    appName: "LogSight",
    appTagline: "آنالایزر لاگ سرور برای سئو",
    langToggle: "English",
    themeToggle: "تغییر تم",
    githubLink: "گیت‌هاب",

    // Hero / Upload Area
    heroTitle: "لاگ‌های سرور خود را تحلیل کنید",
    heroSubtitle: "بودجه خزش گوگل‌بات را با بینش‌های عملی بهینه کنید",
    privacyBadge: "🔒 کاملاً خصوصی",
    privacyText: "تمام پردازش‌ها در مرورگر شما انجام می‌شود. فایل‌های لاگ شما هرگز از دستگاه‌تان خارج نمی‌شوند.",
    
    // Upload
    uploadTitle: "آپلود فایل لاگ",
    uploadDrag: "فایل لاگ را اینجا بکشید و رها کنید",
    uploadOr: "یا",
    uploadBtn: "انتخاب فایل",
    uploadFormats: "پشتیبانی: فرمت لاگ Apache/Nginx (.log, .txt)",
    uploadMaxSize: "حداکثر حجم: ۵۰ مگابایت",
    loadSample: "بارگذاری لاگ نمونه",
    
    // Processing
    processing: "در حال پردازش...",
    processingLines: "پردازش خطوط",
    cancel: "لغو",
    complete: "کامل",
    error: "خطا",
    
    // Summary Cards
    totalRequests: "کل درخواست‌های گوگل‌بات",
    uniqueUrls: "URLهای منحصربه‌فرد",
    errors4xx: "خطاهای کلاینت 4xx",
    errors5xx: "خطاهای سرور 5xx",
    avgResponseNote: "زمان پاسخ در فرمت استاندارد لاگ موجود نیست",
    
    // Tabs
    tabWasted: "بودجه خزش هدررفته",
    tabUndercrawled: "صفحات کم‌خزیده",
    tabTimeline: "جدول زمانی خزش",
    tabStatus: "توزیع وضعیت",
    
    // Wasted Budget Table
    wastedTitle: "بودجه خزش هدررفته",
    wastedDesc: "URLهایی با خطاهای 4xx/5xx که بیش از یک بار خزیده شده‌اند و بودجه گوگل‌بات را هدر می‌دهند",
    colUrl: "URL",
    colTotalRequests: "کل درخواست‌ها",
    colErrors: "خطاها",
    colLastStatus: "آخرین وضعیت",
    colErrorRate: "نرخ خطا",
    searchPlaceholder: "جستجوی URL...",
    filterStatus: "فیلتر بر اساس وضعیت",
    allStatuses: "همه وضعیت‌ها",
    exportCSV: "خروجی CSV",
    noData: "داده‌ای یافت نشد",
    
    // Undercrawled Table
    undercrawledTitle: "صفحات ارزشمند کم‌خزیده",
    undercrawledDesc: "صفحات با وضعیت ۲۰۰ که کمتر از میانگین خزیده شده‌اند — احتمالاً از دید گوگل‌بات دور مانده‌اند",
    colCrawlCount: "تعداد خزش",
    colBelowAvg: "کمتر از میانگین",
    filterPath: "فیلتر بر اساس مسیر (مثلاً /blog)",
    avgCrawls: "میانگین خزش",
    
    // Charts
    timelineTitle: "جدول زمانی خزش",
    timelineDesc: "درخواست‌های گوگل‌بات در طول زمان",
    viewDaily: "روزانه",
    viewHourly: "ساعتی",
    statusTitle: "توزیع کدهای وضعیت",
    statusDesc: "کدهای HTTP دریافت‌شده توسط گوگل‌بات",
    requests: "درخواست",
    
    // Compare
    compareTitle: "مقایسه بازه‌های زمانی",
    compareDesc: "فعالیت گوگل‌بات را بین دو بازه زمانی مقایسه کنید",
    rangeA: "بازه A (قبل)",
    rangeB: "بازه B (بعد)",
    startDate: "تاریخ شروع",
    endDate: "تاریخ پایان",
    compareBtn: "مقایسه",
    
    // Errors
    errInvalidFormat: "فرمت لاگ نامعتبر است. لطفاً از فرمت Apache/Nginx Combined Log استفاده کنید.",
    errFileSize: "فایل خیلی بزرگ است. حداکثر حجم ۵۰ مگابایت است.",
    errFileType: "نوع فایل پشتیبانی نمی‌شود. از فایل‌های .log یا .txt استفاده کنید.",
    errWorker: "خطا در پردازش رخ داد. لطفاً دوباره امتحان کنید.",
    errNoGooglebot: "هیچ ورودی گوگل‌بات در این فایل لاگ یافت نشد.",
    errParsing: "خطا در پارس فایل لاگ. فرمت را بررسی کرده و دوباره امتحان کنید.",
    
    // Footer
    footerText: "ساخته شده با ❤️ برای متخصصان سئو",
    footerPrivacy: "تمام داده‌ها در مرورگر شما می‌مانند",
    
    // Misc
    rows: "ردیف",
    of: "از",
    showing: "نمایش",
  }
};

/**
 * Detect the best language based on URL param, localStorage, or browser language
 * @returns {'en' | 'fa'}
 */
function detectLanguage() {
  // 1. Check URL param ?lang=fa
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  if (urlLang === 'fa' || urlLang === 'en') return urlLang;

  // 2. Check localStorage
  const saved = localStorage.getItem('logsight_lang');
  if (saved === 'fa' || saved === 'en') return saved;

  // 3. Check browser language
  const browserLang = navigator.language || '';
  if (browserLang.startsWith('fa')) return 'fa';

  return 'en';
}

/** @type {'en' | 'fa'} */
let currentLang = detectLanguage();

/**
 * Get a translation string by key
 * @param {string} key
 * @returns {string}
 */
function t(key) {
  return translations[currentLang][key] || translations['en'][key] || key;
}

/**
 * Apply RTL/LTR direction to the document
 * @param {'en' | 'fa'} lang
 */
function applyDirection(lang) {
  const html = document.documentElement;
  if (lang === 'fa') {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'fa');
    html.classList.add('rtl');
  } else {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
    html.classList.remove('rtl');
  }
}

/**
 * Update all DOM elements with data-i18n attribute
 */
function updateDOM() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) el.setAttribute('placeholder', t(key));
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (key) el.setAttribute('title', t(key));
  });
}

/**
 * Switch language and update everything
 * @param {'en' | 'fa'} lang
 */
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('logsight_lang', lang);
  applyDirection(lang);
  updateDOM();
  
  // Dispatch custom event for modules to react
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  
  // Update URL without reload
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url.toString());
}

/**
 * Toggle between en and fa
 */
function toggleLanguage() {
  setLanguage(currentLang === 'en' ? 'fa' : 'en');
}

// Initialize direction on load
applyDirection(currentLang);

export { t, currentLang, setLanguage, toggleLanguage, updateDOM, detectLanguage };
