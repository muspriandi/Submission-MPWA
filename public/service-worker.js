// //IMPORT WORKBOX
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

// // CEK APAKAH WORKBOX BERHASIL DIIMPORT
// if (workbox) {
//   console.log(`Workbox berhasil dimuat`);
// }
// else {
//   console.log(`Workbox gagal dimuat`);
// }

// // PRECACHING DENGAN WORKBOX
// workbox.precaching.precacheAndRoute([
//   { url: './', revision: '1' },
//   { url: './index.html', revision: '1' },
//   { url: './nav.html', revision: '1' },
//   { url: './manifest.json', revision: '1' },
//   { url: './icon.png', revision: '1' },
//   { url: './pages/home.html', revision: '1' },
//   { url: './pages/favorite.html', revision: '1' },
//   { url: './pages/standing.html', revision: '1' },
//   { url: './pages/team.html', revision: '1' },
//   { url: './css/materialize.min.css', revision: '1' },
//   { url: './js/jquery.min.js', revision: '1' },
//   { url: './js/materialize.min.js', revision: '1' },
//   { url: './js/nav.js', revision: '1' },
//   { url: './js/api.js', revision: '1' },
//   { url: './js/idb.js', revision: '1' },
//   { url: './js/app.js', revision: '1' },
//   { url: './js/idb-function.js', revision: '1' },
//   { url: './img/icons/icon-192x192.png', revision: '1' },
//   { url: './img/icons/icon-512x512.png', revision: '1' },
// ]);

// // ROUTING DENGAN WORKBOX UNTUK URL API
// workbox.routing.registerRoute(
//   new RegExp('https://api.football-data.org/v2/'),
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: 'api-football'
//   })
// );

// // ROUTING DENGAN WORKBOX UNTUK SEMUA ASET DI BAWAH URI './'
// workbox.routing.registerRoute(
//   new RegExp('./'),
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: 'cache-bola'
//   })
// );