export function renderSponsors() {
  const section = document.createElement('section')
  section.className = 'py-24 bg-white/5 border-y border-white/10'
  
  const sponsors = [
    { name: 'Concello de Rianxo', logo: '/negativo%20concello.png' },
    { name: 'Deputación da Coruña', logo: '/negativo%20deputacion.png' },
    { name: 'Xunta de Galicia', logo: 'https://www.xunta.gal/xunta-theme/images/logo-xunta.png' },
    { name: 'Abanca', logo: 'https://www.abanca.com/img/logo-abanca.svg' },
    { name: 'Deporte Galego', logo: 'https://deporte.xunta.gal/sites/default/files/logo_deporte_galego_0.png' }
  ]

  section.innerHTML = `
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-4xl font-display font-bold mb-4 uppercase tracking-widest italic">Patrocinadores</h2>
      <p class="text-white/40 font-bold mb-16 uppercase tracking-tighter">Grazas polo voso apoio ao <span class="text-brand-red">CP Rianxo!!!</span></p>
      
      <div class="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
        ${sponsors.map(sponsor => `
          <div class="h-16 lg:h-20 flex items-center justify-center group cursor-pointer">
            <img src="${sponsor.logo}" alt="${sponsor.name}" class="h-full object-contain transition-transform group-hover:scale-110" />
          </div>
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
