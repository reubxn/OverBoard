<div align="center">

<h1>OVERBOARD</h1>
<h3><em>Download locked Blackboard content with one click</em></h3>

<img src="icon.png" alt="Overboard icon" width="120" />

<p>
  <a href="https://github.com/reubxn/OverBoard"><img src="https://img.shields.io/badge/Platform-Chrome-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Chrome"></a>
  <a href="https://github.com/reubxn/OverBoard"><img src="https://img.shields.io/badge/Version-1.0-00bfa5?style=for-the-badge" alt="Version 1.0"></a>
  <a href="https://github.com/reubxn/OverBoard"><img src="https://img.shields.io/badge/Manifest-V3-1d1d1d?style=for-the-badge" alt="Manifest V3"></a>
</p>

</div>

---

Overboard is a Chrome extension that automatically detects non-downloadable PDFs and files on Blackboard LMS and injects a **Download** button — no inspect element, no URL decoder, no faff.

It works by reading the exposed `pdfUrl` and `originalUrl` parameters from the Blackboard document viewer iframe and triggering a direct download.

---

## Install

1. Clone or download this repo
2. Go to `chrome://extensions` and enable **Developer mode**
3. Click **Load unpacked** and select the folder
4. Open any locked content on Blackboard — the button appears automatically

---

## How it works

Blackboard's document viewer exposes the real file URL as a query parameter (`pdfUrl` for PDFs, `originalUrl` for other files) in the iframe src. Overboard reads that URL, decodes it, and downloads the file directly from the source.
