export function renderDisciplines() {
  const section = document.createElement('section')
  section.id = 'disciplinas'
  section.className = 'py-32 bg-brand-dark relative overflow-hidden'

  const disciplines = [
    {
      title: 'Pista (Sprint)',
      desc: 'Velocidade e técnica en distancias de 200m, 500m e 1000m.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      img: '/images/sprint.png'
    },
    {
      title: 'Maratón',
      desc: 'Resistencia e estratexia en longas distancias con porteos.',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      img: '/images/marathon.png'
    },
    {
      title: 'Kaiak de Mar',
      desc: 'Exploración e competición en augas abertas da ría.',
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5V3.935',
      img: '/images/seakayak.png'
    }
  ]

  section.innerHTML = `
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div class="max-w-2xl">
          <h2 class="text-brand-red font-bold tracking-widest uppercase mb-4">As nosas especialidades</h2>
          <p class="text-5xl md:text-6xl font-display font-bold leading-tight">DOMINA A AUGA EN <br/>CALQUERA FORMA</p>
        </div>
        <p class="text-white/50 max-w-sm text-lg">
          Contamos con seccións especializadas para cada nivel, desde iniciación ata alto rendemento.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${disciplines.map(d => `
          <div class="group relative h-[500px] rounded-3xl overflow-hidden border border-white/5 hover:border-brand-red/50 transition-all duration-500">
            <!-- Image Background -->
            <div class="absolute inset-0 z-0">
              <div class="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent z-10"></div>
              <img src="${d.img}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt="${d.title}" />
            </div>
            
            <!-- Content -->
            <div class="absolute inset-0 z-20 p-8 flex flex-col justify-end">
              <div class="w-12 h-12 rounded-2xl bg-brand-red flex items-center justify-center mb-6 shadow-lg shadow-brand-red/40 group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${d.icon}"></path>
                </svg>
              </div>
              <h3 class="text-3xl font-display font-bold mb-4">${d.title}</h3>
              <p class="text-white/60 mb-6 group-hover:text-white/90 transition-colors">${d.desc}</p>
              <a href="#" class="inline-flex items-center gap-2 font-bold text-brand-red hover:text-white transition-colors">
                Máis información 
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `

  return section
}
