export function renderHero() {
  const section = document.createElement('section')
  section.id = 'inicio'
  section.className = 'relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-white grid-overlay font-sans'

  section.innerHTML = `
    <!-- Asymmetric Two-Column Content Grid -->
    <div class="container mx-auto px-6 max-w-7xl relative z-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- Left: Text Hierarchies -->
        <div class="lg:col-span-7 space-y-8 text-left animate-fade-in-up">
          <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-red/5 border border-brand-red/10 text-brand-red text-xs font-black tracking-widest uppercase">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
            </span>
            Inscricións abertas 2026
          </div>
          
          <h1 class="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight leading-[1.05] text-gray-900">
            Marea Vermella <br/>
            <span class="text-brand-red">de Rianxo</span>
          </h1>
          
          <p class="text-base sm:text-lg text-gray-600 max-w-xl font-medium leading-relaxed">
            Escola deportiva de piragüismo histórico na Ría de Arousa. Valores de esforzo, natureza e piragüismo de alto nivel dende Rianxo para o mundo.
          </p>

          <div class="flex flex-col sm:flex-row items-center gap-4 w-full sm:max-w-md">
            <a href="/club" class="btn-primary text-sm uppercase tracking-wider py-4 px-8 w-full sm:w-auto text-center shadow-lg">Coñece o Club</a>
            <a href="/contacto" class="group flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-800 hover:text-brand-red transition-all w-full sm:w-auto py-4 cursor-pointer">
              Faste palista
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
          </div>
        </div>

        <!-- Right: Decorative Circular/framed composition -->
        <div class="lg:col-span-5 relative flex justify-center items-center">
          <div class="absolute -inset-4 bg-brand-red/[0.02] rounded-full blur-3xl z-0"></div>
          
          <!-- Framed Image Composition (RianxoIllustration / ClubSectionCard aspect) -->
          <div class="relative w-80 sm:w-96 aspect-square rounded-full border-4 border-gray-100 shadow-2xl overflow-hidden z-10 animate-slow-zoom">
            <img src="/images/hero.png" class="w-full h-full object-cover" alt="CP Rianxo Palistas" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>
          
          <!-- Decorative circular shield frame -->
          <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-full border border-gray-150 p-4 shadow-xl z-20 hidden sm:flex items-center justify-center">
            <img src="/logo.png" class="w-20 h-20 object-contain" alt="CP Rianxo Shield" />
          </div>
        </div>

      </div>
    </div>

    <!-- Wave Divider decoration at the bottom -->
    <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-px">
      <svg class="relative block w-full h-12 text-white fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
      </svg>
    </div>
  `

  return section
}
