import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const assets = [
  // Logos and Icons
  {
    url: 'https://beewise.ag/hs-fs/hubfs/logo.png?width=150&height=48&name=logo.png',
    dest: 'public/images/beewise/logo.png',
  },
  {
    url: 'https://beewise.ag/hs-fs/hubfs/beewise-original-color.png?width=311&height=100&name=beewise-original-color.png',
    dest: 'public/images/beewise/beewise-original-color.png',
  },
  {
    url: 'https://beewise.ag/hs-fs/hubfs/transparent%20square%20logo-min.webp?width=110&height=110&name=transparent%20square%20logo-min.webp',
    dest: 'public/images/beewise/transparent-square-logo.webp',
  },
  {
    url: 'https://beewise.ag/hubfs/b-icon-gold.png',
    dest: 'public/images/beewise/b-icon-gold.png',
  },
  {
    url: 'https://26497807.fs1.hubspotusercontent-eu1.net/hubfs/26497807/Frame%20607.svg',
    dest: 'public/images/beewise/frame-607.svg',
  },

  // Hero Video & Poster
  {
    url: 'https://beewise.ag/hubfs/first_frame_2.webp',
    dest: 'public/images/beewise/hero-poster.webp',
  },
  {
    url: 'https://beewise.ag/hubfs/Home%20Page%2010%20Seconds%20-%20COMPRESS-1.mp4',
    dest: 'public/videos/beewise/hero-video.mp4',
  },
  {
    url: 'https://26497807.fs1.hubspotusercontent-eu1.net/hubfs/26497807/Beewise.mp4',
    dest: 'public/videos/beewise/beewise-scrolly.mp4',
  },

  // Challenge Cards
  {
    url: 'https://26497807.fs1.hubspotusercontent-eu1.net/hubfs/26497807/httpsdocs.google.comdocumentd1Q3gh4BYe2_XOePY6sEtLl8oAQhF5rkr1viJrjnDEPFceditusp=sharing-min.webp',
    dest: 'public/images/beewise/card-distance.webp',
  },
  {
    url: 'https://26497807.fs1.hubspotusercontent-eu1.net/hubfs/26497807/Hive%201%20(1).webp',
    dest: 'public/images/beewise/card-timing.webp',
  },
  {
    url: 'https://26497807.fs1.hubspotusercontent-eu1.net/hubfs/26497807/image%2033%20(1).webp',
    dest: 'public/images/beewise/card-expertise.webp',
  },

  // Dual Column Section
  {
    url: 'https://26497807.fs1.hubspotusercontent-eu1.net/hubfs/26497807/BH%20IN%20ALMOND%20(1).webp',
    dest: 'public/images/beewise/bh-in-almond.webp',
  },

  // Text & Media Sections
  {
    url: 'https://26497807.fs1.hubspotusercontent-eu1.net/hubfs/26497807/Almond%20grower%20on%20tractor.webp',
    dest: 'public/images/beewise/grower-tractor.webp',
  },
  {
    url: 'https://26497807.fs1.hubspotusercontent-eu1.net/hubfs/26497807/Untitled%20design%20(56).webp',
    dest: 'public/images/beewise/beekeepers-beehome.webp',
  },
  {
    url: 'https://26497807.fs1.hubspotusercontent-eu1.net/hubfs/26497807/Untitled%20design%20(6)-1.png',
    dest: 'public/images/beewise/bees-for-buildings.png',
  },

  // Award Badges
  {
    url: 'https://beewise.ag/hubfs/7.webp',
    dest: 'public/images/beewise/award-disruptor50.webp',
  },
  {
    url: 'https://beewise.ag/hubfs/Untitled%20design%20(48).webp',
    dest: 'public/images/beewise/award-seal2024.webp',
  },
  {
    url: 'https://beewise.ag/hubfs/image%2043.webp',
    dest: 'public/images/beewise/award-worldag.webp',
  },
  {
    url: 'https://beewise.ag/hubfs/image%2042.webp',
    dest: 'public/images/beewise/award-eu-excellence.webp',
  },
  {
    url: 'https://beewise.ag/hubfs/fastco.webp',
    dest: 'public/images/beewise/award-fastco.webp',
  },
  {
    url: 'https://beewise.ag/hubfs/image%2040%20(2).webp',
    dest: 'public/images/beewise/award-image40.webp',
  },
  {
    url: 'https://beewise.ag/hubfs/Untitled%20design%20(94).png',
    dest: 'public/images/beewise/award-greenapple.png',
  },
  {
    url: 'https://beewise.ag/hubfs/Inc_BiB_Social_Toolkit_2024_Inc_BiB_Social_1080x1920_v2.png',
    dest: 'public/images/beewise/award-inc.png',
  },
  {
    url: 'https://beewise.ag/hubfs/BLOOMBERG.png',
    dest: 'public/images/beewise/award-bloomberg.png',
  },
  {
    url: 'https://beewise.ag/hubfs/RBR50.png',
    dest: 'public/images/beewise/award-rbr50.png',
  },

  // Banner CTA Team Photos
  {
    url: 'https://26497807.fs1.hubspotusercontent-eu1.net/hubfs/26497807/join%20team-2.webp',
    dest: 'public/images/beewise/join-team-desktop.webp',
  },
  {
    url: 'https://26497807.fs1.hubspotusercontent-eu1.net/hubfs/26497807/image%2038%20(5).jpg',
    dest: 'public/images/beewise/join-team-mobile.jpg',
  },
];

function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(projectRoot, destination);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });

    const file = fs.createWriteStream(fullPath);
    const client = url.startsWith('https') ? https : http;

    const request = client.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadFile(response.headers.location, destination).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(fullPath, () => {});
        reject(new Error(`Failed to download ${url}: status code ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded: ${destination}`);
          resolve();
        });
      });
    });

    request.on('error', (err) => {
      file.close();
      fs.unlink(fullPath, () => {});
      reject(err);
    });

    request.setTimeout(30000, () => {
      request.destroy();
      file.close();
      fs.unlink(fullPath, () => {});
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

async function run() {
  console.log(`Starting asset downloads (${assets.length} items)...`);
  for (const asset of assets) {
    try {
      await downloadFile(asset.url, asset.dest);
    } catch (err) {
      console.warn(`Warning: ${err.message}`);
    }
  }
  console.log('Finished asset downloads!');
}

run();
