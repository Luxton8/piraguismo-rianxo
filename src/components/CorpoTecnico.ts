export function renderCorpoTecnico() {
  const section = document.createElement('div')
  section.id = 'tecnico'
  section.className = 'animate-fade-in-up text-gray-800 font-sans'

  section.innerHTML = `
    <div class="space-y-4 mb-8">
      <span class="text-[10px] font-black text-brand-red uppercase tracking-widest">Preparación e Liderado</span>
      <h2 class="text-3xl md:text-5xl font-display font-black tracking-tight text-gray-900 uppercase">Corpo Técnico</h2>
    </div>
    
    <div class="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 mb-12 shadow-sm">
      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Profile Column -->
        <div class="w-full lg:w-80 shrink-0 space-y-6">
          <div class="bg-gray-50 border border-gray-200 p-3 rounded-2xl">
            <img src="/images/sprint.png" loading="lazy" decoding="async" class="w-full rounded-xl aspect-[3/4] object-cover" alt="José Manuel Vázquez Navia" />
          </div>
          
          <div class="p-5 bg-gray-50 rounded-2xl border border-gray-200">
            <p class="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">Contacto Directo</p>
            <p class="font-bold text-brand-red text-sm break-all">tecnico@piraguismorianxo.com</p>
          </div>
        </div>

        <!-- Bio Column -->
        <div class="flex-1 space-y-8">
          <div>
            <span class="text-[10px] font-black text-brand-red uppercase tracking-widest">Responsable Técnico</span>
            <h3 class="text-3xl font-display font-black text-gray-900 mt-1">José Manuel Vázquez Navia</h3>
            <p class="text-gray-400 font-semibold uppercase tracking-wider text-xs mt-1">Adestrador de Alto Rendemento</p>
          </div>
          
          <div class="space-y-4 text-gray-500 text-sm sm:text-base leading-relaxed">
            <p>José Manuel leva vinculado ao club dende a súa refundación no ano 1995, por aquel entón como deportista e posteriormente como técnico.</p>
            <p>Foi o primer deportista del club en lograr un podio no ano 1995. Como técnico estivo á fronte durante unha tempada do equipo nacional canoa sub23 (2010), así como no C.G.T.D.</p>
          </div>
          
          <div class="pt-8 border-t border-gray-150">
            <h4 class="text-gray-900 font-bold mb-6 uppercase text-xs tracking-widest flex items-center gap-2">
              <span class="w-6 h-px bg-brand-red"></span>
              Traxectoria Internacional
            </h4>
            <ul class="space-y-4 text-xs sm:text-sm">
              ${[
                'CAMPEONATO EUROPA JUNIOR 2009 (Poznan Polonia) - equipo nacional damas Junior',
                'CAMPEONATO EUROPA ABSOLUTO 2012 (Trasona Asturias) - equipo nacional absoluto canoa.',
                'CAMPEONATO DO MUNDO ABSOLUTO 2010 (Poznan Polonia) C2 200 metros.',
                'CAMPEONATO EUROPA JUNIOR Y SUB23 2013 (Poznan Polonia)',
                'Técnico no Campionato de Europa Junior e Sub23 2015 (Romanía)',
                'Técnico no Campionato do Mundo Junior e Sub23 2016 (Minsk - Bielorusia)'
              ].map((item, i) => `
                <li class="flex items-start gap-4 group">
                  <span class="w-6 h-6 rounded-full bg-brand-red/5 border border-brand-red/10 text-brand-red font-display font-bold text-xs flex items-center justify-center shrink-0 pt-0.5">0${i + 1}</span>
                  <span class="text-gray-500 group-hover:text-gray-900 transition-colors leading-relaxed font-semibold">${item}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <p class="text-xs text-gray-400 italic leading-relaxed pt-2">
            Das súas mans saíron deportistas tan destacados como Paulino Otero, David Maquieira, Lúa Cubiella, Borja Bejo, Manuel Fontan ou Maria Perez.
          </p>
        </div>
      </div>
    </div>
  `

  return section
}
