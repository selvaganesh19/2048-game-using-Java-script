// sw.js - Service Worker for Netlify 2048 Game

const CACHE_NAME = "2048-game-cache-v5";

const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/2048-icon.png",
  "/manifest.json",
  "/move.mp3",
  "/merge.mp3",
  "/gameover.mp3",
  "/bg-music.mp3"
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
