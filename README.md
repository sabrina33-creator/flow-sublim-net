# flow-template-website

Template React pour créer un site vitrine client professionnel en 2-3 heures au lieu de 6-10 heures.

**Stack :** React 19 + React Router 7 + react-scripts 5 (CRA)  
**Hébergement cible :** Netlify (auto-deploy depuis GitHub)  
**Agence :** Flōw Agency — contact.essaloc@gmail.com

---

## Nouveau client — procédure complète

### ÉTAPE 1 — Créer le repo client sur GitHub (2 min)

1. Ouvrir ce repo sur GitHub
2. Cliquer **"Use this template"** → **"Create a new repository"**
3. Nommer le repo : `flow-[nom-client]` — ex. `flow-loya`, `flow-julie`, `flow-malek`
4. Choisir **Private** (le rendre public uniquement si le client le demande)
5. Cliquer **"Create repository"**

### ÉTAPE 2 — Cloner et installer (3 min)

```bash
git clone https://github.com/sabrina33-creator/flow-[nom-client].git
cd flow-[nom-client]
npm install
npm start    # vérifier que le site tourne en local sur localhost:3000
```

### ÉTAPE 3 — Remplir `src/tokens.js` (10 min)

C'est le seul fichier obligatoire à remplir avant tout le reste.

Ouvrir `src/tokens.js` et remplir :

| Variable | Ce qu'il faut mettre |
|---|---|
| `SITE_NAME` | Nom du client — ex. `'Loya Conciergerie'` |
| `SITE_URL` | URL complète sans slash — ex. `'https://loya-conciergerie.com'` |
| `PHONE` | URI tel: — ex. `'tel:+33783376293'` |
| `PHONE_DISPLAY` | Format humain — ex. `'07 83 37 62 93'` |
| `EMAIL` | Email de contact — ex. `'loya.conciergerie@gmail.com'` |
| `WHATSAPP` | URL wa.me complète avec message encodé |
| `ADDRESS` | Adresse complète |
| `CITY` | Ville principale |
| `ZIP` | Code postal |
| `GA4_ID` | ID GA4 — ex. `'G-HNVNNBY5PN'` (créer sur analytics.google.com) |
| `C.primary` | Couleur principale en hex — ex. `'#B87333'` |
| `C.secondary` | Couleur secondaire en hex |
| `F.heading` | Police des titres — ex. `"'Josefin Sans', sans-serif"` |
| `F.body` | Police du corps — ex. `"'Figtree', sans-serif"` |

**Règle polices :** JAMAIS Inter, Roboto, Arial, Playfair Display, DM Sans, Cormorant Garamond.

Pour construire l'URL WhatsApp :
```
https://wa.me/33[numéro sans 0 initial]?text=[message encodé URL]
Exemple : https://wa.me/33783376293?text=Bonjour%2C%20je%20souhaite%20un%20devis.
```

### ÉTAPE 4 — Remplir `public/index.html` (15 min)

Chercher tous les `[TODO]` dans le fichier et les remplacer :

| Ce qu'il faut trouver | Ce qu'il faut mettre |
|---|---|
| `<title>[TODO: ...]` | Titre SEO — ex. `Loya Conciergerie — Gestion Airbnb à Bordeaux` |
| `meta name="description"` | 150 caractères max — bénéfice concret + ville |
| `og:title` | Même que `<title>` |
| `og:description` | Même que meta description |
| `og:url` | `https://[vrai-domaine]/` |
| `og:image` | `https://[vrai-domaine]/og-image.jpg` |
| Lien Google Fonts | Remplacer Josefin+Sans et Figtree par les vraies polices |
| `G-XXXXXXXXXX` (2 fois) | Le vrai GA4 ID du client |
| `TODO_BusinessType` | Type schema.org — ex. `LodgingBusiness`, `HomeAndConstructionBusiness` |
| `JSON-LD name, description, telephone, email` | Coordonnées réelles |
| `JSON-LD address` | Adresse complète |
| `JSON-LD areaServed` | Villes couvertes |
| `JSON-LD sameAs CID` | CID Google My Business (visible dans l'URL GMB) |
| `JSON-LD FAQ` (5 questions) | Vraies questions fréquentes des clients |

### ÉTAPE 5 — Remplir les fichiers SEO dans `public/` (10 min)

**`public/sitemap.xml`**
- Remplacer `https://[SITE_URL]` par le vrai domaine
- Mettre à jour `lastmod` à la date de mise en ligne

**`public/robots.txt`**
- Remplacer `https://[SITE_URL]` dans la ligne `Sitemap:`

**`public/llms.txt`**
- Remplir nom, description, services avec tarifs, informations de contact

### ÉTAPE 6 — Remplir le contenu dans `src/pages/` (1-2h)

Ouvrir chaque page et remplacer les textes `[TODO]` dans les tableaux de données en haut du fichier :

**`src/pages/HomePage.jsx`**
- `ACCROCHE_H1` — titre principal (4 à 6 mots maximum)
- `ACCROCHE_SUB` — sous-titre (1 phrase, bénéfice concret)
- `PAIN_POINTS` — 4 problèmes que le client résout
- `SERVICES_APERCU` — 2 à 4 offres avec prix
- `VALEURS` — 4 différenciateurs
- `FAQ` — 5 questions/réponses (copier les vraies questions reçues)

**`src/pages/ServicesPage.jsx`**
- `SERVICES` — détail complet de chaque service (inclus, délai, prix, recommandé)

**`src/pages/ContactPage.jsx`**
- `ZONES` — liste des villes/zones d'intervention
- `HORAIRES` — horaires réels

### ÉTAPE 7 — Photos (30 min)

| Fichier | Dimensions | Usage |
|---|---|---|
| `public/og-image.jpg` | 1200×630px | Partage réseaux sociaux |
| `public/favicon.png` | 512×512px | Onglet navigateur |
| `src/hero.jpg` | 1600×900px min | Photo principale hero |
| Photos de services | 800×600px min | Sections services |

Pour utiliser une photo locale dans HomePage.jsx :
```js
// Remplacer la ligne HERO_IMG = 'https://unsplash...' par :
import heroImg from '../hero.jpg';
const HERO_IMG = heroImg;
```

### ÉTAPE 8 — Logo (10 min)

Le logo actuel est généré automatiquement (première lettre de SITE_NAME).

Pour ajouter le vrai logo dans Header.jsx (L.47-55) :
```jsx
// Remplacer le bloc <div style={{width: 36, ...}}> par :
<img src={logoImg} alt={SITE_NAME} style={{ height: 36, width: 'auto' }} loading="eager" />
// + import logoImg from '../logo.svg'; en haut du fichier
```

Faire de même dans Footer.jsx.

### ÉTAPE 9 — Vérification locale (15 min)

```bash
npm start
```

Checklist à vérifier dans le navigateur :
- [ ] Affichage correct sur Chrome desktop (1280px)
- [ ] Affichage correct sur Chrome mobile (375px — DevTools)
- [ ] WhatsApp s'ouvre au clic sur tous les boutons
- [ ] Menu hamburger s'ouvre et se ferme
- [ ] Les 3 pages s'affichent sans erreur console
- [ ] Scroll reveal fonctionne
- [ ] Header devient opaque au scroll

### ÉTAPE 10 — Build et déploiement (10 min)

```bash
npm run build    # vérifier zéro erreur avant de continuer
```

```bash
git add .
git commit -m "init: [Nom du client]"
git push
```

Ensuite sur Netlify :
1. **New site** → **Import from GitHub**
2. Sélectionner le repo `flow-[nom-client]`
3. Build command : `npm run build` (auto-détecté)
4. Publish directory : `build` (auto-détecté)
5. **Deploy site**

Connecter le domaine custom : **Domain settings** → **Add custom domain**.

Après déploiement : `Ctrl+Shift+R` pour vider le cache navigateur.

---

## Checklist complète par client

### TOKENS.JS (obligatoire en premier)
- [ ] `SITE_NAME` rempli
- [ ] `SITE_URL` rempli (sans slash final)
- [ ] `PHONE` rempli (format `tel:+33...`)
- [ ] `PHONE_DISPLAY` rempli (format lisible)
- [ ] `EMAIL` rempli
- [ ] `WHATSAPP` rempli (URL wa.me + message encodé)
- [ ] `ADDRESS`, `CITY`, `ZIP` remplis
- [ ] `GA4_ID` rempli (propriété créée sur analytics.google.com)
- [ ] `C.primary` et `C.secondary` choisis
- [ ] `F.heading` et `F.body` choisis (pas dans la liste noire)

### INDEX.HTML
- [ ] `<title>` rempli
- [ ] `meta description` remplie (150 chars max)
- [ ] `og:title`, `og:description`, `og:url` remplis
- [ ] Lien Google Fonts mis à jour (polices choisies dans tokens.js)
- [ ] GA4 ID remplacé (**2 occurrences**)
- [ ] JSON-LD `@type` business correct
- [ ] JSON-LD : name, description, telephone, email remplis
- [ ] JSON-LD : address complète
- [ ] JSON-LD : areaServed avec vraies villes
- [ ] JSON-LD : sameAs avec CID GMB réel
- [ ] JSON-LD : FAQ avec 5 vraies questions/réponses

### FICHIERS PUBLIC/
- [ ] `sitemap.xml` : domaine réel, lastmod mis à jour
- [ ] `robots.txt` : URL Sitemap mise à jour
- [ ] `llms.txt` : nom, services, tarifs, contact remplis
- [ ] `og-image.jpg` ajouté (1200×630px)
- [ ] `favicon.png` ajouté (512×512px)

### CONTENU PAGES
- [ ] `HomePage.jsx` : H1, sous-titre, pain points, services, valeurs, FAQ
- [ ] `ServicesPage.jsx` : services complets avec inclus et prix
- [ ] `ContactPage.jsx` : zones, horaires
- [ ] Photos locales importées (hero.jpg, photos services)
- [ ] URL Unsplash placeholder remplacées
- [ ] Logo client remplacé dans Header.jsx et Footer.jsx

### VÉRIFICATION FINALE
- [ ] `npm start` sans erreur console
- [ ] Responsive 375px OK
- [ ] WhatsApp fonctionnel sur tous les CTAs
- [ ] Header transparent → opaque au scroll
- [ ] Menu hamburger OK
- [ ] `npm run build` sans erreur
- [ ] Netlify déploiement réussi
- [ ] Domaine custom connecté et HTTPS actif

---

## Ajouter une nouvelle page

1. Créer `src/pages/NomPage.jsx` (copier ContactPage.jsx comme base)
2. Ajouter la route dans `src/App.js` :
   ```jsx
   <Route path="/nom-page" element={<NomPage />} />
   ```
3. Ajouter le lien dans `src/components/Header.jsx` dans le tableau `NAV`
4. Ajouter le lien dans `src/components/Footer.jsx` dans la nav du footer
5. Ajouter l'URL dans `public/sitemap.xml`

---

## Architecture — pourquoi ce template fonctionne

- `src/tokens.js` — source unique de vérité pour les couleurs, polices, contact
- `src/analytics.js` — GA4 SPA-aware (page_view manuel, generate_lead sur tous les CTAs)
- `src/components/` — composants réutilisables, éprouvés sur 3 sites
- `src/pages/` — pages scaffold avec données séparées du JSX (modifier en haut du fichier)
- `public/index.html` — SEO, GA4, JSON-LD centralisés
- `netlify.toml` — redirect SPA configuré (obligatoire pour React Router)

**Important :** chaque repo client généré depuis ce template est totalement indépendant.
Les corrections apportées à ce template après la génération ne se propagent pas automatiquement.
Les mettre à jour manuellement dans chaque repo client si nécessaire.

---

## Contacts Flōw Agency

- WhatsApp : wa.me/33783376293
- Email : contact.essaloc@gmail.com
