# JOURNAL.md — Sublim Net

Historique chronologique complet du projet. Ne jamais réécrire ou supprimer une entrée existante — uniquement ajouter à la suite.

---

## 2026-07-26

**Demande reçue :** Générer le site + système de réservation en ligne de Sublim Net à partir du template `flow-template-website`. Instructions détaillées en 10 étapes (documentation de suivi, tokens.js, structure des pages, grille tarifaire complète auto/canapé/tapis/matelas, zone d'intervention avec frais de déplacement, système de réservation Supabase avec anti-double-booking, parcours Devis Tapis séparé, page Avis & Contact sans faux avis, galerie photos réelles, SEO/schema.org, vérification finale). Consigne explicite : s'arrêter si une info manque plutôt que d'inventer une valeur.

**Résultat :**
- Investigation de l'environnement : template `flow-template-website` trouvé (`C:\Users\User\Desktop\flow-client-template`), repo GitHub `flow-sublim-net` inexistant, aucun outil `gh`/`supabase` CLI installé, aucun visuel du camion Kangoo ni photos avant/après trouvés sur la machine.
- 4 questions bloquantes posées à l'utilisatrice (visuel camion, photos galerie, création du projet Supabase, création du repo GitHub) — réponses : visuel et photos à venir sous peu, guidage pour créer Supabase manuellement, repo créé en local pour l'instant (pas de push GitHub tant que le repo distant n'existe pas).
- Création du dossier local `C:\Users\User\Desktop\flow-sublim-net` à partir du template (copie des fichiers, sans historique git du template).
- Création de `CLAUDE.md` (règles métier figées : tarifs, zone/frais, créneaux, identité, contraintes techniques) et de `JOURNAL.md` (ce fichier).

**Points ouverts en attente de l'utilisatrice :** visuel camion Kangoo (palette/logo définitifs), photos avant/après (galerie), création du projet Supabase (URL + clé anonyme), création du repo GitHub privé `flow-sublim-net`.

---

**Mise à jour :**
- Copie de `src/` et `public/` du template `flow-client-template` dans le projet (n'avait pas été fait lors de la création initiale du dossier).
- Repo GitHub distant fourni : `https://github.com/sabrina33-creator/flow-sublim-net.git` (pas encore connecté en local, aucun push effectué).
- Site de référence donné par l'utilisatrice : `https://www.roulezpropre.fr/`.
- Photos avant/après ajoutées dans `src/images/` : roue, volant, rail, range-gobelet, bleu, camion-arrière (6 paires) + visuel logo/camion Kangoo (`SUBLIMNET_KANGOO_26 (1).png`). D'autres photos avant/après restent à venir.
- Projet Supabase créé (`sublim-net`, org `sabrina33-creator's Org`, plan Free) : URL `https://dyzmqnhvjydnovqfatcb.supabase.co`, clé publishable `sb_publishable_wSqX2WnvA3V6_y6u-KTCZw_CKPUvRCi`. Kenzo invité en tant que membre "Developer" sur l'organisation (accès Table Editor pour consulter les réservations, sans droits de suppression de projet/facturation).
- Table `creneaux` créée en base avec contrainte `unique(date_creneau, heure)` (verrou anti-double-booking), RLS activé, policy `insert` publique uniquement, vue `creneaux_dispo` (date+heure seulement, sans données personnelles) exposée en lecture publique — exécuté avec succès par l'utilisatrice dans le SQL Editor de Supabase Studio.

**Points ouverts restants :** reste des photos avant/après à venir, repo GitHub local pas encore initialisé/connecté au remote, création des pages du site (Accueil, Services, Réservation, Devis Tapis, Avis & Contact) pas encore commencée.

---

**Mise à jour — construction complète du site :**
- Palette extraite par pipette (PowerShell + System.Drawing) depuis le visuel du camion : violet `#7F4997`, bleu `#4C77BB`, marine `#0D3857`. Police du logo choisie : Dancing Script (candidate CLAUDE.md la plus proche du script du camion). Titres : Barlow Condensé bold (écho bandeau "DETAILING AUTO"). Corps : Manrope.
- Adresse interne géocodée via Nominatim : introuvable sous "rue François Rabelais" mais trouvée sous **"Avenue François Rabelais"** (Thouars, Talence) — probable écart de dénomination entre l'usage oral et OSM. Coordonnées retenues : 44.796395, -0.5961008. Adresse affichée dans CLAUDE.md non modifiée (pas une règle métier, juste une note technique).
- `src/tokens.js` rempli (identité, contact, réseaux sociaux, palette, polices, coordonnées internes).
- `src/components/Logo.jsx` créé (texte dégradé violet→bleu en Dancing Script) — pas de tracé SVG vectoriel du lettrage à la main, choix pragmatique. Intégré dans Header et Footer.
- `src/components/Btn.jsx` étendu : les `href` commençant par `/` utilisent désormais `<Link>` de React Router (navigation SPA) au lieu d'un `<a>` classique.
- `@supabase/supabase-js` installé. Créés : `src/lib/supabaseClient.js`, `src/lib/pricing.js` (grille tarifaire complète), `src/lib/geo.js` (Nominatim + Haversine), `src/lib/booking.js` (créneaux, délai 24h avec exception Extérieur seul/phares, anti-double-booking via insert + gestion du code erreur `23505`).
- Clés Supabase placées dans `.env` (non commité, ajouté au `.gitignore` avec `build/`).
- Pages construites : `HomePage.jsx`, `ServicesPage.jsx` (grille tarifaire + galerie avant/après avec les 6 paires de photos), `ReservationPage.jsx` (parcours complet : service → adresse/distance → créneau → coordonnées → récap → confirmation), `DevisTapisPage.jsx` (formulaire → message WhatsApp pré-rempli, aucune nouvelle table Supabase créée, conforme à la règle "une seule table creneaux"), `ContactPage.jsx` (renommée "Avis & Contact", section avis transparente sans faux témoignage).
- Routes ajoutées dans `App.js` : `/reservation`, `/devis-tapis`. Navigation mise à jour dans `Header.jsx` et `Footer.jsx`.
- `public/index.html` rempli (SEO, Open Graph, JSON-LD LocalBusiness/HowTo/FAQPage, Google Fonts). `public/og-image.jpg` généré par recadrage du visuel du camion (portière + logo + bandeau "à domicile"). `public/favicon.png` généré (monogramme "S" en dégradé violet→bleu). `sitemap.xml`, `robots.txt`, `llms.txt` mis à jour avec les nouvelles pages.
- GA4_ID et domaine `sublimnet.fr` restent des placeholders (propriété GA4 non créée, domaine non réservé — voir CLAUDE.md).

**Point important non résolu — confirmation email :** CLAUDE.md prévoit une confirmation par email (pas de SMS), mais aucun service d'envoi (ex. Resend) n'est configuré et aucune Supabase Edge Function n'est déployée (pas de CLI Supabase installée). La réservation fonctionne et s'enregistre bien en base, mais aucun email de confirmation n'est réellement envoyé pour l'instant. À faire : créer un compte Resend, obtenir une clé API, écrire et déployer une Edge Function Supabase déclenchée à l'insertion.

**Vérification locale :** `npm start` compile sans erreur (2 warnings ESLint corrigés — imports inutilisés). Test avec Playwright (Edge headless) sur les 5 pages : aucune erreur console/JS. Test interactif du parcours de réservation (Auto → Berline → Extérieur seul → géocodage réel de "Place de la Bourse, 33000 Bordeaux" → 5.4 km, frais offerts → créneaux 07:30/14:30 chargés depuis `creneaux_dispo`) : fonctionnel de bout en bout. Soumission finale non testée volontairement pour ne pas insérer de fausse réservation dans la table Supabase de production. Vérification mobile 375px (menu hamburger, sticky CTA, pages Services/Réservation) : OK.

---

## 2026-07-27

**Vrai logo trouvé :** en préparant la sauvegarde, découverte de `src/logo.png` (1024×1024, fond blanc) — un asset logo officiel déjà fourni par le client lors de la session précédente, plus fidèle que la reconstruction en texte CSS dégradé utilisée jusque-là. Fond blanc retiré par seuillage (PowerShell + System.Drawing) et recadré sur le seul lettrage script "Sublim Net" → `src/images/logo-script.png` (PNG transparent, 818×205) + version complète avec tagline `src/images/logo-transparent.png`. `src/components/Logo.jsx` réécrit pour afficher cette image au lieu du texte CSS ; intégré dans `Header.jsx` et `Footer.jsx`. Vérifié visuellement (Playwright) : bon contraste sur fond clair, sombre et sur photo. `CLAUDE.md` mis à jour (section Identité visuelle : palette/polices confirmées, mention du fichier logo officiel).

**Fichiers non triés repérés :** 4 photos brutes directement dans `src/` (`IMG_3961.jpeg`, `IMG_3998.jpeg`, `IMG_3998 (1).jpeg` — doublon exact de `IMG_3998.jpeg`, `IMG_4381.jpeg`) déposées avant l'organisation dans `src/images/`. Contenu différent des paires déjà intégrées (ex. `IMG_4381.jpeg` = extérieur de véhicule très poussiéreux, angle non couvert par la galerie actuelle). Conservées et committées (rien perdu) mais **pas encore intégrées** au site — à trier/renommer/utiliser ou supprimer le doublon à la prochaine session.

**Sauvegarde GitHub :** dépôt local initialisé (`git init`), remote `https://github.com/sabrina33-creator/flow-sublim-net.git` déjà existant avec un commit initial (contenu brut du template, créé automatiquement via "Use this template" sur GitHub). Historique relié avec `git merge --allow-unrelated-histories -X ours` (contenu local conservé, pas de conflit réel puisque tous les fichiers template ont été depuis remplis/remplacés). Poussé avec succès sur `master` (commit `e3f3b07`). `.claude/` (métadonnées de session locale) ajouté au `.gitignore` — jamais commité.

**Point ouvert pour demain :** trier les 4 photos `src/IMG_*.jpeg` (dont un doublon à supprimer), décider si `IMG_4381.jpeg` (véhicule extérieur sale) doit rejoindre la galerie avant/après de `ServicesPage.jsx`, puis continuer sur les points ouverts déjà notés (confirmation email, reste des photos, GA4, domaine).
