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
      <h1 class="text-4xl md:text-5xl font-display font-black text-gray-900 uppercase">Política de Cookies</h1>
      <p class="text-gray-400 text-xs font-bold">Última actualización: 23/07/2026 | Versión: 1.0</p>
    </div>

    <div class="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-6">
      <p class="font-semibold text-sm sm:text-base">
        Na web do Club de Piragüismo Rianxo empregamos cookies para facilitar o funcionamento da tenda, do panel de administración e garantir unha correcta navegación.
      </p>

      <div class="space-y-3">
        <h2 class="text-xl font-display font-black text-gray-900 uppercase">1. Que son as cookies?</h2>
        <p>
          Unha cookie é un pequeno ficheiro de texto que se garda no teu navegador cando visitas case calquera páxina web. A súa utilidade é que a web sexa quen de lembrar a túa visita cando volvas navegar por esa páxina.
        </p>
      </div>

      <div class="space-y-3">
        <h2 class="text-xl font-display font-black text-gray-900 uppercase">2. Tipos de cookies que empregamos</h2>
        <p>
          Esta web só utiliza cookies e tecnoloxías de almacenamento locais técnicas e necesarias para o seu funcionamento básico. Non se inxectan cookies de terceiros nin de mercadotecnia sen o teu consentimento explícito.
        </p>
      </div>

      <!-- Cookies Table -->
      <div class="space-y-3">
        <h2 class="text-xl font-display font-black text-gray-900 uppercase">3. Inventario de Cookies e Almacenamento</h2>
        <div class="overflow-x-auto border border-gray-250 rounded-2xl">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-250 font-bold uppercase tracking-wider text-gray-700">
                <th class="p-4">Nome</th>
                <th class="p-4">Provedor</th>
                <th class="p-4">Finalidade</th>
                <th class="p-4">Tipo</th>
                <th class="p-4">Duración</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 font-semibold text-gray-550">
              <tr>
                <td class="p-4 font-mono text-gray-900">shop_cart</td>
                <td class="p-4">Propio (Local)</td>
                <td>Mantén os produtos engadidos ao carriño de compra.</td>
                <td class="p-4 text-green-600">Necesaria</td>
                <td class="p-4">Persistente (Local)</td>
              </tr>
              <tr>
                <td class="p-4 font-mono text-gray-900">cookie_consent</td>
                <td class="p-4">Propio (Local)</td>
                <td>Garda as túas preferencias de aceptación de cookies.</td>
                <td class="p-4 text-green-600">Necesaria</td>
                <td class="p-4">1 Ano</td>
              </tr>
              <tr>
                <td class="p-4 font-mono text-gray-900">admin_authenticated</td>
                <td class="p-4">Propio (Local)</td>
                <td>Mantén a sesión do administrador activa de xeito seguro.</td>
                <td class="p-4 text-green-600">Necesaria</td>
                <td class="p-4">Sesión</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="space-y-3">
        <h2 class="text-xl font-display font-black text-gray-900 uppercase">4. Configurar as túas preferencias</h2>
        <p>
          Podes cambiar as túas preferencias ou retirar o consentimento en calquera momento premendo no seguinte botón:
        </p>
        <div class="pt-2">
          <button onclick="window.showCookiePreferences()" class="btn-primary py-3 px-6 text-xs uppercase tracking-widest cursor-pointer shadow-md">Xestionar Cookies</button>
        </div>
      </div>
    </div>
  </div>
`

app.appendChild(renderNavigation())
app.appendChild(main)
app.appendChild(renderFooter())
