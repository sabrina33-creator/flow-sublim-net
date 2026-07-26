// Injecte les tokens.js comme variables CSS sur :root
// Permet à App.css d'utiliser var(--color-primary) etc. sans importer JS
// À rendre EN PREMIER dans App.js (avant Header, avant tout)
import { C, F } from '../tokens';

// Convertit #RRGGBB en rgba(r, g, b, alpha) — évite color-mix() (Safari < 16.2)
function hexAlpha(hex, alpha) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function CSSVars() {
  return (
    <style>{`
      :root {
        --color-primary:      ${C.primary};
        --color-secondary:    ${C.secondary};
        --color-dark:         ${C.dark};
        --color-bg:           ${C.bg};
        --color-bg-alt:       ${C.bgAlt};
        --color-white:        ${C.white};
        --color-muted:        ${C.muted};
        --color-border:       ${C.border};
        --color-sand:         ${C.sand};
        --color-primary-30:   ${hexAlpha(C.primary, 0.3)};
        --color-secondary-30: ${hexAlpha(C.secondary, 0.3)};
        --font-heading:       ${F.heading};
        --font-body:          ${F.body};
      }
    `}</style>
  );
}
