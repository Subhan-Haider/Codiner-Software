// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  nitro: {
    preset: 'node-server',
  },
  ssr: true,
  experimental: {
    payloadExtraction: false,
  },
})
