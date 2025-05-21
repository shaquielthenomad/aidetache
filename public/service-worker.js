// Service Worker for the Detachd PWA

const CACHE_NAME = 'detachd-pwa-v1';
const OFFLINE_URL = '/offline.html';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/favicon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/assets/protea-pattern.svg',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(STATIC_ASSETS);
    })()
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
      await clients.claim();
    })()
  );
});

// Fetch event - serve from cache, fallback to network with caching
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // First, try to use the navigation preload response if it's supported
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          // Next, try the network
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          // If both fail, show the offline page
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })()
    );
  } else if (event.request.destination === 'image' || 
            event.request.destination === 'style' || 
            event.request.destination === 'script') {
    // Cache images, CSS, and JavaScript files
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);
        
        if (cachedResponse) {
          return cachedResponse;
        }
        
        try {
          const networkResponse = await fetch(event.request);
          // Cache the new response if it's valid
          if (networkResponse.ok) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          // If fetching fails, return nothing for images or fonts
          return new Response('', { status: 408, statusText: 'Request timed out' });
        }
      })()
    );
  }
});