import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import CameraPage from '@/views/CameraPage.vue';
import GeolocationPage from '@/views/GeolocationPage.vue';
import StoragePage from '@/views/StoragePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/camera',
    name: 'Camera',
    component: CameraPage
  },
  {
    path: '/geolocation',
    name: 'Geolocation',
    component: GeolocationPage
  },
  {
    path: '/storage',
    name: 'Storage',
    component: StoragePage
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
