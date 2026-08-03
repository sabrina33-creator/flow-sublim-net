// Bandeau de consentement cookies — accompagne le Consent Mode déclaré dans
// public/index.html (analytics_storage: 'denied' par défaut). Aucun cookie de
// mesure d'audience n'est posé tant que la personne n'a pas cliqué "Accepter".
// Choix mémorisé dans localStorage, modifiable ensuite via le lien "Gérer les
// cookies" dans Footer.jsx (déclenche l'événement 'open-cookie-settings').
import { useState, useEffect } from 'react';
import { C, F } from '../tokens';

const STORAGE_KEY = 'sublimnet_cookie_consent'; // 'granted' | 'denied'

function applyConsent(value) {
  if (window.gtag) {
    window.gtag('consent', 'update', { analytics_storage: value });
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'granted' || saved === 'denied') {
      applyConsent(saved);
    } else {
      setVisible(true);
    }
    const reopen = () => setVisible(true);
    window.addEventListener('open-cookie-settings', reopen);
    return () => window.removeEventListener('open-cookie-settings', reopen);
  }, []);

  function choose(value) {
    localStorage.setItem(STORAGE_KEY, value);
    applyConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement aux cookies"
      className="flow-cookie-consent"
      style={{
        position: 'fixed',
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 1000,
        maxWidth: 460,
        margin: '0 auto',
        background: C.dark,
        borderRadius: 14,
        padding: '20px 22px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.28)',
      }}
    >
      <p style={{ fontFamily: F.body, fontSize: 13.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', marginBottom: 16 }}>
        Ce site utilise Google Analytics pour mesurer sa fréquentation. Vous pouvez accepter ou refuser ce suivi — votre choix reste modifiable à tout moment depuis le bas de page.
      </p>
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          type="button"
          onClick={() => choose('denied')}
          style={{
            flex: 1, minHeight: 44, padding: '11px 16px', borderRadius: 10,
            border: '1.5px solid rgba(255,255,255,0.3)', background: 'transparent',
            color: '#fff', fontFamily: F.body, fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          style={{
            flex: 1, minHeight: 44, padding: '11px 16px', borderRadius: 10,
            border: 'none', background: C.primary,
            color: '#fff', fontFamily: F.body, fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
