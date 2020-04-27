self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("ui").then(Cache => {
      return Cache.addAll(["./"]);
    })
  );
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('ui').then(function(cache) {
      return cache.match(event.request).then(function(response) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        return response || fetchPromise;
      })
    })
  );
});