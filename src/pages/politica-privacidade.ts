import '../style.css'
import { renderNavigation } from '../components/Navigation'
import { renderFooter } from '../components/Footer'

const app = document.querySelector<HTMLDivElement>('#app')!
const main = document.createElement('main')
main.className = 'pt-32 pb-24 bg-white min-h-screen relative text-gray-800 font-sans'

main.innerHTML = `
  <div class="absolute inset-0 bg-gray-50/30 z-0 grid-overlay"></div>

  <div class="container mx-auto px-6 max-w-4xl relative z-10 space-y-10">
    <div class="space-y-2 text-center">
      <span class="text-[10px] font-black text-brand-red uppercase tracking-widest">Información Legal</span>
      <h1 class="text-4xl md:text-5xl font-display font-black text-gray-900 uppercase">Política de Privacidade</h1>
      <p class="text-gray-400 text-xs font-bold">Última actualización: 23/07/2026 | Versión: 1.0</p>
    </div>

    <div class="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-6">
      <div class="space-y-3">
        <h2 class="text-xl font-display font-black text-gray-900 uppercase">1. Responsable do Tratamento</h2>
        <p>
          O Club de Piragüismo Rianxo comprométese coa protección dos teus datos persoais. Abaixo atópanse os datos identificativos:
        </p>
        <ul class="list-disc pl-6 space-y-1 font-semibold text-gray-550">
          <li><strong>Responsable:</strong> [COMPLETAR NOMBRE DEL RESPONSABLE]</li>
          <li><strong>NIF:</strong> [COMPLETAR NIF]</li>
          <li><strong>Domicilio:</strong> [COMPLETAR DOMICILIO]</li>
          <li><strong>Email:</strong> [COMPLETAR EMAIL]</li>
          <li><strong>Teléfono:</strong> [COMPLETAR TELÉFONO]</li>
        </ul>
      </div>

      <div class="space-y-3">
        <h2 class="text-xl font-display font-black text-gray-900 uppercase">2. Finalidade do Tratamento</h2>
        <p>
          Tratamos os teus datos coas seguintes finalidades:
        </p>
        <ul class="list-disc pl-6 space-y-1 font-semibold text-gray-550">
          <li>Atender e responder as mensaxes recibidas a través do formulario de contacto.</li>
          <li>Xestionar os pedidos realizados na tenda oficial e coordinar a súa entrega.</li>
          <li>Se o autorizas, enviarche información comercial ou avisos de actividades do club.</li>
        </ul>
      </div>

      <div class="space-y-3">
        <h2 class="text-xl font-display font-black text-gray-900 uppercase">3. Lexitimación</h2>
        <p>
          A base xurídica para o tratamento dos teus datos é o **consentimento explícito** que outorgas ao marcar as casillas de aceptación de privacidade nos nosos formularios antes de enviar a túa información.
        </p>
      </div>

      <div class="space-y-3">
        <h2 class="text-xl font-display font-black text-gray-900 uppercase">4. Dereitos dos usuarios</h2>
        <p>
          Tes dereito a acceder, rectificar, limitar ou eliminar os teus datos persoais dirixíndote a nós a través do correo electrónico **[COMPLETAR EMAIL]** xunto cunha copia do teu DNI. Tamén tes dereito a presentar unha reclamación ante a Axencia Española de Protección de Datos (AEPD) se consideras que os teus dereitos foron vulnerados.
        </p>
      </div>
    </div>
  </div>
`

app.appendChild(renderNavigation())
app.appendChild(main)
app.appendChild(renderFooter())
