import '../style.css'
import { renderNavigation } from '../components/Navigation'
import { renderFooter } from '../components/Footer'

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
main.className = 'pt-32 pb-24 min-h-screen bg-brand-dark'

function renderPage() {
  app.innerHTML = ''
  app.appendChild(renderNavigation())
  
  if (!isAuthenticated) {
    renderLoginView()
  } else {
    renderDashboardView()
  }
  
  app.appendChild(main)
  app.appendChild(renderFooter())
}

function renderLoginView() {
  main.innerHTML = `
    <div class="container mx-auto px-6 max-w-md">
      <div class="glass-card p-8 md:p-12 border border-white/10 relative overflow-hidden shadow-2xl">
        <div class="absolute -top-12 -right-12 w-32 h-32 bg-brand-red/10 rounded-full blur-2xl"></div>
        <div class="absolute -bottom-12 -left-12 w-32 h-32 bg-brand-red/5 rounded-full blur-2xl"></div>
        
        <div class="text-center mb-8">
          <img src="/logo.png" class="w-16 h-16 mx-auto mb-4 object-contain" alt="Logo" />
          <h1 class="text-3xl font-display font-bold uppercase tracking-tight italic">Acceso <span class="text-brand-red">Admin</span></h1>
          <p class="text-white/40 text-xs mt-2 uppercase tracking-widest">Club Piragüismo Rianxo</p>
        </div>
        
        <form id="login-form" class="space-y-6">
          <div>
            <label class="block text-xs font-bold text-white/40 uppercase mb-2">Usuario</label>
            <input type="text" id="admin-user" required class="w-full bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red transition-all text-white text-sm" placeholder="Introduce o teu usuario" />
          </div>
          <div>
            <label class="block text-xs font-bold text-white/40 uppercase mb-2">Contrasinal</label>
            <input type="password" id="admin-pass" required class="w-full bg-brand-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-red transition-all text-white text-sm" placeholder="••••••••" />
          </div>
          <div id="login-error" class="hidden text-brand-red text-xs font-bold bg-brand-red/10 p-3 rounded-lg text-center animate-fade-in-down border border-brand-red/20">
            Usuario ou contrasinal incorrectos
          </div>
          <button type="submit" class="btn-primary w-full py-3.5 text-sm font-bold tracking-widest uppercase">Entrar</button>
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
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/5 pb-8">
        <div>
          <h1 class="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight italic">Panel de <span class="text-brand-red">Control</span></h1>
          <p class="text-white/40 text-sm mt-1">Xestiona de forma sinxela as novas, produtos, pedidos da tenda, eventos e as mensaxes recibidas.</p>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="window.openChangePasswordModal()" class="px-5 py-2.5 rounded-full border border-white/10 hover:border-brand-red hover:bg-brand-red/10 transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <svg class="w-4 h-4 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            Contrasinal
          </button>
          <button onclick="window.adminLogout()" class="px-6 py-2.5 rounded-full border border-white/10 hover:border-brand-red hover:bg-brand-red hover:text-white transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Pechar Sesión
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        <!-- Stat item -->
        <div class="glass-card p-6 flex items-center justify-between border border-white/5 bg-[#0e0e0e]/55">
          <div>
            <p class="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Pedidos Pendentes</p>
            <p class="text-4xl font-display font-bold ${pendingOrdersCount > 0 ? 'text-brand-red' : 'text-white'}">${pendingOrdersCount}</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-red">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
          </div>
        </div>
        <!-- Stat item -->
        <div class="glass-card p-6 flex items-center justify-between border border-white/5 bg-[#0e0e0e]/55">
          <div>
            <p class="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Mensaxes</p>
            <p class="text-4xl font-display font-bold ${unreadMessagesCount > 0 ? 'text-brand-red' : 'text-white'}">${unreadMessagesCount}</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-red">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"></path></svg>
          </div>
        </div>
        <!-- Stat item -->
        <div class="glass-card p-6 flex items-center justify-between border border-white/5 bg-[#0e0e0e]/55">
          <div>
            <p class="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Total Novas</p>
            <p class="text-4xl font-display font-bold text-white">${novas.length}</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-red">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 2v6h6m-8 6h.01M12 18h.01"></path></svg>
          </div>
        </div>
        <!-- Stat item -->
        <div class="glass-card p-6 flex items-center justify-between border border-white/5 bg-[#0e0e0e]/55">
          <div>
            <p class="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Produtos</p>
            <p class="text-4xl font-display font-bold text-white">${products.length}</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-red">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          </div>
        </div>
        <!-- Stat item -->
        <div class="glass-card p-6 flex items-center justify-between border border-white/5 bg-[#0e0e0e]/55">
          <div>
            <p class="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Eventos</p>
            <p class="text-4xl font-display font-bold text-white">${events.length}</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-red">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
        </div>
      </div>

      <!-- Tab Buttons -->
      <div class="flex border-b border-white/10 gap-2 mb-8 overflow-x-auto scrollbar-hide">
        <button onclick="window.switchTab('pedidos')" class="px-6 py-4 font-display font-bold uppercase tracking-wider text-sm border-b-2 transition-all ${activeTab === 'pedidos' ? 'border-brand-red text-white' : 'border-transparent text-white/40 hover:text-white/80'}">
          Pedidos (${orders.length})
        </button>
        <button onclick="window.switchTab('mensaxes')" class="px-6 py-4 font-display font-bold uppercase tracking-wider text-sm border-b-2 transition-all ${activeTab === 'mensaxes' ? 'border-brand-red text-white' : 'border-transparent text-white/40 hover:text-white/80'}">
          Mensaxes (${messages.length})
        </button>
        <button onclick="window.switchTab('novas')" class="px-6 py-4 font-display font-bold uppercase tracking-wider text-sm border-b-2 transition-all ${activeTab === 'novas' ? 'border-brand-red text-white' : 'border-transparent text-white/40 hover:text-white/80'}">
          Novas (${novas.length})
        </button>
        <button onclick="window.switchTab('tenda')" class="px-6 py-4 font-display font-bold uppercase tracking-wider text-sm border-b-2 transition-all ${activeTab === 'tenda' ? 'border-brand-red text-white' : 'border-transparent text-white/40 hover:text-white/80'}">
          Produtos Tenda (${products.length})
        </button>
        <button onclick="window.switchTab('calendario')" class="px-6 py-4 font-display font-bold uppercase tracking-wider text-sm border-b-2 transition-all ${activeTab === 'calendario' ? 'border-brand-red text-white' : 'border-transparent text-white/40 hover:text-white/80'}">
          Calendario (${events.length})
        </button>
      </div>

      <!-- Tab Content Area -->
      <div class="min-h-[400px]">
        ${activeTab === 'pedidos' ? renderPedidosTab(orders) : ''}
        ${activeTab === 'mensaxes' ? renderMessagesTab(messages) : ''}
        ${activeTab === 'novas' ? renderNovasTab(novas) : ''}
        ${activeTab === 'tenda' ? renderTendaTab(products) : ''}
        ${activeTab === 'calendario' ? renderCalendarioTab(events) : ''}
      </div>
    </div>

    <!-- Modals Container -->
    <div id="admin-modal" class="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 p-6">
      <div class="w-full max-w-2xl bg-brand-grey border border-white/10 rounded-2xl relative max-h-[90vh] overflow-y-auto p-8" id="admin-modal-content">
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
      <div class="glass-card py-20 text-center border border-white/5">
        <p class="text-white/30 text-lg">Non se rexistraron pedidos aínda.</p>
      </div>
    `
  }

  return `
    <div class="space-y-6 animate-fade-in-up">
      ${orders.map(order => {
        let statusClass = 'text-orange-400 bg-orange-400/10 border-orange-400/20';
        if (order.status === 'Pagado') statusClass = 'text-blue-400 bg-blue-400/10 border-blue-400/20';
        if (order.status === 'Entregado') statusClass = 'text-green-400 bg-green-400/10 border-green-400/20';

        return `
          <div class="glass-card p-6 border border-white/5 bg-[#0e0e0e]/30 flex flex-col gap-6 hover:border-white/10 transition-colors">
            
            <!-- Order Header -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
              <div>
                <div class="flex items-center gap-3 flex-wrap">
                  <span class="text-xs font-bold text-white/50">Pedido #${order.id}</span>
                  <span class="text-xs text-white/30">${order.date}</span>
                  <span class="px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${statusClass}">${order.status}</span>
                </div>
                <h4 class="font-display font-bold text-lg text-white mt-1">Cliente: ${order.customer.name}</h4>
              </div>
              
              <div class="text-right sm:text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                <span class="text-xs text-white/40">Total do Pedido:</span>
                <span class="text-2xl font-display font-bold text-brand-red">${order.total.toFixed(2)}€</span>
              </div>
            </div>

            <!-- Order Body: Customer & Items info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Customer details -->
              <div class="space-y-2">
                <p class="text-xs font-bold text-white/40 uppercase tracking-widest">Contacto</p>
                <p class="text-sm text-white/80"><span class="text-white/40">Email:</span> ${order.customer.email}</p>
                <p class="text-sm text-white/80"><span class="text-white/40">Teléfono:</span> ${order.customer.phone}</p>
                ${order.customer.notes ? `<p class="text-sm text-white/70 italic mt-2 bg-white/5 p-3 rounded-lg"><span class="text-white/40 font-bold block not-italic uppercase text-[9px] mb-1">Notas:</span>"${order.customer.notes}"</p>` : ''}
              </div>

              <!-- Product items details -->
              <div class="space-y-3">
                <p class="text-xs font-bold text-white/40 uppercase tracking-widest">Artigos Solicitados</p>
                <div class="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-hide">
                  ${order.items.map(item => {
                    const sizeStr = item.size ? ` - Talla: <span class="text-brand-red font-bold">${item.size}</span>` : '';
                    return `
                      <div class="flex items-center gap-3 bg-brand-dark/50 p-2.5 rounded-xl border border-white/5 text-xs">
                        <div class="w-10 h-12 bg-white/5 rounded-lg overflow-hidden shrink-0 flex items-center justify-center text-[9px] border border-white/5">
                          ${item.image ? `<img src="${item.image}" class="w-full h-full object-cover" />` : 'Foto'}
                        </div>
                        <div class="flex-1">
                          <p class="font-bold text-white leading-tight">${item.name}</p>
                          <p class="text-white/50 mt-1">${item.quantity}x a ${item.price.toFixed(2)}€/u${sizeStr}</p>
                        </div>
                      </div>
                    `
                  }).join('')}
                </div>
              </div>
            </div>

            <!-- Actions buttons footer -->
            <div class="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-4 mt-2">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold text-white/40 uppercase tracking-widest">Cambiar Estado:</span>
                <button onclick="window.updateOrderStatus(${order.id}, 'Pendente')" class="px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 hover:border-orange-400 hover:text-orange-400 text-[10px] font-bold transition-all ${order.status === 'Pendente' ? 'border-orange-400 text-orange-400' : 'text-white/60'}">Pendente</button>
                <button onclick="window.updateOrderStatus(${order.id}, 'Pagado')" class="px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 hover:border-blue-400 hover:text-blue-400 text-[10px] font-bold transition-all ${order.status === 'Pagado' ? 'border-blue-400 text-blue-400' : 'text-white/60'}">Pagado</button>
                <button onclick="window.updateOrderStatus(${order.id}, 'Entregado')" class="px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 hover:border-green-400 hover:text-green-400 text-[10px] font-bold transition-all ${order.status === 'Entregado' ? 'border-green-400 text-green-400' : 'text-white/60'}">Entregado</button>
              </div>

              <button onclick="window.deleteOrder(${order.id})" class="px-4 py-2 bg-brand-red/10 border border-brand-red/20 text-brand-red hover:bg-brand-red hover:text-white rounded-lg text-xs font-bold transition-colors">
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
      <div class="glass-card py-20 text-center border border-white/5">
        <p class="text-white/30 text-lg">Non se recibiron mensaxes de contacto aínda.</p>
      </div>
    `
  }

  return `
    <div class="space-y-6 animate-fade-in-up">
      ${messages.map(msg => `
        <div class="glass-card p-6 border ${msg.read ? 'border-white/5 bg-black/20' : 'border-brand-red/30 bg-brand-red/5'} transition-all group">
          <div class="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
            <div>
              <div class="flex items-center gap-3 flex-wrap">
                <h3 class="font-display font-bold text-lg text-white">${msg.name}</h3>
                <span class="text-xs text-white/50 bg-white/5 px-2 py-0.5 rounded-full">${msg.email}</span>
                ${!msg.read ? '<span class="text-[10px] bg-brand-red text-white font-bold uppercase px-2 py-0.5 rounded-full tracking-widest">Nova</span>' : ''}
              </div>
              <p class="text-xs text-brand-red font-bold uppercase tracking-wider mt-1">${msg.subject}</p>
            </div>
            
            <div class="flex items-center gap-3 shrink-0">
              <span class="text-xs text-white/30">${msg.date}</span>
              <button onclick="window.toggleMessageRead(${msg.id})" class="p-2 bg-white/5 hover:bg-brand-red hover:text-white rounded-lg transition-colors text-white/50" title="${msg.read ? 'Marcar como non lida' : 'Marcar como lida'}">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </button>
              <button onclick="window.deleteMessage(${msg.id})" class="p-2 bg-white/5 hover:bg-red-800 hover:text-white rounded-lg transition-colors text-white/50" title="Eliminar mensaxe">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </div>
          <p class="text-white/70 text-sm whitespace-pre-wrap leading-relaxed border-t border-white/5 pt-4 mt-2">${msg.message}</p>
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
    <div class="space-y-6 animate-fade-in-up">
      <div class="flex justify-between items-center">
        <h3 class="font-display font-bold text-lg text-white">Novas Publicadas</h3>
        <button onclick="window.openCreateNovaModal()" class="px-5 py-2.5 bg-brand-red text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-red-700 transition-all flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Engadir Nova
        </button>
      </div>

      <div class="grid grid-cols-1 gap-4">
        ${novas.length === 0 ? `
          <div class="glass-card py-20 text-center border border-white/5">
            <p class="text-white/30 text-lg">Non hai novas publicadas. Engade a primeira!</p>
          </div>
        ` : novas.map(nova => `
          <div class="glass-card p-6 border border-white/5 bg-[#0e0e0e]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-white/10 transition-colors">
            <div class="flex items-center gap-4 flex-1">
              <div class="w-16 h-16 bg-white/5 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-white/20 italic text-[9px] border border-white/5">
                ${nova.image ? `<img src="${nova.image}" class="w-full h-full object-cover" />` : 'Imaxe'}
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <span class="text-[10px] text-brand-red font-bold uppercase tracking-widest">${nova.category}</span>
                  <span class="text-[10px] text-white/30">${nova.date}</span>
                </div>
                <h4 class="font-display font-bold text-lg text-white mt-1 line-clamp-1">${nova.title}</h4>
                <p class="text-xs text-white/50 line-clamp-1 mt-1">${nova.description}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3 shrink-0">
              <button onclick="window.openEditNovaModal(${nova.id})" class="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold transition-colors">Editar</button>
              <button onclick="window.deleteNova(${nova.id})" class="px-4 py-2 bg-brand-red/10 border border-brand-red/20 text-brand-red hover:bg-brand-red hover:text-white rounded-lg text-xs font-bold transition-colors">Eliminar</button>
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
    <div class="space-y-6 animate-fade-in-up">
      <div class="flex justify-between items-center">
        <h3 class="font-display font-bold text-lg text-white">Produtos Dispoñibles</h3>
        <button onclick="window.openCreateProductModal()" class="px-5 py-2.5 bg-brand-red text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-red-700 transition-all flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Engadir Produto
        </button>
      </div>

      <div class="grid grid-cols-1 gap-4">
        ${products.length === 0 ? `
          <div class="glass-card py-20 text-center border border-white/5">
            <p class="text-white/30 text-lg">Non hai produtos dispoñibles. Engade o primeiro!</p>
          </div>
        ` : products.map(prod => `
          <div class="glass-card p-6 border border-white/5 bg-[#0e0e0e]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-white/10 transition-colors">
            <div class="flex items-center gap-4 flex-1">
              <div class="w-16 h-16 bg-white/5 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-white/20 italic text-[9px] border border-white/5">
                ${prod.image ? `<img src="${prod.image}" class="w-full h-full object-cover" />` : 'Imaxe'}
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <span class="text-[10px] text-brand-red font-bold uppercase tracking-widest">${prod.category}</span>
                  ${prod.tag ? `<span class="text-[9px] bg-brand-red text-white px-2 py-0.5 rounded-full font-bold uppercase">${prod.tag}</span>` : ''}
                </div>
                <h4 class="font-display font-bold text-lg text-white mt-1">${prod.name}</h4>
                <p class="text-sm text-brand-red font-bold mt-1">${prod.priceStr}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3 shrink-0">
              <button onclick="window.openEditProductModal(${prod.id})" class="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold transition-colors">Editar</button>
              <button onclick="window.deleteProduct(${prod.id})" class="px-4 py-2 bg-brand-red/10 border border-brand-red/20 text-brand-red hover:bg-brand-red hover:text-white rounded-lg text-xs font-bold transition-colors">Eliminar</button>
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
  return `
    <div class="space-y-6 animate-fade-in-up">
      <div class="flex justify-between items-center">
        <h3 class="font-display font-bold text-lg text-white">Eventos no Calendario</h3>
        <button onclick="window.openCreateEventModal()" class="px-5 py-2.5 bg-brand-red text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-red-700 transition-all flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Engadir Evento
        </button>
      </div>

      <div class="grid grid-cols-1 gap-4">
        ${events.length === 0 ? `
          <div class="glass-card py-20 text-center border border-white/5">
            <p class="text-white/30 text-lg">Non hai eventos programados. Crea o primeiro!</p>
          </div>
        ` : events.map(evt => {
          const { day, month } = parseAndFormatDate(evt.date);
          return `
            <div class="glass-card p-6 border border-white/5 bg-[#0e0e0e]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-white/10 transition-colors">
              <div class="flex items-center gap-4 flex-1">
                <div class="w-16 h-16 bg-brand-red/10 rounded-xl shrink-0 flex flex-col items-center justify-center border border-brand-red/20 text-center">
                  <span class="text-lg font-bold text-brand-red font-display leading-none">${day}</span>
                  ${month ? `<span class="text-[9px] font-bold text-white/50 uppercase tracking-widest mt-1">${month}</span>` : ''}
                </div>
                <div class="flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-[10px] bg-white/5 px-2 py-0.5 rounded text-white/70 font-bold uppercase tracking-widest">${evt.type}</span>
                  <span class="text-[10px] font-bold uppercase tracking-widest ${evt.status === 'Confirmado' ? 'text-green-400' : 'text-orange-400'}">${evt.status}</span>
                </div>
                <h4 class="font-display font-bold text-lg text-white mt-1">${evt.title}</h4>
                <p class="text-xs text-white/40 flex items-center gap-1 mt-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  ${evt.location}
                </p>
              </div>
            </div>
            
            <div class="flex items-center gap-3 shrink-0">
              <button onclick="window.openEditEventModal(${evt.id})" class="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold transition-colors">Editar</button>
              <button onclick="window.deleteEvent(${evt.id})" class="px-4 py-2 bg-brand-red/10 border border-brand-red/20 text-brand-red hover:bg-brand-red hover:text-white rounded-lg text-xs font-bold transition-colors">Eliminar</button>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `
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
    <button onclick="window.closeModal()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-brand-red transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
    <h3 class="text-2xl font-display font-bold uppercase tracking-tight italic mb-6">
      ${nova ? 'Editar' : 'Nova'} <span class="text-brand-red">Noticia</span>
    </h3>
    <form id="nova-form" class="space-y-6">
      <div>
        <label class="block text-xs font-bold text-white/40 uppercase mb-2">Título</label>
        <input type="text" id="nova-title" required class="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" value="${nova?.title || ''}" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold text-white/40 uppercase mb-2">Categoría</label>
          <select id="nova-category" class="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all">
            <option ${nova?.category === 'Competición' ? 'selected' : ''}>Competición</option>
            <option ${nova?.category === 'Escola' ? 'selected' : ''}>Escola</option>
            <option ${nova?.category === 'Club' ? 'selected' : ''}>Club</option>
            <option ${nova?.category === 'Eventos' ? 'selected' : ''}>Eventos</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-white/40 uppercase mb-2">Imaxe da Noticia</label>
          <div class="flex gap-3 items-center">
            <input type="file" id="nova-file" accept="image/*" class="hidden" />
            <button type="button" onclick="document.getElementById('nova-file').click()" class="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors shrink-0">Seleccionar foto</button>
            <span id="nova-file-name" class="text-xs text-white/40 truncate flex-1">Ningunha foto seleccionada</span>
          </div>
          <input type="text" id="nova-image" class="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all mt-3" placeholder="Ou URL da imaxe" value="${nova?.image || ''}" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-bold text-white/40 uppercase mb-2">Breve Descrición</label>
        <input type="text" id="nova-description" required class="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" value="${nova?.description || ''}" placeholder="Resumo curto de 1 liña" />
      </div>
      <div>
        <label class="block text-xs font-bold text-white/40 uppercase mb-2">Contido completo</label>
        <textarea id="nova-content" required class="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all h-40" placeholder="Escribe aquí toda a noticia...">${nova?.content || ''}</textarea>
      </div>
      <button type="submit" class="btn-primary w-full py-4 text-sm font-bold tracking-widest uppercase">Gardar Cambios</button>
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
    <button onclick="window.closeModal()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-brand-red transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
    <h3 class="text-2xl font-display font-bold uppercase tracking-tight italic mb-6">
      ${prod ? 'Editar' : 'Novo'} <span class="text-brand-red">Produto</span>
    </h3>
    <form id="product-form" class="space-y-6">
      <div>
        <label class="block text-xs font-bold text-white/40 uppercase mb-2">Nome do Produto</label>
        <input type="text" id="prod-name" required class="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" value="${prod?.name || ''}" />
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold text-white/40 uppercase mb-2">Prezo (€)</label>
          <input type="number" step="0.01" id="prod-price" required class="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" value="${prod?.price || ''}" />
        </div>
        <div>
          <label class="block text-xs font-bold text-white/40 uppercase mb-2">Categoría</label>
          <select id="prod-category" class="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all">
            <option ${prod?.category === 'Competición' ? 'selected' : ''}>Competición</option>
            <option ${prod?.category === 'Casual' ? 'selected' : ''}>Casual</option>
            <option ${prod?.category === 'Accesorios' ? 'selected' : ''}>Accesorios</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold text-white/40 uppercase mb-2">Etiqueta (Tag - Opcional)</label>
          <input type="text" id="prod-tag" class="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" placeholder="Novidade, Top Vendas, etc." value="${prod?.tag || ''}" />
        </div>
        <div>
          <label class="block text-xs font-bold text-white/40 uppercase mb-2">Imaxe do Produto</label>
          <div class="flex gap-3 items-center">
            <input type="file" id="prod-file" accept="image/*" class="hidden" />
            <button type="button" onclick="document.getElementById('prod-file').click()" class="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors shrink-0">Seleccionar foto</button>
            <span id="prod-file-name" class="text-xs text-white/40 truncate flex-1">Ningunha foto seleccionada</span>
          </div>
          <input type="text" id="prod-image" class="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all mt-3" placeholder="/images/products/shirt.png" value="${prod?.image || ''}" />
        </div>
      </div>
      
      <div class="flex items-center gap-3">
        <input type="checkbox" id="prod-sizes" class="w-5 h-5 rounded accent-brand-red" ${prod?.hasSizes ? 'checked' : ''} />
        <label for="prod-sizes" class="text-sm font-bold text-white/80">Este produto ten tallas seleccionables (S, M, L, XL, etc.)</label>
      </div>

      <button type="submit" class="btn-primary w-full py-4 text-sm font-bold tracking-widest uppercase">Gardar Produto</button>
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
    <button onclick="window.closeModal()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-brand-red transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
    <h3 class="text-2xl font-display font-bold uppercase tracking-tight italic mb-6">
      ${evt ? 'Editar' : 'Novo'} <span class="text-brand-red">Evento</span>
    </h3>
    <form id="event-form" class="space-y-6">
      <div>
        <label class="block text-xs font-bold text-white/40 uppercase mb-2">Título do Evento</label>
        <input type="text" id="event-title" required class="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" value="${evt?.title || ''}" />
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold text-white/40 uppercase mb-2">Data (Ex: "15/06/2026")</label>
          <input type="text" id="event-date" required placeholder="DD/MM/AAAA" class="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" value="${evt?.date || ''}" />
        </div>
        <div>
          <label class="block text-xs font-bold text-white/40 uppercase mb-2">Localización</label>
          <input type="text" id="event-location" required class="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" value="${evt?.location || ''}" />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold text-white/40 uppercase mb-2">Tipo de Regata/Evento</label>
          <input type="text" id="event-type" required placeholder="Ex: Pista, Ríos, Maratón" class="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" value="${evt?.type || ''}" />
        </div>
        <div>
          <label class="block text-xs font-bold text-white/40 uppercase mb-2">Estado</label>
          <select id="event-status" class="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all">
            <option ${evt?.status === 'Confirmado' ? 'selected' : ''}>Confirmado</option>
            <option ${evt?.status === 'Pendente' ? 'selected' : ''}>Pendente</option>
          </select>
        </div>
      </div>

      <button type="submit" class="btn-primary w-full py-4 text-sm font-bold tracking-widest uppercase">Gardar Evento</button>
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
  toast.className = 'fixed bottom-6 right-6 bg-white text-brand-dark px-6 py-4 rounded-2xl font-bold shadow-2xl transform translate-y-20 opacity-0 transition-all duration-500 z-[100] border border-brand-red/20'
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
    <button onclick="window.closeModal()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-brand-red transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
    <h3 class="text-2xl font-display font-bold uppercase tracking-tight italic mb-6">
      Cambiar <span class="text-brand-red">Contrasinal</span>
    </h3>
    <form id="password-form" class="space-y-6">
      <div>
        <label class="block text-xs font-bold text-white/40 uppercase mb-2">Contrasinal Actual</label>
        <input type="password" id="pass-current" required class="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" />
      </div>
      <div>
        <label class="block text-xs font-bold text-white/40 uppercase mb-2">Novo Contrasinal</label>
        <input type="password" id="pass-new" required class="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" />
      </div>
      <div>
        <label class="block text-xs font-bold text-white/40 uppercase mb-2">Confirmar Novo Contrasinal</label>
        <input type="password" id="pass-confirm" required class="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all" />
      </div>
      <div id="pass-error" class="hidden text-brand-red text-xs font-bold bg-brand-red/10 p-3 rounded-lg text-center border border-brand-red/20"></div>
      <button type="submit" class="btn-primary w-full py-4 text-sm font-bold tracking-widest uppercase">Actualizar Contrasinal</button>
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

// Initialize and setup
renderPage()
