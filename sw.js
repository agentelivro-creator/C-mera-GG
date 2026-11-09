// Cache simples para funcionar offline. Ao mudar arquivos, aumente o número da versão.
const V = 'camera-cine-v1';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'assets/cover.jpg', 'assets/icon-192.png', 'assets/icon-512.png', 'assets/icon-180.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Responde do cache e atualiza em segundo plano
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(hit => {
    const net = fetch(e.request).then(r => {
      if (r.ok && new URL(e.request.url).origin === location.origin) {
        const cp = r.clone();
        caches.open(V).then(c => c.put(e.request, cp));
      }
      return r;
    }).catch(() => hit);
    return hit || net;
  }));
});
