export function renderContact() {
  const section = document.createElement('section')
  section.id = 'contacto'
  section.className = 'py-32 bg-brand-dark'

  section.innerHTML = `
    <div class="container mx-auto px-6">
      <div class="glass-card overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="p-8 md:p-12 lg:p-20">
            <h2 class="text-brand-red font-bold tracking-widest uppercase mb-4">Contacto</h2>
            <h3 class="text-4xl md:text-5xl font-display font-bold mb-8">TES ALGUNHA DÚBIDA?</h3>
            <p class="text-white/60 text-lg mb-12">
              Estamos aquí para axudarche. Escríbenos e responderémosche o antes posible.
            </p>

            <form class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-bold text-white/40 uppercase mb-2">Nome</label>
                  <input type="text" class="w-full bg-brand-grey border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red transition-colors" placeholder="O teu nome" />
                </div>
                <div>
                  <label class="block text-sm font-bold text-white/40 uppercase mb-2">Email</label>
                  <input type="email" class="w-full bg-brand-grey border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red transition-colors" placeholder="ti@email.com" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-bold text-white/40 uppercase mb-2">Asunto</label>
                <select class="w-full bg-brand-grey border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red transition-colors appearance-none">
                  <option>Información xeral</option>
                  <option>Inscricións</option>
                  <option>Eventos</option>
                  <option>Outros</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-bold text-white/40 uppercase mb-2">Mensaxe</label>
                <textarea class="w-full bg-brand-grey border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red transition-colors h-32 resize-none" placeholder="Como podemos axudarche?"></textarea>
              </div>
              <button type="submit" class="btn-primary w-full py-4 text-lg">Enviar mensaxe</button>
            </form>
          </div>

          <div class="relative min-h-[500px] bg-brand-grey/50">
            <!-- Information Panel -->
            <div class="absolute inset-0 flex flex-col justify-center p-8 md:p-12 text-left">
              <h4 class="text-2xl font-display font-bold mb-8 text-brand-red uppercase tracking-tight">Datos de contacto</h4>
              
              <div class="space-y-8">
                <!-- Address -->
                <div class="flex gap-4">
                  <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <p class="font-bold text-white mb-1">Localización</p>
                    <p class="text-white/60">Paseo do Porto, s/n<br/>15920 - Rianxo (A Coruña)</p>
                  </div>
                </div>

                <!-- Schedule -->
                <div class="flex gap-4">
                  <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <p class="font-bold text-white mb-1">Horario de inverno</p>
                    <p class="text-sm text-white/60">Luns a Venres: 17:30 - 19:00<br/>Sábado: 10:30 - 12:30</p>
                    <p class="font-bold text-white mb-1 mt-3">Horario de verán</p>
                    <p class="text-sm text-white/60">Luns a Sábado: 11:00 - 13:00 / 16:30 - 19:30</p>
                  </div>
                </div>

                <!-- Phone & Email -->
                <div class="flex flex-col gap-4">
                  <a href="tel:610903537" class="flex items-center gap-4 group">
                    <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-red/20 transition-colors">
                      <svg class="w-5 h-5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    </div>
                    <span class="font-bold text-white group-hover:text-brand-red transition-colors">610 903 537</span>
                  </a>
                  <a href="mailto:clubpiraguismorianxo@gmail.com" class="flex items-center gap-4 group">
                    <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-red/20 transition-colors">
                      <svg class="w-5 h-5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <span class="font-bold text-white group-hover:text-brand-red transition-colors text-sm break-all">clubpiraguismorianxo@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `

  return section
}
