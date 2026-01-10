# 🔥 Firestore Integration Module

A complete Firestore integration with Google OAuth, auto-setup, real-time sync, and security features for modern web applications.

## ✨ Features

- **🔐 Google OAuth Authentication** - Secure sign-in with Google accounts
- **🔄 Real-time Sync** - Automatic updates across all connected devices
- **🛡️ Security Rules** - User-specific data access control
- **⚙️ Auto Setup** - Automatic user document creation
- **📱 Multi-project Support** - Connect to different Firestore projects
- **📊 Activity Logs** - Real-time logging of all Firestore operations
- **🎨 UI Components** - Ready-to-use React and HTML components
- **🔧 Error Handling** - Comprehensive error management

## 🚀 Quick Start

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Authentication** → **Google** provider
4. Enable **Firestore Database**
5. Copy your Firebase config

### 2. Install Dependencies

```bash
npm install firebase
```

### 3. Configure Firebase

Edit `src/firestore-integration.js` and replace the Firebase configs:

```javascript
const firebaseConfigs = {
  'your-project': {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
  }
};
```

### 4. Deploy Security Rules

Copy `firestore.rules` to your Firebase project:

```bash
firebase deploy --only firestore:rules
```

### 5. Usage

#### HTML/JS Version
```html
<!DOCTYPE html>
<html>
<body>
  <!-- Include the integration -->
  <script type="module" src="./src/firestore-integration.js"></script>
</body>
</html>
```

#### React Version
```jsx
import FirestoreConnect from './src/FirestoreConnect';

function App() {
  return (
    <div>
      <FirestoreConnect
        onConnectionChange={(connected, user) => {
          console.log('Connection status:', connected, user);
        }}
        onDataChange={(data) => {
          console.log('Data changed:', data);
        }}
      />
    </div>
  );
}
```

## 📋 Complete API

### Props (React Component)

| Prop | Type | Description |
|------|------|-------------|
| `onConnectionChange` | `(connected: boolean, user: User \| null) => void` | Called when connection status changes |
| `onDataChange` | `(data: {type: string, data: any}) => void` | Called when Firestore data changes |

### Methods (JavaScript Class)

```javascript
const firestore = new FirestoreIntegration();

// Connect to Firestore
await firestore.connect();

// Disconnect from Firestore
await firestore.disconnect();

// Add test data
await firestore.addTestData();

// Switch projects
await firestore.switchProject('project-id');
```

## 🔐 Security Rules

The included `firestore.rules` provides:

- **User Isolation** - Users can only access their own data
- **Task Management** - Secure CRUD operations on tasks
- **Project Access** - Owner-only project management
- **Shared Resources** - Controlled collaboration features

```javascript
// Key security rules
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}

match /tasks/{taskId} {
  allow write: if request.auth != null &&
                  request.auth.uid == request.resource.data.userId;
}
```

## 🎯 Use Cases

### Task Management App
```javascript
// Real-time task sync
const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      addTaskToUI(change.doc.data());
    }
  });
});
```

### User Profile Management
```javascript
// Auto-create user profile
await setDoc(doc(db, 'users', user.uid), {
  name: user.displayName,
  email: user.email,
  lastConnected: serverTimestamp()
});
```

### Multi-device Sync
```javascript
// Changes on one device instantly appear on all others
onSnapshot(userTasksQuery, (snapshot) => {
  updateTaskList(snapshot.docs.map(doc => doc.data()));
});
```

## 🛠️ Configuration

### Firebase Config Structure
```javascript
const firebaseConfigs = {
  'project-name': {
    apiKey: "your-api-key",
    authDomain: "project.firebaseapp.com",
    projectId: "project-id",
    storageBucket: "project.appspot.com",
    messagingSenderId: "123456789",
    appId: "app-id"
  }
};
```

### Environment Variables
```bash
# For production apps
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_PROJECT_ID=your-project-id
```

## 📊 Real-Time Features

### Automatic Updates
- **Live Task Changes** - See updates instantly
- **User Status** - Online/offline indicators
- **Collaboration** - Real-time editing
- **Notifications** - Live alerts

### Event Types
```javascript
// Data change events
{
  type: 'task_added',
  data: { id, title, description, ... }
}

{
  type: 'task_modified',
  data: { id, title, completed: true, ... }
}

{
  type: 'task_removed',
  data: { id, title, ... }
}
```

## 🎨 Customization

### Styling the HTML Version
```css
.connect-button {
  /* Custom button styles */
}

.status {
  /* Status indicator styles */
}

.user-info {
  /* User information panel */
}
```

### Extending the React Component
```jsx
const CustomFirestore = () => {
  return (
    <FirestoreConnect
      onConnectionChange={(connected, user) => {
        // Custom connection handling
      }}
      onDataChange={(data) => {
        // Custom data handling
      }}
    />
  );
};
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Google OAuth popup works
- [ ] User document is created
- [ ] Real-time listeners work
- [ ] Security rules prevent unauthorized access
- [ ] Multi-project switching works
- [ ] Error handling works

### Test Commands
```bash
# Add test data
npm run test-data

# Check connection
npm run test-connection

# Verify security rules
firebase emulators:start --only firestore
```

## 🚀 Deployment

### Firebase Hosting
```bash
firebase init hosting
firebase deploy
```

### Vercel/Netlify
```bash
# Add environment variables in dashboard
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_PROJECT_ID=your-project
```

### Docker
```dockerfile
FROM node:18-alpine
COPY . /app
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### Common Issues

**"Firebase config not found"**
- Check that your project ID is in `firebaseConfigs`
- Verify Firebase project exists

**"Authentication failed"**
- Enable Google provider in Firebase Console
- Check OAuth scopes

**"Permission denied"**
- Deploy Firestore security rules
- Check user authentication

**"Real-time not working"**
- Verify internet connection
- Check browser console for errors
- Confirm Firestore rules allow read access

### Debug Mode
```javascript
// Enable detailed logging
localStorage.setItem('firestore-debug', 'true');

// Check console for detailed logs
```

## 📚 Advanced Usage

### Custom Collections
```javascript
// Listen to custom collections
const customQuery = query(collection(db, 'customCollection'));
const unsubscribe = onSnapshot(customQuery, (snapshot) => {
  // Handle custom data
});
```

### Offline Support
```javascript
// Firestore automatically caches for offline use
import { enableIndexedDbPersistence } from 'firebase/firestore';

enableIndexedDbPersistence(db)
  .catch((err) => {
    console.error('Offline persistence failed:', err);
  });
```

### Batch Operations
```javascript
// Perform multiple operations atomically
const batch = writeBatch(db);

// Add operations to batch
batch.set(doc(db, 'tasks', 'task1'), taskData);
batch.update(doc(db, 'users', userId), { lastActive: serverTimestamp() });

await batch.commit();
```

## 🤝 Integration Examples

### With React Router
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirestoreConnect from './FirestoreConnect';

function App() {
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  return (
    <BrowserRouter>
      <FirestoreConnect
        onConnectionChange={(connected, userData) => {
          setIsConnected(connected);
          setUser(userData);
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### With State Management
```jsx
// Redux integration
const firestoreMiddleware = store => next => action => {
  if (action.type === 'FIRESTORE_DATA_CHANGED') {
    store.dispatch(updateTasks(action.payload));
  }
  return next(action);
};
```

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/Subhan-Haider/Codiner-Template/issues)
- **Documentation**: This README
- **Firebase Docs**: [Official Documentation](https://firebase.google.com/docs)

---

**🎉 Ready to build real-time applications with Firestore!**

This module provides everything you need for secure, real-time data synchronization with automatic user management and comprehensive error handling.
