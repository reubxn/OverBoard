(function () {
  if (window.__bbDlLoaded) return;
  window.__bbDlLoaded = true;

  // pdfUrl is used for PDFs, originalUrl for other file types — prefer originalUrl
  function getDownloadUrl() {
    try {
      const u = new URL(location.href);
      const raw = u.searchParams.get('originalUrl') || u.searchParams.get('pdfUrl');
      return raw ? decodeURIComponent(raw) : null;
    } catch {
      return null;
    }
  }

  function getFilename(downloadUrl) {
    try {
      const u = new URL(downloadUrl);
      const disposition = u.searchParams.get('response-content-disposition');
      if (disposition) {
        const utf8 = disposition.match(/filename\*=UTF-8''([^&;]+)/i);
        if (utf8) return decodeURIComponent(utf8[1]);
        const plain = disposition.match(/filename="?([^"&;]+)"?/i);
        if (plain) return plain[1];
      }
    } catch {}
    return 'download';
  }

  function injectButton(downloadUrl, filename) {
    if (document.getElementById('__bb_dl_btn')) return;

    const btn = document.createElement('button');
    btn.id = '__bb_dl_btn';
    btn.textContent = 'Download';
    Object.assign(btn.style, {
      position: 'fixed',
      top: '12px',
      right: '12px',
      zIndex: '2147483647',
      background: '#00bfa5',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      padding: '6px 14px',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: '12px',
      fontWeight: '700',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
    });

    btn.onclick = () => {
      chrome.runtime.sendMessage({ action: 'download', url: downloadUrl, filename });
      btn.textContent = 'Downloading...';
      btn.style.background = '#1d1d1d';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Download';
        btn.style.background = '#00bfa5';
        btn.disabled = false;
      }, 3000);
    };

    // wait for body if not ready
    const attach = () => document.body ? document.body.appendChild(btn) : setTimeout(attach, 100);
    attach();
  }

  const downloadUrl = getDownloadUrl();
  if (downloadUrl) {
    const filename = getFilename(downloadUrl);
    injectButton(downloadUrl, filename);
  }
})();
