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
      <span class="text-[10px] font-black text-brand-red uppercase tracking-widest">Escola</span>
      <h1 class="text-4xl md:text-5xl font-display font-black text-gray-900 uppercase">Inscrición Escola</h1>
      <p class="text-gray-500 text-xs sm:text-sm font-semibold max-w-md mx-auto">
        Une aos teus fillos e fillas á Escola Deportiva de Piragüismo para a tempada 2026.
      </p>
    </div>

    <!-- Downloads Section -->
    <div class="bg-gray-50 border border-gray-250 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="space-y-1 text-center sm:text-left">
        <h4 class="font-bold text-xs uppercase tracking-wider text-gray-900">Autorización Escola 2026</h4>
        <p class="text-[11px] text-gray-400 font-semibold">Descarga o documento obrigatorio que debes asinar e entregar o primeiro día de adestramento.</p>
      </div>
      <a href="#" onclick="alert('Documento descargado.'); return false;" class="px-5 py-2.5 rounded-xl border border-gray-250 bg-white hover:border-brand-red hover:text-brand-red transition-all text-[10px] font-black uppercase tracking-wider text-center shrink-0">Descargar PDF</a>
    </div>

    <div class="bg-white border border-gray-200 rounded-[2rem] p-6 sm:p-10 shadow-sm">
      <form id="escola-form" class="space-y-6">
        <h3 class="font-display font-black text-sm uppercase tracking-wider text-gray-900 border-b border-gray-150 pb-2">Datos do Alumno / Alumna</h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Nome do menor</label>
            <input type="text" id="escola-minor-name" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" placeholder="Nome do menor" />
          </div>
          <div>
            <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Data de Nacemento</label>
            <input type="date" id="escola-minor-birth" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" />
          </div>
        </div>

        <h3 class="font-display font-black text-sm uppercase tracking-wider text-gray-900 border-b border-gray-150 pb-2 pt-4">Datos do Pai / Nai / Titor Legal</h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Nome do titor</label>
            <input type="text" id="escola-tutor-name" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" placeholder="Nome completo" />
          </div>
          <div>
            <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">DNI do titor</label>
            <input type="text" id="escola-tutor-dni" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" placeholder="12345678A" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Email</label>
            <input type="email" id="escola-tutor-email" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" placeholder="ti@email.com" />
          </div>
          <div>
            <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Teléfono</label>
            <input type="tel" id="escola-tutor-phone" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" placeholder="600 000 000" />
          </div>
        </div>

        <div>
          <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Datos Médicos / Alerxias (Opcional)</label>
          <textarea id="escola-medical" class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all h-24 resize-none" placeholder="Indicar se ten algunha alerxia ou condición médica especial..."></textarea>
        </div>

        <!-- Authorizations Checkboxes -->
        <h3 class="font-display font-black text-xs uppercase tracking-wider text-gray-900 pt-4">Declaración e Autorizacións</h3>
        <div class="space-y-3 pt-2 text-xs font-semibold text-gray-500">
          <div class="flex items-start gap-2.5">
            <input type="checkbox" id="escola-swim-check" required class="w-4 h-4 text-brand-red rounded border-gray-300 focus:ring-brand-red cursor-pointer mt-0.5" />
            <label for="escola-swim-check" class="cursor-pointer select-none leading-relaxed">
              Declaro que o menor sabe nadar correctamente e non presenta impedimento médico para o piragüismo.
            </label>
          </div>
          <div class="flex items-start gap-2.5">
            <input type="checkbox" id="escola-image-check" class="w-4 h-4 text-brand-red rounded border-gray-300 focus:ring-brand-red cursor-pointer mt-0.5" />
            <label for="escola-image-check" class="cursor-pointer select-none leading-relaxed">
              Autorizo o uso de imaxes do menor en actividades do club para fins informativos na web e redes sociais.
            </label>
          </div>
        </div>

        <!-- Honeypot Antispam -->
        <input type="text" id="escola-hp" class="hidden" style="display:none !important" autocomplete="off" />

        <!-- Math Challenge -->
        <div>
          <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Seguridade: Canto é 6 + 3?</label>
          <input type="number" id="escola-math" required class="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" placeholder="Escribe o número" />
        </div>

        <!-- GDPR Consent -->
        <div class="space-y-3 pt-4 border-t border-gray-150 text-xs font-semibold text-gray-555">
          <div class="flex items-start gap-2.5">
            <input type="checkbox" id="escola-privacy-check" required class="w-4 h-4 text-brand-red rounded border-gray-300 focus:ring-brand-red cursor-pointer mt-0.5" />
            <label for="escola-privacy-check" class="cursor-pointer select-none leading-relaxed">
              Lin e acepto a <a href="/politica-privacidade" target="_blank" class="text-brand-red hover:underline font-bold">Política de Privacidade</a>.
            </label>
          </div>
        </div>

        <button type="submit" class="btn-primary w-full py-4 text-xs font-bold uppercase tracking-widest cursor-pointer shadow-md">Enviar Inscrición</button>
      </form>
    </div>
  </div>
`

app.appendChild(renderNavigation())
app.appendChild(main)
app.appendChild(renderFooter())

// Submit Listener
setTimeout(() => {
  const form = document.getElementById('escola-form') as HTMLFormElement
  form?.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const privacyCheck = document.getElementById('escola-privacy-check') as HTMLInputElement
    const swimCheck = document.getElementById('escola-swim-check') as HTMLInputElement
    const imageCheck = document.getElementById('escola-image-check') as HTMLInputElement
    const hpEl = document.getElementById('escola-hp') as HTMLInputElement
    const mathEl = document.getElementById('escola-math') as HTMLInputElement

    if (hpEl.value !== '') {
      console.warn('Spam detected via honeypot')
      return
    }

    if (parseInt(mathEl.value, 10) !== 9) {
      alert('A resposta á pregunta de seguridade é incorrecta.')
      return
    }

    if (!privacyCheck.checked || !swimCheck.checked) {
      alert('Debes aceptar os termos e a política de privacidade.')
      return
    }

    const minorName = (document.getElementById('escola-minor-name') as HTMLInputElement).value
    const minorBirth = (document.getElementById('escola-minor-birth') as HTMLInputElement).value
    const tutorName = (document.getElementById('escola-tutor-name') as HTMLInputElement).value
    const tutorDni = (document.getElementById('escola-tutor-dni') as HTMLInputElement).value
    const email = (document.getElementById('escola-tutor-email') as HTMLInputElement).value
    const phone = (document.getElementById('escola-tutor-phone') as HTMLInputElement).value
    const medical = (document.getElementById('escola-medical') as HTMLInputElement).value

    const newEnrollment = {
      id: Date.now(),
      minorName,
      minorBirth,
      tutorName,
      tutorDni,
      email,
      phone,
      medical,
      knowsSwim: true,
      imageAuthorized: imageCheck.checked,
      date: new Date().toLocaleDateString('gl-ES')
    }

    const enrollments = JSON.parse(localStorage.getItem('admin_escola') || '[]')
    enrollments.unshift(newEnrollment)
    localStorage.setItem('admin_escola', JSON.stringify(enrollments))

    form.reset()
    alert('Grazas! A inscrición do menor foi rexistrada correctamente no sistema da escola do club.')
  })
}, 0)
