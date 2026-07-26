// Page Contact — WhatsApp + téléphone + email (pas de formulaire par défaut)
// Règle : pas de formulaire si on peut éviter (friction inutile)
// [TODO: Adapter les zones géographiques et les horaires]
import { C, F, PHONE, PHONE_DISPLAY, EMAIL, WHATSAPP } from '../tokens';
import FadeIn from '../components/FadeIn';
import Btn from '../components/Btn';
import { WhatsAppIcon, PhoneIcon, MailIcon, PinIcon, CheckIcon } from '../components/Icons';

const CONTACT_IMG = 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80&auto=format';

const ZONES = [
  '[TODO: Ville ou zone 1]',
  '[TODO: Ville ou zone 2]',
  '[TODO: Ville ou zone 3]',
  '[TODO: Ville ou zone 4]',
  '[TODO: Et alentours]',
];

const HORAIRES = [
  { jours: '[TODO: Lundi — Vendredi]', heures: '[TODO: 9h — 19h]' },
  { jours: '[TODO: Samedi]',           heures: '[TODO: 9h — 17h]' },
  { jours: '[TODO: Dimanche]',         heures: '[TODO: Sur rendez-vous]' },
];

export default function ContactPage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '50svh',
        display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${CONTACT_IMG}) center/cover no-repeat`,
        color: '#fff',
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto', padding: '120px 28px 60px', textAlign: 'center' }}>
          <FadeIn>
            <h1 style={{ fontFamily: F.heading, fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 700, marginBottom: 14 }}>
              [TODO: Titre page contact — ex. "Parlons de votre projet"]
            </h1>
            <div style={{ width: 48, height: 3, background: C.primary, margin: '0 auto 18px' }} />
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
              [TODO: 1 phrase — ex. "Premier échange gratuit, sans engagement."]
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── CANAUX DE CONTACT ──────────────────────────────────────────── */}
      <section className="sec-p">
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          <FadeIn>
            <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 700, textAlign: 'center', color: C.dark, marginBottom: 44 }}>
              Comment nous joindre
            </h2>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 60 }}>
            {/* WhatsApp */}
            <FadeIn>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', textDecoration: 'none' }}
                onClick={() => {}}
              >
                <div style={{
                  background: C.bg, border: `1px solid ${C.border}`,
                  borderRadius: 14, padding: '28px 24px', textAlign: 'center',
                  transition: 'border-color 0.2s, transform 0.2s',
                  cursor: 'pointer',
                }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#25D36622', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <WhatsAppIcon size={26} color="#25D366" />
                  </div>
                  <div style={{ fontFamily: F.heading, fontWeight: 700, fontSize: 17, color: C.dark, marginBottom: 6 }}>WhatsApp</div>
                  <div style={{ fontSize: 14, color: C.muted, marginBottom: 16 }}>Réponse rapide — message ou appel</div>
                  <div style={{ fontSize: 13, color: '#25D366', fontWeight: 600 }}>Nous écrire →</div>
                </div>
              </a>
            </FadeIn>

            {/* Téléphone */}
            <FadeIn delay={0.08}>
              <a href={PHONE} style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{
                  background: C.bg, border: `1px solid ${C.border}`,
                  borderRadius: 14, padding: '28px 24px', textAlign: 'center',
                  cursor: 'pointer',
                }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${C.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <PhoneIcon size={24} color={C.primary} />
                  </div>
                  <div style={{ fontFamily: F.heading, fontWeight: 700, fontSize: 17, color: C.dark, marginBottom: 6 }}>Téléphone</div>
                  <div style={{ fontSize: 14, color: C.muted, marginBottom: 16 }}>Disponible selon nos horaires</div>
                  <div style={{ fontSize: 15, color: C.primary, fontWeight: 700 }}>{PHONE_DISPLAY}</div>
                </div>
              </a>
            </FadeIn>

            {/* Email */}
            <FadeIn delay={0.16}>
              <a href={`mailto:${EMAIL}`} style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{
                  background: C.bg, border: `1px solid ${C.border}`,
                  borderRadius: 14, padding: '28px 24px', textAlign: 'center',
                  cursor: 'pointer',
                }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${C.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <MailIcon size={24} color={C.primary} />
                  </div>
                  <div style={{ fontFamily: F.heading, fontWeight: 700, fontSize: 17, color: C.dark, marginBottom: 6 }}>Email</div>
                  <div style={{ fontSize: 14, color: C.muted, marginBottom: 16 }}>Réponse sous 24h</div>
                  <div style={{ fontSize: 13, color: C.primary, fontWeight: 600, wordBreak: 'break-all' }}>{EMAIL}</div>
                </div>
              </a>
            </FadeIn>
          </div>

          {/* Zones & horaires */}
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28 }}>
              {/* Zones */}
              <div style={{ background: C.bgAlt, borderRadius: 12, padding: '28px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                  <PinIcon size={18} color={C.primary} />
                  <span style={{ fontFamily: F.heading, fontWeight: 700, fontSize: 16, color: C.dark }}>Zone d'intervention</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {ZONES.map((zone, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: C.muted }}>
                      <CheckIcon size={14} color={C.primary} /> {zone}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Horaires */}
              <div style={{ background: C.bgAlt, borderRadius: 12, padding: '28px 24px' }}>
                <div style={{ fontFamily: F.heading, fontWeight: 700, fontSize: 16, color: C.dark, marginBottom: 18 }}>
                  Horaires
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {HORAIRES.map(({ jours, heures }, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, paddingBottom: 10, borderBottom: i < HORAIRES.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                      <span style={{ color: C.muted }}>{jours}</span>
                      <span style={{ fontWeight: 600, color: C.dark }}>{heures}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA FINAL ──────────────────────────────────────────────────── */}
      <section style={{ background: C.primary, color: C.white, padding: '64px 24px', textAlign: 'center' }}>
        <FadeIn>
          <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 700, marginBottom: 12 }}>
            [TODO: CTA — ex. "Prêt à démarrer ?"]
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 400, margin: '0 auto 28px', fontSize: 15 }}>
            [TODO: Rassurance — ex. "Sans engagement, nous vous répondons en moins de 2h."]
          </p>
          <Btn href={WHATSAPP} variant="light" style={{ fontSize: 15, padding: '13px 28px' }} loc="contact_cta">
            <WhatsAppIcon size={16} color={C.primary} /> Démarrer sur WhatsApp
          </Btn>
        </FadeIn>
      </section>
    </>
  );
}
