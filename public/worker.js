const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

const FILES_TO_CACHE = [
  "./", 
  "./index.html", 
  "./index.js", 
  "./db.js", 
  "./styles.css",
  "./manifest.webmanifest",
  "./icons/icon-72x72.png",
  "./icons/icon-96x96.png",
  "./icons/icon-128x128.png",
  "./icons/icon-144x144.png",
  "./icons/icon-152x152.png",
  "./icons/icon-192x192.png",
  "./icons/icon-384x384.png",
  "./icons/icon-512x512.png"
];

self.addEventListener("install", function (evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Your files were cached!");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", function (evt) {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  if (evt.request.url.includes("/api/")) {
    console.log("[Worker] Fetch(data)", evt.request.url);

    evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
          .then((response) => {
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }
            return response;
          })
          .catch((err) => {
            return cache.match(evt.request);
          });
      })
    );
    return;
  }
  evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request).then((response) => {
        return response || fetch(evt.request);
      });
    })
  );
});
