import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './options.css';

const Options: React.FC = () => {
  const [settings, setSettings] = useState({
    extensionEnabled: true,
    theme: 'light' as 'light' | 'dark',
    notifications: true,
    clickCount: 0
  });

  useEffect(() => {
    // Load settings from storage
    chrome.storage.sync.get(['extensionEnabled', 'theme', 'notifications', 'clickCount'], (result) => {
      setSettings({
        extensionEnabled: result.extensionEnabled ?? true,
        theme: result.theme ?? 'light',
        notifications: result.notifications ?? true,
        clickCount: result.clickCount ?? 0
      });
    });
  }, []);

  const saveSettings = () => {
    chrome.storage.sync.set(settings, () => {
      // Show success message
      const message = document.getElementById('save-message');
      if (message) {
        message.style.display = 'block';
        setTimeout(() => {
          message.style.display = 'none';
        }, 2000);
      }
    });
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetAllData = () => {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      chrome.storage.sync.clear(() => {
        setSettings({
          extensionEnabled: true,
          theme: 'light',
          notifications: true,
          clickCount: 0
        });
        alert('All data has been reset.');
      });
    }
  };

  return (
    <div className="options">
      <header className="options-header">
        <h1 className="options-title">⚙️ Extension Settings</h1>
        <p className="options-subtitle">Configure your Chrome Extension Starter</p>
      </header>

      <main className="options-content">
        <div className="settings-section">
          <h2 className="section-title">General Settings</h2>

          <div className="setting-item">
            <label className="setting-label">
              <input
                type="checkbox"
                checked={settings.extensionEnabled}
                onChange={(e) => updateSetting('extensionEnabled', e.target.checked)}
              />
              Enable Extension
            </label>
            <p className="setting-description">
              Turn the extension on or off globally
            </p>
          </div>

          <div className="setting-item">
            <label className="setting-label">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => updateSetting('notifications', e.target.checked)}
              />
              Enable Notifications
            </label>
            <p className="setting-description">
              Show notifications for important events
            </p>
          </div>

          <div className="setting-item">
            <label className="setting-label">
              Theme:
              <select
                value={settings.theme}
                onChange={(e) => updateSetting('theme', e.target.value)}
                className="setting-select"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </label>
            <p className="setting-description">
              Choose your preferred theme
            </p>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">Statistics</h2>

          <div className="stat-item">
            <span className="stat-label">Total Clicks:</span>
            <span className="stat-value">{settings.clickCount}</span>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">Actions</h2>

          <div className="action-buttons">
            <button className="btn btn-primary" onClick={saveSettings}>
              💾 Save Settings
            </button>
            <button className="btn btn-danger" onClick={resetAllData}>
              🔄 Reset All Data
            </button>
          </div>

          <div id="save-message" className="save-message">
            ✅ Settings saved successfully!
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">About</h2>
          <div className="about-info">
            <p><strong>Version:</strong> {chrome.runtime.getManifest().version}</p>
            <p><strong>Description:</strong> A starter template for Chrome extensions</p>
            <p><strong>Built with:</strong> React, TypeScript, and Vite</p>
          </div>
        </div>
      </main>
    </div>
  );
};

// Mount the options page
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Options />);
}
