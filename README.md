# LogSight — Server Log Analyzer for SEO

<div align="center">

![LogSight Banner](https://img.shields.io/badge/LogSight-Server%20Log%20Analyzer-6366f1?style=for-the-badge&logo=google&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue?logo=github)](https://pages.github.com)
[![Privacy First](https://img.shields.io/badge/Privacy-100%25%20Client--Side-green)](https://github.com)

**[🚀 Live Demo](https://yourusername.github.io/logsight)** | **[📖 Documentation](#usage)** | **[☕ Buy Me a Coffee](https://buymeacoffee.com/yourusername)**

</div>

---

## 🌐 Languages / زبان‌ها

- [English](#english)
- [فارسی](#persian)

---

<a name="english"></a>

## 🔍 What is LogSight?

**LogSight** is a privacy-first, browser-based server log analyzer built specifically for SEO professionals. It helps you optimize your website's **Crawl Budget** — the number of pages Googlebot crawls per day — by identifying wasted crawl opportunities and uncovering undervalued pages.

> 🔒 **100% Private**: All processing happens entirely in your browser. Your log files **never leave your device** and are never sent to any server.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **Googlebot Filter** | Automatically extracts only Googlebot requests from your logs |
| 🗑️ **Wasted Crawl Budget** | URLs returning 4xx/5xx errors crawled more than once |
| 📉 **Undercrawled Pages** | Valuable 200-OK pages crawled below average |
| 📊 **Crawl Timeline** | Daily or hourly Googlebot activity chart |
| 🍩 **Status Distribution** | Doughnut chart of all HTTP status codes |
| 🔄 **Compare Ranges** | Before/after comparison of two time periods |
| 📤 **CSV Export** | Export any table to CSV for further analysis |
| 🌐 **Bilingual** | Full English and Persian (RTL) support |
| 🌙 **Dark/Light Mode** | Beautiful glassmorphism UI in both modes |
| ⚡ **Web Workers** | Large file processing without freezing the UI |

---

## 🚀 Quick Start (GitHub Pages)

1. **Fork or download** this repository
2. Go to your repository **Settings → Pages**
3. Set source to **main branch / root folder**
4. GitHub will give you a URL like `https://yourusername.github.io/logsight`
5. That's it! Open the URL and start analyzing logs.

---

## 📋 How to Extract Apache/Nginx Logs

### Apache

```bash
# View the access log
sudo tail -f /var/log/apache2/access.log

# Download recent logs (last 10,000 lines)
sudo tail -10000 /var/log/apache2/access.log > my-log.txt

# Download compressed logs
sudo cp /var/log/apache2/access.log.1 ~/my-log.log
```

### Nginx

```bash
# View the access log
sudo tail -f /var/log/nginx/access.log

# Download recent logs
sudo tail -10000 /var/log/nginx/access.log > my-log.txt

# From a remote server via SSH
scp user@yourserver.com:/var/log/nginx/access.log ./my-log.log
```

### Log Format

LogSight supports the standard **Combined Log Format**:

```
127.0.0.1 - frank [10/Oct/2000:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326 "http://www.example.com/start.html" "Mozilla/4.08"
```

---

## 🏗️ Architecture

### Why Client-Side Only?

1. **Privacy**: Your log files may contain sensitive IP addresses, URLs, and user behavior data. Processing them in the browser means zero data exposure.
2. **Speed**: No upload time — multi-gigabyte files are processed locally.
3. **Cost**: No server infrastructure needed. Free hosting on GitHub Pages.
4. **Simplicity**: Just open the URL and drop your file.

### Technology Stack

| Layer | Technology |
|---|---|
| UI Framework | Vanilla JavaScript (ES Modules) |
| Styling | Tailwind CSS (CDN) |
| Charts | Chart.js 4 |
| Concurrency | Web Workers API |
| Parsing | Regex-based Combined Log parser |
| i18n | Custom translation module |
| Storage | localStorage (theme + language only) |

### File Structure

```
logsight/
├── index.html          # Main SPA entry point + UI
├── i18n.js             # Translations (EN/FA) + language logic
├── analyzer.js         # Analysis engine (crawl budget metrics)
├── charts.js           # Chart.js rendering module
├── utils.js            # CSV export, formatting helpers
├── worker.js           # Web Worker for log parsing
├── sample-log.txt      # Demo log file
└── README.md           # This file
```

### How Web Workers Help

The log parsing runs in a **Web Worker** — a background thread separate from the main UI thread. This means:

- The UI stays responsive and interactive during processing
- You can cancel processing at any time
- Progress is reported in real-time
- Files up to several GB can be processed without any freezing

### Crawl Budget Metrics Explained

**Wasted Crawl Budget** = URLs that:
- Return HTTP 4xx (client errors, e.g. 404 Not Found) or 5xx (server errors)
- AND were crawled more than once by Googlebot
- Every re-crawl of an error page wastes a slot that could be used for a good page

**Undercrawled Valuable Pages** = URLs that:
- Return HTTP 200 (success)
- Were crawled fewer times than the average for all URLs
- These pages deserve more Googlebot attention but are not getting it

---

## 🗺️ Roadmap

- [x] Apache/Nginx Combined Log parsing
- [x] Googlebot-only filtering
- [x] Wasted crawl budget detection
- [x] Undercrawled pages detection
- [x] Timeline charts (daily/hourly)
- [x] Status code distribution
- [x] Before/after comparison
- [x] CSV export
- [x] RTL (Persian) support
- [ ] Multiple Googlebot variants (Smartphone, Image, etc.)
- [ ] URL clustering by path prefix
- [ ] Robots.txt overlap analysis
- [ ] Sitemaps.xml comparison

---

## 💖 Support

If LogSight saves you time, consider supporting development:

- ☕ [Buy Me a Coffee](https://buymeacoffee.com/yourusername)
- ⭐ Star this repo on GitHub
- 🐛 [Report an Issue](https://github.com/yourusername/logsight/issues)
- 🔀 Submit a Pull Request

---

<a name="persian"></a>

## 🔍 LogSight چیست؟

**LogSight** یک ابزار تحلیل لاگ سرور است که کاملاً در مرورگر اجرا می‌شود و برای متخصصان سئو طراحی شده. هدف اصلی آن بهینه‌سازی **بودجه خزش (Crawl Budget)** — تعداد صفحاتی که گوگل‌بات در روز خزش می‌کند — از طریق شناسایی فرصت‌های هدررفته و کشف صفحات کم‌دیده‌شده است.

> 🔒 **کاملاً خصوصی**: تمام پردازش‌ها در مرورگر شما انجام می‌شود. فایل‌های لاگ شما **هرگز از دستگاه‌تان خارج نمی‌شوند** و به هیچ سروری ارسال نمی‌شوند.

---

## ✨ ویژگی‌ها

- 🤖 **فیلتر گوگل‌بات** — استخراج خودکار فقط درخواست‌های گوگل‌بات
- 🗑️ **بودجه خزش هدررفته** — URLهایی با خطاهای 4xx/5xx که بارها خزیده شده‌اند
- 📉 **صفحات ارزشمند کم‌خزیده** — صفحات موفق با 200 که کمتر از میانگین خزیده شده‌اند
- 📊 **جدول زمانی خزش** — نمودار فعالیت روزانه یا ساعتی گوگل‌بات
- 🔄 **مقایسه بازه‌ها** — مقایسه قبل/بعد از بهینه‌سازی
- 📤 **خروجی CSV** — صدور هر جدول به فرمت CSV

---

## 🚀 شروع سریع (GitHub Pages)

۱. این ریپازیتوری را **Fork** کرده یا دانلود کنید  
۲. به **Settings → Pages** بروید  
۳. منبع را روی **main branch / root** تنظیم کنید  
۴. GitHub یک آدرس مثل `https://yourusername.github.io/logsight` می‌دهد  
۵. همین! آدرس را باز کنید و شروع به تحلیل لاگ کنید.

---

## 📋 چطور لاگ‌های Apache/Nginx را استخراج کنیم؟

### Apache

```bash
# آخرین ۱۰۰۰۰ خط لاگ
sudo tail -10000 /var/log/apache2/access.log > my-log.txt
```

### Nginx

```bash
# آخرین ۱۰۰۰۰ خط لاگ
sudo tail -10000 /var/log/nginx/access.log > my-log.txt

# از سرور ریموت
scp user@yourserver.com:/var/log/nginx/access.log ./my-log.log
```

---

## 📐 معماری

### چرا فقط سمت کلاینت؟

۱. **حریم خصوصی**: فایل‌های لاگ شما حاوی آدرس‌های IP و URLهای حساس هستند. پردازش در مرورگر = صفر نشت داده
۲. **سرعت**: بدون زمان آپلود — فایل‌های چند گیگابایتی به صورت محلی پردازش می‌شوند
۳. **هزینه صفر**: بدون نیاز به سرور — هاست رایگان روی GitHub Pages
۴. **سادگی**: فقط فایل را باز کنید و لاگ را بکشید داخل

### چرا Web Worker؟

پارسر لاگ در یک **Web Worker** — یک thread جداگانه در پس‌زمینه — اجرا می‌شود. این یعنی:
- UI در حین پردازش فایل‌های بزرگ کاملاً پاسخگو می‌ماند
- می‌توانید در هر لحظه پردازش را لغو کنید
- پیشرفت در زمان واقعی گزارش می‌شود

---

## 📄 لایسنس

MIT License — آزاد برای استفاده شخصی و تجاری

---

<div align="center">
  <strong>Built with ❤️ for the SEO community</strong><br>
  <sub>If this tool helped you, please ⭐ star the repo!</sub>
</div>
