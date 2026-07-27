import { C, F, WHATSAPP, PHONE, PHONE_DISPLAY } from '../tokens';
import FadeIn from '../components/FadeIn';
import Btn from '../components/Btn';
import { WhatsAppIcon, PhoneIcon } from '../components/Icons';
import {
  GABARITS, AUTO_FORMULES, OPTION_SUBLIME, SUPPLEMENTS_AUTO, PRESTATIONS_COURTES,
  CANAPE_TAILLES, MATELAS_TAILLES,
} from '../lib/pricing';

import servicesHero from '../images/roue-avant.jpeg';

import roueAvant from '../images/roue-avant.jpeg';
import roueApres from '../images/roue-apres.jpeg';
import volantAvant from '../images/volant-avant.jpeg';
import volantApres from '../images/volant-apres.jpeg';
import railAvant from '../images/rail-avant.jpeg';
import railApres from '../images/rail-apres.jpeg';
import gobeletAvant from '../images/range-gobelet-avant.jpeg';
import gobeletApres from '../images/range-gobelet-apres.jpeg';
import bleuAvant from '../images/bleu-avant.jpeg';
import bleuApres from '../images/bleu-apres.jpeg';
import camionAvant from '../images/camion-arriere-avant.jpeg';
import camionApres from '../images/camion-arriere-apres.jpeg';

const GALERIE = [
  { label: 'Jante',            avant: roueAvant,   apres: roueApres   },
  { label: 'Volant',           avant: volantAvant, apres: volantApres },
  { label: 'Rail de siège',    avant: railAvant,    apres: railApres   },
  { label: 'Porte-gobelets',   avant: gobeletAvant, apres: gobeletApres },
  { label: 'Habitacle',        avant: bleuAvant,    apres: bleuApres   },
  { label: 'Banquette arrière', avant: camionAvant, apres: camionApres },
];

function Price({ children }) {
  return <span style={{ fontFamily: F.heading, fontWeight: 700 }}>{children}€</span>;
}

export default function ServicesPage() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '48svh',
        display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(13,56,87,0.72), rgba(13,56,87,0.6)), url(${servicesHero}) center/cover no-repeat`,
        color: '#fff',
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto', padding: '120px 28px 64px', textAlign: 'center' }}>
          <FadeIn>
            <h1 style={{ fontFamily: F.heading, fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 800, marginBottom: 16 }}>
              Nos tarifs
            </h1>
            <div style={{ width: 48, height: 3, background: `linear-gradient(90deg, ${C.primary}, ${C.secondary})`, margin: '0 auto 20px' }} />
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
              Auto, canapé, tapis, matelas — une grille claire, sans surprise.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── AUTO ───────────────────────────────────────────────────────── */}
      <section className="sec-p">
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <FadeIn>
            <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', fontWeight: 700, color: C.dark, marginBottom: 8 }}>
              Auto
            </h2>
            <p style={{ fontSize: 14, color: C.muted, marginBottom: 32 }}>5 formules, 3 gabarits.</p>
          </FadeIn>

          <FadeIn>
            <div style={{ overflowX: 'auto', marginBottom: 28 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '12px 16px', fontFamily: F.heading, fontSize: 13, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: `2px solid ${C.border}` }}>Formule</th>
                    {GABARITS.map(g => (
                      <th key={g.id} style={{ textAlign: 'center', padding: '12px 16px', fontFamily: F.heading, fontSize: 13, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: `2px solid ${C.border}` }}>{g.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {AUTO_FORMULES.map((f, i) => (
                    <tr key={f.id} style={{ background: i % 2 === 0 ? C.bg : C.bgAlt }}>
                      <td style={{ padding: '16px', borderBottom: `1px solid ${C.border}` }}>
                        <div style={{ fontWeight: 700, color: C.dark, marginBottom: 3 }}>{f.label}</div>
                        <div style={{ fontSize: 13, color: C.muted }}>{f.desc}</div>
                        {f.sameDay && <div style={{ fontSize: 12, color: C.secondary, fontWeight: 600, marginTop: 4 }}>Réservable le jour même</div>}
                      </td>
                      {GABARITS.map(g => (
                        <td key={g.id} style={{ textAlign: 'center', padding: '16px', borderBottom: `1px solid ${C.border}`, color: C.primary, fontSize: 17 }}>
                          <Price>{f.prices[g.id]}</Price>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          <FadeIn>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 16 }}>
              <div style={{ background: C.bgAlt, borderRadius: 12, padding: '22px 22px' }}>
                <div style={{ fontFamily: F.heading, fontWeight: 700, fontSize: 15, color: C.dark, marginBottom: 12 }}>Option cumulable</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: C.muted }}>
                  <span>{OPTION_SUBLIME.label}</span>
                  <Price>{OPTION_SUBLIME.prix}</Price>
                </div>
              </div>
              <div style={{ background: C.bgAlt, borderRadius: 12, padding: '22px 22px' }}>
                <div style={{ fontFamily: F.heading, fontWeight: 700, fontSize: 15, color: C.dark, marginBottom: 12 }}>Suppléments</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {SUPPLEMENTS_AUTO.map(s => (
                    <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: C.muted }}>
                      <span>{s.label}</span>
                      <Price>{s.prix}</Price>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: C.bgAlt, borderRadius: 12, padding: '22px 22px' }}>
                <div style={{ fontFamily: F.heading, fontWeight: 700, fontSize: 15, color: C.dark, marginBottom: 12 }}>Prestations courtes indépendantes</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {PRESTATIONS_COURTES.map(p => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: C.muted }}>
                      <span>{p.label} <span style={{ color: C.secondary, fontSize: 12 }}>(jour même OK)</span></span>
                      <Price>{p.prix}</Price>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <Btn href="/reservation" variant="primary" style={{ fontSize: 14 }} loc="services_auto">
              Réserver une prestation auto
            </Btn>
          </FadeIn>
        </div>
      </section>

      {/* ── CANAPÉ / MATELAS ──────────────────────────────────────────── */}
      <section className="sec-p" style={{ background: C.bgAlt }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
            {/* Canapé */}
            <FadeIn>
              <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.6rem, 3.5vw, 2rem)', fontWeight: 700, color: C.dark, marginBottom: 20 }}>Canapé</h2>
              <div style={{ background: C.bg, borderRadius: 12, padding: '8px 22px' }}>
                {CANAPE_TAILLES.map((t, i) => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < CANAPE_TAILLES.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                    <span style={{ fontSize: 15, color: C.dark }}>{t.label}</span>
                    <span style={{ color: C.primary, fontSize: 16 }}><Price>{t.prix}</Price></span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20 }}>
                <Btn href="/reservation" variant="secondary" style={{ fontSize: 13 }} loc="services_canape">Réserver un canapé</Btn>
              </div>
            </FadeIn>

            {/* Matelas */}
            <FadeIn delay={0.08}>
              <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.6rem, 3.5vw, 2rem)', fontWeight: 700, color: C.dark, marginBottom: 20 }}>Matelas</h2>
              <div style={{ background: C.bg, borderRadius: 12, padding: '8px 22px' }}>
                {MATELAS_TAILLES.map((t, i) => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < MATELAS_TAILLES.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                    <span style={{ fontSize: 15, color: C.dark }}>{t.label}</span>
                    <span style={{ color: C.primary, fontSize: 16 }}><Price>{t.prix}</Price></span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20 }}>
                <Btn href="/reservation" variant="secondary" style={{ fontSize: 13 }} loc="services_matelas">Réserver un matelas</Btn>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── TAPIS ──────────────────────────────────────────────────────── */}
      <section className="sec-p">
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <FadeIn>
            <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.6rem, 3.5vw, 2rem)', fontWeight: 700, color: C.dark, marginBottom: 14 }}>Tapis</h2>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, marginBottom: 28 }}>
              Chaque tapis est différent — dimensions, matière, état. Pas de prix fixe affiché : dites-nous-en plus et on vous propose un devis personnalisé, sans réservation automatique.
            </p>
            <Btn href="/devis-tapis" variant="primary" style={{ fontSize: 14 }} loc="services_tapis">
              Demander un devis tapis
            </Btn>
          </FadeIn>
        </div>
      </section>

      {/* ── GALERIE AVANT / APRÈS ─────────────────────────────────────── */}
      <section className="sec-p" style={{ background: C.dark }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <FadeIn>
            <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', fontWeight: 700, textAlign: 'center', color: C.white, marginBottom: 12 }}>
              Avant / Après
            </h2>
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.65)', maxWidth: 500, margin: '0 auto 48px' }}>
              De vraies interventions, pas de mise en scène.
            </p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {GALERIE.map(({ label, avant, apres }, i) => (
              <FadeIn key={label} delay={i * 0.06}>
                <div style={{ borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <div style={{ position: 'relative' }}>
                      <img src={avant} alt={`${label} — avant`} loading="lazy" style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Avant</span>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <img src={apres} alt={`${label} — après`} loading="lazy" style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', top: 8, left: 8, background: C.primary, color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Après</span>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.06)', padding: '10px 14px', fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(120deg, ${C.primary}, ${C.secondary})`, color: C.white, padding: '64px 24px', textAlign: 'center' }}>
        <FadeIn>
          <h2 style={{ fontFamily: F.heading, fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 700, marginBottom: 14 }}>
            Une question avant de réserver ?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: 440, margin: '0 auto 28px', fontSize: 15 }}>
            On vous répond rapidement par WhatsApp ou téléphone.
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
