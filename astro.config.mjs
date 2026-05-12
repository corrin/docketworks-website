// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';
import node from '@astrojs/node';

export default defineConfig({
  // Used for canonical URLs and OG tags. Adjust to the real production host.
  site: 'https://docketworks.site',
  adapter: node({ mode: 'standalone' }),
  integrations: [preact()],
  vite: {
    plugins: [tailwindcss()],
  },
});
