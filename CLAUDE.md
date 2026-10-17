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
- Fiche Google Business Profile existante identifiée, doublon vide résolu, accès administrateur obtenu (`sublimnet33@gmail.com`) — site web, horaires, description et catégories à jour (voir section GMB).
- GA4 — tracking des événements de conversion sur le tunnel de réservation en place et **entièrement validé** (`service_selected`, `booking_started`, `booking_error`, `booking_completed` sur `ReservationPage.jsx`), en plus du `page_view` de base. `booking_completed`/`booking_error` avaient été invisibles dans GA4 → Admin → Événements 24h après leur premier déclenchement réel — cause : `trackEvent()` (`src/analytics.js`) n'avait pas `transport_type: 'beacon'`, contrairement à `trackPageView()`, donc le hit pouvait être coupé si l'utilisateur ferme/navigue juste après (cas fréquent pour ces 2 événements, déclenchés à un moment de sortie). Correctif poussé le 2026-08-16 (commit `88c6623`), **confirmé fonctionnel le 2026-08-20** : les deux événements apparaissent désormais dans "Événements récents". `booking_completed` marqué comme événement clé (conversion) dans GA4 — `booking_error` et les autres volontairement laissés hors conversion.
- Note Google (5,0★, 14 avis) affichée sur le site (hero + page Avis & Contact) avec lien vers la fiche, et `aggregateRating` ajouté au schema.org `LocalBusiness` — validation Google Rich Results Test à faire après déploiement.

## Identité de l'entreprise

- **Nom** : Sublim Net
- **Activité** : nettoyage/detailing auto, canapé, tapis, matelas — à domicile
- **Gérant** : Kenzo
- **Téléphone** : 07 79 72 60 76 (`tel:+33779726076`)
- **Email** : sublimnet33@gmail.com
- **Ville affichée publiquement** : Talence (33400)
- **Adresse d'intervention réelle** : 20 rue François Rabelais, 33400 Talence — ⚠️ **NE JAMAIS AFFICHER PUBLIQUEMENT**, usage interne uniquement (calcul de distance)
- **SIRET** : 95258635200025
- **Réseaux sociaux** : Instagram `SUBLIMNET` (compte actif, vérifié), TikTok `SUBLIMNET` (compte actif, vérifié). Snapchat `SUBLIMNETT` (avec un T final, tel qu'affiché sur le camion) — **compte introuvable** (vérifié le 2026-07-28 : ni via le lien web, ni via la recherche dans l'application Snapchat). Le pseudo venait uniquement du visuel du camion, aucun compte réel ne semble avoir été créé. Lien Snapchat retiré du site jusqu'à création effective du compte — ne pas raffiner "sublimnett" en une autre orthographe sans confirmation du client.
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

- **Fiche Google Business Profile : accès administrateur obtenu, nom et rubrique Services pas encore finalisés** — voir section dédiée "GMB — Google My Business" ci-dessous pour le détail complet. La note réelle (5,0★, 14 avis au 2026-10-13, source fiche vérifiée) est affichée sur le site depuis le 2026-08-11 (hero + page Avis & Contact + `aggregateRating` schema.org) — ne jamais afficher de note différente de ces chiffres réels, ni de faux témoignage/contenu détaillé d'avis inventé. Ne pas reprendre la mention "150+ avis Google" affichée sur `sublimnet.fr` (chiffre non confirmé, sans rapport avec la vraie fiche).
- Aucune assurance professionnelle — ne jamais afficher de mention rassurante à ce sujet.

## GMB — Google My Business

Une fiche Google Business Profile "Sublim Net" existait déjà avant ce projet, héritée d'un ancien prestataire — site associé `sublimnet.fr` sous le nom "Procline" (jamais terminé). **C'est cette fiche préexistante, et non une absence de fiche, qui causait le rejet répété des tentatives de vérification vidéo** (Google détectait un doublon et refusait).

- **Doublon résolu** : un deuxième doublon, vide et sans avis, a été identifié et supprimé/fusionné. Seule la fiche originale avec ses avis clients (14 au 2026-10-13, 5,0★) subsiste désormais.
- **Accès obtenu** : `sublimnet33@gmail.com` ajouté comme **Administrateur** sur cette fiche (propriétaire principal inchangé : `lapeste7710@gmail.com`). Invitation acceptée, accès confirmé.
- **Vérification vidéo** : la demande en cours sous `sublimnet33@gmail.com` a été annulée pour éviter un nouveau conflit de doublon, maintenant que l'accès administrateur est obtenu sur la bonne fiche.
- **Contenu de la fiche (état au 2026-10-16, géré via `sublimnet33@gmail.com`)** :
  - Fait : téléphone (07 79 72 60 76), site web `https://sublimnet.com/` + lien de réservation vers `/reservation`, horaires 7j/7 07:30–22:00 (plus de "Ouvert 24h/24"), description réécrite, réseaux sociaux, établissement sans adresse physique (service à domicile) avec 15 zones desservies (mêmes villes que le schema.org), chat SMS.
  - **Catégories — modifiées le 2026-10-17** : principale "Service d'esthétique automobile" (catégorie dominante des concurrents observés le 2026-10-13 sur "lavage auto à domicile Bordeaux" ; avant : "Service de nettoyage et d'entretien", aucune catégorie auto), secondaires "Service de nettoyage et d'entretien", "Service de nettoyage de moquettes" (catégorie "Lavage pour deux-roues" ajoutée puis retirée le même jour : Kenzo ne propose pas ce service). Doublon "Services de nettoyage" retiré. Aucune catégorie canapé/matelas n'existe dans le sélecteur Google (recherches "canapé", "matelas"… sans résultat, 2026-10-17) — ces prestations sont à couvrir via la rubrique Services et la description. Ne pas utiliser "Station de lavage automobile" (= station fixe). Effet à juger 1 à 2 semaines après, recherche faite en journée.
  - **Nom** : affiché "SublimNet" sur la fiche vs "Sublim Net" partout ailleurs (site, mentions légales, schema.org) — à harmoniser en "Sublim Net".
  - **Facebook** : lien `facebook.com/p/Sublimenet-61564028355076` présent sur la fiche, page de Kenzo (confirmé par l'utilisatrice le 2026-10-17) — encore absente du site (footer : Instagram + TikTok seulement), ajout au site non décidé.
  - À faire ensuite : rubrique Services (un service par prestation, prix du site), date de création, réponse aux avis restants. Ne pas ajouter de mots-clés au nom (interdit par Google) ni passer en "24h/24" pour copier les concurrents.
  - Phrase de la description à surveiller : "prix affiché avant intervention, aucune surprise à l'arrivée" — contestable si des suppléments (très sale, moisissure, poils) sont ajoutés sur place.

## TODO — prochaine session

1. GMB — catégories faites le 2026-10-17 ; ensuite harmonisation du nom en "Sublim Net" (quelques jours après, pas en même temps), rubrique Services (voir section dédiée ci-dessus).
2. **Pages légales incomplètes** (audit du 2026-10-13) : pas de CGV (ni droit de rétractation, ni demande expresse d'exécution avant la fin du délai de 14 jours dans le parcours de réservation), pas de médiateur de la consommation, téléphone de l'hébergeur absent des mentions légales, sous-traitants Netlify/Google/Meta et transferts hors UE absents de la page confidentialité. Contradiction à trancher : les mentions légales affichent l'adresse de la rue alors que la règle ci-dessus l'interdit (une adresse est légalement obligatoire → domiciliation ou mise à jour de la règle). En attente des informations de Kenzo — ne rédiger aucun contenu juridique sans elles.
3. **Limitation architecturale connue et assumée : site 100% CSR (CRA, pas de SSR/SSG)** — identifiée lors de l'audit SEO technique du 2026-08-11. Le HTML initial est un `<div id="root">` vide, tout le contenu (y compris les titres) n'existe qu'après exécution du JS. Googlebot s'en sort bien via le rendu, mais c'est plus faible en vitesse perçue (premier affichage vide) et invisible pour tout crawler/agent IA qui n'exécute pas de JS. Pas un correctif ponctuel — impliquerait une refonte d'architecture (migration vers Next.js ou équivalent SSR/SSG). À réévaluer dans une future session si le besoin devient réel (ex. si le trafic organique stagne ou si un audit montre un impact concret), pas à corriger par principe.
