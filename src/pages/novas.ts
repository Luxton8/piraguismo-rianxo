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
main.className = 'pt-32 pb-24 container mx-auto px-6 text-gray-850'

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
  const featuredNova = novas[0];
  const otherNovas = novas.slice(1);

  main.innerHTML = `
    <!-- Header heading component -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 font-sans">
      <div class="space-y-2">
        <span class="text-[10px] font-black text-brand-red uppercase tracking-widest">Actualidade</span>
        <h1 class="text-4xl md:text-6xl font-display font-black tracking-tight text-gray-900 uppercase">Novas do Club</h1>
        <p class="text-gray-500 text-xs sm:text-sm font-semibold max-w-2xl">Mantente ao día de todas as novidades, competicións e actividades do Club Piragüismo Rianxo.</p>
      </div>
    </div>
    
    <!-- NewsFeaturedCard -->
    ${featuredNova ? `
      <div class="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:border-brand-red/30 transition-all duration-300 mb-12 font-sans group">
        <div class="grid grid-cols-1 lg:grid-cols-12">
          <div class="lg:col-span-7 h-80 lg:h-96 bg-gray-50 relative overflow-hidden">
            ${featuredNova.image ? `
              <img src="${featuredNova.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="${featuredNova.title}" />
            ` : `
              <div class="w-full h-full bg-brand-red/[0.03] flex items-center justify-center text-gray-300 italic font-display text-lg">Imaxe da nova destacada</div>
            `}
            <div class="absolute top-6 left-6 bg-white/95 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider text-gray-500 shadow-sm">${featuredNova.date}</div>
          </div>
          <div class="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center">
            <span class="text-[9px] font-black text-brand-red uppercase tracking-widest mb-4 block">Novidade Destacada</span>
            <h3 class="text-2xl sm:text-3xl font-display font-black text-gray-950 group-hover:text-brand-red transition-colors leading-tight mb-4 line-clamp-3">${featuredNova.title}</h3>
            <p class="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 font-semibold line-clamp-4">${featuredNova.description}</p>
            <div>
              <button onclick="window.showNovaDetails(${featuredNova.id})" class="btn-primary py-3.5 px-6 text-xs uppercase tracking-widest cursor-pointer shadow-md inline-flex items-center gap-1.5">
                Ler máis 
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- NewsGrid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-sans" id="novas-grid">
      ${otherNovas.map(nova => `
        <div class="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden group flex flex-col h-full hover:shadow-lg hover:border-brand-red/35 transition-all duration-300">
          <div class="h-56 bg-gray-50 overflow-hidden relative shrink-0">
            ${nova.image ? `
              <img src="${nova.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="${nova.title}" />
            ` : `
              <div class="w-full h-full bg-brand-red/[0.03] flex items-center justify-center text-gray-300 italic font-display text-sm">Imaxe da nova</div>
            `}
            <div class="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-gray-500 shadow-sm">${nova.date}</div>
          </div>
          <div class="p-8 flex flex-col flex-1">
            <span class="text-[9px] font-black text-brand-red uppercase tracking-widest mb-3 block">${nova.category}</span>
            <h3 class="text-xl font-display font-black text-gray-950 group-hover:text-brand-red transition-colors leading-snug mb-3 line-clamp-2">${nova.title}</h3>
            <p class="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 font-semibold flex-1 line-clamp-3">${nova.description}</p>
            <button onclick="window.showNovaDetails(${nova.id})" class="font-bold text-xs uppercase tracking-wider text-brand-red border-b-2 border-brand-red/20 pb-0.5 self-start hover:text-red-700 hover:border-red-700 transition-all cursor-pointer">
              Ler máis
            </button>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Detail Modal -->
    <div id="nova-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 p-6">
      <div class="w-full max-w-3xl bg-white border border-gray-200 rounded-3xl relative max-h-[90vh] overflow-y-auto shadow-2xl" id="nova-modal-content">
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
    <button onclick="window.closeNovaDetails()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors z-10 border border-gray-200 shadow-md">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
    
    <div class="h-80 w-full bg-gray-50 relative">
      ${nova.image ? `
        <img src="${nova.image}" class="w-full h-full object-cover" alt="${nova.title}" />
      ` : `
        <div class="w-full h-full bg-brand-red/5 flex items-center justify-center text-gray-300 italic font-display text-2xl">Imaxe da nova</div>
      `}
      <div class="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
    </div>
    
    <div class="p-8 md:p-12 -mt-12 relative z-10 bg-white rounded-b-3xl">
      <div class="flex items-center gap-4 mb-4">
        <span class="px-3 py-1 bg-brand-red text-white text-xs font-bold uppercase tracking-widest rounded-full">${nova.category}</span>
        <span class="text-gray-500 text-sm font-medium">${nova.date}</span>
      </div>
      <h2 class="text-3xl md:text-5xl font-display font-bold mb-6 text-gray-900 leading-tight">${nova.title}</h2>
      <div class="w-20 h-1 bg-brand-red mb-8"></div>
      <div class="text-gray-600 text-base md:text-lg leading-relaxed space-y-6">
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
