export function renderSidebarNav(activeId: string) {
  const aside = document.createElement('aside')
  aside.className = 'w-full lg:w-80 shrink-0'

  const items = [
    { id: 'quensomos', label: 'Quen Somos', href: '/club.html' },
    { id: 'historia', label: 'Breve Historia', href: '/club.html#historia' },
    { id: 'tecnico', label: 'Corpo Técnico', href: '/club.html#tecnico' },
    { id: 'xunta', label: 'Xunta Directiva', href: '/club.html#xunta' },
    { id: 'socios', label: 'Socios', href: '/club.html#socios' },
    { id: 'palmares', label: 'Palmarés', href: '/club.html#palmares' },
    { id: 'equipos', label: 'Equipos', href: '/club.html#equipos' },
    { id: 'destacados', label: 'Deportistas Destacados', href: '/club.html#destacados' },
  ]

  aside.innerHTML = `
    <div class="glass-card p-6 sticky top-28">
      <h3 class="text-xs font-bold text-brand-red uppercase tracking-widest mb-8 px-2">Club Piragüismo Rianxo</h3>
      <nav class="flex flex-col gap-1">
        ${items.map(item => `
          <a href="${item.href}" class="px-4 py-3 rounded-xl text-sm font-medium transition-all ${item.id === activeId ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20' : 'text-white/50 hover:bg-white/5 hover:text-white'}">
            ${item.label}
          </a>
        `).join('')}
      </nav>
    </div>

    <div class="glass-card p-6 mt-6">
      <h3 class="text-xs font-bold text-white uppercase tracking-widest mb-4 px-2">Vindeiras Regatas</h3>
      <div class="px-2">
        <p class="text-white/30 text-sm italic">Non hai eventos programados</p>
      </div>
    </div>
  `

  return aside
}
