export function renderFooter() {
  const footer = document.createElement('footer')
  footer.className = 'bg-gray-50 border-t border-gray-250 py-16 text-gray-600 relative overflow-hidden font-sans'
  footer.innerHTML = `
    <!-- Top divider line with a red accent block -->
    <div class="absolute top-0 left-0 w-full h-1 bg-gray-200">
      <div class="w-24 h-full bg-brand-red mx-auto"></div>
    </div>

    <div class="container mx-auto px-6 max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <!-- Col 1: Club info -->
        <div class="md:col-span-2 space-y-4">
          <div class="flex items-center gap-3">
            <img src="/logo.png" class="w-12 h-12 object-contain" alt="Logo" />
            <div>
              <p class="font-display text-lg font-black tracking-tight text-gray-900 leading-none">CP RIANXO</p>
              <p class="text-[9px] uppercase tracking-widest text-brand-red font-bold mt-1">Club de Piragüismo</p>
            </div>
          </div>
          <p class="text-xs text-gray-500 max-w-sm leading-relaxed">
            Fundado co obxectivo de impulsar a práctica do piragüismo na Ría de Arousa. Deporte, natureza e competición en Rianxo.
          </p>
          <div class="flex items-center gap-4 pt-2">
            <a href="https://www.instagram.com/club_piraguismo_rianxo/" target="_blank" class="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all shadow-sm cursor-pointer">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://www.facebook.com/club-de-piragüismo-rianxo" target="_blank" class="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all shadow-sm cursor-pointer">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
          </div>
        </div>

        <!-- Col 2: Navigation Links -->
        <div class="space-y-4">
          <h4 class="text-xs font-bold text-gray-900 uppercase tracking-widest">Navegación</h4>
          <ul class="space-y-2 text-xs font-semibold uppercase tracking-wider">
            <li><a href="/" class="hover:text-brand-red transition-colors">Inicio</a></li>
            <li><a href="/club" class="hover:text-brand-red transition-colors">O Club</a></li>
            <li><a href="/escola" class="hover:text-brand-red transition-colors">Escola</a></li>
            <li><a href="/galeria" class="hover:text-brand-red transition-colors">Galería</a></li>
            <li><a href="/patrocinadores" class="hover:text-brand-red transition-colors">Patrocinadores</a></li>
            <li><a href="/socios" class="hover:text-brand-red transition-colors font-bold text-brand-red">Faste Socio</a></li>
            <li><a href="/tenda" class="hover:text-brand-red transition-colors">Tenda</a></li>
          </ul>
        </div>

        <!-- Col 3: Contact & Legal -->
        <div class="space-y-4">
          <h4 class="text-xs font-bold text-gray-900 uppercase tracking-widest">Contacto</h4>
          <ul class="space-y-2 text-xs font-semibold text-gray-500">
            <li class="flex items-center gap-2">
              <svg class="w-4 h-4 text-brand-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <a href="tel:610903537" class="hover:text-brand-red transition-colors">610 903 537</a>
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-4 h-4 text-brand-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <a href="mailto:clubpiraguismorianxo@gmail.com" class="hover:text-brand-red transition-colors text-xs truncate">clubpiraguismorianxo@gmail.com</a>
            </li>
            <li class="border-t border-gray-200/50 pt-2 flex flex-col gap-2">
              <a href="#" onclick="window.showCookiePreferences(); return false;" class="hover:text-brand-red transition-colors font-bold uppercase text-[10px] tracking-widest">Configurar Cookies</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
        <p>© 2026 Club Piragüismo Rianxo. Todos os dereitos reservados.</p>
        <div class="flex gap-6 uppercase font-bold text-[10px] tracking-widest">
          <a href="/aviso-legal" class="hover:text-brand-red transition-colors">Aviso Legal</a>
          <a href="/politica-privacidade" class="hover:text-brand-red transition-colors">Privacidade</a>
          <a href="/politica-cookies" class="hover:text-brand-red transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  `
  return footer
}
