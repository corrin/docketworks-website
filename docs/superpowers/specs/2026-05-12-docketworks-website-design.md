# DocketWorks website — design

Date: 2026-05-12
Status: revised v3 — plain-language rule + persona through-line; pending review

## Purpose

A small marketing/pitch site for **DocketWorks**, whose job right now is to win
**early customers**: a handful of businesses that look like Morris Sheetmetals
(MSM) and would run their shop on it. The site's only goal is to get a prospect
to *"yes, worth a look"* — either trying the live demo themselves or booking a
call. The real pitch happens later.

The site is structured like **a conversation with a business owner whose place is
getting away from them** — not like a product tour. It opens on their problem,
proves the answer by showing who built it (and what it changed for them), then
gets out of the way.

**Who this is really for — and the bet behind the whole site.** Not "sheet metal
shops" specifically. It's the person who *came up doing the work, built a
reputation for top-quality custom jobs, grew the business, and is now at risk of
drowning in admin and losing their grip on the numbers.* Corrin's read is that
this is one pattern, not a one-off: a cabinetmaker who scaled on a name for top
work (DanMade — builds kitchens); a superyacht fit-out / interiors firm (Haute
Design); an engineering / geotech outfit started by a grad who was good with
clients and grew (GeoPro); and MSM itself ("my GM might be brilliant, but the
place falls apart when he's not there"). Four versions of the same story — and
the bet is **there are more**, and the site is fishing for them. The common
enemy: the business getting away from you as it grows; too much admin just to
*see* what's going on; the place wobbling when one key person is on leave.

The reason an early customer says yes isn't a discount — it's *who built it*:
DocketWorks is the system a working sheet metal shop built to run itself, and
runs every day. Not vaporware, not an outsider's idea of how the trade works.
That's the credibility the site leads with. The price ($40/staff member/month)
is stated plainly as *the* price — no asterisk, no "but for you…".

Audience: a small number of warm-ish prospects (intros, referrals) fitting that
pattern — see "Who it's for". Most of them are running their shop on paper, a
whiteboard, a spreadsheet, Xero, or Trello today — *not* on another job
system.

Out of scope: self-serve signup, billing/checkout, a customer portal, blog/CMS.
**Also out of scope: any "free", reference-site, or partner-program messaging on
the site** — whatever arrangement Corrin offers a particular early customer is a
conversation, not a webpage. **Also out of scope: any disparagement of another
tool** — the site never sets up a "vs WorkGuru/WorkflowMax/Trello" and never says
another product is worse; where it mentions another tool at all, it's to *send
the right person there* ("if your problem is X, honestly, use that") — generous,
not negative.

## Plain-language rule (no IT jargon on the site)

**The customers are tradespeople and owner-operators who built a business — not
software people. Every word of site copy must read that way.** Short words,
concrete things, zero software-industry vocabulary.

This spec itself is a working document — it uses precise technical terms where
that's useful (in *Architecture*, *Interfaces*, *Error handling*, *Testing*).
**Those terms are shorthand for the builder, not model copy.** Nothing from a
build-internal section gets pasted onto a page.

Banned from the finished site (non-exhaustive): *opinionated, configurable /
configuration, instance, sandbox, provision, UAT, endpoint, API, deploy, scrape,
SOP, kanban, token / design system, honeypot, rate limit, database / row-store.*
"Integration" → say "works with". "Workflow" → avoid; say "how a job moves
through the shop" / "keeping every job moving". Component names should be
jargon-free too (they leak into copy decisions): no `OpinionatedBlock`.

Say-this-not-that:
- "your own instance, seeded with your data" → **"your own copy of the system,
  set up with your jobs in it"**
- "we provision it" → **"we set it up for you"**
- "scrapes supplier price sheets" → **"keeps your suppliers' price lists up to
  date for you"**
- "Xero integration" → **"works with Xero"**
- "configurable" → **"switches and settings to fiddle with"**
- "the workflow engine / pipeline" → **"the board"**, **"where every job's at"**

Keep trades-native words that *are* plain: billable hours, pipeline (as in
"work in the pipeline"), quote, PO, job, the board (Trello's well known). Any
section of this spec that drafts near-final wording (the four questions, the
pricing line, the demo-page copy) already obeys the rule.

## Positioning & voice

- **What it is:** software for businesses that quote and deliver custom, one-off
  jobs, where the real product is people's billable hours. Built around MSM; now
  offered to other shops with the same story.
- **The differentiator (described, never labelled "opinionated" on the site).**
  DocketWorks already knows how a shop like this runs — it's baked into every
  screen. So it's quick, there's nothing to set up, no settings to fiddle with,
  every field is there because the job needs it. The honest other side — and it
  belongs on the site — is the fit caveat: DocketWorks isn't trying to be the
  best job software for *most* shops; it's the best one *if* your shop runs this
  way. If your shop works in a fundamentally different way, a tool with more
  switches will probably suit you better, and we'd rather say so early than waste
  your time. (Internal note for the builder: the underlying mechanic is "it's
  opinionated; a tool built to fit everyone can't be fast at any one thing; and
  when it doesn't fit, the developer changes the code, not your process" — *none
  of that vocabulary appears on the site.* It's described in plain words and as
  a fit question, not as a feature.)
- **Who built it (the spine of the credibility):** a working ~15-person sheet
  metal shop (MSM) built DocketWorks for its own daily use. That's the answer to
  "why should I trust this" — it surfaces in the hero, the proof block on the
  home page, the founder note, and `/who-its-for`.
- **Voice:** plain, direct, owner-to-owner — the voice of the reference letters.
  *Plain and assured.* Let the **facts** be humble (it's young; one shop runs on
  it; we onboard a few at a time so we can do it properly) — not the **voice**.
  No wart-list, no "more bugs than software sold to thousands" line on the site;
  what's missing is framed as roadmap ("here's what we're building next"), not as
  apology or confession. The candid-about-the-rough-edges conversation happens on
  the call.
- **Never disparage — and do recommend the right tool when it isn't us.** No "vs
  X", no "they're worse". But it's *good* to say "if you need jobs inside jobs,
  complex sequencing, moving sub-jobs between stations — honestly, Asana or
  Monday are great at that; use them." That builds trust and it's true to how
  Corrin thinks: he obsesses about one kind of customer; if you're that customer
  you'll love it, and if you're not, here's where to go. No WorkGuru anywhere on
  the site — never named. The WorkflowMax "couldn't enter a job into it faster
  than I could write it on paper" anecdote *does* name WorkflowMax — it's
  Corrin's own evaluation story (why he built something different), not a
  head-to-head or a knock; that's fine.
- **Name:** "DocketWorks" (camel-case) everywhere — titles, copy, components.
  Update the existing scaffold's "Docketworks".
- **The kitchen metaphor:** orders go on dockets, dockets get passed to the
  stations, no single order is complex — the dockets exist to keep the whole
  service moving. That's the model: DocketWorks isn't there to manage one job,
  it's there to help with the juggling. Use it in the hero and wherever it earns
  its place.

## Sitemap

Six content pages plus two thin legal pages:

1. `/` — **Home** (does ~80% of the work)
2. `/how-it-works` — **How it works**
3. `/who-its-for` — **Who it's for** (the through-line + fit + who built it + where it's headed)
4. `/compare` — **Coming from a whiteboard, a spreadsheet, or Trello?**
   *(route likely renamed `/switching` or `/coming-from` — decide at build)*
5. `/pricing` — **Pricing**
6. `/demo` — **See it** (try the live demo · or book a walkthrough)
7. `/privacy`, `/terms` — thin, footer-only

Header nav: How it works · Who it's for · Switching · Pricing · **[Try the live
demo]** (accent button). *(Exact CTA label TBD — "Try the live demo" / "See it
live" / "Get a demo"; the site-wide primary CTA uses whichever wins, and points
at `/demo`.)*
Footer: real sitemap; drop the current "ERP for trade & service businesses" line
(wrong positioning).

The current `index.astro` design-system / token showcase is **dropped** (not kept
as `/styleguide`).

## Page content

### 1. Home `/`

Order matters here — this is the conversation:

1. **Hero.** The prospect's problem, in their words: *you came up doing the work,
   you built a name for top jobs, you grew — and now the hard part isn't any one
   job, it's keeping a clear head across all of them at once (and not having the
   whole business live in one person's head).* The kitchen-dockets line. The
   provenance worked in — built by a working sheet metal shop to run a sheet
   metal shop (exact wording TBD in build). The "we know at least three other
   businesses with the same story" beat can land here or wait for the proof
   block / `/who-its-for` — build decides. Primary CTA *Try the live demo*;
   secondary *See how it works*.
2. **The four questions** — the emotional core, directly under the hero. "The
   hard part isn't any one job — it's keeping a clear head across all of them at
   once." Then the four concrete questions: how many hours of billable work did
   the team do each day last week? enough work in the pipeline to keep everyone
   busy? a client just rang — when's their job done? someone broke their arm —
   how do we reassign their jobs, and what does that do to delivery dates?
   (`QuestionList`-style component; make it visual, not a wall of text.)
3. **"We built this to answer those — for our own shop."** The proof block, not
   just a story. Short: MSM is a working ~15-person sheet metal shop; before
   DocketWorks it ran on paper folders and a whiteboard with handwritten
   job-number magnets — and the owner had almost no idea where the numbers stood.
   Show **the whiteboard-with-magnets photo** (the "before"). Show **one
   before/after stat** — e.g. "went from not knowing what share of our hours got
   billed to knowing it's *X%*" (exact metric/number Corrin supplies; `Stat`
   component). This is where "who built it" earns trust with evidence.
4. **How it works in 30 seconds.** When a staff member fills in their timesheet,
   that *gets them paid* **and** *puts that time against a job*. When they raise
   a PO, that *orders the material* **and** *puts the cost against a job*. Plus
   reports, scheduling, and keeping your suppliers' price lists up to date for
   you. Link → `/how-it-works`. *(No "scraping", no "under the hood".)*
5. **It already fits a shop like yours.** Compressed: it's quick because it isn't
   a build-your-own kit — it already knows how a shop like this runs, so there's
   nothing to set up; and if your shop runs differently in a big way, a tool with
   more switches will suit you better — better to know now. Include the "couldn't
   enter a job faster than I could write it on paper" anecdote as the concrete
   story. Link → `/who-its-for`. *(Don't use the words "opinionated" or
   "configurable" — describe the feeling and the fit question.)*
6. **Coming from a whiteboard, a spreadsheet, or Trello?** One or two positive
   lines about what changes. Link → `/compare` / `/switching`.
7. **Pricing in one line.** "$40 per staff member / month. Everything in the box
   — no add-on modules, works with Xero." Link → `/pricing`.
8. **Founder note + face.** "I own a sheet metal shop. I built DocketWorks to run
   it — and we do, every day. It's solid enough that other shops like ours can
   use it too." Corrin's photo. Link → `/who-its-for`. (No "free", no
   "customer #2" bargaining language.)
9. **Demo video** embed (or poster + "watch the ~3-min tour"). See Assets.
10. **Closing CTA band** → `/demo`.

### 2. How it works `/how-it-works`

The screenshot tour. Honest, but trimmed — no self-flagellation. Plain words
throughout.

- **What it looks like:** a board like Trello's, plus tabs (drawings, etc.).
  Screenshot placeholder.
- **Keeping every job moving** — "the strongest part of the system." The board,
  job stages, due dates, reassigning a job to someone else. Screenshot.
- **Timesheets & POs** — the two-birds mechanic, in detail. Screenshots.
- **Quoting** — honest, in the softened register: it knows what materials cost
  (it keeps your suppliers' price lists up to date for you), a chatbot to help
  draft a quote, refine quotes / see old versions, a counter for how many days a
  quote's been sitting waiting on the customer. "Solid and does the job — the
  part we're still sharpening." *One* such line; no pile-on. Screenshot.
- **Reports & scheduling** — the picture a whiteboard never gave you:
  billable-hours trends, how many quotes you're winning, what share of your time
  gets billed, whether the pipeline's full. Screenshot.
- **Embedded demo video.**
- CTA → `/demo`.

### 3. Who it's for `/who-its-for`

The through-line + fit + who built it + a calm, short roadmap. This page is
allowed to *qualify* hard — that reads as confidence, not weakness.

- **The story, up top.** "You were great at the work. You scaled. Now the admin's
  threatening to drown you, and the place wobbles when one key person's away."
  And the pattern: we know at least three other businesses living the same story
  — a cabinetmaker who scaled, a superyacht fit-out firm, a geotech outfit, a
  sheet metal shop (us, MSM — named). Four versions of one story; we think there
  are more. **The other three are described by *type only*** — an actual company
  name (DanMade, Haute Design, GeoPro) goes on the site only once that company
  has signed a reference-site agreement; until then it's "a cabinetmaker who
  scaled" etc. Build this as a small data array so swapping a type for a name is
  a one-line change.
- **The shape it fits** (the concrete checklist underneath the story — the closer
  yours looks to this, the better):
  - Around 15 staff
  - The real product is people's hours, even when the invoice says fabrications /
    reports / custom installations
  - Each job custom; you're not making the same product over and over
  - A couple of thousand jobs a year, so quick data entry matters
  - Separate accounting (Xero); DocketWorks isn't your books
  - Materials sold near cost; the profit's in the hours
  - Roughly one active job per staff member, mostly self-contained
  - "Every business is different somewhere; the further off this, the more the
    fit gets questionable."
- **It might not be you — and we'll tell you so.** Plainly (no jargon): we
  obsess about one kind of business — the story above. If that's you, you'll love
  it: it already knows how a shop like yours runs, there's nothing to set up, no
  settings to fiddle with. If your shop runs differently in a big way — say you
  need deep jobs-inside-jobs sequencing — a tool with more switches (or Asana /
  Monday) will suit you better, and we'd rather point you there than have you
  find out the hard way. We're not trying to be the best job software for most
  shops; we're trying to be the best for shops with this story. (Confidence, not
  a hedge.)
- **Who built this** (the page's emotional core): MSM is a working ~15-person
  sheet metal shop; DocketWorks is the system it runs on, built from the inside
  by the people doing the work. That's why it's quick, why there's no fluff, why
  every field is there for a reason. You're not buying a software company's guess
  at how your business works; you're buying the tool another shop built for
  itself. Use the MSM shop-floor photo here.
- **Where it's headed** — one short, calm paragraph: it's young; parts of the
  system still assume how MSM works; shaping it to a new shop takes time. Then a
  tight near-term **roadmap** — things that exist but aren't quite at MSM's
  "faster than paper" bar yet: timesheets on a phone or tablet, **leads /
  pre-sales tracking (coming soon)**, smarter handling of repeat jobs,
  GPS / site-location features, AI to help with quoting and following your job
  steps. Framed as "what we're building next." (Drop the old "tell us which
  matters to you is the fastest way to see it finished" line — it tips toward
  quid-pro-quo and it fights the clean "this might not be you" stance.)
- CTA → `/demo`.

### 4. Coming from a whiteboard, a spreadsheet, or Trello? `/compare` (likely `/switching`)

Plain, generous. Gains for the fit case; an honest "use that instead" for the
not-fit case. No head-to-heads, no "they're worse."

- Short, positive intro about *them*: most shops we work with are running on a
  whiteboard, a spreadsheet, Xero, or Trello today — here's what changes when you
  move to DocketWorks.
- A section per *current setup*, a couple of plain sentences each:
  - **From paper / a whiteboard & folders** — you keep the board; you finally
    get the picture a whiteboard can't show you (billable-hours trends, how many
    quotes you're winning, whether the pipeline's full); and the knowledge
    doesn't walk out the door when one key person's on leave.
  - **From a spreadsheet** — timesheets and POs feed the jobs by themselves; the
    numbers are live; no typing it all in twice.
  - **From Xero / Xero Projects** — Xero stays your books; DocketWorks is the
    shop-floor side that feeds it — quoting, scheduling, costing, the board.
  - **From Trello / Asana / Monday** — those are great when *one* project has
    real depth: jobs inside jobs, complex sequencing, moving sub-jobs between
    stations. If that's your problem, honestly, use them. DocketWorks is for the
    other shape — dozens of small, mostly self-contained jobs juggled at once,
    with timesheets and POs wired into them, and it does the quotes and invoices
    too. Pick the one that matches how your jobs actually look.
- **Accounting — not our job, by design.** Xero/MYOB stays your books;
  DocketWorks feeds it. (A scope statement, not a dig — fine to keep.)
- CTA → `/demo`.

### 5. Pricing `/pricing`

- Headline price stated plainly: **$40 per staff member / month.** Anchor it —
  "about $1.30 a day per person; less than you lose on one job that gets
  mis-scheduled." What's included, as plain bullets: every feature in the box —
  no add-on modules, no paying extra for the good bits; works with Xero; no plan
  tiers; no checkout. (State our own model plainly — "no add-on modules" carries
  the point on its own; don't reach for anyone else's pricing to make it.)
- That's the whole page: the price, what's in it, and a CTA → `/demo`. The
  plainness is the point — the site shows the real price; anything else is a
  conversation, not a line of copy.

### 6. See it `/demo`

Like Xero's free trial: let a curious owner see a real, working system **without
putting themselves through being sold to**. One obvious action; one secondary.

- **Primary — the live demo.** "See a real, working system — no call, no pitch."
  A short form: name, business name, team size, what you use now, email
  (+ a hidden anti-spam field). On submit, the visitor is shown — and emailed —
  the address and login for the always-on shared demo. v1: a single fixed shared
  login on `demo.docketworks.site` (exact host TBD with operator); the form is
  lead capture + instant gratification. The shared-demo login is kept in
  server-side config, not committed.
- **Secondary — book a walkthrough.** Embedded scheduler (Cal.com or Calendly —
  operator picks; just an embed/link) for whoever wants Corrin to walk them
  through it live.
- **Your own copy to try properly** — one line, no form: "Want your own copy of
  the system, set up with your jobs in it, so you can try it for real? We do that
  together once we've talked." (Setting it up needs Xero + Google-Cloud work that
  only the operator can do; it's not something the website does — see
  Architecture. *Don't say "instance" / "provision" / "sandbox" on the page.*)

Copy note: present these as "see it" / "try it" / "book a walkthrough." Avoid
"free trial" as the *hook* phrasing (it implies a self-serve product with a
countdown); "try the live demo" / "play with a working shop's worth of sample
data" is the framing. The general ban on commercial-inducement language ("free"
as an offer, "reference site", "early-customer offer") still stands.

**Form handling (build-internal):** the live-demo form `POST`s to an Astro server
endpoint under `src/pages/api/`. The endpoint validates input and sends an email
to the operator (the lead) via a transactional email service (Resend or Postmark
— operator picks; API key in env), returns the shared-demo URL + login to the
page for immediate display, and emails it to the visitor. No database in v1
(email is the record of record); a future row-store is a possible later addition.
Astro already runs in `standalone` Node mode under PM2, so server endpoints are
straightforward. Basic anti-spam: a honeypot field and minimal rate limiting; no
third-party captcha in v1.

## Architecture / build

*(This section and the ones below are build-internal — technical terms here never
become site copy; see the Plain-language rule.)*

- **Stack:** keep the existing Astro 6 + Tailwind v4 + Preact + `@astrojs/node`
  (standalone) scaffold and the existing slate/amber design system (`Inter`,
  Major-Third type scale, `Button`, `Card`, `SectionWrapper`). No new framework.
- **Pages:** one `.astro` file per route under `src/pages/`. API routes under
  `src/pages/api/`.
- **Components:** add focused, reusable section components, e.g. `Hero`,
  `QuestionList` (the four questions), `Stat` (the before/after number),
  `FeatureRow` (text + screenshot, alternating sides), `FromYourSetup` /
  `CompareItem` (the `/switching` items), `ChecklistBlock` (the fit list),
  `FitBlock` (the "it already fits a shop like yours / it might not be you"
  block — *not* `OpinionatedBlock`; keep component names jargon-free), `PriceBlock`
  (price + what's included), `FounderNote` (text + photo), `VideoEmbed`, `CtaBand`,
  `DemoForm` (Preact island for client-side validation + submit states; on success
  shows the returned demo URL + login). Keep each component single-purpose and
  small.
- **Layout:** keep `BaseLayout`; rewrite its default `<title>`/`<description>` to
  the new positioning (and "Docketworks" → "DocketWorks"). Update `Header` nav
  links + CTA label and `Footer` link columns to the real sitemap; remove the
  "ERP for trade & service businesses" copy.
- **Assets — two tiers.**
  - *Tier A — priority, chase first* (the highest-leverage thing on the site —
    ship clearly-marked placeholders meanwhile, but get these): the MSM
    shop-floor photo, the whiteboard-with-magnets "before" photo, Corrin's photo,
    the ~3-min demo video.
  - *Tier B — deferred placeholders*: product screenshots.
  - The build blocks on **neither** — text-first, obvious placeholder files in
    `public/`.
- **Config/secrets via env** (read server-side only): email-service API key,
  operator notification address, shared-demo URL + login, scheduler embed
  URL/handle. Document them (e.g. in `README.md` / `.env.example`).
- **No analytics / cookie banner in v1** unless the operator asks (keeps
  `/privacy` trivially accurate).
- **Legal pages:** short placeholder Privacy and Terms; flesh out later.

## Interfaces (the units and how they connect)

- **Static pages** → render content, link to `/demo`. Depend on layout + section
  components only.
- **`DemoForm` island** → renders the live-demo form; on submit `POST`s JSON to
  the API route; shows pending/success/error states; on success, displays the
  returned demo URL + login.
- **`POST /api/demo/shared`** → validate (incl. honeypot) → email operator (the
  lead) + email visitor (the demo creds) → respond `{ url, username, password }`
  (creds pulled from env).
- **`POST /api/demo/call`** → optional, only if the scheduler gets a pre-form
  (probably not — a bare scheduler embed needs no endpoint); if used: validate →
  email operator.
- **Email service** → wrapper module (`src/lib/email.ts` or similar) so the
  provider choice (Resend vs Postmark) is isolated behind one function.
- **`instance.sh`** (in the `docketworks` repo) → **not referenced by this site
  at all.** No form, no notification email, no code dependency. Setting up a
  prospect's own copy of the system is an operator step that happens after a call.

## Error handling

- Form validation client-side (immediate feedback) and server-side
  (authoritative); server rejects with a clear JSON error the island surfaces
  inline.
- If the email service call fails, the API route returns a 5xx and the island
  shows "couldn't send — try again or email us directly at <operator address>";
  the demo URL + login still display (they don't depend on email).
- Honeypot-tripped submissions get a fake-success response and are dropped.
- 404 page consistent with the design system.

## Testing

- Build must pass (`pnpm build`) with no broken internal links.
- Manual/dev pass on each page at mobile and desktop widths.
- API route: unit-test validation (good input, bad input, honeypot) and that the
  email wrapper is called with the right payload (mock the provider); assert the
  response includes the env-configured shared-demo creds.
- A "does the copy match the positioning" read-through against this spec before
  launch, explicitly checking:
  - **No IT jargon — the copy passes the Plain-language rule.** Grep the rendered
    site for the banned list (*opinionated, configurable / configuration,
    instance, sandbox, provision, UAT, endpoint, API, deploy, scrape, SOP,
    kanban, token, honeypot, rate limit, database*) — zero hits in user-facing
    copy; "workflow" used sparingly if at all; a tradesperson who's never used
    software-industry words can read every page without snagging.
  - **No occurrence of "free" (as an offer), "reference site", "early-customer
    offer", or equivalent commercial-inducement language anywhere on the site.**
  - **No competitor named as a "vs" and no "we're better than X" framing** —
    WorkGuru / WorkflowMax / Trello / Monday / Asana etc. Where another tool is
    named, it's a generous "use that instead if your problem is X", not a knock.
    The WorkflowMax evaluation anecdote, if kept, reads as Corrin's own story.
  - **The "it might not be you" framing reads as confidence/qualification, not a
    hedge** — and uses plain words, not "opinionated".
  - **The persona / through-line is present and lands** — the home page (hero +
    four questions) and `/who-its-for` speak to "you grew because you're good at
    the work; now you're fighting not to drown in admin"; the proof block has the
    real "before" photo + the metric (or a clearly-marked placeholder); any
    company name used is one we have permission to use.
  - **The maturity copy reads as "built by a trades shop — here's the roadmap",
    not a wart-list.** The four-questions block leads the home page.

## Open items deferred to implementation

- Exact hero wording — the provenance line ("built by a sheet metal shop…") and
  the through-line ("you came up doing the work, you scaled, now…").
- Whether the "four businesses, same story" pattern is a hero device or sits in
  the proof block / `/who-its-for`.
- Exact MSM metric + number for the home-page `Stat` (% of hours billed, quote
  turnaround, how many quotes you're winning, …) → Corrin supplies.
- Exact site-wide CTA button label: "Try the live demo" / "See it live" / "Get a
  demo".
- Whether to rename the route `/compare` → `/switching` / `/coming-from` (and the
  matching nav label).
- Whether Option B (book a call) needs a pre-form or is a bare scheduler embed.
- Exact shared-demo host and login → operator supplies.
- Resend vs Postmark; Cal.com vs Calendly → operator picks; both isolated behind
  a thin wrapper / single env var so the choice is cheap to change.
- Whether the slate/amber design system reads as "built by an IT person" and
  wants a warmer, more workshop-floor visual treatment — a visual question, not
  addressed in this revision; flagged only.

**Resolved (2026-05-12, during build prep):** WorkflowMax *may* be named (only in
Corrin's own evaluation anecdote — not a head-to-head); WorkGuru is *never* named
anywhere on the site; MSM is named; DanMade / Haute Design / GeoPro are *not*
named until they sign a reference-site agreement (described by type until then).
