import '../style.css'
import { renderNavigation } from '../components/Navigation'
import { renderFooter } from '../components/Footer'

const app = document.querySelector<HTMLDivElement>('#app')!
const main = document.createElement('main')
main.className = 'pt-32 pb-24 bg-white min-h-screen relative text-gray-800 font-sans'

let currentSeason = '2026'

const galleryData: Record<string, { title: string; image: string }[]> = {
  '2026': [
    { title: 'Regata Copa Galicia Rianxo', image: '/fgp.png' },
    { title: 'Adestramento de Primavera', image: '/logo.png' },
    { title: 'Campións Copa Rianxo 2026', image: '/fgp.png' }
  ],
  '2025': [
    { title: 'Campionato Galego de Pista', image: '/fgp.png' },
    { title: 'Xornada de Portas Abertas', image: '/logo.png' }
  ],
  '2024': [
    { title: 'Baixada do Ulla 2024', image: '/fgp.png' },
    { title: 'Gala Anual do Club 2024', image: '/logo.png' }
  ]
}

function renderGalleryContent() {
  const photos = galleryData[currentSeason] || []
  
  const contentArea = document.getElementById('gallery-grid')
  if (!contentArea) return

  contentArea.innerHTML = photos.map(photo => `
    <div class="group relative bg-gray-50 border border-gray-200 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <div class="w-full h-64 bg-white flex items-center justify-center p-8">
        <img src="${photo.image}" loading="lazy" decoding="async" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" alt="${photo.title}" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
        <h4 class="text-white font-bold text-sm uppercase tracking-wide">${photo.title}</h4>
        <span class="text-[10px] text-brand-red font-black uppercase mt-1">Tempada ${currentSeason}</span>
      </div>
    </div>
  `).join('')
}

main.innerHTML = `
  <div class="absolute inset-0 bg-gray-50/30 z-0 grid-overlay"></div>

  <div class="container mx-auto px-6 max-w-6xl relative z-10 space-y-10">
    <div class="space-y-2 text-center">
      <span class="text-[10px] font-black text-brand-red uppercase tracking-widest">Multimedia</span>
      <h1 class="text-4xl md:text-5xl font-display font-black text-gray-900 uppercase">Galería Fotográfica</h1>
      <p class="text-gray-500 text-xs sm:text-sm font-semibold max-w-md mx-auto">
        Revive os mellores momentos, regatas e triunfos do club a través das nosas fotos.
      </p>
    </div>

    <!-- Season Tabs -->
    <div class="flex justify-center border-b border-gray-200 gap-4 overflow-x-auto scrollbar-hide">
      <button onclick="window.selectSeason('2026')" id="tab-2026" class="px-6 py-4 font-display font-black uppercase tracking-wider text-xs border-b-2 transition-all cursor-pointer border-brand-red text-brand-red">2026</button>
      <button onclick="window.selectSeason('2025')" id="tab-2025" class="px-6 py-4 font-display font-black uppercase tracking-wider text-xs border-b-2 transition-all cursor-pointer border-transparent text-gray-400 hover:text-gray-700">2025</button>
      <button onclick="window.selectSeason('2024')" id="tab-2024" class="px-6 py-4 font-display font-black uppercase tracking-wider text-xs border-b-2 transition-all cursor-pointer border-transparent text-gray-400 hover:text-gray-700">2024</button>
    </div>

    <!-- Gallery Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-grid"></div>
  </div>
`

app.appendChild(renderNavigation())
app.appendChild(main)
app.appendChild(renderFooter())

// Setup Global callback
;(window as any).selectSeason = (season: string) => {
  currentSeason = season
  
  // Update active tab borders
  const tabs = ['2026', '2025', '2024']
  tabs.forEach(t => {
    const el = document.getElementById('tab-' + t)
    if (el) {
      if (t === season) {
        el.className = 'px-6 py-4 font-display font-black uppercase tracking-wider text-xs border-b-2 transition-all cursor-pointer border-brand-red text-brand-red'
      } else {
        el.className = 'px-6 py-4 font-display font-black uppercase tracking-wider text-xs border-b-2 transition-all cursor-pointer border-transparent text-gray-400 hover:text-gray-700'
      }
    }
  })
  
  renderGalleryContent()
}

// Initial Render
setTimeout(() => {
  renderGalleryContent()
}, 0)
