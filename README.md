# Meet Phulwani — Portfolio

Premium full-stack developer portfolio built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, Lenis, and React Router.

## Quick start

```bash
npm install
npm run dev
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint (zero-warning policy) |

## Environment variables

Copy `.env.example` to `.env` and fill values when ready:

```bash
cp .env.example .env
```

| Variable | Purpose |
| --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service id |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template id |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

If EmailJS keys are empty, the contact form still validates and shows a placeholder success state.

## Content updates

All personal/portfolio content lives in `src/data/`:

- `profile.ts` — name, bio, contact, portrait, resume path
- `projects.ts` — featured + project cards + case-study fields
- `skills.ts`, `experience.ts`, `education.ts`, `codingProfiles.ts`
- `socials.ts`, `seo.ts`, `contact.ts`

Replace placeholders marked in those files before production launch.

## Assets to replace before deploy

- `public/images/portrait-placeholder.svg`
- `public/images/projects/*.svg`
- `public/images/og-placeholder.svg` (prefer a 1200×630 PNG/JPG for social crawlers)
- `public/resume/Meet-Phulwani-Resume.pdf`
## SEO defaults

Update `src/data/seo.ts` and keep `index.html` / `public/robots.txt` / `public/sitemap.xml` URLs aligned with your production domain.

## Deploy

### Vercel

1. Import the Git repository in Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add EmailJS env vars in Project Settings → Environment Variables

### Netlify

1. Import the Git repository in Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add EmailJS env vars in Site settings → Environment variables

SPA fallback is handled by hosting rewrites to `index.html` for client routes (`/projects/:slug`, `/404`).

## Architecture notes

- Design-system-first UI in `src/components`
- Motion presets in `src/animations`
- Home sections below the Hero lazy-load near the viewport
- Case-study and 404 routes are code-split
- Dark mode only
"# My-Portfolio" 
