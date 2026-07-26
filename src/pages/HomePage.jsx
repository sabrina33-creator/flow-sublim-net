// Page d'accueil — scaffold avec sections clés
// [TODO: Remplacer tous les textes entre crochets]
// [TODO: HERO_IMG = remplacer l'URL Unsplash par une vraie photo locale]
// import heroImg from '../hero.jpg'; → puis background: `url(${heroImg}) center/cover`
import { C, F, PHONE, PHONE_DISPLAY, WHATSAPP } from '../tokens';
import FadeIn from '../components/FadeIn';
import Btn from '../components/Btn';
import FaqItem from '../components/FaqItem';
import { WhatsAppIcon, PhoneIcon, CheckIcon } from '../components/Icons';

// Photo hero placeholder — remplacer par import local
const HERO_IMG = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80&auto=format';

// ─────────────────────────────────────────────────────────────────────────────
// DONNÉES — modifier ici pour personnaliser rapidement
// ─────────────────────────────────────────────────────────────────────────────
const ACCROCHE_H1  = '[TODO: Titre principal court — 4 à 6 mots]';
const ACCROCHE_SUB = '[TODO: Sous-titre 1 phrase — bénéfice concret, pas de jargon]';

const PAIN_POINTS = [
  { titre: '[TODO: Problème 1]', desc: '[TODO: Description en 1-2 phrases]' },
  { titre: '[TODO: Problème 2]', desc: '[TODO: Description en 1-2 phrases]' },
  { titre: '[TODO: Problème 3]', desc: '[TODO: Description en 1-2 phrases]' },
  { titre: '[TODO: Problème 4]', desc: '[TODO: Description en 1-2 phrases]' },
];

const SERVICES_APERCU = [
  {
    titre:  '[TODO: Service 1]',
    desc:   '[TODO: Description courte du service]',
    prix:   '[TODO: À partir de 00€]',
  },
  {
    titre:  '[TODO: Service 2]',
    desc:   '[TODO: Description courte du service]',
    prix:   '[TODO: À partir de 00€]',
  },
];

const VALEURS = [
  { titre: '[TODO: Valeur 1]', desc: '[TODO: 1 phrase]' },
  { titre: '[TODO: Valeur 2]', desc: '[TODO: 1 phrase]' },
  { titre: '[TODO: Valeur 3]', desc: '[TODO: 1 phrase]' },
  { titre: '[TODO: Valeur 4]', desc: '[TODO: 1 phrase]' },
];

const ETAPES = [
  { num: '01', titre: '[TODO: Étape 1]', desc: '[TODO: Description de l\'étape 1]' },
  { num: '02', titre: '[TODO: Étape 2]', desc: '[TODO: Description de l\'étape 2]' },
  { num: '03', titre: '[TODO: Étape 3]', desc: '[TODO: Description de l\'étape 3]' },
];

const FAQ = [
  { q: '[TODO: Question 1 ?]', r: '[TODO: Réponse complète 2-3 phrases]' },
  { q: '[TODO: Question 2 ?]', r: '[TODO: Réponse complète 2-3 phrases]' },
  { q: '[TODO: Question 3 ?]', r: '[TODO: Réponse complète 2-3 phrases]' },
  { q: '[TODO: Question 4 ?]', r: '[TODO: Réponse complète 2-3 phrases]' },
  { q: '[TODO: Question 5 ?]', r: '[TODO: Réponse complète 2-3 phrases]' },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      {/* hero-grain = texture SVG feTurbulence, classe définie dans App.css */}
      <section className="hero-grain" style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(0,0,0,0.52), rgba(0,0,0,0.52)), url(${HERO_IMG}) center/cover no-repeat`,
        color: '#fff',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto', padding: '120px 28px 80px', textAlign: 'center' }}>
          <FadeIn>
            <h1 style={{ fontFamily: F.heading, fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 700, marginBottom: 20, textWrap: 'balance' }}>
              {ACCROCHE_H1}
            </h1>
            <div style={{ width: 48, height: 3, background: C.primary, margin: '0 auto 24px' }} />
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', lineHeight: 1.7, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px', color: 'rgba(255,255,255,0.85)' }}>
              {ACCROCHE_SUB}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="hero-ctas" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Btn href={WHATSAPP} variant="whatsapp" style={{ fontSize: 15, padding: '14px 24px' }} loc="hero">
                <WhatsAppIcon size={17} /> WhatsApp
              </Btn>
              <Btn href={PHONE} variant="ghost" style={{ fontSize: 15, padding: '14px 24px' }} loc="hero">
                <PhoneIcon size={17} /> {PHONE_DISPLAY}
              </Btn>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PAIN POINTS ────────────────────────────────────────────────── */}
      <section className="sec-p" style={{ background: C.bgAlt }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <FadeIn>
            <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700, textAlign: 'center', color: C.dark, marginBottom: 16 }}>
              [TODO: Titre section — problème du client]
            </h2>
            <p style={{ textAlign: 'center', color: C.muted, maxWidth: 560, margin: '0 auto 56px' }}>
              [TODO: Sous-titre qui valide l'expérience du client]
            </p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {PAIN_POINTS.map(({ titre, desc }, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ background: C.bg, borderRadius: 12, padding: '28px 24px', border: `1px solid ${C.border}` }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: `${C.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <CheckIcon size={18} color={C.primary} />
                  </div>
                  <h3 style={{ fontFamily: F.heading, fontSize: 16, fontWeight: 700, color: C.dark, marginBottom: 8 }}>{titre}</h3>
                  <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6 }}>{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES APERÇU ────────────────────────────────────────────── */}
      <section className="sec-p">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <FadeIn>
            <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700, textAlign: 'center', color: C.dark, marginBottom: 16 }}>
              [TODO: Titre section services]
            </h2>
            <p style={{ textAlign: 'center', color: C.muted, maxWidth: 560, margin: '0 auto 56px' }}>
              [TODO: Sous-titre services]
            </p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {SERVICES_APERCU.map(({ titre, desc, prix }, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ borderRadius: 14, overflow: 'hidden', border: `1px solid ${C.border}` }}>
                  {/* [TODO: Ajouter une image ici — loading="lazy"] */}
                  <div style={{ height: 180, background: `linear-gradient(135deg, ${C.primary}22, ${C.secondary}22)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: C.muted }}>
                    [TODO: Photo service {i + 1}]
                  </div>
                  <div style={{ padding: '24px 20px' }}>
                    <h3 style={{ fontFamily: F.heading, fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 8 }}>{titre}</h3>
                    <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, marginBottom: 16 }}>{desc}</p>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.primary, marginBottom: 16 }}>{prix}</div>
                    <Btn href={WHATSAPP} variant="primary" style={{ width: '100%', justifyContent: 'center', fontSize: 13 }} loc="services_card">
                      <WhatsAppIcon size={13} /> Demander un devis
                    </Btn>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALEURS / DIFFÉRENCIATEURS ─────────────────────────────────── */}
      <section className="sec-p" style={{ background: C.dark, color: C.white }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <FadeIn>
            <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700, textAlign: 'center', marginBottom: 16 }}>
              [TODO: Titre section — ce qui nous distingue]
            </h2>
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.65)', maxWidth: 560, margin: '0 auto 56px' }}>
              [TODO: Sous-titre]
            </p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 28 }}>
            {VALEURS.map(({ titre, desc }, i) => (
              <FadeIn key={i} delay={i * 0.09}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: `${C.primary}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckIcon size={20} color={C.primary} />
                  </div>
                  <h3 style={{ fontFamily: F.heading, fontSize: 17, fontWeight: 700, color: C.white }}>{titre}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ──────────────────────────────────────────── */}
      {/* Classes CSS dans App.css : .flow-steps-grid, .flow-steps-line, .flow-ghost-num */}
      <section className="sec-p" style={{ background: C.bgAlt }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          <FadeIn>
            <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700, textAlign: 'center', color: C.dark, marginBottom: 12 }}>
              [TODO: Titre — ex. "Comment ça marche ?"]
            </h2>
            <p style={{ textAlign: 'center', color: C.muted, margin: '0 auto 56px', maxWidth: 460 }}>
              [TODO: Sous-titre court — ex. "Trois étapes. Pas une de plus."]
            </p>
          </FadeIn>
          <div style={{ position: 'relative' }}>
            <div className="flow-steps-line" />
            <div className="flow-steps-grid">
              {ETAPES.map(({ num, titre, desc }, i) => (
                <FadeIn key={i} delay={i * 0.15}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 12px', position: 'relative' }}>
                    <span className="flow-ghost-num" aria-hidden="true">{num}</span>
                    <div style={{
                      width: 80, height: 80, borderRadius: '50%',
                      background: i === ETAPES.length - 1
                        ? `linear-gradient(135deg, ${C.secondary}, ${C.primary})`
                        : `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', marginBottom: 20,
                      boxShadow: `0 8px 24px ${C.primary}40`,
                      position: 'relative', zIndex: 1,
                      fontFamily: F.heading, fontSize: 22, fontWeight: 800,
                    }}>
                      {num}
                    </div>
                    <h3 style={{ fontFamily: F.heading, fontSize: 20, fontWeight: 700, color: C.dark, marginBottom: 10 }}>{titre}</h3>
                    <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      {/* FaqItem : composant React avec useState + aria-expanded (src/components/FaqItem.jsx) */}
      <section className="sec-p">
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
          <FadeIn>
            <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700, textAlign: 'center', color: C.dark, marginBottom: 52 }}>
              Questions fréquentes
            </h2>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ.map(({ q, r }, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="flow-faq">
                  <FaqItem q={q} a={r} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ──────────────────────────────────────────────────── */}
      <section style={{ background: C.primary, color: C.white, padding: '80px 24px', textAlign: 'center' }}>
        <FadeIn>
          <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700, marginBottom: 16 }}>
            [TODO: Accroche finale — incitation à l'action]
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 480, margin: '0 auto 32px', fontSize: 16, lineHeight: 1.7 }}>
            [TODO: Phrase rassurante — ex. "Premier échange gratuit, sans engagement."]
          </p>
          <div className="hero-ctas" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn href={WHATSAPP} variant="light" style={{ fontSize: 15, padding: '14px 28px' }} loc="cta_final">
              <WhatsAppIcon size={17} color={C.primary} /> Nous écrire
            </Btn>
            <Btn href={PHONE} variant="ghost" style={{ fontSize: 15, padding: '14px 28px' }} loc="cta_final">
              <PhoneIcon size={17} /> Appeler
            </Btn>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
