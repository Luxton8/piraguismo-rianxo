export function renderCorpoTecnico() {
  const section = document.createElement('div')
  section.id = 'tecnico'
  section.className = 'animate-fade-in-up'

  section.innerHTML = `
    <h1 class="text-4xl md:text-6xl font-display font-bold mb-12 uppercase tracking-tighter">Corpo Técnico</h1>
    
    <div class="glass-card p-10 mb-12">
      <p class="text-brand-red font-bold uppercase tracking-widest text-xs mb-4">Responsable técnico</p>
      <div class="flex flex-col md:flex-row gap-12">
        <div class="w-full md:w-72 shrink-0">
          <div class="glass-card p-2 transform -rotate-3 transition-transform hover:rotate-0 duration-500">
            <img src="/images/sprint.png" class="w-full rounded-xl aspect-[3/4] object-cover shadow-2xl" alt="José Manuel Vázquez Navia" />
          </div>
          <div class="mt-8 space-y-4">
             <div class="p-4 bg-white/5 rounded-xl border border-white/10">
                <p class="text-[10px] uppercase tracking-widest text-white/40 mb-1">Contacto Directo</p>
                <p class="font-bold text-brand-red break-all">tecnico@piraguismorianxo.com</p>
             </div>
          </div>
        </div>
        <div class="flex-1">
          <h2 class="text-4xl font-display font-bold mb-2">José Manuel Vázquez Navia</h2>
          <p class="text-white/40 font-medium mb-8 uppercase tracking-widest text-sm">Adestrador de Alto Rendemento</p>
          
          <div class="space-y-6 text-white/70 leading-relaxed text-lg mb-12">
            <p>José Manuel leva vinculado ao club dende a súa refundación no ano 1995, por aquel entón como deportista e posteriormente como técnico.</p>
            <p>Foi o primeiro deportista do club en lograr un podio no ano 1995. Como técnico estivo á fronte durante unha tempada do equipo nacional canoa sub23 (2010), así como no C.G.T.D.</p>
          </div>
          
          <div class="pt-8 border-t border-white/10">
            <h3 class="text-white font-bold mb-6 uppercase text-sm tracking-widest flex items-center gap-2">
              <span class="w-8 h-px bg-brand-red"></span>
              Traxectoria Internacional
            </h3>
            <ul class="space-y-4">
              ${[
                'CAMPEONATO EUROPA JUNIOR 2009 (Poznan Polonia) - equipo nacional damas Junior',
                'CAMPEONATO EUROPA ABSOLUTO 2012 (Trasona Asturias) - equipo nacional absoluto canoa.',
                'CAMPEONATO DO MUNDO ABSOLUTO 2010 (Poznan Polonia) C2 200 metros.',
                'CAMPEONATO EUROPA JUNIOR Y SUB23 2013 (Poznan Polonia)',
                'Técnico no Campionato de Europa Junior e Sub23 2015 (Romanía)',
                'Técnico no Campionato do Mundo Junior e Sub23 2016 (Minsk - Bielorusia)'
              ].map((item, i) => `
                <li class="flex items-start gap-4 group">
                  <span class="text-brand-red font-display font-bold text-lg leading-none pt-1">0${i + 1}</span>
                  <span class="text-white/60 group-hover:text-white transition-colors">${item}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <p class="mt-12 text-sm text-white/40 italic leading-relaxed">
            Das súas mans saíron deportistas tan destacados como Paulino Otero, David Maquieira, Lúa Cubiella, Borja Bejo, Manuel Fontan ou Maria Perez.
          </p>
        </div>
      </div>
    </div>
  `

  return section
}
