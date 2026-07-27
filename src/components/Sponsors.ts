export function renderSponsors() {
  const section = document.createElement('section')
  section.className = 'py-24 bg-white border-t border-gray-200 text-gray-700 font-sans'
  
  const sponsors = [
    { 
      name: 'Concello de Rianxo', 
      logo: '/concello.png',
      url: 'https://concelloderianxo.gal/'
    },
    { 
      name: 'Deputación da Coruña', 
      logo: '/DepCor_horiz_BN.png',
      url: 'https://www.dacoruna.gal'
    },
    { 
      name: 'Xunta de Galicia', 
      logo: '/xunta.png',
      url: 'https://www.xunta.gal'
    },
    { 
      name: 'Federación Galega de Piragüismo', 
      logo: '/fgp.png',
      url: 'https://www.fegapi.es/'
    },
    { 
      name: 'Deporte Galego', 
      logo: '/deporte-galego.png',
      url: 'https://deporte.xunta.gal'
    }
  ]

  section.innerHTML = `
    <div class="container mx-auto px-6 text-center max-w-7xl">
      <h2 class="text-3xl md:text-4xl font-display font-bold mb-4 uppercase tracking-tight text-gray-900">Patrocinadores</h2>
      <p class="text-gray-500 font-bold mb-16 uppercase tracking-wider text-xs">Grazas polo voso apoio ao <span class="text-brand-red block sm:inline mt-1 sm:mt-0">Club Piragüismo Rianxo</span></p>
      
      <div class="grid grid-cols-2 md:grid-cols-5 gap-12 items-center justify-center">
        ${sponsors.map(sponsor => `
          <a href="${sponsor.url}" target="_blank" rel="noopener noreferrer" class="h-16 lg:h-24 flex items-center justify-center group cursor-pointer p-4 border border-gray-100 hover:border-gray-200 hover:shadow-md rounded-2xl bg-gray-50/50 transition-all duration-300">
            ${sponsor.logo ? `
              <img src="${sponsor.logo}" alt="${sponsor.name}" loading="lazy" decoding="async" class="h-full object-contain opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" />
            ` : `
              <span class="text-xs font-display font-bold text-gray-400 group-hover:text-brand-red transition-all duration-500 uppercase tracking-wider">${sponsor.name}</span>
            `}
          </a>
        `).join('')}
      </div>

      <div class="mt-20 max-w-3xl mx-auto border-t border-gray-100 pt-10">
        <p class="text-gray-400 text-xs leading-relaxed italic">
          Grazas ao apoio dos nosos patrocinadores, cada tempada podemos promover a práctica deportiva de centos de nenos e adultos, fomentando a saúde e os valores do piragüismo na nosa vila.
        </p>
      </div>
    </div>
  `
  return section
}
