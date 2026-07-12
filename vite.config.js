import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the Hotel Booking Frontend
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
});
