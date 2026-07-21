# Meet Phulwani Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an award-worthy hybrid portfolio for Meet Phulwani — cinematic Home at `/` plus future-ready `/projects/:slug`.

**Architecture:** Design-system-first React + Vite + TypeScript SPA. Centralized `data/`, CVA primitives, Framer Motion presets, Lenis smooth scroll, React Router with lazy case-study route. Spec: `docs/superpowers/specs/2026-07-18-meet-phulwani-portfolio-design.md`.

**Tech Stack:** React, Vite, TypeScript, TailwindCSS, CVA, Framer Motion, Lenis, React Router, React Icons, EmailJS.

## Global Constraints

- Follow design spec v1.0 exactly unless a deviation is explained first
- Dark mode only; tokens `#090909` / `#111111` / `#171717` / `#FAFAFA` / `#A0A0A0` / `#E11D2E` / `#22C55E` / border `rgba(255,255,255,.08)`
- No hardcoded personal content — all in `src/data/`
- Initial JS < 250KB gzipped (excl. images); Lighthouse all categories > 95
- Phase gates: responsive, a11y, zero TS/ESLint/console errors, design system + data-driven, smooth motion
- One phase at a time; wait for user approval between phases
- Conventional commits per milestone (`feat:`, `fix:`, `refactor:`)
- No `any` unless unavoidable; components ~200 lines; no inline colors

---

## Phase 1 — Project Initialization

**Files:** Vite scaffold, `tailwind.config.ts`, `src/styles/globals.css`, `src/theme/*`, `src/providers/*`, `src/routes/*`, `src/lib/cn.ts`, `tsconfig` paths, empty architecture folders, minimal `App.tsx`/`main.tsx` (no section UI).

- [x] Scaffold Vite React-TS in repo root
- [x] Install deps: tailwind, framer-motion, lenis, react-router-dom, react-icons, class-variance-authority, clsx, tailwind-merge, @emailjs/browser
- [x] Configure path aliases (`@/` → `src/`)
- [x] Configure Tailwind + CSS variables + font preload hooks
- [x] Wire providers (SmoothScroll, Motion) and Router shell
- [x] Create folder architecture from spec (empty barrels/placeholders as needed)
- [x] Verify `tsc` + ESLint clean; commit `feat: initialize project architecture`

**Stop for approval.**

---

## Phase 2 — Design System

- [ ] Motion presets in `src/animations/`
- [ ] Typography, layout, UI, cards, effects primitives listed in spec
- [ ] Verify a11y/responsive of primitives; commit `feat: implement design system`

**Stop for approval.**

---

## Phase 3 — App Shell

- [ ] Loader, Navbar, MobileMenu, ScrollProgress, CustomCursor, Footer
- [ ] Routing wired; still no Home sections; commit `feat: build application shell`

**Stop for approval.**

---

## Phase 4 — Hero Only

- [ ] Hero section + data wiring; refine motion/parallax until premium
- [ ] Commit `feat: build hero section`

**Stop for approval.**

---

## Phases 5+ — Remaining Sections (one at a time)

Order after Hero: About → Marquee → Skills → Featured Project → Projects → Experience → Education → Coding Profiles → Contact → Footer polish → `/projects/:slug` placeholder → responsive pass → performance/a11y final review.

Each section is its own phase with approval gate and logical commit.

---

## Final Review Gate

Full review per spec §17.7 before calling production-ready.
