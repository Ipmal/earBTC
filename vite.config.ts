import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/earBTC/',  // GitHub Pages deployment base
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
