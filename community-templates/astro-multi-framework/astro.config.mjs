import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vue from '@astrojs/vue';
import svelte from '@astrojs/svelte';
import solidJs from '@astrojs/solid-js';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    vue(),
    svelte(),
    solidJs(),
    mdx(),
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
