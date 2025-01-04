import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window', // Define global to prevent the ReferenceError
  },
  resolve: {
    alias: {
      // Optional: add fallback for Node.js modules like "path" if needed
    },
  },
});
