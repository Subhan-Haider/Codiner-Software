# 🧠 How Auto-Update Works in Codiner

## 🔄 The Magic Behind "It Just Works"

Think of the auto-updater as a small engine inside Codiner that wakes up every time you start the app. It handles everything silently so you don't have to manualy download installers.

---

### 1️⃣ Step-by-Step Flow

#### **1. App Starts & Checks**
When you open Codiner, the app waits 10 seconds (to let everything load) and then secretly contacts GitHub.
- **Action:** `autoUpdater.checkForUpdates()`
- **Server:** Checks `https://github.com/Subhan-Haider/Codiner-Software/releases/latest.yml`

#### **2. Compare Versions**
The app compares your installed version with the one on GitHub.
- **You:** `v0.32.0`
- **GitHub:** `v0.33.0`
- **Result:** "New version found! 🚀"

#### **3. Download (Background)**
If a new version exists, Codiner asks: *"Update Available! Download now?"*
- You click **Download**.
- The app downloads the new setup file (`Codiner-Setup-0.33.0.exe`) to a temporary folder in the background.
- You can keep working while this happens.

#### **4. Ready to Install**
Once the download is 100% complete, Codiner asks: *"Update Ready! Restart now?"*
- You click **Restart Now**.

#### **5. Replace & Restart**
This is where the magic happens:
1. App closes.
2. The updater replaces the old program files with the new ones.
3. The app opens again, now running the new version! ✨

---

### 📦 What Happens on GitHub?

When the Codiner team publishes a new release, `electron-forge` automatically uploads these 3 critical files:

| File | Purpose |
|------|---------|
| `Codiner-Setup-0.33.0.exe` | The actual installer for the new version. |
| `latest.yml` | Validates the version number and file integrity (checksum). |
| `*.blockmap` | Allows "delta updates" (downloading only what changed, not the whole app). |

---

### 🟢 User Experience: Manual vs. Auto

| **Without Auto-Update** (Old Way) 😩 | **With Auto-Update** (New Way) 😎 |
|-------------------|-------------------|
| You hear about an update manually. | App tells you: "Update available!" |
| You go to GitHub website. | You click "Download" in the app. |
| You download the `.exe` file. | App downloads it while you work. |
| You close the app. | You click "Restart". |
| You run the installer manually. | **Done!** New version is running. |

---

### ⚠️ The One Critical Rule

**The updater must already exist in your installed version.**

- If you are on `v0.32.0` (before auto-updater was added), you must **manually install v0.33.0**.
- Once you have `v0.33.0`, checks happen automatically.
- From `v0.33.0` -> `v0.34.0`, the update will happen **automatically**.

---

### ⚙️ How to Disable

If you prefer to update manually, you can turn this off:
1. Go to **Settings**.
2. Toggle **Auto-Updates** to `OFF`.
3. The app will stop checking GitHub.
