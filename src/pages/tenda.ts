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

const products: Product[] = [
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

let cart: CartItem[] = []
let isCartOpen = false
let activeCategory = 'Todas'
const categories = ['Todas', 'Competición', 'Casual', 'Accesorios']

// --- DOM Setup ---
const app = document.querySelector<HTMLDivElement>('#app')!
app.appendChild(renderNavigation())

const main = document.createElement('main')
main.className = 'pt-32 pb-24 bg-brand-dark min-h-screen relative'

// Main Layout Containers
const shopContainer = document.createElement('div')
shopContainer.className = 'container mx-auto px-6 transition-all duration-300'

const cartDrawer = document.createElement('div')
cartDrawer.className = 'fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#0a0a0a] border-l border-white/5 shadow-2xl transform translate-x-full transition-transform duration-500 z-50 flex flex-col'

const quickViewOverlay = document.createElement('div')
quickViewOverlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center opacity-0 pointer-events-none transition-all duration-300 p-6'
quickViewOverlay.id = 'quick-view-overlay'

// Overlay for cart background
const overlay = document.createElement('div')
overlay.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-40 hidden transition-opacity duration-500 opacity-0'
overlay.onclick = toggleCart

// Floating Mobile Cart
const floatingCart = document.createElement('div')
floatingCart.className = 'fixed bottom-6 right-6 z-40 hidden lg:hidden transition-all duration-300 translate-y-20 opacity-0'
floatingCart.innerHTML = `
  <button onclick="window.toggleCart()" class="w-16 h-16 rounded-full bg-brand-red text-white shadow-[0_0_30px_rgba(220,38,38,0.5)] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform relative">
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
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
      <div>
        <h1 class="text-5xl md:text-7xl font-display font-bold mb-4 uppercase tracking-tighter italic">Tenda <span class="text-brand-red">Oficial</span></h1>
        <p class="text-white/50 text-lg max-w-xl">Leva as cores do Club de Piragüismo Rianxo alá onde vaias. Equipamento técnico de alta calidade e merchandising oficial.</p>
      </div>
      
      <div class="relative group shrink-0 w-full lg:w-auto flex justify-end">
        <button id="cart-toggle-btn" class="w-full lg:w-auto px-8 py-4 rounded-full bg-brand-red text-white font-bold tracking-widest uppercase hover:bg-red-700 transition-colors flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          Carrito (<span id="cart-count">${cart.reduce((sum, item) => sum + item.quantity, 0)}</span>)
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex overflow-x-auto gap-2 pb-6 mb-6 scrollbar-hide">
      ${categories.map(cat => `
        <button onclick="window.setCategory('${cat}')" class="px-6 py-2 rounded-full border ${activeCategory === cat ? 'bg-brand-red border-brand-red text-white font-bold shadow-lg shadow-brand-red/20' : 'border-white/10 text-white/50 hover:bg-white/5 hover:text-white'} transition-all whitespace-nowrap text-sm">
          ${cat}
        </button>
      `).join('')}
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32" id="product-grid">
      ${filteredProducts.length === 0 ? `
        <div class="col-span-full py-20 text-center">
          <p class="text-white/30 text-lg">Non hai produtos nesta categoría.</p>
        </div>
      ` : filteredProducts.map(product => `
        <div class="group cursor-pointer" onclick="window.handleProductClick(${product.id})">
          <div class="relative aspect-[4/5] bg-gradient-to-b from-brand-grey to-brand-dark rounded-3xl overflow-hidden border border-white/5 mb-6 shadow-xl">
            <img src="${product.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" alt="${product.name}" />
            
            ${product.tag ? `
              <div class="absolute top-6 left-6 px-4 py-1.5 bg-brand-red text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                ${product.tag}
              </div>
            ` : ''}
            
            <!-- Hover Action -->
            <div class="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
               <button class="w-full py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-brand-red hover:border-brand-red transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  Engadir - ${product.priceStr}
               </button>
            </div>
            <!-- Dark gradient over bottom for text readability -->
            <div class="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          </div>
          <p class="text-brand-red text-[10px] font-bold uppercase tracking-widest mb-2">${product.category}</p>
          <h3 class="text-xl font-display font-bold leading-tight mb-2 group-hover:text-brand-red transition-colors">${product.name}</h3>
          <p class="text-white/70 font-bold text-lg">${product.priceStr}</p>
        </div>
      `).join('')}
    </div>

    <!-- Promotional Section -->
    <div class="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden p-8 md:p-20 border border-white/5 bg-gradient-to-br from-brand-red/10 to-transparent">
      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 italic uppercase tracking-tighter">Únete á <span class="text-brand-red">Marea Vermella</span></h2>
          <p class="text-white/70 text-lg mb-10 max-w-lg">Disfruta de descontos exclusivos en toda a tenda se es socio do club ou palista federado.</p>
          <div class="flex flex-col sm:flex-row gap-4 w-full">
             <button class="btn-primary px-10 w-full sm:w-auto">Quero ser socio</button>
             <button class="px-8 py-3 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-all w-full sm:w-auto text-center">Saber máis</button>
          </div>
        </div>
        <div class="flex justify-center lg:justify-end">
           <div class="glass-card p-4 rotate-6 hover:rotate-0 transition-transform duration-700">
              <img src="/images/products/shirt.png" class="w-64 md:w-80 rounded-2xl" alt="Promo" />
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
    <div class="p-8 border-b border-white/5 flex justify-between items-center bg-[#0a0a0a]">
      <h2 class="text-2xl font-display font-bold tracking-tight uppercase italic">O Teu <span class="text-brand-red">Carrito</span></h2>
      <button onclick="window.toggleCart()" class="p-2 hover:bg-white/5 rounded-full transition-colors text-white/50 hover:text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>

    <!-- Cart Items -->
    <div class="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
      ${cart.length === 0 ? `
        <div class="h-full flex flex-col items-center justify-center text-white/30 space-y-6">
          <div class="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center">
             <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          </div>
          <p class="font-bold uppercase tracking-widest text-sm">O teu carrito está baleiro</p>
          <button onclick="window.toggleCart()" class="px-6 py-2 rounded-full border border-white/10 hover:border-brand-red hover:text-brand-red transition-colors text-xs font-bold uppercase tracking-widest">Seguir mercando</button>
        </div>
      ` : cart.map((item, index) => `
        <div class="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
          <img src="${item.product.image}" class="w-20 h-24 object-cover rounded-xl bg-brand-dark" alt="${item.product.name}" />
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start gap-2">
                <h4 class="font-bold text-sm leading-tight group-hover:text-brand-red transition-colors">${item.product.name}</h4>
                <button onclick="window.removeFromCart(${index})" class="text-white/30 hover:text-brand-red transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
              ${item.size ? `<p class="text-xs text-white/40 mt-1 uppercase tracking-widest">Talla: <span class="text-white font-bold">${item.size}</span></p>` : ''}
              <p class="text-white font-bold mt-2">${item.product.priceStr}</p>
            </div>
            <div class="flex items-center gap-3 mt-2">
              <button onclick="window.updateQuantity(${index}, -1)" class="w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">-</button>
              <span class="font-bold w-4 text-center text-sm">${item.quantity}</span>
              <button onclick="window.updateQuantity(${index}, 1)" class="w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">+</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Cart Footer -->
    ${cart.length > 0 ? `
      <div class="p-8 border-t border-white/5 bg-[#0a0a0a]">
        <div class="flex justify-between items-center mb-6">
          <span class="text-white/50 font-bold uppercase tracking-widest text-sm">Total</span>
          <span class="text-3xl font-display font-bold text-brand-red">${total.toFixed(2)}€</span>
        </div>
        <button onclick="window.checkout()" class="w-full py-4 rounded-xl bg-brand-red text-white font-bold hover:bg-red-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
          Realizar Pedido
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
        <p class="text-white/30 text-xs text-center mt-4">O pedido xestionarase a través de correo electrónico.</p>
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
    <div class="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl relative" id="quick-view-modal">
      <button onclick="window.closeQuickView()" class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-brand-red transition-colors backdrop-blur-md">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      
      <div class="w-full md:w-1/2 bg-gradient-to-b from-brand-grey to-brand-dark p-8 flex items-center justify-center">
         <img src="${product.image}" class="w-3/4 object-contain animate-fade-in-up" alt="${product.name}" />
      </div>
      
      <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
         <p class="text-brand-red font-bold uppercase tracking-widest text-xs mb-2">${product.category}</p>
         <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">${product.name}</h2>
         <p class="text-2xl text-white/80 font-bold mb-8">${product.priceStr}</p>
         
         <div class="mb-8">
            <div class="flex justify-between items-center mb-4">
              <span class="text-sm font-bold text-white/50 uppercase tracking-widest">Selecciona Talla</span>
              <a href="#" class="text-xs text-brand-red underline">Guía de tallas</a>
            </div>
            <p class="text-[10px] font-bold text-brand-red uppercase tracking-widest mb-2">Infantil</p>
            <div class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-2 mb-6">
               ${kidsSizes.map(size => `
                  <button class="size-btn py-2 text-sm rounded-xl border ${size === selectedSize ? 'border-brand-red text-brand-red bg-brand-red/10' : 'border-white/10 text-white hover:border-white/30'} font-bold transition-colors" data-size="${size}">
                    ${size}
                  </button>
               `).join('')}
            </div>

            <p class="text-[10px] font-bold text-brand-red uppercase tracking-widest mb-2">Adulto</p>
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2">
               ${adultSizes.map(size => `
                  <button class="size-btn py-3 rounded-xl border ${size === selectedSize ? 'border-brand-red text-brand-red bg-brand-red/10' : 'border-white/10 text-white hover:border-white/30'} font-bold transition-colors" data-size="${size}">
                    ${size}
                  </button>
               `).join('')}
            </div>
         </div>
         
         <button onclick="window.addToCartWithSize(${product.id})" class="btn-primary w-full py-4 flex items-center justify-center gap-2">
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
          b.classList.add('border-white/10', 'text-white')
        })
        // Set active
        target.classList.add('border-brand-red', 'text-brand-red', 'bg-brand-red/10')
        target.classList.remove('border-white/10', 'text-white')
        
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

function checkout() {
  const email = "pedidos@clubpiraguismorianxo.com"
  const subject = encodeURIComponent("Novo Pedido - Tenda Oficial")
  
  let bodyText = "Ola,\n\nGostaría de realizar o seguinte pedido:\n\n"
  let total = 0

  cart.forEach(item => {
    const itemTotal = item.product.price * item.quantity
    total += itemTotal
    const sizeStr = item.size ? ` (Talla: ${item.size})` : ''
    bodyText += `- ${item.quantity}x ${item.product.name}${sizeStr} a ${item.product.price.toFixed(2)}€/u = ${itemTotal.toFixed(2)}€\n`
  })

  bodyText += `\nTotal Pedido: ${total.toFixed(2)}€\n\nPor favor, indicádeme como proceder co pago.\nGrazas.`
  
  const body = encodeURIComponent(bodyText)
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
}

function updateCartUI() {
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
  toast.className = 'fixed bottom-6 right-6 bg-white text-brand-dark px-6 py-4 rounded-2xl font-bold shadow-2xl transform translate-y-20 opacity-0 transition-all duration-500 z-[100] flex items-center gap-3'
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

// Close modal on outside click
quickViewOverlay.addEventListener('click', (e) => {
  if (e.target === quickViewOverlay) closeQuickView()
})

// --- Initialization ---

// Assemble page
renderShop()
renderCartDrawer()

main.appendChild(shopContainer)
main.appendChild(overlay)
main.appendChild(cartDrawer)
main.appendChild(quickViewOverlay)
main.appendChild(floatingCart)

app.appendChild(main)
app.appendChild(renderFooter())
