# DocketWorks website

Marketing / pitch site for **DocketWorks**. Astro 6 (SSR via `@astrojs/node`,
standalone) + Tailwind v4 + Preact. Runs under PM2 (`ecosystem.config.cjs`),
deployed via `deploy/deploy.sh`.

Design spec: `docs/superpowers/specs/2026-05-12-docketworks-website-design.md`.

## Develop

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # → ./dist/
pnpm preview    # preview the build
pnpm test       # run the unit tests (Vitest)
pnpm astro check
```

Without a `.env` the site still runs in dev — forms log instead of sending, the
demo link is a dummy, etc. (see `src/lib/env.ts`). In production every variable
below is required.

## Configuration (`.env`)

Copy `.env.example` to `.env` and fill in. All server-side only — never exposed
to the browser.

| Variable | What it's for |
| --- | --- |
| `OPERATOR_EMAIL` | Where lead notifications go; the "email us directly" address shown on form errors |
| `EMAIL_PROVIDER` | `resend` or `postmark` |
| `EMAIL_API_KEY` | API key for the chosen email provider |
| `EMAIL_FROM` | From-address for outgoing mail (verified sender) |
| `SHARED_DEMO_URL` | Address of the always-on shared demo site |
| `SHARED_DEMO_USERNAME` | Login for the shared demo |
| `SHARED_DEMO_PASSWORD` | Password for the shared demo |
| `SCHEDULER_EMBED_URL` | Embed/booking link for the "book a walkthrough" scheduler (Cal.com or Calendly) |

## Project layout

```
src/
  layouts/BaseLayout.astro     # <head>, header, footer
  components/
    Header.astro  Footer.astro
    DemoForm.tsx               # Preact island — the live-demo form
    ui/                        # Button, Card, SectionWrapper
    sections/                  # Hero, QuestionList, Stat, FeatureRow, FromYourSetup,
                               #   ChecklistBlock, FitBlock, PriceBlock, FounderNote,
                               #   VideoEmbed, CtaBand
  pages/
    index.astro  how-it-works.astro  who-its-for.astro  compare.astro
    pricing.astro  demo.astro  privacy.astro  terms.astro  404.astro
    api/demo/shared.ts          # POST — lead capture + hand out the demo login
  lib/
    env.ts                      # server-side config
    email.ts                    # transactional email (provider-agnostic)
public/                         # static assets; see public/ASSETS.md for placeholders
docs/superpowers/specs/         # the design spec
reference/                      # voice / positioning source material
```

## Styling

Design tokens live in `src/styles/global.css` (`@theme`): `primary-*` (slate),
`accent-*` (amber), Inter, a major-third (1.25) type scale, `--max-w-site:
1200px`. Use the existing `ui/` and `sections/` components; only add tokens if a
section genuinely needs one.

## Copy rules (enforced — see the spec)

- **Plain language only.** Audience is tradespeople / owner-operators, not
  software people. No "opinionated / configurable / instance / sandbox / API /
  endpoint / deploy / scrape / SOP / kanban …" in user-facing copy or component
  names.
- **No "free", "reference site", "early-customer offer"** or similar
  commercial-inducement language.
- **Never disparage a competitor.** No "vs X". WorkGuru is never named.
  WorkflowMax appears only in Corrin's own evaluation anecdote. Asana/Monday may
  be named only as a generous "use that instead if your problem is …".
- **Names:** MSM may be named. DanMade / Haute Design / GeoPro may **not** be
  named until they sign a reference-site agreement — described by type until then.
