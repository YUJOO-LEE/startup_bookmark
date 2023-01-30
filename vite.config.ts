import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { reactRouterPlugin } from 'vite-plugin-next-react-router';

//
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    reactRouterPlugin(),
  ],
  server: {
    port: 3000,
  },
});
