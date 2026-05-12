#!/usr/bin/env bash
set -euo pipefail

# Deploy script — run on the server as the `docketworks` user (the owner of
# /opt/docketworks-website and of the PM2 daemon that `pm2-docketworks.service`
# manages). Also invoked by .github/workflows/deploy.yml over SSH on every
# merge to master.

# Non-interactive: this runs over SSH with no TTY, so pnpm must not try to prompt.
export CI=true

cd /opt/docketworks-website

# Hard-reset to the pushed branch (same shape as the docketworks repo's deploy):
# robust against any local drift on the server.
git fetch origin
git reset --hard origin/master

# Clean install — the original node_modules predates the pnpm pin and was
# carrying npm cruft; a fresh tree avoids a class of stale-deps problems.
rm -rf node_modules
pnpm install --frozen-lockfile
pnpm build

# Start if not running, otherwise reload; --update-env so env / config changes
# take effect. Then persist the process list for `pm2 resurrect` on reboot.
pm2 startOrReload ecosystem.config.cjs --update-env
pm2 save

echo "Deploy complete."
