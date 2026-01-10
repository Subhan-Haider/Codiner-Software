<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Geolocation</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Geolocation</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>📍 Location Services</ion-card-title>
            <ion-card-subtitle>Get GPS coordinates and location data</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-button
              expand="block"
              @click="getCurrentLocation"
              :disabled="isLoading"
              class="location-btn"
            >
              <ion-icon slot="start" name="locate"></ion-icon>
              {{ isLoading ? 'Getting Location...' : 'Get Current Location' }}
            </ion-button>

            <ion-button
              fill="outline"
              expand="block"
              @click="toggleWatching"
              :disabled="isLoading"
              class="watch-btn"
            >
              <ion-icon slot="start" :name="isWatching ? 'pause' : 'play'"></ion-icon>
              {{ isWatching ? 'Stop Watching' : 'Watch Location' }}
            </ion-button>
          </ion-card-content>
        </ion-card>

        <!-- Location Display -->
        <ion-card v-if="currentPosition">
          <ion-card-header>
            <ion-card-title>Current Location</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-icon name="pin" slot="start"></ion-icon>
                <ion-label>
                  <h3>Coordinates</h3>
                  <p>{{ currentPosition.coords.latitude.toFixed(6) }}, {{ currentPosition.coords.longitude.toFixed(6) }}</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-icon name="speedometer" slot="start"></ion-icon>
                <ion-label>
                  <h3>Accuracy</h3>
                  <p>{{ Math.round(currentPosition.coords.accuracy) }} meters</p>
                </ion-label>
              </ion-item>
              <ion-item v-if="currentPosition.coords.altitude">
                <ion-icon name="arrow-up" slot="start"></ion-icon>
                <ion-label>
                  <h3>Altitude</h3>
                  <p>{{ Math.round(currentPosition.coords.altitude) }} meters</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-icon name="time" slot="start"></ion-icon>
                <ion-label>
                  <h3>Timestamp</h3>
                  <p>{{ new Date(currentPosition.timestamp).toLocaleString() }}</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <!-- Watch Status -->
        <ion-card v-if="isWatching">
          <ion-card-header>
            <ion-card-title>📡 Watching Location</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Position updates: {{ watchCount }}</p>
            <div class="watch-indicator">
              <ion-icon name="radio-button-on" color="success"></ion-icon>
              <span>Active</span>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Permissions Info -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>ℹ️ Location Permissions</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>This feature requires location permissions. You'll be prompted to grant access when using location features.</p>
            <ion-list>
              <ion-item>
                <ion-icon name="location" color="primary" slot="start"></ion-icon>
                <ion-label>Precise location for GPS accuracy</ion-label>
              </ion-item>
              <ion-item>
                <ion-icon name="shield-checkmark" color="success" slot="start"></ion-icon>
                <ion-label>Secure permission handling</ion-label>
              </ion-item>
              <ion-item>
                <ion-icon name="battery-half" color="warning" slot="start"></ion-icon>
                <ion-label>May impact battery life when watching</ion-label>
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
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  toastController
} from '@ionic/vue';
import { ref, onUnmounted } from 'vue';
import { CapacitorService } from '@/services/capacitor';
import type { Position } from '@capacitor/geolocation';

const currentPosition = ref<Position | null>(null);
const isLoading = ref(false);
const isWatching = ref(false);
const watchId = ref<string | null>(null);
const watchCount = ref(0);

const getCurrentLocation = async () => {
  isLoading.value = true;
  try {
    const position = await CapacitorService.getCurrentPosition();
    currentPosition.value = position;
    watchCount.value = 0;

    const toast = await toastController.create({
      message: 'Location retrieved successfully!',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  } catch (error) {
    console.error('Error getting location:', error);
    const toast = await toastController.create({
      message: 'Failed to get location. Please check permissions.',
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  } finally {
    isLoading.value = false;
  }
};

const toggleWatching = async () => {
  if (isWatching.value) {
    // Stop watching
    if (watchId.value) {
      await CapacitorService.clearWatch(watchId.value);
      watchId.value = null;
    }
    isWatching.value = false;
    watchCount.value = 0;
  } else {
    // Start watching
    try {
      watchId.value = await CapacitorService.watchPosition((position) => {
        currentPosition.value = position;
        watchCount.value++;
      });
      isWatching.value = true;

      const toast = await toastController.create({
        message: 'Started watching location',
        duration: 2000,
        position: 'bottom'
      });
      await toast.present();
    } catch (error) {
      console.error('Error starting location watch:', error);
      const toast = await toastController.create({
        message: 'Failed to start location watching',
        duration: 3000,
        position: 'bottom',
        color: 'danger'
      });
      await toast.present();
    }
  }
};

onUnmounted(() => {
  // Clean up watch on component unmount
  if (watchId.value) {
    CapacitorService.clearWatch(watchId.value);
  }
});
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.location-btn, .watch-btn {
  margin: 10px 0;
}

.watch-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 8px;
  background: #e8f5e8;
  border-radius: 6px;
}

ion-card {
  margin-bottom: 20px;
}
</style>
