import '../style.css'
import { renderNavigation } from '../components/Navigation'
import { renderFooter } from '../components/Footer'

type EventItem = {
  id: number;
  date: string;
  title: string;
  location: string;
  type: string;
  status: string;
}

const defaultEvents: EventItem[] = [
  {
    id: 1,
    date: '15/06/2026',
    title: 'Campionato Galego de Ríos',
    location: 'Río Ulla, Catoira',
    type: 'Maratón',
    status: 'Confirmado'
  },
  {
    id: 2,
    date: '28/07/2026',
    title: 'Regata Liga Provincial da Coruña',
    location: 'Rianxo',
    type: 'Pista',
    status: 'Confirmado'
  },
  {
    id: 3,
    date: '12/08/2026',
    title: 'Descenso Internacional do Miño',
    location: 'Tui - Ourense',
    type: 'Descenso',
    status: 'Pendente'
  },
  {
    id: 4,
    date: '05/09/2026',
    title: 'Campionato de España de Pista',
    location: 'Trasona, Asturias',
    type: 'Pista / Competición',
    status: 'Confirmado'
  }
]

function parseAndFormatDate(dateStr: string): { day: string; month: string; year: string } {
  const clean = dateStr.trim();
  const monthsGl = ['Xan', 'Feb', 'Mar', 'Abr', 'Mai', 'Xuñ', 'Xul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'];
  
  // Try dd/mm/yyyy
  if (clean.includes('/')) {
    const slashParts = clean.split('/');
    if (slashParts.length === 3) {
      const p0 = slashParts[0].trim();
      const p1 = slashParts[1].trim();
      const p2 = slashParts[2].trim();
      
      let dayVal = '';
      let monthIndex = -1;
      let yearVal = '';
      
      if (p0.length === 4) {
        dayVal = p2.padStart(2, '0');
        monthIndex = parseInt(p1, 10) - 1;
        yearVal = p0;
      } else {
        dayVal = p0.padStart(2, '0');
        monthIndex = parseInt(p1, 10) - 1;
        yearVal = p2;
      }
      
      const monthVal = (monthIndex >= 0 && monthIndex < 12) ? monthsGl[monthIndex] : p1;
      return {
        day: dayVal,
        month: monthVal,
        year: yearVal
      };
    }
  }

  // Try yyyy-mm-dd
  if (clean.includes('-')) {
    const dateObj = new Date(clean);
    if (!isNaN(dateObj.getTime())) {
      return {
        day: dateObj.getDate().toString().padStart(2, '0'),
        month: monthsGl[dateObj.getMonth()],
        year: dateObj.getFullYear().toString()
      };
    }
  }

  // Fallback to space-split (e.g. "15 Xuñ 2026")
  const spaceParts = clean.split(/\s+/);
  if (spaceParts.length === 3) {
    const day = spaceParts[0].padStart(2, '0');
    let month = spaceParts[1];
    const year = spaceParts[2];
    
    if (month.length > 3) {
      month = month.substring(0, 3);
    }
    month = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
    
    return { day, month, year };
  }

  return { day: clean, month: '', year: '' };
}

const app = document.querySelector<HTMLDivElement>('#app')!
const main = document.createElement('main')
main.className = 'pt-32 pb-24 min-h-screen bg-white text-gray-800 relative'

let events: EventItem[] = []

async function init() {
  try {
    const res = await fetch('/data/calendario.json')
    if (res.ok) {
      events = await res.json()
      localStorage.setItem('admin_calendario_events', JSON.stringify(events))
    } else {
      throw new Error()
    }
  } catch (e) {
    if (!localStorage.getItem('admin_calendario_events')) {
      localStorage.setItem('admin_calendario_events', JSON.stringify(defaultEvents))
    }
    events = JSON.parse(localStorage.getItem('admin_calendario_events')!)
  }

  app.appendChild(renderNavigation())
  renderPage()
  app.appendChild(main)
  app.appendChild(renderFooter())
}

function renderPage() {
  main.innerHTML = `
    <!-- Decorative background patterns -->
    <div class="absolute inset-0 bg-gray-50/30 z-0 grid-overlay"></div>
    
    <div class="container mx-auto px-6 relative z-10 max-w-5xl">
      <!-- Section Heading component -->
      <div class="text-center max-w-2xl mx-auto mb-20 space-y-4">
        <span class="text-[10px] font-black text-brand-red uppercase tracking-widest">Tempada 2026</span>
        <h1 class="text-4xl md:text-6xl font-display font-black tracking-tight text-gray-900 uppercase">
          Calendario Oficial
        </h1>
        <p class="text-gray-500 text-sm sm:text-base leading-relaxed font-semibold">
          Consulta as vindeiras regatas, competicións e eventos do Club Piragüismo Rianxo.
        </p>
      </div>
 
      <div class="relative timeline-line pl-10 md:pl-12 space-y-12">
        ${events.map(event => {
          const { day, month, year } = parseAndFormatDate(event.date);
          return `
            <div class="relative group">
              <!-- Timeline indicator dot -->
              <span class="absolute -left-[45px] top-6 w-8 h-8 rounded-full bg-white border-2 border-brand-red flex items-center justify-center shadow-md z-10">
                <span class="w-2.5 h-2.5 rounded-full bg-brand-red"></span>
              </span>
              
              <!-- Event Timeline Card -->
              <div class="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg hover:border-brand-red/35 transition-all duration-300">
                
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1">
                  <!-- Date block -->
                  <div class="px-5 py-3 rounded-2xl bg-gray-50 border border-gray-150 text-center shrink-0 min-w-[90px]">
                    <p class="text-3xl font-display font-black text-gray-900 leading-none">${day}</p>
                    <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1.5">${month || ''}</p>
                    <p class="text-[9px] font-bold text-gray-400 mt-0.5">${year || ''}</p>
                  </div>
                  
                  <!-- Info block -->
                  <div class="space-y-2">
                    <div class="flex flex-wrap items-center gap-2">
                      <span class="px-2.5 py-0.5 rounded-full bg-brand-red/5 border border-brand-red/10 text-[9px] font-black uppercase tracking-widest text-brand-red">${event.type}</span>
                      ${event.status === 'Confirmado' 
                        ? `<span class="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-green-600"><span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Confirmado</span>`
                        : `<span class="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-orange-600"><span class="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Pendente</span>`
                      }
                    </div>
                    <h3 class="text-xl sm:text-2xl font-display font-black text-gray-950">${event.title}</h3>
                    <p class="text-gray-500 flex items-center gap-1.5 text-xs sm:text-sm font-semibold">
                      <svg class="w-4 h-4 text-brand-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      ${event.location}
                    </p>
                  </div>
                </div>
                
                <!-- CTA Action Button -->
                <div class="shrink-0 w-full md:w-auto">
                  <button class="w-full md:w-auto px-6 py-3.5 rounded-xl border border-gray-250 text-gray-700 text-xs font-black uppercase tracking-widest hover:bg-brand-red hover:border-brand-red hover:text-white transition-all duration-300 cursor-pointer shadow-sm">
                    Máis info
                  </button>
                </div>
    
              </div>
            </div>
          `;
        }).join('')}
      </div>
   
    </div>
  `
}

init()
