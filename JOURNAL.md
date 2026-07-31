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

**Notification email interne à Kenzo ajoutée** : `supabase/functions/send-booking-confirmation/index.ts` envoie désormais deux emails en parallèle (`Promise.all`) — confirmation client + notification détaillée à `sublimnet33@gmail.com` (coordonnées complètes du client, adresse, montant). Redéployé manuellement sur le Dashboard (fonction `bright-handler`).

**Débogage du test post-déploiement** : premier test après redéploiement → aucun email reçu du tout (ni client ni Kenzo). Logs de la fonction (Edge Functions → Logs) consultés directement — ont montré la cause exacte sans ambiguïté : erreur Resend 403 `validation_error` pour les deux destinataires, aucun ne correspondant à l'adresse réelle du compte Resend (`contact.essaloc@gmail.com`). L'utilisatrice avait utilisé `contact.essaloc@hotmail.fr` (mauvais domaine) comme email client de test. Pas un bug — les logs prouvent que la fonction s'exécute et échoue proprement (erreur loggée, pas de crash). Retest avec la bonne adresse (`contact.essaloc@gmail.com`) → email client reçu avec succès.

**Confirmations supplémentaires obtenues lors de ces tests réels :**
- Une réservation dont l'envoi d'email échoue reste correctement enregistrée en base (découplage réservation/email qui fonctionne comme prévu).
- L'anti-double-réservation (contrainte unique `date_creneau, heure`) confirmée fonctionnelle en conditions réelles : un créneau déjà pris par un test précédent s'est affiché indisponible sur le site.

**Système de réservation + emails : entièrement validé de bout en bout, y compris via le vrai parcours utilisateur (pas seulement en SQL).** Table `creneaux` nettoyée des 4 lignes de test accumulées pendant cette session.

---

## 2026-07-30/31 — Exploration badge/mascotte (Higgsfield) — non intégré

**Génération IA tentée en interne (compte Claude/Higgsfield) :** bloquée — modèle vectoriel (Recraft) nécessite un forfait payant supérieur, modèle de secours (Z Image) à court de crédits. Abandon de cette voie.

**Compte Higgsfield créé par l'utilisatrice sous `sublimnet33@gmail.com`**, génération de plusieurs itérations d'un badge circulaire (voiture + canapé + outil de nettoyage + étincelles, dégradé violet→bleu) avec le modèle Nano Banana Pro, en collaboration sur les prompts (composition, cohérence de style entre icônes, respect strict de la palette `#7F4997`→`#4C77BB`). Version retenue par l'utilisatrice et son frère : badge "pistolet de lavage" en premier plan, voiture + canapé en arrière-plan, 2 étincelles.

**Limite Higgsfield découverte :** filigrane "HIGGSFIELD AI" présent même sur les téléchargements (pas seulement l'aperçu), y compris sur compte gratuit — pas de mention trouvée sur un plan sans filigrane. Contournement : recadrage/nettoyage manuel post-génération plutôt que blocage complet.

**Retouche du fichier livré** (`src/images/badge-pistolet-brut.png.png`, déposé par l'utilisatrice) : le fond "damier" affiché par Higgsfield n'était **pas** une vraie transparence PNG (pixels gris/blanc en dur, alpha=255 partout) — détourage réalisé par détection de pixels neutres (R≈G≈B). Deux micro-coupures dans l'anneau circulaire (dues aux gouttes d'eau et à un tuyau de pistolet qui sortaient du cadre) comblées par un script de correspondance de couleur le long du cercle ajusté mathématiquement (centre/rayon retrouvés par balayage de pixels). Tuyau et filigrane restant retirés. Résultat final : `src/images/badge-mascotte.png`, vérifié illisible-imperfections à toutes les tailles d'usage réel (40-80px).

**Statut : badge créé et nettoyé, mais pas encore placé sur le site.** Essayé en aperçu dans le header (refusé par l'utilisatrice) puis dans le footer à côté du logo (retour en attente — "on verra"). Aucune intégration définitive à ce stade.

---

## 2026-07-31 — Refonte du Hero (page d'accueil), demande formalisée par l'utilisatrice

**Demande reçue :** remplacer le fond hero générique (héritage du template) par une version "preuve/conversion", sans note Google, sans QR code, sans carrousel — split ou slider avant/après au choix, en privilégiant la simplicité d'implémentation.

**Fichiers vérifiés (pas de supposition)** : `src/images/bleu-avant.jpeg` et `src/images/bleu-apres.jpeg` confirmés par listing direct du dossier avant toute modification de code.

**Choix technique — split statique plutôt que slider interactif :**
Un slider avant/après à glissière nécessite de la gestion d'état (position du curseur), des événements tactiles dédiés pour mobile, et généralement une librairie tierce pour un résultat propre. Le split statique gauche/droite ne demande que du CSS (deux `<img>` en `flex: 1`, `object-fit: cover`), fonctionne nativement sur mobile sans code d'interaction, et réutilise le même schéma visuel (badges "Avant"/"Après") déjà en place pour les collages de `ServicesPage.jsx` — cohérence avec l'existant, zéro dépendance ajoutée, zéro risque de bug tactile. Conforme à la consigne "le plus simple à implémenter proprement, pas le plus complexe visuellement".

**Optimisation image (sans toucher aux originaux)** : `bleu-avant.jpeg` (3213×5712, 6 Mo) et `bleu-apres.jpeg` (3213×5712, 4,8 Mo) beaucoup trop lourds pour un fond de hero (impact direct sur le LCP). Copies redimensionnées/compressées créées séparément : `src/images/bleu-avant-hero.jpg` (1000×1778, 434 Ko) et `src/images/bleu-apres-hero.jpg` (1000×1778, 330 Ko) — fichiers sources intacts, non déplacés.

**`src/pages/HomePage.jsx` modifié** : section hero entièrement reconstruite —
- Fond : split statique 50/50 (`heroAvant` à gauche, `heroApres` à droite), badges "Avant"/"Après" superposés (style identique aux collages existants)
- Overlay dégradé marine semi-transparent pour le contraste du texte
- Logo officiel (`<Logo size={54} />`, script "Sublim Net") à la place d'un H1 texte séparé — évite d'introduire une nouvelle typographie ("Sublim'Net" demandé dans le brief était probablement une coquille : le nom de marque exact reste "Sublim Net", sans apostrophe, conformément à `CLAUDE.md`)
- Accroche courte et concrète : *"La preuve en image : un intérieur transformé, sans bouger de chez vous."*
- CTA unique et dominant **"Réserver maintenant"** → `/reservation`, plus un bouton secondaire WhatsApp discret (contact de repli, cohérent avec le reste du site)
- Aucun badge avis Google, aucun QR code, aucun carrousel — conforme à la demande

**Vérifié** : compilation sans erreur, capture desktop (1440px) et mobile (375px) — texte lisible, split fonctionnel et lisible sur les deux formats, boutons accessibles sans scroll, aucune erreur console.

**Rapport :**
- Fichiers exacts utilisés : `bleu-avant.jpeg` / `bleu-apres.jpeg` (confirmés avant codage)
- Choix technique : split statique (pas de slider) — justifié ci-dessus
- Rendu : conforme à la demande sur desktop et mobile, capturé et vérifié
- TODO restants : aucun — testé sur mobile dans le cadre de cette tâche, pas seulement desktop

---

## 2026-07-31 (suite) — Bannière cohérente sur Services / Réservation / Avis & Contact

**Demande reçue :** appliquer un traitement de header cohérent (photo `bleu-apres` seule, pas la paire) sur ces trois pages uniquement — Devis Tapis explicitement exclu (photo dédiée prévue dans une étape séparée, non traitée ici).

**Fichier vérifié** : `bleu-apres.jpeg` confirmé par listing avant codage.

**Optimisation image** : source portrait (3213×5712) recadrée en bande large format bannière (ratio 2.7:1, sur la portion verticale centrale) avant compression — évite de stocker/charger une hauteur inutile qui serait de toute façon coupée par `object-fit: cover`. Résultat : `src/images/bleu-apres-banner.jpg` (1800×667, 172 Ko) — nettement plus léger qu'un simple redimensionnement sans recadrage préalable (essayé d'abord : 1800×3200, 880 Ko, abandonné). Fichier source `bleu-apres.jpeg` non modifié, non déplacé.

**Composant réutilisable créé** : `src/components/PageHeaderBanner.jsx` (props : `title`) — garantit un traitement strictement identique (même photo, même overlay dégradé marine, même style de titre) sur les trois pages plutôt que trois implémentations copiées-collées qui risqueraient de diverger.

**Hauteur responsive** — classe `.page-header-banner` ajoutée dans `App.css` :
- Mobile (≤768px, cohérent avec le breakpoint déjà utilisé ailleurs sur le site) : **250px fixes**
- Desktop (>768px) : **45svh** (proportionnel, pas une valeur fixe) — remplace les hauteurs précédentes (46-48svh selon la page, incohérentes) et les rend nettement plus présentes qu'avant sur desktop

**Pages modifiées :**
- `src/pages/ServicesPage.jsx` — ancien hero (photo `roue-avant.jpeg`, titre "Nos tarifs") remplacé par `<PageHeaderBanner title="Nos Services" />` ; sous-titre existant repositionné en texte d'intro sous la bannière plutôt que supprimé
- `src/pages/ReservationPage.jsx` — n'avait aucune bannière photo auparavant (juste un titre texte) ; `<PageHeaderBanner title="Réserver" />` ajoutée, sous-titre conservé sous la bannière. L'écran de confirmation post-réservation (état `success`) n'a pas été touché — ce n'est pas la bannière d'en-tête de la page
- `src/pages/ContactPage.jsx` — ancien hero (déjà `bleu-apres.jpeg`, mais version brute non optimisée) remplacé par `<PageHeaderBanner title="Avis & Contact" />`

**Vérifié** : compilation propre (une erreur transitoire en cours d'édition, résolue dans l'état final), capture desktop (1440px) et mobile (375px) des trois pages — bannières visuellement identiques entre elles (même photo, même overlay, même style), hauteurs correctes (~405px sur viewport 900px desktop = 45%, 250px sur mobile confirmés visuellement), aucune erreur console.

**Rapport :**
- Trois pages traitées : Services, Réservation, Avis & Contact (Devis Tapis non touchée, comme demandé)
- Hauteur appliquée : 45svh desktop (>768px), 250px mobile (≤768px)
- Rendu vérifié desktop ET mobile, capturé
- TODO restants : aucun

---

## 2026-07-31 (suite) — Vignettes Prestations + galerie Avant/Après curatée (Services)

**Fichiers vérifiés par listing avant codage** (noms réels, différents des libellés "avec accent" utilisés dans la demande) :
- `siege-beige-apres.png` (nouvelle version, remplace l'ancien `.jpeg`)
- `canape1-apres.png` / `canape1-avant.jpeg` (= "canapé-un" — le fichier utilise le chiffre "1", pas le mot "un")
- `matelas-apres.png` (nouvelle version sans le filigrane "SublimNet" présent sur l'ancienne)
- `tapis.png` — confirmé comme seul visuel disponible pour cette catégorie (repéré la session précédente, resté non intégré jusqu'ici)
- Paire déjà existante réutilisée telle quelle : `canape-avant.jpeg` / `canapé-apres.jpeg` (incohérence d'accent déjà connue, non corrigée)

**Vignettes "Nos Prestations" (`HomePage.jsx`)** mises à jour : Auto → `siege-beige-apres.png`, Canapé → `canape1-apres.png`, Matelas → `matelas-apres.png`, Tapis → `tapis.png`.

**Galerie Avant/Après (`ServicesPage.jsx`) curatée à 5 paires** (au lieu des 17 précédentes, qui couvraient toutes les photos disponibles sans distinction) : Auto (bleu, déjà en place), Canapé ×2 (`canape1` nouveau + `canape` existant), Auto — sièges (`siege-beige`, après mis à jour), Matelas (après mis à jour). Les 12 autres paires (jante, volant, rail, coffre, phare, tapis de sol, sièges arrière/gris, porte-gobelets, etc.) retirées du tableau `GALERIE` — toujours présentes en tant que fichiers et collages sur disque, juste plus affichées sur cette page.
- 3 collages générés/régénérés avec le même script que la première fois (bandeau 900px, badges Avant/Après) : `collages/canape1-collage.jpg` (nouveau), `collages/siege-beige-collage.jpg` et `collages/matelas-collage.jpg` (régénérés avec les nouvelles photos "après").
- Grille adaptée à 2 colonnes desktop (`minmax(460px, 1fr)` au lieu de `260px`) avec cartes plus grandes (240px de hauteur au lieu de 180px) — la grille précédente (auto-fit 260px) aurait donné une répartition 4+1 peu naturelle avec seulement 5 éléments ; 2 colonnes donne un rendu 2+2+1 propre.

**Placeholder signalé** : `tapis.png` est un visuel générique/généré, **pas une vraie photo** — aucune paire avant/après n'existe pour le tapis (cohérent avec la règle métier "Tapis sur devis uniquement"). Seule cette catégorie est concernée ; toutes les autres vignettes et paires de cette mise à jour sont de vraies photos.

**Bug rencontré en cours de route** : le processus `npm start` (actif depuis plusieurs jours de session) s'était arrêté silencieusement — `curl` ne répondait plus, sans trace d'erreur dans les logs après le dernier "Compiled successfully". Redémarré sans souci, recompilation propre.

**Vérifié** : compilation sans erreur, capture desktop (1440px) et mobile (375px) des vignettes homepage et de la galerie Services — grille 2 colonnes lisible, non surchargée avec 5 paires, aucune erreur console.

**Rapport :**
- Fichiers trouvés : tous (aucun manquant)
- Rendu vérifié desktop + mobile, capturé
- Galerie Avant/Après : 5 paires (Auto, Canapé ×2, Auto — sièges, Matelas), grille 2 colonnes
- TODO restants : aucun côté code — reste à obtenir une vraie photo tapis (avant/après) quand disponible

---

## 2026-07-31 (suite) — Ajustements headers + header Devis Tapis manquant

**1. Cadrage corrigé (`bleu-apres-banner.jpg`)** : l'ancien recadrage (centré à 50% de la hauteur de la photo source) montrait surtout le tapis de sol en gros plan — pas franchement flatteur, lu comme "juste le bas" de la photo. Comparé visuellement 3 options de cadrage (30%, 38%, 50% de la hauteur source) avant de choisir : retenu **38%** (légèrement au-dessus du centre géométrique), qui montre tableau de bord + pédales + tapis de sol dans un cadre plus riche et reconnaissable comme intérieur de véhicule. Fichier régénéré à la même résolution/qualité (1800×667, 158 Ko).

**2. Hauteur des headers augmentée** : classe `.page-header-banner` (`App.css`) passée de 45svh/250px à **55svh (desktop) / 280px (mobile)**.

**3. Header Devis Tapis ajouté** — cette page n'avait encore aucune bannière photo. `PageHeaderBanner.jsx` rendu flexible (nouvelle prop `image`, optionnelle, avec la photo `bleu-apres-banner.jpg` comme valeur par défaut pour ne rien casser sur les 3 pages existantes). Nouveau fichier `src/images/tapis-banner.jpg` généré à partir de `tapis.png` (recadré au format bannière 2.7:1, 1800×667, 269 Ko) — **visuel générique temporaire, pas une vraie photo**, comme déjà noté pour cette catégorie. `DevisTapisPage.jsx` utilise `<PageHeaderBanner title="Devis Tapis" image={tapisBanner} />`.

**Vérifié** : compilation sans erreur, capture desktop (1440px) et mobile (375px) des 4 pages (Services, Réservation, Devis Tapis, Avis & Contact) — même traitement visuel cohérent sur les 4, hauteur visiblement plus généreuse, cadrage bleu-après nettement plus lisible qu'avant, aucune erreur console.

**Rapport :**
- 4 headers confirmés : Services, Réservation, Devis Tapis (nouveau), Avis & Contact
- Hauteur appliquée : 55svh desktop, 280px mobile
- Cadrage jugé correct après comparaison de 3 options contre la photo source — retenu 38% (légèrement au-dessus du centre)
- Devis Tapis : visuel temporaire (`tapis.png`), à remplacer par une vraie photo tapis avant/après quand disponible
- Vérifié desktop ET mobile, capturé

---

## 2026-07-31 (suite) — Galerie Avant/Après organisée par catégorie + teaser accueil

**Correction de catégorisation avant de coder** : la demande groupait `siège-beige` avec Canapé ("canapé-un, canapé/siège-beige"). Vérification directe des photos (pas de suppositions sur les noms) : `siege-beige-avant.jpeg`/`siege-beige-apres.png` montrent un intérieur de voiture (tableau de bord Renault, sièges), pas un canapé — confirmé identique à l'identification faite dans une session précédente. Reclassé en **Auto**. Les 2 vraies paires Canapé sont `canape1` (canapé sectionnel blanc) et `canape` (coussin tissu beige, confirmé par inspection visuelle).

**Sélection des 6 meilleures paires Auto** (sur 15 disponibles au total, toutes examinées via leurs collages existants — comparaison sur contraste avant/après et propreté du cadrage, pas d'ordre alphabétique) :
1. **Coffre** — contraste très marqué (débris → coffre impeccable)
2. **Jante** — spectaculaire, colorée
3. **Volant** — cuir usé/sale → propre, fort contraste
4. **Porte-gobelets** — net, coloré, très parlant
5. **Banquette arrière** — tache bien visible → nickel
6. **Sièges** (ex "siège-beige") — contraste net, colorée

Écartées (bonnes mais redondantes ou moins nettes) : `bleu` (déjà utilisée en hero, évite la répétition), `phare`, `siège-gris`, `siège-arrière`, `volant2`, `tapis-volant`, `tapis-volant2`, `rail`, `1` (sujet trop technique/peu lisible en vignette).

**`ServicesPage.jsx` — galerie réorganisée par catégorie** (nouvelle structure `GALERIE_GROUPES` : tableau de `{ categorie, paires }` au lieu d'une liste plate) : sous-titre "Auto" (6 paires, grille 3 colonnes desktop), "Canapé" (2 paires), "Matelas" (1 paire). Pas d'entrée Tapis (aucune paire disponible, conforme à la consigne de ne pas en forcer une). `id="avant-apres"` ajouté à la section pour le lien direct depuis l'accueil. **Lazy loading confirmé actif** : `loading="lazy"` déjà présent sur toutes les images de la galerie (hérité de l'implémentation initiale) — vérifié par script Playwright : **0/9 images chargées avant scroll jusqu'à la section, 9/9 chargées après** (le test contrôlait spécifiquement les paires Auto visibles en premier).

**`HomePage.jsx` — teaser ajouté** juste après "Nos Prestations" : 4 paires variées (Jante + Banquette arrière = Auto, Canapé, Matelas — pas uniquement auto, comme demandé), bouton "Voir toutes nos réalisations" → `/services#avant-apres`.

**Bug découvert et corrigé en cours de route** : `App.js` forçait un `window.scrollTo({top:0})` à chaque changement de route, y compris avec une ancre — le lien du teaser aurait atterri en haut de la page Services au lieu de la section Avant/Après. Corrigé : si `location.hash` est présent et correspond à un élément existant, scroll fluide vers cet élément plutôt qu'en haut de page. Testé : clic sur le bouton → navigation vers `/services#avant-apres` → `scrollY` mesuré à 2795px après clic (pas bloqué à 0).

**Vérifications demandées :**
- **Aucun fichier disque supprimé ni modifié** — confirmé par `ls -la` : toutes les 39 photos avant/après sources ont conservé leurs dates de modification d'origine (uniquement le référencement dans le code a changé).
- **Temps de chargement** : page Services chargée en ~2,4s en mode développement (non représentatif de la prod, mais sert de référence relative) ; confirmation surtout via le test 0/9 → 9/9 ci-dessus, qui prouve l'effet concret du lazy loading sur ce volume d'images.
- **Testé desktop (1440px) et mobile (375px)** : capturé, galerie organisée lisible sur les deux formats, teaser accueil affiché correctement, aucune erreur console.

**Rapport :**
- 6 paires Auto retenues : Coffre, Jante, Volant, Porte-gobelets, Banquette arrière, Sièges (liste ci-dessus pour vérification)
- Organisation par catégorie confirmée (Auto/Canapé/Matelas, sous-titres visibles)
- Lazy loading confirmé actif et vérifié fonctionnellement (0/9 puis 9/9)
- Rendu desktop + mobile conforme, capturé
