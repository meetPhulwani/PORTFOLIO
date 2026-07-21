# Meet Phulwani — Premium Portfolio Design Spec

**Date:** 2026-07-18  
**Status:** Ready for user review  
**Owner:** Meet Phulwani  
**Type:** Hybrid cinematic SPA + future case-study routes

---

## 1. Goal

Build an award-level full-stack developer portfolio for **Meet Phulwani** that feels like a luxury digital product (Apple × Awwwards × Linear × Framer × Porsche), not a student React template.

Primary audience: recruiters and hiring managers at top tech companies.  
Primary experience: cinematic single-page editorial landing at `/`.  
Future-ready: `/projects/:slug` case studies without architectural rewrite.

---

## 2. Design Philosophy

- Editorial luxury, massive typography, generous whitespace
- Cinematic storytelling and strong visual hierarchy
- Premium interactions; motion that feels intentional, never flashy
- Clean developer aesthetic with a single accent (`#E11D2E`)
- Dark mode only; no bright gradients; no purple/blue template look
- Every section has a unique layout; asymmetric grids; premium spacing

---

## 3. Tech Stack

| Layer | Choice |
|---|---|
| Framework | React + Vite + TypeScript |
| Styling | TailwindCSS + CSS variables (design tokens) |
| Variants | Class Variance Authority (CVA) |
| Motion | Framer Motion (+ centralized presets) |
| Scroll | Lenis |
| Routing | React Router |
| Icons | React Icons |
| Forms | EmailJS |
| Optional | GSAP only if Framer Motion cannot achieve a required effect |

Modern React practices: composition, lazy routes, accessible semantics, `prefers-reduced-motion` support.

---

## 4. Architecture

### 4.1 Hybrid model

**Phase 1 (implement):** Cinematic single-page Home at `/` with all sections.

**Phase 2 (architecture only):** Dynamic `/projects/:slug` route wired from day one. Project data includes all case-study fields. Phase 1 renders a polished placeholder page (never a dead link).

### 4.2 Routes

| Path | Page | Phase 1 behavior |
|---|---|---|
| `/` | `Home` | Full editorial experience |
| `/projects/:slug` | `ProjectCaseStudy` | Polished placeholder using project data; invalid slug → not-found UI |

`View Details` on project cards navigates to `/projects/:slug`.

### 4.3 Folder structure

```
src/
  assets/                 # portrait, project images, resume.pdf (placeholders)
  animations/             # shared motion presets / helpers
  components/
    cards/                # ProjectCard, SkillCard, StatCard
    layout/               # Container, Section, AppShell, Footer
    navigation/           # Navbar, MobileMenu, ScrollToTop
    typography/           # Heading, SubHeading, BodyText, Caption
    ui/                   # Button, Badge, Pill, Card, GlassCard, …
    effects/              # CustomCursor, ScrollProgress, Spotlight, Parallax
  constants/              # section ids, breakpoints, copy keys if needed
  theme/                  # tokens, CVA helpers
  hooks/                  # useLenis, useMediaQuery, useMagnetic, useReducedMotion
  lib/                    # cn(), emailjs helpers, utils
  providers/              # SmoothScrollProvider, MotionConfigProvider
  pages/                  # Home, ProjectCaseStudy, NotFound
  sections/               # Hero, About, Marquee, Skills, …
  routes/                 # route config + lazy loaders
  data/                   # profile, projects, skills, experience, education, socials, stats
  styles/                 # globals.css, fonts
  utils/
  App.tsx
  main.tsx
```

---

## 5. Data Architecture

All personal and portfolio content lives in `src/data/`. Components receive data via props or thin selectors — never hardcode profile/project/skill content.

### Files

| File | Contents |
|---|---|
| `profile.ts` | name, title, tagline, bio, availability badge, location (placeholder), email/phone placeholders, portrait path, resume path |
| `projects.ts` | all projects including featured flag + case-study fields |
| `skills.ts` | categories + items |
| `experience.ts` | timeline entries |
| `education.ts` | college, degree, graduation (placeholders marked) |
| `socials.ts` | GitHub, LinkedIn, LeetCode, Codeforces, HackerRank URLs (placeholders) |
| `stats.ts` | Projects, LeetCode, Hackathons, Internships counters |

### Placeholder policy

Clearly marked constants/placeholders for:

- GitHub URL, LinkedIn URL, LeetCode URL
- Email, Phone
- Resume PDF path
- Portrait image, project images
- College name, graduation year
- Experience dates, location, contact details

Realistic copy based on the brief (no Lorem Ipsum). Name is real: **Meet Phulwani**.

### Project data shape (future case-study ready)

```ts
type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  featured: boolean;
  coverImage: string;
  gallery?: string[];
  problem: string;
  solution: string;
  architecture: string;
  features: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  caseStudyReady: boolean; // false → show polished placeholder
};
```

Updating the portfolio should only require editing `data/` (+ swapping assets).

---

## 6. Design Tokens

| Token | Value |
|---|---|
| Background | `#090909` |
| Secondary | `#111111` |
| Card | `#171717` |
| Primary text | `#FAFAFA` |
| Secondary text | `#A0A0A0` |
| Accent | `#E11D2E` |
| Success | `#22C55E` |
| Border | `rgba(255,255,255,.08)` |
| Radius | `18–24px` |

Exposed as CSS variables and Tailwind theme extensions. No bright gradients. Soft shadows and subtle borders only.

### Typography

- Display: Bebas Neue (primary) or Anton fallback
- Body: Inter
- Huge background words (`PORTFOLIO`, `DEVELOPER`, `PROJECTS`, `CONTACT`) at ~8% opacity

---

## 7. Design System Primitives

Build primitives **before** sections. Sections compose these only.

**Layout / structure:** `Container`, `Section`, `Grid`, `Divider`  
**Typography:** `Heading`, `SubHeading`, `BodyText`, `Caption`  
**Actions:** `Button`, `MagneticButton` (desktop), `Badge`, `Pill`, `SocialIcon`  
**Surfaces:** `Card`, `GlassCard`, `ImageFrame`  
**Domain:** `AnimatedCounter`, `Timeline`, `Marquee`, `ProjectCard`, `SkillCard`, `StatCard`

Rules:

- CVA for variant APIs (`Button`, `Badge`, `Heading`, etc.)
- Shared spacing via `Section` / `Container` — no ad-hoc section padding systems
- If a section needs a new pattern, extend a primitive first
- No duplicated styles across sections

---

## 8. Motion System

Centralize presets in `src/animations/` (and/or `constants/motion`).

Presets: `fadeUp`, `fadeDown`, `fadeLeft`, `fadeRight`, `blurReveal`, `heroReveal`, `scaleIn`, `liftHover`, `magnetic`, `parallax`, `stagger`, `counterReveal`, `timelineReveal`, `pageTransition`.

Global experience:

- Lenis smooth scrolling
- Page / section reveal
- Image scale + project zoom
- Cursor spotlight (desktop)
- Magnetic buttons (desktop)
- Card hover lift + glow border
- Number counters on viewport enter
- Blur-to-clear text reveals
- Respect `prefers-reduced-motion` (disable/simplify non-essential motion)

Tone: Apple / Framer — smooth, restrained, premium.

---

## 9. Global App Shell

- Dark mode only
- Loader with logo (`M`) animation
- Custom cursor (desktop only; hide on touch / reduced motion)
- Scroll progress indicator
- Scroll-to-top button
- Navbar: transparent → blur after scroll; links: About, Projects, Skills, Experience, Contact; Resume button; GitHub + LinkedIn icons; full-screen mobile overlay menu
- Footer with huge `THANK YOU` typography
- Providers wrap app: Lenis, motion config, router outlet

---

## 10. Home Sections (Phase 1)

Order:

1. **Hero** — Massive `PORTFOLIO` behind centered portrait; name, title, tagline; View Projects + Download Resume; Available for Internship badge; mouse parallax; scroll parallax (bg type slower than foreground); slow portrait scale  
2. **About** — Editorial split; large `ABOUT`; bio + tech mentions; animated stats from `stats.ts`  
3. **Tech Marquee** — Infinite strip (repeat): JAVA, REACT, NODE, EXPRESS, MONGODB, MYSQL, SOCKET.IO, TAILWIND, GIT, GITHUB, DOCKER  
4. **Skills** — Category cards (Languages, Frontend, Backend, Database, Tools); lift + glow border hover  
5. **Featured Project** — Magazine layout for Chess Multiplayer; problem / solution / architecture; GitHub + Live Demo  
6. **Projects** — Alternating left/right cards: BidSphere, Financial Analysis Dashboard, AI Farmer Query Support, Inventory Management System; View Details → `/projects/:slug`  
7. **Experience** — Vertical timeline (Bluestock Internship — Backend Developer)  
8. **Education** — Minimal editorial cards (placeholder college/degree/year)  
9. **Coding Profiles** — GitHub, LeetCode, LinkedIn, Codeforces, HackerRank (data-driven stats placeholders)  
10. **Contact** — Large CTA `LET'S BUILD SOMETHING AMAZING.`; split form + socials/location; EmailJS  
11. **Footer** — Huge `THANK YOU`; Made with React; © Meet Phulwani  

---

## 11. Responsiveness

| Breakpoint intent | Behavior |
|---|---|
| Desktop | Full editorial, custom cursor, magnetic buttons, parallax |
| Tablet | Balanced spacing; simplified parallax |
| Mobile | Native-app feel; stacked layouts; full-screen nav; no custom cursor |

Never merely shrink desktop layouts. Responsive type and spacing scales required. No overflow / broken grids.

---

## 12. Accessibility & Performance

### 12.1 Accessibility

- Semantic HTML, keyboard navigation, visible focus rings
- ARIA labels where needed (nav, icon buttons, form fields)
- Respect `prefers-reduced-motion`

### 12.2 Performance Budget (hard requirements)

| Metric | Target |
|---|---|
| Initial JS bundle | **< 250KB gzipped** (excluding images) |
| Lighthouse Performance | **> 95** |
| Lighthouse Accessibility | **> 95** |
| Lighthouse Best Practices | **> 95** |
| Lighthouse SEO | **> 95** |
| CLS | Minimize / avoid layout shifts (stable image dimensions, font preload) |

**Implementation tactics (required):**

- Lazy load non-critical Home sections (below-the-fold) via dynamic import / intersection-triggered mount
- Lazy load project images (`loading="lazy"` + `ImageFrame` placeholders with reserved aspect ratio)
- Responsive images (`srcset` / appropriately sized assets; no oversized hero/project dumps)
- Preload display fonts (Bebas Neue / Anton) to prevent FOIT/FOUT-driven CLS
- `React.lazy` for routes (`ProjectCaseStudy`, etc.)
- Code-split heavy libs where practical; keep Framer Motion / Lenis usage lean
- Avoid unnecessary rerenders; memoize only where profiling justifies it
- Stable dimensions on media and skeleton/placeholder frames to protect CLS

### 12.3 SEO

Proper document title, meta description, semantic headings, Open Graph basics.

---

## 13. Implementation Workflow (phased)

Do **not** generate the whole project in one dump. Polish each phase before advancing:

1. Initialize Vite + React + TypeScript  
2. Configure Tailwind, fonts, theme tokens, Lenis, Framer Motion, React Router, global providers  
3. Build design system (tokens, primitives, motion variants)  
4. Create folder structure + centralized data files  
5. Build app shell (Loader, Navbar, Cursor, Scroll Progress, Footer)  
6. Implement Hero first; refine until premium  
7. Build remaining sections one by one via design system  
8. Wire placeholder `/projects/:slug`  
9. Full responsive pass  
10. A11y, performance budget verification (bundle size + Lighthouse gates), and code-quality pass  

### 13.1 Phase completion checklist (hard gate)

A phase is **not complete** until all of the following are verified:

- [ ] Responsive (desktop / tablet / mobile — no overflow, no broken layouts)
- [ ] Accessible (keyboard, focus, semantics, reduced-motion where applicable)
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] No console errors
- [ ] No hydration issues (CSR app: no SSR mismatch patterns; clean mount, no flash bugs from dual DOM assumptions)
- [ ] No duplicated styles (tokens + primitives only)
- [ ] Uses design system primitives
- [ ] Uses centralized `data/` (no hardcoded personal/project content in components)
- [ ] Animations are smooth and restrained

### 13.2 After each phase (development workflow)

1. Review code quality  
2. Refactor if necessary  
3. Remove unused code  
4. Ensure components remain reusable  
5. Keep commits logically grouped (one concern per commit / phase slice)

Do not start the next phase until the checklist and post-phase cleanup above are done.

---

## 14. Out of Scope (Phase 1)

- Fully written long-form case-study page content (structure + placeholder only)
- CMS / admin
- Light mode
- Backend beyond EmailJS
- Real GitHub contribution graph API (static/placeholder section data OK)
- Real LeetCode live API (placeholder stats OK)

---

## 15. Success Criteria

- Feels like a luxury product, not a template
- All content editable from `data/`
- Design-system-first; no style duplication
- Hero is showcase-quality
- Smooth, restrained motion with reduced-motion support
- No dead links for project details
- Fully responsive across desktop / tablet / mobile
- Production-ready TypeScript structure
- Initial JS bundle under 250KB gzipped (excluding images)
- Lighthouse Performance / Accessibility / Best Practices / SEO all > 95
- No meaningful CLS from images or fonts
- Zero TS errors, zero ESLint warnings, zero console errors at phase gates
- Design system + centralized data enforced throughout
- Commits stay logically grouped by phase (conventional milestone commits)
- §17 Engineering Rules followed (strict TS, tokens, CVA, image rules, docs)
- Final full review (§17.7) passed before calling production-ready

---

## 16. Decisions Log

| Decision | Choice |
|---|---|
| Content | Brief + placeholders for personal assets/links (option C) |
| Architecture | Hybrid (cinematic Home + future `/projects/:slug`) |
| Name | Meet Phulwani (real) |
| Case studies Phase 1 | Polished placeholder pages |
| Design system | Primitives-first with CVA |
| Scroll | Lenis |
| Contact | EmailJS (keys via `VITE_EMAILJS_*` env placeholders) |
| Primitive naming | `BodyText` + `Caption` (not generic `Text`) |
| Magnetic / custom cursor | Desktop only; off on touch and reduced-motion |
| Performance budget | Initial JS < 250KB gzipped (excl. images); Lighthouse all categories > 95; lazy sections/images; font preload; CLS-safe media |
| Phase gates | Responsive, a11y, zero TS/ESLint/console issues, no hydration bugs, design system + data-driven, smooth motion — required before next phase |
| Dev workflow | After each phase: review, refactor, remove dead code, preserve reusability, logical commits |
| Engineering rules | §17 is mandatory and overrides conflicting implementation shortcuts |

---

## 17. Engineering Rules (Mandatory)

These rules override all implementation decisions.

### 17.1 Code Quality

- Never use `any` unless absolutely unavoidable.
- Prefer strict TypeScript types.
- Prefer composition over inheritance.
- Keep components under ~200 lines where practical.
- Extract reusable logic into hooks.
- Never duplicate animation logic.
- Never duplicate layout logic.
- Never duplicate Tailwind class combinations — use CVA or reusable components.

### 17.2 State Management

- Use local React state where sufficient.
- Avoid unnecessary global state.
- Keep components as stateless as possible.
- Memoize only after profiling demonstrates a benefit.

### 17.3 Styling

- Design tokens are the single source of truth.
- No inline colors.
- No arbitrary spacing unless it becomes a reusable token.
- Maintain consistent spacing throughout the application.

### 17.4 Images

Every image must have:

- Reserved dimensions
- Explicit loading strategy
- Descriptive alt text
- Responsive sizing

### 17.5 Git

Every phase should represent one logical milestone.

Examples:

- `feat: initialize project architecture`
- `feat: implement design system`
- `feat: build hero section`
- `feat: build about section`
- `fix: responsive improvements`
- `refactor: optimize animation system`

### 17.6 Documentation

- Every reusable hook, provider, and utility should contain concise comments explaining its purpose.
- Complex animation logic should include a short explanation.

### 17.7 Final Review (production-ready gate)

Before the project is considered complete, perform one full review covering:

- Responsiveness
- Accessibility
- Performance
- Animation smoothness
- Code duplication
- Lighthouse
- Design consistency
- Type safety
- Bundle size
- Maintainability

Only after all checks pass is the project considered production-ready.
