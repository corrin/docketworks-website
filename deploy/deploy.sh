#!/usr/bin/env bash
set -euo pipefail

# Deploy script — run on the server as the `docketworks` user (the owner of
# /opt/docketworks-website and of the PM2 daemon that `pm2-docketworks.service`
# manages). Also invoked by .github/workflows/deploy.yml over SSH on every
# merge to master.

cd /opt/docketworks-website

# Hard-reset to the pushed branch (same shape as the docketworks repo's deploy):
# robust against any local drift on the server.
git fetch origin
git reset --hard origin/master

pnpm install --frozen-lockfile
pnpm build

# Start if not running, otherwise reload; --update-env so env / config changes
# take effect. Then persist the process list for `pm2 resurrect` on reboot.
pm2 startOrReload ecosystem.config.cjs --update-env
pm2 save

echo "Deploy complete."
