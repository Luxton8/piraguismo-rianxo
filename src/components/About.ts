export function renderAbout() {
  const section = document.createElement('section')
  section.id = 'club'
  section.className = 'relative'

  section.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div class="relative pb-20 lg:pb-0">
          <div class="absolute -top-10 -left-10 w-64 h-64 bg-brand-red/10 rounded-full blur-[100px]"></div>
          <div class="relative z-10 glass-card p-2 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <img src="/images/marathon.png" class="rounded-xl w-full object-cover aspect-[4/3] shadow-2xl" alt="Club History" />
            
            <div class="absolute -bottom-6 right-2 sm:-right-6 md:-right-12 glass-card p-6 md:p-8 animate-fade-in-up border-brand-red/30 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <p class="text-4xl md:text-5xl font-display font-bold text-brand-red mb-1">40+</p>
              <p class="text-[10px] md:text-xs font-bold text-white/50 tracking-widest uppercase">Anos de historia</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 class="text-brand-red font-bold tracking-widest uppercase mb-4">Quen Somos</h2>
          <h3 class="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">MÁIS QUE UN CLUB, <br/>UNHA FAMILIA</h3>
          
          <div class="space-y-6 text-white/70 text-lg leading-relaxed">
            <p>
              Fundado coa pasión de levar o deporte náutico a cada rincón de Rianxo, o noso club medrou ata converterse nun referente do piragüismo galego.
            </p>
            <p>
              A nosa misión é fomentar o deporte base, a disciplina e o respecto polo medio mariño que nos rodea. Contamos con instalacións de primeiro nivel e un equipo técnico comprometido coa excelencia.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-8 mt-12">
            <div>
              <p class="text-3xl font-display font-bold mb-2">150+</p>
              <p class="text-sm font-bold text-white/40 uppercase tracking-wider">Deportistas activos</p>
            </div>
            <div>
              <p class="text-3xl font-display font-bold mb-2">15+</p>
              <p class="text-sm font-bold text-white/40 uppercase tracking-wider">Adestradores titulados</p>
            </div>
          </div>
        </div>
      </div>
  `

  return section
}
