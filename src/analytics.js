// Wrapper GA4 — version Malek (la plus complète des 3 sites)
// send_page_view: false dans index.html → on appelle trackPageView manuellement
// à chaque changement de route (dans App.js via useEffect sur location.pathname)

export function trackPageView(pageName) {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      transport_type: 'beacon', // fiabilise l'envoi sur SPA, y compris à la fermeture d'onglet
    });
  }
}

// method : 'phone' | 'whatsapp' | 'email' | 'devis' | 'form' | 'cta'
// loc    : 'hero' | 'header' | 'sticky' | 'section' | 'footer' | 'nav_mobile'
export function trackLead(method, loc) {
  if (window.gtag) {
    window.gtag('event', 'generate_lead', { method, location: loc });
  }
}

export function trackEvent(eventName, params = {}) {
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
}
