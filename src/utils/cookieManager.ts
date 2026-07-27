export type CookieConsent = {
  consentId: string;
  timestamp: string;
  categories: {
    necesarias: boolean;
    preferencias: boolean;
    estatistica: boolean;
    marketing: boolean;
  };
  policyVersion: string;
  bannerVersion: string;
}

const POLICY_VERSION = '1.0';
const BANNER_VERSION = '1.0';

export function getConsent(): CookieConsent | null {
  const data = localStorage.getItem('cookie_consent');
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

export function saveConsent(categories: { preferencias: boolean; estatistica: boolean; marketing: boolean }) {
  const consent: CookieConsent = {
    consentId: 'consent_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    timestamp: new Date().toISOString(),
    categories: {
      necesarias: true,
      preferencias: categories.preferencias,
      estatistica: categories.estatistica,
      marketing: categories.marketing
    },
    policyVersion: POLICY_VERSION,
    bannerVersion: BANNER_VERSION
  };

  localStorage.setItem('cookie_consent', JSON.stringify(consent));
  
  // Save consent to audit log for admin
  const auditLog = JSON.parse(localStorage.getItem('admin_cookie_consents') || '[]');
  auditLog.unshift({
    id: consent.consentId,
    timestamp: consent.timestamp,
    categories: consent.categories,
    policyVersion: consent.policyVersion
  });
  localStorage.setItem('admin_cookie_consents', JSON.stringify(auditLog.slice(0, 1000))); // Cap at 1000 logs

  applyConsent();
}

export function applyConsent() {
  const consent = getConsent();
  const allowed = consent ? consent.categories : { necesarias: true, preferencias: false, estatistica: false, marketing: false };

  // Load configured scripts from admin
  const scripts = JSON.parse(localStorage.getItem('admin_cookie_scripts') || '[]');
  
  // Remove previously injected dynamic scripts if category is false
  document.querySelectorAll('[data-cookie-script]').forEach(el => el.remove());

  // Inject permitted category scripts
  scripts.forEach((script: { id: string; category: string; code: string; active: boolean }) => {
    if (!script.active) return;
    
    let isAllowed = false;
    if (script.category === 'Preferencias' && allowed.preferencias) isAllowed = true;
    if (script.category === 'Estatística' && allowed.estatistica) isAllowed = true;
    if (script.category === 'Marketing' && allowed.marketing) isAllowed = true;

    if (isAllowed) {
      const scriptEl = document.createElement('script');
      scriptEl.setAttribute('data-cookie-script', script.id);
      scriptEl.textContent = script.code;
      document.head.appendChild(scriptEl);
    }
  });

  // Handle cookies deletion if disabled
  if (!allowed.estatistica) {
    deleteCookies(['_ga', '_gid', '_gat', '_ga_']);
  }
  if (!allowed.marketing) {
    deleteCookies(['_fbp', 'fr']);
  }
}

function deleteCookies(names: string[]) {
  const domains = [window.location.hostname, '.' + window.location.hostname, ''];
  const paths = ['/', ''];

  names.forEach(name => {
    domains.forEach(domain => {
      paths.forEach(path => {
        let cookieString = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        if (domain) cookieString += ' domain=' + domain + ';';
        if (path) cookieString += ' path=' + path + ';';
        document.cookie = cookieString;
      });
    });
  });
}

// Global functions for window interaction
export function setupCookieConsentGlobal() {
  (window as any).acceptAllCookies = () => {
    saveConsent({ preferencias: true, estatistica: true, marketing: true });
    hideCookieBanner();
  };

  (window as any).rejectCookies = () => {
    saveConsent({ preferencias: false, estatistica: false, marketing: false });
    hideCookieBanner();
  };

  (window as any).saveCookiePreferences = () => {
    const pref = (document.getElementById('cookies-pref-pref') as HTMLInputElement)?.checked || false;
    const est = (document.getElementById('cookies-pref-est') as HTMLInputElement)?.checked || false;
    const mkt = (document.getElementById('cookies-pref-mkt') as HTMLInputElement)?.checked || false;

    saveConsent({ preferencias: pref, estatistica: est, marketing: mkt });
    hideCookiePanel();
    hideCookieBanner();
  };

  (window as any).showCookiePreferences = () => {
    renderCookiePanel();
  };

  (window as any).hideCookiePanel = () => {
    hideCookiePanel();
  };
}

export function checkAndShowBanner() {
  const consent = getConsent();
  if (!consent || consent.policyVersion !== POLICY_VERSION) {
    renderCookieBanner();
  }
  applyConsent();
}

function renderCookieBanner() {
  if (document.getElementById('cookie-banner')) return;

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.className = 'fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md bg-white border border-gray-250 p-6 rounded-3xl shadow-2xl z-[90] flex flex-col gap-4 animate-fade-in-up font-sans text-gray-800';
  banner.innerHTML = `
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        <span class="text-xs font-black uppercase tracking-widest text-gray-900">Uso de cookies</span>
      </div>
      <p class="text-xs text-gray-500 font-semibold leading-relaxed">
        Usamos cookies para garantir o funcionamento da web e, se o autorizas, analizar o seu uso e mellorar os contidos. Podes aceptar todas, rexeitar as non necesarias ou configurar as túas preferencias.
      </p>
    </div>
    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-2 gap-2">
        <button onclick="window.acceptAllCookies()" class="w-full py-2.5 rounded-xl bg-brand-red text-white text-[10px] font-black uppercase tracking-wider hover:bg-red-700 transition-all cursor-pointer shadow-sm text-center">Aceptar todas</button>
        <button onclick="window.rejectCookies()" class="w-full py-2.5 rounded-xl border border-gray-250 text-gray-700 text-[10px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all cursor-pointer text-center">Rexeitar</button>
      </div>
      <button onclick="window.showCookiePreferences()" class="w-full py-2.5 rounded-xl border border-gray-200 text-gray-500 text-[9px] font-bold uppercase tracking-wider hover:text-brand-red transition-all cursor-pointer text-center">Configurar cookies</button>
    </div>
  `;
  document.body.appendChild(banner);
}

function hideCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.remove();
}

function renderCookiePanel() {
  let modal = document.getElementById('cookie-panel-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'cookie-panel-modal';
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-[95] flex items-center justify-center p-6 font-sans text-gray-800';
    document.body.appendChild(modal);
  }

  const consent = getConsent();
  const categories = consent ? consent.categories : { necesarias: true, preferencias: false, estatistica: false, marketing: false };

  modal.innerHTML = `
    <div class="w-full max-w-lg bg-white border border-gray-200 rounded-3xl p-8 relative shadow-2xl max-h-[85vh] overflow-y-auto space-y-6">
      <button onclick="window.hideCookiePanel()" class="absolute top-6 right-6 p-2 hover:bg-gray-50 rounded-xl border border-gray-200 transition-colors text-gray-400 hover:text-gray-800 cursor-pointer">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <div>
        <span class="text-[9px] font-black text-brand-red uppercase tracking-widest">Privacidade</span>
        <h3 class="text-2xl font-display font-black text-gray-900 mt-0.5">Preferencias de cookies</h3>
        <p class="text-xs text-gray-500 font-semibold mt-1">Configura que tecnoloxías de seguimento permites na nosa web.</p>
      </div>

      <div class="space-y-4">
        <!-- Necesarias -->
        <div class="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex justify-between items-start gap-4">
          <div class="space-y-1">
            <h4 class="font-bold text-xs text-gray-900 uppercase">Necesarias / Técnicas</h4>
            <p class="text-[10px] text-gray-400 font-semibold leading-relaxed">Imprescindibles para que funcione a web (carriño, inicio de sesión administrativo, preferencias).</p>
          </div>
          <span class="text-[10px] font-black uppercase text-green-600 bg-green-50 px-2 py-0.5 rounded-lg border border-green-200 shrink-0">Sempre activas</span>
        </div>

        <!-- Preferencias -->
        <div class="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex justify-between items-start gap-4">
          <div class="space-y-1">
            <h4 class="font-bold text-xs text-gray-900 uppercase">Preferencias</h4>
            <p class="text-[10px] text-gray-400 font-semibold leading-relaxed">Permiten recordar información como o teu idioma ou o estado das alertas.</p>
          </div>
          <input type="checkbox" id="cookies-pref-pref" ${categories.preferencias ? 'checked' : ''} class="w-4 h-4 text-brand-red rounded border-gray-300 focus:ring-brand-red shrink-0 cursor-pointer" />
        </div>

        <!-- Analitica -->
        <div class="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex justify-between items-start gap-4">
          <div class="space-y-1">
            <h4 class="font-bold text-xs text-gray-900 uppercase">Estatística / Analítica</h4>
            <p class="text-[10px] text-gray-400 font-semibold leading-relaxed">Permítennos analizar o uso da web de forma anónima para medir a súa audiencia e mellorala.</p>
          </div>
          <input type="checkbox" id="cookies-pref-est" ${categories.estatistica ? 'checked' : ''} class="w-4 h-4 text-brand-red rounded border-gray-300 focus:ring-brand-red shrink-0 cursor-pointer" />
        </div>

        <!-- Marketing -->
        <div class="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex justify-between items-start gap-4">
          <div class="space-y-1">
            <h4 class="font-bold text-xs text-gray-900 uppercase">Marketing / Publicidade</h4>
            <p class="text-[10px] text-gray-400 font-semibold leading-relaxed">Usadas para amosar anuncios máis relevantes baseados nos teus intereses.</p>
          </div>
          <input type="checkbox" id="cookies-pref-mkt" ${categories.marketing ? 'checked' : ''} class="w-4 h-4 text-brand-red rounded border-gray-300 focus:ring-brand-red shrink-0 cursor-pointer" />
        </div>
      </div>

      <div class="flex flex-col gap-2 pt-4 border-t border-gray-150">
        <button onclick="window.saveCookiePreferences()" class="w-full py-3.5 rounded-xl bg-brand-red text-white text-[10px] font-black uppercase tracking-wider hover:bg-red-700 transition-all cursor-pointer shadow-md text-center">Gardar preferencias</button>
        <div class="grid grid-cols-2 gap-2">
          <button onclick="window.acceptAllCookies(); window.hideCookiePanel()" class="w-full py-2.5 rounded-xl border border-gray-250 text-gray-700 text-[9px] font-bold uppercase tracking-wider hover:bg-gray-50 transition-all cursor-pointer text-center">Aceptar todas</button>
          <button onclick="window.rejectCookies(); window.hideCookiePanel()" class="w-full py-2.5 rounded-xl border border-gray-250 text-gray-700 text-[9px] font-bold uppercase tracking-wider hover:bg-gray-50 transition-all cursor-pointer text-center">Rexeitar todas</button>
        </div>
      </div>
    </div>
  `;
}

function hideCookiePanel() {
  const modal = document.getElementById('cookie-panel-modal');
  if (modal) modal.remove();
}

export function renderCookieFloatingButton() {
  if (document.getElementById('cookie-floating-btn')) return;

  const btn = document.createElement('div');
  btn.id = 'cookie-floating-btn';
  btn.className = 'fixed bottom-6 right-6 z-[80]';
  btn.innerHTML = `
    <button onclick="window.showCookiePreferences()" class="w-10 h-10 rounded-full bg-white border border-gray-250 text-gray-550 hover:text-brand-red flex items-center justify-center shadow-lg transition-all hover:scale-110 cursor-pointer" title="Configurar cookies">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
    </button>
  `;
  document.body.appendChild(btn);
}
