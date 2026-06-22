# KEROMA — Recipes that remember.

> African heritage recipe intelligence. A heritage-modern platform that turns what's in your kitchen into real food, with the cultural context that makes it worth making.

---

## What's here

A Next.js 15 full-stack application with:

- **Marketing site** — home, recipes library, recipe detail (with JSON-LD + SEO), AI discover page, about, pricing, blog (with 4 long-form articles)
- **App** — authenticated dashboard, pantry management, saved recipes, account
- **Auth** — email magic link + Google OAuth (NextAuth.js v5 ready)
- **AI core** — multi-provider recipe generation with zod-validated output, fallback chain (Anthropic → OpenAI → Google → mock), streaming-ready
- **M-Pesa payments** — IntaSend STK push integration (scaffold)
- **PWA-ready** — installable on mobile, offline-capable for saved recipes (v2)
- **Design system** — Fraunces (display) + Inter (body) + JetBrains Mono, full brand token system, dark mode

See `BRAND.md` for the complete design spec.

---

## Quick start

```bash
# Install
npm install

# Copy environment template
cp .env.example .env.local
# Edit .env.local — at minimum, set KEROMA_AI_MOCK=true to start without API keys

# Dev server (port 3005)
npm run dev
# Open http://localhost:3005

# Production build
npm run build
npm start

# Type check
npm run type-check
```

---

## Environment

The site is fully functional out of the box **without any API keys** — it falls back to a mock recipe generator (`KEROMA_AI_MOCK=true` is the default). Add keys to enable real AI:

| Variable | Purpose | Required? |
|---|---|---|
| `MONGODB_URI` | Database | Optional (mock uses in-memory) |
| `NEXTAUTH_SECRET` | Auth signing | Optional in dev |
| `NEXTAUTH_URL` | Auth callback | Optional in dev |
| `ANTHROPIC_API_KEY` | Primary AI (Claude 3.5 Sonnet) | Optional — falls back to mock |
| `OPENAI_API_KEY` | Secondary AI | Optional |
| `GOOGLE_GENERATIVE_AI_KEY` | Tertiary AI | Optional |
| `REPLICATE_API_TOKEN` | Hero image generation | Optional (SVG gradient fallback) |
| `INTASEND_PUBLISHABLE_KEY` + `INTASEND_SECRET_KEY` | M-Pesa payments | Optional (paywall disabled) |
| `RESEND_API_KEY` | Transactional email | Optional (logged to console) |
| `CLOUDINARY_*` | Image CDN | Optional (local `/public`) |
| `KEROMA_AI_MOCK=true` | Force mock mode | Default |

---

## Project structure

```
keroma/
├── app/
│   ├── (marketing)/            ← public marketing routes
│   │   ├── page.tsx             ← home
│   │   ├── recipes/page.tsx
│   │   ├── recipes/[slug]/page.tsx
│   │   ├── discover/page.tsx
│   │   ├── about/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   └── layout.tsx
│   ├── (auth)/                 ← /login, /register
│   ├── app/                    ← /app/* (authenticated)
│   │   ├── page.tsx             ← dashboard
│   │   ├── pantry/page.tsx
│   │   ├── saved/page.tsx
│   │   ├── account/page.tsx
│   │   └── layout.tsx
│   ├── api/ai/generate/route.ts ← streaming AI generation
│   ├── globals.css
│   ├── layout.tsx
│   └── not-found.tsx
├── components/
│   ├── brand/Logo.tsx
│   ├── layout/MarketingHeader.tsx, MarketingFooter.tsx
│   └── ui/Button.tsx, Input.tsx, Chip.tsx
├── lib/
│   ├── ai/
│   │   ├── providers.ts         ← Anthropic / OpenAI / Google / mock
│   │   ├── prompts.ts            ← system prompts
│   │   ├── schemas.ts            ← zod schemas
│   │   └── index.ts              ← generateRecipes() with fallback
│   ├── data/recipes.ts           ← 12 seed recipes
│   ├── fonts.ts
│   └── utils.ts
├── public/
├── BRAND.md                     ← design system spec
├── LICENSE                      ← MIT
└── DEPLOY.md                    ← VPS deployment guide
```

---

## Roadmap

### Shipped (v1)
- [x] Full marketing site (home, recipes, discover, about, pricing, blog)
- [x] 12 curated recipes with JSON-LD
- [x] 4 long-form blog articles
- [x] App dashboard, pantry, saved, account
- [x] AI generation API with multi-provider fallback
- [x] Auth flows (UI shell, NextAuth integration ready)
- [x] Design system (Fraunces + Inter + JetBrains Mono, full token system)
- [x] Dark mode
- [x] SEO (sitemap-ready, JSON-LD Recipe schema)
- [x] A11y (focus rings, aria labels, reduced motion, 44px touch targets)
- [x] Security headers (CSP-ready, HSTS-ready)

### To wire (needs API keys)
- [ ] Real AI: `ai` + `@ai-sdk/*` packages, replace mock in `lib/ai/index.ts`
- [ ] NextAuth v5 with MongoDB adapter
- [ ] IntaSend STK push for premium
- [ ] Cloudinary image uploads
- [ ] Replicate Flux hero image generation
- [ ] Resend transactional emails (welcome, weekly digest)

### v2
- [ ] PWA install + offline recipe browsing
- [ ] Cook mode with inline timers + portion scaling
- [ ] Meal planning calendar
- [ ] Shopping list auto-generation
- [ ] Recipe sharing + community ratings
- [ ] Multilingual (Swahili, French, Amharic)
- [ ] Voice input for pantry
- [ ] Image-based pantry recognition

---

## Deploy

See [DEPLOY.md](./DEPLOY.md) for full VPS deploy guide (Docker + Nginx + GitHub Actions).

Quick target:
- **URL**: `https://keroma.ementech.co.ke`
- **Server**: `baitech-vps` (69.164.244.165)
- **Port**: 3005
- **Process manager**: PM2
- **CI**: GitHub Actions (push to `main` → build Docker → deploy)

---

## License

MIT — see [LICENSE](./LICENSE).

KEROMA is a brand of [EMENTECH — Emen Engineering](https://ementech.co.ke), Nairobi, Kenya.