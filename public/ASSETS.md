# Asset placeholders

Every `placeholder-*.svg` (and `og-image.svg`) in this directory is a stand-in.
Replace it with the real asset and update the reference in the relevant page /
component. Keep the same path if you can, or update the import.

See the design spec (`docs/superpowers/specs/2026-05-12-docketworks-website-design.md`,
"Assets — two tiers") for priority.

## Tier A — chase first (highest-leverage; the site leans on these)

| Placeholder | Real asset | Used on |
| --- | --- | --- |
| `placeholder-msm-whiteboard.svg` | Photo of MSM's old whiteboard with the handwritten job-number magnets — the "before" picture | Home (proof block) |
| `placeholder-msm-shopfloor.svg` | Photo of the MSM shop floor / people doing the work | `/who-its-for` ("Who built this") |
| `placeholder-corrin.svg` | Photo of Corrin | Home (founder note), `/who-its-for` |
| `placeholder-demo-video-poster.svg` | Poster frame for the ~3-min demo video (+ the video itself; see `SCHEDULER_EMBED_URL` is unrelated — the video URL is set in `VideoEmbed` usage) | Home, `/how-it-works` |
| `og-image.svg` | 1200×630 PNG/JPG link-preview image | site-wide (BaseLayout default) |

## Tier B — deferred (fine to ship with placeholders)

| Placeholder | Real asset | Used on |
| --- | --- | --- |
| `placeholder-screenshot-board.svg` | Screenshot of the job board (Trello-like view + tabs) | Home, `/how-it-works` |
| `placeholder-screenshot-timesheet.svg` | Screenshot of timesheet entry | `/how-it-works` |
| `placeholder-screenshot-quote.svg` | Screenshot of quoting | `/how-it-works` |
| `placeholder-screenshot-reports.svg` | Screenshot of reports & scheduling | `/how-it-works` |
