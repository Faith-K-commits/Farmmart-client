import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      headers: {
        'Cache-Control': 'no-store', // Disable caching in development
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom', 
    setupFiles: './src/tests/setup.js', 
  },
});