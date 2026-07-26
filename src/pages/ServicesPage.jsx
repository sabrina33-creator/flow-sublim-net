// Page Services — scaffold
// [TODO: Adapter les services, prix, descriptions]
// [TODO: Ajouter les vraies photos]
import { C, F, WHATSAPP, PHONE, PHONE_DISPLAY } from '../tokens';
import FadeIn from '../components/FadeIn';
import Btn from '../components/Btn';
import { WhatsAppIcon, PhoneIcon, CheckIcon } from '../components/Icons';

// Photo hero placeholder
const SERVICES_IMG = 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1600&q=80&auto=format';

const SERVICES = [
  {
    titre:       '[TODO: Nom du service 1]',
    description: '[TODO: Description complète du service 1 — 2-3 phrases]',
    prix:        '[TODO: 000€]',
    inclus: [
      '[TODO: Élément inclus 1]',
      '[TODO: Élément inclus 2]',
      '[TODO: Élément inclus 3]',
      '[TODO: Élément inclus 4]',
    ],
    delai: '[TODO: Délai — ex. 5 à 7 jours]',
    // imgSrc: serviceImg1, // [TODO: import serviceImg1 from '../service1.jpg']
  },
  {
    titre:       '[TODO: Nom du service 2]',
    description: '[TODO: Description complète du service 2]',
    prix:        '[TODO: 000€]',
    inclus: [
      '[TODO: Élément inclus 1]',
      '[TODO: Élément inclus 2]',
      '[TODO: Élément inclus 3]',
    ],
    delai: '[TODO: Délai]',
  },
  {
    titre:       '[TODO: Nom du service 3]',
    description: '[TODO: Description complète du service 3]',
    prix:        '[TODO: 000€]',
    inclus: [
      '[TODO: Élément inclus 1]',
      '[TODO: Élément inclus 2]',
      '[TODO: Élément inclus 3]',
      '[TODO: Élément inclus 4]',
      '[TODO: Élément inclus 5]',
    ],
    delai: '[TODO: Délai]',
    recommended: true,
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '55svh',
        display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${SERVICES_IMG}) center/cover no-repeat`,
        color: '#fff',
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto', padding: '120px 28px 64px', textAlign: 'center' }}>
          <FadeIn>
            <h1 style={{ fontFamily: F.heading, fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, marginBottom: 16 }}>
              [TODO: Titre page services]
            </h1>
            <div style={{ width: 48, height: 3, background: C.primary, margin: '0 auto 20px' }} />
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
              [TODO: Accroche services en 1-2 phrases]
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── LISTE SERVICES ─────────────────────────────────────────────── */}
      <section className="sec-p">
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {SERVICES.map(({ titre, description, prix, inclus, delai, recommended }, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{
                  borderRadius: 14,
                  border: recommended ? `2px solid ${C.primary}` : `1px solid ${C.border}`,
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  {recommended && (
                    <div style={{
                      position: 'absolute', top: 16, right: 16,
                      background: C.primary, color: '#fff',
                      fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20,
                    }}>
                      Recommandé
                    </div>
                  )}

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 0,
                  }}>
                    {/* Info principale */}
                    <div style={{ padding: '36px 32px', background: C.bg }}>
                      <h2 style={{ fontFamily: F.heading, fontSize: 22, fontWeight: 700, color: C.dark, marginBottom: 12 }}>
                        {titre}
                      </h2>
                      <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>{description}</p>
                      <div style={{ fontSize: 28, fontWeight: 800, color: C.primary, fontFamily: F.heading, marginBottom: 4 }}>{prix}</div>
                      {delai && (
                        <div style={{ fontSize: 13, color: C.muted }}>Délai : {delai}</div>
                      )}
                    </div>

                    {/* Inclus + CTA */}
                    <div style={{ padding: '36px 32px', background: C.bgAlt }}>
                      <div style={{ fontFamily: F.heading, fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.muted, marginBottom: 16 }}>
                        Ce qui est inclus
                      </div>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                        {inclus.map((item, j) => (
                          <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: C.dark }}>
                            <CheckIcon size={16} color={C.primary} style={{ marginTop: 2, flexShrink: 0 }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Btn
                        href={WHATSAPP}
                        variant={recommended ? 'primary' : 'secondary'}
                        style={{ width: '100%', justifyContent: 'center', fontSize: 14 }}
                        loc={`service_${i + 1}`}
                      >
                        <WhatsAppIcon size={14} color={recommended ? '#fff' : C.muted} />
                        Demander un devis
                      </Btn>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section style={{ background: C.dark, color: C.white, padding: '64px 24px', textAlign: 'center' }}>
        <FadeIn>
          <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 700, marginBottom: 14 }}>
            [TODO: CTA — ex. "Une question avant de vous lancer ?"]
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 440, margin: '0 auto 28px', fontSize: 15 }}>
            [TODO: Rassurance — ex. "Premier échange gratuit, réponse sous 24h."]
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn href={WHATSAPP} variant="whatsapp" style={{ fontSize: 15, padding: '13px 24px' }} loc="services_cta">
              <WhatsAppIcon size={16} /> WhatsApp
            </Btn>
            <Btn href={PHONE} variant="ghost" style={{ fontSize: 15, padding: '13px 24px' }} loc="services_cta">
              <PhoneIcon size={16} /> {PHONE_DISPLAY}
            </Btn>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
