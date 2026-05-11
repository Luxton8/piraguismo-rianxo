import '../style.css'
import { renderNavigation } from '../components/Navigation'
import { renderFooter } from '../components/Footer'

const app = document.querySelector<HTMLDivElement>('#app')!

app.appendChild(renderNavigation())

const main = document.createElement('main')
main.className = 'pt-32 pb-24 container mx-auto px-6'
main.innerHTML = `
  <h1 class="text-6xl font-display font-bold mb-12">Novas</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div class="glass-card overflow-hidden group">
      <div class="h-64 bg-white/5 overflow-hidden">
        <div class="w-full h-full bg-brand-red/10 flex items-center justify-center text-white/20 italic font-display">Imaxe da nova</div>
      </div>
      <div class="p-8">
        <span class="text-brand-red font-bold text-xs uppercase tracking-widest mb-4 block">Competición</span>
        <h3 class="text-2xl font-display font-bold mb-4 group-hover:text-brand-red transition-colors">Éxito no Campionato Galego de Pista</h3>
        <p class="text-white/50 text-sm mb-6 leading-relaxed">O noso equipo logrou 5 medallas de ouro na proba celebrada o pasado fin de semana...</p>
        <button class="font-bold text-sm border-b border-brand-red pb-1">Ler máis</button>
      </div>
    </div>
    <!-- More placeholders... -->
  </div>
`
app.appendChild(main)

app.appendChild(renderFooter())
