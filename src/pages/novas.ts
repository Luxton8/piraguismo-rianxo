import '../style.css'
import { renderNavigation } from '../components/Navigation'
import { renderFooter } from '../components/Footer'

type Nova = {
  id: number;
  title: string;
  category: string;
  description: string;
  content: string;
  date: string;
  image: string;
}

const defaultNovas: Nova[] = [
  {
    id: 1,
    title: 'Éxito no Campionato Galego de Pista',
    category: 'Competición',
    description: 'O noso equipo logrou 5 medallas de ouro na proba celebrada o pasado fin de semana...',
    content: 'O pasado fin de semana celebrouse o Campionato Galego de Pista nos encoros habituais. O Club de Piragüismo Rianxo acudiu cunha numerosa delegación de deportistas de todas as categorías. Grazas ao esforzo colectivo e ao gran nivel individual dos nosos piragüistas, logramos traer para Rianxo 5 medallas de ouro, 3 de prata e 2 de bronce. Queremos dar os nosos parabéns a todo o corpo técnico e aos deportistas que o deron todo na auga.',
    date: '28/05/2026',
    image: ''
  },
  {
    id: 2,
    title: 'Aberto o prazo de inscrición na Escola de Piragüismo',
    category: 'Escola',
    description: 'Comeza unha nova tempada para nenos e nenas de 8 a 14 anos que queiran iniciarse neste deporte.',
    content: 'Xa está aberto o prazo de inscrición para os cursos de verán e iniciación na nosa Escola de Piragüismo. Se tes entre 8 e 14 anos e queres desfrutar do mar, facer amigos e practicar deporte nun entorno natural único como a Ría de Arousa, esta é a túa oportunidade. Temos prazas limitadas por grupo para garantir a seguridade de todas e todos. Non o deixes para o final e inscríbete a través do noso formulario de contacto ou visitando as nosas oficinas no Porto de Rianxo.',
    date: '15/05/2026',
    image: ''
  },
  {
    id: 3,
    title: 'Xornada de Limpeza da Ría de Arousa',
    category: 'Club',
    description: 'Deportistas e socios uníronse para recoller residuos e concienciar sobre o coidado ambiental.',
    content: 'Como parte do noso compromiso co medio ambiente, este pasado sábado levamos a cabo a nosa xornada anual de voluntariado ambiental. Máis de 30 voluntarios entre deportistas, socios e directivos do club percorreron as praias e zonas costeiras próximas ao club nos seus kaiaks e a pé para recoller plásticos e outros refugallos. Conseguimos retirar máis de 150 kg de lixo das nosas augas. Moitas grazas a todos os que colaborastes nesta gran iniciativa!',
    date: '02/05/2026',
    image: ''
  }
]

let novas: Nova[] = []

const app = document.querySelector<HTMLDivElement>('#app')!
const main = document.createElement('main')
main.className = 'pt-32 pb-24 container mx-auto px-6'

async function init() {
  try {
    const res = await fetch('/data/novas.json')
    if (res.ok) {
      novas = await res.json()
      localStorage.setItem('admin_novas', JSON.stringify(novas))
    } else {
      throw new Error('Not OK')
    }
  } catch (e) {
    if (!localStorage.getItem('admin_novas')) {
      localStorage.setItem('admin_novas', JSON.stringify(defaultNovas))
    }
    novas = JSON.parse(localStorage.getItem('admin_novas')!)
  }

  app.appendChild(renderNavigation())
  renderPage()
  app.appendChild(main)
  app.appendChild(renderFooter())

  // Modal logic
  const modal = document.getElementById('nova-modal')!
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeNovaDetails()
  })
}

function renderPage() {
  main.innerHTML = `
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
      <div>
        <h1 class="text-6xl font-display font-bold uppercase tracking-tighter italic">Novas <span class="text-brand-red">do Club</span></h1>
        <p class="text-white/50 text-lg mt-2">Mantente ao día de todas as novidades, competicións e actividades do Club Piragüismo Rianxo.</p>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="novas-grid">
      ${novas.map(nova => `
        <div class="glass-card overflow-hidden group flex flex-col h-full">
          <div class="h-64 bg-white/5 overflow-hidden relative shrink-0">
            ${nova.image ? `
              <img src="${nova.image}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="${nova.title}" />
            ` : `
              <div class="w-full h-full bg-brand-red/10 flex items-center justify-center text-white/20 italic font-display">Imaxe da nova</div>
            `}
            <div class="absolute top-4 left-4 bg-brand-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white/70">${nova.date}</div>
          </div>
          <div class="p-8 flex flex-col flex-1">
            <span class="text-brand-red font-bold text-xs uppercase tracking-widest mb-4 block">${nova.category}</span>
            <h3 class="text-2xl font-display font-bold mb-4 group-hover:text-brand-red transition-colors line-clamp-2">${nova.title}</h3>
            <p class="text-white/50 text-sm mb-6 leading-relaxed flex-1 line-clamp-3">${nova.description}</p>
            <button onclick="window.showNovaDetails(${nova.id})" class="font-bold text-sm border-b border-brand-red pb-1 self-start hover:text-brand-red transition-colors">Ler máis</button>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Detail Modal -->
    <div id="nova-modal" class="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 p-6">
      <div class="w-full max-w-3xl bg-brand-grey border border-white/5 rounded-3xl relative max-h-[90vh] overflow-y-auto" id="nova-modal-content">
        <!-- Content injected by JavaScript -->
      </div>
    </div>
  `
}

function showNovaDetails(id: number) {
  const nova = novas.find(n => n.id === id)
  if (!nova) return

  const modal = document.getElementById('nova-modal')!
  const modalContent = document.getElementById('nova-modal-content')!

  modalContent.innerHTML = `
    <button onclick="window.closeNovaDetails()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-brand-red transition-colors z-10 border border-white/10">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
    
    <div class="h-80 w-full bg-white/5 relative">
      ${nova.image ? `
        <img src="${nova.image}" class="w-full h-full object-cover" alt="${nova.title}" />
      ` : `
        <div class="w-full h-full bg-brand-red/10 flex items-center justify-center text-white/20 italic font-display text-2xl">Imaxe da nova</div>
      `}
      <div class="absolute inset-0 bg-gradient-to-t from-brand-grey via-brand-grey/20 to-transparent"></div>
    </div>
    
    <div class="p-8 md:p-12 -mt-12 relative z-10 bg-brand-grey rounded-b-3xl">
      <div class="flex items-center gap-4 mb-4">
        <span class="px-3 py-1 bg-brand-red text-white text-xs font-bold uppercase tracking-widest rounded-full">${nova.category}</span>
        <span class="text-white/40 text-sm font-medium">${nova.date}</span>
      </div>
      <h2 class="text-3xl md:text-5xl font-display font-bold mb-6 text-white leading-tight">${nova.title}</h2>
      <div class="w-20 h-1 bg-brand-red mb-8"></div>
      <div class="text-white/70 text-base md:text-lg leading-relaxed space-y-6">
        ${nova.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
      </div>
    </div>
  `
  
  modal.classList.remove('opacity-0', 'pointer-events-none')
  document.body.style.overflow = 'hidden'
}

function closeNovaDetails() {
  const modal = document.getElementById('nova-modal')!
  modal.classList.add('opacity-0', 'pointer-events-none')
  document.body.style.overflow = ''
}

// Global functions
declare global {
  interface Window {
    showNovaDetails: typeof showNovaDetails;
    closeNovaDetails: typeof closeNovaDetails;
  }
}
window.showNovaDetails = showNovaDetails
window.closeNovaDetails = closeNovaDetails

init()
