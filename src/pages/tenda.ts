import '../style.css'
import { renderNavigation } from '../components/Navigation'
import { renderFooter } from '../components/Footer'

const app = document.querySelector<HTMLDivElement>('#app')!

app.appendChild(renderNavigation())

const main = document.createElement('main')
main.className = 'pt-32 pb-24 bg-brand-dark'

const products = [
  {
    id: 1,
    name: 'Camiseta Oficial CP Rianxo',
    price: '35,00€',
    category: 'Competición',
    image: '/images/products/shirt.png',
    tag: 'Novidade'
  },
  {
    id: 2,
    name: 'Sudadeira con Carapucha',
    price: '45,00€',
    category: 'Casual',
    image: '/images/products/hoodie.png',
    tag: 'Top Vendas'
  },
  {
    id: 3,
    name: 'Gorra Técnica',
    price: '18,00€',
    category: 'Accesorios',
    image: '/images/products/shirt.png', // Placeholder
    tag: null
  },
  {
    id: 4,
    name: 'Mochila de Equipo',
    price: '55,00€',
    category: 'Accesorios',
    image: '/images/products/hoodie.png', // Placeholder
    tag: 'Reserva'
  }
]

main.innerHTML = `
  <div class="container mx-auto px-6">
    <div class="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
      <div>
        <h1 class="text-6xl font-display font-bold mb-4 uppercase tracking-tighter italic">Tenda <span class="text-brand-red">Oficial</span></h1>
        <p class="text-white/50 text-lg max-w-xl">Leva as cores do Club de Piragüismo Rianxo alá onde vaias. Equipamento técnico de alta calidade e merchandising oficial.</p>
      </div>
      
      <div class="flex gap-4">
        <button class="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-all flex items-center gap-2">
          Filtrar
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 4h18L14 12v7l-4 3v-10L3 4z"></path></svg>
        </button>
        <div class="relative group">
          <button class="btn-primary flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            Carrito (0)
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      ${products.map(product => `
        <div class="group cursor-pointer">
          <div class="relative aspect-[4/5] bg-brand-grey/50 rounded-3xl overflow-hidden border border-white/10 mb-6">
            <img src="${product.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="${product.name}" />
            ${product.tag ? `
              <div class="absolute top-6 left-6 px-4 py-1 bg-brand-red text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-xl">
                ${product.tag}
              </div>
            ` : ''}
            <div class="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              <button class="w-12 h-12 rounded-full bg-white text-brand-dark flex items-center justify-center hover:bg-brand-red hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              </button>
              <button class="w-12 h-12 rounded-full bg-white text-brand-dark flex items-center justify-center hover:bg-brand-red hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </button>
            </div>
          </div>
          <p class="text-white/30 text-xs font-bold uppercase tracking-widest mb-2">${product.category}</p>
          <h3 class="text-xl font-display font-bold mb-2 group-hover:text-brand-red transition-colors">${product.name}</h3>
          <p class="text-brand-red font-bold text-lg">${product.price}</p>
        </div>
      `).join('')}
    </div>

    <!-- Promotional Section -->
    <div class="mt-32 relative rounded-[3rem] overflow-hidden p-20 border border-white/5">
      <div class="absolute inset-0 bg-gradient-to-br from-brand-red/20 to-transparent"></div>
      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-5xl font-display font-bold mb-6 italic uppercase tracking-tighter">Únete á <span class="text-brand-red">Marea Vermella</span></h2>
          <p class="text-white/70 text-lg mb-10 max-w-lg">Disfruta de descontos exclusivos en toda a tenda se es socio do club ou palista federado.</p>
          <div class="flex gap-4">
             <button class="btn-primary px-10">Quero ser socio</button>
             <button class="px-8 py-3 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-all">Saber máis</button>
          </div>
        </div>
        <div class="flex justify-center">
           <div class="glass-card p-4 rotate-6 hover:rotate-0 transition-transform duration-700">
              <img src="/images/products/shirt.png" class="w-80 rounded-2xl" alt="Promo" />
           </div>
        </div>
      </div>
    </div>
  </div>
`
app.appendChild(main)

app.appendChild(renderFooter())
