# QUELL Skincare — Project Context

## Brand
- **Name:** QUELL (pronounced "Kwel")
- **Tagline:** "End the dryness."
- **Positioning:** India's first hard-water defense skincare brand
- **Target audience:** Indian consumers (Gen Z / millennials) dealing with hard water, AC dryness, seasonal extremes
- **Brand tone:** Clean, clinical, confident, minimal. Not fluffy or over-hyped.

## Design System
- **Palette:** Warm off-white background (#FAF7F2), deep charcoal text (#1A1A1A), terracotta accent (#C17A5A), soft cream secondary (#F0EBE3)
- **Typography:** Cormorant Garamond (headings, editorial), Inter (body, UI)
- **Style:** Luxury minimal — lots of whitespace, clean lines, no clutter

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Language:** TypeScript
- **Hosting:** Vercel

## Features Being Built
1. Product catalog / listings
2. Shopping cart & checkout
3. User accounts / login
4. Admin dashboard

## Key Pages
- `/` — Homepage (hero, bestsellers, brand story, ingredients)
- `/products` — Full product catalog
- `/products/[slug]` — Product detail page
- `/cart` — Cart
- `/checkout` — Checkout
- `/account` — User account
- `/login` — Auth
- `/admin` — Admin dashboard

## Product Lines (SKUs)
- Hard Water Defense Moisturizer
- Ceramide Barrier Repair Serum
- Gentle Chelating Cleanser
- Mineral Shield SPF 50

## Notes
- DB choice is TBD — use mock/static data for now
- All product data lives in `lib/products.ts` as mock data
