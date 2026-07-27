export function renderDisciplines() {
  const section = document.createElement('section')
  section.id = 'disciplinas'
  section.className = 'py-32 bg-white relative overflow-hidden text-gray-800 font-sans'

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
    <div class="container mx-auto px-6 max-w-7xl">
      <div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div class="max-w-2xl space-y-2">
          <span class="text-[10px] font-black text-brand-red uppercase tracking-widest">As nosas especialidades</span>
          <h2 class="text-4xl md:text-5xl font-display font-black leading-tight text-gray-900">Especialidades Deportivas</h2>
        </div>
        <p class="text-gray-500 max-w-sm text-sm sm:text-base font-semibold leading-relaxed">
          Contamos con seccións especializadas para cada nivel, desde iniciación ata alto rendemento.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${disciplines.map(d => `
          <div class="group relative h-[480px] rounded-3xl overflow-hidden border border-gray-200 hover:shadow-xl hover:border-brand-red/30 transition-all duration-300">
            <!-- Image Background -->
            <div class="absolute inset-0 z-0">
              <div class="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent z-10"></div>
              <img src="${d.img}" class="w-full h-full object-cover opacity-90 transition-all duration-700" alt="${d.title}" />
            </div>
            
            <!-- Content -->
            <div class="absolute inset-0 z-20 p-8 flex flex-col justify-end">
              <div class="w-10 h-10 rounded-xl bg-brand-red flex items-center justify-center mb-6 shadow-md shadow-brand-red/30">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="${d.icon}"></path>
                </svg>
              </div>
              <span class="text-[9px] font-black text-brand-red uppercase tracking-widest">Modalidade</span>
              <h3 class="text-2xl font-display font-black text-gray-900 mt-0.5 mb-2">${d.title}</h3>
              <p class="text-gray-500 text-xs sm:text-sm font-semibold mb-4 leading-relaxed">${d.desc}</p>
              <a href="#" class="inline-flex items-center gap-1.5 font-bold text-brand-red hover:text-red-700 transition-colors text-xs uppercase tracking-wider">
                Ler máis 
                <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `

  return section
}
