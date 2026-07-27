// Header — transparent sur hero, opaque au scroll
// Drawer fullscreen sur mobile (version Malek, la plus propre)
// React Router pour la navigation (Link, useLocation)
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { C, F, PHONE, PHONE_DISPLAY, WHATSAPP, SITE_NAME } from '../tokens';
import Btn from './Btn';
import Logo from './Logo';
import { PhoneIcon, WhatsAppIcon, MenuIcon, XIcon } from './Icons';

const NAV = [
  { path: '/',             label: 'Accueil'      },
  { path: '/services',     label: 'Services'     },
  { path: '/reservation',  label: 'Réserver'     },
  { path: '/devis-tapis',  label: 'Devis Tapis'  },
  { path: '/contact',      label: 'Avis & Contact' },
];

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location = useLocation();

  // Scroll — opaque après 60px
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Fermer le menu au changement de route
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Bloquer le scroll body quand menu ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;
  const fg    = solid ? C.dark : '#ffffff';

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: 68,
        background: solid ? `${C.bg}F2` : 'transparent',
        backdropFilter: solid ? 'blur(18px)' : 'none',
        borderBottom: solid ? `1px solid ${C.border}` : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '100%',
        }}>

          {/* Logo */}
          <Link
            to="/"
            aria-label={`${SITE_NAME} — retour à l'accueil`}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', minHeight: 44 }}
          >
            <Logo size={32} />
          </Link>

          {/* Navigation desktop */}
          <nav className="flow-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 24 }} aria-label="Navigation principale">
            {NAV.map(({ path, label }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  style={{
                    fontFamily: F.body, fontSize: 14, fontWeight: 500,
                    color: active ? C.primary : fg,
                    borderBottom: active ? `1.5px solid ${C.primary}` : '1.5px solid transparent',
                    padding: '4px 0', minHeight: 44,
                    display: 'flex', alignItems: 'center',
                    transition: 'color 0.25s, border-color 0.25s',
                  }}
                >
                  {label}
                </Link>
              );
            })}
            <Btn href={WHATSAPP} variant="whatsapp" style={{ padding: '9px 16px', fontSize: 13 }} loc="header">
              <WhatsAppIcon size={13} /> WhatsApp
            </Btn>
            <Btn href={PHONE} variant="primary" style={{ padding: '9px 16px', fontSize: 13 }} loc="header">
              <PhoneIcon size={13} /> {PHONE_DISPLAY}
            </Btn>
          </nav>

          {/* Hamburger mobile */}
          <button
            className="flow-nav-burger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            style={{
              display: 'none',
              background: 'none', border: 'none', cursor: 'pointer',
              color: fg, minHeight: 44, minWidth: 44,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {/* Drawer mobile */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          style={{
            position: 'fixed',
            top: 68, left: 0, right: 0, bottom: 0,
            zIndex: 999,
            background: C.bg,
            padding: '40px 28px',
            display: 'flex', flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          {NAV.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: F.heading,
                fontSize: 'clamp(28px, 8vw, 40px)',
                fontWeight: 700,
                color: location.pathname === path ? C.primary : C.dark,
                textDecoration: 'none',
                padding: '14px 0',
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              {label}
            </Link>
          ))}
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Btn
              href={WHATSAPP}
              variant="whatsapp"
              style={{ width: '100%', padding: 15, fontSize: 15, justifyContent: 'center' }}
              loc="nav_mobile"
            >
              <WhatsAppIcon size={18} /> WhatsApp
            </Btn>
            <Btn
              href={PHONE}
              variant="primary"
              style={{ width: '100%', padding: 15, fontSize: 15, justifyContent: 'center' }}
              loc="nav_mobile"
            >
              <PhoneIcon size={18} /> {PHONE_DISPLAY}
            </Btn>
          </div>
        </div>
      )}
    </>
  );
}
