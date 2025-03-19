const CACHE_NAME = "2048-game-cache-v3"; // Change version to clear old cache

const urlsToCache = [
    "/",
    "/static/style.css",
    "/static/script.js",
    "/static/2048-icon.png",
    "/static/manifest.json"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
    self.skipWaiting(); // Force install new service worker
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
            );
        })
    );
    self.clients.claim(); // Activate service worker immediately
});
