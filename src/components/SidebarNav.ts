export function renderSidebarNav(activeId: string) {
  const aside = document.createElement('aside')
  aside.className = 'w-full lg:w-80 shrink-0'

  const items = [
    { id: 'quensomos', label: 'Quen Somos', href: '/club' },
    { id: 'historia', label: 'Breve Historia', href: '/club#historia' },
    { id: 'tecnico', label: 'Corpo Técnico', href: '/club#tecnico' },
    { id: 'xunta', label: 'Xunta Directiva', href: '/club#xunta' },
    { id: 'socios', label: 'Socios', href: '/club#socios' },
    { id: 'palmares', label: 'Palmarés', href: '/club#palmares' },
    { id: 'equipos', label: 'Equipos', href: '/club#equipos' },
    { id: 'destacados', label: 'Deportistas Destacados', href: '/club#destacados' },
  ]

  aside.innerHTML = `
    <div class="bg-brand-grey border border-white/5 rounded-2xl p-4 lg:p-6 sticky top-20 lg:top-28 z-40">
      <h3 class="text-[10px] lg:text-xs font-bold text-brand-red uppercase tracking-widest mb-4 lg:mb-8 px-2">Club Piragüismo Rianxo</h3>
      <nav class="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        ${items.map(item => `
          <a href="${item.href}" class="px-4 py-2 lg:py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${item.id === activeId ? 'bg-brand-red text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}">
            ${item.label}
          </a>
        `).join('')}
      </nav>
    </div>

    <div class="bg-brand-grey border border-white/5 rounded-2xl p-6 mt-6 hidden lg:block">
      <h3 class="text-xs font-bold text-white uppercase tracking-widest mb-4 px-2">Vindeiras Regatas</h3>
      <div class="px-2">
        <p class="text-white/30 text-sm italic">Non hai eventos programados</p>
      </div>
    </div>
  `

  return aside
}
