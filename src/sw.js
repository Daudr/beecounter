// Polyfill for Chrome caching
importScripts('/assets/js/cache-polyfill.js');

// Install the ServiceWorker
self.addEventListener('install', function(event) {
  event.waitUntil(

    // Open a cache
    caches.open('v2').then(function(cache) {

      // Define what we want to cache
      return cache.addAll([
        '/',
        'index.html',
        'styles.css',
        'inline.bundle.js',
        'styles.bundle.js',
        'vendor.bundle.js',
        'main.bundle.js',
        'assets/css/bootsrap.min.css',
        'assets/js/bootstrap.min.js',
        'assets/js/jquery.3.2.1.min.js',
        'assets/js/Chart.bundle.min.js',
        'assets/img/beehive.png',
        'assets/icons/beehive16.png',
        'assets/icons/beehive24.png',
        'assets/icons/beehive32.png',
        'assets/icons/beehive64.png',
        'assets/icons/beehive128.png',
        'assets/icons/beehive256.png',
        'assets/icons/beehive512.png'
      ]);
    })
  );
});

// Use ServiceWorker (or not) to fetch data
self.addEventListener('fetch', function(event) {

  event.respondWith(

    // Look for something in the cache that matches the request
    caches.match(event.request).then(function(response) {

      // If we find something, return it
      // Otherwise, use the network instead
      return response || fetch(event.request);
    })
  );
});
