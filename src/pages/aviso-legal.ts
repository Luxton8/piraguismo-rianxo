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
      <h1 class="text-4xl md:text-5xl font-display font-black text-gray-900 uppercase">Aviso Legal</h1>
      <p class="text-gray-400 text-xs font-bold">Última actualización: 23/07/2026 | Versión: 1.0</p>
    </div>

    <div class="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-6">
      <div class="space-y-3">
        <h2 class="text-xl font-display font-black text-gray-900 uppercase">1. Datos Identificativos</h2>
        <p>
          En cumprimento do deber de información recollido no artigo 10 da Lei 34/2002, de Servizos da Sociedade da Información e do Comercio Electrónico (LSSI-CE), a continuación detállanse os datos identificativos do propietario do sitio web:
        </p>
        <ul class="list-disc pl-6 space-y-1 font-semibold text-gray-550">
          <li><strong>Denominación Social:</strong> [COMPLETAR NOMBRE DEL RESPONSABLE]</li>
          <li><strong>NIF:</strong> [COMPLETAR NIF]</li>
          <li><strong>Domicilio Social:</strong> [COMPLETAR DOMICILIO]</li>
          <li><strong>Email de contacto:</strong> [COMPLETAR EMAIL]</li>
        </ul>
      </div>

      <div class="space-y-3">
        <h2 class="text-xl font-display font-black text-gray-900 uppercase">2. Condicións de Uso</h2>
        <p>
          O acceso e/ou uso deste sitio web atribúe a condición de usuario, que acepta plenamente as condicións aquí reflectidas. O sitio web do Club de Piragüismo Rianxo ofrece información sobre as súas actividades, regatas, a súa tenda oficial e a súa escola deportiva. O usuario comprométese a facer un uso adecuado dos contidos e servizos.
        </p>
      </div>

      <div class="space-y-3">
        <h2 class="text-xl font-display font-black text-gray-900 uppercase">3. Propiedade Intelectual</h2>
        <p>
          Todos os dereitos de propiedade intelectual e industrial dos elementos gráficos, deseño, marcas e logotipos desta web son propiedade do Club de Piragüismo Rianxo ou dos seus respectivos licenciadores. Queda prohibida calquera reprodución sen o consentimento previo do club.
        </p>
      </div>
    </div>
  </div>
`

app.appendChild(renderNavigation())
app.appendChild(main)
app.appendChild(renderFooter())
