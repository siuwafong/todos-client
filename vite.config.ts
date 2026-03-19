import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import macros from 'unplugin-parcel-macros';
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [macros.vite(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
