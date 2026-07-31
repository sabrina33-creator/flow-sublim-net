import { useState, useEffect, useCallback } from 'react';
import { C, F, PHONE_DISPLAY } from '../tokens';
import FadeIn from '../components/FadeIn';
import Btn from '../components/Btn';
import { CheckIcon } from '../components/Icons';
import PageHeaderBanner from '../components/PageHeaderBanner';
import {
  GABARITS, AUTO_FORMULES, OPTION_SUBLIME, SUPPLEMENTS_AUTO, PRESTATIONS_COURTES,
  CANAPE_TAILLES, MATELAS_TAILLES, computeAutoPrice, computeFraisDeplacement,
  RAYON_GRATUIT_KM, TARIF_KM_SUPPLEMENTAIRE,
} from '../lib/pricing';
import { geocodeAddress, distanceFromBase } from '../lib/geo';
import { SLOTS, todayISO, isSlotBookable, fetchTakenSlots, createBooking } from '../lib/booking';

const CATEGORIES = [
  { id: 'auto',    label: 'Auto',    desc: 'Extérieur, intérieur ou les deux' },
  { id: 'canape',  label: 'Canapé',  desc: 'De 2 places à 7 places' },
  { id: 'matelas', label: 'Matelas', desc: '1 place, 2 places, enfant' },
];

function Card({ active, onClick, title, subtitle, price, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        textAlign: 'left',
        padding: '16px 18px',
        borderRadius: 12,
        border: `1.5px solid ${active ? C.primary : C.border}`,
        background: active ? `${C.primary}0F` : C.bg,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        display: 'flex', flexDirection: 'column', gap: 4,
        minHeight: 44, width: '100%',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      <span style={{ fontFamily: F.heading, fontWeight: 700, fontSize: 15, color: C.dark }}>{title}</span>
      {subtitle && <span style={{ fontSize: 13, color: C.muted }}>{subtitle}</span>}
      {price != null && <span style={{ fontSize: 15, fontWeight: 700, color: C.primary, marginTop: 4 }}>{price}€</span>}
    </button>
  );
}

function SectionTitle({ num, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
      <span style={{
        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
        background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`,
        color: '#fff', fontFamily: F.heading, fontWeight: 700, fontSize: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{num}</span>
      <h2 style={{ fontFamily: F.heading, fontSize: 20, fontWeight: 700, color: C.dark }}>{children}</h2>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '12px 14px', borderRadius: 10,
  border: `1.5px solid ${C.border}`, fontSize: 15, fontFamily: F.body,
  color: C.dark, background: C.bg, minHeight: 44,
};

export default function ReservationPage() {
  const [category, setCategory]   = useState(null);
  const [autoMode, setAutoMode]   = useState('formule'); // 'formule' | 'courte'
  const [formuleId, setFormuleId] = useState(null);
  const [gabaritId, setGabaritId] = useState(null);
  const [sublime, setSublime]     = useState(false);
  const [supplements, setSupplements] = useState([]);
  const [courteId, setCourteId]   = useState(null);
  const [tailleId, setTailleId]   = useState(null);

  const [address, setAddress]     = useState('');
  const [geo, setGeo]             = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError]   = useState('');

  const [date, setDate]           = useState('');
  const [slot, setSlot]           = useState('');
  const [takenSlots, setTakenSlots] = useState(new Set());

  const [nom, setNom]             = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail]         = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess]     = useState(false);

  const refreshTaken = useCallback(() => {
    fetchTakenSlots().then(setTakenSlots).catch(() => {});
  }, []);
  useEffect(() => { refreshTaken(); }, [refreshTaken]);

  // ── Service sélectionné → prix + libellé + éligibilité jour même ────────
  function getServiceInfo() {
    if (category === 'auto') {
      if (autoMode === 'courte') {
        const p = PRESTATIONS_COURTES.find(x => x.id === courteId);
        if (!p) return null;
        return { total: p.prix, breakdown: [{ label: p.label, prix: p.prix }], sameDay: true, serviceKey: 'auto', formule: p.label };
      }
      if (!formuleId || !gabaritId) return null;
      const r = computeAutoPrice(formuleId, gabaritId, { sublime, supplements });
      if (!r) return null;
      const formule = AUTO_FORMULES.find(f => f.id === formuleId);
      const gabarit = GABARITS.find(g => g.id === gabaritId);
      return { total: r.total, breakdown: r.breakdown, sameDay: r.sameDay, serviceKey: 'auto', formule: `${formule.label} — ${gabarit.label}${sublime ? ' + Sublime' : ''}` };
    }
    if (category === 'canape') {
      const t = CANAPE_TAILLES.find(x => x.id === tailleId);
      if (!t) return null;
      return { total: t.prix, breakdown: [{ label: t.label, prix: t.prix }], sameDay: false, serviceKey: 'canape', formule: t.label };
    }
    if (category === 'matelas') {
      const t = MATELAS_TAILLES.find(x => x.id === tailleId);
      if (!t) return null;
      return { total: t.prix, breakdown: [{ label: t.label, prix: t.prix }], sameDay: false, serviceKey: 'matelas', formule: t.label };
    }
    return null;
  }
  const serviceInfo = getServiceInfo();

  function toggleSupplement(id) {
    setSupplements(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  }

  async function handleCheckDistance() {
    setGeoError(''); setGeo(null);
    if (!address.trim()) { setGeoError('Merci de renseigner une adresse.'); return; }
    setGeoLoading(true);
    try {
      const g = await geocodeAddress(address);
      if (!g) { setGeoError("Adresse introuvable — précisez la ville et le code postal."); return; }
      const distanceKm = distanceFromBase(g.lat, g.lon);
      const frais = computeFraisDeplacement(distanceKm);
      setGeo({ distanceKm, frais });
    } catch {
      setGeoError('Impossible de calculer la distance pour le moment — réessayez.');
    } finally {
      setGeoLoading(false);
    }
  }

  const minDate = todayISO();
  const total = serviceInfo ? serviceInfo.total + (geo ? geo.frais : 0) : 0;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!serviceInfo || !geo || !date || !slot || !nom.trim() || !telephone.trim() || !email.trim()) return;
    setSubmitting(true); setSubmitError('');
    const payload = {
      date_creneau: date,
      heure: slot,
      service: serviceInfo.serviceKey,
      formule: serviceInfo.formule,
      prix_total: serviceInfo.total,
      frais_deplacement: geo.frais,
      distance_km: Math.round(geo.distanceKm * 10) / 10,
      nom: nom.trim(),
      telephone: telephone.trim(),
      email: email.trim(),
      adresse: address.trim(),
    };
    try {
      const result = await createBooking(payload);
      if (!result.ok) {
        setSubmitError("Ce créneau vient d'être réservé par quelqu'un d'autre entre-temps. Merci d'en choisir un autre ci-dessus.");
        setSlot('');
        refreshTaken();
      } else {
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch {
      setSubmitError("Une erreur est survenue. Réessayez ou contactez-nous par téléphone.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <section className="sec-p" style={{ minHeight: '70svh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '100px 24px 0', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: `${C.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckIcon size={30} color={C.primary} />
          </div>
          <h1 style={{ fontFamily: F.heading, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700, color: C.dark, marginBottom: 14 }}>
            Réservation confirmée
          </h1>
          <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, marginBottom: 8 }}>
            Votre créneau du <strong>{date}</strong> à <strong>{slot}</strong> est réservé — c'est automatique et définitif, aucune confirmation supplémentaire n'est nécessaire.
          </p>
          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 32 }}>
            Besoin d'annuler ? Appelez-nous au <strong>{PHONE_DISPLAY}</strong> — pas d'annulation en ligne.
          </p>
          <Btn href="/" variant="primary" loc="reservation_success">Retour à l'accueil</Btn>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHeaderBanner title="Réserver" />
      <section className="sec-p">
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
        <FadeIn>
          <p style={{ fontSize: 14, color: C.muted, textAlign: 'center', marginBottom: 48 }}>
            07:30 ou 14:30, 7j/7. Réservation en ligne automatique et définitive.
          </p>
        </FadeIn>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>

          {/* 1 — Service */}
          <FadeIn>
            <SectionTitle num={1}>Quel service ?</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
              {CATEGORIES.map(c => (
                <Card key={c.id} active={category === c.id} title={c.label} subtitle={c.desc}
                  onClick={() => { setCategory(c.id); setFormuleId(null); setGabaritId(null); setCourteId(null); setTailleId(null); setDate(''); setSlot(''); }} />
              ))}
            </div>

            {category === 'auto' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" onClick={() => setAutoMode('formule')} style={{ flex: 1, padding: '10px', borderRadius: 8, border: `1.5px solid ${autoMode === 'formule' ? C.primary : C.border}`, background: autoMode === 'formule' ? `${C.primary}0F` : 'transparent', fontSize: 13, fontWeight: 600, color: C.dark, cursor: 'pointer', minHeight: 44 }}>Formule complète</button>
                  <button type="button" onClick={() => setAutoMode('courte')} style={{ flex: 1, padding: '10px', borderRadius: 8, border: `1.5px solid ${autoMode === 'courte' ? C.primary : C.border}`, background: autoMode === 'courte' ? `${C.primary}0F` : 'transparent', fontSize: 13, fontWeight: 600, color: C.dark, cursor: 'pointer', minHeight: 44 }}>Phares seuls</button>
                </div>

                {autoMode === 'formule' && (
                  <>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 10 }}>Gabarit</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                        {GABARITS.map(g => (
                          <Card key={g.id} active={gabaritId === g.id} title={g.label} onClick={() => setGabaritId(g.id)} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 10 }}>Formule</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {AUTO_FORMULES.map(f => (
                          <Card key={f.id} active={formuleId === f.id} title={f.label} subtitle={f.desc}
                            price={gabaritId ? f.prices[gabaritId] : null}
                            onClick={() => setFormuleId(f.id)} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: C.dark, cursor: 'pointer', minHeight: 44 }}>
                        <input type="checkbox" checked={sublime} onChange={e => setSublime(e.target.checked)} />
                        {OPTION_SUBLIME.label} (+{OPTION_SUBLIME.prix}€)
                      </label>
                      {SUPPLEMENTS_AUTO.map(s => (
                        <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: C.dark, cursor: 'pointer', minHeight: 44 }}>
                          <input type="checkbox" checked={supplements.includes(s.id)} onChange={() => toggleSupplement(s.id)} />
                          {s.label} (+{s.prix}€)
                        </label>
                      ))}
                    </div>
                  </>
                )}

                {autoMode === 'courte' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
                    {PRESTATIONS_COURTES.map(p => (
                      <Card key={p.id} active={courteId === p.id} title={p.label} price={p.prix} onClick={() => setCourteId(p.id)} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {category === 'canape' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
                {CANAPE_TAILLES.map(t => (
                  <Card key={t.id} active={tailleId === t.id} title={t.label} price={t.prix} onClick={() => setTailleId(t.id)} />
                ))}
              </div>
            )}

            {category === 'matelas' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
                {MATELAS_TAILLES.map(t => (
                  <Card key={t.id} active={tailleId === t.id} title={t.label} price={t.prix} onClick={() => setTailleId(t.id)} />
                ))}
              </div>
            )}
          </FadeIn>

          {/* 2 — Adresse */}
          {serviceInfo && (
            <FadeIn>
              <SectionTitle num={2}>Où intervenir ?</SectionTitle>
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 14 }}>
                Rayon de {RAYON_GRATUIT_KM} km offert. Au-delà, {TARIF_KM_SUPPLEMENTAIRE}€/km sur le dépassement uniquement.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={address}
                  onChange={e => { setAddress(e.target.value); setGeo(null); }}
                  placeholder="Adresse complète — ex. 12 rue de la Paix, 33000 Bordeaux"
                  style={{ ...inputStyle, flex: 1, minWidth: 240 }}
                />
                <Btn onClick={handleCheckDistance} variant="secondary" style={{ fontSize: 13 }} loc="reservation_geo">
                  {geoLoading ? 'Calcul…' : 'Calculer la distance'}
                </Btn>
              </div>
              {geoError && <p style={{ color: '#C0392B', fontSize: 13, marginTop: 10 }}>{geoError}</p>}
              {geo && (
                <div style={{ marginTop: 14, background: C.bgAlt, borderRadius: 10, padding: '14px 16px', fontSize: 14, color: C.dark }}>
                  Distance estimée : <strong>{Math.round(geo.distanceKm * 10) / 10} km</strong>
                  {' — '}Frais de déplacement : <strong>{geo.frais > 0 ? `${geo.frais.toFixed(2)}€` : 'Offerts'}</strong>
                </div>
              )}
            </FadeIn>
          )}

          {/* 3 — Créneau */}
          {serviceInfo && geo && (
            <FadeIn>
              <SectionTitle num={3}>Quel créneau ?</SectionTitle>
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 14 }}>
                {serviceInfo.sameDay ? 'Réservable dès aujourd\'hui.' : 'Délai minimum de 24h avant le créneau.'}
              </p>
              <input
                type="date"
                min={minDate}
                value={date}
                onChange={e => { setDate(e.target.value); setSlot(''); }}
                style={{ ...inputStyle, maxWidth: 220, marginBottom: 16 }}
              />
              {date && (
                <div style={{ display: 'flex', gap: 10 }}>
                  {SLOTS.map(h => {
                    const key = `${date}|${h}`;
                    const taken = takenSlots.has(key);
                    const bookable = isSlotBookable(date, h, serviceInfo.sameDay);
                    const disabled = taken || !bookable;
                    return (
                      <button
                        type="button"
                        key={h}
                        disabled={disabled}
                        onClick={() => setSlot(h)}
                        style={{
                          flex: 1, padding: '14px', borderRadius: 10,
                          border: `1.5px solid ${slot === h ? C.primary : C.border}`,
                          background: slot === h ? `${C.primary}0F` : C.bg,
                          color: disabled ? C.sand : C.dark,
                          fontWeight: 700, fontSize: 15, minHeight: 44,
                          cursor: disabled ? 'not-allowed' : 'pointer',
                          opacity: disabled ? 0.5 : 1,
                        }}
                      >
                        {h} {taken && '— pris'} {!taken && !bookable && '— indisponible'}
                      </button>
                    );
                  })}
                </div>
              )}
            </FadeIn>
          )}

          {/* 4 — Coordonnées + récap */}
          {serviceInfo && geo && date && slot && (
            <FadeIn>
              <SectionTitle num={4}>Vos coordonnées</SectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                <input type="text" required value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom et prénom" style={inputStyle} />
                <input type="tel" required value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="Téléphone" style={inputStyle} />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={inputStyle} />
              </div>

              <div style={{ background: C.bgAlt, borderRadius: 12, padding: '22px 22px', marginBottom: 20 }}>
                <div style={{ fontFamily: F.heading, fontWeight: 700, fontSize: 15, color: C.dark, marginBottom: 14 }}>Récapitulatif</div>
                {serviceInfo.breakdown.map((b, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: C.muted, padding: '5px 0' }}>
                    <span>{b.label}</span><span>{b.prix}€</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: C.muted, padding: '5px 0', borderTop: `1px solid ${C.border}`, marginTop: 6, paddingTop: 10 }}>
                  <span>Frais de déplacement ({Math.round(geo.distanceKm * 10) / 10} km)</span>
                  <span>{geo.frais > 0 ? `${geo.frais.toFixed(2)}€` : 'Offerts'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, fontWeight: 800, color: C.dark, paddingTop: 14, marginTop: 10, borderTop: `2px solid ${C.border}`, fontFamily: F.heading }}>
                  <span>Total</span><span>{total.toFixed(2)}€</span>
                </div>
                <div style={{ fontSize: 13, color: C.muted, marginTop: 10 }}>
                  {date} à {slot}
                </div>
              </div>

              {submitError && <p style={{ color: '#C0392B', fontSize: 13, marginBottom: 14 }}>{submitError}</p>}

              <Btn onClick={handleSubmit} variant="primary" style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: 16 }} loc="reservation_submit">
                {submitting ? 'Confirmation…' : 'Confirmer la réservation'}
              </Btn>
            </FadeIn>
          )}
        </form>
      </div>
      </section>
    </>
  );
}
