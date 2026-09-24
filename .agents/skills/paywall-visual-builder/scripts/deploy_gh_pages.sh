#!/bin/bash
set -e

echo "🚀 [1/3] Building production bundle..."
npm run build

REMOTE_URL=$(git config --get remote.origin.url || echo "")

if [ -z "$REMOTE_URL" ]; then
  echo "❌ Error: No git remote found. Please run within a git repository with an origin remote."
  exit 1
fi

echo "📦 [2/3] Preparing dist for gh-pages deployment..."
cd dist
rm -rf .git
git init
git add -A
git commit -m "deploy: automated release via paywall-visual-builder skill"

echo "🌐 [3/3] Pushing to gh-pages branch via remote..."
git push -f "$REMOTE_URL" main:gh-pages
rm -rf .git

if [[ "$REMOTE_URL" =~ github\.com[:/]([^/]+)/([^/.]+)(\.git)? ]]; then
  ORG="${BASH_REMATCH[1]}"
  REPO="${BASH_REMATCH[2]}"
  echo "✅ Deployment SUCCESS! Live URL: https://${ORG}.github.io/${REPO}/"
else
  echo "✅ Deployment SUCCESS! Deployed to gh-pages branch."
fi
