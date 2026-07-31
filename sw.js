const CACHE_NAME = 'beevil-knievel-v3.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './product.html',
  './store.html',
  './app.html',
  './download.html',
  './docs.html',
  './support.html',
  './accessories.html',
  './about.html',
  './investors.html',
  './research.html',
  './privacy.html',
  './styles.css',
  './components.js',
  './manifest.json',
  './assets/beevil_product_hero.png',
  './assets/beevil_hardware_render.png',
  './assets/architecture_diagram.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        return caches.match('./app.html');
      });
    })
  );
});
