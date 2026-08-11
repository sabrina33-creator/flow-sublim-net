// ─────────────────────────────────────────────────────────────────────────────
// TOKENS.JS — Sublim Net
// Source unique de vérité : couleurs, polices, contact. Voir CLAUDE.md pour les
// règles métier figées (tarifs, zone, créneaux).
// ─────────────────────────────────────────────────────────────────────────────

// ── IDENTITÉ ──────────────────────────────────────────────────────────────────
export const SITE_NAME     = 'Sublim Net';
export const SITE_URL      = 'https://sublimnet.com';

// ── CONTACT ───────────────────────────────────────────────────────────────────
export const PHONE         = 'tel:+33779726076';
export const PHONE_DISPLAY = '07 79 72 60 76';
export const EMAIL         = 'sublimnet33@gmail.com';

export const WHATSAPP      = 'https://wa.me/33779726076?text=Bonjour%2C%20je%20souhaite%20un%20renseignement.';

// Adresse interne (calcul de distance uniquement) — NE JAMAIS AFFICHER PUBLIQUEMENT.
export const INTERNAL_ADDRESS = '20 rue François Rabelais, 33400 Talence';
// Géocodé via Nominatim — trouvé sous "Avenue François Rabelais" (Thouars, Talence) dans OSM.
export const INTERNAL_LAT = 44.796395;
export const INTERNAL_LON = -0.5961008;

// Ville affichée publiquement
export const CITY          = 'Talence';
export const CITY_REGION   = 'Gironde';
export const ZIP           = '33400';

// ── RÉSEAUX SOCIAUX ───────────────────────────────────────────────────────────
export const INSTAGRAM = 'https://instagram.com/sublimnet';
export const TIKTOK    = 'https://www.tiktok.com/@sublimnet';
export const SNAPCHAT  = 'https://www.snapchat.com/add/sublimnett';

// ── GOOGLE BUSINESS PROFILE ───────────────────────────────────────────────────
// Fiche existante identifiée et reprise en main — voir CLAUDE.md section GMB.
export const GOOGLE_REVIEWS_URL   = 'https://share.google/OO0MDj9rozdpL3ps7';
export const GOOGLE_RATING        = 5.0;
export const GOOGLE_REVIEW_COUNT  = 6;

// ── ANALYTICS ─────────────────────────────────────────────────────────────────
export const GA4_ID = 'G-KRYJ8JZ2QG';

// ── COULEURS ──────────────────────────────────────────────────────────────────
// Extraites par pipette depuis le visuel du camion Kangoo (src/images/SUBLIMNET_KANGOO_26 (1).png)
// violet #7F4997 → bleu #4C77BB (dégradé du lettrage script), marine #0D3857 (DETAILING AUTO)
export const C = {
  primary:   '#7F4997',  // violet — lettrage "Sublim"
  secondary: '#4C77BB',  // bleu — lettrage "Net" + icônes bandeau camion

  dark:      '#0D3857',  // marine — texte "DETAILING AUTO", fonds sombres
  bg:        '#FAFBFC',
  bgAlt:     '#F1F3F7',
  white:     '#FFFFFF',
  muted:     '#5B6B7A',
  border:    '#E1E6EC',
  sand:      '#5D6E7D', // assombri : la valeur d'origine (#8B98A5) échouait le contraste AA en usage texte (2.65-2.84:1)
};

// ── TYPOGRAPHIE ───────────────────────────────────────────────────────────────
// Corps/titres : jamais Inter, Roboto, Arial, Playfair Display, DM Sans, Cormorant Garamond.
export const F = {
  heading: "'Barlow Condensed', sans-serif",  // condensé bold — écho du bandeau camion
  body:    "'Manrope', sans-serif",
  script:  "'Dancing Script', cursive",       // logo uniquement — jamais pour le texte courant
};
// Google Fonts URL (déjà en place dans public/index.html) :
// https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&family=Dancing+Script:wght@600;700&display=swap
