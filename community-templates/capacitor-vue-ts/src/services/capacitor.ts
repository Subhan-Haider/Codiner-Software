import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Storage } from '@capacitor/storage';
import { Device, DeviceInfo } from '@capacitor/device';
import { Network, NetworkStatus } from '@capacitor/network';

export class CapacitorService {
  // Camera
  static async takePhoto(): Promise<string | null> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt
      });
      return image.dataUrl || null;
    } catch (error) {
      console.error('Error taking photo:', error);
      throw error;
    }
  }

  // Geolocation
  static async getCurrentPosition(): Promise<Position> {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });
      return position;
    } catch (error) {
      console.error('Error getting position:', error);
      throw error;
    }
  }

  static async watchPosition(callback: (position: Position) => void): Promise<string> {
    try {
      const watchId = await Geolocation.watchPosition({
        enableHighAccuracy: true,
        timeout: 10000
      }, (position, err) => {
        if (err) {
          console.error('Error watching position:', err);
          return;
        }
        if (position) {
          callback(position);
        }
      });
      return watchId;
    } catch (error) {
      console.error('Error setting up position watch:', error);
      throw error;
    }
  }

  static async clearWatch(watchId: string): Promise<void> {
    await Geolocation.clearWatch({ id: watchId });
  }

  // Storage
  static async setStorage(key: string, value: string): Promise<void> {
    await Storage.set({ key, value });
  }

  static async getStorage(key: string): Promise<string | null> {
    const { value } = await Storage.get({ key });
    return value;
  }

  static async removeStorage(key: string): Promise<void> {
    await Storage.remove({ key });
  }

  static async clearStorage(): Promise<void> {
    await Storage.clear();
  }

  static async getStorageKeys(): Promise<string[]> {
    const { keys } = await Storage.keys();
    return keys;
  }

  // Device
  static async getDeviceInfo(): Promise<DeviceInfo> {
    return await Device.getInfo();
  }

  // Network
  static async getNetworkStatus(): Promise<NetworkStatus> {
    return await Network.getStatus();
  }

  static addNetworkListener(callback: (status: NetworkStatus) => void): void {
    Network.addListener('networkStatusChange', callback);
  }

  static removeNetworkListener(callback: (status: NetworkStatus) => void): void {
    Network.removeListener('networkStatusChange', callback);
  }
}
