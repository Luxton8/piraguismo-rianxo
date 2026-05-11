export function renderNavigation() {
  const nav = document.createElement('nav')
  nav.className = 'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4'
  nav.id = 'main-nav'

  nav.innerHTML = `
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="#" class="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" class="w-10 h-10 object-contain" />
        <span class="font-display text-xl font-bold tracking-tight hidden sm:block">CP RIANXO</span>
      </a>
      
      <div class="hidden md:flex items-center gap-8">
        <a href="/" class="nav-link font-medium">Inicio</a>
        
        <!-- Dropdown O Club -->
        <div class="relative group">
          <a href="/club.html" class="nav-link font-medium flex items-center gap-1 py-2">
            O Club
            <svg class="w-4 h-4 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </a>
          <div class="absolute top-full left-0 w-56 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
            <div class="bg-brand-grey border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl">
              <a href="/club.html" class="block px-6 py-3 text-sm hover:bg-brand-red hover:text-white transition-colors">Quen Somos</a>
              <a href="/club.html" class="block px-6 py-3 text-sm hover:bg-brand-red hover:text-white transition-colors">Breve Historia</a>
              <a href="/club.html#club-detalles" class="block px-6 py-3 text-sm hover:bg-brand-red hover:text-white transition-colors">Corpo Técnico</a>
              <a href="/club.html#club-detalles" class="block px-6 py-3 text-sm hover:bg-brand-red hover:text-white transition-colors">Xunta Directiva</a>
              <a href="/club.html#club-detalles" class="block px-6 py-3 text-sm hover:bg-brand-red hover:text-white transition-colors">Palmarés</a>
              <a href="/club.html#club-detalles" class="block px-6 py-3 text-sm hover:bg-brand-red hover:text-white transition-colors font-bold text-brand-red hover:text-white">Faste Socio</a>
            </div>
          </div>
        </div>

        <a href="/disciplinas.html" class="nav-link font-medium">Disciplinas</a>
        <a href="/novas.html" class="nav-link font-medium">Novas</a>
        <a href="/contacto.html" class="nav-link font-medium">Contacto</a>
      </div>

      <div class="flex items-center gap-4">
        <button class="btn-primary py-2 px-5 text-sm">Únete</button>
        <button class="md:hidden text-white p-2" id="mobile-menu-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="fixed inset-0 bg-brand-dark/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center gap-8 transition-all duration-500 opacity-0 pointer-events-none">
      <button class="absolute top-6 right-6 text-white" id="close-menu-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
      </button>
      <a href="/" class="text-3xl font-display font-bold hover:text-brand-red transition-colors mobile-nav-link">Inicio</a>
      <div class="flex flex-col items-center gap-4">
        <span class="text-xs font-bold text-brand-red uppercase tracking-widest">O Club</span>
        <a href="/club.html" class="text-2xl font-display font-bold hover:text-brand-red transition-colors mobile-nav-link">Quen Somos</a>
        <a href="/club.html#club-detalles" class="text-2xl font-display font-bold hover:text-brand-red transition-colors mobile-nav-link text-white/50">Xunta Directiva</a>
      </div>
      <a href="/disciplinas.html" class="text-3xl font-display font-bold hover:text-brand-red transition-colors mobile-nav-link">Disciplinas</a>
      <a href="/novas.html" class="text-3xl font-display font-bold hover:text-brand-red transition-colors mobile-nav-link">Novas</a>
      <a href="/contacto.html" class="text-3xl font-display font-bold hover:text-brand-red transition-colors mobile-nav-link">Contacto</a>
    </div>
  `

  // Scroll listener for glassmorphism effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.classList.add('bg-brand-dark/80', 'backdrop-blur-lg', 'border-b', 'border-white/10', 'py-3')
      nav.classList.remove('py-4')
    } else {
      nav.classList.remove('bg-brand-dark/80', 'backdrop-blur-lg', 'border-b', 'border-white/10', 'py-3')
      nav.classList.add('py-4')
    }
  })

  // Mobile menu logic
  setTimeout(() => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn')
    const closeMenuBtn = document.getElementById('close-menu-btn')
    const mobileMenu = document.getElementById('mobile-menu')
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link')

    const toggleMenu = (open: boolean) => {
      if (open) {
        mobileMenu?.classList.remove('opacity-0', 'pointer-events-none')
        mobileMenu?.classList.add('opacity-100')
      } else {
        mobileMenu?.classList.add('opacity-0', 'pointer-events-none')
        mobileMenu?.classList.remove('opacity-100')
      }
    }

    mobileMenuBtn?.addEventListener('click', () => toggleMenu(true))
    closeMenuBtn?.addEventListener('click', () => toggleMenu(false))
    mobileNavLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)))
  }, 0)

  return nav
}
