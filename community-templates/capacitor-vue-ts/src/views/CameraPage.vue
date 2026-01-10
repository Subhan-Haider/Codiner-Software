<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Camera</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Camera</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>📷 Camera Access</ion-card-title>
            <ion-card-subtitle>Take photos and access device camera</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <p>Click the button below to take a photo or select from gallery.</p>

            <ion-button
              expand="block"
              @click="takePhoto"
              :disabled="isLoading"
              class="take-photo-btn"
            >
              <ion-icon slot="start" name="camera"></ion-icon>
              {{ isLoading ? 'Processing...' : 'Take Photo' }}
            </ion-button>
          </ion-card-content>
        </ion-card>

        <!-- Photo Display -->
        <ion-card v-if="photo">
          <ion-card-header>
            <ion-card-title>Captured Photo</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <img :src="photo" alt="Captured photo" class="captured-photo" />
            <ion-button
              fill="outline"
              expand="block"
              @click="clearPhoto"
              class="clear-btn"
            >
              <ion-icon slot="start" name="trash"></ion-icon>
              Clear Photo
            </ion-button>
          </ion-card-content>
        </ion-card>

        <!-- Camera Permissions Info -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>ℹ️ Permissions</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>This feature requires camera permissions. On mobile devices, you'll be prompted to grant access.</p>
            <ion-list>
              <ion-item>
                <ion-icon name="checkmark-circle" color="success" slot="start"></ion-icon>
                <ion-label>iOS: Automatic permission request</ion-label>
              </ion-item>
              <ion-item>
                <ion-icon name="checkmark-circle" color="success" slot="start"></ion-icon>
                <ion-label>Android: Runtime permission request</ion-label>
              </ion-item>
              <ion-item>
                <ion-icon name="checkmark-circle" color="success" slot="start"></ion-icon>
                <ion-label>Web: Browser permission dialog</ion-label>
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
import { ref } from 'vue';
import { CapacitorService } from '@/services/capacitor';

const photo = ref<string | null>(null);
const isLoading = ref(false);

const takePhoto = async () => {
  isLoading.value = true;
  try {
    const photoData = await CapacitorService.takePhoto();
    if (photoData) {
      photo.value = photoData;
      const toast = await toastController.create({
        message: 'Photo captured successfully!',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
      await toast.present();
    }
  } catch (error) {
    console.error('Error taking photo:', error);
    const toast = await toastController.create({
      message: 'Failed to take photo. Please check permissions.',
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  } finally {
    isLoading.value = false;
  }
};

const clearPhoto = () => {
  photo.value = null;
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.take-photo-btn {
  margin: 20px 0;
}

.captured-photo {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 16px;
}

.clear-btn {
  margin-top: 16px;
}

ion-card {
  margin-bottom: 20px;
}
</style>
