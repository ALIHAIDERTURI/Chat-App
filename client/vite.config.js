import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set API URL based on environment
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://chat-app-production-f9871c4f6a5a.herokuapp.com' 
  : 'http://localhost:8000';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    outDir: '../server/public',
    emptyOutDir: true,
  },
  base: '/',
});
