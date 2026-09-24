#!/usr/bin/env node
/**
 * Automated static validation script for Paywall Visual Builder
 * Searches process.cwd() and multiple relative locations for src/main.jsx
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const candidatePaths = [
  path.resolve(process.cwd(), 'src/main.jsx'),
  path.resolve(__dirname, '../../../../src/main.jsx'),
  path.resolve(__dirname, '../../../src/main.jsx'),
  path.resolve(__dirname, '../../src/main.jsx'),
  path.resolve(__dirname, '../src/main.jsx')
];

const mainJsxPath = candidatePaths.find(p => fs.existsSync(p));
if (!mainJsxPath) {
  console.error("❌ Cannot find src/main.jsx in current directory or relative paths.");
  console.error("Searched paths:", candidatePaths);
  process.exit(1);
}

const content = fs.readFileSync(mainJsxPath, 'utf8');
let errors = [];
let warnings = [];

// 1. Check for dangerous static ID role hijack
const staticIdRegex = /active\.id\?\.includes\(['"]timeline['"]\)/g;
if (staticIdRegex.test(content)) {
  errors.push("❌ Anti-pattern detected: 'active.id?.includes(\"timeline\")' used for role selection. Use active.type instead.");
}

// 2. Check for W3C Lock import
if (content.includes('<Lock') && !content.includes('Lock,')) {
  errors.push("❌ Unimported W3C DOM element: '<Lock' found without proper import from lucide-react.");
}

// 3. Check for 3-column-tiers full length check
if (content.includes('targetVariant === "3-column-tiers"') && !content.includes('tiers.length !== 3')) {
  warnings.push("⚠️ Potential missing 3-column tiers fallback count check.");
}

console.log("==========================================");
console.log("🛡️ Paywall Visual Builder Defensive Audit");
console.log(`🔍 Audited file: ${mainJsxPath}`);
console.log("==========================================");

if (errors.length > 0) {
  errors.forEach(e => console.error(e));
  console.log("\n❌ Audit FAILED. Please resolve the above issues.");
  process.exit(1);
} else {
  if (warnings.length > 0) {
    warnings.forEach(w => console.warn(w));
  }
  console.log("✅ All defensive audit checks PASSED! Zero critical anti-patterns found.");
  process.exit(0);
}
