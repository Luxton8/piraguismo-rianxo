import '../style.css'
import { renderNavigation } from '../components/Navigation'
import { renderFooter } from '../components/Footer'

const app = document.querySelector<HTMLDivElement>('#app')!
const main = document.createElement('main')
main.className = 'pt-32 pb-24 bg-white min-h-screen relative text-gray-800 font-sans'

main.innerHTML = `
  <div class="absolute inset-0 bg-gray-50/30 z-0 grid-overlay"></div>

  <div class="container mx-auto px-6 max-w-4xl relative z-10 text-center space-y-6">
    <div class="space-y-2">
      <span class="text-[10px] font-black text-brand-red uppercase tracking-widest">Privacidade</span>
      <h1 class="text-4xl md:text-5xl font-display font-black text-gray-900 uppercase">Preferencias de Cookies</h1>
      <p class="text-gray-550 font-semibold max-w-md mx-auto text-sm sm:text-base">
        Abre o panel a continuación para configurar ou revogar o teu consentimento sobre o uso de cookies.
      </p>
    </div>
    <div class="pt-4">
      <button onclick="window.showCookiePreferences()" class="btn-primary py-4 px-10 text-xs uppercase tracking-widest cursor-pointer shadow-md">Abrir Preferencias</button>
    </div>
  </div>
`

app.appendChild(renderNavigation())
app.appendChild(main)
app.appendChild(renderFooter())

// Auto-trigger preferences panel
setTimeout(() => {
  if ((window as any).showCookiePreferences) {
    (window as any).showCookiePreferences()
  }
}, 300)
