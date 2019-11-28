// MEMERIKSA SERVICE WORKER
if (!('serviceWorker' in navigator)) {
  console.log("Service worker tidak didukung browser ini.");
} else {
  registerServiceWorker();
}
// REGISTER SERVICE WORKER
function registerServiceWorker() {
  return navigator.serviceWorker.register('service-worker.js')
    .then(function (registration) {
    console.log('Registrasi service worker berhasil.');
    return registration;
  })
    .catch(function (err) {
    console.error('Registrasi service worker gagal.', err);
  });
}

// FUNGSI 'ON ERROR' KETIKA URL IMG GAGAL DIBUKA ATAU RUSAK
function imgError(image) {
  image.onerror = "";
  image.src = "img/icons/icon-512x512.png";
  return true;
}