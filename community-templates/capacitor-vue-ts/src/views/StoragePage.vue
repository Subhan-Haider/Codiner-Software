<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Storage</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Storage</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>💾 Key-Value Storage</ion-card-title>
            <ion-card-subtitle>Store app data persistently</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div class="storage-form">
              <ion-item>
                <ion-input
                  v-model="newKey"
                  placeholder="Key"
                  label="Key"
                  label-placement="stacked"
                ></ion-input>
              </ion-item>

              <ion-item>
                <ion-textarea
                  v-model="newValue"
                  placeholder="Value"
                  label="Value"
                  label-placement="stacked"
                  rows="3"
                ></ion-textarea>
              </ion-item>

              <ion-button
                expand="block"
                @click="saveData"
                :disabled="!newKey.trim() || !newValue.trim()"
                class="save-btn"
              >
                <ion-icon slot="start" name="save"></ion-icon>
                Save Data
              </ion-button>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Stored Data Display -->
        <ion-card v-if="storedData.length > 0">
          <ion-card-header>
            <ion-card-title>Stored Data</ion-card-title>
            <ion-button fill="clear" slot="end" @click="loadAllData">
              <ion-icon name="refresh"></ion-icon>
            </ion-button>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item-sliding v-for="item in storedData" :key="item.key">
                <ion-item>
                  <ion-label>
                    <h3>{{ item.key }}</h3>
                    <p>{{ item.value }}</p>
                  </ion-label>
                </ion-item>
                <ion-item-options side="end">
                  <ion-item-option color="danger" @click="deleteData(item.key)">
                    <ion-icon name="trash"></ion-icon>
                    Delete
                  </ion-item-option>
                </ion-item-options>
              </ion-item-sliding>
            </ion-list>

            <ion-button
              fill="outline"
              expand="block"
              color="danger"
              @click="clearAllData"
              class="clear-all-btn"
            >
              <ion-icon slot="start" name="trash"></ion-icon>
              Clear All Data
            </ion-button>
          </ion-card-content>
        </ion-card>

        <!-- Load Specific Data -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>🔍 Load Specific Data</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-input
                v-model="loadKey"
                placeholder="Enter key to load"
                label="Key to Load"
                label-placement="stacked"
              ></ion-input>
            </ion-item>

            <ion-button
              expand="block"
              @click="loadSpecificData"
              :disabled="!loadKey.trim()"
              fill="outline"
            >
              <ion-icon slot="start" name="search"></ion-icon>
              Load Data
            </ion-button>

            <div v-if="loadedValue" class="loaded-data">
              <h4>Value for "{{ loadKey }}":</h4>
              <p>{{ loadedValue }}</p>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Storage Info -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>ℹ️ Storage Information</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-icon name="shield-checkmark" color="success" slot="start"></ion-icon>
                <ion-label>Data persists across app restarts</ion-label>
              </ion-item>
              <ion-item>
                <ion-icon name="phone-portrait" color="primary" slot="start"></ion-icon>
                <ion-label>Works on iOS, Android, and Web</ion-label>
              </ion-item>
              <ion-item>
                <ion-icon name="key" color="secondary" slot="start"></ion-icon>
                <ion-label>Secure key-value storage</ion-label>
              </ion-item>
              <ion-item>
                <ion-icon name="cloud-offline" color="warning" slot="start"></ion-icon>
                <ion-label>Local storage only (no cloud sync)</ion-label>
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
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonLabel,
  IonInput,
  IonTextarea,
  alertController,
  toastController
} from '@ionic/vue';
import { ref, onMounted } from 'vue';
import { CapacitorService } from '@/services/capacitor';

interface StoredItem {
  key: string;
  value: string;
}

const storedData = ref<StoredItem[]>([]);
const newKey = ref('');
const newValue = ref('');
const loadKey = ref('');
const loadedValue = ref('');

const loadAllData = async () => {
  try {
    const keys = await CapacitorService.getStorageKeys();
    const data: StoredItem[] = [];

    for (const key of keys) {
      const value = await CapacitorService.getStorage(key);
      if (value) {
        data.push({ key, value });
      }
    }

    storedData.value = data;

    const toast = await toastController.create({
      message: `Loaded ${data.length} items`,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  } catch (error) {
    console.error('Error loading data:', error);
  }
};

const saveData = async () => {
  try {
    await CapacitorService.setStorage(newKey.value.trim(), newValue.value);
    newKey.value = '';
    newValue.value = '';

    await loadAllData(); // Refresh the list

    const toast = await toastController.create({
      message: 'Data saved successfully!',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  } catch (error) {
    console.error('Error saving data:', error);
    const toast = await toastController.create({
      message: 'Failed to save data',
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }
};

const loadSpecificData = async () => {
  try {
    const value = await CapacitorService.getStorage(loadKey.value.trim());
    loadedValue.value = value || 'No data found for this key';
  } catch (error) {
    console.error('Error loading specific data:', error);
    loadedValue.value = 'Error loading data';
  }
};

const deleteData = async (key: string) => {
  const alert = await alertController.create({
    header: 'Confirm Delete',
    message: `Are you sure you want to delete "${key}"?`,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        role: 'destructive',
        handler: async () => {
          try {
            await CapacitorService.removeStorage(key);
            await loadAllData(); // Refresh the list

            const toast = await toastController.create({
              message: 'Data deleted successfully!',
              duration: 2000,
              position: 'bottom',
              color: 'success'
            });
            await toast.present();
          } catch (error) {
            console.error('Error deleting data:', error);
          }
        }
      }
    ]
  });

  await alert.present();
};

const clearAllData = async () => {
  const alert = await alertController.create({
    header: 'Confirm Clear All',
    message: 'Are you sure you want to delete ALL stored data? This cannot be undone.',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Clear All',
        role: 'destructive',
        handler: async () => {
          try {
            await CapacitorService.clearStorage();
            storedData.value = [];
            loadedValue.value = '';

            const toast = await toastController.create({
              message: 'All data cleared!',
              duration: 2000,
              position: 'bottom',
              color: 'success'
            });
            await toast.present();
          } catch (error) {
            console.error('Error clearing data:', error);
          }
        }
      }
    ]
  });

  await alert.present();
};

onMounted(() => {
  loadAllData();
});
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.storage-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.save-btn {
  margin-top: 16px;
}

.clear-all-btn {
  margin-top: 16px;
}

.loaded-data {
  margin-top: 16px;
  padding: 12px;
  background: #f0f9ff;
  border-radius: 6px;
}

.loaded-data h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #0369a1;
}

.loaded-data p {
  margin: 0;
  font-family: monospace;
  background: white;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #e0e7ff;
}

ion-card {
  margin-bottom: 20px;
}
</style>
