#!/usr/bin/env bash
set -euo pipefail

# Deploy script — run on the server (also invoked by .github/workflows/deploy.yml
# over SSH on every merge to master).

cd /opt/docketworks-website

# Hard-reset to the pushed branch (same as the docketworks repo's deploy):
# robust against any local drift on the server.
git fetch origin
git reset --hard origin/master

pnpm install --frozen-lockfile
pnpm build
pm2 restart docketworks-website --update-env

echo "Deploy complete."
