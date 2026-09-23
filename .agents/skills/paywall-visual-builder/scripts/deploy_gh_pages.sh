#!/bin/bash
set -e

echo "🚀 [1/3] Building production bundle..."
npm run build

REMOTE_URL=$(git config --get remote.origin.url || echo "origin")

echo "📦 [2/3] Preparing dist for gh-pages deployment..."
cd dist
rm -rf .git
git init
git add -A
git commit -m "deploy: automated release via paywall-visual-builder skill"

echo "🌐 [3/3] Pushing to gh-pages branch via remote..."
git push -f "$REMOTE_URL" main:gh-pages
rm -rf .git

echo "✅ Deployment SUCCESS! Live URL: https://zhangbaoyue813.github.io/adapty-paywall-rebuild-demo/"
