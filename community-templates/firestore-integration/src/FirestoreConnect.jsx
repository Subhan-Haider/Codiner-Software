import React, { useState, useEffect, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
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
} from 'firebase/firestore';

// Firebase configurations
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
    apiKey: "your-prod-api-key",
    authDomain: "your-prod-project.firebaseapp.com",
    projectId: "your-prod-project",
    storageBucket: "your-prod-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-prod-app-id"
  },
  'my-app-dev': {
    apiKey: "your-dev-api-key",
    authDomain: "your-dev-project.firebaseapp.com",
    projectId: "your-dev-project",
    storageBucket: "your-dev-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-dev-app-id"
  }
};

const FirestoreConnect = ({ onConnectionChange, onDataChange }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentProject, setCurrentProject] = useState('demo-project');
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  const [firebaseApp, setFirebaseApp] = useState(null);
  const [auth, setAuth] = useState(null);
  const [db, setDb] = useState(null);

  const addLog = useCallback((message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = { id: Date.now(), timestamp, message, type };
    setLogs(prev => [...prev.slice(-49), newLog]); // Keep last 50 logs
    console.log(`[${type.toUpperCase()}] ${message}`);
  }, []);

  const initializeFirebase = useCallback(async (projectId) => {
    const config = firebaseConfigs[projectId];

    if (!config || !config.apiKey || config.apiKey === 'demo-api-key') {
      throw new Error(`Firebase config not found for project: ${projectId}. Please configure your Firebase project.`);
    }

    const app = initializeApp(config, projectId);
    const authInstance = getAuth(app);
    const dbInstance = getFirestore(app);

    setFirebaseApp(app);
    setAuth(authInstance);
    setDb(dbInstance);

    addLog(`Firebase initialized for project: ${projectId}`, 'info');
    return { app, auth: authInstance, db: dbInstance };
  }, [addLog]);

  const authenticateUser = useCallback(async () => {
    if (!auth) return;

    setIsConnecting(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: new Date()
      };

      setCurrentUser(userData);
      addLog(`Successfully authenticated: ${user.email}`, 'info');

      await setupUserDocument(userData);
      setupRealtimeListeners(userData.uid);

    } catch (error) {
      const errorMessage = error.code === 'auth/popup-closed-by-user'
        ? 'Authentication cancelled by user'
        : `Authentication failed: ${error.message}`;

      setError(errorMessage);
      addLog(errorMessage, 'error');
      throw error;
    } finally {
      setIsConnecting(false);
    }
  }, [auth, addLog]);

  const setupUserDocument = useCallback(async (user) => {
    if (!db) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      const userData = {
        name: user.displayName,
        email: user.email,
        lastConnected: serverTimestamp(),
        projectId: currentProject,
        createdAt: userSnap.exists() ? userSnap.data().createdAt : serverTimestamp()
      };

      await setDoc(userRef, userData, { merge: true });
      addLog('User document created/updated', 'info');

    } catch (error) {
      addLog(`Failed to setup user document: ${error.message}`, 'error');
    }
  }, [db, currentProject, addLog]);

  const setupRealtimeListeners = useCallback((userId) => {
    if (!db) return;

    // Listen to user's tasks
    const tasksQuery = query(
      collection(db, 'tasks'),
      where('userId', '==', userId)
    );

    const unsubscribeTasks = onSnapshot(tasksQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const taskData = { id: change.doc.id, ...change.doc.data() };

        if (change.type === 'added') {
          addLog(`📝 New task added: "${taskData.title || 'Untitled'}"`, 'added');
          onDataChange?.({ type: 'task_added', data: taskData });
        } else if (change.type === 'modified') {
          addLog(`✏️ Task modified: "${taskData.title || 'Untitled'}"`, 'modified');
          onDataChange?.({ type: 'task_modified', data: taskData });
        } else if (change.type === 'removed') {
          addLog(`🗑️ Task removed: "${taskData.title || 'Untitled'}"`, 'removed');
          onDataChange?.({ type: 'task_removed', data: taskData });
        }
      });
    }, (error) => {
      addLog(`Realtime listener error: ${error.message}`, 'error');
    });

    // Listen to user's document
    const unsubscribeUser = onSnapshot(doc(db, 'users', userId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        // Update user data if needed
      }
    });

    addLog('Real-time listeners activated', 'info');

    // Store unsubscribers for cleanup
    return () => {
      unsubscribeTasks();
      unsubscribeUser();
    };
  }, [db, addLog, onDataChange]);

  const handleConnect = async () => {
    if (isConnected) {
      await handleDisconnect();
      return;
    }

    try {
      await initializeFirebase(currentProject);
      await authenticateUser();
      setIsConnected(true);
      onConnectionChange?.(true, currentUser);
    } catch (error) {
      setIsConnected(false);
      onConnectionChange?.(false, null);
    }
  };

  const handleDisconnect = async () => {
    if (auth) {
      try {
        await signOut(auth);
        setIsConnected(false);
        setCurrentUser(null);
        setFirebaseApp(null);
        setAuth(null);
        setDb(null);
        onConnectionChange?.(false, null);
        addLog('Successfully disconnected from Firestore', 'info');
      } catch (error) {
        addLog(`Disconnect error: ${error.message}`, 'error');
      }
    }
  };

  const handleProjectChange = (projectId) => {
    if (isConnected) {
      if (window.confirm('Switching projects will disconnect current session. Continue?')) {
        handleDisconnect();
        setCurrentProject(projectId);
        addLog(`Switched to project: ${projectId}`, 'info');
      }
    } else {
      setCurrentProject(projectId);
    }
  };

  const addTestData = async () => {
    if (!db || !currentUser) {
      alert('Please connect to Firestore first');
      return;
    }

    try {
      const testTasks = [
        {
          title: 'Welcome to Firestore!',
          description: 'This is your first task created via the integration',
          completed: false,
          userId: currentUser.uid,
          createdAt: serverTimestamp(),
          priority: 'high'
        },
        {
          title: 'Explore Real-time Sync',
          description: 'Watch how changes appear instantly across all connected devices',
          completed: false,
          userId: currentUser.uid,
          createdAt: serverTimestamp(),
          priority: 'medium'
        }
      ];

      for (const task of testTasks) {
        await addDoc(collection(db, 'tasks'), task);
      }

      addLog('Test data added successfully', 'info');
    } catch (error) {
      addLog(`Failed to add test data: ${error.message}`, 'error');
    }
  };

  // Auth state listener
  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsConnected(true);
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastLogin: new Date()
        });
      } else {
        setIsConnected(false);
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        🔥 Firestore Integration
      </h2>

      {/* Project Selector */}
      <div style={{ marginBottom: '20px' }}>
        <select
          value={currentProject}
          onChange={(e) => handleProjectChange(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '16px'
          }}
        >
          <option value="demo-project">Demo Project (Default)</option>
          <option value="my-app-prod">My App Production</option>
          <option value="my-app-dev">My App Development</option>
        </select>
      </div>

      {/* Connect Button */}
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        style={{
          width: '100%',
          padding: '16px',
          background: isConnected
            ? 'linear-gradient(135deg, #f44336, #d32f2f)'
            : 'linear-gradient(135deg, #4285f4, #34a853)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          fontSize: '18px',
          fontWeight: '600',
          cursor: isConnecting ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '20px',
          opacity: isConnecting ? 0.6 : 1
        }}
      >
        {isConnecting ? (
          <>
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid #f3f3f3',
              borderTop: '2px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            Connecting...
          </>
        ) : (
          <>
            <span>{isConnected ? '🔌' : '🔗'}</span>
            {isConnected ? 'Disconnect Firestore' : 'Connect Firestore'}
          </>
        )}
      </button>

      {/* Status */}
      <div style={{
        padding: '16px',
        borderRadius: '12px',
        marginBottom: '20px',
        fontWeight: '500',
        textAlign: 'center',
        background: error ? '#ffebee' : isConnected ? '#e8f5e8' : '#f8f9fa',
        color: error ? '#c62828' : isConnected ? '#2e7d32' : '#666',
        border: `2px solid ${error ? '#f44336' : isConnected ? '#4caf50' : '#ddd'}`
      }}>
        {error ? `❌ ${error}` :
         isConnecting ? '🔄 Connecting to Firestore...' :
         isConnected ? `✅ Connected: ${currentUser?.email}` :
         '🔌 Disconnected - Click "Connect Firestore" to get started'}
      </div>

      {/* User Info */}
      {isConnected && currentUser && (
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginBottom: '16px', color: '#333' }}>👤 User Information</h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '600' }}>Name:</span>
              <span>{currentUser.displayName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '600' }}>Email:</span>
              <span>{currentUser.email}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '600' }}>Project:</span>
              <span>{currentProject}</span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {isConnected && (
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <button
            onClick={addTestData}
            style={{
              padding: '10px 20px',
              background: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Add Test Data
          </button>
          <button
            onClick={() => setLogs([])}
            style={{
              padding: '10px 20px',
              background: '#f5f5f5',
              color: '#333',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Clear Logs
          </button>
        </div>
      )}

      {/* Logs */}
      <div>
        <h3 style={{ marginBottom: '12px', color: '#333' }}>📋 Real-Time Activity Logs</h3>
        <div style={{
          background: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          padding: '16px',
          maxHeight: '300px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          {logs.length === 0 ? (
            <div style={{
              padding: '8px',
              background: '#e3f2fd',
              borderRadius: '4px',
              color: '#1565c0'
            }}>
              🔄 Waiting for Firestore connection...
            </div>
          ) : (
            logs.map(log => (
              <div
                key={log.id}
                style={{
                  marginBottom: '8px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  borderLeft: `3px solid ${
                    log.type === 'error' ? '#f44336' :
                    log.type === 'added' ? '#4caf50' :
                    log.type === 'modified' ? '#ff9800' :
                    '#2196f3'
                  }`,
                  background:
                    log.type === 'error' ? '#ffebee' :
                    log.type === 'added' ? '#e8f5e8' :
                    log.type === 'modified' ? '#fff3e0' :
                    '#e3f2fd',
                  color:
                    log.type === 'error' ? '#c62828' :
                    log.type === 'added' ? '#2e7d32' :
                    log.type === 'modified' ? '#f57c00' :
                    '#1565c0'
                }}
              >
                <strong>{log.timestamp}:</strong> {log.message}
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FirestoreConnect;
