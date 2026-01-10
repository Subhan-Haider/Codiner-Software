// Content script that runs on web pages
// This script can interact with the DOM of web pages

console.log('Chrome Extension Starter content script loaded');

// Example: Add a small indicator to show the extension is active
const createExtensionIndicator = () => {
  const indicator = document.createElement('div');
  indicator.id = 'chrome-extension-indicator';
  indicator.innerHTML = `
    <div style="
      position: fixed;
      top: 10px;
      right: 10px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 8px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      z-index: 10000;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      cursor: pointer;
      transition: all 0.2s ease;
    ">
      🚀 Extension Active
    </div>
  `;

  // Add click handler to toggle visibility
  const indicatorElement = indicator.firstElementChild as HTMLElement;
  indicatorElement.addEventListener('click', () => {
    indicatorElement.style.display = 'none';
  });

  // Auto-hide after 5 seconds
  setTimeout(() => {
    if (indicatorElement && indicatorElement.style.display !== 'none') {
      indicatorElement.style.opacity = '0';
      setTimeout(() => {
        indicatorElement.style.display = 'none';
      }, 200);
    }
  }, 5000);

  document.body.appendChild(indicator);
};

// Only show indicator on certain pages (example condition)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Uncomment to show indicator on all pages
    // createExtensionIndicator();
  });
} else {
  // Document already loaded
  // createExtensionIndicator();
}

// Listen for messages from popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Content script received message:', request);

  if (request.type === 'GET_PAGE_INFO') {
    sendResponse({
      title: document.title,
      url: window.location.href,
      domain: window.location.hostname
    });
  }

  if (request.type === 'MODIFY_PAGE') {
    // Example: Change background color
    document.body.style.backgroundColor = request.color || '#f0f8ff';
    sendResponse({ success: true });
  }
});

// Example: Monitor DOM changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      // New elements added to DOM
      // console.log('New elements added:', mutation.addedNodes);
    }
  });
});

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  observer.disconnect();
});

export {};
