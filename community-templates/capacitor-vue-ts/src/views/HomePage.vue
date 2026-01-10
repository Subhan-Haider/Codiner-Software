<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Capacitor + Vue</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Capacitor + Vue</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container">
        <!-- Hero Section -->
        <div class="hero-section">
          <h1>Welcome to Capacitor</h1>
          <p>Build cross-platform mobile apps with Vue.js and native device features</p>
          <div class="platform-badges">
            <ion-badge color="primary">iOS</ion-badge>
            <ion-badge color="secondary">Android</ion-badge>
            <ion-badge color="tertiary">Web</ion-badge>
          </div>
        </div>

        <!-- Feature Cards -->
        <ion-grid>
          <ion-row>
            <ion-col size="12" size-md="6">
              <ion-card button router-link="/camera">
                <ion-card-header>
                  <ion-card-title>📷 Camera</ion-card-title>
                  <ion-card-subtitle>Take photos and access device camera</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  Access native camera APIs for photo capture and gallery selection
                </ion-card-content>
              </ion-card>
            </ion-col>

            <ion-col size="12" size-md="6">
              <ion-card button router-link="/geolocation">
                <ion-card-header>
                  <ion-card-title>📍 Geolocation</ion-card-title>
                  <ion-card-subtitle>Get device location and GPS data</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  Access GPS location, watch position changes, and geolocation permissions
                </ion-card-content>
              </ion-card>
            </ion-col>

            <ion-col size="12" size-md="6">
              <ion-card button router-link="/storage">
                <ion-card-header>
                  <ion-card-title>💾 Storage</ion-card-title>
                  <ion-card-subtitle>Persistent key-value storage</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  Store app data persistently across app sessions and platform restarts
                </ion-card-content>
              </ion-card>
            </ion-col>

            <ion-col size="12" size-md="6">
              <ion-card @click="showDeviceInfo">
                <ion-card-header>
                  <ion-card-title>📱 Device Info</ion-card-title>
                  <ion-card-subtitle>Get device and platform information</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  Access device information, platform details, and app metadata
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>

        <!-- Device Info Display -->
        <ion-card v-if="deviceInfo">
          <ion-card-header>
            <ion-card-title>Device Information</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-label>Platform: {{ deviceInfo.platform }}</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Model: {{ deviceInfo.model }}</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Operating System: {{ deviceInfo.operatingSystem }}</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>OS Version: {{ deviceInfo.osVersion }}</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Manufacturer: {{ deviceInfo.manufacturer }}</ion-label>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Network Status -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>🌐 Network Status</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-label>Connected: {{ networkStatus.connected ? 'Yes' : 'No' }}</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>Connection Type: {{ networkStatus.connectionType }}</ion-label>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  toastController
} from '@ionic/vue';
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { ref, onMounted } from 'vue';

const deviceInfo = ref<any>(null);
const networkStatus = ref({
  connected: false,
  connectionType: 'unknown'
});

const showDeviceInfo = async () => {
  try {
    const info = await Device.getInfo();
    deviceInfo.value = info;

    const toast = await toastController.create({
      message: 'Device information loaded!',
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  } catch (error) {
    console.error('Error getting device info:', error);
    const toast = await toastController.create({
      message: 'Failed to get device information',
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }
};

onMounted(async () => {
  // Get initial network status
  try {
    const status = await Network.getStatus();
    networkStatus.value = status;
  } catch (error) {
    console.error('Error getting network status:', error);
  }

  // Listen for network changes
  Network.addListener('networkStatusChange', (status) => {
    networkStatus.value = status;
  });
});
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 16px;
  font-weight: 700;
}

.hero-section p {
  font-size: 1.1rem;
  margin-bottom: 24px;
  opacity: 0.9;
}

.platform-badges {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

ion-card {
  margin-bottom: 16px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

ion-card:hover {
  transform: translateY(-2px);
}
</style>
