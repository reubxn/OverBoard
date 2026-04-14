chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'download' && msg.url) {
    chrome.downloads.download({ url: msg.url });
  }
});
