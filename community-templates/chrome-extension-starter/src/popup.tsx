import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './popup.css';

const Popup: React.FC = () => {
  const [count, setCount] = useState(0);
  const [currentTab, setCurrentTab] = useState<string>('');

  useEffect(() => {
    // Get current tab information
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url) {
        setCurrentTab(tabs[0].url);
      }
    });

    // Load saved count from storage
    chrome.storage.sync.get(['clickCount'], (result) => {
      if (result.clickCount) {
        setCount(result.clickCount);
      }
    });
  }, []);

  const incrementCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    chrome.storage.sync.set({ clickCount: newCount });
  };

  const resetCount = () => {
    setCount(0);
    chrome.storage.sync.set({ clickCount: 0 });
  };

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className="popup">
      <header className="popup-header">
        <h1 className="popup-title">🚀 Chrome Extension</h1>
        <p className="popup-subtitle">Starter Template</p>
      </header>

      <main className="popup-content">
        <div className="counter-section">
          <h2 className="section-title">Click Counter</h2>
          <div className="counter-display">
            <span className="counter-number">{count}</span>
          </div>
          <div className="counter-buttons">
            <button className="btn btn-primary" onClick={incrementCount}>
              Increment
            </button>
            <button className="btn btn-secondary" onClick={resetCount}>
              Reset
            </button>
          </div>
        </div>

        <div className="tab-info-section">
          <h2 className="section-title">Current Tab</h2>
          <p className="tab-url">
            {currentTab ? (
              <a href={currentTab} target="_blank" rel="noopener noreferrer">
                {currentTab.length > 50 ? `${currentTab.substring(0, 50)}...` : currentTab}
              </a>
            ) : (
              'No active tab'
            )}
          </p>
        </div>

        <div className="actions-section">
          <button className="btn btn-outline" onClick={openOptionsPage}>
            ⚙️ Settings
          </button>
        </div>
      </main>

      <footer className="popup-footer">
        <p className="footer-text">
          Built with React & TypeScript
        </p>
      </footer>
    </div>
  );
};

// Mount the popup
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Popup />);
}
