export function renderNavigation() {
  const nav = document.createElement('nav')
  nav.className = 'fixed top-0 left-0 w-full z-50 px-6 py-3 bg-brand-dark border-b border-white/5'
  nav.id = 'main-nav'

  nav.innerHTML = `
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="/" class="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" class="w-10 h-10 object-contain" />
        <span class="font-display text-xl font-bold tracking-tight hidden sm:block">CLUB PIRAGÜISMO RIANXO</span>
      </a>
      
      <div class="hidden md:flex items-center gap-8">
        <a href="/" class="nav-link font-medium">Inicio</a>
        
        <!-- Dropdown O Club -->
        <div class="relative group">
          <a href="/club" class="nav-link font-medium flex items-center gap-1 py-2">
            O Club
            <svg class="w-4 h-4 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </a>
          <div class="absolute top-full left-0 w-56 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
            <div class="bg-brand-dark border border-white/10 rounded-xl overflow-hidden">
              <a href="/club" class="block px-6 py-3 text-sm hover:bg-brand-red hover:text-white transition-colors">Quen Somos</a>
              <a href="/club" class="block px-6 py-3 text-sm hover:bg-brand-red hover:text-white transition-colors">Breve Historia</a>
              <a href="/club#club-detalles" class="block px-6 py-3 text-sm hover:bg-brand-red hover:text-white transition-colors">Corpo Técnico</a>
              <a href="/club#club-detalles" class="block px-6 py-3 text-sm hover:bg-brand-red hover:text-white transition-colors">Xunta Directiva</a>
              <a href="/club#club-detalles" class="block px-6 py-3 text-sm hover:bg-brand-red hover:text-white transition-colors">Palmarés</a>
              <a href="/club#club-detalles" class="block px-6 py-3 text-sm hover:bg-brand-red hover:text-white transition-colors font-bold text-brand-red hover:text-white">Faste Socio</a>
            </div>
          </div>
        </div>

        <a href="/calendario" class="nav-link font-medium">Calendario</a>
        <a href="/novas" class="nav-link font-medium">Novas</a>
        <a href="/tenda" class="nav-link font-medium">Tenda</a>
        <a href="/contacto" class="nav-link font-medium">Contacto</a>
      </div>

      <div class="flex items-center gap-4">
        <button class="md:hidden text-white p-3 -mr-3" id="mobile-menu-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- Premium Mobile Menu -->
    <div id="mobile-menu" class="fixed top-0 right-0 h-[100dvh] w-full bg-brand-dark z-50 flex flex-col transition-transform duration-500 transform translate-x-full border-l border-white/5">
      
      <!-- Mobile Menu Header -->
      <div class="p-6 flex items-center justify-between border-b border-white/10 shrink-0">
        <div class="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" class="w-10 h-10 object-contain" />
          <span class="font-display text-lg font-bold tracking-tight">CLUB PIRAGÜISMO</span>
        </div>
        <button class="text-white p-3 -mr-3 rounded-full hover:bg-white/10 transition-colors" id="close-menu-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
        </button>
      </div>

      <!-- Mobile Menu Content -->
      <div class="flex-1 overflow-y-auto p-8 flex flex-col gap-8 scrollbar-hide">
        <nav class="flex flex-col gap-6" id="mobile-nav-links">
          <a href="/" class="text-4xl font-display font-bold text-white hover:text-brand-red transition-all transform translate-y-4 opacity-0 mobile-nav-item mobile-nav-link block">Inicio</a>
          
          <div class="flex flex-col py-2 border-y border-white/10 transform translate-y-4 opacity-0 mobile-nav-item">
            <button id="mobile-club-toggle" class="flex items-center justify-between w-full text-left py-4">
              <span class="text-sm font-bold text-brand-red uppercase tracking-widest flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                O Club
              </span>
              <svg id="mobile-club-icon" class="w-5 h-5 text-brand-red transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div id="mobile-club-submenu" class="pl-6 flex flex-col gap-4 border-l-2 border-brand-red/30 ml-2 overflow-hidden max-h-0 transition-all duration-300">
              <div class="pb-4 pt-2 flex flex-col gap-4">
                <a href="/club" class="text-2xl font-display font-bold text-white/80 hover:text-white hover:translate-x-2 transition-all mobile-nav-link block">Quen Somos</a>
                <a href="/club#club-detalles" class="text-2xl font-display font-bold text-white/80 hover:text-white hover:translate-x-2 transition-all mobile-nav-link block">Xunta Directiva</a>
                <a href="/club#club-detalles" class="text-2xl font-display font-bold text-white/80 hover:text-white hover:translate-x-2 transition-all mobile-nav-link block">Corpo Técnico</a>
              </div>
            </div>
          </div>
          
          <a href="/calendario" class="text-4xl font-display font-bold text-white hover:text-brand-red transition-all transform translate-y-4 opacity-0 mobile-nav-item mobile-nav-link block">Calendario</a>
          <a href="/novas" class="text-4xl font-display font-bold text-white hover:text-brand-red transition-all transform translate-y-4 opacity-0 mobile-nav-item mobile-nav-link block">Novas</a>
          <a href="/tenda" class="text-4xl font-display font-bold text-white hover:text-brand-red transition-all transform translate-y-4 opacity-0 mobile-nav-item mobile-nav-link block">Tenda</a>
          <a href="/contacto" class="text-4xl font-display font-bold text-white hover:text-brand-red transition-all transform translate-y-4 opacity-0 mobile-nav-item mobile-nav-link block">Contacto</a>
        </nav>
      </div>

      <div class="p-8 mt-auto border-t border-white/10 bg-black/20">
        <div class="flex justify-center gap-6">
          <a href="https://www.instagram.com/club_piraguismo_rianxo/" target="_blank" class="text-white/50 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://www.facebook.com/club-de-piragüismo-rianxo" target="_blank" class="text-white/50 hover:text-white transition-colors">
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
  }, 0)

  return nav
}
