const { existsSync, readFileSync } = require("node:fs");
const { dirname, join } = require("node:path");

const root = dirname(__dirname);
const htmlPath = join(root, "index.html");
const html = readFileSync(htmlPath, "utf8");

const idMatches = [...html.matchAll(/\bid="([^"]+)"/g)];
const ids = new Set(idMatches.map((match) => match[1]));
const hrefMatches = [...html.matchAll(/\bhref="([^"]+)"/g)];
const srcMatches = [...html.matchAll(/\bsrc="([^"]+)"/g)];
const localAssets = [];
const missingAnchors = [];

for (const [, href] of hrefMatches) {
  if (href.startsWith("#")) {
    const target = href.slice(1);
    if (target && !ids.has(target)) missingAnchors.push(href);
  } else if (!/^(https?:|tel:|sms:|mailto:)/.test(href)) {
    localAssets.push(stripUrlSuffix(href));
  }
}

for (const [, src] of srcMatches) {
  if (!/^(https?:|data:)/.test(src)) localAssets.push(stripUrlSuffix(src));
}

const missingAssets = localAssets.filter((asset) => !existsSync(join(root, asset)));

if (missingAnchors.length || missingAssets.length) {
  console.error("Missing anchors:", missingAnchors);
  console.error("Missing assets:", missingAssets);
  process.exit(1);
}

console.log("Static site check passed");

function stripUrlSuffix(value) {
  return value.split(/[?#]/)[0];
}
