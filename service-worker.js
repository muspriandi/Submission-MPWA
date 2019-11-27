//IMPORT WORKBOX
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

const CACHE_NAME = "bola";
var urlsToCache = [
  "./",
  "./nav.html",
  "./index.html",
  "./manifest.json",
  "./pages/home.html",
  "./pages/favorite.html",
  "./pages/standing.html",
  "./pages/team.html",
  "./img/icons/icon-192x192.png",
  "./img/icons/icon-512x512.png",
  "./css/materialize.min.css",
  "./js/jquery.min.js",
  "./js/materialize.min.js",
  "./js/nav.js",
  "./js/api.js",
  "./js/idb.js",
  "./js/app.js",
  "./js/idb-function.js",
  "./icon.png"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  // var base_url = "https://api.football-data.org/v2/";
  
  // var request = new Request(base_url, {
  //   method: 'GET', 
  //   headers: new Headers({
  //     'X-Auth-Token': '2b6178e612d8423396872e0246e966f3'
  //   })
  // });

  var request = "https://api.football-data.org/v2/";
  
  if (event.request.url.indexOf(request) > -2) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});