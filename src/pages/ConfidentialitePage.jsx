import { C, F, EMAIL } from '../tokens';
import FadeIn from '../components/FadeIn';

const SECTIONS = [
  {
    title: 'Responsable du traitement',
    body: [
      `Kenzo Mendes (Sublim Net) est responsable du traitement des données collectées sur ce site. Contact : ${EMAIL}.`,
    ],
  },
  {
    title: 'Données collectées',
    body: [
      'Formulaire de réservation (Auto, Canapé, Matelas) : nom, prénom, téléphone, email, adresse d\'intervention.',
      'Demande de devis Tapis : les informations que vous choisissez de transmettre (nom, dimensions, description) partent directement dans une conversation WhatsApp — elles ne sont pas stockées sur nos serveurs.',
    ],
  },
  {
    title: 'Finalités du traitement',
    body: [
      'Traiter et confirmer votre réservation.',
      "Calculer les frais de déplacement à partir de votre adresse (l'adresse est transmise à Nominatim/OpenStreetMap, service de géolocalisation gratuit, uniquement pour ce calcul de distance).",
      'Vous contacter au sujet de votre réservation si nécessaire.',
    ],
  },
  {
    title: 'Base légale',
    body: ["L'exécution d'un contrat : le traitement de vos données est nécessaire à la fourniture de la prestation que vous avez demandée."],
  },
  {
    title: 'Destinataires des données',
    body: [
      'Vos données sont accessibles uniquement à Kenzo Mendes, qui consulte directement les réservations dans son outil de gestion de base de données (Supabase). Elles ne sont ni vendues, ni cédées, ni partagées à des fins commerciales avec un tiers.',
    ],
  },
  {
    title: 'Sous-traitants techniques',
    body: [
      'Supabase — hébergement de la base de données de réservation, serveurs situés en Europe (Union Européenne).',
      "Resend — envoi de l'email de confirmation de réservation.",
      'Nominatim / OpenStreetMap — géocodage de l\'adresse pour le calcul de distance (adresse transmise ponctuellement, non conservée par ce service).',
    ],
  },
  {
    title: 'Durée de conservation',
    body: [
      'Les données liées à une réservation sont conservées 3 ans à compter de la dernière prestation, sauf demande de suppression anticipée de votre part.',
    ],
  },
  {
    title: 'Cookies',
    body: [
      "Ce site utilise Google Analytics (GA4) pour mesurer la fréquentation (pages consultées, provenance des visites) — aucune donnée n'est utilisée à des fins publicitaires.",
      "Un cookie de mesure d'audience n'est déposé qu'après votre consentement explicite, recueilli via le bandeau affiché lors de votre première visite. Vous pouvez modifier votre choix à tout moment via le lien \"Gérer les cookies\" en bas de chaque page.",
    ],
  },
  {
    title: 'Vos droits',
    body: [
      `Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition concernant vos données personnelles. Pour exercer ces droits, contactez-nous à ${EMAIL} — réponse sous un mois.`,
      "Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (www.cnil.fr) si vous estimez que vos droits ne sont pas respectés.",
    ],
  },
  {
    title: 'Sécurité',
    body: [
      "L'accès public à la base de données est restreint par des règles de sécurité (Row Level Security) : seule l'insertion d'une nouvelle réservation est autorisée publiquement, la lecture des données personnelles des autres clients n'est jamais accessible depuis le site.",
    ],
  },
];

export default function ConfidentialitePage() {
  return (
    <section className="sec-p" style={{ paddingTop: 120 }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
        <FadeIn>
          <h1 style={{ fontFamily: F.heading, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, color: C.dark, marginBottom: 8 }}>
            Politique de confidentialité
          </h1>
          <p style={{ fontSize: 13, color: C.sand, marginBottom: 48 }}>
            Dernière mise à jour : 28 juillet 2026
          </p>
        </FadeIn>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {SECTIONS.map(({ title, body }, i) => (
            <FadeIn key={title} delay={i * 0.03}>
              <h2 style={{ fontFamily: F.heading, fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 10 }}>
                {title}
              </h2>
              {body.map((p, j) => (
                <p key={j} style={{ fontSize: 14, color: C.muted, lineHeight: 1.8, marginBottom: 4 }}>
                  {p}
                </p>
              ))}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
