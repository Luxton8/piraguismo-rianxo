export function renderAbout() {
  const section = document.createElement('section')
  section.id = 'club'
  section.className = 'relative text-gray-800 font-sans'

  section.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <!-- Left: Image Stack with frame accents -->
        <div class="lg:col-span-6 relative pb-10 lg:pb-0">
          <div class="absolute -top-6 -left-6 w-32 h-32 bg-brand-red/5 rounded-full blur-2xl z-0"></div>
          
          <!-- Structured Image Frame (as seen in references) -->
          <div class="relative z-10 p-3 bg-white border border-gray-200 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <img src="/images/marathon.png" loading="lazy" decoding="async" class="rounded-2xl w-full object-cover aspect-[4/3]" alt="Club History" />
            
            <!-- Absolute badge with high contrast -->
            <div class="absolute -bottom-6 -right-6 bg-white border border-gray-200 p-6 shadow-2xl rounded-2xl animate-fade-in-up flex flex-col justify-center items-center">
              <span class="text-4xl sm:text-5xl font-display font-black text-brand-red leading-none">40+</span>
              <span class="text-[9px] font-black text-gray-400 tracking-widest uppercase mt-2">Anos de historia</span>
            </div>
          </div>
        </div>
        
        <!-- Right: Text Content & Stats -->
        <div class="lg:col-span-6 space-y-6">
          <div class="space-y-2">
            <span class="text-[10px] font-black text-brand-red uppercase tracking-widest">O noso legado</span>
            <h2 class="text-4xl sm:text-5xl font-display font-black tracking-tight leading-tight text-gray-900">Máis que un club,<br/>unha gran familia</h2>
          </div>
          
          <div class="space-y-4 text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
            <p>
              Fundado coa paixón de levar o deporte náutico a cada rincón de Rianxo, o noso club medrou ata converterse nun referente do piragüismo galego.
            </p>
            <p>
              A nosa misión é fomentar o deporte base, a disciplina e o respecto polo medio mariño que nos rodea. Contamos con instalacións de primeiro nivel e un equipo técnico comprometido coa excelencia.
            </p>
          </div>

          <!-- ClubStats component -->
          <div class="grid grid-cols-2 gap-4 pt-6">
            <div class="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
              <p class="text-3xl font-display font-black text-gray-950">150+</p>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Deportistas activos</p>
            </div>
            <div class="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
              <p class="text-3xl font-display font-black text-gray-950">15+</p>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Adestradores</p>
            </div>
          </div>
        </div>
      </div>
  `

  return section
}
