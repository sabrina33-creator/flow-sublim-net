// Edge Function — envoie l'email de confirmation client + notification interne Kenzo
// à chaque nouvelle réservation. Déclenchée par un trigger SQL (net.http_post) sur
// INSERT dans la table `creneaux` — voir JOURNAL.md pour le détail de la mise en place.
// Secrets requis (Supabase Dashboard → Edge Functions → Secrets) :
//   RESEND_API_KEY  — clé API Resend (jamais dans le code front-end)
//   WEBHOOK_SECRET  — chaîne partagée pour vérifier que l'appel vient bien du déclencheur

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET");

// [TODO] Remplacer par une adresse sur le domaine sublimnet.fr une fois le domaine
// réservé et vérifié dans Resend. En attendant, onboarding@resend.dev est la seule
// adresse d'envoi utilisable, et Resend limite la livraison à l'adresse du compte
// Resend tant qu'aucun domaine n'est vérifié (client ET notification interne concernés).
const FROM_EMAIL = "Sublim Net <onboarding@resend.dev>";
const KENZO_EMAIL = "sublimnet33@gmail.com";

const SERVICE_LABELS: Record<string, string> = {
  auto: "Auto",
  canape: "Canapé",
  matelas: "Matelas",
};

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });
  if (!res.ok) {
    console.error(`Resend error (to ${to}):`, await res.text());
    return false;
  }
  return true;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  if (WEBHOOK_SECRET) {
    const provided = req.headers.get("x-webhook-secret");
    if (provided !== WEBHOOK_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const record = payload?.record;
  if (!record?.email) {
    return new Response("Missing record.email", { status: 400 });
  }

  const total = (Number(record.prix_total) || 0) + (Number(record.frais_deplacement) || 0);
  const serviceLabel = SERVICE_LABELS[record.service] ?? record.service;

  // Email 1 — confirmation client
  const clientHtml = `
    <div style="font-family: -apple-system, Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #0D3857;">
      <h2 style="background: linear-gradient(90deg,#7F4997,#4C77BB); -webkit-background-clip: text; background-clip: text; color: transparent;">
        Réservation confirmée — Sublim Net
      </h2>
      <p>Bonjour ${record.nom ?? ""},</p>
      <p>Votre réservation est <strong>confirmée automatiquement</strong> — aucune action supplémentaire n'est nécessaire de votre part.</p>
      <table style="width:100%; border-collapse:collapse; margin:20px 0; font-size:14px;">
        <tr><td style="padding:6px 0; color:#5B6B7A;">Prestation</td><td style="padding:6px 0; font-weight:bold;">${serviceLabel} — ${record.formule ?? ""}</td></tr>
        <tr><td style="padding:6px 0; color:#5B6B7A;">Date</td><td style="padding:6px 0; font-weight:bold;">${record.date_creneau} à ${record.heure}</td></tr>
        <tr><td style="padding:6px 0; color:#5B6B7A;">Adresse</td><td style="padding:6px 0;">${record.adresse ?? ""}</td></tr>
        <tr><td style="padding:6px 0; color:#5B6B7A;">Total</td><td style="padding:6px 0; font-weight:bold;">${total.toFixed(2)}€</td></tr>
      </table>
      <p style="color:#5B6B7A; font-size:13px; line-height:1.6;">
        Besoin d'annuler ou de modifier ? Appelez-nous au <strong>07 79 72 60 76</strong> — pas d'annulation en ligne.
      </p>
      <p style="color:#5B6B7A; font-size:13px;">— L'équipe Sublim Net</p>
    </div>
  `;

  // Email 2 — notification interne Kenzo (toutes les coordonnées client, il doit s'y rendre)
  const kenzoHtml = `
    <div style="font-family: -apple-system, Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #0D3857;">
      <h2 style="color:#7F4997;">Nouvelle réservation</h2>
      <table style="width:100%; border-collapse:collapse; margin:16px 0; font-size:14px;">
        <tr><td style="padding:6px 0; color:#5B6B7A;">Prestation</td><td style="padding:6px 0; font-weight:bold;">${serviceLabel} — ${record.formule ?? ""}</td></tr>
        <tr><td style="padding:6px 0; color:#5B6B7A;">Date</td><td style="padding:6px 0; font-weight:bold;">${record.date_creneau} à ${record.heure}</td></tr>
        <tr><td style="padding:6px 0; color:#5B6B7A;">Client</td><td style="padding:6px 0;">${record.nom ?? ""}</td></tr>
        <tr><td style="padding:6px 0; color:#5B6B7A;">Téléphone</td><td style="padding:6px 0;">${record.telephone ?? ""}</td></tr>
        <tr><td style="padding:6px 0; color:#5B6B7A;">Email</td><td style="padding:6px 0;">${record.email}</td></tr>
        <tr><td style="padding:6px 0; color:#5B6B7A;">Adresse</td><td style="padding:6px 0; font-weight:bold;">${record.adresse ?? ""}</td></tr>
        <tr><td style="padding:6px 0; color:#5B6B7A;">Distance</td><td style="padding:6px 0;">${record.distance_km ?? "?"} km</td></tr>
        <tr><td style="padding:6px 0; color:#5B6B7A;">Total</td><td style="padding:6px 0; font-weight:bold;">${total.toFixed(2)}€ (dont ${Number(record.frais_deplacement || 0).toFixed(2)}€ de déplacement)</td></tr>
      </table>
      <p style="color:#5B6B7A; font-size:13px;">Détail complet consultable dans Supabase Studio (table creneaux).</p>
    </div>
  `;

  const [clientOk, kenzoOk] = await Promise.all([
    sendEmail(record.email, "Votre réservation Sublim Net est confirmée", clientHtml),
    sendEmail(KENZO_EMAIL, `Nouvelle réservation — ${serviceLabel} le ${record.date_creneau} à ${record.heure}`, kenzoHtml),
  ]);

  if (!clientOk && !kenzoOk) {
    return new Response("Both emails failed", { status: 502 });
  }
  return new Response(JSON.stringify({ clientOk, kenzoOk }), { status: 200 });
});
