// Version Malek — variantes + tracking GA4 automatique via loc prop
// Usage : <Btn href={WHATSAPP} variant="whatsapp" loc="hero">WhatsApp</Btn>
// Usage : <Btn href="/reservation" variant="primary" loc="hero">Réserver</Btn> — navigation SPA si href commence par "/"
// Usage : <Btn onClick={handleClick} variant="primary" loc="section">Demander un devis</Btn>
import { Link } from 'react-router-dom';
import { trackLead } from '../analytics';
import { C, F } from '../tokens';

const BASE = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '13px 22px',
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 600,
  fontFamily: F.body,
  cursor: 'pointer',
  transition: 'opacity 0.15s ease, transform 0.15s ease',
  textDecoration: 'none',
  border: 'none',
  minHeight: 44,
  lineHeight: 1,
  whiteSpace: 'nowrap',
};

function getVariantStyle(variant) {
  switch (variant) {
    case 'whatsapp':  return { background: '#25D366', color: C.white, boxShadow: '0 2px 14px rgba(37,211,102,0.28)' };
    case 'ghost':     return { background: 'rgba(255,255,255,0.12)', color: C.white, border: '1.5px solid rgba(255,255,255,0.30)' };
    case 'secondary': return { background: 'transparent', color: C.muted, border: `1.5px solid ${C.border}` };
    case 'light':     return { background: C.white, color: C.primary };
    case 'dark':      return { background: C.dark, color: C.white };
    default:          return { background: C.primary, color: C.white, boxShadow: `0 2px 14px ${C.primary}35` };
  }
}

export default function Btn({ href, onClick, children, variant = 'primary', style = {}, loc }) {
  const finalStyle = { ...BASE, ...getVariantStyle(variant), ...style };

  function handleClick(e) {
    if (loc) {
      if (href?.startsWith('tel:'))           trackLead('phone', loc);
      else if (href?.includes('wa.me'))       trackLead('whatsapp', loc);
      else if (href?.startsWith('mailto:'))   trackLead('email', loc);
      else                                    trackLead('cta', loc);
    }
    if (onClick) onClick(e);
  }

  if (href) {
    const isInternal = href.startsWith('/');
    if (isInternal) {
      return (
        <Link to={href} onClick={handleClick} style={finalStyle}>
          {children}
        </Link>
      );
    }
    const isExternal = href.startsWith('http');
    return (
      <a
        href={href}
        onClick={handleClick}
        style={finalStyle}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={handleClick} style={finalStyle} type="button">
      {children}
    </button>
  );
}
