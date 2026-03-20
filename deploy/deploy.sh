#!/usr/bin/env bash
set -euo pipefail

cd /opt/docketworks-website
git pull origin master
pnpm install --frozen-lockfile
pnpm build
pm2 restart docketworks-website
echo "Deploy complete."
