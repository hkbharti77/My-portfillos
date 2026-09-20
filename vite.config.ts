import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Dev serves at '/', production build keeps the GitHub Pages sub-path
  base: process.env.VERCEL ? '/' : (process.env.VITE_BASE_PATH || (mode === 'development' ? '/' : '/My-portfillos/')),
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
}));
