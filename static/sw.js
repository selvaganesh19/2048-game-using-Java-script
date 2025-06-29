// sw.js - Service Worker

const CACHE_NAME = "2048-game-cache-v5";

const urlsToCache = [
  "/",                 // Root page
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/2048-icon.png",
  "/move.mp3",
  "/merge.mp3",
  "/gameover.mp3",
  "/bg-music.mp3"
];

// Install event - cache resources
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
                  .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache or fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      // Optional fallback logic
    })
  );
});
