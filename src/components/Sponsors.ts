export function renderSponsors() {
  const section = document.createElement('section')
  section.className = 'py-24 bg-white/5 border-y border-white/10'
  
  const sponsors = [
    { 
      name: 'Concello de Rianxo', 
      logo: '/logo-concello-neg.png',
      url: 'https://concelloderianxo.gal/'
    },
    { 
      name: 'Deputación da Coruña', 
      logo: '/logo-deputacion-neg.png',
      url: 'https://www.dacoruna.gal'
    },
    { 
      name: 'Xunta de Galicia', 
      logo: '/logo-xunta-neg.png',
      url: 'https://www.xunta.gal'
    },
    { 
      name: 'Federación Galega de Piragüismo', 
      logo: '/logo-fgp-neg.png',
      url: 'https://www.fegapi.es/'
    },
    { 
      name: 'Deporte Galego', 
      logo: '/deporte-galego.png',
      url: 'https://deporte.xunta.gal'
    }
  ]

  section.innerHTML = `
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-3xl md:text-4xl font-display font-bold mb-4 uppercase tracking-widest italic break-words">Patrocinadores</h2>
      <p class="text-white/40 font-bold mb-12 uppercase tracking-tighter">Grazas polo voso apoio ao <span class="text-brand-red block sm:inline mt-1 sm:mt-0">Club Piragüismo Rianxo!!!</span></p>
      
      <div class="flex flex-wrap justify-center items-center gap-12 lg:gap-24">
        ${sponsors.map(sponsor => `
          <a href="${sponsor.url}" target="_blank" rel="noopener noreferrer" class="h-16 lg:h-20 flex items-center justify-center group cursor-pointer">
            ${sponsor.logo ? `
              <img src="${sponsor.logo}" alt="${sponsor.name}" loading="lazy" decoding="async" class="h-full object-contain opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" />
            ` : `
              <span class="text-3xl font-display font-black text-white/20 group-hover:text-white transition-all duration-500 uppercase italic tracking-tighter">${sponsor.name}</span>
            `}
          </a>
        `).join('')}
      </div>

      <div class="mt-20 max-w-3xl mx-auto">
        <p class="text-white/30 text-sm leading-relaxed italic">
          Grazas ao apoio dos nosos patrocinadores, cada tempada podemos promover a práctica deportiva de centos de nenos e adultos, fomentando a saúde e os valores do piragüismo na nosa vila.
        </p>
      </div>
    </div>
  `
  return section
}
