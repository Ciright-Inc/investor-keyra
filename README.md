# investors.keyra.ie

Secure institutional investor prospect and capital engagement platform for **Keyra** and **Ciright**.

## Architecture

- **No local databases** — all persistence via Ciright Core / Keyra Core APIs
- **Shared IDs** — `prospect_id`, `investor_id`, `person_id`, `content_asset_id`, etc.
- **New prospects only** — active investors transition to `ir.keyra.ie` and `crm.keyra.ie`

### Connected applications

| App | Role |
|-----|------|
| `info.keyra.ie` | Deck & intelligence library |
| `esig.keyra.ie` | NDA, SAFE, SPA execution |
| `crm.keyra.ie` / `prospects.keyra.ie` | Lead sync & attribution |
| `auth.keyra.ie` | Identity |
| `core.ciright.com` | Core entities |

## Stack

- Next.js 16 (App Router)
- React 19, TypeScript
- Tailwind CSS 4
- Framer Motion

## Getting started

Requires **Node.js 20.9+** (Next.js 16 requirement).

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Routes

| Path | Description |
|------|-------------|
| `/` | Institutional landing |
| `/register` | 5-step investor onboarding |
| `/dashboard` | Private intelligence dashboard |
| `/dashboard/content` | Materials library |
| `/dashboard/data-room` | Secure diligence room |
| `/dashboard/workflows` | NDA, meetings, interest |

## API integration

Server routes proxy to Core APIs (see `src/lib/api/`). Set `KEYRA_DEMO_MODE=true` for local UI development without Core connectivity.

## Design

Dark premium institutional UI (master application prompt). Typography and component patterns adapted from the Keyra design system (`designd.md`) with investor-portal-specific tokens in `src/app/globals.css`.
