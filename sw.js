/* Service worker E-Absensi: aplikasi tetap terbuka saat sinyal lemah.
   - File aplikasi: ambil dari jaringan dulu, cadangan dari cache (agar pembaruan cepat sampai).
   - Pustaka & model wajah dari CDN: cache dulu (berukuran besar dan versinya dikunci).
   - Firebase/Firestore & cuaca: tidak dicampuri (selalu jaringan). */
const VERSION = "e-absensi-v2";
const SHELL = ["./", "./index.html", "./app.js", "./config.js", "./manifest.webmanifest",
  "./logo.png", "./icon-192.png", "./icon-512.png", "./maskable-512.png", "./apple-touch-icon.png"];
const CDN = ["cdn.jsdelivr.net", "www.gstatic.com", "fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; })
      .catch(() => caches.match(req).then(r => r || caches.match("./index.html"))));
    return;
  }
  if (CDN.includes(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    })));
  }
});
