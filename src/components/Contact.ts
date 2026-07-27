export function renderContact() {
  const section = document.createElement('section')
  section.id = 'contacto'
  section.className = 'py-32 bg-white text-gray-800 font-sans'

  section.innerHTML = `
    <div class="container mx-auto px-6 max-w-7xl">
      <div class="bg-white border border-gray-200 rounded-[2rem] shadow-sm overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-12">
          <!-- Left: Form -->
          <div class="p-8 sm:p-12 lg:col-span-7">
            <span class="text-[9px] font-black text-brand-red uppercase tracking-widest">Fálanos</span>
            <h3 class="text-3xl sm:text-5xl font-display font-black text-gray-900 mt-1 mb-4 uppercase">Contacto</h3>
            <p class="text-gray-500 text-xs sm:text-sm font-semibold mb-12">
              Estamos aquí para axudarche. Escríbenos e responderémosche o antes posible.
            </p>

            <form id="contact-form" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Nome</label>
                  <input type="text" id="contact-name" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" placeholder="O teu nome" />
                </div>
                <div>
                  <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Email</label>
                  <input type="email" id="contact-email" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" placeholder="ti@email.com" />
                </div>
              </div>
              <div>
                <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Asunto</label>
                <div class="relative">
                  <select id="contact-subject" class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all appearance-none cursor-pointer">
                    <option>Información xeral</option>
                    <option>Inscricións</option>
                    <option>Eventos</option>
                    <option>Outros</option>
                  </select>
                  <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Mensaxe</label>
                <textarea id="contact-message" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all h-32 resize-none" placeholder="Como podemos axudarche?"></textarea>
              </div>

              <!-- Honeypot Antispam -->
              <input type="text" id="contact-hp" class="hidden" style="display:none !important" autocomplete="off" />

              <!-- Math Challenge -->
              <div>
                <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Seguridade: Canto é 3 + 4?</label>
                <input type="number" id="contact-math" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" placeholder="Escribe o número" />
              </div>

              <!-- GDPR Compliance Checkboxes -->
              <div class="space-y-3 pt-2 text-xs font-semibold text-gray-500">
                <div class="flex items-start gap-2.5">
                  <input type="checkbox" id="contact-privacy-check" required class="w-4 h-4 text-brand-red rounded border-gray-300 focus:ring-brand-red cursor-pointer mt-0.5" />
                  <label for="contact-privacy-check" class="cursor-pointer select-none leading-relaxed">
                    Lin e acepto a <a href="/politica-privacidade" target="_blank" class="text-brand-red hover:underline font-bold">Política de Privacidade</a>.
                  </label>
                </div>
                <div class="flex items-start gap-2.5">
                  <input type="checkbox" id="contact-commercial-check" class="w-4 h-4 text-brand-red rounded border-gray-300 focus:ring-brand-red cursor-pointer mt-0.5" />
                  <label for="contact-commercial-check" class="cursor-pointer select-none leading-relaxed">
                    Acepto recibir información sobre actividades e novidades do club.
                  </label>
                </div>
              </div>

              <button type="submit" class="btn-primary w-full py-4 text-xs font-bold uppercase tracking-widest cursor-pointer shadow-md">Enviar mensaxe</button>
            </form>
          </div>

          <!-- Right: Information -->
          <div class="relative lg:col-span-5 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-150 p-8 sm:p-12 flex flex-col justify-center">
            <span class="text-[9px] font-black text-brand-red uppercase tracking-widest">Información</span>
            <h4 class="text-2xl font-display font-black text-gray-900 mt-1 mb-8 uppercase">Datos de contacto</h4>
            
            <div class="space-y-6">
              <!-- Address -->
              <div class="flex gap-4">
                <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
                  <svg class="w-4.5 h-4.5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <p class="font-bold text-xs text-gray-900 uppercase tracking-wider">Localización</p>
                  <p class="text-xs text-gray-500 font-semibold mt-1 leading-relaxed">Paseo do Porto, s/n<br/>15920 - Rianxo (A Coruña)</p>
                </div>
              </div>

              <!-- Schedule -->
              <div class="flex gap-4">
                <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
                  <svg class="w-4.5 h-4.5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <p class="font-bold text-xs text-gray-900 uppercase tracking-wider">Horario de inverno</p>
                  <p class="text-[11px] text-gray-500 font-semibold mt-1">Luns a Venres: 17:30 - 19:00 | Sábado: 10:30 - 12:30</p>
                  <p class="font-bold text-xs text-gray-900 uppercase tracking-wider mt-3">Horario de verán</p>
                  <p class="text-[11px] text-gray-500 font-semibold mt-1">Luns a Sábado: 11:00 - 13:00 / 16:30 - 19:30</p>
                </div>
              </div>

              <!-- Phone & Email -->
              <div class="flex flex-col gap-3 pt-4 border-t border-gray-200/60">
                <a href="tel:610903537" class="flex items-center gap-4 group">
                  <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:bg-brand-red/5 group-hover:border-brand-red/20 transition-all shadow-sm">
                    <svg class="w-4.5 h-4.5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <span class="font-black text-xs text-gray-700 group-hover:text-brand-red transition-all">610 903 537</span>
                </a>
                <a href="mailto:clubpiraguismorianxo@gmail.com" class="flex items-center gap-4 group">
                  <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:bg-brand-red/5 group-hover:border-brand-red/20 transition-all shadow-sm">
                    <svg class="w-4.5 h-4.5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <span class="font-black text-xs text-gray-700 group-hover:text-brand-red transition-all break-all">clubpiraguismorianxo@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `

  setTimeout(() => {
    const form = section.querySelector<HTMLFormElement>('#contact-form')
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault()
        const nameEl = document.getElementById('contact-name') as HTMLInputElement
        const emailEl = document.getElementById('contact-email') as HTMLInputElement
        const subjectEl = document.getElementById('contact-subject') as HTMLSelectElement
        const messageEl = document.getElementById('contact-message') as HTMLTextAreaElement
        const privacyCheck = document.getElementById('contact-privacy-check') as HTMLInputElement
        const commercialCheck = document.getElementById('contact-commercial-check') as HTMLInputElement

        const hpEl = document.getElementById('contact-hp') as HTMLInputElement
        const mathEl = document.getElementById('contact-math') as HTMLInputElement

        // Honeypot validation
        if (hpEl.value !== '') {
          console.warn('Spam detected via honeypot')
          return
        }

        // Math challenge validation
        if (parseInt(mathEl.value, 10) !== 7) {
          alert('A resposta á pregunta de seguridade é incorrecta.')
          return
        }

        if (!privacyCheck.checked) {
          alert('Debes aceptar a Política de Privacidade para enviar o formulario.')
          return
        }

        const newMsg = {
          id: Date.now(),
          name: nameEl.value,
          email: emailEl.value,
          subject: subjectEl.value,
          message: messageEl.value,
          privacyAccepted: true,
          privacyPolicyVersion: '1.0',
          commercialAccepted: commercialCheck.checked,
          date: new Date().toLocaleDateString('gl-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          read: false
        }

        // Get existing messages
        const msgs = JSON.parse(localStorage.getItem('admin_messages') || '[]')
        msgs.unshift(newMsg)
        localStorage.setItem('admin_messages', JSON.stringify(msgs))

        // Reset form
        form.reset()

        // Show Toast/Notification
        const toast = document.createElement('div')
        toast.className = 'fixed bottom-6 right-6 bg-white text-gray-900 px-6 py-4 rounded-2xl font-bold shadow-2xl transform translate-y-20 opacity-0 transition-all duration-500 z-[100] flex items-center gap-3 border border-brand-red/20'
        toast.innerHTML = `
          <div class="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <div class="flex flex-col">
            <span class="text-sm">Mensaxe enviada!</span>
            <span class="text-xs text-gray-500 font-normal">Grazas por poñerte en contacto con nós.</span>
          </div>
        `
        document.body.appendChild(toast)
        
        setTimeout(() => toast.classList.remove('translate-y-20', 'opacity-0'), 10)
        setTimeout(() => {
          toast.classList.add('translate-y-20', 'opacity-0')
          setTimeout(() => toast.remove(), 500)
        }, 4000)
      })
    }
  }, 0)

  return section
}
