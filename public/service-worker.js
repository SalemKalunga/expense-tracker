const CACHE_NAME = "expensive-cache";
const URLS = ["index.html", "offline.html"];

const worker = this;

//Install the service worker
worker.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS);
    })
  );
});

// Listening to the fetch requests

worker.addEventListener("fetch", (event) => {
  /**
   * in this part of the code we are dealing with the requests the app makes to any external
   * content or data, that might be a request of an image, a video, some text or some API,
   * whenever we receive a fetch call (considering the fact that a fetch is an event), we are
   * going to respond to that event with the following code...
   */
  event.respondWith(
    caches.match(event.request).then(() => {
      /**
       * we are going to match all requests our page is receiving, and then we are simply going
       * to fetch the request again, that's the returned value. and if there is any problem with
       * the request fetching, that means we are offline, so we are going to return the offline page.
       */
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

// Activating the service worker
worker.addEventListener("activate", (event) => {
  /**
   * Because the cache is gonna have multiple versions as the user is using the app,
   * we don't want to have multiple versions of our cache, we are gonna make sure to
   * remove the previous cache and store a new one.
   */
  const emptyCacheList = [];
  emptyCacheList.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!emptyCacheList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
