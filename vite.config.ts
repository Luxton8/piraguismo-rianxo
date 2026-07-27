import { defineConfig } from 'vite'
import { resolve } from 'path'

const cleanUrlsPlugin = () => ({
  name: 'clean-urls',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      const acceptsHtml = req.headers.accept && req.headers.accept.includes('text/html')
      if (acceptsHtml && req.url && !req.url.includes('.') && req.url !== '/') {
        const [path, query] = req.url.split('?')
        req.url = `${path}.html` + (query ? `?${query}` : '')
      }
      next()
    })
  }
})

export default defineConfig({
  plugins: [cleanUrlsPlugin()],
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
        'politica-cookies': resolve(__dirname, 'politica-cookies.html'),
        'politica-privacidade': resolve(__dirname, 'politica-privacidade.html'),
        'aviso-legal': resolve(__dirname, 'aviso-legal.html'),
        'preferencias-cookies': resolve(__dirname, 'preferencias-cookies.html'),
        socios: resolve(__dirname, 'socios.html'),
        escola: resolve(__dirname, 'escola.html'),
        galeria: resolve(__dirname, 'galeria.html'),
        '404': resolve(__dirname, '404.html'),
      },
    },
  },
})
