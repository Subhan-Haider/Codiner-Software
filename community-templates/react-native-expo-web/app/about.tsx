import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Platform } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📱 About This Template</Text>
        <Text style={styles.subtitle}>React Native + Expo + Web</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 What is this?</Text>
          <Text style={styles.description}>
            A modern React Native template that leverages Expo SDK 52 to create universal applications.
            Write once, run everywhere - on iOS, Android, and the web using react-native-web.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛠️ Technologies Used</Text>
          <View style={styles.techList}>
            <Text style={styles.techItem}>• React Native 0.76.1</Text>
            <Text style={styles.techItem}>• Expo SDK 52</Text>
            <Text style={styles.techItem}>• Expo Router v4</Text>
            <Text style={styles.techItem}>• TypeScript</Text>
            <Text style={styles.techItem}>• React Native Web</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚀 Getting Started</Text>
          <View style={styles.instructions}>
            <Text style={styles.step}>1. Install dependencies: npm install</Text>
            <Text style={styles.step}>2. Start the app: npm start</Text>
            <Text style={styles.step}>3. Run on specific platform:</Text>
            <Text style={styles.subStep}>   • Web: npm run web</Text>
            <Text style={styles.subStep}>   • iOS: npm run ios</Text>
            <Text style={styles.subStep}>   • Android: npm run android</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📂 Project Structure</Text>
          <View style={styles.structure}>
            <Text style={styles.fileItem}>app/</Text>
            <Text style={styles.fileSubItem}>├── _layout.tsx (Root layout)</Text>
            <Text style={styles.fileSubItem}>├── index.tsx (Home screen)</Text>
            <Text style={styles.fileSubItem}>└── about.tsx (This screen)</Text>
            <Text style={styles.fileItem}>assets/</Text>
            <Text style={styles.fileSubItem}>├── icon.png</Text>
            <Text style={styles.fileSubItem}>├── splash.png</Text>
            <Text style={styles.fileSubItem}>└── adaptive-icon.png</Text>
          </View>
        </View>
      </View>

      <View style={styles.navigation}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>← Back to Home</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'web' ? 50 : 100,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#f4511e',
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  techList: {
    paddingLeft: 10,
  },
  techItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 6,
  },
  instructions: {
    paddingLeft: 10,
  },
  step: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
    fontWeight: '500',
  },
  subStep: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    paddingLeft: 20,
  },
  structure: {
    paddingLeft: 10,
  },
  fileItem: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  fileSubItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
    paddingLeft: 20,
  },
  navigation: {
    padding: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f4511e',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
