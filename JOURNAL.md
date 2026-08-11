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

---

## 2026-08-01 — Corrections design (session du soir)

**1. Bug d'alignement vignette Matelas ("Nos Prestations", accueil) — cause racine identifiée et corrigée.** Diagnostic par mesure DOM (Playwright) avant toute correction : l'image et son conteneur `.flow-imgz` étaient déjà strictement identiques sur les 4 cartes (268×170px) — le problème n'était pas l'image. La carte entière (`.flow-card`) faisait 393px pour Auto/Canapé/Tapis mais seulement 371px pour Matelas, à cause d'un texte de description plus court (moins de retours à la ligne) combiné à l'absence de hauteur imposée sur la grille CSS (le `stretch` par défaut de CSS Grid s'applique au conteneur direct de la grille, pas aux enfants imbriqués sans régle explicite). Corrigé en rendant `.flow-card` `height:100%` + `display:flex; flexDirection:column`, avec le bloc prix+bouton poussé en bas via `marginTop:auto` — les 4 cartes s'alignent désormais quelle que soit la longueur du texte, pas seulement pour ce jeu de contenu actuel. Vérifié par mesure : **393px sur les 4 cartes**.

**2. Recadrage `bleu-apres-banner.jpg` revu** (headers Services/Réservation/Avis&Contact) : le cadrage précédent (38% de la hauteur source) montrait pédales + tapis de sol — jugé encore trop "sol". Comparé 4 nouvelles options (18%, 24%, 30%, 38%) contre la photo source. Retenu **18%** : montre les aérations du tableau de bord, le levier de vitesses et une partie du volant — se lit clairement comme "habitacle" plutôt que comme un plan de sol. Fichier régénéré à la même résolution (1800×667, 133 Ko).

**3. Logo hero accueil agrandi et repositionné.** `Logo.jsx` modifié pour accepter une taille responsive (`size` peut désormais être un nombre fixe *ou* une chaîne CSS comme `clamp(...)`) — la largeur suit automatiquement via `aspect-ratio` au lieu d'un calcul JS, ce qui évite de dupliquer la logique de ratio pour ce nouveau cas d'usage. Hero passé de `size={54}` (fixe) à `size="clamp(70px, 12vw, 140px)"` — nettement plus imposant sur desktop (jusqu'à 140px), toujours sûr sur mobile (minimum 70px, supérieur à l'ancienne taille fixe). Padding vertical du bloc de contenu ajusté (`120px/80px` → `96px/104px`) pour remonter légèrement la composition dans le hero. Testé jusqu'à 320px de large (iPhone SE) : aucun débordement, CTA "Réserver maintenant" jamais chevauché.

**Vérifié desktop (1440px) et mobile (375px + 320px)** pour les 3 corrections — capturé, aucune erreur console. Note méthodologique : une première capture du hero semblait montrer un texte à faible opacité — vérifié qu'il s'agissait d'une capture prise pendant l'animation de fondu (FadeIn), pas d'un vrai problème ; une capture après délai plus long confirme un rendu final à pleine opacité, bien contrasté.

**Rapport :** les 3 corrections apportent une amélioration nette et confirmée (pas de résultat mitigé à signaler) — alignement des cartes vérifié par mesure exacte, cadrage bleu-après nettement plus représentatif de l'habitacle, logo hero visiblement plus imposant sans débordement mobile.

---

## 2026-08-01 (suite) — Audit brand-identity : placement du pictogramme footer tranché avec Kenzo

**Contexte :** le brief d'audit fourni affirmait que le placement du pictogramme (icône voiture/canapé/étincelles) et du lettrage "Sublim Net" était "déjà validé" (icône+texte sur une ligne en header, empilé en footer). Vérification du code avant d'accepter cette prémisse : aucune des deux affirmations n'était exacte — pas d'icône du tout dans le header, et le commentaire du code marquait littéralement le pictogramme footer comme un aperçu temporaire non validé (`// [PREVIEW TEMPORAIRE — à retirer si non validé]`). Signalé comme constat factuel plutôt que d'assumer le brief exact.

**Résolution :** l'utilisatrice a confirmé explicitement que le placement actuel (icône + texte en ligne dans le footer, nulle part ailleurs) est la décision finale du client. `Footer.jsx` mis à jour en conséquence : commentaire changé de `// [PREVIEW TEMPORAIRE...]` à `// Pictogramme validé — footer uniquement, ne pas déplacer sans confirmation explicite` — aucun changement fonctionnel ou visuel, seulement la trace de la décision pour éviter de rouvrir la question plus tard. Committé (`5c9e039`).

---

## 2026-08-02 — Cohérence CTA/alignement, copywriting, traçabilité échecs email, passe humanizer

**1. Services/Contact — cohérence visuelle et CTA (committé, `5b817a3`).**
- `ServicesPage.jsx` (Canapé/Matelas) : boutons "Réserver un canapé"/"Réserver un matelas" alignés en bas de colonne via flexbox (`height:100%; flexDirection:column` sur `FadeIn`, `marginTop:auto` sur le bouton) — même technique que le fix vignette Matelas de la veille, sans égaliser la hauteur totale du bloc. `variant="secondary"` remplacé par `variant="primary"` sur ces deux boutons après audit de tous les usages de `variant="secondary"` dans le repo (confirmé : oubli isolé, tous les autres CTA `href="/reservation"` du site utilisent déjà `primary`).
- `ContactPage.jsx` (Zone d'intervention / Créneaux) : même pattern flexbox appliqué aux deux blocs, `marginTop:auto` sur le dernier paragraphe de chacun (pas de bouton dans ces blocs, donc ancrage du texte final plutôt qu'un CTA).
- Ajout des icônes officielles Instagram/TikTok (`Icons.jsx` : `InstagramIcon`, `TiktokIcon`, glyphes SVG inline) dans `Footer.jsx` (nouveau, colonne marque) et `ContactPage.jsx` (remplace les anciennes pills texte "Instagram — SUBLIMNET"/"TikTok — SUBLIMNET"). Couleur de marque au survol via nouvelles classes CSS `flow-social-icon`/`flow-social-instagram`/`flow-social-tiktok` dans `App.css` (contournement nécessaire car styles inline ne supportent pas `:hover`). Rendu vérifié par capture d'écran (état par défaut + survol, desktop) avant validation utilisatrice.

**2. Diagnostic architecture technique (aucun fichier modifié) — compatibilité hébergement.** Demande explicite de confirmer l'architecture avant toute décision d'hébergement. Confirmé par lecture directe du code : emails envoyés via trigger SQL Postgres (`net.http_post`) → Edge Function Supabase (`send-booking-confirmation`) → API Resend, pas de route serveur custom ; écriture réservations exclusivement via client Supabase JS côté navigateur (clé anonyme, RLS + `GRANT INSERT`) ; aucune exécution Node persistante dans le repo ; stack CRA (`react-scripts`) en CSR pur. **Conclusion transmise :** compatible Netlify standard, aucune Netlify Function nécessaire (toute la logique serveur est déjà côté Supabase).

**3. Passe copywriting (revue complète des 5 pages, corrections ciblées appliquées — pas encore committées).** Revue conversion sur Accueil/Services/Réservation/Devis Tapis/Avis&Contact sans remettre en cause le positionnement ni le ton déjà validés. Principal constat : 3 des 4 cartes "Ce qui nous distingue" (accueil) répétaient quasi mot pour mot les cartes "Pain Points" plus haut sur la même page. Corrections approuvées et appliquées dans `HomePage.jsx` et `ContactPage.jsx` :
- 3 cartes "Ce qui nous distingue" reformulées pour apporter une info neuve (continuité de journée pendant l'intervention, amplitude 7j/7 y compris week-end, prix engagé avant validation) au lieu de redire les Pain Points.
- CTA final accueil : "véhicule ou votre intérieur" (ambigu) → "véhicule, votre canapé ou votre matelas" (explicite, exclut Tapis à dessein car parcours devis séparé).
- Sous-titre Pain Points allégé (tournure moins présomptueuse).
- `ContactPage.jsx` : carte "Avis clients" passée à la voix active ; carte "Téléphone" élargie (ne semblait couvrir que l'annulation, alors que le canal sert aussi aux questions).
- Nouvelle entrée FAQ paiement ajoutée (accueil) suite à demande séparée de l'utilisatrice : "Sur place, après l'intervention" (espèces/carte/virement) — sujet jusque-là absent de tout le site.
- Point volontairement laissé de côté : sous-titre "Ce qui nous distingue" ("simple, clair et fiable") conservé tel quel sur décision explicite de l'utilisatrice.

**4. Traçabilité des échecs d'envoi d'email (`email_failures`) — implémenté, cause racine identifiée, pas encore committé.**
- **Contexte :** le trigger `send_booking_confirmation_trigger` avale silencieusement tout échec Resend (panne, clé invalide, quota) — ni Kenzo ni la cliente n'étaient notifiés, aucune trace nulle part.
- **Nuance technique importante clarifiée avant de coder :** `net.http_post` (pg_net) est asynchrone — le `begin...exception when others` du trigger ne protège que contre un échec de mise en file de la requête, pas contre un vrai rejet de l'API Resend (qui arrive hors transaction). L'essentiel de la capture devait donc se faire côté Edge Function, pas côté trigger SQL.
- **Plan validé puis exécuté par l'utilisatrice côté Supabase :** table `public.email_failures` créée (`creneau_id uuid` sans FK stricte — nom de colonne PK réel de `creneaux` confirmé être **`identifiant`**, pas `id`, corrigé partout après capture d'écran Table Editor fournie par l'utilisatrice), RLS activé sans policy anon (accessible via Supabase Studio comme `creneaux`), trigger mis à jour pour logger dans le bloc exception existant.
- **`supabase/functions/send-booking-confirmation/index.ts` modifié :** `sendEmail()` retourne désormais `{ ok, error }` au lieu d'un simple booléen ; nouvelle fonction `logEmailFailure()` insère dans `email_failures` via l'API REST Supabase avec `SUPABASE_SERVICE_ROLE_KEY` (injectée automatiquement par Supabase, aucun secret à créer) quand l'un des deux envois échoue.
- **Test réel effectué par l'utilisatrice :** email client bien reçu, email Kenzo absent, ET table `email_failures` restée vide malgré l'échec — anormal. Logs Edge Function consultés (capture fournie) : `ERROR: Resend error (to sublimnet33@gmail.com): {"statusCode":403,"name":"validation_error","message":"You can only send test..."}`.
- **Bug réel trouvé et corrigé :** `logEmailFailure()` ne vérifiait jamais `res.ok` sur sa propre requête d'insertion — un `fetch()` ne rejette (`catch`) que sur erreur réseau, jamais sur un statut HTTP en erreur, donc un refus de PostgREST (probablement cache de schéma pas encore rafraîchi juste après création de la table) passait totalement silencieux. Correctif appliqué : vérification `res.ok` + log du détail. **Pas encore redéployé/retesté par l'utilisatrice à ce stade.**
- **Cause racine du problème initial (email Kenzo manquant) confirmée : ce n'est pas un bug de code.** C'est la restriction sandbox Resend (déjà rencontrée le 2026-07-29) — tant qu'aucun domaine n'est vérifié, Resend ne livre qu'à l'adresse du compte Resend lui-même (`contact.essaloc@gmail.com`), jamais à une autre adresse réelle comme `sublimnet33@gmail.com`. Confirmé par recherche documentation Resend officielle : aucune fonctionnalité de "verified recipient" additionnel sans domaine vérifié ; délai de vérification DNS annoncé jusqu'à 72h. **Domaine `sublimnet.fr` toujours non réservé (voir CLAUDE.md) → bloquant dur pour la publication**, pas juste une amélioration à prévoir : le mode sandbox ne peut structurellement pas gérer des adresses clientes arbitraires.

**5. Passe humanizer sur les 6 textes de la passe copywriting — 4 corrections appliquées (pas encore committées).** Revue ciblée anti-patterns IA (tirets cadratins, négations en fin de phrase, vocabulaire corporate) sur les 6 textes de l'étape 3, sans toucher au reste du site. 3 tirets cadratins supprimés (carte "Réservation immédiate", carte "Tarifs transparents", FAQ paiement) et remplacés par point, virgule ou deux-points selon le cas ; carte "Téléphone" (Contact) reformulée sans tiret. 3 textes jugés déjà propres et laissés tels quels (carte "À domicile", CTA final, sous-titre Pain Points, carte "Avis clients").

**État git à la fin de cette session :** rien de committé depuis `5b817a3`. `HomePage.jsx`, `ContactPage.jsx` et `supabase/functions/send-booking-confirmation/index.ts` modifiés en attente de validation visuelle par l'utilisatrice sur le site local avant commit/push. `src/IMG_9724.jpeg` toujours untracked, toujours exclu.

**Points ouverts :**
- Domaine `sublimnet.fr` (ou équivalent) à réserver + vérifier dans Resend — bloquant dur pour tout envoi d'email à de vrais clients, pas seulement à Kenzo.
- Redéploiement + retest du correctif `logEmailFailure()` (vérification `res.ok`) encore à faire.
- Mode de paiement : résolu (FAQ ajoutée), retiré des points ouverts.

---

## 2026-08-02 (suite) — Première mise en ligne : domaine, Netlify, page blanche (variables d'environnement manquantes)

**Contexte :** l'utilisatrice a déployé le site elle-même sur Netlify et réservé le nom de domaine, en dehors du cadre habituel où je génère le code — je l'ai guidée en direct par captures d'écran successives. Marche à suivre documentée ici pour ne pas avoir à la redécouvrir la prochaine fois (nouveau projet, ou redéploiement).

**Étapes suivies, dans l'ordre :**

1. **Nom de domaine acheté** : `sublimnet.com` (le choix s'est porté sur `.com`, pas `.fr` comme envisagé initialement dans `CLAUDE.md`).
2. **Site connecté à Netlify** (projet `poetic-belekoy-a15347`), déployé depuis `github.com/sabrina33-creator/flow-sublim-net`, branche `master`, auto-publish activé. Domaine personnalisé `sublimnet.com` rattaché au projet.
3. **Premier déploiement publié → page entièrement blanche**, y compris après actualisation.
4. **Diagnostic (sans accès aux logs Netlify moi-même, guidage par captures d'écran successives) :** hypothèse posée avant toute vérification — `.env`/`.env.local` sont gitignorés (confirmé par `git ls-files`, jamais commités), donc Netlify n'a jamais eu accès à `REACT_APP_SUPABASE_URL`/`REACT_APP_SUPABASE_KEY`. Avec Create React App, ces variables sont intégrées **au moment du build**, pas à l'exécution : si absentes, `createClient()` (`supabaseClient.js`) échoue au chargement du bundle, avant même le premier rendu React → page blanche sur tout le site, pas juste sur une page. Confirmé par capture : Netlify → Environment variables était effectivement vide.
5. **Variables ajoutées dans Netlify** (Project configuration → Environment variables → Add a variable) :
   - `REACT_APP_SUPABASE_URL` = `https://dyzmqnhvjydnovqfatcb.supabase.co`
   - `REACT_APP_SUPABASE_KEY` = clé **`anon` `public`** copiée depuis Supabase (Project Settings → API Keys → Legacy anon, service_role API keys) — **jamais la clé `service_role`**, qui contourne RLS et ne doit jamais atteindre le code front-end.
   - Scope réglé sur **"All scopes"** : l'option "Specific scopes" (restreindre à Builds uniquement) est verrouillée derrière un upgrade payant sur le plan Netlify gratuit utilisé ici — "All scopes" fonctionne tout aussi bien pour ce besoin, aucune perte fonctionnelle.
6. **Redéploiement forcé sans cache** : Deploys → Trigger deploy → **"Deploy project without cache"** (le simple ajout des variables ne suffit pas, un nouveau build est nécessaire pour qu'elles soient intégrées ; l'option "sans cache" garantit qu'un ancien bundle mis en cache n'est pas réutilisé).
7. Déploiement en cours au moment de cette entrée — résultat pas encore confirmé.

**`CLAUDE.md` mis à jour en conséquence** : domaine `sublimnet.com` renseigné, déploiement Netlify documenté comme actif (plus "local uniquement"), rappel sur la variable `anon public` vs `service_role` ajouté aux contraintes techniques.

**Point ouvert critique, à ne pas oublier :** le domaine est maintenant réservé, mais **pas encore ajouté/vérifié dans Resend** (DNS SPF/DKIM à configurer, voir entrée précédente sur la restriction sandbox Resend). Tant que ce n'est pas fait, les emails de réservation ne partiront toujours pas vers de vrais clients ni vers Kenzo.

---

## 2026-08-02 (suite) — Favicon officiel, vérification domaine Resend, adresse d'envoi mise à jour

**1. Favicon remplacé (committé, `efc7eff`).** L'icône d'onglet du template (goutte d'eau générique, `public/favicon.png`) remplacée par le vrai pictogramme de marque (voiture + canapé + nettoyeur haute pression, déjà utilisé en footer via `badge-mascotte.png`) — recadré et redimensionné en 512×512 par script PowerShell (`System.Drawing`), fond transparent préservé. Point signalé à l'utilisatrice : à la taille réelle d'un onglet (16-32px), le dessin très détaillé perd en lisibilité — accepté tel quel, c'est le logo officiel demandé explicitement.

**2. Domaine `sublimnet.com` vérifié dans Resend — guidage pas à pas par captures d'écran (utilisatrice non-développeuse, premier déploiement de sa vie).**
- DNS géré directement par Netlify (domaine acheté chez Netlify, pas de registrar externe) — simplifie la marche à suivre : les 4 enregistrements demandés par Resend (DKIM, MX, SPF, DMARC) s'ajoutent dans Netlify → DNS → "Add new record".
- **Erreur rencontrée et corrigée** : premier essai avec le nom complet `resend._domainkey.sublimnet.com` collé dans le champ "Name" → 400 "Please correct the following field: Domain", car Netlify concatène automatiquement `.sublimnet.com` à ce qu'on saisit — il ne faut taper que la partie courte (`resend._domainkey`, `send`, `_dmarc`), jamais le domaine complet dans ce champ. Une fois corrigé, les 4 enregistrements sont passés sans erreur.
- Vérification Resend passée par les étapes "Domain added" → "DNS verified" → "Verifying domain" → **verified**, en environ 25 minutes (région d'envoi Ireland/eu-west-1 — sans lien avec la localisation des clients, aucun souci RGPD, la seule option disponible dans Resend n'était de toute façon pas segmentée par pays).

**3. Adresse d'expédition mise à jour dans l'Edge Function (déployée sur Supabase, pas encore committée dans le repo au moment de cette entrée).**
- `FROM_EMAIL` : `onboarding@resend.dev` (sandbox) → `Sublim Net <reservations@sublimnet.com>`, adresse choisie par l'utilisatrice parmi 3 options proposées (`reservations@`, `noreply@`, `contact@`) — pas nécessairement une boîte mail réellement consultée, juste l'expéditeur affiché.
- Code complet redonné à coller dans Supabase Dashboard → Edge Functions → `bright-handler` → Via Editor (l'utilisatrice n'a pas de CLI Supabase), redéployé avec succès confirmé par l'utilisatrice.

**Point ouvert — test de bout en bout pas encore fait.** L'utilisatrice s'arrête pour la journée avant de tester une vraie réservation avec la nouvelle adresse. **À vérifier à la prochaine session :** email client reçu, **email Kenzo reçu** (c'est précisément le cas qui échouait avant, voir entrée du 2026-08-02 sur `email_failures`), table `email_failures` restée vide. Le changement `FROM_EMAIL` dans `supabase/functions/send-booking-confirmation/index.ts` reste **non committé** en attente de cette confirmation.

---

## 2026-08-03 — Test de réservation confirmé, schema.org corrigé, GA4 activé

**1. Test de réservation post-Resend confirmé bon (lundi, après une pause du week-end).** L'utilisatrice a vérifié directement dans Supabase Studio → Table Editor (pas de SQL) : une seule ligne dans `creneaux`, celle de son test de vendredi (nom/téléphone/email reconnus par elle avant suppression), et `email_failures` vide. Point ouvert de l'entrée précédente résolu : la chaîne email fonctionne bien de bout en bout avec la nouvelle adresse `reservations@sublimnet.com`. Ligne de test supprimée après vérification (même réflexe que les sessions précédentes). L'utilisatrice a ensuite proposé d'envoyer le lien à son frère pour un premier avis utilisateur externe — approuvé, avec rappel que sa réservation de test génère aussi une vraie ligne à nettoyer ensuite.

**2. Schema.org — domaine placeholder corrigé + LocalBusiness enrichi (commit `d4d47ee`).**
- **`SITE_URL` dans `tokens.js` pointait encore vers `sublimnet.fr`**, jamais mis à jour depuis l'achat réel de `sublimnet.com` — détecté avant toute génération de schema (vérification demandée explicitement en amont). Corrigé, ainsi que 4 autres fichiers où le même placeholder était codé en dur, non importable depuis `tokens.js` (fichiers statiques `public/`) : `index.html` (canonical, Open Graph, JSON-LD), `sitemap.xml`, `robots.txt`, `llms.txt`. **`JOURNAL.md` volontairement non touché** — historique daté, append-only, les mentions `.fr` passées reflétaient l'état réel à l'époque.
- **JSON-LD LocalBusiness enrichi** : ajout d'un `hasOfferCatalog` détaillant les 4 services (auto/canapé/tapis/matelas). Trois choix explicitement motivés et validés par l'utilisatrice avant application : pas de type `AutoWash` (sous-représenterait les 3 autres métiers), pas de `openingHoursSpecification` (les créneaux 07:30/14:30 sont des rendez-vous ponctuels, pas une plage d'ouverture continue — les modéliser comme horaires d'ouverture serait inexact), pas de `GeoCircle`/coordonnées GPS pour le rayon de 20km (utiliser `INTERNAL_LAT`/`INTERNAL_LON` exposerait l'adresse réelle par rétro-géocodage, interdit par `CLAUDE.md`) — `areaServed` (liste de villes) déjà suffisant et sûr.
- **Validé via Google Rich Results Test** après déploiement : 2 éléments valides détectés (LocalBusiness + WebSite). HowTo et FAQPage présents et syntaxiquement valides dans le `@graph` (vérifié par un parse JSON avant commit) mais non comptés comme "rich result" par l'outil — expliqué à l'utilisatrice que c'est une restriction Google volontaire depuis 2023 sur ces deux types (pas une erreur côté site), permanente, qui ne changera pas avec le temps.

**3. GA4 activé (commit `c292b17`), propriété créée par l'utilisatrice avec guidage pas à pas.**
- Diagnostic initial : le tracking CSR (SPA) était **déjà entièrement câblé** avant cette session — `src/analytics.js` (wrapper `gtag`) et `src/App.js` (`trackPageView` appelé dans un `useEffect` sur chaque changement de route React Router, `send_page_view:false` côté GA4 pour éviter le double comptage), probablement issu d'une session antérieure sur un autre site du même template ("version Malek"). Décision : ne pas ajouter de librairie (`react-ga4` etc.), l'existant suffit déjà pour ce stack CSR pur.
- Propriété créée par l'utilisatrice sur `analytics.google.com` (compte `sublimnet33@gmail.com`, cohérent avec Supabase) suite à un guidage étape par étape. Measurement ID obtenu : **`G-KRYJ8JZ2QG`**.
- Remplacement du placeholder `G-XXXXXXXXXX` dans `index.html` (2 occurrences) et `tokens.js`.
- **Incohérence trouvée et corrigée avant d'activer quoi que ce soit** : `ConfidentialitePage.jsx` affirmait explicitement "aucun cookie de mesure d'audience" — activer GA4 sans corriger ce texte aurait rendu la page légalement fausse dès la mise en ligne. Texte mis à jour pour refléter la réalité (GA4 actif) tout en signalant honnêtement l'absence de bandeau de consentement.
- **Point ouvert RGPD explicitement non traité dans cette tâche** (périmètre confirmé par l'utilisatrice — "il faudra y penser") : aucun bandeau de consentement cookies n'existe. Le site n'est donc pas conforme sur ce point tant qu'il n'est pas construit — pas juste "améliorable", réellement non conforme dès l'activation de GA4.

**État git en fin de session :** tout committé et pushé (`d4d47ee`, `c292b17`). Restent non liés à cette session : aucun — le point `email_failures`/`FROM_EMAIL` de l'entrée précédente est résolu et déjà committé (`efc7eff`, confirmé lors du test du point 1 ci-dessus).

**Points ouverts :**
- Bandeau de consentement cookies RGPD — à construire, périmètre volontairement exclu de la tâche GA4.
- Retour du frère de l'utilisatrice sur son test de réservation — en attente.

---

## 2026-08-03 (suite) — Bandeau cookies, fiabilisation GA4, audit technique `impeccable`, 6 commits séquencés

**Correction d'une inexactitude de l'entrée précédente :** celle-ci affirmait le point `FROM_EMAIL` "déjà committé (`efc7eff`)" — faux, vérifié dans cette session (`git log`/`git show HEAD` sur le fichier) : `efc7eff` contenait toujours l'ancienne adresse `onboarding@resend.dev`, le changement vers `reservations@sublimnet.com` n'avait été que déployé sur Supabase, jamais committé dans le repo. Corrigé et committé dans cette session (voir plus bas) — signalé ici plutôt que de réécrire l'entrée existante (règle append-only de ce fichier).

**1. Bandeau de consentement cookies (Consent Mode GA4).** Le point ouvert de l'entrée précédente traité. `CookieConsent.jsx` créé : bandeau bas de page, boutons "Accepter"/"Refuser" à poids visuel égal (pas de dark pattern), choix mémorisé en `localStorage`, rouvrable via un nouveau lien "Gérer les cookies" dans `Footer.jsx`. Mécanisme retenu : **Google Consent Mode** (`gtag('consent','default',{analytics_storage:'denied'})` posé dans `index.html` avant tout autre appel `gtag`) plutôt qu'un chargement conditionnel du script — GA4 reste chargé mais ne pose aucun cookie de mesure tant que le consentement n'est pas accordé, recommandation officielle Google pour ce cas de figure. Bug trouvé et corrigé avant validation : le bandeau chevauchait la barre sticky WhatsApp/Appeler sur mobile (49px de recouvrement mesuré) — corrigé via une media query dédiée dans `App.css`, revérifié à 0px de chevauchement. `ConfidentialitePage.jsx` mis à jour en conséquence.

**2. Fiabilisation de l'envoi GA4 sur SPA — bug réel trouvé par test réseau, pas par lecture de code.** Sur demande explicite de vérification concrète (pas seulement "le code a l'air bon"), interception réelle des requêtes `/g/collect` via Playwright en naviguant `/` → `/services` → `/reservation` → `/contact`. Résultat : chaque page reçoit bien exactement un `page_view` avec la bonne URL, **mais `gtag.js` l'envoie avec un décalage d'une navigation** (le `page_view` de la page N n'est transmis qu'au moment de naviguer vers la page N+1) — comportement de mise en batch propre à `gtag.js`, pas un bug de ce site. Testé aussi la fermeture d'onglet : aucune requête de rattrapage capturée pour la dernière page visitée, mais le test ne reproduit pas fidèlement le comportement réel d'un navigateur (limite de Playwright reconnue explicitement, pas présentée comme une certitude). Correctif appliqué par précaution : `transport_type: 'beacon'` ajouté à l'événement `page_view` dans `analytics.js` (recommandation officielle Google pour fiabiliser l'envoi sur SPA, y compris à la fermeture d'onglet).

**3. Audit technique `$impeccable audit` — première utilisation de ce skill sur ce projet.** Le skill exigeant un `PRODUCT.md` inexistant, rédigé à partir de ce qui était déjà connu (`CLAUDE.md` + historique de session) plutôt que de faire passer l'utilisatrice par l'interview complète — un seul point réellement ouvert posé (niveau d'accessibilité visé : WCAG 2.1 AA retenu).
- **Scan réel** (axe-core via Playwright sur les 5 pages, pas une estimation) : **zéro écart structurel** (ARIA, labels, hiérarchie de titres, landmarks) — fondations solides. **Écart systémique de contraste** en revanche : 8 à 12 nœuds en échec par page, cause racine dans 4 endroits (texte du footer en `rgba` faible, bouton WhatsApp texte blanc sur vert, token `C.sand` sous-contrasté partout où utilisé comme texte, lien "Nous écrire →" vert clair sur blanc).
- Responsive : zéro débordement horizontal vérifié sur les 5 pages en 375px. Une cible tactile sous la norme trouvée ("Gérer les cookies", 20px de haut).
- Anti-patterns : pattern "ghost-card" (bordure 1px + ombre ≥16px au survol) trouvé sur 11 cartes, hérité du template, antérieur à cette session. Gradient-text trouvé dans le template d'email de confirmation (hors périmètre "site" mais signalé — risque réel de rendu cassé dans les clients email qui ne supportent pas `background-clip:text`). Logo vérifié correctement implémenté en image statique (pas de gradient CSS), donc non retenu comme écart.
- **Score : 13/20 (Acceptable)** — 0 P0, 1 P1, 6 P2, 2 P3. Rapport complet montré avant toute correction, comme convenu pour toute la session.

**4. Trois corrections appliquées et vérifiées (colorize, adapt, harden) :**
- **Colorize** : les 4 écarts demandés corrigés + le lien "Réalisé par Flōw Agency" (ratio 4.27, trouvé dans le scan brut mais pas repris isolément dans le rapport initial — ajouté par cohérence, même fichier, même cause). `C.sand` assombri directement dans `tokens.js` (`#8B98A5` → `#5D6E7D`) plutôt que de contourner au cas par cas, puisque ce token n'est utilisé qu'en texte partout dans le repo. Vérifié par re-scan axe-core : 0 violation sur 4 pages/5 (3 nœuds restants sur Services = P3 déjà identifié séparément, non traité ici).
- **Adapt** : cible tactile "Gérer les cookies" portée à 44px via `padding`/`margin` négatif égal (technique qui agrandit la zone cliquable sans changer l'apparence visuelle du lien) — vérifié 50.4px, rendu identique confirmé par capture desktop.
- **Harden** : `role="dialog"` du bandeau cookies remplacé par `role="region"` + libellé "Préférences de cookies" — l'ancien rôle annonçait un comportement modal (piège de focus, fermeture Échap) que le composant n'implémente pas ; option "honnête" retenue explicitement plutôt que d'ajouter ce comportement, jugé disproportionné pour ce composant. Vérifié : 0 violation axe-core avec le bandeau réellement affiché (les scans précédents avaient tous le consentement déjà accordé, donc le bandeau masqué — testé pour de vrai cette fois).

**5. Séquençage en 6 commits séparés, sur demande explicite (pas de commit groupé).** `Footer.jsx` et `CookieConsent.jsx` portant des changements empilés dans le temps (fonctionnalité d'origine + corrections d'audit), chaque état intermédiaire a été reconstruit à la main (édition temporaire → commit → réapplication) pour que chaque commit ne contienne exactement que ce que son message annonce. Liste finale, poussée dans l'ordre :
1. `d7ff512` — Bandeau de consentement cookies (Consent Mode GA4)
2. `db53440` — Fiabilisation `transport_type: beacon`
3. `7864c57` — Colorize (5 écarts de contraste)
4. `456ffa5` — Adapt (cible tactile 44px)
5. `1eb1072` — Harden (rôle ARIA du bandeau)
6. `f4e0320` — Adresse d'envoi Resend `reservations@sublimnet.com` (correction du retard de commit signalé en tête d'entrée)

**État git en fin de session :** tout committé et pushé. Restent non suivis : `PRODUCT.md` (nouveau, créé pour `$impeccable`, pas demandé pour commit) et `src/IMG_9724.jpeg` (toujours exclu).

**Points ouverts :**
- Ghost-card pattern (11 cartes) et gradient-text de l'email de confirmation — identifiés dans l'audit, volontairement reportés par l'utilisatrice à après confirmation de la progression du score.
- Retour du frère de l'utilisatrice sur son test de réservation — toujours en attente.

---

## 2026-08-07 — Gradient-text email corrigé, logo GMB fond noir, contenu fiche GMB, audit sécurité RLS

**1. Gradient-text de l'email de confirmation corrigé (commit `9bfb2e4`).** Dernier point ouvert de l'audit `impeccable` traité, sur demande explicite. `background-clip:text` (non fiable dans plusieurs messageries, notamment Outlook) remplacé par `color:#7F4997` (violet plein) sur le titre "Réservation confirmée — Sublim Net" dans `supabase/functions/send-booking-confirmation/index.ts`. Redéployé sur Supabase par l'utilisatrice (Via Editor, confirmé "success"), puis committé.

**2. Logo GMB fond noir — diagnostic en plusieurs étapes, une fausse piste corrigée en cours de route.**
- Nouveau fichier fourni par l'utilisatrice (`src/images/logo-original.webp`, export Higgsfield) suite à une plainte sur des bords "pas nets, en pointillés" du pictogramme existant (`badge-mascotte.png`). Comparaison zoomée directe : confirmé, l'ancien fichier a des bords crénelés/pixelisés réels ; le nouveau fichier a des bords lisses — le nouveau fichier est bien meilleur.
- **Découverte technique en cours de traitement :** le damier gris/blanc visible sur `logo-original.webp` n'est **pas une vraie transparence** — c'est un motif incrusté dans les pixels de l'image elle-même (export non nettoyé depuis Higgsfield). Confirmé en inspectant les valeurs alpha réelles (toutes à 255, donc opaques) plutôt que de faire confiance au rendu visuel du damier. Détourage refait proprement par flood-fill (identification des pixels gris/blancs connectés au bord de l'image, converti en transparence réelle) plutôt qu'un simple keying par couleur.
- **Fausse piste explorée et abandonnée :** le flood-fill initial semblait "manger" des détails (phare, poignée du pistolet) — plusieurs tentatives de correction par érosion/dilatation morphologique, dont une a empiré les choses (fenêtre de la voiture disparue par erreur). Comparaison finale avec le fichier source brut : ces zones sont en réalité des **découpes volontaires du design d'origine** (reflets stylisés), pas un bug de traitement — la toute première version du détourage (flood-fill simple, sans érosion) était déjà correcte. Temps perdu à corriger un problème qui n'existait pas ; leçon retenue : comparer systématiquement au fichier source brut avant de conclure à un bug de traitement.
- **Résultat final retenu :** `src/images/badge-mascotte-gmb-fond-noir-v2.png` (1024×1024, fond noir plein, marge de 18% autour de l'anneau pour ne pas être coupé par le rognage circulaire de Google) — validé par l'utilisatrice. Fichiers intermédiaires ratés supprimés (`logo-original-full.png`, `logo-original-cutout-v2/v3.png`, `badge-mascotte-gmb-fond-noir-v3/v4.png`). Fichiers conservés : `logo-original.webp` (source), `logo-original-cutout.png` (détourage transparent propre), `badge-mascotte-gmb-fond-noir-v2.png` (version finale fond noir). Fichiers locaux uniquement, non committés (pas nécessaires au site, usage GMB externe).

**3. Contenu de fiche Google Business Profile préparé.** `gmb-content.md` créé et publié en Artifact pour consultation facile côté utilisatrice : catégories (principale + secondaires), description (650/750 caractères), liste de services, 6 questions/réponses reprises mot pour mot de la FAQ du site (cohérence), rappel de configurer en "établissement de type service" (pas d'adresse publique). Deux points laissés à la décision explicite de l'utilisatrice plutôt que tranchés à sa place : représentation des horaires (créneaux fixes vs plage continue), et split ou non de la catégorie "canapé/matelas" selon ce que propose le sélecteur Google.

**Vérification vidéo GMB refusée par Google ("No view of surrounding area") — conseils donnés (aucune action de mon côté, hors périmètre technique) :** filmer en un seul plan continu, panneau de rue visible, numéro du bâtiment, alentours (bâtiments voisins), puis le camion floqué et le matériel sur place comme preuve d'activité.

**4. Audit de sécurité RLS/GRANT sur `creneaux`, `creneaux_dispo`, `email_failures` — aucun accès direct à la base de mon côté, méthodologie par requêtes fournies à l'utilisatrice.**
- Faute d'outil Supabase connecté dans cet environnement, vérification en 4 requêtes SQL exécutées par l'utilisatrice (rôle `postgres`, SQL Editor) et résultats relus : statut RLS (`pg_class.relrowsecurity`), policies existantes (`pg_policies`), GRANTs du rôle `anon` (`information_schema.role_table_grants`), et structure exacte de la vue `creneaux_dispo` (`information_schema.columns`) — cette dernière ajoutée pour ne pas se contenter de la documentation passée (JOURNAL) et vérifier la réalité actuelle.
- **Verdict : aucune faille exploitable.** RLS actif sur `creneaux` et `email_failures` ; une seule policy dans toute la base (`INSERT` sur `creneaux` pour `anon`) ; aucun `SELECT`/`UPDATE`/`DELETE` accordé à `anon` sur `creneaux` (donc lecture/modification/suppression des réservations d'autrui impossibles via l'API standard) ; `creneaux_dispo` confirmé n'exposer que `date_creneau`/`heure` (aucune donnée personnelle) ; `email_failures` sans policy et sans GRANT pour `anon` (refus par défaut Postgres).
- **Seul point trouvé (P3, hygiène, pas une faille) :** `TRUNCATE`/`TRIGGER`/`REFERENCES` accordés à `anon` sur les 3 tables sans usage réel — non exploitables via l'API REST Supabase (PostgREST n'expose pas ces opérations), mais retirés par principe de moindre privilège :
```sql
revoke truncate, trigger, references on public.creneaux, public.creneaux_dispo, public.email_failures from anon;
```
Exécuté avec succès par l'utilisatrice (`Success. No rows returned`).

**État git :** `9bfb2e4` (gradient-text email) committé et poussé. Rien d'autre à committer côté audit sécurité (changement fait directement en base, pas dans le repo).

**Points ouverts :**
- Ghost-card pattern (11 cartes) — toujours volontairement reporté.
- Retour du frère de l'utilisatrice sur son test de réservation — toujours en attente.
- Vérification vidéo GMB à refaire par l'utilisatrice suite au premier refus.
- `$impeccable ai-seo` proposé pour la suite, pas encore commencé.

---

## 2026-08-08 — Détail Auto Express/Confort, avancée GMB, découverte fiche "SublimNet" existante, ghost-card corrigé, refonte CLAUDE.md

**1. Détail des prestations Auto Express/Confort ajouté (commit `451cdac`).** Demande client : lister le contenu exact de ces deux formules (fourni par le client, voir `CLAUDE.md`). Structure existante vérifiée avant implémentation (tableau de prix + `desc` une ligne, aucun niveau de détail). Écarté volontairement : liste dépliable (risque d'interaction bancale avec le scroll horizontal du tableau sur mobile) et tooltip (peu fiable au tactile). Retenu : deux cartes statiques sous le tableau, réutilisant le pattern `CheckIcon` déjà utilisé sur Devis Tapis — aucune nouvelle convention visuelle introduite. Champ `details[]` ajouté sur les entrées `express`/`confort` de `AUTO_FORMULES` (`pricing.js`) ; rendu conditionnel (`filter(f => f.details)`) donc les 3 autres formules n'affichent aucune carte. Phrase d'intro ajoutée sur demande explicite pour rattacher visuellement les formules combinées (Extérieur + Express/Confort) à ce détail. Vérifié desktop + mobile, tableau de prix inchangé.

**2. Avancée sur la fiche Google Business Profile — guidage pas à pas, plusieurs itérations.**
- Catégories retenues après plusieurs essais infructueux ("nettoyage voiture" non reconnu par le sélecteur GMB) : **Car wash** (principale — "detailing" essayé mais pas concluant, gardé Car wash faute de mieux trouvé), **Carpet cleaning service** (tapis), **Upholstery cleaning service** (canapé/sièges, trouvé via recherche en anglais après échec en français). "Self service car wash" explicitement écarté — ne correspond pas au modèle de Sublim Net (Kenzo intervient lui-même, ce n'est pas une station en libre-service).
- Description rédigée avec un focus SEO local explicite : ville + service dans la première phrase, les 5 villes de la zone citées nommément (chacune = requête de recherche potentielle), un mot-clé dédié par service plutôt qu'une liste vague. Premier essai refusé par Google ("A URL is not allowed here") à cause de la mention `sublimnet.com` dans le texte — corrigé en retirant la mention d'URL (le site web a son propre champ dédié).

**3. Découverte importante : une fiche Google "SublimNet" est déjà active, potentiellement liée à Kenzo.** En cherchant "SublimNet" sur Google pour un autre motif, l'utilisatrice tombe sur une fiche déjà existante : **5,0★, 6 avis réels, et surtout le vrai numéro de téléphone de Kenzo (07 79 72 60 76)** — donc pas une usurpation par un tiers, un lien réel avec lui. Cette fiche pointe vers un site actif `sublimnet.fr`, sous une identité visuelle différente ("Pro Clean"), proposant le même type de service (nettoyage auto + mobilier à domicile, Bordeaux). Investigation menée avant de conclure quoi que ce soit : tentative de charger `sublimnet.fr` directement (échec technique, erreur SSL — site probablement mal configuré), recherche du nom "Pro Clean" (résultat non concluant, entreprise parisienne sans rapport trouvée par la recherche générique). Capture d'écran de l'utilisatrice fournissant la preuve directe (téléphone identique, page d'accueil `sublimnet.fr` affichant "PROCLEAN — La propreté roule avec nous", zone "Bordeaux et sa métropole").
- **Anomalie relevée à faire vérifier** : la page d'accueil de `sublimnet.fr` affiche "4,9/5 • 150+ avis Google", alors que la vraie fiche Google Maps n'en montre que 6 — signature typique d'un texte de template jamais personnalisé avec les vrais chiffres. À ne surtout pas reprendre tel quel si ce n'est pas confirmé réel (règle stricte du projet : jamais de faux avis affiché).
- **Message rédigé et transmis par l'utilisatrice à Kenzo** : demande si `sublimnet.fr`/"Pro Clean" est une ancienne identité à lui (avant le rebranding "Sublim Net" au camion floqué), et d'où vient le chiffre "150+ avis". **Travail sur la fiche GMB mis en pause en attendant sa réponse** — créer une deuxième fiche en parallèle avant de savoir violerait les règles Google sur les doublons (risque de fusion forcée ou de suspension, avec perte des 6 avis déjà acquis si la fiche est bien la sienne).

**4. Ghost-card corrigé sur les 11 cartes concernées (`$impeccable polish`, commit `c178270`).** Dernier point ouvert de l'audit `impeccable` traité. Deux options déjà évaluées lors de l'audit : retirer la bordure et garder l'ombre seule, ou garder la bordure et resserrer l'ombre. **Bordure conservée** — les fonds `C.bg`/`C.bgAlt` du site sont proches en teinte, la bordure sert à délimiter les cartes au repos (pas seulement au survol), la retirer aurait nui à la lisibilité de la grille la plupart du temps. Ombre au survol resserrée de 24-64px à 8px de flou maximum sur `.flow-card` et `.flow-card-cta` (`App.css`). Vérifié par capture Playwright en survol réel (pas juste en lisant le CSS) sur Accueil et Avis&Contact, zéro erreur console.

**5. Révision complète de `CLAUDE.md`, sur demande explicite, pour corriger toutes les dérives accumulées.** Plusieurs lignes étaient devenues fausses au fil des sessions sans jamais être corrigées :
- Domaine : "à confirmer par l'utilisatrice" retiré (confirmé depuis longtemps, site en ligne et testé).
- GA4 : mention "pas de bandeau de consentement" retirée (le bandeau existe depuis la session du bandeau cookies) ; renvoi ajouté vers le point ouvert réel (tracking d'événements de conversion, pas encore fait).
- Base de données : la ligne affirmait encore "une seule table `creneaux`, pas d'autre table" — **faux** depuis la création d'`email_failures`. Corrigé, vue `creneaux_dispo` mentionnée aussi.
- Grille tarifaire : détail des formules Express/Confort ajouté (contenu confirmé par le client, cohérent avec le point 1 ci-dessus).
- "Ce qui n'existe pas encore" : mention GMB remplacée par le statut réel incertain (fiche potentiellement déjà existante, voir point 3) ; deux lignes obsolètes supprimées ("aucune propriété GA4 créée" et "domaine pas vérifié dans Resend" — toutes deux résolues et déjà correctement documentées ailleurs dans le fichier, ces lignes n'étaient plus que des doublons faux).

**État git en fin de session :** `451cdac` et `c178270` committés et poussés. `CLAUDE.md` modifié mais pas encore committé au moment de rédiger cette entrée — à committer avec elle.

**Points ouverts :**
- Réponse de Kenzo sur `sublimnet.fr`/"Pro Clean" et le "150+ avis" — bloquant pour la suite du travail GMB.
- Fichiers non suivis à traiter plus tard (signalé par l'utilisatrice, pas oublié) : `canape-4-avant/apres.jpg` (nouvelle paire avant/après à intégrer à la galerie), `gla-dalle-apres.html` + dossier associé (probable enregistrement de page par erreur, à confirmer avant suppression), `83565EF6-....png` (contenu non identifié).
- Retour du frère de l'utilisatrice sur son test de réservation — toujours en attente.
- `$impeccable ai-seo` — toujours pas commencé.

---

## 2026-08-09/10 — Ajout galerie Canapé/Tapis, diagnostic et correction du cadrage cassé

**1. Deux nouvelles paires avant/après intégrées à la galerie Services (commit `8c4fdc0`, session précédente à cette entrée).** `canape-4-avant/apres.jpg` (3ᵉ couple Canapé) et `g-la-dalle-avnt/apres.jpg` (1ère paire Tapis, jamais illustrée jusqu'ici — deux tapis d'entrée d'un commerce, "G LA DALLE", filmés dans un parking souterrain ; labellisés génériquement "Tapis d'entrée" côté site, sans nom de l'enseigne cliente). `gla-dalle-apres.html` et son dossier `_files/` (artefact de téléchargement GMB) supprimés par l'utilisatrice, `83565EF6-....png` identifié et renommé en `logo-fond-noir.png` de son côté — aucune action de ma part sur ces deux points.

**2. Signalement d'un cadrage cassé sur les 2 nouvelles paires — diagnostic demandé avant toute correction.** Consigne explicite de l'utilisatrice : ne rien corriger avant confirmation de la cause (CSS vs photo source), pour éviter un recadrage qui masquerait le vrai problème sans le résoudre. Diagnostic mené par mesure réelle (script Playwright comparant `naturalWidth/Height` de chaque `<img>` à sa boîte rendue, calcul du % réellement visible avec la formule `object-fit:cover`) plutôt que par inspection visuelle seule.
- **Cause identifiée pour Canapé** : le script de génération du collage (`New-Collage`, PowerShell/System.Drawing) gardait la largeur naturelle complète de chaque moitié avant/après, produisant un ratio 3,56 très éloigné du ratio 1,69 de la case d'affichage — seulement 47% de la largeur du canapé visible, contre ~100% pour les autres collages du site (ratio ~1,14-1,32, convention établie).
- **Cause identifiée pour Tapis, plus grave et jusque-là inconnue** : CSS Grid (`repeat(auto-fit, minmax(340px, 1fr))`) étire un item seul dans sa ligne sur toute la largeur disponible. Comme Tapis (et Matelas, déjà silencieusement affecté sans jamais avoir été signalé) n'a qu'une seule paire de photos, sa case passait de ~371px à 1152px de large — écrasant la hauteur affichée à seulement 25% (Tapis) et 36% (Matelas) de la photo.

**3. Décision utilisatrice après explication des deux causes : corriger uniquement le collage Canapé dans un premier temps ("point 1 uniquement"), pas le bug de grille — pour ne pas risquer d'impacter Matelas qui n'avait pas été signalé comme cassé.**
- Nouveau script (`New-CollageCropped`) : recadrage centré de la largeur de chaque photo source (1373px → 1001px) avant composition, ramenant le ratio du collage de 3,56 à 2,60 — compromis délibéré (viser exactement 1,69 aurait nécessité de rogner ~44% de chaque photo, risque de perdre l'accoudoir/coin du canapé visible) donnant 65% de largeur visible en test initial.
- **Tentative de vérification bloquée par un faux positif** : le script de mesure Playwright renvoyait `natural:0x0` pour toutes les images (pas seulement la nouvelle), y compris les anciennes connues comme correctes. Cause réelle trouvée après investigation : `loading="lazy"` sur les `<img>` — le script naviguait puis mesurait sans jamais scroller la page, donc aucune image (pas seulement la nouvelle) n'avait encore été chargée par le navigateur au moment de la mesure. Corrigé en ajoutant un scroll programmatique complet avant lecture ; confirmé ensuite que le fichier régénéré se chargeait normalement (200, chargement direct vérifié).

**4. Après re-mesure propre, nouvelle photo de tapis inspectée avant de tenter un recadrage similaire à Canapé — complication réelle identifiée et remontée à l'utilisatrice avant d'agir.** La photo source Tapis est un portrait très haut (1373×2441), le tapis n'occupant que la moitié basse du cadre. Pour remplir une case étirée à 5,24 de ratio (bug de grille point 3), il aurait fallu ne garder qu'une bande horizontale de ~11% de la hauteur source — insuffisant pour montrer le logo de l'enseigne ou le contexte, pire que l'état déjà cassé. Contrairement à Canapé (photos larges, juste besoin de resserrer), la géométrie ne permettait aucun compromis raisonnable en gardant l'approche "collage seul". **Question reposée à l'utilisatrice, qui choisit cette fois de traiter aussi le bug de grille.**

**5. Bug de grille corrigé (`ServicesPage.jsx`, commit `3cf5c22`) : `minmax(340px, 1fr)` → `minmax(340px, 400px)` + `justifyContent: 'center'`.** Plafonne la largeur max de chaque carte (aucun changement visuel pour les lignes à plusieurs items, la largeur naturelle ~371-400px restant sous le plafond) tout en empêchant un item seul de s'étirer ; centré plutôt que collé à gauche pour rester visuellement propre en solo. Résultat mesuré après correction : Tapis 25% → 73% de hauteur visible (badges Avant/Après désormais visibles, invisibles avant car hors du cadre coupé), Matelas 36% → 100%, Canapé 4 65% → 70% (la case elle-même s'est élargie de 371 à 400px suite au changement de plafond, bénéfice secondaire). Vérifié par capture d'écran réelle sur les 3 catégories, pas seulement par les chiffres.

**État git en fin de session :** `4a7c68f` (recadrage collage Canapé 4) et `3cf5c22` (fix grille) committés et poussés, dans cet ordre. Cette entrée de journal committée avec eux. `CLAUDE.md` non modifié — aucune règle métier n'a changé, uniquement un bug d'affichage.

**Points ouverts (inchangés) :**
- Réponse de Kenzo sur `sublimnet.fr`/"Pro Clean" et le "150+ avis" — toujours bloquant pour la suite du travail GMB.
- Retour du frère de l'utilisatrice sur son test de réservation — vérification en cours au moment de clore cette session.
- `$impeccable ai-seo` — toujours pas commencé.

---

## 2026-08-11 — Ghost-card déjà traité, refonte complète de CLAUDE.md, déblocage GMB (doublon résolu, accès obtenu)

**1. `$impeccable polish` sur le pattern ghost-card — déjà résolu, aucune action nécessaire.** Demande explicite de traiter les 11 cartes (`.flow-card`/`.flow-card-cta`, `App.css:117-131`), mais vérification du fichier et de l'historique git montre que c'est déjà fait, commit `c178270` du 2026-08-09 : ombre au survol resserrée à `0 4px 8px`, bordure fine conservée. Signalé à l'utilisatrice plutôt que de réappliquer un changement déjà en place.

**2. Refonte complète de `CLAUDE.md` demandée par l'utilisatrice pour assurer la continuité entre sessions (commit `aa5d59b`).** Trois ajouts structurels : section "État actuel du projet" (récap fonctionnel en tête de fichier), section "GMB — Google My Business" dédiée, section "TODO — prochaine session". Deux écarts relevés entre le texte fourni et l'état réel avant d'écrire quoi que ce soit :
- **TODO "cadrage galerie" retiré** — déjà corrigé et journalisé dans cette même session (voir entrée précédente, commits `4a7c68f`/`3cf5c22`/`e3248ca`) ; l'ajouter en TODO aurait réintroduit une information fausse.
- **Mention WhatsApp "décision confirmée par Kenzo"** — aucune trace de cette confirmation dans le journal (dernier état connu : indécis). Question posée avant d'écrire quoi que ce soit dans un fichier de mémoire métier ; l'utilisatrice confirme que Kenzo a bien validé de le garder.
- Contenu vérifié techniquement avant écriture plutôt que recopié tel quel : présence du Schema.org `["LocalBusiness", "HomeAndConstructionBusiness"]` confirmée dans `public/index.html`, validation Google Rich Results Test et succès de bout en bout du système de réservation/email confirmés via relecture de `JOURNAL.md` (entrées du 2026-08-03 et 2026-08-06).

**3. Déblocage majeur sur Google Business Profile — la fiche préexistante identifiée en session précédente (voir entrée du 2026-08-08) est maintenant sous contrôle.** Travail effectué par l'utilisatrice directement dans l'interface Google (aucune action de code) :
- **Cause du rejet de vérification vidéo enfin comprise avec certitude** : ce n'était pas seulement une fiche préexistante en cause, mais un vrai doublon — une deuxième fiche vide (sans avis) créée en parallèle de l'originale (6 avis, 5,0★). La demande de vérification vidéo en cours sous `sublimnet33@gmail.com` (qui aurait créé un 3ᵉ doublon) a été annulée.
- Doublon vide supprimé/fusionné — seule la fiche originale avec les 6 avis subsiste.
- `sublimnet33@gmail.com` ajouté comme **Administrateur** sur la bonne fiche (propriétaire principal inchangé : `lapeste7710@gmail.com`, désormais confirmé en entier — la mention partielle "lapeste77..." de la session précédente est corrigée dans `CLAUDE.md`). Invitation acceptée, accès confirmé.
- **Mise à jour du contenu de la fiche entamée mais pas terminée** : téléphone déjà correct, site web encore sur l'ancien lien (à changer vers `sublimnet.com`), horaires actuellement faux ("Ouvert 24h/24", à remplacer par les vrais créneaux), catégorie d'activité en cours de sélection, description encore générique ("Service de nettoyage et d'entretien", à réécrire dans le ton du site). Documenté en détail dans la nouvelle section "GMB" de `CLAUDE.md` pour ne pas reperdre le fil.

**État git en fin de session :** `aa5d59b` (refonte CLAUDE.md) déjà committé et poussé avant l'avancée GMB ; cette entrée de journal + la mise à jour de la section GMB de `CLAUDE.md` (doublon résolu, accès obtenu) à committer ensemble.

**Points ouverts :**
- GMB : finaliser site web / horaires / catégorie / description sur la fiche (voir `CLAUDE.md`).
- Réponse de Kenzo sur `sublimnet.fr`/"Pro Clean" et le "150+ avis" — toujours pas reçue à ce jour, question devenue moins urgente maintenant que l'accès à la vraie fiche est obtenu, mais toujours ouverte.
- Retour du frère de l'utilisatrice sur son test de réservation — toujours en attente.
- `$impeccable ai-seo` — toujours pas commencé.

---

## 2026-08-11 (suite) — areaServed aligné sur GMB, tracking GA4 des conversions sur le tunnel de réservation

**1. `areaServed` du schema.org LocalBusiness aligné sur la zone GMB (commit `34f2892`).** La fiche GMB (plus à jour, 14 communes + le quartier Bordeaux-Lac) couvrait davantage que le schema du site (5 villes seulement : Talence, Bordeaux, Pessac, Gradignan, Bègles). Écart de comptage relevé avant modification : la liste fournie par l'utilisatrice contenait 10 noms, pas 9 comme annoncé (14 villes) — écart expliqué par Bordeaux-Lac, quartier de Bordeaux et non une commune distincte. Question posée avant d'écrire quoi que ce soit : Bordeaux-Lac inclus quand même comme entrée `City` séparée, sur choix explicite de l'utilisatrice, au prix d'une légère imprécision administrative (assumée, cohérence avec l'affichage GMB jugée prioritaire). 10 villes ajoutées : Cenon, Bruges, Cestas, Lormont, Eysines, Mérignac, Le Haillan, Le Pian-Médoc, Le Taillan-Médoc, Bordeaux-Lac — 15 entrées au total désormais dans `areaServed`.

**2. Tracking GA4 des événements de conversion sur le tunnel de réservation (commit `8b1ce48`).** Dernier point ouvert du chantier GA4 (voir CLAUDE.md, ligne "reste à faire" retirée). Demande initiale de l'utilisatrice explicitement structurée en 3 temps : proposer la liste des événements/paramètres pour validation *avant* le code, implémenter et vérifier *après* validation, journaliser seulement une fois le test de vérification passé — séquence strictement respectée.

**Événements créés, tous dans `src/pages/ReservationPage.jsx`, via la fonction `trackEvent()` déjà existante dans `src/analytics.js`** (aucun nouveau fichier, aucune modification d'`analytics.js`) :

| Événement | Déclencheur | Paramètres |
|---|---|---|
| `service_selected` | Clic carte catégorie (Auto/Canapé/Matelas) | `{ service }` |
| `service_selected` | Clic carte Formule Auto | `{ service: "auto", formule }` |
| `service_selected` | Clic carte "Phares seuls" (1/2 phares) | `{ service: "auto", formule }` |
| `service_selected` | Clic carte taille Canapé/Matelas | `{ service, formule }` |
| `booking_started` | 1ère fois que `serviceInfo` devient valide (transition null → non-null) | `{ service, formule }` |
| `booking_error` | Clic "Confirmer" avec un champ requis vide | `{ error_type: "champs_manquants" }` |
| `booking_error` | Créneau pris entre-temps (`createBooking` renvoie `ok:false`) | `{ error_type: "creneau_indisponible" }` |
| `booking_error` | Exception réseau/Supabase (bloc `catch`) | `{ error_type: "erreur_serveur" }` |
| `booking_completed` | `createBooking` réussit | `{ service, formule, value, currency: "EUR" }` |

`formule` utilise partout un identifiant court (`"express"`, `"canape2"`, `"phare1"`...), pas le libellé complet affiché à l'écran — un champ interne `formuleSlug` a été ajouté dans `getServiceInfo()` spécifiquement pour ça, sans toucher au champ `formule` existant (libellé complet, utilisé dans le récapitulatif affiché et envoyé tel quel à Supabase). `value` sur `booking_completed` reprend la variable `total` déjà utilisée dans l'affichage du récapitulatif (`serviceInfo.total + geo.frais`) — proposé en plus de la demande initiale (format standard GA4 pour le reporting de revenu sur les conversions), validé par l'utilisatrice avant implémentation.

**Deux points soumis à validation avant d'écrire le code** (conformément à la demande) :
- Un bug UX préexistant découvert en creusant `handleSubmit` : le bouton "Confirmer" (`Btn`, `type="button"`) ne déclenche jamais la validation HTML5 native (`required`), donc un champ vide ne produit aujourd'hui aucun message visible — juste un `return` silencieux. Décision de l'utilisatrice : tracker `booking_error` tel quel sans changer ce comportement (le fix visuel reste un chantier à part, non traité ici).
- Ajout de `value`/`currency` sur `booking_completed` — validé.

**Vérification réelle avant implémentation en dur — obstacle technique inattendu et méthode de contournement propre.** Tentative de vérifier les 4 événements par interception réseau des requêtes vers `google-analytics.com/g/collect` (méthode utilisée avec succès dans une session précédente pour le fix `transport_type: beacon`) : zéro requête interceptée, y compris pour le `page_view` de base déjà confirmé fonctionnel en production. Diagnostic : `curl` brut réussit sans problème vers ce domaine (HTTP 204), mais **tout navigateur piloté par Playwright sur cette machine** (testé sur Edge ET sur le Chromium natif de Playwright, deux binaires différents, même résultat) bloque systématiquement ces requêtes en `ERR_ABORTED`, alors que `googletagmanager.com` (le script `gtag.js` lui-même) charge normalement. Signature typique d'une politique de blocage des domaines de tracking au niveau de la machine Windows (registre), indépendante du choix de navigateur — pas un bug du site, pas un problème réseau général. Aucune tentative de contournement de cette protection.
- **Méthode de vérification retenue à la place : lecture directe de `window.dataLayer`** (Playwright), qui capture l'appel `gtag('event', ...)` réel émis par le code, avec le nom d'événement et les paramètres exacts, sans dépendre de la requête réseau sortante. Deux scripts de test exécutés : le parcours Canapé complet (catégorie → taille → adresse réelle géocodée via Nominatim → créneau → soumission), avec l'appel Supabase intercepté et simulé (409 conflit puis 201 succès, pour tester `booking_error`/`booking_completed` **sans écrire de vraie ligne dans la table `creneaux` ni déclencher de vrais emails vers Kenzo**) ; puis un second passage ciblé sur les branches Auto (formule Express, "1 phare") et Matelas, non couvertes par le premier scénario. **8 déclenchements testés au total, tous conformes** (voir tableau ci-dessus) — y compris le cas où `booking_started` se redéclenche correctement après un changement de mode (formule complète → phares seuls), la remise à zéro de `slot` après un échec de créneau, et l'absence d'événement superflu sur les interactions non concernées (choix du gabarit, bascule de mode, remplissage des champs texte).
- Question explicitement reposée à l'utilisatrice avant de journaliser, conformément à sa consigne ("Ne journalise qu'une fois le test de vérification passé") : la preuve `dataLayer` suffit-elle, ou faut-il attendre une vérification GA4 DebugView réelle de sa part ? Réponse : preuve `dataLayer` jugée suffisante (même mécanisme `gtag()` que le `page_view` déjà confirmé fonctionnel en production).
- Avant validation finale du commit, l'utilisatrice a demandé deux clarifications techniques supplémentaires, répondues avant de committer : le `useEffect` de `booking_started` sans tableau de dépendances est volontaire (un tableau `[serviceInfo]` n'aurait aucun effet, l'objet étant recréé à chaque render — la garde par `ref` est le mécanisme réel de dédoublonnage) ; la variable `total` utilisée dans `value` est bien la même que celle affichée dans le récapitulatif à l'écran, non une valeur intermédiaire.

**État git en fin de session :** `34f2892` (areaServed) et `8b1ce48` (tracking GA4) committés et poussés séparément. Cette entrée de journal + la mise à jour de `CLAUDE.md` (retrait de la ligne GA4 "pas encore fait", ajout en "État actuel" et "TODO") à committer avec elle.

**Points ouverts :**
- Marquer `booking_completed` comme conversion dans l'interface GA4 (Admin → Événements), possible seulement une fois les événements remontés au moins une fois en production — pas une action de code, à faire par l'utilisatrice ou Kenzo.
- GMB : finaliser site web / horaires / catégorie / description sur la fiche (voir `CLAUDE.md`).
- Bug UX du bouton "Confirmer" sans validation HTML5 native — signalé, volontairement non corrigé cette session.
- Réponse de Kenzo sur `sublimnet.fr`/"Pro Clean" et le "150+ avis" — toujours en attente.
- Retour du frère de l'utilisatrice sur son test de réservation — toujours en attente.
- `$impeccable ai-seo` — toujours pas commencé.

---

## 2026-08-11 (suite 2) — Affichage de la note Google (5,0★, 6 avis) et aggregateRating schema.org

**Contexte : la fiche GMB étant désormais confirmée et reprise en main (voir plus haut), la règle stricte "jamais de note affichée" de `CLAUDE.md` ne s'appliquait plus** — elle visait à empêcher d'afficher une note incertaine ou non contrôlée, pas à interdire d'afficher une vraie note une fois la fiche vérifiée. Demande de l'utilisatrice : afficher badge de confiance uniquement (note + nombre d'avis + lien), pas le contenu détaillé des avis, ton direct sans superlatif ("Ils nous font confiance" plutôt qu'un badge marketing).

**1. Lien vers la fiche Google — vérification en deux temps avant utilisation.** Premier lien fourni par l'utilisatrice (une URL de résultat de recherche Google avec paramètres de session `stick=`/`mat=`/`ved=`) testé via `WebFetch` : redirection vers `consent.google.com` avant d'atteindre la fiche, format jugé pas assez stable pour être codé en dur sur une page publique (paramètres potentiellement éphémères). Recommandation faite à l'utilisatrice de récupérer plutôt le lien "Partager" depuis l'interface Google Business Profile. Second lien fourni (`https://share.google/OO0MDj9rozdpL3ps7`) vérifié de la même façon : redirige vers une recherche Google avec `kgmid=/g/11nb5f6bg4&q=SublimNet` — un identifiant Knowledge Graph stable, confirmé comme le bon type de lien. Retenu.

**2. Contenu ajouté à deux endroits, sur constantes centralisées (`GOOGLE_REVIEWS_URL`, `GOOGLE_RATING`, `GOOGLE_REVIEW_COUNT` dans `tokens.js`)** :
- **`ContactPage.jsx`, section "Avis clients"** : remplace le texte "Sublim Net vient tout juste de démarrer — on affichera ici les premiers avis clients dès qu'on en aura" (devenu faux) par 5 étoiles (`StarIcon`, déjà présent dans `Icons.jsx` mais jusque-là inutilisé), "5,0 sur Google — 6 avis", puis "Ils nous font confiance. Voir la fiche Google →" en lien vers la fiche. Commentaire d'en-tête du fichier également corrigé (ne renvoyait plus vers la bonne raison de l'absence d'avis).
- **`HomePage.jsx`, hero** : ligne discrète ajoutée sous les boutons "Réserver maintenant"/WhatsApp (étoiles blanches miniatures + "5,0 sur Google (6 avis)", lien cliquable) — emplacement choisi après question posée à l'utilisatrice (alternatives proposées : section Avant/Après, ou aucun rappel sur l'accueil) pour rester cohérent avec l'angle "preuve" déjà présent dans le hero, sans ajouter de nouveau bloc.
- Vérifié par capture d'écran réelle (Playwright) sur les deux pages avant de proposer le diff, pas seulement en lisant le code.

**3. `aggregateRating` ajouté au schema.org `LocalBusiness` dans `public/index.html`** (`ratingValue: "5"`, `reviewCount: "6"`), volontairement absent jusqu'ici en l'absence de vrais avis contrôlés. Syntaxe vérifiée par un parse JSON du fichier avant commit (pas seulement une relecture visuelle). Pas de markup `review` individuel ajouté, conformément à la demande de ne pas afficher le détail des avis — `aggregateRating` seul est valide en schema.org sans liste de `review`.

**4. Validation Google Rich Results Test — reportée après déploiement, comme pour le premier passage schema (voir entrée du 2026-08-03).** L'outil doit crawler une URL publique réelle, `localhost` n'est pas accessible depuis l'extérieur — confusion initiale de l'utilisatrice clarifiée (le lien Google Business, lui, avait déjà été vérifié séparément et n'a aucun rapport avec cette limitation).

**État git en fin de session :** `ffb3e67` committé et poussé (4 fichiers : `tokens.js`, `ContactPage.jsx`, `HomePage.jsx`, `public/index.html`). Cette entrée de journal à committer séparément. Validation Google Rich Results Test à faire après le redéploiement Netlify — pas encore effectuée au moment de rédiger cette entrée.

**Points ouverts :**
- ~~Valider le schema `aggregateRating` avec Google Rich Results Test~~ — fait juste après cette entrée : l'utilisatrice a testé elle-même (résultat OK), confirmé en parallèle par une lecture directe du JSON-LD déployé sur `sublimnet.com` (`aggregateRating` correct, `areaServed` à 15 entrées).
- Marquer `booking_completed` comme conversion dans l'interface GA4 — toujours en attente (voir entrée précédente).
- GMB : finaliser site web / horaires / catégorie / description sur la fiche.
- Bug UX du bouton "Confirmer" sans validation HTML5 native — toujours signalé, non corrigé.
- Réponse de Kenzo sur `sublimnet.fr`/"Pro Clean" et le "150+ avis" — toujours en attente.
- Retour du frère de l'utilisatrice sur son test de réservation — toujours en attente.

---

## 2026-08-11 (suite 3) — `/ai-seo` : resynchronisation FAQPage, mise à jour llms.txt, villes desservies visibles

**Périmètre cadré explicitement par l'utilisatrice avant l'audit** : découverte par les IA génératives/assistants (llms.txt, structure de contenu lisible par un LLM, cohérence des informations factuelles) — pas les volets du skill `ai-seo` sans rapport avec un site vitrine local de cette taille (outils de suivi de citation IA payants, stratégie de contenu/backlinks, `/pricing.md` type SaaS). Audit mené avant toute modification, liste de constats présentée, traitement des 4 points dans l'ordre proposé par l'utilisatrice, diff global montré une seule fois pour validation groupée (pas un diff par point).

**1. Schema `FAQPage` resynchronisé sur la FAQ réellement affichée sur `HomePage.jsx`.** Écart trouvé en comparant ligne à ligne le tableau `FAQ` du composant et le `mainEntity` du JSON-LD dans `public/index.html` : la question "Comment se passe le paiement ?" (5ᵉ sur 6 dans le composant) était **totalement absente** du schema, qui n'en comptait que 5. Trois autres réponses communes avaient un texte légèrement différent entre composant et schema (précision "(Express, Confort, combinés)" manquante sur le délai 24h, phrase sur l'affichage séparé des frais manquante, mention "parcours dédié" manquante sur la réponse Tapis). Schema aligné mot pour mot sur le composant (source de vérité, car c'est ce que voit réellement un visiteur), JSON revalidé par un parse avant diff.

**2. `llms.txt` mis à jour.** Deux ajouts factuels devenus faux/incomplets par l'accumulation des sessions précédentes : la note Google (5,0★, 6 avis, absente alors qu'affichée sur le site depuis l'entrée précédente) et la liste complète des 15 villes desservies (le fichier ne disait que "Talence et alentours", sans détail, alors que le schema et la fiche GMB en listent 15 depuis le commit `34f2892`).

**3. Villes desservies ajoutées en texte visible sur `ContactPage.jsx`, section "Zone d'intervention".** Jusqu'ici, la liste des 15 villes n'existait que dans le schema JSON-LD (invisible à l'œil) et dans `llms.txt` — aucun texte lisible sur le site lui-même ne les nommait, ce qui limite l'extractibilité pour des requêtes IA du type "nettoyage auto Cenon" ou "detailing Mérignac" (principe de couverture du cluster de requêtes/query fan-out). Nouvelle constante `AREA_SERVED_CITIES` centralisée dans `tokens.js` (avec commentaire de rappel : à garder alignée avec `areaServed` du schema) plutôt qu'une liste locale à `ContactPage.jsx`, pour limiter le risque de désynchronisation future. Vérifié par capture d'écran réelle : la carte "Zone d'intervention" s'agrandit proprement, pas de casse de mise en page.

**4. Commentaire technique périmé corrigé dans `public/index.html`.** La ligne au-dessus du script GA4 affirmait encore "Bandeau de consentement cookies pas encore en place" — faux depuis la session du bandeau cookies, plusieurs sessions plus tôt. N'affecte aucun rendu ni comportement (commentaire HTML invisible), corrigé par cohérence documentaire pour ne pas induire en erreur une future session qui lirait ce fichier.

**Ce qui a été examiné puis délibérément écarté** : `robots.txt` déjà conforme (tous les bots IA majeurs explicitement autorisés, aucune action nécessaire) ; pas de nouveau bloc "définition" ajouté au hero de l'accueil (le `<title>`/meta description et le schema portent déjà cette info clairement, réécrire le hero pour l'IA aurait dilué l'accroche marketing pour un gain marginal) ; pas de fichier `/pricing.md` séparé proposé (la grille tarifaire est déjà entièrement lisible dans `llms.txt`, un fichier dédié ferait doublon sur un site de cette taille).

**État git en fin de session :** `73797d5` committé et poussé (4 fichiers : `public/index.html`, `public/llms.txt`, `src/tokens.js`, `src/pages/ContactPage.jsx`). Cette entrée de journal à committer séparément.

**Points ouverts :**
- Marquer `booking_completed` comme conversion dans l'interface GA4 — toujours en attente.
- GMB : finaliser site web / horaires / catégorie / description sur la fiche.
- Bug UX du bouton "Confirmer" sans validation HTML5 native — toujours signalé, non corrigé.
- Réponse de Kenzo sur `sublimnet.fr`/"Pro Clean" et le "150+ avis" — toujours en attente.
- Retour du frère de l'utilisatrice sur son test de réservation — toujours en attente.
