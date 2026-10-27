// Offline cache — everything the game needs is local.
const CACHE = 'tower-offline-v1';
const FILES = [
  './', 'index.html', 'manifest.json', 'Tudum.mp3', 'tower.mp4',
  'icon512_maskable.png', 'icon512_rounded.png',
  'lib/lib.css', 'lib/bootstrap-icons.css', 'lib/confetti.js',
  'lib/fonts/bootstrap-icons.woff2', 'lib/fonts/bootstrap-icons.woff',
  'lib/fonts/fredoka-latin-500-normal.woff2',
  'lib/fonts/fredoka-latin-600-normal.woff2',
  'lib/fonts/fredoka-latin-700-normal.woff2'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
