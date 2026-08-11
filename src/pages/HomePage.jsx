import { C, F, PHONE, PHONE_DISPLAY, WHATSAPP, CITY, GOOGLE_REVIEWS_URL, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from '../tokens';
import FadeIn from '../components/FadeIn';
import Btn from '../components/Btn';
import FaqItem from '../components/FaqItem';
import Logo from '../components/Logo';
import Seo from '../components/Seo';
import { WhatsAppIcon, PhoneIcon, CheckIcon, StarIcon } from '../components/Icons';
import { RAYON_GRATUIT_KM, TARIF_KM_SUPPLEMENTAIRE } from '../lib/pricing';

// Hero — versions optimisées web (redimensionnées/compressées) des photos originales
// src/images/bleu-avant.jpeg et bleu-apres.jpeg, jamais modifiées ni déplacées.
import heroAvant from '../images/bleu-avant-hero.jpg';
import heroApres from '../images/bleu-apres-hero.jpg';
// Aperçus "Nos prestations" — versions web (redimensionnées/compressées) des
// photos originales *-apres.png / tapis.png, jamais modifiées ni déplacées.
import apercuAuto from '../images/siege-beige-apres-web.jpg';
import apercuCanape from '../images/canape1-apres-web.jpg';
// Tapis : visuel générique temporaire (pas une vraie photo) — voir JOURNAL.md
import apercuTapis from '../images/tapis-web.jpg';
import apercuMatelas from '../images/matelas-apres-web.jpg';

// Teaser avant/après — sélection variée (pas uniquement auto), la galerie complète
// organisée par catégorie est sur /services#avant-apres.
import teaserRoue from '../images/collages/roue-collage.jpg';
import teaserCamion from '../images/collages/camion-arriere-collage.jpg';
import teaserCanape1 from '../images/collages/canape1-collage.jpg';
import teaserMatelas from '../images/collages/matelas-collage.jpg';

const TEASER_AVANT_APRES = [
  { label: 'Auto — Jante',            img: teaserRoue },
  { label: 'Auto — Banquette arrière', img: teaserCamion },
  { label: 'Canapé',                   img: teaserCanape1 },
  { label: 'Matelas',                  img: teaserMatelas },
];

const ACCROCHE_SUB = 'La preuve en image : un intérieur transformé, sans bouger de chez vous.';

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
  { titre: 'À domicile',           desc: "Vous continuez votre journée pendant l'intervention." },
  { titre: 'Réservation immédiate', desc: "Disponible 7j/7, week-end compris. Pas d'horaires de bureau à respecter." },
  { titre: 'Tarifs transparents',   desc: 'Vous voyez le prix exact avant de valider, sans surprise à l\'arrivée.' },
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
  { q: 'Comment se passe le paiement ?', r: "Sur place, après l'intervention : espèces, carte ou virement." },
  { q: 'Le tapis est-il réservable en ligne comme les autres services ?', r: "Non, le tapis est uniquement sur devis : dites-nous-en plus via notre parcours dédié, sans réservation automatique." },
];

export default function HomePage() {
  return (
    <>
      <Seo
        title="Sublim Net — Nettoyage auto, canapé, tapis à domicile"
        description="Detailing auto, canapé, tapis et matelas à domicile sur Talence et alentours. Réservation en ligne immédiate, tarifs transparents. 07 79 72 60 76."
        path="/"
      />
      {/* ── HERO — split avant/après, orienté preuve/conversion ──────────── */}
      <section style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex', alignItems: 'center',
        color: '#fff',
        overflow: 'hidden',
      }}>
        {/* Fond — split statique avant (gauche) / après (droite) */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex' }} aria-hidden="true">
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <img src={heroAvant} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            <span style={{ position: 'absolute', bottom: 18, left: 18, background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Avant</span>
          </div>
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <img src={heroApres} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            <span style={{ position: 'absolute', bottom: 18, right: 18, background: C.primary, color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Après</span>
          </div>
        </div>
        {/* Overlay sombre — contraste du texte */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(13,56,87,0.6), rgba(13,56,87,0.72))' }} aria-hidden="true" />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto', padding: '96px 28px 104px', textAlign: 'center' }}>
          <FadeIn>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <Logo size="clamp(70px, 12vw, 140px)" />
            </div>
            <h1 style={{ fontSize: 'clamp(1.05rem, 2.8vw, 1.35rem)', lineHeight: 1.6, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px', color: 'rgba(255,255,255,0.95)', fontWeight: 500 }}>
              {ACCROCHE_SUB}
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="hero-ctas" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Btn href="/reservation" variant="primary" style={{ fontSize: 16, padding: '16px 30px' }} loc="hero">
                Réserver maintenant
              </Btn>
              <Btn href={WHATSAPP} variant="ghost" style={{ fontSize: 15, padding: '14px 24px' }} loc="hero">
                <WhatsAppIcon size={17} /> WhatsApp
              </Btn>
            </div>
          </FadeIn>
          <FadeIn delay={0.25}>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24, fontSize: 13, color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}
            >
              <span style={{ display: 'flex', gap: 1 }}>
                {[...Array(5)].map((_, i) => <StarIcon key={i} size={13} color="#fff" />)}
              </span>
              {GOOGLE_RATING.toFixed(1)} sur Google ({GOOGLE_REVIEW_COUNT} avis)
            </a>
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
              Ce qui freine d'habitude, et comment Sublim Net l'évite.
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
              <FadeIn key={i} delay={i * 0.1} style={{ height: '100%' }}>
                <div className="flow-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 14, overflow: 'hidden', border: `1px solid ${C.border}` }}>
                  <div className="flow-imgz" style={{ height: 170, flexShrink: 0 }}>
                    <img src={img} alt={titre} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontFamily: F.heading, fontSize: 19, fontWeight: 700, color: C.dark, marginBottom: 8 }}>{titre}</h3>
                    <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, marginBottom: 16 }}>{desc}</p>
                    <div style={{ marginTop: 'auto' }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: C.primary, marginBottom: 16 }}>{prix}</div>
                      <Btn href={titre === 'Tapis' ? '/devis-tapis' : '/reservation'} variant="primary" style={{ width: '100%', justifyContent: 'center', fontSize: 13 }} loc="services_card">
                        {titre === 'Tapis' ? 'Demander un devis' : 'Réserver'}
                      </Btn>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEASER AVANT / APRÈS ──────────────────────────────────────── */}
      <section className="sec-p-sm" style={{ background: C.bgAlt }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <FadeIn>
            <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 700, textAlign: 'center', color: C.dark, marginBottom: 12 }}>
              Avant / Après
            </h2>
            <p style={{ textAlign: 'center', color: C.muted, maxWidth: 500, margin: '0 auto 40px' }}>
              De vraies interventions, pas de mise en scène.
            </p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, marginBottom: 32 }}>
            {TEASER_AVANT_APRES.map(({ label, img }, i) => (
              <FadeIn key={img} delay={i * 0.06}>
                <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.border}` }}>
                  <img src={img} alt={`${label} — avant/après`} loading="lazy" style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                  <div style={{ background: C.bg, padding: '10px 14px', fontSize: 13, color: C.dark, fontWeight: 600 }}>{label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div style={{ textAlign: 'center' }}>
              <Btn href="/services#avant-apres" variant="secondary" style={{ fontSize: 14 }} loc="home_teaser_avant_apres">
                Voir toutes nos réalisations
              </Btn>
            </div>
          </FadeIn>
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
            Prêt à sublimer votre véhicule, votre canapé ou votre matelas ?
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
