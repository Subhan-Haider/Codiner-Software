import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🚀 React Native + Expo</Text>
        <Text style={styles.subtitle}>Universal App Template</Text>
        <Text style={styles.platform}>
          Running on {Platform.OS === 'web' ? 'Web 🌐' : Platform.OS === 'ios' ? 'iOS 📱' : 'Android 🤖'}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          This template demonstrates a universal React Native app that works on iOS, Android, and Web using Expo SDK 52.
        </Text>

        <View style={styles.features}>
          <Text style={styles.featureTitle}>✨ Features:</Text>
          <Text style={styles.feature}>• Expo Router for navigation</Text>
          <Text style={styles.feature}>• TypeScript support</Text>
          <Text style={styles.feature}>• Platform-specific code</Text>
          <Text style={styles.feature}>• React Native Web compatibility</Text>
        </View>
      </View>

      <View style={styles.navigation}>
        <Link href="/about" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Go to About →</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: Platform.OS === 'web' ? 50 : 100,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  platform: {
    fontSize: 16,
    color: '#f4511e',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    textAlign: 'center',
    marginBottom: 30,
  },
  features: {
    backgroundColor: '#fff',
    padding: 20,
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
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  feature: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    paddingLeft: 10,
  },
  navigation: {
    marginBottom: 40,
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
