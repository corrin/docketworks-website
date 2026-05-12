# DocketWorks website — design

Date: 2026-05-12
Status: approved (pending written-spec review)

## Purpose

A small marketing/pitch site for **DocketWorks**, whose current job is to win
**early customers**: businesses that get the product free for as long as they act
as a reference site, in exchange for having the system reshaped around their
business. The site needs to get a prospect to "yes, worth a conversation" — the
real pitch happens on a call. The retail price ($40/staff member/month) is shown
so an early customer can see plainly what the arrangement is worth.

Audience: a small number of warm-ish prospects (intros, referrals) running
businesses that look like Morris Sheetmetals (MSM) — see "Who it's for".

Out of scope: self-serve signup, billing/checkout, a customer portal, blog/CMS.

## Positioning & voice

- **What it is:** workflow software for businesses that quote and deliver custom,
  one-off jobs, where the real product is people's billable hours. Built around
  MSM; now taking on early customers.
- **The differentiator:** *customised, not flexible.* Shaped to one way of running
  the business, baked into every screen — fast, no fluff, every field there for a
  reason. The trade-off: flexible tools let users configure around mismatches;
  DocketWorks needs the developer to fix them in code. For an early customer, that
  reshaping is the deal.
- **Voice:** plain, direct, lightly self-deprecating — the voice of the reference
  letters, dialled back one notch. **Honest-but-lighter:** we say it's early and
  shaped around one shop, we name the near-term roadmap; we don't enumerate every
  wart (that's the call).
- **Name:** "DocketWorks" (camel-case) everywhere, including titles, copy, and
  components. Update the existing scaffold's "Docketworks".
- **The kitchen metaphor:** orders go on dockets, dockets get passed to the
  stations, no single order is complex — the dockets exist for orchestration.
  That's the model: DocketWorks isn't there to manage one job, it's there to help
  with the juggling. Use this in the hero and where it helps.

## Sitemap

Six content pages plus two thin legal pages:

1. `/` — **Home**
2. `/how-it-works` — **How it works**
3. `/who-its-for` — **Who it's for** (fit + the early-customer offer)
4. `/compare` — **How we compare** (the "lenses")
5. `/pricing` — **Pricing**
6. `/demo` — **Get a demo** (instant shared demo + book a call + request your own instance)
7. `/privacy`, `/terms` — thin, footer-only

Header nav: How it works · Who it's for · Compare · Pricing · **[Get a demo]** (accent button).
Footer: real sitemap; drop the current "ERP for trade & service businesses" line (wrong positioning).

The current `index.astro` design-system / token showcase is **dropped** (not kept as `/styleguide`).

## Page content

### 1. Home `/`
- **Hero:** one-line what-it-is + the kitchen-dockets line. Primary CTA *Get a demo*; secondary *See how it works*.
- **The hard part:** "The hard part isn't any one job — it's keeping a clear head across dozens at once." Followed by the four concrete questions: hours of billable work done each day last week? enough work in the pipeline to keep the team busy? a client just rang — when's their job done? someone broke their arm — how do we reassign their jobs and what does that do to delivery dates?
- **Customised, not flexible** block — the core idea, including the WorkflowMax "couldn't enter a job into it faster than I could write it on paper" anecdote as the concrete story.
- **How it works in 30 seconds:** timesheet → gets the staff member paid *and* logs time against a job; PO → orders the material *and* logs the cost against a job; plus reports, scheduling, supplier price-sheet scraping under the hood. Link to `/how-it-works`.
- **Founder note (short):** "I own a sheet metal shop. I built DocketWorks for us. It's good enough now that customer #2 makes sense." Link to `/who-its-for`.
- **Demo video** embed (or poster + "watch the ~3-min tour"). Asset placeholder.
- **Closing CTA band** → `/demo`.

### 2. How it works `/how-it-works`
- **Product shape:** a Trello-like board, plus tabs (drawings, etc.). Screenshot placeholder.
- **Workflow** — "the strongest part of the system." Board, job states, due dates, reassignment. Screenshot.
- **Timesheets & POs** — the two-birds mechanic, in detail. Screenshots.
- **Quoting** — honest "it's OK": supplier price sync (knows what things cost), AI chatbot to help draft quotes, refine quotes / view old revisions, counter for days a quote has sat waiting on customer feedback. "Functional, not what I'd call polished." Screenshot.
- **Reports & scheduling** — the visibility a whiteboard never gave: billable-hours trends, quote acceptance rate, % of time billed, pipeline health. Screenshot.
- **Embedded demo video.**
- CTA → `/demo`.

### 3. Who it's for `/who-its-for`
- **Fit checklist** (built around how MSM works — the closer the business looks to MSM, the better the fit):
  - Around 15 staff
  - The product is people's hours, even when the invoice says fabrications / reports / custom installations
  - Each job custom; no repeating-the-same-product cost-down
  - A couple of thousand jobs a year, so efficiency of data entry matters
  - Separate accounting (Xero); DocketWorks isn't a ledger
  - Materials sold near cost; profit's in the hours
  - Roughly one active job per staff member, mostly self-contained
  - "Every business deviates somewhere; the further off, the more the fit gets questionable."
- **The early-customer offer:** free for as long as you act as a reference site
  (we point prospective customers your way, you take the occasional call about how
  it's going); retail intent is **$40/staff member/month** so the dollar value is
  real; the bigger upside — the system gets shaped around *your* business, real
  input on what gets built next.
- **Honest-but-lighter:** it's early; parts of the system still assume how MSM
  works, and reshaping takes time; more bugs than software sold to thousands —
  flip side is a direct line to the developer. Then the near-term **roadmap**
  (things that exist in the system but aren't production-grade yet at MSM's
  "faster than paper" bar): mobile/tablet timesheets, **leads / pre-sales tracking
  (coming soon)**, smarter handling of repeat jobs, GPS/site-location features, AI
  for quoting and SOP-following. Wanting one of these is the fastest way to get it
  finished. (Short list, framed as roadmap — not a confession.)
- CTA → `/demo`.

### 4. How we compare `/compare` — the "lenses"
Short intro — "here's DocketWorks next to the things you might already be weighing"
— then a section per lens, each a couple of honest sentences (not a feature-grid
war):
- **vs WorkGuru** — the closest direct comparison: fabrication-focused,
  Xero-integrated, similar pricing. WorkGuru is configurable to many ways of
  working; DocketWorks commits to one.
- **vs WorkflowMax** — time-and-billing for professional services; overlaps on
  "hours are the product" but DocketWorks is built around shop-floor job flow, not
  just T&B.
- **vs Trello / Monday / Asana** — great at one project's depth; DocketWorks is
  built for juggling dozens of small, mostly self-contained ones, with timesheets
  and POs wired into the jobs.
- **Leads / CRM — on the roadmap, not here yet.** Lead and pre-sales tracking is
  coming soon; today MSM still does it in a Google sheet. If your bottleneck right
  now is managing leads, that part isn't built yet — it's next.
- **Accounting — not our job, by design.** Xero/MYOB stays the ledger; DocketWorks
  feeds it. We are not trying to add accounting.
- (Optional one-liner: JobBoss-style ERPs wrap accounting + inventory around jobs —
  a different, heavier animal.)
- CTA → `/demo`.

### 5. Pricing `/pricing`
- Headline price stated plainly: **$40 per staff member / month.** What's included:
  everything — no add-on modules (contrast with WorkGuru's separately-priced stock
  module); Xero integration included.
- Directly beneath: **the early-customer arrangement** — "Right now I'm taking on a
  small number of early customers free, in exchange for acting as a reference site.
  The $40 is what it costs everyone else — so you can see exactly what the
  arrangement is worth." → `/demo`.
- No checkout, no plan tiers.

### 6. Get a demo `/demo`
Three ways to see it, on one page, in this priority order:

- **Option A — instant: the shared demo.** A short form: name, business name, team
  size, what you use now, email. On submit, the visitor is shown — and emailed —
  the always-on shared demo site's URL and login. v1: a single fixed shared account
  on `demo.docketworks.site` (exact host TBD with operator); the form is lead
  capture + instant gratification. The shared-demo credentials are configured
  server-side (env), not committed.
- **Option B — book a call.** Embedded scheduler (Cal.com or Calendly — operator
  picks; just an embed/link) for a live walkthrough with Corrin.
- **Option C — request your own demo instance.** A longer form capturing what
  `instance.sh create` can take from a prospect: desired sub-name (becomes
  `<client>-uat.docketworks.site`, validated lowercase alphanumeric), whether to
  seed sample data, and contact details. **This does not self-provision** —
  provisioning needs Xero app + GCP credential setup that only the operator can do
  (see `../docketworks/scripts/server/instance.sh prepare-config`). The form
  notifies the operator with all captured fields and a ready-to-edit summary; the
  operator completes the credentials file and runs
  `instance.sh create <client> uat --seed`, then sends the link. The website's job
  ends at "capture + notify"; running `instance.sh` is an operator step.

**Form handling:** each form `POST`s to an Astro server endpoint under
`src/pages/api/`. The endpoint validates input and sends an email to the operator
via a transactional email service (Resend or Postmark — operator picks; API key in
env). Option A's endpoint also returns the shared-demo URL + login to the page for
immediate display, and emails it to the visitor. No database in v1 (email is the
record of record); a future row-store is a possible later addition. Astro already
runs in `standalone` Node mode under PM2, so server endpoints are straightforward.
Basic anti-spam: a honeypot field and minimal rate limiting; no third-party
captcha in v1.

## Architecture / build

- **Stack:** keep the existing Astro 6 + Tailwind v4 + Preact + `@astrojs/node`
  (standalone) scaffold and the existing slate/amber design system (`Inter`,
  Major-Third type scale, `Button`, `Card`, `SectionWrapper`). No new framework.
- **Pages:** one `.astro` file per route under `src/pages/`. API routes under
  `src/pages/api/`.
- **Components:** add focused, reusable section components, e.g. `Hero`,
  `FeatureRow` (text + screenshot, alternating sides), `CtaBand`, `CompareItem`,
  `ChecklistBlock`, `PriceBlock`, `DemoForm` (Preact island for client-side
  validation + submit states), `VideoEmbed`, `Stat`/`QuestionList`. Keep each
  component single-purpose and small.
- **Layout:** keep `BaseLayout`; update its default `<title>`/`description` to the
  new positioning. Update `Header` nav links and `Footer` link columns to the real
  sitemap; remove the "ERP for trade & service businesses" copy.
- **Assets:** build text-first. Product screenshots and the demo video are
  placeholders (clearly-marked) until supplied; nothing in the build blocks on
  them. Put placeholders in `public/` with obvious names.
- **Config/secrets via env** (read server-side only): email-service API key,
  operator notification address, shared-demo URL + login, scheduler embed
  URL/handle. Document them (e.g. in `README.md` / `.env.example`).
- **No analytics / cookie banner in v1** unless the operator asks (keeps `/privacy`
  trivially accurate).
- **Legal pages:** short placeholder Privacy and Terms; flesh out later.

## Interfaces (the units and how they connect)

- **Static pages** → render content, link to `/demo`. Depend on layout + section
  components only.
- **`DemoForm` island** → renders one of the three forms; on submit `POST`s JSON to
  the matching API route; shows pending/success/error states; on Option A success,
  displays the returned demo URL + login.
- **`POST /api/demo/shared`** → validate → email operator (lead) + email visitor
  (demo creds) → respond `{ url, username, password }` (creds pulled from env).
- **`POST /api/demo/call`** → (only if a form precedes the scheduler; if the
  scheduler is a pure embed, this may not be needed) validate → email operator.
- **`POST /api/demo/instance`** → validate (including sub-name regex
  `^[a-z0-9]+$`) → email operator with all fields + a copy-pasteable summary
  referencing `instance.sh create <client> uat [--seed]`.
- **Email service** → wrapper module (`src/lib/email.ts` or similar) so the
  provider choice is isolated behind one function.
- **`instance.sh`** (in the `docketworks` repo) → *not called by this site.* The
  contract is one-directional and human: the site emails the operator the inputs;
  the operator runs the script. No code dependency between the repos.

## Error handling

- Form validation client-side (immediate feedback) and server-side (authoritative);
  server rejects with a clear JSON error the island surfaces inline.
- If the email service call fails, the API route returns a 5xx and the island shows
  "couldn't send — try again or email us directly at <operator address>"; for
  Option A it still shows the demo URL + login (those don't depend on email).
- Honeypot-tripped submissions get a fake-success response and are dropped.
- 404 page consistent with the design system.

## Testing

- Build must pass (`pnpm build`) with no broken internal links.
- Manual/dev pass on each page at mobile and desktop widths.
- API routes: unit-test validation (good input, bad input, honeypot, sub-name
  regex) and that the email wrapper is called with the right payload (mock the
  provider). Option A: assert the response includes the env-configured creds.
- A quick "does the copy match the positioning" read-through against this spec
  before launch.

## Open items deferred to implementation

- Exact shared-demo host and credentials → operator supplies.
- Resend vs Postmark; Cal.com vs Calendly → operator picks; both isolated behind a
  thin wrapper / single env var so the choice is cheap to change.
- Whether Option B needs a pre-form or is a bare scheduler embed.
