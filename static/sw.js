// sw.js - Service Worker

const CACHE_NAME = "2048-game-cache-v4";

const urlsToCache = [
  "/",
  "/static/style.css",
  "/static/script.js",
  "/static/2048-icon.png",
  "/static/manifest.json",
  "/static/move.mp3",
  "/static/merge.mp3",
  "/static/gameover.mp3",
  "/static/bg-music.mp3"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
