import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        club: resolve(__dirname, 'club/index.html'),
        calendario: resolve(__dirname, 'calendario/index.html'),
        novas: resolve(__dirname, 'novas/index.html'),
        contacto: resolve(__dirname, 'contacto/index.html'),
        tenda: resolve(__dirname, 'tenda/index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
      },
    },
  },
})
