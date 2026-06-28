# House of Piranha

Luxury brand landing page for **House of Piranha** — predatory elegance meets artisanal craft.

Built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Shopify Storefront API**, deployed via **Vercel** with a **GitHub Actions** CI/CD pipeline.

---

## Features

- **Dark gold luxury aesthetic** — custom Tailwind theme with obsidian backgrounds and gold accents, Playfair Display × Inter typography, animated gold shimmer effects
- **Waitlist form** — `POST /api/waitlist` endpoint with email validation; logs to stdout by default, with optional Klaviyo integration
- **Shopify integration** — fetches featured products via the Shopify Storefront GraphQL API; gracefully shows placeholder cards when not configured
- **Continuous deployment** — GitHub Actions pipeline (lint → type-check → build → deploy to Vercel on `main`)
- **Security headers** — X-Frame-Options, X-Content-Type-Options, XSS-Protection, Referrer-Policy, and Permissions-Policy set via `vercel.json`

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10

### Local development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env.local
# Edit .env.local and fill in your values (see below)

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Required | Description |
|---|---|---|
| `SHOPIFY_STORE_DOMAIN` | No | Your Shopify store domain, e.g. `your-store.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | No | Shopify Storefront API access token |
| `KLAVIYO_PRIVATE_API_KEY` | No | Klaviyo private API key for waitlist emails |
| `KLAVIYO_LIST_ID` | No | Klaviyo list ID to subscribe waitlist entries to |
| `NEXT_PUBLIC_SITE_URL` | No | Production URL for canonical/OG metadata |

All variables are **optional for local development**. The app renders placeholder product cards when Shopify is not configured and logs waitlist entries to stdout when Klaviyo is not configured.

---

## Shopify Setup

1. In Shopify Admin, go to **Apps → Develop apps**.
2. Create a new app and enable the **Storefront API** with `unauthenticated_read_product_listings` scope.
3. Copy the **Storefront access token** to `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.
4. Set `SHOPIFY_STORE_DOMAIN` to your `.myshopify.com` domain.

---

## Deployment

### Vercel (recommended)

1. Import the repository into [Vercel](https://vercel.com).
2. Add your environment variables in the Vercel project settings.
3. Pushes to `main` are automatically deployed.

### GitHub Actions CI/CD

The workflow at `.github/workflows/deploy.yml` runs on every push and PR:

1. **Lint & Type Check** — ESLint + `tsc --noEmit`
2. **Build** — `next build`
3. **Deploy** — deploys to Vercel production (on `main` pushes only)

Add these secrets to your GitHub repository (**Settings → Secrets → Actions**):

| Secret | Description |
|---|---|
| `VERCEL_TOKEN` | Vercel personal access token |

The Vercel CLI picks up `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` from the `.vercel/` directory created by `vercel pull`.

---

## Project Structure

```
├── app/
│   ├── api/waitlist/route.ts   # POST /api/waitlist
│   ├── globals.css             # Tailwind v4 theme + global styles
│   ├── layout.tsx              # Root layout (fonts, metadata)
│   └── page.tsx                # Landing page (async, fetches Shopify products)
├── components/
│   ├── Navbar.tsx              # Sticky header with mobile menu
│   ├── Hero.tsx                # Full-screen hero section
│   ├── ProductGrid.tsx         # Shopify product cards / placeholder cards
│   ├── About.tsx               # Maison / brand story section
│   ├── WaitlistForm.tsx        # Email capture form
│   └── Footer.tsx              # Links, social, copyright
├── lib/
│   └── shopify.ts              # Shopify Storefront API client
├── types/
│   └── shopify.ts              # TypeScript types for Shopify data
├── .env.example                # Environment variable template
├── .github/workflows/
│   └── deploy.yml              # CI/CD pipeline
├── vercel.json                 # Vercel config & security headers
└── next.config.ts              # Next.js config (Shopify image domain)
```

---

## License

[MIT](LICENSE)
