/* Leo con Lucas · service worker: red primero para el código, caché para imágenes */
const V = 'lcl-v22';
const BASE = ['./', 'index.html', 'style.css', 'app.js', 'engine.js', 'data.js', 'data2.js', 'manifest.json', 'img/icon-192.png', 'img/logo-futurmovil.png',
  'img/lucas/senala.png', 'img/lucas/propulsor.png', 'img/estrella-on.png', 'img/estrella-off.png', 'img/cofre.png', 'img/cofre-abierto.png', 'img/lucas/vuela.png', 'img/lucas/caido.png', 'img/lucas/senala-capa.png', 'img/lucas/gamer.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(BASE.map(u => new Request(u, { cache: 'no-cache' })))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  if (/\.(png|jpg|webp|svg)$/.test(u.pathname)) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put(e.request, cp)); return res; })));
  } else {
    e.respondWith(fetch(e.request, { cache: 'no-cache' }).then(res => { if (res.ok) { const cp = res.clone(); caches.open(V).then(c => c.put(e.request, cp)); } return res; }).catch(() => caches.match(e.request)));
  }
});
