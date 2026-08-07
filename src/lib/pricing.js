// Grille tarifaire — voir CLAUDE.md "TARIFS CONFIRMÉS PAR LE CLIENT LE 2026-07-26"
// Source unique de vérité pour les prix. Ne pas dupliquer ces valeurs ailleurs.

export const GABARITS = [
  { id: 'citadine', label: 'Citadine' },
  { id: 'berline',  label: 'Berline'  },
  { id: 'suv',      label: 'SUV'      },
];

export const AUTO_FORMULES = [
  {
    id: 'exterieur', label: 'Extérieur seul',
    desc: 'Lavage carrosserie, jantes, vitres extérieures.',
    interieur: false, sameDay: true,
    prices: { citadine: 45, berline: 55, suv: 65 },
  },
  {
    id: 'express', label: 'Express (intérieur sans sièges)',
    desc: 'Aspiration, plastiques, vitres intérieures — hors sièges.',
    interieur: true, sameDay: false,
    prices: { citadine: 50, berline: 65, suv: 75 },
    details: [
      'Aspiration habitacle & coffre',
      'Nettoyage tableau de bord',
      'Nettoyage plastiques',
      'Vitrages intérieurs',
      "Parfum d'ambiance",
    ],
  },
  {
    id: 'confort', label: 'Confort (intérieur avec sièges)',
    desc: 'Nettoyage complet intérieur, sièges inclus.',
    interieur: true, sameDay: false,
    prices: { citadine: 90, berline: 105, suv: 115 },
    details: [
      'Nettoyage des surfaces plastiques',
      "Aspiration complète de l'habitacle et coffre",
      'Nettoyage et finition seuils de porte',
      'Vitrerie intérieure éclatante',
      'Shampoing complet des sièges, tapis',
      'Nettoyage cuir et alcantara',
      'Brillance et revitalisation des surfaces plastiques',
      "Parfum d'ambiance",
    ],
  },
  {
    id: 'ext_express', label: 'Extérieur + Express',
    desc: 'Extérieur complet + intérieur sans sièges.',
    interieur: true, sameDay: false,
    prices: { citadine: 95, berline: 120, suv: 140 },
  },
  {
    id: 'ext_confort', label: 'Extérieur + Confort',
    desc: 'Extérieur complet + intérieur avec sièges.',
    interieur: true, sameDay: false,
    prices: { citadine: 135, berline: 160, suv: 180 },
  },
];

export const OPTION_SUBLIME = {
  id: 'sublime', label: 'Option Sublime — shampoing moquette', prix: 20, cumulable: true,
};

export const SUPPLEMENTS_AUTO = [
  { id: 'poils_sable', label: "Poils d'animaux / sable", prix: 15 },
  { id: 'moisissure',  label: 'Moisissure',               prix: 20 },
  { id: 'tres_sale',   label: 'Véhicule très sale',        prix: 20 },
];

// Prestations courtes indépendantes — pas de formule, réservables le jour même
export const PRESTATIONS_COURTES = [
  { id: 'phare1', label: '1 phare',  prix: 25, sameDay: true },
  { id: 'phare2', label: '2 phares', prix: 45, sameDay: true },
];

export const CANAPE_TAILLES = [
  { id: 'canape2', label: '2 places',           prix: 40 },
  { id: 'canape3', label: '3 places',           prix: 50 },
  { id: 'canape4', label: '4 places',           prix: 60 },
  { id: 'canape6', label: '6 places',           prix: 80 },
  { id: 'canape7', label: '7 places',           prix: 90 },
  { id: 'fauteuil', label: 'Fauteuil / chaise', prix: 20 },
];

export const MATELAS_TAILLES = [
  { id: 'matelas1', label: '1 place',           prix: 45 },
  { id: 'matelas2', label: '2 places',           prix: 65 },
  { id: 'matelasenfant', label: 'Matelas enfant', prix: 35 },
];

// Zone & frais de déplacement — voir CLAUDE.md
export const RAYON_GRATUIT_KM = 20;
export const TARIF_KM_SUPPLEMENTAIRE = 0.75;

export function computeFraisDeplacement(distanceKm) {
  const depassement = Math.max(0, distanceKm - RAYON_GRATUIT_KM);
  return Math.round(depassement * TARIF_KM_SUPPLEMENTAIRE * 100) / 100;
}

export function computeAutoPrice(formuleId, gabaritId, { sublime = false, supplements = [] } = {}) {
  const formule = AUTO_FORMULES.find(f => f.id === formuleId);
  if (!formule) return null;
  let total = formule.prices[gabaritId] || 0;
  const breakdown = [{ label: `${formule.label} — ${GABARITS.find(g => g.id === gabaritId)?.label}`, prix: total }];

  if (sublime) {
    total += OPTION_SUBLIME.prix;
    breakdown.push({ label: OPTION_SUBLIME.label, prix: OPTION_SUBLIME.prix });
  }
  supplements.forEach(id => {
    const s = SUPPLEMENTS_AUTO.find(x => x.id === id);
    if (s) { total += s.prix; breakdown.push({ label: s.label, prix: s.prix }); }
  });

  return { total, breakdown, sameDay: formule.sameDay };
}
