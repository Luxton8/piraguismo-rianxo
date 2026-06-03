import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        club: resolve(__dirname, 'club.html'),
        calendario: resolve(__dirname, 'calendario.html'),
        novas: resolve(__dirname, 'novas.html'),
        contacto: resolve(__dirname, 'contacto.html'),
        tenda: resolve(__dirname, 'tenda.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },
})
