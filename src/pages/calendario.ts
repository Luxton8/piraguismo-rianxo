import '../style.css'
import { renderNavigation } from '../components/Navigation'
import { renderFooter } from '../components/Footer'

const app = document.querySelector<HTMLDivElement>('#app')!
app.appendChild(renderNavigation())

const main = document.createElement('main')
main.className = 'pt-32 pb-24 min-h-screen bg-brand-dark relative'

const events = [
  {
    date: '15 Xuñ 2026',
    title: 'Campionato Galego de Ríos',
    location: 'Río Ulla, Catoira',
    type: 'Maratón',
    status: 'Confirmado'
  },
  {
    date: '28 Xul 2026',
    title: 'Regata Liga Provincial da Coruña',
    location: 'Rianxo',
    type: 'Pista',
    status: 'Confirmado'
  },
  {
    date: '12 Ago 2026',
    title: 'Descenso Internacional do Miño',
    location: 'Tui - Ourense',
    type: 'Descenso',
    status: 'Pendente'
  },
  {
    date: '05 Set 2026',
    title: 'Campionato de España de Pista',
    location: 'Trasona, Asturias',
    type: 'Pista / Competición',
    status: 'Confirmado'
  }
]

main.innerHTML = `
  <div class="absolute inset-0 bg-brand-dark/20 z-0"></div>
  
  <div class="container mx-auto px-6 relative z-10">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <h1 class="text-5xl md:text-7xl font-display font-bold mb-6 uppercase tracking-tighter italic">
          O Noso <span class="text-brand-red">Calendario</span>
        </h1>
        <p class="text-white/60 text-lg max-w-2xl mx-auto">
          Consulta as vindeiras regatas, competicións e eventos do Club Piragüismo Rianxo para a tempada 2026.
        </p>
      </div>

      <div class="space-y-6">
        ${events.map(event => `
          <div class="glass-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-brand-red/30 transition-colors group cursor-default">
            
            <div class="flex items-start md:items-center gap-6 md:gap-8 flex-1">
              <!-- Date Badge -->
              <div class="w-24 h-24 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center group-hover:bg-brand-red/10 group-hover:border-brand-red/30 transition-colors">
                <span class="text-3xl font-display font-bold text-white group-hover:text-brand-red transition-colors leading-none">${event.date.split(' ')[0]}</span>
                <span class="text-xs font-bold text-white/50 uppercase tracking-widest mt-1">${event.date.split(' ')[1]}</span>
                <span class="text-[10px] text-white/30">${event.date.split(' ')[2]}</span>
              </div>
              
              <!-- Event Info -->
              <div>
                <div class="flex flex-wrap items-center gap-3 mb-2">
                  <span class="px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-widest text-white/70">${event.type}</span>
                  ${event.status === 'Confirmado' 
                    ? `<span class="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-green-400"><span class="w-1.5 h-1.5 rounded-full bg-green-400"></span> Confirmado</span>`
                    : `<span class="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-orange-400"><span class="w-1.5 h-1.5 rounded-full bg-orange-400"></span> Pendente</span>`
                  }
                </div>
                <h3 class="text-2xl md:text-3xl font-display font-bold mb-2 group-hover:text-brand-red transition-colors">${event.title}</h3>
                <p class="text-white/50 flex items-center gap-2 text-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  ${event.location}
                </p>
              </div>
            </div>
            
            <!-- Action Button -->
            <button class="w-full md:w-auto px-6 py-3 rounded-full border border-white/20 text-white text-sm font-bold hover:bg-brand-red hover:border-brand-red transition-colors whitespace-nowrap">
              Máis info
            </button>

          </div>
        `).join('')}
      </div>

    </div>
  </div>
`

app.appendChild(main)
app.appendChild(renderFooter())
