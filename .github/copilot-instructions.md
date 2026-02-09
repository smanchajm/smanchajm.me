# Project Guidelines — smanchajm.me

Portfolio personnel d'un Machine Learning Engineer en fin d'études. Basé sur le thème **[Case](https://github.com/erlandv/case)** pour **Astro 5** (sortie statique). Déployé sur un VPS personnel.

## Architecture

Template initialisée avec : `npm create astro@latest -- --template erlandv/case`

```
src/
  components/       # Composants Astro réutilisables (Navigation, Footer, ProjectCard, SEO…)
  layouts/          # BaseLayout (toutes pages), PageLayout, CaseStudyLayout
  pages/            # Routing fichier → HTML (index, projects, contact…)
  content/          # Collections de contenu MDX (projects/, journey/, writing/…)
  styles/           # CSS global (global.css, typography.css, utilities.css)
  utils/            # Fonctions utilitaires
  config.ts         # Configuration du site + navigation
  content.config.ts # Schémas des collections de contenu
  pages.config.ts   # Métadonnées des pages (titres, descriptions SEO)
public/             # Assets statiques (favicons, og-image, PDF CV)
.env                # Variables d'environnement (infos perso, URL du site)
```

- **Site statique** — pas d'adaptateur SSR, `astro build` → `dist/`
- Le thème Case structure chaque projet comme une **étude de cas** (problème → contraintes → approche → résultats)
- Configuration centralisée dans `.env` (infos auteur, URL, réseaux sociaux) et `src/config.ts` (navigation)
- Préférer les composants `.astro` ; n'utiliser React/Vue que pour des îlots interactifs nécessaires

## Sections actives

Le site n'utilise que 3 sections principales du thème Case :

1. **Accueil (Hero + À propos)** — `src/pages/index.astro` — présentation personnelle MLE
2. **Projets ML/Data** — `src/content/projects/` — études de cas avec frontmatter structuré
3. **Contact** — `src/pages/contact.astro` — liens réseaux sociaux + email

Sections du thème **désactivées** (à retirer de `src/config.ts` > `nav`) : decisions, journey, writing, speaking, uses, testimonials.

## Code Style

- TypeScript strict mode (`astro/tsconfigs/strict`)
- **Tailwind CSS** — intégré via `@astrojs/tailwind` en plus du CSS existant du thème
- CSS du thème : variables custom dans `global.css`, typographie dans `typography.css`
- HTML sémantique (`<main>`, `<article>`, `<section>`, `<nav>`)
- Contenu en français ; termes techniques et code en anglais
- Nommage : kebab-case pour pages/contenu (`mon-projet.mdx`), PascalCase pour composants (`ProjectCard.astro`)

## Build and Test

```bash
npm install          # Installer les dépendances
npm run dev          # Serveur dev sur localhost:4321
npm run build        # Build de production → dist/
npm run preview      # Prévisualiser le build localement
```

Pas de framework de test. Valider avec `npm run build` (détecte erreurs TS et références cassées).

## Git Branching & Deployment

- **`main`** — branche de production, déployée automatiquement sur le VPS
- **`develop`** — branche d'intégration pour les features en cours
- **`feature/*`** — branches courtes par fonctionnalité (ex: `feature/add-projects-page`)
- Flux de merge : `feature/*` → `develop` → `main`
- **CI/CD** : GitHub Actions (`.github/workflows/deploy.yml`) build Docker image on push to `main`, déploie sur le VPS via SSH
- Configurer `SITE_URL` dans `.env` avec `https://smanchajm.me`

## Deployment — VPS (Docker + Traefik)

- **Stack** : Dockerfile multi-stage (Node build → Caddy serve) + `docker-compose.yml`
- **Caddy** sert les fichiers statiques dans le container (port 80 interne)
- **Traefik** (reverse proxy externe sur le VPS) gère le routing, TLS (Let's Encrypt), et expose le site
- GitHub Actions : build image → `docker save` → SCP vers VPS → `docker load` + `docker compose up`
- Le container rejoint le réseau Docker `traefik` (externe) via les labels Traefik dans `docker-compose.yml`
- Pas de nom de domaine pour l'instant — à configurer quand disponible
- Secrets GitHub requis : `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_PATH`, `SITE_URL`

## Project Conventions

- Les projets ML/Data sont des fichiers `.mdx` dans `src/content/projects/` avec frontmatter typé (`title`, `description`, `tags`, `role`, `timeline`, `impact`, `featured`)
- Métadonnées SEO par page dans `src/pages.config.ts`
- Navigation configurée dans `src/config.ts` — retirer les sections non utilisées
- Images optimisées avec le composant `<Image />` d'Astro (`astro:assets`)
- `public/` pour les fichiers non traités (CV PDF, OG images, favicons)
