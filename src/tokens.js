// ─────────────────────────────────────────────────────────────────────────────
// TOKENS.JS — Fichier unique à modifier pour chaque nouveau client
// Checklist : SITE_NAME, SITE_URL, PHONE, EMAIL, WHATSAPP, GA4_ID, couleurs, polices
// ─────────────────────────────────────────────────────────────────────────────

// ── IDENTITÉ ──────────────────────────────────────────────────────────────────
export const SITE_NAME     = 'NomClient';          // [TODO] Nom du client / de l'entreprise
export const SITE_URL      = 'https://exemple.fr'; // [TODO] URL complète sans slash final

// ── CONTACT ───────────────────────────────────────────────────────────────────
export const PHONE         = 'tel:+33600000000';   // [TODO] URI tel: — ex. tel:+33783376293
export const PHONE_DISPLAY = '06 00 00 00 00';     // [TODO] Numéro affiché — ex. 07 83 37 62 93
export const EMAIL         = 'client@gmail.com';   // [TODO] Email de contact

// Message WhatsApp pré-rempli — encoder les espaces en %20
export const WHATSAPP      = 'https://wa.me/33600000000?text=Bonjour%2C%20je%20souhaite%20un%20renseignement.';
// [TODO] Remplacer 33600000000 par l'indicatif sans le + et le numéro sans 0 initial
// Exemple Loya : wa.me/33783376293?text=Bonjour%2C%20je%20souhaite%20un%20devis.

export const ADDRESS       = '1 Rue Exemple, 33000 Bordeaux'; // [TODO]
export const CITY          = 'Bordeaux';                       // [TODO]
export const CITY_REGION   = 'Gironde';                        // [TODO]
export const ZIP           = '33000';                           // [TODO]

// ── ANALYTICS ─────────────────────────────────────────────────────────────────
export const GA4_ID = 'G-XXXXXXXXXX'; // [TODO] Créer propriété GA4 sur analytics.google.com

// ── COULEURS ──────────────────────────────────────────────────────────────────
// Modifier C.primary et C.secondary pour coller à l'identité du client.
// Les autres couleurs fonctionnent bien sans modification dans la plupart des cas.
export const C = {
  primary:   '#B87333',  // [TODO] Couleur principale (boutons, accents)
  secondary: '#7A8B6F',  // [TODO] Couleur secondaire (ex. sage, bleu, rouge...)

  dark:      '#2C2C2C',  // Texte principal — ne pas toucher sauf si fond sombre
  bg:        '#FAFAF5',  // Fond de page — voir règle absolue : jamais warmWhite comme seule couleur
  bgAlt:     '#F2EDE5',  // Fond alternatif pour les sections
  white:     '#FFFFFF',
  muted:     '#666666',  // Texte secondaire, sous-titres
  border:    '#E0D8CC',  // Séparateurs, bordures légères
  sand:      '#9E9080',  // Texte tertiaire
};

// ── TYPOGRAPHIE ───────────────────────────────────────────────────────────────
// Choisir dans la liste noire interdite : JAMAIS Inter, Roboto, Arial,
// Playfair Display, DM Sans, Cormorant Garamond.
// Coller le lien Google Fonts dans public/index.html (<link>) avant d'utiliser.
export const F = {
  heading: "'Josefin Sans', sans-serif",  // [TODO] Police des titres H1-H4
  body:    "'Figtree', sans-serif",        // [TODO] Police du corps de texte
};
// Google Fonts URL à copier dans public/index.html :
// https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700&family=Figtree:wght@400;500;600&display=swap
// [TODO] Remplacer Josefin+Sans et Figtree par les vraies polices choisies
