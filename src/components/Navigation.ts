import { setupCookieConsentGlobal, checkAndShowBanner, renderCookieFloatingButton } from '../utils/cookieManager'

export function renderNavigation() {
  const nav = document.createElement('nav')
  nav.className = 'fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md transition-all duration-300'
  nav.id = 'main-nav'

  nav.innerHTML = `
    <!-- Top red bar -->
    <div class="h-1.5 w-full bg-brand-red"></div>
    
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
      <!-- Left: Brand / Logo -->
      <a href="/" class="flex items-center gap-4 group z-10">
        <div class="relative bg-white p-3 rounded-full border border-gray-150 shadow-md hanging-logo -mt-6">
          <img src="/logo.png" alt="Logo" class="w-16 h-16 object-contain" />
        </div>
        <div class="flex flex-col justify-center">
          <span class="font-display text-2xl font-black tracking-tight text-gray-900 group-hover:text-brand-red transition-colors leading-none">CP RIANXO</span>
          <span class="text-[9px] uppercase tracking-widest text-brand-red font-bold mt-1">Club de Piragüismo</span>
        </div>
      </a>
      
      <!-- Center: Navigation Links -->
      <div class="hidden md:flex items-center gap-8 font-sans">
        <a href="/" class="nav-link text-sm font-bold uppercase tracking-wider py-2">Inicio</a>
        
        <!-- Dropdown O Club -->
        <div class="relative group">
          <a href="/club" class="nav-link text-sm font-bold uppercase tracking-wider flex items-center gap-1 py-2 cursor-pointer">
            O Club
            <svg class="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </a>
          <div class="absolute top-full left-0 w-60 pt-3 opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
            <div class="bg-white border border-gray-200 shadow-2xl rounded-2xl p-2">
              <a href="/club" class="block px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-brand-red/5 hover:text-brand-red rounded-xl transition-all">Quen Somos</a>
              <a href="/escola" class="block px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-brand-red/5 hover:text-brand-red rounded-xl transition-all">Escola Deportiva</a>
              <a href="/galeria" class="block px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-brand-red/5 hover:text-brand-red rounded-xl transition-all">Galería Fotográfica</a>
              <a href="/patrocinadores" class="block px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-brand-red/5 hover:text-brand-red rounded-xl transition-all">Patrocinadores</a>
              <div class="border-t border-gray-100 my-2"></div>
              <a href="/socios" class="block px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-brand-red hover:bg-red-700 text-center rounded-xl transition-all shadow-md">Faste Socio</a>
            </div>
          </div>
        </div>

        <a href="/calendario" class="nav-link text-sm font-bold uppercase tracking-wider py-2">Calendario</a>
        <a href="/novas" class="nav-link text-sm font-bold uppercase tracking-wider py-2">Novas</a>
        <a href="/tenda" class="nav-link text-sm font-bold uppercase tracking-wider py-2">Tenda</a>
        <a href="/contacto" class="nav-link text-sm font-bold uppercase tracking-wider py-2">Contacto</a>
      </div>

      <!-- Right: Mobile CTA Trigger & Search -->
      <div class="flex items-center gap-4 z-10">
        <!-- Global Search Input -->
        <div class="relative hidden sm:block">
          <input type="text" id="global-search-input" onkeyup="window.triggerGlobalSearch(event)" class="bg-gray-50 border border-gray-250 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-brand-red transition-all w-40 focus:w-56" placeholder="Buscar..." />
          <div id="search-results-dropdown" class="absolute top-full right-0 w-80 bg-white border border-gray-200 shadow-2xl rounded-2xl p-4 mt-2 hidden max-h-80 overflow-y-auto space-y-3 z-50"></div>
        </div>

        <button class="md:hidden text-gray-800 p-2 hover:bg-gray-50 rounded-full border border-gray-200 transition-all cursor-pointer" id="mobile-menu-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="6" x2="6"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- Premium Mobile Menu -->
    <div id="mobile-menu" class="fixed top-0 right-0 h-[100dvh] w-full bg-white z-50 flex flex-col transition-transform duration-500 transform translate-x-full border-l border-gray-200 shadow-2xl">
      
      <!-- Mobile Menu Header -->
      <div class="p-6 flex items-center justify-between border-b border-gray-100 shrink-0">
        <div class="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" class="w-12 h-12 object-contain" />
          <div class="flex flex-col">
            <span class="font-display text-lg font-bold tracking-tight text-gray-900 leading-none">CP RIANXO</span>
            <span class="text-[9px] uppercase tracking-widest text-brand-red font-bold mt-1">Club de Piragüismo</span>
          </div>
        </div>
        <button class="text-gray-800 p-3 -mr-3 rounded-full hover:bg-gray-100 transition-colors cursor-pointer" id="close-menu-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
        </button>
      </div>

      <!-- Mobile Menu Content -->
      <div class="flex-1 overflow-y-auto p-8 flex flex-col gap-8 scrollbar-hide">
        <nav class="flex flex-col gap-6" id="mobile-nav-links">
          <a href="/" class="text-4xl font-display font-bold text-gray-800 hover:text-brand-red transition-all transform translate-y-4 opacity-0 mobile-nav-item mobile-nav-link block">Inicio</a>
          
          <div class="flex flex-col py-2 border-y border-gray-100 transform translate-y-4 opacity-0 mobile-nav-item">
            <button id="mobile-club-toggle" class="flex items-center justify-between w-full text-left py-4">
              <span class="text-sm font-bold text-brand-red uppercase tracking-widest flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                O Club
              </span>
              <svg id="mobile-club-icon" class="w-5 h-5 text-brand-red transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div id="mobile-club-submenu" class="pl-6 flex flex-col gap-4 border-l-2 border-brand-red/30 ml-2 overflow-hidden max-h-0 transition-all duration-300">
              <div class="pb-4 pt-2 flex flex-col gap-4">
                <a href="/club" class="text-2xl font-display font-bold text-gray-700 hover:text-brand-red hover:translate-x-2 transition-all mobile-nav-link block">Quen Somos</a>
                <a href="/escola" class="text-2xl font-display font-bold text-gray-700 hover:text-brand-red hover:translate-x-2 transition-all mobile-nav-link block">Escola Deportiva</a>
                <a href="/galeria" class="text-2xl font-display font-bold text-gray-700 hover:text-brand-red hover:translate-x-2 transition-all mobile-nav-link block">Galería</a>
                <a href="/patrocinadores" class="text-2xl font-display font-bold text-gray-700 hover:text-brand-red hover:translate-x-2 transition-all mobile-nav-link block">Patrocinadores</a>
                <a href="/socios" class="text-2xl font-display font-bold text-gray-700 hover:text-brand-red hover:translate-x-2 transition-all mobile-nav-link block">Faste Socio</a>
              </div>
            </div>
          </div>
          
          <a href="/calendario" class="text-4xl font-display font-bold text-gray-800 hover:text-brand-red transition-all transform translate-y-4 opacity-0 mobile-nav-item mobile-nav-link block">Calendario</a>
          <a href="/novas" class="text-4xl font-display font-bold text-gray-800 hover:text-brand-red transition-all transform translate-y-4 opacity-0 mobile-nav-item mobile-nav-link block">Novas</a>
          <a href="/tenda" class="text-4xl font-display font-bold text-gray-800 hover:text-brand-red transition-all transform translate-y-4 opacity-0 mobile-nav-item mobile-nav-link block">Tenda</a>
          <a href="/contacto" class="text-4xl font-display font-bold text-gray-800 hover:text-brand-red transition-all transform translate-y-4 opacity-0 mobile-nav-item mobile-nav-link block">Contacto</a>
        </nav>
      </div>

      <div class="p-8 mt-auto border-t border-gray-100 bg-gray-50">
        <div class="flex justify-center gap-6">
          <a href="https://www.instagram.com/club_piraguismo_rianxo/" target="_blank" class="text-gray-400 hover:text-brand-red transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://www.facebook.com/club-de-piragüismo-rianxo" target="_blank" class="text-gray-400 hover:text-brand-red transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
          </a>
        </div>
      </div>
    </div>
  `



  // Mobile menu logic
  setTimeout(() => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn')
    const closeMenuBtn = document.getElementById('close-menu-btn')
    const mobileMenu = document.getElementById('mobile-menu')
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link')

    const toggleMenu = (open: boolean) => {
      const items = document.querySelectorAll('.mobile-nav-item')
      
      if (open) {
        mobileMenu?.classList.remove('translate-x-full')
        document.body.style.overflow = 'hidden'
        
        // Staggered animation for links
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.remove('translate-y-4', 'opacity-0')
            item.classList.add('translate-y-0', 'opacity-100')
          }, 150 + (index * 75))
        })
      } else {
        mobileMenu?.classList.add('translate-x-full')
        document.body.style.overflow = ''
        
        // Reset animations instantly when closing
        items.forEach(item => {
          item.classList.add('translate-y-4', 'opacity-0')
          item.classList.remove('translate-y-0', 'opacity-100')
        })
      }
    }

    // Accordion logic for 'O Club'
    const clubToggle = document.getElementById('mobile-club-toggle')
    const clubSubmenu = document.getElementById('mobile-club-submenu')
    const clubIcon = document.getElementById('mobile-club-icon')
    
    let isSubmenuOpen = false
    clubToggle?.addEventListener('click', () => {
      isSubmenuOpen = !isSubmenuOpen
      if(isSubmenuOpen) {
        clubSubmenu!.style.maxHeight = clubSubmenu!.scrollHeight + 'px'
        clubIcon!.classList.add('rotate-180')
      } else {
        clubSubmenu!.style.maxHeight = '0px'
        clubIcon!.classList.remove('rotate-180')
      }
    })

    mobileMenuBtn?.addEventListener('click', () => toggleMenu(true))
    closeMenuBtn?.addEventListener('click', () => toggleMenu(false))
    mobileNavLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)))

    // Global Search Keyup Handler
    ;(window as any).triggerGlobalSearch = (event: KeyboardEvent) => {
      const input = event.target as HTMLInputElement
      const query = input.value.trim().toLowerCase()
      const dropdown = document.getElementById('search-results-dropdown')
      if (!dropdown) return

      if (query.length < 2) {
        dropdown.classList.add('hidden')
        return
      }

      // Load products, news, events from database
      const products = JSON.parse(localStorage.getItem('admin_tenda_products') || '[]')
      const novas = JSON.parse(localStorage.getItem('admin_novas') || '[]')
      const eventsList = JSON.parse(localStorage.getItem('admin_calendario_events') || '[]')

      const matchedProducts = products.filter((p: any) => p.name.toLowerCase().includes(query))
      const matchedNovas = novas.filter((n: any) => n.title.toLowerCase().includes(query))
      const matchedEvents = eventsList.filter((e: any) => e.title.toLowerCase().includes(query))

      const hasResults = matchedProducts.length > 0 || matchedNovas.length > 0 || matchedEvents.length > 0
      
      if (!hasResults) {
        dropdown.innerHTML = `<p class="text-xs text-gray-400 italic">Non se atoparon resultados.</p>`
        dropdown.classList.remove('hidden')
        return
      }

      dropdown.innerHTML = `
        <div class="space-y-3 font-sans text-xs">
          ${matchedNovas.length > 0 ? `
            <div>
              <h5 class="font-bold text-[9px] text-brand-red uppercase tracking-wider mb-1">Novas</h5>
              <div class="space-y-1">
                ${matchedNovas.map((n: any) => `<a href="/novas" class="block font-semibold text-gray-700 hover:text-brand-red truncate">${n.title}</a>`).join('')}
              </div>
            </div>
          ` : ''}
          ${matchedProducts.length > 0 ? `
            <div>
              <h5 class="font-bold text-[9px] text-brand-red uppercase tracking-wider mb-1">Tenda</h5>
              <div class="space-y-1">
                ${matchedProducts.map((p: any) => `<a href="/tenda" class="block font-semibold text-gray-700 hover:text-brand-red truncate">${p.name}</a>`).join('')}
              </div>
            </div>
          ` : ''}
          ${matchedEvents.length > 0 ? `
            <div>
              <h5 class="font-bold text-[9px] text-brand-red uppercase tracking-wider mb-1">Calendario</h5>
              <div class="space-y-1">
                ${matchedEvents.map((ev: any) => `<a href="/calendario" class="block font-semibold text-gray-700 hover:text-brand-red truncate">${ev.title}</a>`).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `
      dropdown.classList.remove('hidden')
    }

    // Hide search dropdown on click outside
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (!target.closest('#global-search-input') && !target.closest('#search-results-dropdown')) {
        document.getElementById('search-results-dropdown')?.classList.add('hidden')
      }
    })

    // Initialize Cookie Consent System
    setupCookieConsentGlobal()
    checkAndShowBanner()
    renderCookieFloatingButton()
  }, 0)

  return nav
}
