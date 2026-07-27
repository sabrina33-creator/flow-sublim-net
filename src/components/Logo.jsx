// Logo — asset officiel fourni par le client (src/logo.png), fond blanc retiré et recadré
// sur le seul lettrage script "Sublim Net" (src/images/logo-script.png) pour un usage
// compact sur toutes les couleurs de fond (voir CLAUDE.md — jamais réinventé).
import logoScript from '../images/logo-script.png';

export default function Logo({ size = 26 }) {
  // Ratio réel du fichier recadré : 818×205
  const height = size;
  const width = Math.round(size * (818 / 205));
  return (
    <img
      src={logoScript}
      alt="Sublim Net"
      loading="eager"
      style={{ height, width, objectFit: 'contain', display: 'block' }}
    />
  );
}
