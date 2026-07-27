const translations: Record<string, Record<string, string>> = {
  gl: {
    inicio: "Inicio",
    club: "O Club",
    calendario: "Calendario",
    novas: "Novas",
    tenda: "Tenda",
    contacto: "Contacto",
    socios: "Faste Socio",
    escola: "Escola Deportiva",
    galeria: "Galería Fotográfica",
    welcome: "Benvido ao CP Rianxo",
    footer_rights: "© 2026 Club Piragüismo Rianxo. Todos os dereitos reservados.",
    aviso_legal: "Aviso Legal",
    privacidade: "Privacidade",
    cookies: "Cookies"
  },
  es: {
    inicio: "Inicio",
    club: "El Club",
    calendario: "Calendario",
    novas: "Noticias",
    tenda: "Tienda",
    contacto: "Contacto",
    socios: "Hazte Socio",
    escola: "Escuela Deportiva",
    galeria: "Galería Fotográfica",
    welcome: "Bienvenido al CP Rianxo",
    footer_rights: "© 2026 Club Piragüismo Rianxo. Todos los derechos reservados.",
    aviso_legal: "Aviso Legal",
    privacidade: "Privacidad",
    cookies: "Cookies"
  }
}

export function getCurrentLang(): 'gl' | 'es' {
  return (localStorage.getItem('preferred_language') as 'gl' | 'es') || 'gl'
}

export function setLanguage(lang: 'gl' | 'es') {
  localStorage.setItem('preferred_language', lang)
  window.location.reload()
}

export function t(key: string): string {
  const lang = getCurrentLang()
  return translations[lang]?.[key] || key
}
