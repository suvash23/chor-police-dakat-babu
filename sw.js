const CACHE_NAME = 'chor-police-v7';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/style.css',
  '/src/style.css?v=1.1.0',
  '/src/main.js',
  '/src/main.js?v=1.1.0',
  '/src/game.js',
  '/src/game.js?v=1.1.0',
  '/src/ui.js',
  '/src/ui.js?v=1.1.0',
  '/src/dom.js',
  '/src/dom.js?v=1.1.0',
  '/src/state.js',
  '/src/state.js?v=1.1.0',
  '/src/constants.js',
  '/src/constants.js?v=1.1.0',
  '/src/audio.js',
  '/src/audio.js?v=1.1.0',
  '/src/translations.js',
  '/src/translations.js?v=1.1.0',
  '/src/utils.js',
  '/src/utils.js?v=1.1.0',
  '/src/pwa.js',
  '/src/pwa.js?v=1.1.0',
  '/src/firebase.js',
  '/src/firebase.js?v=1.1.0',
  '/src/multiplayer.js',
  '/src/multiplayer.js?v=1.1.0',
  '/assets/logo.svg',
  '/assets/favicon.ico',
  '/assets/favicon-32x32.png',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/assets/apple-touch-icon.png'
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
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Navigation requests (opening the app from home screen or browser): fallback to root index
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/') || caches.match('/index.html');
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
