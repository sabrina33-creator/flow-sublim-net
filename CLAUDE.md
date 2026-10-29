# CLAUDE.md — Sublim Net

Mémoire de contexte stable du projet. Ce fichier contient les règles métier figées.
**Ne mettre à jour QUE quand une règle change réellement** — pas à chaque session de travail.
Pour l'historique chronologique des sessions, voir `JOURNAL.md`.

---

## État actuel du projet

Le site est en ligne sur `sublimnet.com`, entièrement fonctionnel :
- Réservation Supabase testée de bout en bout, y compris via le vrai parcours utilisateur (pas seulement en SQL) — email de confirmation client et email de notification interne à Kenzo tous deux confirmés reçus.
- GA4 actif (`G-KRYJ8JZ2QG`), tracking des pages vues en place à chaque navigation, bandeau de consentement cookies RGPD conforme (Google Consent Mode).
- Schema.org JSON-LD (`LocalBusiness` + `HomeAndConstructionBusiness`) validé sans erreur via Google Rich Results Test.
- Audit RLS/sécurité Supabase réalisé : aucune faille exploitable trouvée, permissions superflues nettoyées (`TRUNCATE`/`TRIGGER`/`REFERENCES` retirés du rôle `anon`).
- Audit accessibilité `impeccable` : contraste WCAG AA, cible tactile 44px, rôle ARIA du bandeau cookies, pattern "ghost-card" (11 cartes) — tous corrigés et vérifiés (axe-core + tests réels en hover/tactile).
- Grille tarifaire Auto enrichie du détail des prestations Express/Confort (voir ci-dessous).
- Bouton WhatsApp (nav + Devis Tapis) : conservé, décision confirmée par Kenzo.
- Fiche Google Business Profile existante identifiée, doublon vide résolu, accès administrateur obtenu (`sublimnet33@gmail.com`) — site web, horaires et description à jour ; changement de catégorie refusé par Google le 2026-10-18 (voir section GMB).
- GA4 — tracking des événements de conversion sur le tunnel de réservation en place et **entièrement validé** (`service_selected`, `booking_started`, `booking_error`, `booking_completed` sur `ReservationPage.jsx`), en plus du `page_view` de base. `booking_completed`/`booking_error` avaient été invisibles dans GA4 → Admin → Événements 24h après leur premier déclenchement réel — cause : `trackEvent()` (`src/analytics.js`) n'avait pas `transport_type: 'beacon'`, contrairement à `trackPageView()`, donc le hit pouvait être coupé si l'utilisateur ferme/navigue juste après (cas fréquent pour ces 2 événements, déclenchés à un moment de sortie). Correctif poussé le 2026-08-16 (commit `88c6623`), **confirmé fonctionnel le 2026-08-20** : les deux événements apparaissent désormais dans "Événements récents". `booking_completed` marqué comme événement clé (conversion) dans GA4 — `booking_error` et les autres volontairement laissés hors conversion.
- Note Google (5,0★, 14 avis) affichée sur le site (hero + page Avis & Contact) avec lien vers la fiche, et `aggregateRating` ajouté au schema.org `LocalBusiness` — validation Google Rich Results Test à faire après déploiement.

## Identité de l'entreprise

- **Nom** : Sublim Net
- **Activité** : nettoyage/detailing auto, canapé, tapis, matelas — à domicile
- **Gérant** : Kenzo
- **Téléphone** : 07 79 72 60 76 (`tel:+33779726076`)
- **Email** : sublimnet33@gmail.com
- **Ville affichée publiquement** : Talence (33400)
- **Adresse de Kenzo** : 20 rue François Rabelais, 33400 Talence — **affichée uniquement dans les pages légales** (mentions légales, CGV et formulaire de rétractation), car une adresse y est légalement obligatoire : décision confirmée le 2026-10-29, pas de domiciliation. Partout ailleurs (pied de page, contact, schema.org, fiche Google, llms.txt), ne jamais l'afficher : seule la ville "Talence" apparaît. Usage interne : point de départ du calcul de distance.
- **SIRET** : 95258635200025
- **Réseaux sociaux** : Instagram `SUBLIMNET` (compte actif, vérifié), TikTok `SUBLIMNET` (compte actif, vérifié), Facebook `facebook.com/p/Sublimenet-61564028355076` (page de Kenzo, dernière publication septembre 2026, ajoutée au site le 2026-10-17 : footer, page Avis & Contact, `sameAs` schema.org). Snapchat `SUBLIMNETT` (avec un T final, tel qu'affiché sur le camion) — **compte introuvable** (vérifié le 2026-07-28 : ni via le lien web, ni via la recherche dans l'application Snapchat). Le pseudo venait uniquement du visuel du camion, aucun compte réel ne semble avoir été créé. Lien Snapchat retiré du site jusqu'à création effective du compte — ne pas raffiner "sublimnett" en une autre orthographe sans confirmation du client.
- **Domaine** : `sublimnet.com` — réservé, configuré sur Netlify, site en ligne depuis le 2026-08-02.
- **GA4** : propriété créée (`G-KRYJ8JZ2QG`), tracking pages vues actif à chaque navigation (SPA) depuis le 2026-08-03. Bandeau de consentement cookies en place (Google Consent Mode — aucun cookie de mesure posé avant acceptation, choix modifiable via le footer). Événements de conversion en place et validés, `booking_completed` marqué comme conversion — voir "État actuel du projet" ci-dessus.

## Identité visuelle

- Source unique : visuel de conception du camion Kangoo floqué (fourni par le client, `src/images/SUBLIMNET_KANGOO_26 (1).png`). Le logo et la palette sont reconstruits fidèlement à partir de ce visuel — jamais réinventés.
- **Fichier logo officiel** : `src/logo.png` (1024×1024, fond blanc plein) — c'est l'asset logo réel fourni par le client, à utiliser en priorité partout où un logo raster convient. Une version fond transparent doit être dérivée pour les usages sur fond coloré/sombre (header transparent sur hero, footer marine).
- **Palette confirmée** (extraite par pipette du visuel camion) : violet `#7F4997` (primary), bleu `#4C77BB` (secondary), marine `#0D3857` (dark). Dégradé du lettrage script "Sublim Net" : violet → bleu.
- **Police du logo** : Dancing Script (Google Fonts) — retenue comme la plus proche du script cursif du camion parmi les candidats.
- **Police du reste du site** : Barlow Condensed (titres, écho du bandeau "DETAILING AUTO"), Manrope (corps).
- **Pas de rose dans la palette.**
- Statut : palette, polices et logo définitifs — voir JOURNAL pour le détail de la construction du site.

## Contraintes techniques

- Stack : React 19 + React Router 7 (CRA), template `flow-template-website`.
- Base de données : **Supabase uniquement**, un seul projet dédié à ce site. Deux tables : `creneaux` (réservations, RLS actif, `anon` limité à `INSERT`) et `email_failures` (traçabilité des échecs d'envoi email, RLS actif, aucun accès `anon` — voir JOURNAL.md pour l'audit sécurité complet). Une vue publique `creneaux_dispo` (date + heure uniquement, sans donnée personnelle) pour l'anti-double-booking sans exposer les réservations d'autrui.
- **Pas de compte utilisateur, pas de mot de passe** — ni côté client ni côté admin. Kenzo consulte les réservations directement via Supabase Studio (table editor), il n'y a pas de dashboard admin custom prévu.
- **Pas de SMS** — confirmation par email uniquement (service gratuit compatible Supabase, ex. Resend), pas de Twilio.
- Géocodage : service gratuit (Nominatim/OpenStreetMap), jamais d'API de distance routière payante. Calcul à vol d'oiseau (Haversine).
- Déploiement : **site en ligne sur Netlify** (`sublimnet.com`, déployé le 2026-08-02), auto-publish activé sur la branche `master` du repo GitHub `sabrina33-creator/flow-sublim-net`. Variables d'environnement `REACT_APP_SUPABASE_URL` / `REACT_APP_SUPABASE_KEY` (clé `anon public`, jamais `service_role`) configurées dans Netlify → Environment variables (obligatoire, CRA les intègre au build, pas à l'exécution — un oubli produit une page blanche sur tout le site).

## Grille tarifaire (TARIFS CONFIRMÉS PAR LE CLIENT LE 2026-07-26 — stables sauf notification contraire)

### Auto — 5 formules × 3 gabarits

| Formule | Citadine | Berline | SUV |
|---|---|---|---|
| Extérieur seul | 45€ | 55€ | 65€ |
| Express (intérieur sans sièges) | 50€ | 65€ | 75€ |
| Confort (intérieur avec sièges) | 90€ | 105€ | 115€ |
| Extérieur + Express | 95€ | 120€ | 140€ |
| Extérieur + Confort | 135€ | 160€ | 180€ |

- Option Sublime (shampoing moquette, cumulable) : +20€
- Suppléments : poils d'animaux/sable +15€, moisissure +20€, véhicule très sale +20€
- Prestations courtes indépendantes : 1 phare 25€, 2 phares 45€

**Détail des formules Express et Confort (confirmé par le client, affiché sur le site)** — s'applique aussi aux formules combinées correspondantes (Extérieur + Express, Extérieur + Confort) :
- *Express* : aspiration habitacle & coffre, nettoyage tableau de bord, nettoyage plastiques, vitrages intérieurs, parfum d'ambiance.
- *Confort* : nettoyage des surfaces plastiques, aspiration complète habitacle et coffre, nettoyage et finition seuils de porte, vitrerie intérieure éclatante, shampoing complet sièges/tapis, nettoyage cuir et alcantara, brillance et revitalisation des surfaces plastiques, parfum d'ambiance.

### Canapé
2 places 40€ / 3 places 50€ / 4 places 60€ / 6 places 80€ / 7 places 90€ / fauteuil-chaise 20€

### Matelas
1 place 45€ / 2 places 65€ / matelas enfant 35€

### Tapis
Sur devis uniquement — aucun prix fixe affiché, parcours dédié sans réservation automatique.

## Zone d'intervention et frais de déplacement

- Point de départ du calcul : adresse interne (20 rue François Rabelais, Talence) — jamais affichée publiquement.
- Méthode : distance à vol d'oiseau (Haversine) entre les coordonnées géocodées de l'adresse client et l'adresse interne.
- Rayon gratuit : 20 km.
- Au-delà : 0,75€/km appliqué uniquement sur le dépassement (ex. 30 km réels → 10 km facturés = 7,50€).
- Affichage obligatoire en ligne séparée du récapitulatif, jamais fondu dans un total unique.

## Règles de créneaux (réservation Auto / Canapé / Matelas — pas Tapis)

- 7j/7, deux créneaux fixes par jour : 07:30 et 14:30.
- Délai minimum 24h, SAUF Extérieur seul et phares (réservables le jour même). Toute formule avec intérieur (Express, Confort, combinés) respecte le délai de 24h.
- Verrouillage anti-double-réservation : vérification de l'état en base au moment de la confirmation (update conditionnel atomique côté serveur), pas seulement à l'affichage.
- Pas de marge tampon codée en dur entre les deux créneaux du jour.
- Réservation automatique et définitive, aucune confirmation manuelle de Kenzo requise.
- Annulation : uniquement par téléphone au 07 79 72 60 76, pas de libre-service.

## Ce qui n'existe pas encore (ne jamais inventer/afficher comme si ça existait)

- **Fiche Google Business Profile : accès administrateur obtenu, catégorie auto en examen après plusieurs refus, rubrique Services pas encore finalisée** — voir section dédiée "GMB — Google My Business" ci-dessous pour le détail complet. La note réelle (5,0★, 14 avis au 2026-10-13, source fiche vérifiée) est affichée sur le site depuis le 2026-08-11 (hero + page Avis & Contact + `aggregateRating` schema.org) — ne jamais afficher de note différente de ces chiffres réels, ni de faux témoignage/contenu détaillé d'avis inventé. Ne pas reprendre la mention "150+ avis Google" affichée sur `sublimnet.fr` (chiffre non confirmé, sans rapport avec la vraie fiche).
- Aucune assurance professionnelle — ne jamais afficher de mention rassurante à ce sujet.

## GMB — Google My Business

Une fiche Google Business Profile "Sublim Net" existait déjà avant ce projet, héritée d'un ancien prestataire — site associé `sublimnet.fr` sous le nom "Procline" (jamais terminé). **C'est cette fiche préexistante, et non une absence de fiche, qui causait le rejet répété des tentatives de vérification vidéo** (Google détectait un doublon et refusait).

- **Doublon résolu** : un deuxième doublon, vide et sans avis, a été identifié et supprimé/fusionné. Seule la fiche originale avec ses avis clients (14 au 2026-10-13, 5,0★) subsiste désormais.
- **Accès obtenu** : `sublimnet33@gmail.com` ajouté comme **Administrateur** sur cette fiche (propriétaire principal inchangé : `lapeste7710@gmail.com`). Invitation acceptée, accès confirmé.
- **Vérification vidéo** : la demande en cours sous `sublimnet33@gmail.com` a été annulée pour éviter un nouveau conflit de doublon, maintenant que l'accès administrateur est obtenu sur la bonne fiche.
- **Contenu de la fiche (état au 2026-10-16, géré via `sublimnet33@gmail.com`)** :
  - Fait : téléphone (07 79 72 60 76), site web `https://sublimnet.com/` + lien de réservation vers `/reservation`, horaires 7j/7 07:30–22:00 (plus de "Ouvert 24h/24"), description réécrite, réseaux sociaux, établissement sans adresse physique (service à domicile) avec 15 zones desservies (mêmes villes que le schema.org), chat SMS.
  - **Catégories — changement REFUSÉ par Google (e-mails reçus le 2026-10-18)** : les tentatives de passer la catégorie principale de "Service de nettoyage et d'entretien" à "Service d'esthétique automobile" (avec ou sans "Lavage pour deux-roues") ont toutes été refusées par la modération automatique, motif "Identité de l'établissement modifiée" (Google y voit un changement d'entreprise, pas une correction). Les catégories restent donc celles d'origine (principale "Service de nettoyage et d'entretien", secondaires "Services de nettoyage" + "Service de nettoyage de moquettes" — à revérifier sur la fiche). **Ne plus retenter ce changement de catégorie principale en boucle** : des refus répétés peuvent mener à une suspension. **Mise à jour 2026-10-18** : la fiche affiche malgré tout une modification de catégories "en attente" (principale "Service d'esthétique automobile", examen prolongé "jusqu'à sept jours", probablement manuel) — attendre son issue avant tout appel ou nouvelle modification. **Mise à jour 2026-10-28** : "Service d'esthétique automobile" est désormais **active en catégorie secondaire** (actuellement : principale "Service de nettoyage et d'entretien", secondaires "Service de nettoyage de moquettes" + "Service d'esthétique automobile" ; "Services de nettoyage" retiré). Le passage en principale reste en attente au-delà des 7 jours, Google affiche "Contactez l'assistance" → démarche retenue : un seul contact avec l'assistance, preuves à l'appui ; en cas de refus, s'en tenir à la catégorie auto en secondaire et ne plus insister. **Appel envoyé le 2026-10-28** via l'outil d'appel (une seule des ~6 décisions de refus du 17 oct., celle "nettoyage et entretien + moquettes + esthétique auto" ; configuration demandée : principale "Service d'esthétique automobile"), avec 3 photos du vrai camion floqué ("DETAILING AUTO & NETTOYAGE TEXTILE") extraites d'une vidéo + avant/après de voitures. Réponse attendue sous 5 jours ouvrés (~2026-11-04). Si refus : on s'arrête, la catégorie auto reste en secondaire. Historique : un seul appel argumenté avec preuves (camion floqué, site, SIRET), ou repli sur l'ajout de "Service d'esthétique automobile" en secondaire seulement. Aucune catégorie canapé/matelas n'existe dans le sélecteur Google.
  - **Nom** : changé de "SublimNet" en "Sublim Net", accepté par Google (constaté le 2026-10-18) — cohérent avec le site, les mentions légales et le schema.org.
  - **Facebook** : lien `facebook.com/p/Sublimenet-61564028355076` présent sur la fiche, page de Kenzo, active (confirmé le 2026-10-17) — ajoutée au site le même jour.
  - À faire ensuite : rubrique Services (un service par prestation, prix du site), date de création, réponse aux avis restants. Ne pas ajouter de mots-clés au nom (interdit par Google) ni passer en "24h/24" pour copier les concurrents.
  - Phrase de la description à surveiller : "prix affiché avant intervention, aucune surprise à l'arrivée" — contestable si des suppléments (très sale, moisissure, poils) sont ajoutés sur place.

## TODO — prochaine session

1. GMB — changement de catégorie principale refusé le 2026-10-18 (voir section GMB, ne pas retenter en boucle) ; catégorie auto active en secondaire depuis le 2026-10-28, passage en principale refusé → appel envoyé le 2026-10-28, réponse attendue ~2026-11-04 (si refus : s'arrêter) ; nom "Sublim Net" accepté ; rubrique Services (voir section dédiée ci-dessus).
2. **Pages légales** (audit du 2026-10-13) : **CGV** — Kenzo et le frère de l'utilisatrice n'en ont pas ; projet rédigé par Claude le 2026-10-28/29 à partir de leurs règles (annulation gratuite, prévenir 48 h avant par WhatsApp ou téléphone, absence non facturée ; report sans frais si annulation par Kenzo ; prise électrique + rallonges 35 m fournies, place pour ouvrir les 5 portes, stationnement du camion à proximité ; supplément constaté sur place annoncé avant de commencer) + rétractation 14 jours, renonciation en cas d'exécution avant la fin du délai, formulaire type. **En attente du « ok » écrit de Kenzo** sur 3 points (annulation par WhatsApp ou téléphone, annulation sans frais si refus du supplément, nouveau créneau si intervention impossible). Après son ok : page `/cgv` + footer + sitemap, **case à cocher obligatoire dans `ReservationPage.jsx`** (acceptation CGV + demande d'exécution avant la fin du délai), et remplacer partout « annulation uniquement par téléphone » (FAQ `HomePage.jsx` + JSON-LD `index.html`, `ReservationPage.jsx`, `ContactPage.jsx`, `llms.txt`, règle de créneaux ci-dessus). **Médiateur** : obligatoire, absent — Kenzo doit adhérer (rappel fait par l'utilisatrice, ce n'est plus de son ressort). Restent aussi : téléphone de l'hébergeur dans les mentions légales, sous-traitants Netlify/Google/Meta et transferts hors UE dans la page confidentialité.
3. **Limitation architecturale connue et assumée : site 100% CSR (CRA, pas de SSR/SSG)** — identifiée lors de l'audit SEO technique du 2026-08-11. Le HTML initial est un `<div id="root">` vide, tout le contenu (y compris les titres) n'existe qu'après exécution du JS. Googlebot s'en sort bien via le rendu, mais c'est plus faible en vitesse perçue (premier affichage vide) et invisible pour tout crawler/agent IA qui n'exécute pas de JS. Pas un correctif ponctuel — impliquerait une refonte d'architecture (migration vers Next.js ou équivalent SSR/SSG). À réévaluer dans une future session si le besoin devient réel (ex. si le trafic organique stagne ou si un audit montre un impact concret), pas à corriger par principe.
