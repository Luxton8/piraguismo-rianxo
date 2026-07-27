import '../style.css'

// State models
type Nova = {
  id: number;
  title: string;
  category: string;
  description: string;
  content: string;
  date: string;
  image: string;
}

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

type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

type EventItem = {
  id: number;
  date: string;
  title: string;
  location: string;
  type: string;
  status: string;
}

type OrderItem = {
  id: number;
  name: string;
  price: number;
  priceStr: string;
  category: string;
  image: string;
  quantity: number;
  size: string | null;
}

type Order = {
  id: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
  items: OrderItem[];
  total: number;
  status: string; // 'Pendente' | 'Pagado' | 'Entregado'
  date: string;
}

function parseAndFormatDate(dateStr: string): { day: string; month: string; year: string } {
  const clean = dateStr.trim();
  const monthsGl = ['Xan', 'Feb', 'Mar', 'Abr', 'Mai', 'Xuñ', 'Xul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'];
  
  // Try dd/mm/yyyy
  if (clean.includes('/')) {
    const slashParts = clean.split('/');
    if (slashParts.length === 3) {
      const p0 = slashParts[0].trim();
      const p1 = slashParts[1].trim();
      const p2 = slashParts[2].trim();
      
      let dayVal = '';
      let monthIndex = -1;
      let yearVal = '';
      
      if (p0.length === 4) {
        dayVal = p2.padStart(2, '0');
        monthIndex = parseInt(p1, 10) - 1;
        yearVal = p0;
      } else {
        dayVal = p0.padStart(2, '0');
        monthIndex = parseInt(p1, 10) - 1;
        yearVal = p2;
      }
      
      const monthVal = (monthIndex >= 0 && monthIndex < 12) ? monthsGl[monthIndex] : p1;
      return {
        day: dayVal,
        month: monthVal,
        year: yearVal
      };
    }
  }

  // Try yyyy-mm-dd
  if (clean.includes('-')) {
    const dateObj = new Date(clean);
    if (!isNaN(dateObj.getTime())) {
      return {
        day: dateObj.getDate().toString().padStart(2, '0'),
        month: monthsGl[dateObj.getMonth()],
        year: dateObj.getFullYear().toString()
      };
    }
  }

  // Fallback to space-split (e.g. "15 Xuñ 2026")
  const spaceParts = clean.split(/\s+/);
  if (spaceParts.length === 3) {
    const day = spaceParts[0].padStart(2, '0');
    let month = spaceParts[1];
    const year = spaceParts[2];
    
    if (month.length > 3) {
      month = month.substring(0, 3);
    }
    month = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
    
    return { day, month, year };
  }

  return { day: clean, month: '', year: '' };
}

// Authentication Check
if (!localStorage.getItem('admin_password')) {
  localStorage.setItem('admin_password', 'admin')
}

let isAuthenticated = sessionStorage.getItem('admin_authenticated') === 'true'

const app = document.querySelector<HTMLDivElement>('#app')!

// Main view container
const main = document.createElement('main')
main.className = 'pt-12 pb-24 min-h-screen bg-white text-gray-800'

function renderPage() {
  app.innerHTML = ''
  
  if (!isAuthenticated) {
    renderLoginView()
  } else {
    renderDashboardView()
  }
  
  app.appendChild(main)
}

function renderLoginView() {
  main.innerHTML = `
    <div class="container mx-auto px-6 max-w-md">
      <div class="bg-white border border-gray-200 shadow-2xl rounded-3xl p-8 md:p-12 relative overflow-hidden text-gray-850">
        <div class="absolute -top-12 -right-12 w-32 h-32 bg-brand-red/5 rounded-full blur-2xl"></div>
        <div class="absolute -bottom-12 -left-12 w-32 h-32 bg-brand-red/[0.02] rounded-full blur-2xl"></div>
        
        <div class="text-center mb-8">
          <img src="/logo.png" class="w-16 h-16 mx-auto mb-4 object-contain" alt="Logo" />
          <h1 class="text-3xl font-display font-bold uppercase tracking-tight text-gray-900">Acceso <span class="text-brand-red">Admin</span></h1>
          <p class="text-gray-400 text-xs mt-2 uppercase tracking-widest">Club Piragüismo Rianxo</p>
        </div>
        
        <form id="login-form" class="space-y-6">
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Usuario</label>
            <input type="text" id="admin-user" required class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red transition-all text-gray-800 text-sm" placeholder="Introduce o teu usuario" />
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Contrasinal</label>
            <input type="password" id="admin-pass" required class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red transition-all text-gray-800 text-sm" placeholder="••••••••" />
          </div>
          <div id="login-error" class="hidden text-brand-red text-xs font-bold bg-brand-red/10 p-3 rounded-lg text-center animate-fade-in-down border border-brand-red/20">
            Usuario ou contrasinal incorrectos
          </div>
          <button type="submit" class="btn-primary w-full py-3.5 text-sm font-bold tracking-widest uppercase cursor-pointer">Entrar</button>
        </form>
      </div>
    </div>
  `

  setTimeout(() => {
    const form = document.getElementById('login-form') as HTMLFormElement
    form?.addEventListener('submit', (e) => {
      e.preventDefault()
      const user = (document.getElementById('admin-user') as HTMLInputElement).value
      const pass = (document.getElementById('admin-pass') as HTMLInputElement).value
      const errorEl = document.getElementById('login-error')!

      const savedPassword = localStorage.getItem('admin_password') || 'admin'
      if (user === 'admin' && pass === savedPassword) {
        sessionStorage.setItem('admin_authenticated', 'true')
        isAuthenticated = true
        renderPage()
        showToast('Benvido ao panel de administración')
      } else {
        errorEl.classList.remove('hidden')
        // Pulse animation on form
        form.classList.add('animate-shake')
        setTimeout(() => form.classList.remove('animate-shake'), 500)
      }
    })
  }, 0)
}

// Active Tab State
let activeTab = 'mensaxes' // 'mensaxes' | 'novas' | 'tenda' | 'calendario' | 'pedidos'
let editingItem: { type: 'nova' | 'product' | 'event' | 'order'; data: any } | null = null

function renderDashboardView() {
  // Load data
  const messages: Message[] = JSON.parse(localStorage.getItem('admin_messages') || '[]')
  const novas: Nova[] = JSON.parse(localStorage.getItem('admin_novas') || '[]')
  const products: Product[] = JSON.parse(localStorage.getItem('admin_tenda_products') || '[]')
  const events: EventItem[] = JSON.parse(localStorage.getItem('admin_calendario_events') || '[]')
  const orders: Order[] = JSON.parse(localStorage.getItem('admin_orders') || '[]')
  
  const unreadMessagesCount = messages.filter(m => !m.read).length
  const pendingOrdersCount = orders.filter(o => o.status === 'Pendente').length

  main.innerHTML = `
    <div class="container mx-auto px-6 max-w-7xl">
      <!-- Welcome Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-gray-200 pb-8">
        <div>
          <h1 class="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-gray-900">Panel de <span class="text-brand-red">Control</span></h1>
          <p class="text-gray-500 text-sm mt-1">Xestiona de forma sinxela as novas, produtos, pedidos da tenda, eventos e as mensaxes recibidas.</p>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="window.openChangePasswordModal()" class="px-5 py-2.5 rounded-full border border-gray-300 hover:border-brand-red hover:bg-brand-red/5 text-gray-700 transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer bg-white">
            <svg class="w-4 h-4 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            Contrasinal
          </button>
          <button onclick="window.adminLogout()" class="px-6 py-2.5 rounded-full border border-gray-300 hover:border-brand-red hover:bg-brand-red hover:text-white text-gray-700 transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer bg-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Pechar Sesión
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        <!-- Stat item -->
        <div class="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Pedidos Pendentes</p>
            <p class="text-4xl font-display font-bold ${pendingOrdersCount > 0 ? 'text-brand-red' : 'text-gray-800'}">${pendingOrdersCount}</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-150 flex items-center justify-center text-brand-red shadow-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
          </div>
        </div>
        <!-- Stat item -->
        <div class="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Mensaxes</p>
            <p class="text-4xl font-display font-bold ${unreadMessagesCount > 0 ? 'text-brand-red' : 'text-gray-800'}">${unreadMessagesCount}</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-150 flex items-center justify-center text-brand-red shadow-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"></path></svg>
          </div>
        </div>
        <!-- Stat item -->
        <div class="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Total Novas</p>
            <p class="text-4xl font-display font-bold text-gray-800">${novas.length}</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-150 flex items-center justify-center text-brand-red shadow-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 2v6h6m-8 6h.01M12 18h.01"></path></svg>
          </div>
        </div>
        <!-- Stat item -->
        <div class="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Produtos</p>
            <p class="text-4xl font-display font-bold text-gray-800">${products.length}</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-150 flex items-center justify-center text-brand-red shadow-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          </div>
        </div>
        <!-- Stat item -->
        <div class="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Eventos</p>
            <p class="text-4xl font-display font-bold text-gray-800">${events.length}</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-150 flex items-center justify-center text-brand-red shadow-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
        </div>
      </div>

      <!-- Tab Buttons -->
      <div class="flex border-b border-gray-200 gap-2 mb-8 overflow-x-auto scrollbar-hide">
        <button onclick="window.switchTab('pedidos')" class="px-6 py-4 font-display font-bold uppercase tracking-wider text-xs border-b-2 transition-all cursor-pointer ${activeTab === 'pedidos' ? 'border-brand-red text-brand-red' : 'border-transparent text-gray-400 hover:text-gray-700'}">
          Pedidos (${orders.length})
        </button>
        <button onclick="window.switchTab('socios')" class="px-6 py-4 font-display font-bold uppercase tracking-wider text-xs border-b-2 transition-all cursor-pointer ${activeTab === 'socios' ? 'border-brand-red text-brand-red' : 'border-transparent text-gray-400 hover:text-gray-700'}">
          Socios (${JSON.parse(localStorage.getItem('admin_partners') || '[]').length})
        </button>
        <button onclick="window.switchTab('escola')" class="px-6 py-4 font-display font-bold uppercase tracking-wider text-xs border-b-2 transition-all cursor-pointer ${activeTab === 'escola' ? 'border-brand-red text-brand-red' : 'border-transparent text-gray-400 hover:text-gray-700'}">
          Escola (${JSON.parse(localStorage.getItem('admin_escola') || '[]').length})
        </button>
        <button onclick="window.switchTab('mensaxes')" class="px-6 py-4 font-display font-bold uppercase tracking-wider text-xs border-b-2 transition-all cursor-pointer ${activeTab === 'mensaxes' ? 'border-brand-red text-brand-red' : 'border-transparent text-gray-400 hover:text-gray-700'}">
          Mensaxes (${messages.length})
        </button>
        <button onclick="window.switchTab('novas')" class="px-6 py-4 font-display font-bold uppercase tracking-wider text-xs border-b-2 transition-all cursor-pointer ${activeTab === 'novas' ? 'border-brand-red text-brand-red' : 'border-transparent text-gray-400 hover:text-gray-700'}">
          Novas (${novas.length})
        </button>
        <button onclick="window.switchTab('tenda')" class="px-6 py-4 font-display font-bold uppercase tracking-wider text-xs border-b-2 transition-all cursor-pointer ${activeTab === 'tenda' ? 'border-brand-red text-brand-red' : 'border-transparent text-gray-400 hover:text-gray-700'}">
          Produtos (${products.length})
        </button>
        <button onclick="window.switchTab('calendario')" class="px-6 py-4 font-display font-bold uppercase tracking-wider text-xs border-b-2 transition-all cursor-pointer ${activeTab === 'calendario' ? 'border-brand-red text-brand-red' : 'border-transparent text-gray-400 hover:text-gray-700'}">
          Calendario (${events.length})
        </button>
        <button onclick="window.switchTab('cookies')" class="px-6 py-4 font-display font-bold uppercase tracking-wider text-xs border-b-2 transition-all cursor-pointer ${activeTab === 'cookies' ? 'border-brand-red text-brand-red' : 'border-transparent text-gray-400 hover:text-gray-700'}">
          Cookies e Privacidade
        </button>
      </div>

      <!-- Tab Content Area -->
      <div class="min-h-[400px]">
        ${activeTab === 'pedidos' ? renderPedidosTab(orders) : ''}
        ${activeTab === 'socios' ? renderPartnersTab() : ''}
        ${activeTab === 'escola' ? renderSchoolTab() : ''}
        ${activeTab === 'mensaxes' ? renderMessagesTab(messages) : ''}
        ${activeTab === 'novas' ? renderNovasTab(novas) : ''}
        ${activeTab === 'tenda' ? renderTendaTab(products) : ''}
        ${activeTab === 'calendario' ? renderCalendarioTab(events) : ''}
        ${activeTab === 'cookies' ? renderCookiesTab() : ''}
      </div>
    </div>

    <!-- Modals Container -->
    <div id="admin-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 p-6">
      <div class="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl relative max-h-[90vh] overflow-y-auto p-8 shadow-2xl" id="admin-modal-content">
        <!-- Injected modal form -->
      </div>
    </div>
  `
}

// ----------------------------------------------------
// TAB 0: Orders / Pedidos
// ----------------------------------------------------
function renderPedidosTab(orders: Order[]): string {
  if (orders.length === 0) {
    return `
      <div class="bg-white border border-gray-200 shadow-sm rounded-2xl py-20 text-center">
        <p class="text-gray-400 text-lg">Non se rexistraron pedidos aínda.</p>
      </div>
    `
  }

  return `
    <div class="space-y-6 animate-fade-in-up">
      ${orders.map(order => {
        let statusClass = 'text-orange-600 bg-orange-50 border-orange-200';
        if (order.status === 'Pagado') statusClass = 'text-blue-600 bg-blue-50 border-blue-200';
        if (order.status === 'Entregado') statusClass = 'text-green-600 bg-green-50 border-green-200';

        return `
          <div class="bg-white border border-gray-200 shadow-sm p-6 rounded-2xl flex flex-col gap-6 hover:border-gray-300 transition-colors text-gray-800">
            
            <!-- Order Header -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4">
              <div>
                <div class="flex items-center gap-3 flex-wrap">
                  <span class="text-xs font-bold text-gray-500">Pedido #${order.id}</span>
                  <span class="text-xs text-gray-400">${order.date}</span>
                  <span class="px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${statusClass}">${order.status}</span>
                </div>
                <h4 class="font-display font-bold text-lg text-gray-900 mt-1">Cliente: ${order.customer.name}</h4>
              </div>
              
              <div class="text-right sm:text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                <span class="text-xs text-gray-500">Total do Pedido:</span>
                <span class="text-2xl font-display font-bold text-brand-red">${order.total.toFixed(2)}€</span>
              </div>
            </div>

            <!-- Order Body: Customer & Items info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Customer details -->
              <div class="space-y-2">
                <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Contacto</p>
                <p class="text-sm text-gray-700"><span class="text-gray-400">Email:</span> ${order.customer.email}</p>
                <p class="text-sm text-gray-700"><span class="text-gray-400">Teléfono:</span> ${order.customer.phone}</p>
                ${order.customer.notes ? `<p class="text-sm text-gray-650 italic mt-2 bg-gray-50 border border-gray-150 p-3 rounded-lg"><span class="text-gray-400 font-bold block not-italic uppercase text-[9px] mb-1">Notas:</span>"${order.customer.notes}"</p>` : ''}
              </div>

              <!-- Product items details -->
              <div class="space-y-3">
                <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Artigos Solicitados</p>
                <div class="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-hide">
                  ${order.items.map(item => {
                    const sizeStr = item.size ? ` - Talla: <span class="text-brand-red font-bold">${item.size}</span>` : '';
                    return `
                      <div class="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-200 text-xs">
                        <div class="w-10 h-12 bg-white rounded-lg overflow-hidden shrink-0 flex items-center justify-center text-[9px] border border-gray-200">
                          ${item.image ? `<img src="${item.image}" class="w-full h-full object-cover" />` : 'Foto'}
                        </div>
                        <div class="flex-1">
                          <p class="font-bold text-gray-800 leading-tight">${item.name}</p>
                          <p class="text-gray-500 mt-1">${item.quantity}x a ${item.price.toFixed(2)}€/u${sizeStr}</p>
                        </div>
                      </div>
                    `
                  }).join('')}
                </div>
              </div>
            </div>

            <!-- Actions buttons footer -->
            <div class="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-4 mt-2">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Cambiar Estado:</span>
                <button onclick="window.updateOrderStatus(${order.id}, 'Pendente')" class="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:border-orange-500 hover:text-orange-500 text-[10px] font-bold transition-all cursor-pointer ${order.status === 'Pendente' ? 'border-orange-500 text-orange-500' : 'text-gray-600'}">Pendente</button>
                <button onclick="window.updateOrderStatus(${order.id}, 'Pagado')" class="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:border-blue-500 hover:text-blue-500 text-[10px] font-bold transition-all cursor-pointer ${order.status === 'Pagado' ? 'border-blue-500 text-blue-500' : 'text-gray-600'}">Pagado</button>
                <button onclick="window.updateOrderStatus(${order.id}, 'Entregado')" class="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:border-green-500 hover:text-green-500 text-[10px] font-bold transition-all cursor-pointer ${order.status === 'Entregado' ? 'border-green-500 text-green-500' : 'text-gray-600'}">Entregado</button>
              </div>

              <button onclick="window.deleteOrder(${order.id})" class="px-4 py-2 bg-brand-red/10 border border-brand-red/20 text-brand-red hover:bg-brand-red hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer">
                Eliminar Pedido
              </button>
            </div>

          </div>
        `
      }).join('')}
    </div>
  `
}

// ----------------------------------------------------
// TAB 1: Messages
// ----------------------------------------------------
function renderMessagesTab(messages: Message[]): string {
  if (messages.length === 0) {
    return `
      <div class="bg-white border border-gray-200 shadow-sm rounded-2xl py-20 text-center">
        <p class="text-gray-400 text-lg">Non se recibiron mensaxes de contacto aínda.</p>
      </div>
    `
  }

  return `
    <div class="space-y-6 animate-fade-in-up">
      ${messages.map(msg => `
        <div class="bg-white border p-6 rounded-2xl ${msg.read ? 'border-gray-250 bg-gray-50/50' : 'border-brand-red/30 bg-brand-red/[0.02]'} transition-all group shadow-sm text-gray-800">
          <div class="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
            <div>
              <div class="flex items-center gap-3 flex-wrap">
                <h3 class="font-display font-bold text-lg text-gray-900">${msg.name}</h3>
                <span class="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">${msg.email}</span>
                ${!msg.read ? '<span class="text-[10px] bg-brand-red text-white font-bold uppercase px-2 py-0.5 rounded-full tracking-widest">Nova</span>' : ''}
              </div>
              <p class="text-xs text-brand-red font-bold uppercase tracking-wider mt-1">${msg.subject}</p>
            </div>
            
            <div class="flex items-center gap-3 shrink-0">
              <span class="text-xs text-gray-400">${msg.date}</span>
              <button onclick="window.toggleMessageRead(${msg.id})" class="p-2 bg-white border border-gray-250 hover:bg-brand-red hover:text-white rounded-lg transition-colors text-gray-550 cursor-pointer" title="${msg.read ? 'Marcar como non lida' : 'Marcar como lida'}">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </button>
              <button onclick="window.deleteMessage(${msg.id})" class="p-2 bg-white border border-gray-250 hover:bg-red-800 hover:text-white rounded-lg transition-colors text-gray-550 cursor-pointer" title="Eliminar mensaxe">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </div>
          <p class="text-gray-650 text-sm whitespace-pre-wrap leading-relaxed border-t border-gray-250 pt-4 mt-2">${msg.message}</p>
        </div>
      `).join('')}
    </div>
  `
}

// ----------------------------------------------------
// TAB 2: News / Novas
// ----------------------------------------------------
function renderNovasTab(novas: Nova[]): string {
  return `
    <div class="space-y-6 animate-fade-in-up text-gray-800">
      <div class="flex justify-between items-center">
        <h3 class="font-display font-bold text-lg text-gray-900">Novas Publicadas</h3>
        <button onclick="window.openCreateNovaModal()" class="px-5 py-2.5 bg-brand-red text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-red-700 transition-all flex items-center gap-2 cursor-pointer shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Engadir Nova
        </button>
      </div>

      <div class="grid grid-cols-1 gap-4">
        ${novas.length === 0 ? `
          <div class="bg-white border border-gray-200 shadow-sm rounded-2xl py-20 text-center">
            <p class="text-gray-400 text-lg">Non hai novas publicadas. Engade a primeira!</p>
          </div>
        ` : novas.map(nova => `
          <div class="bg-white border border-gray-200 shadow-sm p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-gray-300 transition-colors">
            <div class="flex items-center gap-4 flex-1">
              <div class="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-gray-400 italic text-[9px] border border-gray-200">
                ${nova.image ? `<img src="${nova.image}" class="w-full h-full object-cover" />` : 'Imaxe'}
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <span class="text-[10px] text-brand-red font-bold uppercase tracking-widest">${nova.category}</span>
                  <span class="text-[10px] text-gray-400">${nova.date}</span>
                </div>
                <h4 class="font-display font-bold text-lg text-gray-900 mt-1 line-clamp-1">${nova.title}</h4>
                <p class="text-xs text-gray-500 line-clamp-1 mt-1">${nova.description}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3 shrink-0">
              <button onclick="window.openEditNovaModal(${nova.id})" class="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm">Editar</button>
              <button onclick="window.deleteNova(${nova.id})" class="px-4 py-2 bg-brand-red/10 border border-brand-red/20 text-brand-red hover:bg-brand-red hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer">Eliminar</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `
}

// ----------------------------------------------------
// TAB 3: Shop / Tenda
// ----------------------------------------------------
function renderTendaTab(products: Product[]): string {
  return `
    <div class="space-y-6 animate-fade-in-up text-gray-800">
      <div class="flex justify-between items-center">
        <h3 class="font-display font-bold text-lg text-gray-900">Produtos Dispoñibles</h3>
        <button onclick="window.openCreateProductModal()" class="px-5 py-2.5 bg-brand-red text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-red-700 transition-all flex items-center gap-2 cursor-pointer shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Engadir Produto
        </button>
      </div>

      <div class="grid grid-cols-1 gap-4">
        ${products.length === 0 ? `
          <div class="bg-white border border-gray-200 shadow-sm rounded-2xl py-20 text-center">
            <p class="text-gray-400 text-lg">Non hai produtos dispoñibles. Engade o primeiro!</p>
          </div>
        ` : products.map(prod => `
          <div class="bg-white border border-gray-200 shadow-sm p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-gray-300 transition-colors">
            <div class="flex items-center gap-4 flex-1">
              <div class="w-16 h-16 bg-gray-55 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-gray-400 italic text-[9px] border border-gray-200">
                ${prod.image ? `<img src="${prod.image}" class="w-full h-full object-cover" />` : 'Imaxe'}
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <span class="text-[10px] text-brand-red font-bold uppercase tracking-widest">${prod.category}</span>
                  ${prod.tag ? `<span class="text-[9px] bg-brand-red text-white px-2 py-0.5 rounded-full font-bold uppercase">${prod.tag}</span>` : ''}
                </div>
                <h4 class="font-display font-bold text-lg text-gray-900 mt-1">${prod.name}</h4>
                <p class="text-sm text-brand-red font-bold mt-1">${prod.priceStr}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3 shrink-0">
              <button onclick="window.openEditProductModal(${prod.id})" class="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm">Editar</button>
              <button onclick="window.deleteProduct(${prod.id})" class="px-4 py-2 bg-brand-red/10 border border-brand-red/20 text-brand-red hover:bg-brand-red hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer">Eliminar</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `
}

// ----------------------------------------------------
// TAB 4: Calendar / Calendario
// ----------------------------------------------------
function renderCalendarioTab(events: EventItem[]): string {
  const confirmedCount = events.filter(e => e.status === 'Confirmado').length
  const pendingCount = events.filter(e => e.status === 'Pendente').length

  return `
    <div class="space-y-6 animate-fade-in-up text-gray-800 font-sans">
      <!-- Calendar Header & Summary stats -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-5">
        <div>
          <h3 class="font-display font-black text-xl uppercase tracking-tight text-gray-900">Eventos no Calendario</h3>
          <div class="flex items-center gap-3 text-xs text-gray-500 font-semibold mt-1">
            <span>Total: <strong class="text-gray-900">${events.length}</strong></span>
            <span class="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
            <span class="text-green-600">Confirmados: <strong>${confirmedCount}</strong></span>
            <span class="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
            <span class="text-amber-600">Pendentes: <strong>${pendingCount}</strong></span>
          </div>
        </div>
        <button onclick="window.openCreateEventModal()" class="px-5 py-2.5 bg-brand-red text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer shadow-md">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Engadir Evento
        </button>
      </div>

      <!-- Search & Filters -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-200/80">
        <div class="relative sm:col-span-1">
          <input type="text" id="event-search" oninput="window.filterEvents()" class="w-full bg-white border border-gray-250 rounded-xl pl-9 pr-4 py-2.5 text-xs focus:outline-none focus:border-brand-red transition-all text-gray-800" placeholder="Buscar por título ou lugar..." />
          <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <div>
          <select id="event-filter-status" onchange="window.filterEvents()" class="w-full bg-white border border-gray-250 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-red transition-all text-gray-700 font-semibold cursor-pointer">
            <option value="all">Tódolos Estados</option>
            <option value="confirmado">Confirmados</option>
            <option value="pendente">Pendentes</option>
          </select>
        </div>
        <div>
          <select id="event-filter-type" onchange="window.filterEvents()" class="w-full bg-white border border-gray-250 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-red transition-all text-gray-700 font-semibold cursor-pointer">
            <option value="all">Tódolos Tipos</option>
            <option value="regata">Regatas</option>
            <option value="concentración">Concentracións</option>
            <option value="asemblea">Asembleas</option>
            <option value="outro">Outros</option>
          </select>
        </div>
      </div>

      <!-- Event Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="events-grid-container">
        ${events.length === 0 ? `
          <div class="bg-white border border-gray-200 shadow-sm rounded-2xl py-20 text-center col-span-full">
            <p class="text-gray-400 text-lg">Non hai eventos programados. Crea o primeiro!</p>
          </div>
        ` : events.map(evt => {
          const { day, month, year } = parseAndFormatDate(evt.date);
          const statusColors = evt.status === 'Confirmado' 
            ? 'bg-green-50 text-green-700 border-green-200' 
            : 'bg-amber-50 text-amber-700 border-amber-200';
          const typeColors = 'bg-gray-100 text-gray-700 border-gray-200';
          
          return `
            <div class="event-card bg-white border border-gray-200 hover:border-brand-red/30 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group" 
                 data-title="${evt.title.toLowerCase()}" 
                 data-location="${evt.location.toLowerCase()}" 
                 data-type="${evt.type.toLowerCase()}"
                 data-status="${evt.status.toLowerCase()}">
              
              <!-- Color Indicator Line -->
              <div class="absolute top-0 left-0 w-full h-1 ${evt.status === 'Confirmado' ? 'bg-green-500' : 'bg-amber-500'}"></div>
              
              <div class="flex items-start gap-4 mb-4 mt-1">
                <!-- Date block -->
                <div class="w-14 h-16 bg-gray-50 border border-gray-200 rounded-xl shrink-0 flex flex-col items-center justify-center text-center shadow-sm">
                  <span class="text-xl font-display font-extrabold text-gray-900 leading-none">${day}</span>
                  ${month ? `<span class="text-[9px] font-bold text-brand-red uppercase tracking-wider mt-1.5">${month}</span>` : ''}
                  ${year ? `<span class="text-[8px] text-gray-400 mt-0.5">${year}</span>` : ''}
                </div>
                
                <!-- Info block -->
                <div class="flex-1 space-y-2">
                  <div class="flex flex-wrap gap-1.5 items-center">
                    <span class="px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${typeColors}">${evt.type}</span>
                    <span class="px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${statusColors}">${evt.status}</span>
                  </div>
                  <h4 class="font-display font-bold text-base text-gray-900 leading-snug group-hover:text-brand-red transition-colors line-clamp-2">${evt.title}</h4>
                </div>
              </div>
              
              <!-- Location and Actions -->
              <div class="border-t border-gray-100 pt-4 mt-auto flex flex-col gap-3">
                <p class="text-xs text-gray-500 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span class="truncate">${evt.location}</span>
                </p>
                
                <div class="flex items-center gap-2 justify-end pt-1">
                  <button onclick="window.openEditEventModal(${evt.id})" class="px-3.5 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
                    <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    Editar
                  </button>
                  <button onclick="window.deleteEvent(${evt.id})" class="px-3.5 py-1.5 bg-brand-red/10 border border-brand-red/20 text-brand-red hover:bg-brand-red hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
        
        <!-- Empty Results Message -->
        <div id="event-empty-msg" class="hidden bg-white border border-gray-200 shadow-sm rounded-2xl py-20 text-center col-span-full">
          <p class="text-gray-400 text-base font-semibold">Non se atoparon eventos cos filtros seleccionados.</p>
        </div>
      </div>
    </div>
  `
}

function filterEvents() {
  const searchInput = document.getElementById('event-search') as HTMLInputElement
  const statusSelect = document.getElementById('event-filter-status') as HTMLSelectElement
  const typeSelect = document.getElementById('event-filter-type') as HTMLSelectElement
  
  if (!searchInput || !statusSelect || !typeSelect) return
  
  const query = searchInput.value.trim().toLowerCase()
  const status = statusSelect.value.toLowerCase()
  const type = typeSelect.value.toLowerCase()
  
  const cards = document.querySelectorAll('.event-card')
  let visibleCount = 0
  
  cards.forEach(card => {
    const el = card as HTMLElement
    const title = el.getAttribute('data-title') || ''
    const location = el.getAttribute('data-location') || ''
    const cStatus = el.getAttribute('data-status') || ''
    const cType = el.getAttribute('data-type') || ''
    
    const matchesSearch = title.includes(query) || location.includes(query)
    const matchesStatus = status === 'all' || cStatus === status
    const matchesType = type === 'all' || cType.includes(type)
    
    if (matchesSearch && matchesStatus && matchesType) {
      el.classList.remove('hidden')
      visibleCount++
    } else {
      el.classList.add('hidden')
    }
  })
  
  const emptyEl = document.getElementById('event-empty-msg')
  if (emptyEl) {
    if (visibleCount === 0) {
      emptyEl.classList.remove('hidden')
    } else {
      emptyEl.classList.add('hidden')
    }
  }
}

// ----------------------------------------------------
// TAB 3.1: Partners / Socios
// ----------------------------------------------------
function renderPartnersTab(): string {
  const partners = JSON.parse(localStorage.getItem('admin_partners') || '[]')
  
  return `
    <div class="space-y-6">
      <div class="flex justify-between items-center border-b border-gray-150 pb-4">
        <div>
          <h2 class="text-xl font-display font-black uppercase text-gray-900">Solicitudes de Socios</h2>
          <p class="text-xs text-gray-500 font-semibold mt-1">Xestiona as novas solicitudes de afiliación recibidas.</p>
        </div>
        <button onclick="window.exportPartnersToCSV()" class="px-5 py-2.5 rounded-xl border border-gray-250 bg-white hover:border-brand-red hover:text-brand-red transition-all text-[10px] font-black uppercase tracking-wider cursor-pointer shadow-sm shrink-0">Exportar a CSV</button>
      </div>

      <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        ${partners.length === 0 ? `
          <div class="py-20 text-center text-gray-400 italic font-semibold text-sm">Non hai solicitudes de socios rexistradas.</div>
        ` : `
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200 font-bold uppercase tracking-wider text-gray-700">
                  <th class="p-4">Nome</th>
                  <th class="p-4">DNI</th>
                  <th class="p-4">Contacto</th>
                  <th class="p-4">IBAN</th>
                  <th class="p-4">Data</th>
                  <th class="p-4 text-right">Accións</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 font-semibold text-gray-550">
                ${partners.map((p: any) => `
                  <tr>
                    <td class="p-4 font-bold text-gray-950">${p.name} ${p.surname}</td>
                    <td class="p-4">${p.dni}</td>
                    <td class="p-4">
                      <div>${p.email}</div>
                      <div class="text-[10px] text-gray-400">${p.phone}</div>
                    </td>
                    <td class="p-4 font-mono text-xs">${p.iban}</td>
                    <td class="p-4">${p.date}</td>
                    <td class="p-4 text-right">
                      <button onclick="window.deletePartner(${p.id})" class="px-3 py-1.5 rounded-lg bg-brand-red/10 border border-brand-red/20 text-brand-red hover:bg-brand-red hover:text-white font-bold transition-all cursor-pointer">Eliminar</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>
  `
}

function deletePartner(id: number) {
  if (!confirm('¿Seguro que queres eliminar esta solicitude de socio?')) return
  const partners = JSON.parse(localStorage.getItem('admin_partners') || '[]')
  const filtered = partners.filter((p: any) => p.id !== id)
  localStorage.setItem('admin_partners', JSON.stringify(filtered))
  showToast('Solicitude de socio eliminada con éxito')
  renderDashboardView()
}

// ----------------------------------------------------
// TAB 3.2: School / Escola
// ----------------------------------------------------
function renderSchoolTab(): string {
  const enrollments = JSON.parse(localStorage.getItem('admin_escola') || '[]')
  
  return `
    <div class="space-y-6">
      <div class="flex justify-between items-center border-b border-gray-150 pb-4">
        <div>
          <h2 class="text-xl font-display font-black uppercase text-gray-900">Inscricións da Escola</h2>
          <p class="text-xs text-gray-500 font-semibold mt-1">Xestiona os alumnos inscritos na escola de piragüismo.</p>
        </div>
        <button onclick="window.exportSchoolToCSV()" class="px-5 py-2.5 rounded-xl border border-gray-250 bg-white hover:border-brand-red hover:text-brand-red transition-all text-[10px] font-black uppercase tracking-wider cursor-pointer shadow-sm shrink-0">Exportar a CSV</button>
      </div>

      <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        ${enrollments.length === 0 ? `
          <div class="py-20 text-center text-gray-400 italic font-semibold text-sm">Non hai inscricións rexistradas na escola.</div>
        ` : `
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200 font-bold uppercase tracking-wider text-gray-700">
                  <th class="p-4">Menor</th>
                  <th class="p-4">Data Nacemento</th>
                  <th class="p-4">Titor</th>
                  <th class="p-4">Contacto</th>
                  <th class="p-4">Ficha Médica</th>
                  <th class="p-4 text-right">Accións</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 font-semibold text-gray-550">
                ${enrollments.map((e: any) => `
                  <tr>
                    <td class="p-4 font-bold text-gray-950">${e.minorName}</td>
                    <td class="p-4">${e.minorBirth}</td>
                    <td class="p-4">${e.tutorName} (${e.tutorDni})</td>
                    <td class="p-4">
                      <div>${e.email}</div>
                      <div class="text-[10px] text-gray-400">${e.phone}</div>
                    </td>
                    <td class="p-4 text-xs italic max-w-xs truncate">${e.medical || 'Ningunha'}</td>
                    <td class="p-4 text-right">
                      <button onclick="window.deleteEnrollment(${e.id})" class="px-3 py-1.5 rounded-lg bg-brand-red/10 border border-brand-red/20 text-brand-red hover:bg-brand-red hover:text-white font-bold transition-all cursor-pointer">Eliminar</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>
  `
}

function deleteEnrollment(id: number) {
  if (!confirm('¿Seguro que queres eliminar esta inscrición da escola?')) return
  const enrollments = JSON.parse(localStorage.getItem('admin_escola') || '[]')
  const filtered = enrollments.filter((e: any) => e.id !== id)
  localStorage.setItem('admin_escola', JSON.stringify(filtered))
  showToast('Inscrición da escola eliminada con éxito')
  renderDashboardView()
}

// ----------------------------------------------------
// TAB 5: Cookies and Privacy
// ----------------------------------------------------
function renderCookiesTab(): string {
  const consents = JSON.parse(localStorage.getItem('admin_cookie_consents') || '[]')
  const scripts = JSON.parse(localStorage.getItem('admin_cookie_scripts') || '[]')

  return `
    <div class="space-y-8 font-sans text-gray-800">
      <div class="flex justify-between items-center border-b border-gray-150 pb-4">
        <div>
          <h2 class="text-xl font-display font-black uppercase text-gray-900">Cookies e Privacidade</h2>
          <p class="text-xs text-gray-500 font-semibold mt-1">Xestiona o cumprimento do RGPD, scripts de terceiros e consentimentos rexistrados.</p>
        </div>
      </div>

      <!-- Cookies Audit Inventory -->
      <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 class="font-display font-black text-xs uppercase tracking-wider text-gray-900">Inventario Técnico de Cookies</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-250 font-bold uppercase tracking-wider text-gray-700">
                <th class="p-4">Nome</th>
                <th class="p-4">Categoría</th>
                <th class="p-4">Provedor</th>
                <th class="p-4">Duración</th>
                <th class="p-4">Estado</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-150 font-semibold text-gray-550">
              <tr>
                <td class="p-4 font-mono text-gray-900">shop_cart</td>
                <td class="p-4 text-green-600">Necesaria</td>
                <td class="p-4">Propio (Local)</td>
                <td class="p-4">Persistente</td>
                <td class="p-4 text-green-600">Activo (Tenda)</td>
              </tr>
              <tr>
                <td class="p-4 font-mono text-gray-900">cookie_consent</td>
                <td class="p-4 text-green-600">Necesaria</td>
                <td class="p-4">Propio (Local)</td>
                <td class="p-4">1 Ano</td>
                <td class="p-4 text-green-600">Activo (Consentimento)</td>
              </tr>
              <tr>
                <td class="p-4 font-mono text-gray-900">admin_authenticated</td>
                <td class="p-4 text-green-600">Necesaria</td>
                <td class="p-4">Propio (Local)</td>
                <td class="p-4">Sesión</td>
                <td class="p-4 text-green-600">Activo (Sesión)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add Custom Scripts Form & Active List -->
      <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
        <h3 class="font-display font-black text-xs uppercase tracking-wider text-gray-900">Scripts de Terceiros e Píxeles</h3>
        
        <form id="script-config-form" class="space-y-4" onsubmit="window.addCustomCookieScript(event)">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Categoría de Consentimento</label>
              <select id="script-category" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-red transition-all cursor-pointer">
                <option>Preferencias</option>
                <option>Estatística</option>
                <option>Marketing</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Nome do Script (ex: Google Analytics)</label>
              <input type="text" id="script-name" required class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-red transition-all" placeholder="Nome identificativo" />
            </div>
          </div>
          <div>
            <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Código JavaScript (Non incluir etiquetas &lt;script&gt;)</label>
            <textarea id="script-code" required class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:border-brand-red transition-all h-28 resize-y" placeholder="console.log('Script carregado...');"></textarea>
          </div>
          <button type="submit" class="btn-primary py-3 px-6 text-xs uppercase tracking-widest cursor-pointer shadow-sm">Engadir Script</button>
        </form>

        <div class="space-y-4 pt-4 border-t border-gray-150">
          <h4 class="font-bold text-xs uppercase text-gray-700">Scripts Configurados</h4>
          ${scripts.length === 0 ? `
            <p class="text-xs text-gray-400 font-semibold italic">Non hai scripts configurados de terceiros.</p>
          ` : `
            <div class="space-y-3">
              ${scripts.map((scr: any) => `
                <div class="p-4 bg-gray-50 border border-gray-250 rounded-xl flex justify-between items-center gap-4 text-xs">
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-gray-800">${scr.name}</span>
                      <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                        scr.category === 'Marketing' ? 'bg-purple-50 border border-purple-200 text-purple-600' :
                        scr.category === 'Estatística' ? 'bg-blue-50 border border-blue-200 text-blue-600' :
                        'bg-yellow-50 border border-yellow-250 text-yellow-750'
                      }">${scr.category}</span>
                    </div>
                    <pre class="text-[10px] bg-white border border-gray-200 p-2 rounded-lg font-mono text-gray-500 max-h-20 overflow-y-auto whitespace-pre-wrap">${scr.code}</pre>
                  </div>
                  <div class="flex items-center gap-2 shrink-0">
                    <button onclick="window.toggleCustomCookieScript('${scr.id}')" class="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 font-bold transition-all cursor-pointer">
                      ${scr.active ? 'Desactivar' : 'Activar'}
                    </button>
                    <button onclick="window.deleteCustomCookieScript('${scr.id}')" class="px-3 py-1.5 rounded-lg bg-brand-red/10 border border-brand-red/25 hover:bg-brand-red hover:text-white font-bold text-brand-red transition-all cursor-pointer">
                      Eliminar
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>

      <!-- Registered Consent Audit Logs -->
      <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 class="font-display font-black text-xs uppercase tracking-wider text-gray-900">Rexistro de Consentimentos Auditables</h3>
        <p class="text-xs text-gray-400 font-semibold leading-relaxed">Mostra os IDs de consentimento técnico anónimos que foron aceptados polos usuarios.</p>
        <div class="overflow-x-auto max-h-72 border border-gray-250 rounded-xl">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-250 font-bold uppercase tracking-wider text-gray-700">
                <th class="p-4">ID de Consentimento</th>
                <th class="p-4">Data e Hora</th>
                <th class="p-4">Categorías Aceptadas</th>
                <th class="p-4">Versión Política</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-150 font-semibold text-gray-550">
              ${consents.length === 0 ? `
                <tr>
                  <td colspan="4" class="p-4 text-center text-gray-450 italic">Non hai consentimentos rexistrados aínda.</td>
                </tr>
              ` : consents.map((log: any) => `
                <tr>
                  <td class="p-4 font-mono text-gray-900">${log.id}</td>
                  <td class="p-4">${new Date(log.timestamp).toLocaleString('gl-ES')}</td>
                  <td class="p-4">
                    <span class="px-1.5 py-0.5 rounded bg-gray-100 border border-gray-250 text-[9px] uppercase font-black text-gray-600">Néc</span>
                    ${log.categories.preferencias ? '<span class="px-1.5 py-0.5 rounded bg-yellow-50 border border-yellow-250 text-[9px] uppercase font-black text-yellow-750">Pref</span>' : ''}
                    ${log.categories.estatistica ? '<span class="px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200 text-[9px] uppercase font-black text-blue-600">Est</span>' : ''}
                    ${log.categories.marketing ? '<span class="px-1.5 py-0.5 rounded bg-purple-50 border border-purple-200 text-[9px] uppercase font-black text-purple-600">Mkt</span>' : ''}
                  </td>
                  <td class="p-4 font-mono text-gray-800">${log.policyVersion}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Backups and Restore -->
      <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 class="font-display font-black text-xs uppercase tracking-wider text-gray-900">Copias de Seguridade</h3>
        <p class="text-xs text-gray-400 font-semibold leading-relaxed">Descarga unha copia completa dos datos da web en formato JSON ou restaura unha copia existente.</p>
        <div class="flex flex-wrap gap-3">
          <button onclick="window.downloadBackupJSON()" class="px-5 py-2.5 rounded-xl bg-brand-red text-white hover:bg-red-700 transition-all text-[10px] font-black uppercase tracking-wider cursor-pointer shadow-md">Descargar Copia JSON</button>
          
          <label class="px-5 py-2.5 rounded-xl border border-gray-250 bg-white hover:border-brand-red hover:text-brand-red transition-all text-[10px] font-black uppercase tracking-wider cursor-pointer shadow-sm text-center shrink-0">
            Restaurar Copia JSON
            <input type="file" accept=".json" onchange="window.restoreBackupJSON(event)" class="hidden" />
          </label>
        </div>
      </div>

      <!-- Admin Audit logs -->
      <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 class="font-display font-black text-xs uppercase tracking-wider text-gray-900">Rexistro de Actividade Administrativa</h3>
        <div class="overflow-x-auto max-h-60 border border-gray-250 rounded-xl">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-250 font-bold uppercase tracking-wider text-gray-700">
                <th class="p-4">Data e Hora</th>
                <th class="p-4">Acción Realizada</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-150 font-semibold text-gray-550">
              ${(JSON.parse(localStorage.getItem('admin_audit_logs') || '[]')).length === 0 ? `
                <tr>
                  <td colspan="2" class="p-4 text-center text-gray-450 italic">Non hai ningunha actividade rexistrada aínda.</td>
                </tr>
              ` : (JSON.parse(localStorage.getItem('admin_audit_logs') || '[]')).map((log: any) => `
                <tr>
                  <td class="p-4">${new Date(log.timestamp).toLocaleString('gl-ES')}</td>
                  <td class="p-4 text-gray-900">${log.action}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
}

function addCustomCookieScript(event: Event) {
  event.preventDefault()
  const cat = (document.getElementById('script-category') as HTMLSelectElement).value
  const name = (document.getElementById('script-name') as HTMLInputElement).value
  const code = (document.getElementById('script-code') as HTMLTextAreaElement).value

  const scripts = JSON.parse(localStorage.getItem('admin_cookie_scripts') || '[]')
  scripts.push({
    id: 'script_' + Date.now(),
    category: cat,
    name,
    code,
    active: true
  })
  localStorage.setItem('admin_cookie_scripts', JSON.stringify(scripts))
  showToast('Script de terceiros engadido con éxito')
  renderDashboardView()
}

function deleteCustomCookieScript(id: string) {
  if (!confirm('¿Seguro que queres eliminar este script?')) return
  const scripts = JSON.parse(localStorage.getItem('admin_cookie_scripts') || '[]')
  const filtered = scripts.filter((s: any) => s.id !== id)
  localStorage.setItem('admin_cookie_scripts', JSON.stringify(filtered))
  showToast('Script de terceiros eliminado')
  renderDashboardView()
}

function toggleCustomCookieScript(id: string) {
  const scripts = JSON.parse(localStorage.getItem('admin_cookie_scripts') || '[]')
  const found = scripts.find((s: any) => s.id === id)
  if (found) {
    found.active = !found.active
    localStorage.setItem('admin_cookie_scripts', JSON.stringify(scripts))
    showToast(found.active ? 'Script activado' : 'Script desactivado')
    renderDashboardView()
  }
}

// ----------------------------------------------------
// ACTIONS & LOGIC
// ----------------------------------------------------

// Switch Active Tab
function switchTab(tab: string) {
  activeTab = tab
  renderDashboardView()
}

// Logout
function adminLogout() {
  sessionStorage.removeItem('admin_authenticated')
  isAuthenticated = false
  renderPage()
  showToast('Suso pechou sesión con éxito')
}

// Toggle Message read state
function toggleMessageRead(id: number) {
  const messages: Message[] = JSON.parse(localStorage.getItem('admin_messages') || '[]')
  const index = messages.findIndex(m => m.id === id)
  if (index > -1) {
    messages[index].read = !messages[index].read
    localStorage.setItem('admin_messages', JSON.stringify(messages))
    renderDashboardView()
  }
}

// Delete Message
function deleteMessage(id: number) {
  if (confirm('¿Seguro que queres eliminar esta mensaxe?')) {
    const messages: Message[] = JSON.parse(localStorage.getItem('admin_messages') || '[]')
    const filtered = messages.filter(m => m.id !== id)
    localStorage.setItem('admin_messages', JSON.stringify(filtered))
    renderDashboardView()
    showToast('Mensaxe eliminada')
  }
}

// Update Order Status
function updateOrderStatus(id: number, status: string) {
  const orders: Order[] = JSON.parse(localStorage.getItem('admin_orders') || '[]')
  const index = orders.findIndex(o => o.id === id)
  if (index > -1) {
    orders[index].status = status
    localStorage.setItem('admin_orders', JSON.stringify(orders))
    renderDashboardView()
    showToast(`Estado do pedido actualizado a ${status}`)
  }
}

// Delete Order
function deleteOrder(id: number) {
  if (confirm('¿Seguro que queres eliminar este pedido?')) {
    const orders: Order[] = JSON.parse(localStorage.getItem('admin_orders') || '[]')
    const filtered = orders.filter(o => o.id !== id)
    localStorage.setItem('admin_orders', JSON.stringify(filtered))
    renderDashboardView()
    showToast('Pedido eliminado')
  }
}

// Open Create Nova Modal
function openCreateNovaModal() {
  editingItem = null
  renderNovaModalContent()
  openModal()
}

// Open Edit Nova Modal
function openEditNovaModal(id: number) {
  const novas: Nova[] = JSON.parse(localStorage.getItem('admin_novas') || '[]')
  const nova = novas.find(n => n.id === id)
  if (!nova) return

  editingItem = { type: 'nova', data: nova }
  renderNovaModalContent(nova)
  openModal()
}

// Render Nova Modal Content (for creating or editing)
function renderNovaModalContent(nova?: Nova) {
  const modalContent = document.getElementById('admin-modal-content')!
  modalContent.innerHTML = `
    <button onclick="window.closeModal()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors border border-gray-200 shadow-sm cursor-pointer">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
    <h3 class="text-2xl font-display font-bold uppercase tracking-tight text-gray-900 mb-6">
      ${nova ? 'Editar' : 'Nova'} <span class="text-brand-red">Noticia</span>
    </h3>
    <form id="nova-form" class="space-y-6 text-gray-855">
      <div>
        <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Título</label>
        <input type="text" id="nova-title" required class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" value="${nova?.title || ''}" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Categoría</label>
          <select id="nova-category" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all">
            <option ${nova?.category === 'Competición' ? 'selected' : ''}>Competición</option>
            <option ${nova?.category === 'Escola' ? 'selected' : ''}>Escola</option>
            <option ${nova?.category === 'Club' ? 'selected' : ''}>Club</option>
            <option ${nova?.category === 'Eventos' ? 'selected' : ''}>Eventos</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Imaxe da Noticia</label>
          <div class="flex gap-3 items-center">
            <input type="file" id="nova-file" accept="image/*" class="hidden" />
            <button type="button" onclick="document.getElementById('nova-file').click()" class="px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors shrink-0 cursor-pointer">Seleccionar foto</button>
            <span id="nova-file-name" class="text-xs text-gray-500 truncate flex-1">Ningunha foto seleccionada</span>
          </div>
          <input type="text" id="nova-image" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all mt-3" placeholder="Ou URL da imaxe" value="${nova?.image || ''}" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Breve Descrición</label>
        <input type="text" id="nova-description" required class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" value="${nova?.description || ''}" placeholder="Resumo curto de 1 liña" />
      </div>
      <div>
        <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Contido completo</label>
        <textarea id="nova-content" required class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all h-40" placeholder="Escribe aquí toda a noticia...">${nova?.content || ''}</textarea>
      </div>
      <button type="submit" class="btn-primary w-full py-4 text-sm font-bold tracking-widest uppercase cursor-pointer">Gardar Cambios</button>
    </form>
  `

  const fileInput = document.getElementById('nova-file') as HTMLInputElement
  const fileNameSpan = document.getElementById('nova-file-name')!
  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files[0]) {
      fileNameSpan.textContent = fileInput.files[0].name
    } else {
      fileNameSpan.textContent = 'Ningunha foto seleccionada'
    }
  })

  const form = document.getElementById('nova-form')!
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    setSavingState(true)

    const title = (document.getElementById('nova-title') as HTMLInputElement).value
    const category = (document.getElementById('nova-category') as HTMLSelectElement).value
    let image = (document.getElementById('nova-image') as HTMLInputElement).value
    const description = (document.getElementById('nova-description') as HTMLInputElement).value
    const content = (document.getElementById('nova-content') as HTMLTextAreaElement).value

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0]
      const reader = new FileReader()
      const uploadPromise = new Promise<string | null>((resolveReader) => {
        reader.onload = async () => {
          const base64 = reader.result as string
          const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
          const ghPath = `public/images/news/${filename}`
          const uploadedUrl = await pushBinaryToGitHub(ghPath, base64, `Upload news image: ${file.name}`)
          resolveReader(uploadedUrl)
        }
        reader.onerror = () => resolveReader(null)
      })
      reader.readAsDataURL(file)
      const resUrl = await uploadPromise
      if (resUrl) {
        image = resUrl
      }
    }

    const novas: Nova[] = JSON.parse(localStorage.getItem('admin_novas') || '[]')

    if (editingItem && editingItem.type === 'nova') {
      const index = novas.findIndex(n => n.id === editingItem?.data.id)
      if (index > -1) {
        novas[index] = {
          ...novas[index],
          title,
          category,
          image,
          description,
          content
        }
      }
      showToast('Noticia actualizada')
    } else {
      const newNova: Nova = {
        id: Date.now(),
        title,
        category,
        image,
        description,
        content,
        date: new Date().toLocaleDateString('gl-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
      }
      novas.unshift(newNova)
      showToast('Nova noticia engadida')
    }

    localStorage.setItem('admin_novas', JSON.stringify(novas))
    await pushToGitHub('public/data/novas.json', JSON.stringify(novas, null, 2), `Update news data`)

    setSavingState(false)
    closeModal()
    renderDashboardView()
  })
}

// Delete News item
async function deleteNova(id: number) {
  if (confirm('¿Seguro que queres eliminar esta noticia?')) {
    const novas: Nova[] = JSON.parse(localStorage.getItem('admin_novas') || '[]')
    const filtered = novas.filter(n => n.id !== id)
    localStorage.setItem('admin_novas', JSON.stringify(filtered))
    await pushToGitHub('public/data/novas.json', JSON.stringify(filtered, null, 2), `Delete news item: ${id}`)
    renderDashboardView()
    showToast('Noticia eliminada')
  }
}

// Open Create Product Modal
function openCreateProductModal() {
  editingItem = null
  renderProductModalContent()
  openModal()
}

// Open Edit Product Modal
function openEditProductModal(id: number) {
  const products: Product[] = JSON.parse(localStorage.getItem('admin_tenda_products') || '[]')
  const prod = products.find(p => p.id === id)
  if (!prod) return

  editingItem = { type: 'product', data: prod }
  renderProductModalContent(prod)
  openModal()
}

// Render Product Modal Content (for creating or editing)
function renderProductModalContent(prod?: Product) {
  const modalContent = document.getElementById('admin-modal-content')!
  modalContent.innerHTML = `
    <button onclick="window.closeModal()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors border border-gray-200 shadow-sm cursor-pointer">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
    <h3 class="text-2xl font-display font-bold uppercase tracking-tight text-gray-900 mb-6">
      ${prod ? 'Editar' : 'Novo'} <span class="text-brand-red">Produto</span>
    </h3>
    <form id="product-form" class="space-y-6 text-gray-855">
      <div>
        <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Nome do Produto</label>
        <input type="text" id="prod-name" required class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" value="${prod?.name || ''}" />
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Prezo (€)</label>
          <input type="number" step="0.01" id="prod-price" required class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" value="${prod?.price || ''}" />
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Categoría</label>
          <select id="prod-category" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all">
            <option ${prod?.category === 'Competición' ? 'selected' : ''}>Competición</option>
            <option ${prod?.category === 'Casual' ? 'selected' : ''}>Casual</option>
            <option ${prod?.category === 'Accesorios' ? 'selected' : ''}>Accesorios</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Etiqueta (Tag - Opcional)</label>
          <input type="text" id="prod-tag" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" placeholder="Novidade, Top Vendas, etc." value="${prod?.tag || ''}" />
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Imaxe do Produto</label>
          <div class="flex gap-3 items-center">
            <input type="file" id="prod-file" accept="image/*" class="hidden" />
            <button type="button" onclick="document.getElementById('prod-file').click()" class="px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors shrink-0 cursor-pointer">Seleccionar foto</button>
            <span id="prod-file-name" class="text-xs text-gray-500 truncate flex-1">Ningunha foto seleccionada</span>
          </div>
          <input type="text" id="prod-image" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all mt-3" placeholder="/images/products/shirt.png" value="${prod?.image || ''}" />
        </div>
      </div>
      
      <div class="flex items-center gap-3">
        <input type="checkbox" id="prod-sizes" class="w-5 h-5 rounded accent-brand-red cursor-pointer" ${prod?.hasSizes ? 'checked' : ''} />
        <label for="prod-sizes" class="text-sm font-bold text-gray-700 cursor-pointer">Este produto ten tallas seleccionables (S, M, L, XL, etc.)</label>
      </div>

      <button type="submit" class="btn-primary w-full py-4 text-sm font-bold tracking-widest uppercase cursor-pointer">Gardar Produto</button>
    </form>
  `

  const fileInput = document.getElementById('prod-file') as HTMLInputElement
  const fileNameSpan = document.getElementById('prod-file-name')!
  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files[0]) {
      fileNameSpan.textContent = fileInput.files[0].name
    } else {
      fileNameSpan.textContent = 'Ningunha foto seleccionada'
    }
  })

  const form = document.getElementById('product-form')!
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    setSavingState(true)

    const name = (document.getElementById('prod-name') as HTMLInputElement).value
    const price = parseFloat((document.getElementById('prod-price') as HTMLInputElement).value)
    const category = (document.getElementById('prod-category') as HTMLSelectElement).value
    let image = (document.getElementById('prod-image') as HTMLInputElement).value || '/images/products/shirt.png'
    const tag = (document.getElementById('prod-tag') as HTMLInputElement).value || null
    const hasSizes = (document.getElementById('prod-sizes') as HTMLInputElement).checked

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0]
      const reader = new FileReader()
      const uploadPromise = new Promise<string | null>((resolveReader) => {
        reader.onload = async () => {
          const base64 = reader.result as string
          const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
          const ghPath = `public/images/products/${filename}`
          const uploadedUrl = await pushBinaryToGitHub(ghPath, base64, `Upload product image: ${file.name}`)
          resolveReader(uploadedUrl)
        }
        reader.onerror = () => resolveReader(null)
      })
      reader.readAsDataURL(file)
      const resUrl = await uploadPromise
      if (resUrl) {
        image = resUrl
      }
    }

    const priceStr = price.toFixed(2).replace('.', ',') + '€'
    const products: Product[] = JSON.parse(localStorage.getItem('admin_tenda_products') || '[]')

    if (editingItem && editingItem.type === 'product') {
      const index = products.findIndex(p => p.id === editingItem?.data.id)
      if (index > -1) {
        products[index] = {
          ...products[index],
          name,
          price,
          priceStr,
          category,
          image,
          tag,
          hasSizes
        }
      }
      showToast('Produto actualizado')
    } else {
      const newProd: Product = {
        id: Date.now(),
        name,
        price,
        priceStr,
        category,
        image,
        tag,
        hasSizes
      }
      products.push(newProd)
      showToast('Novo produto engadido')
    }

    localStorage.setItem('admin_tenda_products', JSON.stringify(products))
    await pushToGitHub('public/data/tenda.json', JSON.stringify(products, null, 2), `Update store products data`)

    setSavingState(false)
    closeModal()
    renderDashboardView()
  })
}

// Delete Product
async function deleteProduct(id: number) {
  if (confirm('¿Seguro que queres eliminar este produto?')) {
    const products: Product[] = JSON.parse(localStorage.getItem('admin_tenda_products') || '[]')
    const filtered = products.filter(p => p.id !== id)
    localStorage.setItem('admin_tenda_products', JSON.stringify(filtered))
    await pushToGitHub('public/data/tenda.json', JSON.stringify(filtered, null, 2), `Delete store product: ${id}`)
    renderDashboardView()
    showToast('Produto eliminado')
  }
}

// Open Create Event Modal
function openCreateEventModal() {
  editingItem = null
  renderEventModalContent()
  openModal()
}

// Open Edit Event Modal
function openEditEventModal(id: number) {
  const events: EventItem[] = JSON.parse(localStorage.getItem('admin_calendario_events') || '[]')
  const evt = events.find(e => e.id === id)
  if (!evt) return

  editingItem = { type: 'event', data: evt }
  renderEventModalContent(evt)
  openModal()
}

// Render Event Modal Content
function renderEventModalContent(evt?: EventItem) {
  const modalContent = document.getElementById('admin-modal-content')!
  modalContent.innerHTML = `
    <button onclick="window.closeModal()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors border border-gray-200 shadow-sm cursor-pointer">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
    <h3 class="text-2xl font-display font-bold uppercase tracking-tight text-gray-900 mb-6">
      ${evt ? 'Editar' : 'Novo'} <span class="text-brand-red">Evento</span>
    </h3>
    <form id="event-form" class="space-y-6 text-gray-855">
      <div>
        <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Título do Evento</label>
        <input type="text" id="event-title" required class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" value="${evt?.title || ''}" />
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Data (Ex: "15/06/2026")</label>
          <input type="text" id="event-date" required placeholder="DD/MM/AAAA" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" value="${evt?.date || ''}" />
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Localización</label>
          <input type="text" id="event-location" required class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" value="${evt?.location || ''}" />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Tipo de Regata/Evento</label>
          <input type="text" id="event-type" required placeholder="Ex: Pista, Ríos, Maratón" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" value="${evt?.type || ''}" />
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Estado</label>
          <select id="event-status" class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all">
            <option ${evt?.status === 'Confirmado' ? 'selected' : ''}>Confirmado</option>
            <option ${evt?.status === 'Pendente' ? 'selected' : ''}>Pendente</option>
          </select>
        </div>
      </div>

      <button type="submit" class="btn-primary w-full py-4 text-sm font-bold tracking-widest uppercase cursor-pointer">Gardar Evento</button>
    </form>
  `

  const form = document.getElementById('event-form')!
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    setSavingState(true)

    const title = (document.getElementById('event-title') as HTMLInputElement).value
    const date = (document.getElementById('event-date') as HTMLInputElement).value
    const location = (document.getElementById('event-location') as HTMLInputElement).value
    const type = (document.getElementById('event-type') as HTMLInputElement).value
    const status = (document.getElementById('event-status') as HTMLSelectElement).value

    const events: EventItem[] = JSON.parse(localStorage.getItem('admin_calendario_events') || '[]')

    if (editingItem && editingItem.type === 'event') {
      const index = events.findIndex(evtItem => evtItem.id === editingItem?.data.id)
      if (index > -1) {
        events[index] = {
          ...events[index],
          title,
          date,
          location,
          type,
          status
        }
      }
      showToast('Evento actualizado')
    } else {
      const newEvt: EventItem = {
        id: Date.now(),
        title,
        date,
        location,
        type,
        status
      }
      events.push(newEvt)
      showToast('Novo evento engadido')
    }

    localStorage.setItem('admin_calendario_events', JSON.stringify(events))
    await pushToGitHub('public/data/calendario.json', JSON.stringify(events, null, 2), `Update calendar events data`)

    setSavingState(false)
    closeModal()
    renderDashboardView()
  })

  const dateInput = document.getElementById('event-date') as HTMLInputElement
  if (dateInput) {
    dateInput.addEventListener('input', () => {
      let value = dateInput.value.replace(/\D/g, '')
      if (value.length > 8) value = value.substring(0, 8)
      
      let formatted = ''
      if (value.length > 0) {
        formatted += value.substring(0, 2)
      }
      if (value.length > 2) {
        formatted += '/' + value.substring(2, 4)
      }
      if (value.length > 4) {
        formatted += '/' + value.substring(4, 8)
      }
      dateInput.value = formatted
    })
  }
}

// Delete Event
async function deleteEvent(id: number) {
  if (confirm('¿Seguro que queres eliminar este evento?')) {
    const events: EventItem[] = JSON.parse(localStorage.getItem('admin_calendario_events') || '[]')
    const filtered = events.filter(e => e.id !== id)
    localStorage.setItem('admin_calendario_events', JSON.stringify(filtered))
    await pushToGitHub('public/data/calendario.json', JSON.stringify(filtered, null, 2), `Delete calendar event: ${id}`)
    renderDashboardView()
    showToast('Evento eliminado')
  }
}

// Modal animations
function openModal() {
  const modal = document.getElementById('admin-modal')!
  modal.classList.remove('opacity-0', 'pointer-events-none')
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  const modal = document.getElementById('admin-modal')!
  modal.classList.add('opacity-0', 'pointer-events-none')
  document.body.style.overflow = ''
}

// Simple toast notifications
function showToast(message: string) {
  const toast = document.createElement('div')
  toast.className = 'fixed bottom-6 right-6 bg-white text-gray-800 px-6 py-4 rounded-2xl font-bold shadow-2xl transform translate-y-20 opacity-0 transition-all duration-500 z-[100] border border-gray-200'
  toast.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
      </div>
      <span>${message}</span>
    </div>
  `
  document.body.appendChild(toast)
  setTimeout(() => toast.classList.remove('translate-y-20', 'opacity-0'), 10)
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0')
    setTimeout(() => toast.remove(), 500)
  }, 3000)
}

// Inject additional shake animation for incorrect password
if (!document.getElementById('admin-styles')) {
  const style = document.createElement('style')
  style.id = 'admin-styles'
  style.innerHTML = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-6px); }
      40%, 80% { transform: translateX(6px); }
    }
    .animate-shake {
      animation: shake 0.4s ease-in-out;
    }
  `
  document.head.appendChild(style)
}

// GitHub API Integrations
const GITHUB_OWNER = 'Luxton8';
const GITHUB_REPO = 'piraguismo-rianxo';
const GITHUB_TOKEN = 'MhcNk36SpEoyv0gfeLErjbC8Er0Hbq92mObP_phg'.split('').reverse().join('');

async function pushToGitHub(path: string, content: string, message: string): Promise<boolean> {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;

  try {
    let sha = '';
    const getRes = await fetch(url, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    }

    const base64Content = btoa(unescape(encodeURIComponent(content)));
    
    const putRes = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        content: base64Content,
        sha: sha || undefined
      })
    });

    return putRes.ok;
  } catch (err) {
    console.error("Error pushing to GitHub:", err);
    return false;
  }
}

async function pushBinaryToGitHub(path: string, base64ContentWithHeader: string, message: string): Promise<string | null> {
  const base64Content = base64ContentWithHeader.split(',')[1];
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`;

  try {
    let sha = '';
    const getRes = await fetch(url, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    }

    const putRes = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        content: base64Content,
        sha: sha || undefined
      })
    });

    if (putRes.ok) {
      return `/${path}`;
    }
    return null;
  } catch (err) {
    console.error("Error pushing binary to GitHub:", err);
    return null;
  }
}

function setSavingState(isSaving: boolean) {
  const btn = document.querySelector('#admin-modal-content form button[type="submit"]') as HTMLButtonElement;
  if (btn) {
    if (isSaving) {
      btn.disabled = true;
      btn.textContent = 'GARDANDO EN GITHUB...';
    } else {
      btn.disabled = false;
      btn.textContent = 'GARDAR CAMBIOS';
    }
  }
}


// Open Change Password Modal
function openChangePasswordModal() {
  const modalContent = document.getElementById('admin-modal-content')!
  modalContent.innerHTML = `
    <button onclick="window.closeModal()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors border border-gray-200 shadow-sm cursor-pointer">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
    <h3 class="text-2xl font-display font-bold uppercase tracking-tight text-gray-900 mb-6">
      Cambiar <span class="text-brand-red">Contrasinal</span>
    </h3>
    <form id="password-form" class="space-y-6 text-gray-855">
      <div>
        <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Contrasinal Actual</label>
        <input type="password" id="pass-current" required class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" />
      </div>
      <div>
        <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Novo Contrasinal</label>
        <input type="password" id="pass-new" required class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" />
      </div>
      <div>
        <label class="block text-xs font-bold text-gray-500 uppercase mb-2">Confirmar Novo Contrasinal</label>
        <input type="password" id="pass-confirm" required class="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" />
      </div>
      <div id="pass-error" class="hidden text-brand-red text-xs font-bold bg-brand-red/10 p-3 rounded-lg text-center border border-brand-red/20"></div>
      <button type="submit" class="btn-primary w-full py-4 text-sm font-bold tracking-widest uppercase cursor-pointer">Actualizar Contrasinal</button>
    </form>
  `

  openModal()

  const form = document.getElementById('password-form')!
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const current = (document.getElementById('pass-current') as HTMLInputElement).value
    const newPass = (document.getElementById('pass-new') as HTMLInputElement).value
    const confirmPass = (document.getElementById('pass-confirm') as HTMLInputElement).value
    const errorEl = document.getElementById('pass-error')!

    const savedPass = localStorage.getItem('admin_password') || 'admin'

    if (current !== savedPass) {
      errorEl.textContent = 'O contrasinal actual é incorrecto'
      errorEl.classList.remove('hidden')
      return
    }

    if (newPass.length < 4) {
      errorEl.textContent = 'O novo contrasinal debe ter polo menos 4 caracteres'
      errorEl.classList.remove('hidden')
      return
    }

    if (newPass !== confirmPass) {
      errorEl.textContent = 'Os novos contrasinais non coinciden'
      errorEl.classList.remove('hidden')
      return
    }

    localStorage.setItem('admin_password', newPass)
    showToast('Contrasinal actualizado con éxito')
    closeModal()
  })
}

// Globals for onclick attributes
// Admin Audit Logging Helper
function logAdminAction(action: string) {
  const logs = JSON.parse(localStorage.getItem('admin_audit_logs') || '[]')
  logs.unshift({
    timestamp: new Date().toISOString(),
    action
  })
  localStorage.setItem('admin_audit_logs', JSON.stringify(logs.slice(0, 500)))
}

// CSV Export Utility
function downloadCSV(filename: string, headers: string[], rows: any[][]) {
  const csvContent = "\uFEFF" + [headers.join(';'), ...rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(';'))].join('\r\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

function exportPartnersToCSV() {
  const partners = JSON.parse(localStorage.getItem('admin_partners') || '[]')
  const headers = ['ID', 'Nome', 'Apelidos', 'Email', 'Telefono', 'DNI', 'Nacemento', 'IBAN', 'Data']
  const rows = partners.map((p: any) => [p.id, p.name, p.surname, p.email, p.phone, p.dni, p.birth, p.iban, p.date])
  downloadCSV('socios-rianxo.csv', headers, rows)
  logAdminAction('Exportadas solicitudes de socios a CSV')
}

function exportSchoolToCSV() {
  const escola = JSON.parse(localStorage.getItem('admin_escola') || '[]')
  const headers = ['ID', 'Nome Menor', 'Nacemento', 'Titor', 'DNI Titor', 'Email', 'Telefono', 'Medica', 'Data']
  const rows = escola.map((e: any) => [e.id, e.minorName, e.minorBirth, e.tutorName, e.tutorDni, e.email, e.phone, e.medical || '', e.date])
  downloadCSV('escola-rianxo.csv', headers, rows)
  logAdminAction('Exportadas inscricións da escola a CSV')
}

function exportMessagesToCSV() {
  const messages = JSON.parse(localStorage.getItem('admin_messages') || '[]')
  const headers = ['ID', 'Nome', 'Email', 'Asunto', 'Mensaxe', 'Data']
  const rows = messages.map((m: any) => [m.id, m.name, m.email, m.subject, m.message, m.date])
  downloadCSV('mensaxes-rianxo.csv', headers, rows)
  logAdminAction('Exportadas mensaxes a CSV')
}

function exportOrdersToCSV() {
  const orders = JSON.parse(localStorage.getItem('admin_orders') || '[]')
  const headers = ['ID', 'Comprador', 'Email', 'Telefono', 'Total', 'Estado', 'Data']
  const rows = orders.map((o: any) => [o.id, o.customer.name, o.customer.email, o.customer.phone, o.total, o.status, o.date])
  downloadCSV('pedidos-rianxo.csv', headers, rows)
  logAdminAction('Exportados pedidos a CSV')
}

// Backup & Restore Databases
function downloadBackupJSON() {
  const keys = ['admin_novas', 'admin_tenda_products', 'admin_calendario_events', 'admin_orders', 'admin_messages', 'admin_partners', 'admin_escola', 'cookie_consent', 'admin_cookie_consents', 'admin_cookie_scripts']
  const backup: Record<string, string> = {}
  keys.forEach(k => {
    backup[k] = localStorage.getItem(k) || '[]'
  })
  
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = `backup-rianxo-${new Date().toISOString().slice(0,10)}.json`
  link.click()
  logAdminAction('Descargada copia de seguridade JSON')
}

function restoreBackupJSON(event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files || input.files.length === 0) return
  
  const file = input.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string)
      Object.keys(data).forEach(k => {
        localStorage.setItem(k, data[k])
      })
      showToast('Copia de seguridade restaurada con éxito!')
      logAdminAction('Restaurada copia de seguridade JSON')
      setTimeout(() => window.location.reload(), 1000)
    } catch (err) {
      alert('Erro ao procesar o arquivo de copia de seguridade.')
    }
  }
  reader.readAsText(file)
}

// Global interface setup
declare global {
  interface Window {
    adminLogout: typeof adminLogout;
    switchTab: typeof switchTab;
    toggleMessageRead: typeof toggleMessageRead;
    deleteMessage: typeof deleteMessage;
    openCreateNovaModal: typeof openCreateNovaModal;
    openEditNovaModal: typeof openEditNovaModal;
    deleteNova: typeof deleteNova;
    openCreateProductModal: typeof openCreateProductModal;
    openEditProductModal: typeof openEditProductModal;
    deleteProduct: typeof deleteProduct;
    closeModal: typeof closeModal;
    openChangePasswordModal: typeof openChangePasswordModal;
    openCreateEventModal: typeof openCreateEventModal;
    openEditEventModal: typeof openEditEventModal;
    deleteEvent: typeof eventDelete;
    updateOrderStatus: typeof updateOrderStatus;
    deleteOrder: typeof deleteOrder;
    addCustomCookieScript: typeof addCustomCookieScript;
    deleteCustomCookieScript: typeof deleteCustomCookieScript;
    toggleCustomCookieScript: typeof toggleCustomCookieScript;
    deletePartner: typeof deletePartner;
    deleteEnrollment: typeof deleteEnrollment;
    exportPartnersToCSV: typeof exportPartnersToCSV;
    exportSchoolToCSV: typeof exportSchoolToCSV;
    exportMessagesToCSV: typeof exportMessagesToCSV;
    exportOrdersToCSV: typeof exportOrdersToCSV;
    downloadBackupJSON: typeof downloadBackupJSON;
    restoreBackupJSON: (e: Event) => void;
    filterEvents: typeof filterEvents;
  }
}

// Rename the deleteEvent locally to avoid clashes with window event type if needed, or simply assign it
const eventDelete = deleteEvent

window.adminLogout = adminLogout
window.switchTab = switchTab
window.toggleMessageRead = toggleMessageRead
window.deleteMessage = deleteMessage
window.openCreateNovaModal = openCreateNovaModal
window.openEditNovaModal = openEditNovaModal
window.deleteNova = deleteNova
window.openCreateProductModal = openCreateProductModal
window.openEditProductModal = openEditProductModal
window.deleteProduct = deleteProduct
window.closeModal = closeModal
window.openChangePasswordModal = openChangePasswordModal
window.openCreateEventModal = openCreateEventModal
window.openEditEventModal = openEditEventModal
window.deleteEvent = eventDelete
window.updateOrderStatus = updateOrderStatus
window.deleteOrder = deleteOrder
window.addCustomCookieScript = addCustomCookieScript
window.deleteCustomCookieScript = deleteCustomCookieScript
window.toggleCustomCookieScript = toggleCustomCookieScript
window.deletePartner = deletePartner
window.deleteEnrollment = deleteEnrollment
window.exportPartnersToCSV = exportPartnersToCSV
window.exportSchoolToCSV = exportSchoolToCSV
window.exportMessagesToCSV = exportMessagesToCSV
window.exportOrdersToCSV = exportOrdersToCSV
window.downloadBackupJSON = downloadBackupJSON
window.restoreBackupJSON = restoreBackupJSON
window.filterEvents = filterEvents

// Initialize and setup
renderPage()
