const CACHE_NAME = 'game-cache-v2';

const urlsToCache = [
  '/',              
  '/index.html',    
  '/index.js',
  '/cielo.js',
  '/mascota.js',
  '/inicio.js',
  '/manifest.json',
  '/ico/ico512.png',   
  '/ico/ico.png',
  '/assets/audio/Chisi.mp3'  
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cacheando archivos estáticos...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación y limpieza de caché antigua
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estrategia Cache First para todos los archivos
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});

// Notificación de actualización de Service Worker
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
