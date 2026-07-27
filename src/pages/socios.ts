import '../style.css'
import { renderNavigation } from '../components/Navigation'
import { renderFooter } from '../components/Footer'

const app = document.querySelector<HTMLDivElement>('#app')!
const main = document.createElement('main')
main.className = 'pt-32 pb-24 bg-white min-h-screen relative text-gray-800 font-sans'

main.innerHTML = `
  <div class="absolute inset-0 bg-gray-50/30 z-0 grid-overlay"></div>

  <div class="container mx-auto px-6 max-w-3xl relative z-10 space-y-10">
    <div class="space-y-2 text-center">
      <span class="text-[10px] font-black text-brand-red uppercase tracking-widest">O Club</span>
      <h1 class="text-4xl md:text-5xl font-display font-black text-gray-900 uppercase">Faste Socio</h1>
      <p class="text-gray-500 text-xs sm:text-sm font-semibold max-w-md mx-auto">
        Colabora co Club de Piragüismo Rianxo para fomentar o deporte base, o piragüismo tradicional e de competición.
      </p>
    </div>

    <div class="bg-white border border-gray-200 rounded-[2rem] p-6 sm:p-10 shadow-sm">
      <form id="partner-form" class="space-y-6">
        <h3 class="font-display font-black text-sm uppercase tracking-wider text-gray-900 border-b border-gray-150 pb-2">Datos Persoais</h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Nome</label>
            <input type="text" id="partner-name" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" placeholder="O teu nome" />
          </div>
          <div>
            <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Apelidos</label>
            <input type="text" id="partner-surname" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" placeholder="Apelidos completos" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="sm:col-span-2">
            <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Email</label>
            <input type="email" id="partner-email" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" placeholder="ti@email.com" />
          </div>
          <div>
            <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Teléfono</label>
            <input type="tel" id="partner-phone" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" placeholder="600 000 000" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div class="sm:col-span-2">
            <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">DNI / NIF</label>
            <input type="text" id="partner-dni" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" placeholder="12345678A" />
          </div>
          <div class="sm:col-span-2">
            <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Data de Nacemento</label>
            <input type="date" id="partner-birth" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" />
          </div>
        </div>

        <h3 class="font-display font-black text-sm uppercase tracking-wider text-gray-900 border-b border-gray-150 pb-2 pt-4">Datos de Pago (Domiciliación)</h3>
        
        <div>
          <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">IBAN da conta bancaria</label>
          <input type="text" id="partner-iban" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 font-mono focus:outline-none focus:border-brand-red transition-all" placeholder="ES00 0000 0000 0000 0000 0000" />
        </div>

        <!-- Honeypot Antispam -->
        <input type="text" id="partner-hp" class="hidden" style="display:none !important" autocomplete="off" />

        <!-- Math Challenge -->
        <div>
          <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Seguridade: Canto é 5 + 2?</label>
          <input type="number" id="partner-math" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" placeholder="Escribe o número" />
        </div>

        <!-- GDPR Consent -->
        <div class="space-y-3 pt-4 border-t border-gray-150 text-xs font-semibold text-gray-550">
          <div class="flex items-start gap-2.5">
            <input type="checkbox" id="partner-privacy-check" required class="w-4 h-4 text-brand-red rounded border-gray-300 focus:ring-brand-red cursor-pointer mt-0.5" />
            <label for="partner-privacy-check" class="cursor-pointer select-none leading-relaxed">
              Lin e acepto a <a href="/politica-privacidade" target="_blank" class="text-brand-red hover:underline font-bold">Política de Privacidade</a>.
            </label>
          </div>
          <div class="flex items-start gap-2.5">
            <input type="checkbox" id="partner-commercial-check" class="w-4 h-4 text-brand-red rounded border-gray-300 focus:ring-brand-red cursor-pointer mt-0.5" />
            <label for="partner-commercial-check" class="cursor-pointer select-none leading-relaxed">
              Acepto recibir información sobre actividades e novidades do club.
            </label>
          </div>
        </div>

        <button type="submit" class="btn-primary w-full py-4 text-xs font-bold uppercase tracking-widest cursor-pointer shadow-md">Confirmar Solicitude</button>
      </form>
    </div>
  </div>
`

app.appendChild(renderNavigation())
app.appendChild(main)
app.appendChild(renderFooter())

// Submit Listener
setTimeout(() => {
  const form = document.getElementById('partner-form') as HTMLFormElement
  form?.addEventListener('submit', (e) => {
    e.preventDefault()
    const privacyCheck = document.getElementById('partner-privacy-check') as HTMLInputElement
    const commercialCheck = document.getElementById('partner-commercial-check') as HTMLInputElement
    const hpEl = document.getElementById('partner-hp') as HTMLInputElement
    const mathEl = document.getElementById('partner-math') as HTMLInputElement

    if (hpEl.value !== '') {
      console.warn('Spam detected via honeypot')
      return
    }

    if (parseInt(mathEl.value, 10) !== 7) {
      alert('A resposta á pregunta de seguridade é incorrecta.')
      return
    }

    if (!privacyCheck.checked) {
      alert('Debes aceptar a Política de Privacidade.')
      return
    }

    const name = (document.getElementById('partner-name') as HTMLInputElement).value
    const surname = (document.getElementById('partner-surname') as HTMLInputElement).value
    const email = (document.getElementById('partner-email') as HTMLInputElement).value
    const phone = (document.getElementById('partner-phone') as HTMLInputElement).value
    const dni = (document.getElementById('partner-dni') as HTMLInputElement).value
    const birth = (document.getElementById('partner-birth') as HTMLInputElement).value
    const iban = (document.getElementById('partner-iban') as HTMLInputElement).value

    const newPartner = {
      id: Date.now(),
      name,
      surname,
      email,
      phone,
      dni,
      birth,
      iban,
      date: new Date().toLocaleDateString('gl-ES'),
      privacyAccepted: true,
      commercialAccepted: commercialCheck.checked
    }

    const partners = JSON.parse(localStorage.getItem('admin_partners') || '[]')
    partners.unshift(newPartner)
    localStorage.setItem('admin_partners', JSON.stringify(partners))

    form.reset()
    alert('Grazas! A túa solicitude de socio foi enviada correctamente e está pendente de aprobación polo club.')
  })
}, 0)
