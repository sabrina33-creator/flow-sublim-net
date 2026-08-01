// Logo — asset officiel fourni par le client (src/logo.png), fond blanc retiré et recadré
// sur le seul lettrage script "Sublim Net" (src/images/logo-script.png) pour un usage
// compact sur toutes les couleurs de fond (voir CLAUDE.md — jamais réinventé).
import logoScript from '../images/logo-script.png';

// `size` accepte un nombre (px fixe, usage standard header/footer) ou une chaîne CSS
// (ex. "clamp(70px, 12vw, 140px)") pour un dimensionnement responsive sans JS — la largeur
// suit automatiquement via aspect-ratio (818×274, ratio réel du fichier recadré).
export default function Logo({ size = 26 }) {
  return (
    <img
      src={logoScript}
      alt="Sublim Net"
      loading="eager"
      style={{ height: size, width: 'auto', aspectRatio: '818 / 274', objectFit: 'contain', display: 'block' }}
    />
  );
}
