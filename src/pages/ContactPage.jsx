// Page Avis & Contact — note et nombre d'avis affichés uniquement depuis que la
// fiche Google Business Profile est confirmée et reprise en main (voir CLAUDE.md
// section GMB). Pas de contenu détaillé des avis, juste le rappel + lien source.
import { C, F, PHONE, PHONE_DISPLAY, EMAIL, WHATSAPP, CITY, INSTAGRAM, TIKTOK, GOOGLE_REVIEWS_URL, GOOGLE_RATING, GOOGLE_REVIEW_COUNT, AREA_SERVED_CITIES } from '../tokens';
import { RAYON_GRATUIT_KM, TARIF_KM_SUPPLEMENTAIRE } from '../lib/pricing';
import FadeIn from '../components/FadeIn';
import Btn from '../components/Btn';
import { WhatsAppIcon, PhoneIcon, MailIcon, PinIcon, CheckIcon, InstagramIcon, TiktokIcon, StarIcon } from '../components/Icons';
import PageHeaderBanner from '../components/PageHeaderBanner';
import Seo from '../components/Seo';

const HORAIRES = [
  { jours: 'Tous les jours (7j/7)', heures: '07:30' },
  { jours: 'Tous les jours (7j/7)', heures: '14:30' },
];

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Avis clients et contact | Sublim Net"
        description="5,0 sur Google (6 avis). Contactez Sublim Net par téléphone, WhatsApp ou email — zone d'intervention et créneaux de réservation."
        path="/contact"
      />
      <PageHeaderBanner title="Avis & Contact" />

      {/* ── AVIS — note et nombre réels, source Google, pas de contenu détaillé ── */}
      <section className="sec-p-sm">
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <FadeIn>
            <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 700, color: C.dark, marginBottom: 14 }}>
              Avis clients
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 10 }}>
              {[...Array(5)].map((_, i) => <StarIcon key={i} size={20} color={C.primary} />)}
            </div>
            <p style={{ fontSize: 16, fontWeight: 700, color: C.dark, marginBottom: 10 }}>
              {GOOGLE_RATING.toFixed(1)} sur Google — {GOOGLE_REVIEW_COUNT} avis
            </p>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7 }}>
              Ils nous font confiance. <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" style={{ color: C.primary, fontWeight: 600 }}>Voir la fiche Google →</a>
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
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
                <div className="flow-card-cta" style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14, padding: '28px 24px', textAlign: 'center', cursor: 'pointer' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#25D36622', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <WhatsAppIcon size={26} color="#25D366" />
                  </div>
                  <div style={{ fontFamily: F.heading, fontWeight: 700, fontSize: 17, color: C.dark, marginBottom: 6 }}>WhatsApp</div>
                  <div style={{ fontSize: 14, color: C.muted, marginBottom: 16 }}>Réponse rapide — message ou appel</div>
                  <div style={{ fontSize: 13, color: '#075E54', fontWeight: 600 }}>Nous écrire →</div>
                </div>
              </a>
            </FadeIn>

            {/* Téléphone */}
            <FadeIn delay={0.08}>
              <a href={PHONE} style={{ display: 'block', textDecoration: 'none' }}>
                <div className="flow-card-cta" style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14, padding: '28px 24px', textAlign: 'center', cursor: 'pointer' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${C.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <PhoneIcon size={24} color={C.primary} />
                  </div>
                  <div style={{ fontFamily: F.heading, fontWeight: 700, fontSize: 17, color: C.dark, marginBottom: 6 }}>Téléphone</div>
                  <div style={{ fontSize: 14, color: C.muted, marginBottom: 16 }}>Pour toute question, et seul moyen d'annuler</div>
                  <div style={{ fontSize: 15, color: C.primary, fontWeight: 700 }}>{PHONE_DISPLAY}</div>
                </div>
              </a>
            </FadeIn>

            {/* Email */}
            <FadeIn delay={0.16}>
              <a href={`mailto:${EMAIL}`} style={{ display: 'block', textDecoration: 'none' }}>
                <div className="flow-card-cta" style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14, padding: '28px 24px', textAlign: 'center', cursor: 'pointer' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${C.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <MailIcon size={24} color={C.primary} />
                  </div>
                  <div style={{ fontFamily: F.heading, fontWeight: 700, fontSize: 17, color: C.dark, marginBottom: 6 }}>Email</div>
                  <div style={{ fontSize: 14, color: C.muted, marginBottom: 16 }}>Pour toute question écrite</div>
                  <div style={{ fontSize: 13, color: C.primary, fontWeight: 600, wordBreak: 'break-all' }}>{EMAIL}</div>
                </div>
              </a>
            </FadeIn>
          </div>

          {/* Zones & créneaux */}
          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28 }}>
              {/* Zone */}
              <div style={{ background: C.bgAlt, borderRadius: 12, padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                  <PinIcon size={18} color={C.primary} />
                  <span style={{ fontFamily: F.heading, fontWeight: 700, fontSize: 16, color: C.dark }}>Zone d'intervention</span>
                </div>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 12 }}>
                  Intervention à domicile depuis {CITY} ({RAYON_GRATUIT_KM} km offerts).
                </p>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 12 }}>
                  {AREA_SERVED_CITIES.join(', ')}.
                </p>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginTop: 'auto' }}>
                  Au-delà, {TARIF_KM_SUPPLEMENTAIRE}€/km sur le dépassement uniquement — calculé automatiquement lors de la réservation.
                </p>
              </div>

              {/* Créneaux */}
              <div style={{ background: C.bgAlt, borderRadius: 12, padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: F.heading, fontWeight: 700, fontSize: 16, color: C.dark, marginBottom: 18 }}>
                  Créneaux — 7j/7
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
                  {HORAIRES.map(({ jours, heures }, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, paddingBottom: 10, borderBottom: i < HORAIRES.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                      <span style={{ color: C.muted }}>{jours}</span>
                      <span style={{ fontWeight: 700, color: C.dark }}>{heures}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: C.sand, lineHeight: 1.6, marginTop: 'auto' }}>
                  Délai minimum 24h, sauf Extérieur seul et phares (jour même). Annulation uniquement par téléphone.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Réseaux sociaux */}
          <FadeIn>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Sublim Net"
                className="flow-social-icon flow-social-instagram"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', background: '#E1306C18', color: '#E1306C' }}
              >
                <InstagramIcon size={22} />
              </a>
              <a
                href={TIKTOK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Sublim Net"
                className="flow-social-icon flow-social-tiktok"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', background: `${C.dark}12`, color: C.dark }}
              >
                <TiktokIcon size={21} />
              </a>
              {/* Snapchat retiré : compte SUBLIMNETT introuvable (ni web ni recherche in-app) — voir CLAUDE.md */}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA FINAL ──────────────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(120deg, ${C.primary}, ${C.secondary})`, color: C.white, padding: '64px 24px', textAlign: 'center' }}>
        <FadeIn>
          <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 700, marginBottom: 12 }}>
            Prêt à réserver ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: 400, margin: '0 auto 28px', fontSize: 15 }}>
            Votre créneau est confirmé immédiatement, sans attente.
          </p>
          <Btn href="/reservation" variant="light" style={{ fontSize: 15, padding: '13px 28px' }} loc="contact_cta">
            <CheckIcon size={16} color={C.primary} /> Réserver mon créneau
          </Btn>
        </FadeIn>
      </section>
    </>
  );
}
