import { C, F, SITE_URL, PHONE_DISPLAY, EMAIL } from '../tokens';
import FadeIn from '../components/FadeIn';

const SECTIONS = [
  {
    title: 'Éditeur du site',
    body: [
      'Le site Sublim Net est édité par :',
      'Kenzo Mendes, entrepreneur individuel (micro-entreprise)',
      'Nom commercial : Sublim Net',
      'SIRET : 95258635200025',
      'Adresse : 20 rue François Rabelais, 33400 Talence, France',
      `Téléphone : ${PHONE_DISPLAY}`,
      `Email : ${EMAIL}`,
      'TVA non applicable, article 293 B du Code général des impôts.',
    ],
  },
  {
    title: 'Directeur de la publication',
    body: ['Kenzo Mendes.'],
  },
  {
    title: 'Hébergement du site',
    body: [
      'Netlify, Inc.',
      '512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis',
      'https://www.netlify.com',
    ],
  },
  {
    title: 'Hébergement des données de réservation',
    body: [
      'Les données transmises via le formulaire de réservation sont hébergées par Supabase, sur des serveurs situés en Europe (Union Européenne).',
    ],
  },
  {
    title: 'Propriété intellectuelle',
    body: [
      "L'ensemble des contenus présents sur ce site (textes, photographies, logo) est la propriété de Sublim Net, sauf mention contraire. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation préalable, est interdite.",
    ],
  },
  {
    title: 'Crédits',
    body: ['Conception et développement : Flōw Agency.'],
  },
];

export default function MentionsLegalesPage() {
  return (
    <section className="sec-p" style={{ paddingTop: 120 }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
        <FadeIn>
          <h1 style={{ fontFamily: F.heading, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, color: C.dark, marginBottom: 8 }}>
            Mentions légales
          </h1>
          <p style={{ fontSize: 13, color: C.sand, marginBottom: 48 }}>{SITE_URL}</p>
        </FadeIn>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {SECTIONS.map(({ title, body }, i) => (
            <FadeIn key={title} delay={i * 0.04}>
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
