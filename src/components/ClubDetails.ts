export function renderClubDetails() {
  const section = document.createElement('section')
  section.id = 'club-detalles'
  section.className = 'font-sans'

  const categories = [
    { id: 'xunta', title: 'Xunta Directiva', content: 'Dirección e xestión do club composta por socios electos comprometidos.' },
    { id: 'tecnico', title: 'Corpo Técnico', content: 'Adestradores titulados e especialistas en alto rendemento deportivo.' },
    { id: 'palmares', title: 'Palmarés', content: 'Máis de 40 anos de éxitos en campionatos nacionais e internacionais.' },
    { id: 'equipos', title: 'Equipos', content: 'Seccións de adestramento desde pre-benxamín ata a categoría de veteranos.' }
  ]

  section.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${categories.map(cat => `
        <div class="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-brand-red/40 transition-all group cursor-pointer text-gray-800 flex flex-col justify-between">
          <div>
            <span class="text-[9px] font-black text-brand-red uppercase tracking-widest">Información</span>
            <h4 class="text-xl font-display font-black text-gray-900 group-hover:text-brand-red transition-colors mt-1 mb-3">${cat.title}</h4>
            <p class="text-gray-500 text-xs sm:text-sm leading-relaxed">${cat.content}</p>
          </div>
          <div class="mt-6 flex items-center gap-1 text-brand-red font-bold text-xs uppercase tracking-wider">
            Ler máis 
            <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Socios CTA -->
    <div class="mt-20 relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center border border-gray-200 bg-gray-50/50 shadow-sm">
      <div class="absolute inset-0 bg-brand-red/[0.01] z-0"></div>
      <div class="relative z-10 max-w-2xl mx-auto space-y-6">
        <span class="text-[10px] font-black text-brand-red uppercase tracking-widest">Colabora co club</span>
        <h3 class="text-3xl md:text-4xl font-display font-black text-gray-900 leading-none">FASTE SOCIO</h3>
        <p class="text-gray-500 text-sm sm:text-base leading-relaxed font-semibold max-w-lg mx-auto">
          Apoia o piragüismo en Rianxo e disfruta de vantaxes exclusivas, acceso ás instalacións e descontos en cursos.
        </p>
        <div class="pt-2">
          <button class="btn-primary px-10 py-4 text-xs font-bold uppercase tracking-widest cursor-pointer shadow-md">Quero ser socio</button>
        </div>
      </div>
    </div>
  `

  return section
}
