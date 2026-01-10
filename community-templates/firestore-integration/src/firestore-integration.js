/**
 * Complete Firestore Integration Module
 * Features: Google OAuth, Auto-setup, Real-time Sync, Multi-project Support
 */

// Firebase configuration
const firebaseConfigs = {
  'demo-project': {
    apiKey: "demo-api-key",
    authDomain: "demo-project.firebaseapp.com",
    projectId: "demo-project",
    storageBucket: "demo-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "demo-app-id"
  },
  'my-app-prod': {
    // Replace with your production Firebase config
    apiKey: "your-prod-api-key",
    authDomain: "your-prod-project.firebaseapp.com",
    projectId: "your-prod-project",
    storageBucket: "your-prod-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-prod-app-id"
  },
  'my-app-dev': {
    // Replace with your development Firebase config
    apiKey: "your-dev-api-key",
    authDomain: "your-dev-project.firebaseapp.com",
    projectId: "your-dev-project",
    storageBucket: "your-dev-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-dev-app-id"
  }
};

// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

class FirestoreIntegration {
  constructor() {
    this.currentUser = null;
    this.currentProject = 'demo-project';
    this.app = null;
    this.auth = null;
    this.db = null;
    this.unsubscribers = [];

    this.initializeUI();
    this.setupEventListeners();
  }

  initializeUI() {
    this.connectBtn = document.getElementById('connectBtn');
    this.btnIcon = document.getElementById('btnIcon');
    this.btnText = document.getElementById('btnText');
    this.btnSpinner = document.getElementById('btnSpinner');
    this.status = document.getElementById('status');
    this.userInfo = document.getElementById('userInfo');
    this.actions = document.getElementById('actions');
    this.logContainer = document.getElementById('logContainer');
    this.projectSelect = document.getElementById('projectSelect');

    // User info elements
    this.userName = document.getElementById('userName');
    this.userEmail = document.getElementById('userEmail');
    this.userId = document.getElementById('userId');
    this.lastConnected = document.getElementById('lastConnected');
    this.currentProjectDisplay = document.getElementById('currentProject');
  }

  setupEventListeners() {
    this.connectBtn.addEventListener('click', () => this.handleConnect());
    this.projectSelect.addEventListener('change', (e) => this.handleProjectChange(e));

    // Action buttons
    document.getElementById('disconnectBtn').addEventListener('click', () => this.handleDisconnect());
    document.getElementById('clearLogsBtn').addEventListener('click', () => this.clearLogs());
    document.getElementById('testDataBtn').addEventListener('click', () => this.addTestData());
  }

  handleProjectChange(event) {
    const selectedProject = event.target.value;

    if (selectedProject === 'custom') {
      const customProjectId = prompt('Enter your Firebase project ID:');
      if (customProjectId) {
        // For custom projects, we'd need to get the full config from user
        this.log('Custom project setup requires manual Firebase config', 'info');
      }
      this.projectSelect.value = this.currentProject;
      return;
    }

    if (this.currentUser && selectedProject !== this.currentProject) {
      if (confirm('Switching projects will disconnect current session. Continue?')) {
        this.handleDisconnect();
        this.currentProject = selectedProject;
        this.log(`Switched to project: ${selectedProject}`, 'info');
      } else {
        this.projectSelect.value = this.currentProject;
      }
    } else {
      this.currentProject = selectedProject;
    }
  }

  async handleConnect() {
    if (this.currentUser) {
      this.handleDisconnect();
      return;
    }

    this.setConnectingState(true);

    try {
      await this.initializeFirebase();
      await this.authenticateUser();

    } catch (error) {
      this.handleError(error);
    } finally {
      this.setConnectingState(false);
    }
  }

  async initializeFirebase() {
    const config = firebaseConfigs[this.currentProject];

    if (!config || !config.apiKey || config.apiKey === 'demo-api-key') {
      throw new Error(`Firebase config not found for project: ${this.currentProject}. Please configure your Firebase project.`);
    }

    try {
      this.app = initializeApp(config, this.currentProject);
      this.auth = getAuth(this.app);
      this.db = getFirestore(this.app);

      this.log(`Firebase initialized for project: ${this.currentProject}`, 'info');
    } catch (error) {
      throw new Error(`Failed to initialize Firebase: ${error.message}`);
    }
  }

  async authenticateUser() {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');

    try {
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;

      this.currentUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: new Date()
      };

      this.log(`Successfully authenticated: ${user.email}`, 'info');
      await this.setupUserDocument();
      this.setupRealtimeListeners();
      this.updateUI();

    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Authentication cancelled by user');
      } else {
        throw new Error(`Authentication failed: ${error.message}`);
      }
    }
  }

  async setupUserDocument() {
    if (!this.currentUser || !this.db) return;

    try {
      const userRef = doc(this.db, 'users', this.currentUser.uid);
      const userSnap = await getDoc(userRef);

      const userData = {
        name: this.currentUser.displayName,
        email: this.currentUser.email,
        lastConnected: serverTimestamp(),
        projectId: this.currentProject,
        createdAt: userSnap.exists() ? userSnap.data().createdAt : serverTimestamp()
      };

      await setDoc(userRef, userData, { merge: true });
      this.log('User document created/updated', 'info');

      // Create default tasks collection if it doesn't exist
      await this.ensureDefaultCollections();

    } catch (error) {
      this.log(`Failed to setup user document: ${error.message}`, 'error');
    }
  }

  async ensureDefaultCollections() {
    // This is just informational - Firestore creates collections automatically
    this.log('Default collections ready (tasks, users)', 'info');
  }

  setupRealtimeListeners() {
    if (!this.db || !this.currentUser) return;

    // Clear previous listeners
    this.unsubscribers.forEach(unsubscribe => unsubscribe());
    this.unsubscribers = [];

    // Listen to user's tasks collection
    const tasksQuery = query(
      collection(this.db, 'tasks'),
      where('userId', '==', this.currentUser.uid)
    );

    const tasksUnsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const taskData = { id: change.doc.id, ...change.doc.data() };

        if (change.type === 'added') {
          this.log(`📝 New task added: "${taskData.title || 'Untitled'}"`, 'added');
        } else if (change.type === 'modified') {
          this.log(`✏️ Task modified: "${taskData.title || 'Untitled'}"`, 'modified');
        } else if (change.type === 'removed') {
          this.log(`🗑️ Task removed: "${taskData.title || 'Untitled'}"`, 'removed');
        }
      });
    }, (error) => {
      this.log(`Realtime listener error: ${error.message}`, 'error');
    });

    this.unsubscribers.push(tasksUnsubscribe);

    // Listen to user's document for updates
    const userUnsubscribe = onSnapshot(doc(this.db, 'users', this.currentUser.uid), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data.lastConnected) {
          const lastConnected = data.lastConnected.toDate?.() || new Date(data.lastConnected);
          document.getElementById('lastConnected').textContent = lastConnected.toLocaleString();
        }
      }
    });

    this.unsubscribers.push(userUnsubscribe);

    this.log('Real-time listeners activated', 'info');
  }

  async addTestData() {
    if (!this.db || !this.currentUser) {
      alert('Please connect to Firestore first');
      return;
    }

    try {
      const testTasks = [
        {
          title: 'Welcome to Firestore!',
          description: 'This is your first task created via the integration',
          completed: false,
          userId: this.currentUser.uid,
          createdAt: serverTimestamp(),
          priority: 'high'
        },
        {
          title: 'Explore Real-time Sync',
          description: 'Watch how changes appear instantly across all connected devices',
          completed: false,
          userId: this.currentUser.uid,
          createdAt: serverTimestamp(),
          priority: 'medium'
        }
      ];

      for (const task of testTasks) {
        await addDoc(collection(this.db, 'tasks'), task);
      }

      this.log('Test data added successfully', 'info');
      alert('Test tasks added! Watch the real-time logs update.');

    } catch (error) {
      this.log(`Failed to add test data: ${error.message}`, 'error');
      alert('Failed to add test data. Check console for details.');
    }
  }

  async handleDisconnect() {
    if (!this.auth) return;

    try {
      // Clear listeners
      this.unsubscribers.forEach(unsubscribe => unsubscribe());
      this.unsubscribers = [];

      // Sign out
      await signOut(this.auth);

      this.currentUser = null;
      this.updateUI();
      this.log('Successfully disconnected from Firestore', 'info');

    } catch (error) {
      this.log(`Disconnect error: ${error.message}`, 'error');
    }
  }

  setConnectingState(connecting) {
    const btn = this.connectBtn;
    const spinner = this.btnSpinner;
    const icon = this.btnIcon;
    const text = this.btnText;

    if (connecting) {
      btn.disabled = true;
      spinner.classList.remove('hidden');
      icon.textContent = '⏳';
      text.textContent = 'Connecting...';
      this.status.className = 'status connecting';
      this.status.textContent = '🔄 Connecting to Firestore...';
    } else {
      btn.disabled = false;
      spinner.classList.add('hidden');
      this.updateConnectButton();
    }
  }

  updateConnectButton() {
    const icon = this.btnIcon;
    const text = this.btnText;

    if (this.currentUser) {
      icon.textContent = '🔌';
      text.textContent = 'Disconnect Firestore';
      this.connectBtn.classList.add('disconnect');
    } else {
      icon.textContent = '🔗';
      text.textContent = 'Connect Firestore';
      this.connectBtn.classList.remove('disconnect');
    }
  }

  updateUI() {
    this.updateConnectButton();

    if (this.currentUser) {
      // Connected state
      this.status.className = 'status connected';
      this.status.textContent = `✅ Connected: ${this.currentUser.email}`;

      // Show user info
      this.userInfo.classList.remove('hidden');
      this.userName.textContent = this.currentUser.displayName || 'Unknown';
      this.userEmail.textContent = this.currentUser.email;
      this.userId.textContent = this.currentUser.uid;
      this.currentProjectDisplay.textContent = this.currentProject;

      // Show actions
      this.actions.classList.remove('hidden');

    } else {
      // Disconnected state
      this.status.className = 'status disconnected';
      this.status.textContent = '🔌 Disconnected - Click "Connect Firestore" to get started';

      // Hide user info and actions
      this.userInfo.classList.add('hidden');
      this.actions.classList.add('hidden');
    }
  }

  handleError(error) {
    console.error('Firestore Integration Error:', error);

    this.status.className = 'status error';
    this.status.textContent = `❌ Connection failed: ${error.message}`;

    this.log(`Error: ${error.message}`, 'error');

    // Show alert for critical errors
    if (error.message.includes('config') || error.message.includes('initialize')) {
      setTimeout(() => {
        alert(`Configuration Error: ${error.message}\n\nPlease check your Firebase configuration.`);
      }, 100);
    }
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry log-${type}`;
    logEntry.innerHTML = `<strong>${timestamp}:</strong> ${message}`;

    this.logContainer.appendChild(logEntry);
    this.logContainer.scrollTop = this.logContainer.scrollHeight;

    // Keep only last 50 entries
    while (this.logContainer.children.length > 50) {
      this.logContainer.removeChild(this.logContainer.firstChild);
    }

    console.log(`[${type.toUpperCase()}] ${message}`);
  }

  clearLogs() {
    this.logContainer.innerHTML = '<div class="log-entry log-info">🧹 Logs cleared</div>';
  }
}

// Initialize the integration when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FirestoreIntegration();
});

// Export for use in other modules
window.FirestoreIntegration = FirestoreIntegration;
