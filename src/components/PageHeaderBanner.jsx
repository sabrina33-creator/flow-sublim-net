// Bannière de header — utilisée sur Services / Réservation / Devis Tapis / Avis & Contact
// pour un traitement visuel cohérent (même overlay, même style de titre).
// Hauteur : 280px fixe sur mobile, 55svh sur desktop — voir .page-header-banner (App.css).
// Image par défaut : src/images/bleu-apres-banner.jpg (version optimisée web de
// bleu-apres.jpeg, fichier source jamais modifié ni déplacé). Passer `image` pour
// utiliser une autre photo (ex. tapis-banner.jpg sur Devis Tapis).
import { C, F } from '../tokens';
import FadeIn from './FadeIn';
import defaultBannerImg from '../images/bleu-apres-banner.jpg';

export default function PageHeaderBanner({ title, image }) {
  return (
    <section
      className="page-header-banner"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <img
        src={image || defaultBannerImg}
        alt=""
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
      />
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(13,56,87,0.6), rgba(13,56,87,0.72))' }}
      />
      <FadeIn style={{ position: 'relative', zIndex: 1, padding: '0 24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: F.heading, fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)', fontWeight: 800, color: '#fff', textWrap: 'balance' }}>
          {title}
        </h1>
        <div style={{ width: 48, height: 3, background: `linear-gradient(90deg, ${C.primary}, ${C.secondary})`, margin: '18px auto 0' }} />
      </FadeIn>
    </section>
  );
}
