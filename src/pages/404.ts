import '../style.css'
import { renderNavigation } from '../components/Navigation'
import { renderFooter } from '../components/Footer'

const app = document.querySelector<HTMLDivElement>('#app')!
const main = document.createElement('main')
main.className = 'pt-32 pb-24 bg-white min-h-screen relative text-gray-800 font-sans flex items-center justify-center'

main.innerHTML = `
  <div class="absolute inset-0 bg-gray-50/30 z-0 grid-overlay"></div>

  <div class="container mx-auto px-6 max-w-xl text-center relative z-10 space-y-6">
    <div class="w-24 h-24 bg-brand-red/5 border border-brand-red/20 rounded-full flex items-center justify-center mx-auto text-brand-red shadow-sm animate-bounce">
      <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
    </div>
    <div class="space-y-2">
      <span class="text-[10px] font-black text-brand-red uppercase tracking-widest">Erro 404</span>
      <h1 class="text-4xl font-display font-black text-gray-900 uppercase">Perdiches o rumbo?</h1>
      <p class="text-gray-500 font-semibold text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
        A páxina que estás a buscar non existe ou foi movida de sitio. Podes volver á nosa páxina de inicio e retomar a navegación.
      </p>
    </div>
    <div class="pt-4">
      <a href="/" class="btn-primary py-4 px-10 text-xs font-bold uppercase tracking-widest inline-block shadow-md">Volver ao Inicio</a>
    </div>
  </div>
`

app.appendChild(renderNavigation())
app.appendChild(main)
app.appendChild(renderFooter())
