// Background script for Chrome extension
// This runs in the background and handles extension lifecycle events

console.log('Chrome Extension Starter background script loaded');

// Extension installation event
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed or updated:', details.reason);

  if (details.reason === 'install') {
    // First time installation
    console.log('Extension installed for the first time');

    // Initialize default storage values
    chrome.storage.sync.set({
      clickCount: 0,
      extensionEnabled: true,
      theme: 'light'
    });
  } else if (details.reason === 'update') {
    // Extension updated
    console.log('Extension updated to version:', chrome.runtime.getManifest().version);
  }
});

// Handle extension icon click (when no popup is defined)
// chrome.action.onClicked.addListener((tab) => {
//   console.log('Extension icon clicked on tab:', tab.id);
// });

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request, 'from:', sender);

  if (request.type === 'GET_TAB_INFO') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ currentTab: tabs[0] });
    });
    return true; // Keep the message channel open for async response
  }

  if (request.type === 'UPDATE_BADGE') {
    // Update extension badge
    chrome.action.setBadgeText({ text: request.count?.toString() || '' });
    chrome.action.setBadgeBackgroundColor({ color: '#10b981' });
    sendResponse({ success: true });
  }
});

// Handle context menu (if you want to add one)
// You would need to add "contextMenus" permission to manifest.json
/*
chrome.contextMenus.create({
  title: "Chrome Extension Starter",
  contexts: ["page"],
  onclick: (info, tab) => {
    console.log('Context menu clicked:', info, tab);
  }
});
*/

// Periodic tasks (example)
// setInterval(() => {
//   console.log('Background script is running...');
// }, 60000); // Every minute

export {};
