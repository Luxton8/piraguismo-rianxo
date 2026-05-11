export function renderHero() {
  const section = document.createElement('section')
  section.id = 'inicio'
  section.className = 'relative min-h-screen flex items-center justify-center overflow-hidden pt-20'

  section.innerHTML = `
    <!-- Background Elements -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-brand-dark/60 to-brand-dark z-10"></div>
      <img src="/images/hero.png" class="w-full h-full object-cover scale-110 animate-slow-zoom" alt="Canoeing Background" />
    </div>

    <div class="container mx-auto px-6 relative z-20 text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm font-bold mb-6 animate-fade-in-down">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
        </span>
        INSCRICIÓNS ABERTAS 2026
      </div>
      
      <h1 class="text-6xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tighter mb-8 leading-tight">
        PASIÓN POLO <br/>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-400">PIRAGÜISMO</span>
      </h1>
      
      <p class="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 font-medium leading-relaxed animate-fade-in-up">
        Descubre o deporte náutico por excelencia en Rianxo. Escola de campións, natureza e competición na Ría de Arousa.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style="animation-delay: 0.2s">
        <a href="#club" class="btn-primary text-lg px-8 py-4">Coñece o Club</a>
        <a href="#contacto" class="group flex items-center gap-2 text-lg font-bold hover:text-brand-red transition-all">
          Comeza hoxe 
          <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </a>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
      <span class="text-xs font-bold tracking-widest uppercase">Scroll</span>
      <div class="w-0.5 h-12 bg-gradient-to-b from-brand-red to-transparent"></div>
    </div>
  `

  return section
}
