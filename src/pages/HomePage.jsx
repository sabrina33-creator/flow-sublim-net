import { C, F, PHONE, PHONE_DISPLAY, WHATSAPP, CITY } from '../tokens';
import FadeIn from '../components/FadeIn';
import Btn from '../components/Btn';
import FaqItem from '../components/FaqItem';
import { WhatsAppIcon, PhoneIcon, CheckIcon } from '../components/Icons';
import { RAYON_GRATUIT_KM, TARIF_KM_SUPPLEMENTAIRE } from '../lib/pricing';

import heroImg from '../images/volant-apres.jpeg';
import apercuAuto from '../images/roue-apres.jpeg';
import apercuCanape from '../images/bleu-apres.jpeg';
import apercuTapis from '../images/rail-apres.jpeg';
import apercuMatelas from '../images/camion-arriere-apres.jpeg';

const ACCROCHE_H1  = 'Votre véhicule et votre intérieur, sublimés à domicile';
const ACCROCHE_SUB = "Detailing auto, canapé, tapis et matelas — on se déplace chez vous, sur Talence et ses alentours.";

const PAIN_POINTS = [
  { titre: 'Pas le temps de vous déplacer', desc: "On vient directement chez vous, à l'heure convenue — aucun trajet à prévoir." },
  { titre: 'Réservation qui traîne',        desc: "Réservation en ligne automatique et définitive, sans attendre de confirmation." },
  { titre: 'Prix flous',                    desc: "Grille tarifaire claire par gabarit et par formule, frais de déplacement affichés séparément." },
  { titre: 'Résultat décevant',             desc: "Un vrai travail de detailing, pas un simple coup d'aspirateur." },
];

const SERVICES_APERCU = [
  { titre: 'Auto',    desc: 'Extérieur, intérieur ou les deux — citadine, berline, SUV.',        prix: 'À partir de 45€', img: apercuAuto },
  { titre: 'Canapé',  desc: 'De 2 places au canapé 7 places, fauteuils inclus.',                  prix: 'À partir de 20€', img: apercuCanape },
  { titre: 'Tapis',   desc: 'Sur devis uniquement, selon dimensions et état.',                    prix: 'Sur devis',       img: apercuTapis },
  { titre: 'Matelas',  desc: '1 place, 2 places ou matelas enfant.',                              prix: 'À partir de 35€', img: apercuMatelas },
];

const VALEURS = [
  { titre: 'À domicile',           desc: "On intervient directement chez vous, pas besoin de vous déplacer." },
  { titre: 'Réservation immédiate', desc: 'Créneau réservé en ligne en quelques clics, sans appel préalable.' },
  { titre: 'Tarifs transparents',   desc: 'Grille de prix claire, frais de déplacement affichés à part.' },
  { titre: 'Zone étendue',          desc: `Rayon de ${RAYON_GRATUIT_KM} km offert autour de ${CITY}, au-delà ${TARIF_KM_SUPPLEMENTAIRE}€/km.` },
];

const ETAPES = [
  { num: '01', titre: 'Choisissez votre formule',   desc: 'Auto, canapé, tapis ou matelas — sélectionnez la prestation adaptée.' },
  { num: '02', titre: 'Réservez votre créneau',      desc: '07:30 ou 14:30, 7j/7 — réservation en ligne automatique et définitive.' },
  { num: '03', titre: 'On vient chez vous',          desc: "Intervention à domicile à l'heure convenue, sur l'adresse indiquée." },
];

const FAQ = [
  { q: 'Quelle est la différence entre Express et Confort ?', r: "Express nettoie l'intérieur sans les sièges. Confort inclut un nettoyage complet de l'intérieur, sièges compris." },
  { q: 'Puis-je réserver le jour même ?', r: "Oui, uniquement pour la formule Extérieur seul et les prestations phares. Toute formule avec intérieur (Express, Confort, combinés) nécessite un délai minimum de 24h." },
  { q: 'Comment sont calculés les frais de déplacement ?', r: `Le rayon de ${RAYON_GRATUIT_KM} km autour de notre zone d'intervention est offert. Au-delà, ${TARIF_KM_SUPPLEMENTAIRE}€/km sont appliqués uniquement sur le dépassement, affichés en ligne séparée lors de la réservation.` },
  { q: 'Comment annuler une réservation ?', r: `L'annulation se fait uniquement par téléphone au ${PHONE_DISPLAY} — pas d'annulation en ligne.` },
  { q: 'Le tapis est-il réservable en ligne comme les autres services ?', r: "Non, le tapis est uniquement sur devis : dites-nous-en plus via notre parcours dédié, sans réservation automatique." },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="hero-grain" style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(13,56,87,0.72), rgba(13,56,87,0.55)), url(${heroImg}) center/cover no-repeat`,
        color: '#fff',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto', padding: '120px 28px 80px', textAlign: 'center' }}>
          <FadeIn>
            <h1 style={{ fontFamily: F.heading, fontSize: 'clamp(2.4rem, 7vw, 4.4rem)', fontWeight: 800, marginBottom: 20, textWrap: 'balance' }}>
              {ACCROCHE_H1}
            </h1>
            <div style={{ width: 48, height: 3, background: `linear-gradient(90deg, ${C.primary}, ${C.secondary})`, margin: '0 auto 24px' }} />
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', lineHeight: 1.7, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px', color: 'rgba(255,255,255,0.9)' }}>
              {ACCROCHE_SUB}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="hero-ctas" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Btn href="/reservation" variant="primary" style={{ fontSize: 15, padding: '14px 26px' }} loc="hero">
                Réserver un créneau
              </Btn>
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
            <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, textAlign: 'center', color: C.dark, marginBottom: 16 }}>
              Le nettoyage à domicile, sans les contraintes
            </h2>
            <p style={{ textAlign: 'center', color: C.muted, maxWidth: 560, margin: '0 auto 56px' }}>
              On sait ce qui freine — voici comment Sublim Net simplifie les choses.
            </p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {PAIN_POINTS.map(({ titre, desc }, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flow-card" style={{ background: C.bg, borderRadius: 12, padding: '28px 24px', border: `1px solid ${C.border}` }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: `${C.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <CheckIcon size={18} color={C.primary} />
                  </div>
                  <h3 style={{ fontFamily: F.heading, fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 8 }}>{titre}</h3>
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
            <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, textAlign: 'center', color: C.dark, marginBottom: 16 }}>
              Nos prestations
            </h2>
            <p style={{ textAlign: 'center', color: C.muted, maxWidth: 560, margin: '0 auto 56px' }}>
              Quatre univers, un seul déplacement.
            </p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {SERVICES_APERCU.map(({ titre, desc, prix, img }, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flow-card" style={{ borderRadius: 14, overflow: 'hidden', border: `1px solid ${C.border}` }}>
                  <div className="flow-imgz" style={{ height: 170 }}>
                    <img src={img} alt={titre} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '22px 20px' }}>
                    <h3 style={{ fontFamily: F.heading, fontSize: 19, fontWeight: 700, color: C.dark, marginBottom: 8 }}>{titre}</h3>
                    <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, marginBottom: 16 }}>{desc}</p>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.primary, marginBottom: 16 }}>{prix}</div>
                    <Btn href={titre === 'Tapis' ? '/devis-tapis' : '/reservation'} variant="primary" style={{ width: '100%', justifyContent: 'center', fontSize: 13 }} loc="services_card">
                      {titre === 'Tapis' ? 'Demander un devis' : 'Réserver'}
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
            <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, textAlign: 'center', marginBottom: 16 }}>
              Ce qui nous distingue
            </h2>
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.65)', maxWidth: 560, margin: '0 auto 56px' }}>
              Un service pensé pour être simple, clair et fiable.
            </p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 28 }}>
            {VALEURS.map(({ titre, desc }, i) => (
              <FadeIn key={i} delay={i * 0.09}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: `${C.secondary}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckIcon size={20} color={C.secondary} />
                  </div>
                  <h3 style={{ fontFamily: F.heading, fontSize: 18, fontWeight: 700, color: C.white }}>{titre}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ──────────────────────────────────────────── */}
      <section className="sec-p" style={{ background: C.bgAlt }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          <FadeIn>
            <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, textAlign: 'center', color: C.dark, marginBottom: 12 }}>
              Comment ça marche ?
            </h2>
            <p style={{ textAlign: 'center', color: C.muted, margin: '0 auto 56px', maxWidth: 460 }}>
              Trois étapes. Pas une de plus.
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
                      background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
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
      <section className="sec-p">
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
          <FadeIn>
            <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, textAlign: 'center', color: C.dark, marginBottom: 52 }}>
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
      <section style={{ background: `linear-gradient(120deg, ${C.primary}, ${C.secondary})`, color: C.white, padding: '80px 24px', textAlign: 'center' }}>
        <FadeIn>
          <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 700, marginBottom: 16 }}>
            Prêt à sublimer votre véhicule ou votre intérieur ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: 480, margin: '0 auto 32px', fontSize: 16, lineHeight: 1.7 }}>
            Réservation en ligne automatique — votre créneau est confirmé immédiatement.
          </p>
          <div className="hero-ctas" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn href="/reservation" variant="light" style={{ fontSize: 15, padding: '14px 28px' }} loc="cta_final">
              Réserver mon créneau
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
