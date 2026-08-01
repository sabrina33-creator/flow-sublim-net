import { Link } from 'react-router-dom';
import { C, F, SITE_NAME, PHONE, PHONE_DISPLAY, EMAIL, WHATSAPP, CITY, INSTAGRAM, TIKTOK } from '../tokens';
import { PhoneIcon, MailIcon, WhatsAppIcon, PinIcon, InstagramIcon, TiktokIcon } from './Icons';
import Btn from './Btn';
import Logo from './Logo';
import badgeMascotte from '../images/badge-mascotte.png'; // Pictogramme validé — footer uniquement, ne pas déplacer sans confirmation explicite

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer style={{ background: C.dark, color: 'rgba(255,255,255,0.7)', paddingTop: 64, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Top — logo + nav + contact */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px 32px',
          marginBottom: 48,
        }}>
          {/* Colonne 1 — marque */}
          <div>
            <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Logo size={30} />
              <img src={badgeMascotte} alt="" style={{ height: 46, width: 'auto' }} />
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 240, marginBottom: 18 }}>
              Nettoyage et detailing auto, canapé, tapis et matelas à domicile, sur {CITY} et alentours.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Sublim Net"
                className="flow-social-icon flow-social-instagram"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)' }}
              >
                <InstagramIcon size={19} />
              </a>
              <a
                href={TIKTOK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Sublim Net"
                className="flow-social-icon flow-social-tiktok"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)' }}
              >
                <TiktokIcon size={18} />
              </a>
            </div>
          </div>

          {/* Colonne 2 — navigation */}
          <div>
            <div style={{ fontFamily: F.heading, fontSize: 13, fontWeight: 600, color: C.white, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
              Navigation
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { to: '/',            label: 'Accueil' },
                { to: '/services',    label: 'Services' },
                { to: '/reservation', label: 'Réserver' },
                { to: '/devis-tapis', label: 'Devis Tapis' },
                { to: '/contact',     label: 'Avis & Contact' },
              ].map(({ to, label }) => (
                <Link key={to} to={to} style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', transition: 'color 0.2s', minHeight: 44, display: 'flex', alignItems: 'center' }}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Colonne 3 — contact */}
          <div>
            <div style={{ fontFamily: F.heading, fontSize: 13, fontWeight: 600, color: C.white, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
              Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href={PHONE} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.65)', minHeight: 44 }}>
                <PhoneIcon size={14} /> {PHONE_DISPLAY}
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#25D366', minHeight: 44 }}>
                <WhatsAppIcon size={14} color="#25D366" /> WhatsApp
              </a>
              <a href={`mailto:${EMAIL}`} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.65)', minHeight: 44 }}>
                <MailIcon size={14} /> {EMAIL}
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
                <PinIcon size={14} style={{ marginTop: 3, flexShrink: 0 }} /> Intervention à domicile — {CITY} et alentours
              </div>
            </div>
          </div>
        </div>

        {/* CTA WhatsApp */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 32, marginBottom: 32, textAlign: 'center' }}>
          <Btn href={WHATSAPP} variant="whatsapp" style={{ fontSize: 15, padding: '14px 28px' }} loc="footer">
            <WhatsAppIcon size={16} /> Nous écrire sur WhatsApp
          </Btn>
        </div>

        {/* Bas de page */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 24,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 8,
          fontSize: 12,
          color: 'rgba(255,255,255,0.35)',
        }}>
          <span>© {year} {SITE_NAME} — Tous droits réservés</span>
          <span style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/mentions-legales" style={{ color: 'rgba(255,255,255,0.35)' }}>Mentions légales</Link>
            <Link to="/confidentialite" style={{ color: 'rgba(255,255,255,0.35)' }}>Politique de confidentialité</Link>
            <span>Réalisé par <a href="https://wa.me/33783376293" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)' }}>Flōw Agency</a></span>
          </span>
        </div>
      </div>
    </footer>
  );
}
