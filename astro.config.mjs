// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://p6acta-png.github.io',
  base: '/vanta-auto-care',

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});