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

---

## 2026-07-27 (suite)

**10 nouvelles paires avant/après ajoutées par l'utilisatrice** dans `src/images/` : canapé, coffre, matelas, phare, siège arrière, siège beige, siège gris, tapis-volant, tapis-volant2, volant2. Les 4 anciennes photos non triées (`src/IMG_*.jpeg`) ont été renommées/déplacées par l'utilisatrice elle-même vers `src/images/volant2-avant.jpeg` et `volant2-apres.jpeg` (doublon résolu). Contenu vérifié par échantillonnage (canapé = tissu, matelas = matelas avec filigrane "SublimNet" déjà incrusté, phare = phare avant véhicule, tapis-volant = tapis de sol auto — pas un tapis maison, à ne pas confondre avec le service Tapis/devis).

**Génération de collages avant/après (demande explicite de l'utilisatrice) :**
- Convention réelle observée sur disque : `objet-avant.jpeg` / `objet-apres.jpeg` (sans numéro, extension `.jpeg`) — différente de la convention `objet-numéro-avant.jpg` décrite dans la demande ; interprétée en conséquence sans bloquer.
- Script PowerShell (`System.Drawing`) : repérage des paires par nom de base normalisé (accents ignorés — gère l'incohérence `canape-avant.jpeg` / `canapé-apres.jpeg`), génération d'un collage côte-à-côte (avant à gauche, après à droite, hauteur commune 900px, badges arrondis "Avant" (noir semi-transparent) / "Après" (violet `#7F4997`) en bas à gauche de chaque moitié).
- **17 paires traitées avec succès, 0 orpheline.** Fichiers originaux dans `src/images/` non modifiés, non déplacés. Collages écrits dans `src/images/collages/*-collage.jpg` (nouveau sous-dossier, différent du `photos/collages/` mentionné dans la demande — adapté à la structure réelle du projet React, seul `src/` est surveillé par le build).
- `ServicesPage.jsx` mis à jour : la galerie (section "Avant / Après") utilise désormais les 17 fichiers collages (un seul `<img>` par paire) au lieu des paires brutes + badges CSS ; passée de 6 à 17 éléments affichés.

**Liste des 17 paires traitées :** 1, bleu, camion-arriere, canape, coffre, matelas, phare, rail, range-gobelet, roue, siege-arriere, siege-beige, siege-gris, tapis-volant, tapis-volant2, volant, volant2.

---

## 2026-07-27 (suite) — Email de confirmation (Resend)

**Compte Resend créé sur l'adresse de l'utilisatrice** (comme Supabase — Kenzo n'a pas besoin d'accès quotidien à Resend, l'agence gère cette brique technique).

**Fonction d'envoi d'email** : `supabase/functions/send-booking-confirmation/index.ts` écrite dans le repo, puis déployée manuellement via le Dashboard Supabase (Edge Functions → Via Editor, pas de CLI utilisée). Nom technique réel de la fonction (slug d'URL) : **`bright-handler`** — l'utilisatrice l'a affichée sous le nom "sublim-net" dans le champ Name, mais Supabase conserve l'URL du slug d'origine même après renommage (`https://dyzmqnhvjydnovqfatcb.supabase.co/functions/v1/bright-handler`). Aucun problème fonctionnel, juste une source de confusion à noter.

**Secrets configurés** (Edge Functions → Secrets) : `RESEND_API_KEY` (clé du compte Resend) et `WEBHOOK_SECRET` (chaîne aléatoire générée localement, `08878b3c...`, jamais commitée dans le repo) — utilisée pour vérifier que les appels à la fonction viennent bien de notre déclencheur, pas d'un tiers.

**Bug rencontré — assistant "Database Webhooks" cassé sur ce projet :** la création d'un webhook via Database → Webhooks (Intégration officielle) échoue systématiquement avec `ERROR: 3F000: schema "supabase_functions" does not exist`, y compris après activation de l'extension `pg_net` (qui ne l'était pas au départ — activée en cours de route, seule extension non activée par défaut parmi celles listées). Le schéma interne `supabase_functions` que l'assistant Supabase utilise pour poser son trigger n'a jamais été initialisé sur ce projet — bug/edge case côté plateforme, pas quelque chose de réparable depuis le Dashboard.

**Contournement retenu :** trigger SQL manuel utilisant directement `pg_net` (`net.http_post`), sans dépendre du schéma `supabase_functions`. Nécessite d'avoir désactivé au préalable **"Verify JWT with legacy secret"** dans Settings de la fonction (recommandé par Supabase lui-même quand on a sa propre logique d'auth) pour que l'appel HTTP du trigger n'ait pas besoin de porter un JWT — seul le header `x-webhook-secret` protège l'appel désormais. SQL exécuté avec succès :

```sql
create or replace function public.trigger_send_booking_confirmation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform net.http_post(
    url := 'https://dyzmqnhvjydnovqfatcb.supabase.co/functions/v1/bright-handler',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', '08878b3c52bfb47fde63e12aa07273f3'
    ),
    body := jsonb_build_object(
      'type', TG_OP, 'table', TG_TABLE_NAME, 'schema', TG_TABLE_SCHEMA, 'record', to_jsonb(NEW)
    )
  );
  return NEW;
end;
$$;

create trigger send_booking_confirmation_trigger
after insert on public.creneaux
for each row
execute function public.trigger_send_booking_confirmation();
```

**Limite connue :** Resend restreint l'envoi à l'adresse du compte tant qu'aucun domaine n'est vérifié (`sublimnet.fr` pas encore réservé — voir CLAUDE.md). Les emails ne partiront donc réellement que vers l'adresse ayant créé le compte Resend jusqu'à la vérification du domaine.

**Test de bout en bout réussi (2026-07-28) :** insertion manuelle d'une réservation via SQL Editor (email = adresse du compte Resend, seule adresse acceptée tant qu'aucun domaine n'est vérifié) → email "Votre réservation Sublim Net est confirmée" reçu en boîte de réception en quelques secondes, contenu correct (prestation, date, adresse, total, consignes d'annulation). Chaîne complète validée : insertion `creneaux` → trigger SQL → `net.http_post` → fonction Edge `bright-handler` → API Resend → email. Ligne de test supprimée après vérification.

**Confirmation email : fonctionnelle et validée.** Reste uniquement bloquant pour les vrais clients : réservation d'un nom de domaine + vérification de ce domaine chez Resend (actuellement seule l'adresse du compte Resend peut recevoir).

---

## 2026-07-28 (suite) — Mentions légales, politique de confidentialité, statut Snapchat

**Infos collectées auprès de l'utilisatrice :** Kenzo Mendes (nom complet), statut auto-entrepreneur/micro-entreprise, adresse légale = adresse réelle d'intervention (20 rue François Rabelais, Talence — choix explicite de l'utilisatrice d'afficher l'adresse réelle dans les mentions légales, obligation légale française, distinct de la page Contact qui n'affiche que la ville), projet Supabase hébergé en Europe.

**`src/pages/MentionsLegalesPage.jsx` créée** : éditeur (Kenzo Mendes, SIRET 95258635200025, adresse, TVA non applicable art. 293 B CGI), directeur de publication, hébergeur du site (Netlify — anticipé pour la publication à venir), hébergement des données (Supabase, Europe), propriété intellectuelle, crédits.

**`src/pages/ConfidentialitePage.jsx` créée** (RGPD) : responsable du traitement, données collectées (formulaire de réservation uniquement — le devis tapis part par WhatsApp, non stocké), finalités, base légale (exécution du contrat), destinataires (Kenzo uniquement), sous-traitants (Supabase, Resend, Nominatim/OpenStreetMap), durée de conservation (3 ans, valeur par défaut proposée), cookies (aucun pour l'instant, section à compléter si GA4 est activé), droits RGPD + CNIL, sécurité (RLS).

**Routes ajoutées** (`/mentions-legales`, `/confidentialite`) dans `App.js`, liens ajoutés en bas de `Footer.jsx`, entrées ajoutées à `sitemap.xml`.

**Statut Snapchat clarifié :** compte `SUBLIMNETT` (visuel du camion) introuvable — vérifié par l'utilisatrice à la fois via le lien web et via la recherche directe dans l'application Snapchat. Le pseudo semble n'avoir jamais eu de compte réel créé derrière. Lien Snapchat retiré de `ContactPage.jsx` (Instagram et TikTok confirmés actifs et corrects). `CLAUDE.md` mis à jour en conséquence — ne pas rajouter de lien Snapchat sans confirmation explicite qu'un compte existe.

**Vérifié** : compilation sans erreur, capture des deux nouvelles pages et du footer conforme.

**Premier retour visuel de l'utilisatrice (2026-07-28)** : après avoir vu des captures du site complet pour la première fois (elle n'avait jamais regardé le rendu jusque-là), avis positif global ("pas mal, c'est propre") mais retours à traiter demain :
- Veut un site **"plus visuel"** — probablement plus d'images/impact visuel, à creuser avec elle pour comprendre précisément ce qui manque à ses yeux.
- **Logo** à retravailler ("on verra") — le composant `Logo.jsx` actuel affiche `src/images/logo-script.png` (recadré depuis `src/logo.png`, fond blanc retiré) ; pas satisfaisant en l'état selon elle, sans détail supplémentaire pour l'instant.
- Compte utiliser les **skills CRO et AI-SEO** (mentionnées plus tôt dans la session) pour la suite des améliorations.

**Point ouvert pour demain :** clarifier avec l'utilisatrice ce qu'elle entend par "plus visuel" et ce qu'elle veut changer au logo avant d'agir, plutôt que de deviner.

---

## 2026-07-28 (suite) — Bug logo corrigé + brief visuel roulezpropre.fr

**Bug logo corrigé :** le "S" de "Sublim" était coupé en bas dans `src/images/logo-script.png` (signalé par l'utilisatrice en regardant le site rendu pour la toute première fois). Cause : premier recadrage du fichier `src/images/logo-transparent.png` (818×328) trop court en hauteur (205px), coupant la boucle basse du S. Le S descend en fait jusqu'à y≈273, ce qui chevauche verticalement le début du texte "DETAILING AUTO" (commence à x≈177, y≈230) — un simple recadrage rectangulaire ne suffisait pas. Solution : recadrage à 274px de hauteur + effacement ciblé (alpha=0) des pixels x≥163 sur les lignes y=226-273 pour retirer la bavure "DETAILING AUTO" tout en gardant la queue complète du S. `Logo.jsx` mis à jour avec le nouveau ratio (818×274). Vérifié visuellement dans le header — logo entier, propre. Commit à faire.

**Brief visuel — inspiration roulezpropre.fr (référence donnée par l'utilisatrice), captures prises via Playwright :**
- **Logo mascotte** : personnage illustré (agent d'entretien, casquette, brosse détailing + pistolet de lavage) dans un badge circulaire bleu — bien plus qu'un simple lettrage. L'utilisatrice propose une idée alternative pour Sublim Net : un siège auto + aspirateur, ou "autre chose qui montre que c'est du nettoyage" — pas encore tranché.
- **Écran d'intro animé** : le logo apparaît seul en plein écran sur fond marine avec un effet de lueur (glow radial bleu) autour, puis le site se révèle après quelques secondes. L'utilisatrice veut un équivalent pour la section hero de l'accueil.
- **QR code dans le hero** : petit encart "Réservation mobile" avec QR code + bouton, à côté du texte d'accroche — permet de scanner pour réserver depuis mobile. L'utilisatrice veut ce même principe.
- **Slider avant/après interactif** : une seule photo avec curseur à glisser pour comparer avant/après, plutôt que deux images côte à côte (notre approche actuelle avec les collages `src/images/collages/`).
- **Fond non plat** : blocs de couleur qui cassent le blanc, écho au retour de l'utilisatrice ("le fond blanc peut être plus coloré").
- **Note Google 4.9/5 affichée** sur roulezpropre.fr — **à ne pas reproduire** : aucun avis réel n'existe encore pour Sublim Net, règle stricte de `CLAUDE.md` (jamais de fausse note/avis).

**Points à trancher demain avant d'implémenter quoi que ce soit** :
1. Mascotte du logo : quel visuel exact (siège+aspirateur ? autre ?), qui la crée (génération IA à discuter, ou fournie par le client) ?
2. Écran d'intro animé + effet de lumière : à construire en CSS/React (faisable sans dépendance externe).
3. QR code hero : QR code vers quelle page (probablement `/reservation`) ? Génération à faire.
4. Slider avant/après interactif : remplace ou complète la galerie actuelle de `ServicesPage.jsx` ?
5. Palette : quelles sections précises doivent sortir du blanc plat, avec quelles couleurs ?
6. Programme de la journée : skills CRO et AI-SEO à utiliser en complément une fois les décisions visuelles prises.

---

## 2026-07-29 — Bug bloquant sur la réservation réelle (GRANT manquant)

**Symptôme :** premier vrai test de réservation par l'utilisatrice directement sur le site (pas en SQL) → échec systématique à la confirmation ("Une erreur est survenue"), aucune ligne créée dans `creneaux`.

**Fausse piste explorée d'abord :** le déclencheur `send_booking_confirmation_trigger` ajouté la veille — hypothèse que l'appel à `net.http_post` faisait échouer toute la transaction. Correctif appliqué par précaution (bloc `begin...exception when others...` autour de l'appel HTTP dans `trigger_send_booking_confirmation`, pour que l'envoi d'email ne puisse jamais faire échouer la réservation) — bonne pratique conservée, mais **ce n'était pas la cause du problème**.

**Cause réelle, trouvée via l'onglet Network du navigateur (F12) :** `code: 42501, message: "permission denied for table creneaux"`. La policy RLS `with check (true)` créée à l'origine autorise bien l'opération *une fois tentée*, mais il manquait le droit de base au niveau de la table elle-même — RLS et GRANT sont deux couches distinctes chez Postgres, la policy seule ne suffit pas. Jamais détecté avant car tous les tests précédents (création de la table, premier test d'email) avaient été faits avec le rôle `postgres` (SQL Editor), qui contourne RLS et les GRANTs — **le tout premier vrai INSERT en tant que rôle `anon` était celui de l'utilisatrice sur le site**.

**Correctif :**
```sql
grant insert on public.creneaux to anon;
```

**Validé de bout en bout après correction** : réservation réelle passée via le site (localhost:3000/reservation), écran de confirmation affiché, créneau 2026-08-06 14:30. Ligne de test supprimée après vérification email.

**Leçon à retenir pour toute nouvelle table/opération future** : toujours accorder explicitement le `GRANT` (SELECT/INSERT/UPDATE/DELETE selon besoin) au rôle `anon` en plus de la policy RLS — ne jamais supposer que la policy seule suffit. Et tester au moins une fois avec le vrai flux applicatif (rôle `anon`), pas seulement depuis le SQL Editor (rôle `postgres`), avant de considérer une fonctionnalité validée.

**Question posée par l'utilisatrice :** le système doit-il aussi notifier Kenzo par email à chaque réservation (en plus de l'email client) ? Réponse actuelle : non, ce n'est pas implémenté — choix d'origine de `CLAUDE.md` (Kenzo consulte via Supabase Studio). Proposé d'ajouter un email de notification interne si souhaité — en attente de décision.

**Email de confirmation "manquant" lors de ce test réel — expliqué, pas un bug :** l'utilisatrice a saisi son adresse personnelle dans le formulaire de réservation, alors que son compte Resend est créé avec son adresse professionnelle. Confirme une nouvelle fois, en conditions réelles cette fois, la limite déjà connue de Resend (seule l'adresse du compte reçoit tant qu'aucun domaine n'est vérifié). Chaîne technique validée correcte.
