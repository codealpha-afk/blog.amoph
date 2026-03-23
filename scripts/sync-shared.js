// =============================================================
//  AMOPH · blog.amoph.org
//  scripts/sync-shared.js
//  ─────────────────────────────────────────────────────────────
//  PURPOSE:
//    Pulls the shared header.html and footer.html from the
//    amoph repo (via jsDelivr) before every Eleventy build.
//    This keeps blog.amoph.org partials in sync with the
//    canonical files in amoph/shared/ automatically.
//
//  HOW TO USE:
//    This script runs automatically via package.json:
//      "prebuild": "node scripts/sync-shared.js"
//    So every `npm run build` on Cloudflare Pages will sync
//    the shared partials first, then build.
//
//  TO UPDATE package.json:
//    Add or update the "scripts" block:
//      {
//        "scripts": {
//          "prebuild": "node scripts/sync-shared.js",
//          "build": "eleventy"
//        }
//      }
//
//  CDN URL NOTE:
//    Files are fetched from jsDelivr using the @main tag.
//    This means it picks up the latest commit on main within
//    jsDelivr's cache window (~24hrs).
//    To force an exact version, replace @main with a commit SHA:
//      https://cdn.jsdelivr.net/gh/codealpha-afk/amoph@<sha>/shared/header.html
//
//  WHAT IS SYNCED:
//    Remote (amoph repo)                → Local (blog.amoph repo)
//    shared/header.html                 → src/_includes/partials/header.html
//    shared/footer.html                 → src/_includes/partials/footer.html
//
//  WHAT IS NOT SYNCED:
//    brand.css and script.js are loaded directly from CDN
//    at runtime (in base.njk), so they do not need to be
//    copied locally.
// =============================================================

const https = require('https');
const fs    = require('fs');
const path  = require('path');

// ── Files to sync ────────────────────────────────────────────
// Add more entries here if you add new shared partials.
const FILES = [
  {
    // Canonical source in amoph repo
    url: 'https://cdn.jsdelivr.net/gh/codealpha-afk/amoph@main/shared/header.html',
    // Where to write it in blog.amoph repo
    dest: path.join(__dirname, '../src/_includes/partials/header.html'),
  },
  {
    url: 'https://cdn.jsdelivr.net/gh/codealpha-afk/amoph@main/shared/footer.html',
    dest: path.join(__dirname, '../src/_includes/partials/footer.html'),
  },
];

// ── Fetch helper ─────────────────────────────────────────────
function fetchText(url) {
  return new Promise(function (resolve, reject) {
    https.get(url, function (res) {
      // Follow redirects (jsDelivr uses them)
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchText(res.headers.location));
      }

      if (res.statusCode !== 200) {
        return reject(new Error('HTTP ' + res.statusCode + ' for ' + url));
      }

      var body = '';
      res.on('data', function (chunk) { body += chunk; });
      res.on('end',  function () { resolve(body); });
    }).on('error', reject);
  });
}

// ── Main ─────────────────────────────────────────────────────
async function main() {
  console.log('[sync-shared] Syncing shared partials from amoph repo...\n');

  for (var file of FILES) {
    try {
      console.log('  Fetching: ' + file.url);
      var content = await fetchText(file.url);

      // Ensure the destination directory exists
      fs.mkdirSync(path.dirname(file.dest), { recursive: true });

      fs.writeFileSync(file.dest, content, 'utf8');
      console.log('  ✓ Written: ' + file.dest + '\n');
    } catch (err) {
      // Warn but don't fail the build — use whatever is already on disk
      console.warn('  ⚠ Could not sync ' + file.url);
      console.warn('    ' + err.message);
      console.warn('    Using existing local file (if any).\n');
    }
  }

  console.log('[sync-shared] Done.\n');
}

main();
