export function renderClubDetails() {
  const section = document.createElement('section')
  section.id = 'club-detalles'
  section.className = ''

  const categories = [
    { id: 'xunta', title: 'Xunta Directiva', content: 'Dirección e xestión do club composta por socios electos.' },
    { id: 'tecnico', title: 'Corpo Técnico', content: 'Adestradores titulados e especialistas en alto rendemento.' },
    { id: 'palmares', title: 'Palmarés', content: 'Máis de 40 anos de éxitos en campionatos nacionais e internacionais.' },
    { id: 'equipos', title: 'Equipos', content: 'Seccións desde pre-benxamín ata veteranos.' }
  ]

  section.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      ${categories.map(cat => `
        <div class="glass-card p-8 hover:border-brand-red/30 transition-all group cursor-pointer">
          <h4 class="text-xl font-display font-bold mb-4 group-hover:text-brand-red transition-colors">${cat.title}</h4>
          <p class="text-white/50 text-sm leading-relaxed">${cat.content}</p>
          <div class="mt-6 flex items-center gap-2 text-brand-red font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
            Ver máis <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Socios CTA -->
    <div class="mt-20 relative rounded-3xl overflow-hidden p-12 text-center border border-brand-red/20">
      <div class="absolute inset-0 bg-brand-red/5 z-0"></div>
      <div class="relative z-10 max-w-2xl mx-auto">
        <h3 class="text-4xl font-display font-bold mb-6 italic uppercase tracking-tighter">Faste <span class="text-brand-red">Socio</span></h3>
        <p class="text-white/70 mb-8 text-lg">
          Apoia o piragüismo en Rianxo e disfruta de vantaxes exclusivas, acceso ás instalacións e descontos en cursos.
        </p>
        <button class="btn-primary px-10">Quero ser socio</button>
      </div>
    </div>
  `

  return section
}
