export function renderSidebarNav(activeId: string) {
  const aside = document.createElement('aside')
  aside.className = 'w-full lg:w-80 shrink-0 font-sans'

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
    <div class="bg-white border border-gray-200 rounded-3xl p-6 sticky top-28 z-40 shadow-sm">
      <span class="text-[9px] font-black text-brand-red uppercase tracking-widest block mb-4 px-2">Club Piragüismo Rianxo</span>
      <nav class="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-1 pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        ${items.map(item => `
          <a href="${item.href}" class="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${item.id === activeId ? 'bg-brand-red text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}">
            ${item.label}
          </a>
        `).join('')}
      </nav>
    </div>

    <div class="bg-white border border-gray-200 rounded-3xl p-6 mt-6 hidden lg:block shadow-sm">
      <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-4 px-2">Vindeiras Regatas</span>
      <div class="px-2">
        <p class="text-gray-400 text-xs italic">Non hai eventos programados</p>
      </div>
    </div>
  `

  return aside
}
