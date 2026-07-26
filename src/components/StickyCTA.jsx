// Version Malek — 3 boutons + safe-area iOS
// Visible uniquement sur mobile (≤768px via .flow-sticky-cta en App.css)
// Règle absolue : WhatsApp visible sticky mobile
import { C, PHONE, WHATSAPP } from '../tokens';
import Btn from './Btn';
import { PhoneIcon, WhatsAppIcon } from './Icons';

export default function StickyCTA() {
  return (
    <div
      className="flow-sticky-cta"
      style={{
        display: 'none', // affiché via .flow-sticky-cta media query dans App.css
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        background: C.bg,
        borderTop: `1px solid ${C.border}`,
        padding: `10px 16px calc(10px + env(safe-area-inset-bottom))`,
        gap: 8,
        alignItems: 'center',
      }}
    >
      <Btn
        href={PHONE}
        variant="secondary"
        style={{ flex: 1, padding: '11px 8px', fontSize: 13, justifyContent: 'center' }}
        loc="sticky"
      >
        <PhoneIcon size={15} /> Appeler
      </Btn>
      <Btn
        href={WHATSAPP}
        variant="whatsapp"
        style={{ flex: 2, padding: '11px 8px', fontSize: 13, justifyContent: 'center' }}
        loc="sticky"
      >
        <WhatsAppIcon size={15} /> WhatsApp
      </Btn>
    </div>
  );
}
