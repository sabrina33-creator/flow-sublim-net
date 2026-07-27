// Devis Tapis — parcours séparé, sans prix fixe ni réservation automatique (voir CLAUDE.md).
// Pas de nouvelle table Supabase : la demande part directement en message WhatsApp pré-rempli.
import { useState } from 'react';
import { C, F, PHONE, PHONE_DISPLAY } from '../tokens';
import FadeIn from '../components/FadeIn';
import Btn from '../components/Btn';
import { WhatsAppIcon, PhoneIcon, CheckIcon } from '../components/Icons';

const inputStyle = {
  width: '100%', padding: '12px 14px', borderRadius: 10,
  border: `1.5px solid ${C.border}`, fontSize: 15, fontFamily: F.body,
  color: C.dark, background: C.bg, minHeight: 44,
};

const CRITERES = [
  'Dimensions approximatives (longueur × largeur)',
  'Matière si connue (laine, synthétique, berbère…)',
  "État général — taches, odeurs, usure",
  'Photos si possible, à joindre directement sur WhatsApp',
];

export default function DevisTapisPage() {
  const [nom, setNom] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [details, setDetails] = useState('');

  const message = [
    'Bonjour, je souhaite un devis pour un tapis.',
    nom && `Nom : ${nom}`,
    dimensions && `Dimensions : ${dimensions}`,
    details && `Détails : ${details}`,
  ].filter(Boolean).join('\n');

  const waLink = `https://wa.me/33779726076?text=${encodeURIComponent(message)}`;

  return (
    <section className="sec-p" style={{ paddingTop: 120 }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px' }}>
        <FadeIn>
          <h1 style={{ fontFamily: F.heading, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, color: C.dark, marginBottom: 12, textAlign: 'center' }}>
            Devis Tapis
          </h1>
          <p style={{ fontSize: 15, color: C.muted, textAlign: 'center', lineHeight: 1.7, marginBottom: 40 }}>
            Chaque tapis est différent — aucun prix fixe n'est affiché. Décrivez-le-nous et on vous répond avec un devis personnalisé, sans réservation automatique.
          </p>
        </FadeIn>

        <FadeIn>
          <div style={{ background: C.bgAlt, borderRadius: 12, padding: '22px 24px', marginBottom: 32 }}>
            <div style={{ fontFamily: F.heading, fontWeight: 700, fontSize: 15, color: C.dark, marginBottom: 14 }}>
              Pour un devis rapide, précisez si possible
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CRITERES.map((c, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: C.muted }}>
                  <CheckIcon size={15} color={C.primary} style={{ marginTop: 3, flexShrink: 0 }} /> {c}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            <input type="text" value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom et prénom" style={inputStyle} />
            <input type="text" value={dimensions} onChange={e => setDimensions(e.target.value)} placeholder="Dimensions approximatives — ex. 2m × 3m" style={inputStyle} />
            <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="Matière, état, taches particulières…" rows={4} style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }} />
          </div>

          <Btn href={waLink} variant="whatsapp" style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: 16 }} loc="devis_tapis">
            <WhatsAppIcon size={17} /> Envoyer ma demande sur WhatsApp
          </Btn>
          <p style={{ fontSize: 12, color: C.sand, textAlign: 'center', marginTop: 10 }}>
            Vous pourrez joindre des photos directement dans la conversation WhatsApp.
          </p>
        </FadeIn>

        <FadeIn>
          <div style={{ textAlign: 'center', marginTop: 40, paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 14, color: C.muted, marginBottom: 16 }}>Vous préférez appeler directement ?</p>
            <Btn href={PHONE} variant="secondary" style={{ fontSize: 14 }} loc="devis_tapis_phone">
              <PhoneIcon size={15} color={C.muted} /> {PHONE_DISPLAY}
            </Btn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
