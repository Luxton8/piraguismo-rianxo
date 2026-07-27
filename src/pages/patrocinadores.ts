import '../style.css'
import { renderNavigation } from '../components/Navigation'
import { renderFooter } from '../components/Footer'

type Sponsor = {
  id: number;
  name: string;
  logo: string;
  url: string;
  category: 'Principal' | 'Secundario';
}

const defaultSponsors = [
  { 
    name: 'Concello de Rianxo', 
    logo: '/concello.png',
    url: 'https://concelloderianxo.gal/',
    category: 'Principal'
  },
  { 
    name: 'Deputación da Coruña', 
    logo: '/DepCor_horiz_BN.png',
    url: 'https://www.dacoruna.gal',
    category: 'Principal'
  },
  { 
    name: 'Xunta de Galicia', 
    logo: '/xunta.png',
    url: 'https://www.xunta.gal',
    category: 'Principal'
  },
  { 
    name: 'Federación Galega de Piragüismo', 
    logo: '/fgp.png',
    url: 'https://www.fegapi.es/',
    category: 'Principal'
  },
  { 
    name: 'Deporte Galego', 
    logo: '/deporte-galego.png',
    url: 'https://deporte.xunta.gal',
    category: 'Principal'
  }
]

let dynamicSponsors: Sponsor[] = []

const app = document.querySelector<HTMLDivElement>('#app')!
const main = document.createElement('main')
main.className = 'pt-32 pb-24 container mx-auto px-6 max-w-7xl font-sans text-gray-850'

async function init() {
  try {
    const res = await fetch('/data/sponsors.json')
    if (res.ok) {
      dynamicSponsors = await res.json()
    }
  } catch (e) {
    console.error('Error fetching dynamic sponsors:', e)
  }

  app.appendChild(renderNavigation())
  renderPage()
  app.appendChild(main)
  app.appendChild(renderFooter())
}

function renderPage() {
  // Combine default institutional sponsors and dynamic main sponsors
  const mainSponsors = [
    ...defaultSponsors,
    ...dynamicSponsors.filter(sp => sp.category === 'Principal')
  ]

  const secondarySponsors = dynamicSponsors.filter(sp => sp.category === 'Secundario')

  main.innerHTML = `
    <!-- Header -->
    <div class="space-y-4 mb-16 text-center max-w-3xl mx-auto">
      <span class="text-[10px] font-black text-brand-red uppercase tracking-widest">Colaboradores</span>
      <h1 class="text-4xl md:text-6xl font-display font-black tracking-tight text-gray-900 uppercase">Os Nosos Patrocinadores</h1>
      <p class="text-gray-500 text-sm md:text-base font-semibold">Grazas ao apoio destas entidades e empresas, o Club de Piragüismo Rianxo pode seguir impulsando o deporte, organizando competicións e educando en valores a centos de mozos na ría.</p>
    </div>

    <!-- Main Sponsors Section -->
    <div class="space-y-8 mb-20">
      <div class="flex items-center gap-4">
        <h2 class="text-xs font-black uppercase text-gray-400 tracking-widest shrink-0">Patrocinadores Principais</h2>
        <div class="h-[1px] w-full bg-gray-200"></div>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        ${mainSponsors.map(sp => `
          <a href="${sp.url || '#'}" ${sp.url ? 'target="_blank" rel="noopener noreferrer"' : 'onclick="return false;"'} class="bg-white border border-gray-200 hover:border-brand-red/35 hover:shadow-lg rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 group h-48 sm:h-56 relative overflow-hidden">
            <div class="h-20 lg:h-24 w-full flex items-center justify-center p-2 mb-2">
              ${sp.logo ? `
                <img src="${sp.logo}" alt="${sp.name}" class="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" />
              ` : `
                <span class="text-xs font-display font-bold text-gray-400 group-hover:text-brand-red transition-all duration-500 uppercase tracking-wider">${sp.name}</span>
              `}
            </div>
            <p class="font-display font-bold text-sm text-gray-800 transition-colors group-hover:text-brand-red mt-2 line-clamp-1">${sp.name}</p>
          </a>
        `).join('')}
      </div>
    </div>

    <!-- Secondary Sponsors Section -->
    ${secondarySponsors.length > 0 ? `
      <div class="space-y-8 mb-20">
        <div class="flex items-center gap-4">
          <h2 class="text-xs font-black uppercase text-gray-400 tracking-widest shrink-0">Colaboradores e Outros Patrocinadores</h2>
          <div class="h-[1px] w-full bg-gray-200"></div>
        </div>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          ${secondarySponsors.map(sp => `
            <a href="${sp.url || '#'}" ${sp.url ? 'target="_blank" rel="noopener noreferrer"' : 'onclick="return false;"'} class="bg-white border border-gray-200 hover:border-brand-red/35 hover:shadow-md rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-all duration-300 group h-36 relative overflow-hidden">
              <div class="h-16 w-full flex items-center justify-center p-2 mb-1">
                ${sp.logo ? `
                  <img src="${sp.logo}" alt="${sp.name}" class="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                ` : `
                  <span class="text-[10px] font-display font-bold text-gray-400 group-hover:text-brand-red transition-all duration-500 uppercase tracking-wider line-clamp-2 leading-snug">${sp.name}</span>
                `}
              </div>
              <p class="font-display font-bold text-xs text-gray-700 transition-colors group-hover:text-brand-red mt-1 line-clamp-1">${sp.name}</p>
            </a>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- CTA Section -->
    <div class="bg-gray-50 border border-gray-200 rounded-3xl p-8 sm:p-16 text-center max-w-4xl mx-auto mt-24 relative overflow-hidden">
      <div class="absolute -top-12 -right-12 w-48 h-48 bg-brand-red/[0.03] rounded-full blur-3xl"></div>
      <div class="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-red/[0.02] rounded-full blur-3xl"></div>
      
      <div class="relative z-10 space-y-6 max-w-2xl mx-auto">
        <h3 class="text-2xl sm:text-3xl font-display font-black uppercase text-gray-900 leading-tight">¿Queres apoiar ao noso club?</h3>
        <p class="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">
          Se tes unha empresa e queres colaborar co Club Piragüismo Rianxo, axudarnos nas nosas actividades e conseguir visibilidade tanto nas nosas equipacións e embarcacións como no noso sitio web e redes sociais, non dubides en poñerte en contacto connosco.
        </p>
        <div>
          <a href="/contacto" class="btn-primary py-4 px-8 text-xs font-bold uppercase tracking-widest cursor-pointer shadow-md inline-block">Asociar Empresa / Contactar</a>
        </div>
      </div>
    </div>
  `
}

init()
