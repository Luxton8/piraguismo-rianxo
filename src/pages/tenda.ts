import '../style.css'
import { renderNavigation } from '../components/Navigation'
import { renderFooter } from '../components/Footer'

// --- State & Data ---
type Product = { 
  id: number; 
  name: string; 
  price: number; 
  priceStr: string; 
  category: string; 
  image: string; 
  tag: string | null;
  hasSizes: boolean;
}

type CartItem = { 
  product: Product; 
  quantity: number;
  size?: string;
}

const defaultProducts: Product[] = [
  {
    id: 1,
    name: 'Camiseta Oficial Club Piragüismo Rianxo',
    price: 35.00,
    priceStr: '35,00€',
    category: 'Competición',
    image: '/images/products/shirt.png',
    tag: 'Novidade',
    hasSizes: true
  },
  {
    id: 2,
    name: 'Sudadeira con Carapucha',
    price: 45.00,
    priceStr: '45,00€',
    category: 'Casual',
    image: '/images/products/hoodie.png',
    tag: 'Top Vendas',
    hasSizes: true
  },
  {
    id: 3,
    name: 'Gorra Técnica',
    price: 18.00,
    priceStr: '18,00€',
    category: 'Accesorios',
    image: '/images/products/shirt.png', // Placeholder
    tag: null,
    hasSizes: false
  },
  {
    id: 4,
    name: 'Mochila de Equipo',
    price: 55.00,
    priceStr: '55,00€',
    category: 'Accesorios',
    image: '/images/products/hoodie.png', // Placeholder
    tag: 'Reserva',
    hasSizes: false
  }
]

let products: Product[] = []

let cart: CartItem[] = JSON.parse(localStorage.getItem('shop_cart') || '[]')
let isCartOpen = false
let activeCategory = 'Todas'
const categories = ['Todas', 'Competición', 'Casual', 'Accesorios']

// --- DOM Setup ---
const app = document.querySelector<HTMLDivElement>('#app')!
app.appendChild(renderNavigation())

const main = document.createElement('main')
main.className = 'pt-32 pb-24 bg-white min-h-screen relative text-gray-800'

// Main Layout Containers
const shopContainer = document.createElement('div')
shopContainer.className = 'container mx-auto px-6 transition-all duration-300'

const cartDrawer = document.createElement('div')
cartDrawer.className = 'fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white border-l border-gray-200 shadow-2xl transform translate-x-full transition-transform duration-500 z-50 flex flex-col text-gray-800'

const quickViewOverlay = document.createElement('div')
quickViewOverlay.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 p-6'
quickViewOverlay.id = 'quick-view-overlay'

const checkoutOverlay = document.createElement('div')
checkoutOverlay.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 p-6'
checkoutOverlay.id = 'checkout-overlay'

// Overlay for cart background
const overlay = document.createElement('div')
overlay.className = 'fixed inset-0 bg-black/40 backdrop-blur-sm z-40 hidden transition-opacity duration-500 opacity-0'
overlay.onclick = toggleCart

// Floating Mobile Cart
const floatingCart = document.createElement('div')
floatingCart.className = 'fixed bottom-6 right-6 z-40 hidden lg:hidden transition-all duration-300 translate-y-20 opacity-0'
floatingCart.innerHTML = `
  <button onclick="window.toggleCart()" class="w-16 h-16 rounded-full bg-brand-red text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform relative cursor-pointer">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
    <span id="floating-cart-count" class="absolute -top-1 -right-1 bg-white text-brand-red text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-brand-red">0</span>
  </button>
`

// --- Render Functions ---

function renderShop() {
  const filteredProducts = activeCategory === 'Todas' 
    ? products 
    : products.filter(p => p.category === activeCategory)

  shopContainer.innerHTML = `
    <!-- Header -->
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 font-sans">
      <div class="space-y-2">
        <span class="text-[10px] font-black text-brand-red uppercase tracking-widest">Equipamento Oficial</span>
        <h1 class="text-4xl md:text-6xl font-display font-black tracking-tight text-gray-900 uppercase">Tenda do Club</h1>
        <p class="text-gray-500 text-xs sm:text-sm font-semibold max-w-xl">Leva as cores do Club de Piragüismo Rianxo alá onde vaias. Equipamento técnico e merchandising oficial.</p>
      </div>
      
      <div class="relative group shrink-0 w-full lg:w-auto flex justify-end">
        <button id="cart-toggle-btn" class="w-full lg:w-auto px-6 py-4 rounded-xl bg-brand-red text-white font-bold tracking-widest uppercase hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer text-xs">
          <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          Ver Carriño
          <span id="cart-count" class="ml-1.5 px-2.5 py-0.5 bg-white text-brand-red text-[10px] font-black rounded-full flex items-center justify-center min-w-[20px] h-[20px] transition-transform duration-300 border border-brand-red">${cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex overflow-x-auto gap-2 pb-6 mb-10 scrollbar-hide font-sans">
      ${categories.map(cat => `
        <button onclick="window.setCategory('${cat}')" class="px-5 py-2.5 rounded-xl border ${activeCategory === cat ? 'bg-brand-red border-brand-red text-white font-bold shadow-md shadow-brand-red/15' : 'border-gray-250 text-gray-500 hover:bg-gray-50 hover:text-gray-900'} transition-all whitespace-nowrap text-xs font-bold uppercase tracking-wider cursor-pointer">
          ${cat}
        </button>
      `).join('')}
    </div>

    <!-- Product Grid / ProductCard -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32 font-sans" id="product-grid">
      ${filteredProducts.length === 0 ? `
        <div class="col-span-full py-20 text-center">
          <p class="text-gray-400 text-sm">Non hai produtos nesta categoría.</p>
        </div>
      ` : filteredProducts.map(product => `
        <div class="group cursor-pointer flex flex-col justify-between" onclick="window.handleProductClick(${product.id})">
          <div class="relative aspect-[4/5] bg-gray-50 rounded-3xl overflow-hidden border border-gray-200 mb-4 transition-all duration-300 hover:shadow-md hover:border-brand-red/30">
            <img src="${product.image}" loading="lazy" decoding="async" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="${product.name}" />
            
            ${product.tag ? `
              <div class="absolute top-4 left-4 px-3 py-1 bg-brand-red text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                ${product.tag}
              </div>
            ` : ''}
            
            <!-- Hover Action -->
            <div class="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
               <button class="w-full py-3.5 rounded-xl bg-white border border-gray-200 text-gray-800 font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1.5 hover:bg-brand-red hover:border-brand-red hover:text-white transition-colors cursor-pointer shadow-md">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                  Engadir - ${product.priceStr}
               </button>
            </div>
            <!-- Gradient overlay for text readability -->
            <div class="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          </div>
          <div>
            <span class="text-brand-red text-[9px] font-black uppercase tracking-widest block mb-1">${product.category}</span>
            <h3 class="text-lg font-display font-black leading-tight text-gray-900 group-hover:text-brand-red transition-colors mb-1.5 line-clamp-1">${product.name}</h3>
            <p class="text-gray-950 font-bold text-sm">${product.priceStr}</p>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Promotional Section -->
    <div class="relative rounded-3xl overflow-hidden p-8 md:p-16 border border-gray-200 bg-gray-50/50 shadow-sm font-sans">
      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <span class="text-[10px] font-black text-brand-red uppercase tracking-widest">Colabora co club</span>
          <h2 class="text-3xl md:text-5xl font-display font-black tracking-tight text-gray-900 leading-none">FASTE SOCIO</h2>
          <p class="text-gray-500 text-sm sm:text-base leading-relaxed font-semibold max-w-md">Disfruta de descontos exclusivos en toda a tenda se es socio do club ou palista federado.</p>
          <div class="flex flex-col sm:flex-row gap-3">
             <button class="btn-primary px-8 py-3.5 text-xs font-bold uppercase tracking-widest cursor-pointer shadow-md">Quero ser socio</button>
             <button class="px-8 py-3.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all cursor-pointer">Saber máis</button>
          </div>
        </div>
        <div class="flex justify-center lg:justify-end">
           <div class="bg-white border border-gray-150 p-4 shadow-xl rounded-3xl animate-slow-zoom">
              <img src="/images/products/shirt.png" loading="lazy" decoding="async" class="w-56 md:w-72 rounded-2xl" alt="Promo" />
           </div>
        </div>
      </div>
    </div>
  `

  // Re-attach event listener for cart toggle
  setTimeout(() => {
    document.getElementById('cart-toggle-btn')?.addEventListener('click', toggleCart)
  }, 0)
}

function renderCartDrawer() {
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  
  cartDrawer.innerHTML = `
    <!-- Cart Header -->
    <div class="p-6 border-b border-gray-150 flex justify-between items-center bg-white text-gray-800 font-sans">
      <div class="flex flex-col">
        <span class="text-[9px] font-black text-brand-red uppercase tracking-widest">A túa compra</span>
        <h2 class="text-xl font-display font-black text-gray-900 uppercase mt-0.5">Carriño de Compra</h2>
      </div>
      <button onclick="window.toggleCart()" class="p-2 hover:bg-gray-50 rounded-xl border border-gray-150 transition-colors text-gray-400 hover:text-gray-850 cursor-pointer">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>

    <!-- Cart Items -->
    <div class="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide font-sans">
      ${cart.length === 0 ? `
        <div class="h-full flex flex-col items-center justify-center text-gray-400 space-y-6">
          <div class="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-150">
             <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          </div>
          <p class="font-bold uppercase tracking-widest text-[10px] text-gray-500">O teu carriño está baleiro</p>
          <button onclick="window.toggleCart()" class="px-5 py-2.5 rounded-xl border border-gray-250 hover:border-brand-red hover:text-brand-red transition-all text-[10px] font-black uppercase tracking-wider cursor-pointer">Seguir mercando</button>
        </div>
      ` : cart.map((item, index) => `
        <div class="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:shadow-sm transition-all group">
          <img src="${item.product.image}" loading="lazy" decoding="async" class="w-16 h-20 object-cover rounded-xl bg-white border border-gray-150" alt="${item.product.name}" />
          <div class="flex-1 flex flex-col justify-between">
            <div class="space-y-1">
              <div class="flex justify-between items-start gap-2">
                <h4 class="font-bold text-xs text-gray-800 group-hover:text-brand-red transition-colors line-clamp-2 leading-tight">${item.product.name}</h4>
                <button onclick="window.removeFromCart(${index})" class="text-gray-400 hover:text-brand-red transition-colors cursor-pointer shrink-0">
                  <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
              ${item.size ? `<p class="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Talla: <span class="text-gray-700 font-black">${item.size}</span></p>` : ''}
              <p class="text-gray-800 font-bold text-xs">${item.product.priceStr}</p>
            </div>
            <div class="flex items-center gap-2 mt-2">
              <button onclick="window.updateQuantity(${index}, -1)" class="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-850 cursor-pointer text-xs font-bold">-</button>
              <span class="font-bold w-6 text-center text-xs text-gray-850">${item.quantity}</span>
              <button onclick="window.updateQuantity(${index}, 1)" class="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-850 cursor-pointer text-xs font-bold">+</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Cart Footer -->
    ${cart.length > 0 ? `
      <div class="p-6 border-t border-gray-150 bg-white font-sans">
        <div class="flex justify-between items-center mb-6">
          <span class="text-gray-400 font-black uppercase tracking-widest text-[10px]">Total</span>
          <span class="text-2xl font-display font-black text-brand-red leading-none">${total.toFixed(2)}€</span>
        </div>
        <button onclick="window.checkout()" class="w-full py-4 rounded-xl bg-brand-red text-white font-bold hover:bg-red-700 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 cursor-pointer shadow-md">
          Finalizar Pedido
          <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
    ` : ''}
  `
}

function renderQuickView(productId: number) {
  const product = products.find(p => p.id === productId)
  if (!product) return

  const kidsSizes = ['2', '4', '6', '8', '10', '12', '14', '16']
  const adultSizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL']
  let selectedSize = 'M' // Default

  quickViewOverlay.innerHTML = `
    <div class="w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row bg-white border border-gray-250 rounded-2xl relative shadow-2xl text-gray-800 animate-fade-in-up" id="quick-view-modal">
      <button onclick="window.closeQuickView()" class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors border border-gray-200 shadow-md cursor-pointer">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      
      <div class="w-full md:w-1/2 bg-gradient-to-b from-gray-50 to-white p-8 flex items-center justify-center border-r border-gray-100">
         <img src="${product.image}" loading="lazy" decoding="async" class="w-3/4 object-contain" alt="${product.name}" />
      </div>
      
      <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
         <p class="text-brand-red font-bold uppercase tracking-widest text-xs mb-2">${product.category}</p>
         <h2 class="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">${product.name}</h2>
         <p class="text-2xl text-gray-800 font-bold mb-8">${product.priceStr}</p>
         
         <div class="mb-8">
            <div class="flex justify-between items-center mb-4">
              <span class="text-sm font-bold text-gray-500 uppercase tracking-widest">Selecciona Talla</span>
              <a href="#" class="text-xs text-brand-red underline">Guía de tallas</a>
            </div>
            <p class="text-[10px] font-bold text-brand-red uppercase tracking-widest mb-2">Infantil</p>
            <div class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-2 mb-6">
               ${kidsSizes.map(size => `
                  <button class="size-btn py-2 text-sm rounded-xl border ${size === selectedSize ? 'border-brand-red text-brand-red bg-brand-red/10' : 'border-gray-200 text-gray-700 hover:border-gray-400'} font-bold transition-colors cursor-pointer" data-size="${size}">
                    ${size}
                  </button>
               `).join('')}
            </div>

            <p class="text-[10px] font-bold text-brand-red uppercase tracking-widest mb-2">Adulto</p>
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2">
               ${adultSizes.map(size => `
                  <button class="size-btn py-3 rounded-xl border ${size === selectedSize ? 'border-brand-red text-brand-red bg-brand-red/10' : 'border-gray-200 text-gray-700 hover:border-gray-400'} font-bold transition-colors cursor-pointer" data-size="${size}">
                    ${size}
                  </button>
               `).join('')}
            </div>
         </div>
         
         <button onclick="window.addToCartWithSize(${product.id})" class="btn-primary w-full py-4 flex items-center justify-center gap-2 cursor-pointer">
            Engadir ao carrito
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
         </button>
      </div>
    </div>
  `

  // Attach size selection logic
  setTimeout(() => {
    const btns = document.querySelectorAll('.size-btn')
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement
        // Reset all
        btns.forEach(b => {
          b.classList.remove('border-brand-red', 'text-brand-red', 'bg-brand-red/10')
          b.classList.add('border-gray-200', 'text-gray-700')
        })
        // Set active
        target.classList.add('border-brand-red', 'text-brand-red', 'bg-brand-red/10')
        target.classList.remove('border-gray-200', 'text-gray-700')
        
        // Save selected size globally for the add function
        window.currentSelectedSize = target.dataset.size || 'M'
      })
    })
  }, 0)
}

// --- Logic Functions ---

function setCategory(category: string) {
  activeCategory = category
  renderShop() // Re-render grid with animation
  
  // Add a quick entry animation to the new grid
  setTimeout(() => {
    const grid = document.getElementById('product-grid')
    if(grid) {
      grid.classList.add('animate-fade-in-up')
      setTimeout(() => grid.classList.remove('animate-fade-in-up'), 500)
    }
  }, 10)
}

function handleProductClick(productId: number) {
  const product = products.find(p => p.id === productId)
  if (!product) return

  if (product.hasSizes) {
    window.currentSelectedSize = 'M' // default
    renderQuickView(productId)
    quickViewOverlay.classList.remove('opacity-0', 'pointer-events-none')
  } else {
    addToCart(productId, null)
  }
}

function closeQuickView() {
  quickViewOverlay.classList.add('opacity-0', 'pointer-events-none')
}

function toggleCart() {
  isCartOpen = !isCartOpen
  if (isCartOpen) {
    cartDrawer.classList.remove('translate-x-full')
    overlay.classList.remove('hidden')
    setTimeout(() => overlay.classList.remove('opacity-0'), 10)
    document.body.style.overflow = 'hidden'
  } else {
    cartDrawer.classList.add('translate-x-full')
    overlay.classList.add('opacity-0')
    setTimeout(() => overlay.classList.add('hidden'), 500)
    document.body.style.overflow = ''
  }
}

function addToCart(productId: number, size: string | null) {
  const product = products.find(p => p.id === productId)
  if (!product) return

  // Check if exactly same product (and same size) exists
  const existingItemIndex = cart.findIndex(item => item.product.id === productId && item.size === size)
  
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1
  } else {
    cart.push({ product, quantity: 1, size: size || undefined })
  }

  updateCartUI()
  showToast('Produto engadido con éxito')
}

function addToCartWithSize(productId: number) {
  addToCart(productId, window.currentSelectedSize)
  closeQuickView()
}

function removeFromCart(index: number) {
  cart.splice(index, 1)
  updateCartUI()
}

function updateQuantity(index: number, change: number) {
  const item = cart[index]
  if (!item) return

  item.quantity += change
  if (item.quantity <= 0) {
    removeFromCart(index)
  } else {
    updateCartUI()
  }
}

function closeCheckout() {
  checkoutOverlay.classList.add('opacity-0', 'pointer-events-none')
}

function renderCheckoutModal() {
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  checkoutOverlay.innerHTML = `
    <div class="w-full max-w-lg bg-white border border-gray-250 rounded-2xl relative max-h-[90vh] overflow-y-auto p-8 animate-fade-in-up shadow-2xl text-gray-800" id="checkout-modal">
      <button onclick="window.closeCheckout()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors border border-gray-200 shadow-sm cursor-pointer">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      <h3 class="text-2xl font-display font-bold uppercase tracking-tight text-gray-900 mb-6">
        Finalizar <span class="text-brand-red">Pedido</span>
      </h3>
      
      <div class="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
        <p class="text-xs font-bold text-gray-500 uppercase mb-2">Resumo de Compra</p>
        <div class="max-h-32 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
          ${cart.map(item => {
            const sizeStr = item.size ? ` (${item.size})` : ''
            return `
              <div class="flex justify-between text-xs text-gray-650">
                <span>${item.quantity}x ${item.product.name}${sizeStr}</span>
                <span class="font-bold text-gray-800">${(item.product.price * item.quantity).toFixed(2)}€</span>
              </div>
            `
          }).join('')}
        </div>
        <div class="flex justify-between items-center border-t border-gray-200 mt-4 pt-3">
          <span class="text-sm font-bold text-gray-700 uppercase">Total:</span>
          <span class="text-xl font-display font-bold text-brand-red">${total.toFixed(2)}€</span>
        </div>
      </div>

      <form id="checkout-form" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Nome Completo</label>
          <input type="text" id="buyer-name" required class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" placeholder="O teu nome e apelidos" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Correo Electrónico</label>
            <input type="email" id="buyer-email" required class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" placeholder="ti@email.com" />
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Teléfono de Contacto</label>
            <input type="tel" id="buyer-phone" required class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all" placeholder="600 000 000" />
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-550 uppercase mb-2">Observacións / Indicacións de envío (Opcional)</label>
          <textarea id="buyer-notes" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-red transition-all h-20 resize-none" placeholder="Ex: Talla infantil ou indicaciones para entrega..."></textarea>
        </div>

        <!-- GDPR Compliance Checkboxes -->
        <div class="space-y-3 pt-2 text-xs font-semibold text-gray-500">
          <div class="flex items-start gap-2.5">
            <input type="checkbox" id="checkout-privacy-check" required class="w-4 h-4 text-brand-red rounded border-gray-300 focus:ring-brand-red cursor-pointer mt-0.5" />
            <label for="checkout-privacy-check" class="cursor-pointer select-none leading-relaxed">
              Lin e acepto a <a href="/politica-privacidade" target="_blank" class="text-brand-red hover:underline font-bold">Política de Privacidade</a>.
            </label>
          </div>
          <div class="flex items-start gap-2.5">
            <input type="checkbox" id="checkout-commercial-check" class="w-4 h-4 text-brand-red rounded border-gray-300 focus:ring-brand-red cursor-pointer mt-0.5" />
            <label for="checkout-commercial-check" class="cursor-pointer select-none leading-relaxed">
              Acepto recibir información sobre actividades e novidades do club.
            </label>
          </div>
        </div>

        <button type="submit" class="btn-primary w-full py-4 text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md">
          Confirmar Pedido
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </form>
    </div>
  `

  setTimeout(() => {
    const form = document.getElementById('checkout-form') as HTMLFormElement
    form?.addEventListener('submit', (e) => {
      e.preventDefault()
      const privacyCheck = document.getElementById('checkout-privacy-check') as HTMLInputElement
      const commercialCheck = document.getElementById('checkout-commercial-check') as HTMLInputElement

      if (!privacyCheck.checked) {
        alert('Debes aceptar a Política de Privacidade para realizar o pedido.')
        return
      }

      const name = (document.getElementById('buyer-name') as HTMLInputElement).value
      const emailVal = (document.getElementById('buyer-email') as HTMLInputElement).value
      const phone = (document.getElementById('buyer-phone') as HTMLInputElement).value
      const notes = (document.getElementById('buyer-notes') as HTMLTextAreaElement).value

      const orderItems = cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        priceStr: item.product.priceStr,
        category: item.product.category,
        image: item.product.image,
        quantity: item.quantity,
        size: item.size || null
      }))

      const newOrder = {
        id: Date.now(),
        customer: { name, email: emailVal, phone, notes },
        items: orderItems,
        total,
        status: 'Pendente',
        privacyAccepted: true,
        privacyPolicyVersion: '1.0',
        commercialAccepted: commercialCheck.checked,
        date: new Date().toLocaleDateString('gl-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }

      // Save order
      const orders = JSON.parse(localStorage.getItem('admin_orders') || '[]')
      orders.unshift(newOrder)
      localStorage.setItem('admin_orders', JSON.stringify(orders))

      // Trigger standard email mailto
      const email = "pedidos@clubpiraguismorianxo.com"
      const subject = encodeURIComponent(`Novo Pedido #${newOrder.id} - Tenda Oficial`)
      
      let bodyText = `Ola,\n\nCliente: ${name}\nEmail: ${emailVal}\nTeléfono: ${phone}\n`
      if (notes) bodyText += `Observacións: ${notes}\n`
      bodyText += `\nDetalle do pedido:\n`
      
      cart.forEach(item => {
        const itemTotal = item.product.price * item.quantity
        const sizeStr = item.size ? ` (Talla: ${item.size})` : ''
        bodyText += `- ${item.quantity}x ${item.product.name}${sizeStr} a ${item.product.price.toFixed(2)}€/u = ${itemTotal.toFixed(2)}€\n`
      })
    
      bodyText += `\nTotal Pedido: ${total.toFixed(2)}€\n\nGrazas.`
      
      const body = encodeURIComponent(bodyText)
      
      // Clear cart
      cart = []
      updateCartUI()
      closeCheckout()
      showToast('Pedido rexistrado con éxito. Abrindo correo...')
      
      setTimeout(() => {
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
      }, 1000)
    })
  }, 0)
}

function checkout() {
  if (cart.length === 0) return
  toggleCart() // Close cart drawer
  renderCheckoutModal()
  checkoutOverlay.classList.remove('opacity-0', 'pointer-events-none')
}

function updateCartUI() {
  localStorage.setItem('shop_cart', JSON.stringify(cart))
  renderCartDrawer()
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  
  // Update header count
  const countEl = document.getElementById('cart-count')
  if (countEl) {
    countEl.textContent = totalItems.toString()
    
    // Add a pop animation
    countEl.parentElement?.classList.add('scale-110')
    setTimeout(() => {
      countEl.parentElement?.classList.remove('scale-110')
    }, 200)
  }

  // Update floating mobile cart
  if (totalItems > 0) {
    floatingCart.classList.remove('hidden')
    // small timeout to allow display:block to apply before animating opacity
    setTimeout(() => {
      floatingCart.classList.remove('translate-y-20', 'opacity-0')
    }, 10)
    
    const fCountEl = document.getElementById('floating-cart-count')
    if (fCountEl) {
      fCountEl.textContent = totalItems.toString()
      fCountEl.classList.add('scale-125')
      setTimeout(() => fCountEl.classList.remove('scale-125'), 200)
    }
  } else {
    floatingCart.classList.add('translate-y-20', 'opacity-0')
    setTimeout(() => {
      floatingCart.classList.add('hidden')
    }, 300)
  }
}

// Enhanced Toast System
function showToast(message: string) {
  const toast = document.createElement('div')
  toast.className = 'fixed bottom-6 right-6 bg-white text-gray-800 border border-gray-200 shadow-2xl px-6 py-4 rounded-2xl font-bold transform translate-y-20 opacity-0 transition-all duration-500 z-[100] flex items-center gap-3'
  toast.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
    </div>
    ${message}
    <!-- Progress bar -->
    <div class="absolute bottom-0 left-0 h-1 bg-brand-red rounded-b-2xl animate-toast-progress" style="width: 100%;"></div>
  `
  document.body.appendChild(toast)

  // Inject animation if not exists
  if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style')
    style.id = 'toast-styles'
    style.innerHTML = `
      @keyframes toastProgress {
        from { width: 100%; }
        to { width: 0%; }
      }
      .animate-toast-progress {
        animation: toastProgress 3s linear forwards;
      }
    `
    document.head.appendChild(style)
  }

  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-y-20', 'opacity-0')
  }, 10)

  // Animate out and remove
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0')
    setTimeout(() => toast.remove(), 500)
  }, 3000)
}

// Make functions globally accessible for inline event handlers
declare global {
  interface Window {
    toggleCart: typeof toggleCart;
    addToCart: typeof addToCart;
    addToCartWithSize: typeof addToCartWithSize;
    removeFromCart: typeof removeFromCart;
    updateQuantity: typeof updateQuantity;
    checkout: typeof checkout;
    setCategory: typeof setCategory;
    handleProductClick: typeof handleProductClick;
    closeQuickView: typeof closeQuickView;
    closeCheckout: typeof closeCheckout;
    currentSelectedSize: string;
  }
}
window.toggleCart = toggleCart
window.addToCart = addToCart
window.addToCartWithSize = addToCartWithSize
window.removeFromCart = removeFromCart
window.updateQuantity = updateQuantity
window.checkout = checkout
window.setCategory = setCategory
window.handleProductClick = handleProductClick
window.closeQuickView = closeQuickView
window.closeCheckout = closeCheckout

// Close modal on outside click
quickViewOverlay.addEventListener('click', (e) => {
  if (e.target === quickViewOverlay) closeQuickView()
})
checkoutOverlay.addEventListener('click', (e) => {
  if (e.target === checkoutOverlay) closeCheckout()
})

// --- Initialization ---

async function init() {
  try {
    const res = await fetch('/data/tenda.json')
    if (res.ok) {
      products = await res.json()
      localStorage.setItem('admin_tenda_products', JSON.stringify(products))
    } else {
      throw new Error()
    }
  } catch (e) {
    if (!localStorage.getItem('admin_tenda_products')) {
      localStorage.setItem('admin_tenda_products', JSON.stringify(defaultProducts))
    }
    products = JSON.parse(localStorage.getItem('admin_tenda_products')!)
  }

  // Assemble page
  renderShop()
  renderCartDrawer()

  main.appendChild(shopContainer)
  main.appendChild(overlay)
  main.appendChild(cartDrawer)
  main.appendChild(quickViewOverlay)
  main.appendChild(checkoutOverlay)
  main.appendChild(floatingCart)

  app.appendChild(main)
  app.appendChild(renderFooter())

  // Update UI counts with loaded cart items
  updateCartUI()
}

init()
