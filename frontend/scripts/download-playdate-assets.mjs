import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const ASSETS = [
  // Fonts
  { url: 'https://static-cdn.play.date/static/fonts/roobert/Roobert-Light.6f5e37b19874.woff2', dest: 'public/fonts/Roobert-Light.woff2' },
  { url: 'https://static-cdn.play.date/static/fonts/roobert/Roobert-Regular.7a05714f9759.woff2', dest: 'public/fonts/Roobert-Regular.woff2' },
  { url: 'https://static-cdn.play.date/static/fonts/roobert/Roobert-Medium.28e0d58e9b74.woff2', dest: 'public/fonts/Roobert-Medium.woff2' },
  { url: 'https://static-cdn.play.date/static/fonts/roobert/Roobert-SemiBold.4fbfafcf34c2.woff2', dest: 'public/fonts/Roobert-SemiBold.woff2' },
  { url: 'https://static-cdn.play.date/static/fonts/roobert/Roobert-Bold.4394eab434ae.woff2', dest: 'public/fonts/Roobert-Bold.woff2' },
  { url: 'https://static-cdn.play.date/static/fonts/roobert/Roobert-Heavy.f1e39e0aa199.woff2', dest: 'public/fonts/Roobert-Heavy.woff2' },

  // Logos & SVGs
  { url: 'https://static-cdn.play.date/static/images/logo.28192db8adaf.svg', dest: 'public/images/playdate/logo.svg' },
  { url: 'https://static-cdn.play.date/static/images/te-logo.512dd696843b.svg', dest: 'public/images/playdate/te-logo.svg' },
  { url: 'https://static-cdn.play.date/static/images/violator.518eb48245e3.svg', dest: 'public/images/playdate/violator.svg' },

  // Product Photography & Hardware Renders
  { url: 'https://static-cdn.play.date/static/images/playdate-layers.7d726433fd74.png', dest: 'public/images/playdate/playdate-layers.png' },
  { url: 'https://static-cdn.play.date/static/images/Playdate-in-hand1.70225f47634a.png', dest: 'public/images/playdate/Playdate-in-hand1.png' },
  { url: 'https://static-cdn.play.date/static/images/Playdate-in-hand1-thumb.72ee478488c6.png', dest: 'public/images/playdate/Playdate-in-hand1-thumb.png' },
  { url: 'https://static-cdn.play.date/static/images/devtools-screenshots.39d1689b7a5f.png', dest: 'public/images/playdate/devtools-screenshots.png' },
  { url: 'https://static-cdn.play.date/static/images/frontpage-mirror.1144bb9c8bbb.png', dest: 'public/images/playdate/frontpage-mirror.png' },
  { url: 'https://static-cdn.play.date/static/images/season/s2-promo-1.1ba498316d61.png', dest: 'public/images/playdate/s2-promo-1.png' },
  { url: 'https://static-cdn.play.date/static/images/playdate-turned.bd5ee5b6e5be.png', dest: 'public/images/playdate/playdate-turned.png' },
  { url: 'https://static-cdn.play.date/static/images/products/playdate-cover-aqua.1f6e3419c7ad.png', dest: 'public/images/playdate/playdate-cover-aqua.png' },
  { url: 'https://static-cdn.play.date/static/images/products/playdate-cover-aqua-closed.6dc8d5cb4d84.png', dest: 'public/images/playdate/playdate-cover-aqua-closed.png' },

  // Gallery
  { url: 'https://static-cdn.play.date/static/images/gallery-01.20c7faab3099.jpg', dest: 'public/images/playdate/gallery-01.jpg' },
  { url: 'https://static-cdn.play.date/static/images/gallery-02.36a443d7075a.jpg', dest: 'public/images/playdate/gallery-02.jpg' },
  { url: 'https://static-cdn.play.date/static/images/gallery-03.67dbaef38cb2.jpg', dest: 'public/images/playdate/gallery-03.jpg' },
  { url: 'https://static-cdn.play.date/static/images/gallery-04.7df33aa90d89.jpg', dest: 'public/images/playdate/gallery-04.jpg' },
  { url: 'https://static-cdn.play.date/static/images/gallery-05.d6179513eba3.jpg', dest: 'public/images/playdate/gallery-05.jpg' },
  { url: 'https://static-cdn.play.date/static/images/gallery-06.aba5b07fbdf4.jpg', dest: 'public/images/playdate/gallery-06.jpg' },

  // Game Cards Base & Mystery
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-mystery-2.5a81dca37939.png', dest: 'public/images/gamecards/gamecard-mystery.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-21.7d383a283fe4.png', dest: 'public/images/gamecards/gamecard-overlay.png' },

  // All 24 Season One Games
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-1-casual_birder.3ff02c752168.png', dest: 'public/images/gamecards/gamecard-1.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-2-crankins_time_travel_adventure.379ed55389f9.png', dest: 'public/images/gamecards/gamecard-2.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-3-demon_quest_85.b777a3aac2a7.png', dest: 'public/images/gamecards/gamecard-3.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-4-echoic_memory.24ddebe98ce9.png', dest: 'public/images/gamecards/gamecard-4.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-5-executive_golf_dx.282763a1ec5f.png', dest: 'public/images/gamecards/gamecard-5.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-6-flipper_lifter.af9469d17082.png', dest: 'public/images/gamecards/gamecard-6.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-7-forrest_byrnes_up_in_smoke.5b942733e2db.png', dest: 'public/images/gamecards/gamecard-7.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-8-hyper_meteor.a9454f1038fd.png', dest: 'public/images/gamecards/gamecard-8.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-9-lost_your_marbles.2e7ee1b5ca8a.png', dest: 'public/images/gamecards/gamecard-9.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-10-omaze.633591d62b93.png', dest: 'public/images/gamecards/gamecard-10.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-11-pick_pack_pup.ac87d3b6c7ee.png', dest: 'public/images/gamecards/gamecard-11.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-12-questy_chess.f31bf5aaa506.png', dest: 'public/images/gamecards/gamecard-12.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-13-ratcheteer.94e35b469fa5.png', dest: 'public/images/gamecards/gamecard-13.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-14-sasquatchers.e0517ee5c689.png', dest: 'public/images/gamecards/gamecard-14.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-15-saturday_edition.e5e4f19bbcc3.png', dest: 'public/images/gamecards/gamecard-15.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-16-snak.daaf7207cf67.png', dest: 'public/images/gamecards/gamecard-16.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-17-spellcorked.9f438dc1a8f7.png', dest: 'public/images/gamecards/gamecard-17.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-18-whitewater_wipeout.9456a513ecf4.png', dest: 'public/images/gamecards/gamecard-18.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-19-zipper.a93adfcc228c.png', dest: 'public/images/gamecards/gamecard-19.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-20-boogie_loops.b3b536818d9d.png', dest: 'public/images/gamecards/gamecard-20.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-21-battleship_godios.9b9d05a63e0d.png', dest: 'public/images/gamecards/gamecard-21.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-22-b360.906c41eb025f.png', dest: 'public/images/gamecards/gamecard-22.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-23-inventory-hero.3af1b6056ec0.png', dest: 'public/images/gamecards/gamecard-23.png' },
  { url: 'https://static-cdn.play.date/static/images/gamecards/gamecard-24-star-sled.bae81dc93e47.png', dest: 'public/images/gamecards/gamecard-24.png' },
];

function downloadFile(url, targetPath) {
  return new Promise((resolve, reject) => {
    const fullTarget = path.resolve(process.cwd(), targetPath);
    const dir = path.dirname(fullTarget);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(fullTarget);
    const client = url.startsWith('https') ? https : http;

    client.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Follow redirect
        return downloadFile(response.headers.location, targetPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`✓ Downloaded: ${targetPath}`);
          resolve();
        });
      });
    }).on('error', (err) => {
      fs.unlink(fullTarget, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting download of ${ASSETS.length} Playdate assets...`);
  let successCount = 0;
  for (const asset of ASSETS) {
    try {
      await downloadFile(asset.url, asset.dest);
      successCount++;
    } catch (err) {
      console.error(`✗ Error downloading ${asset.url}:`, err.message);
    }
  }
  console.log(`\nCompleted: ${successCount}/${ASSETS.length} assets downloaded successfully.`);
}

run();
