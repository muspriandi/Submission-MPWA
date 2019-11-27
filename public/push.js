var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BHxxWMd_Rn6ZNN31VRsq-m8R0OR6LrMOd3UDenY_W63wUptyCiIsaBYohG-U3_qFKmjdAuXUewXjR-t7GOPipe4",
   "privateKey": "X-z0v50S97HIcpTUOZheph_dhLKGg1PkjtnOcT2xqKU"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/erSFCSf3MPg:APA91bEl-QiD6gIHaGwuwBysfiVbiPXX7pimF6W2HGWK-QCF7bdr7hTEXH-1TCXLjEGN8aEfTXJWTaEskErE09p6Ic7n3L1A-_rx0vv_ZoWhz2VPQAZfwp2jG6mcXWBVU_oTQSDen4_J",
   "keys": {
       "p256dh": "BPoUDbwjsUUqSOYTY+57cazL940J7R3Ato94gSPhMwYr2XhiuTWz1mBz1lkhzTmxdmBvk6WOkirRLwJGDJygomk=",
       "auth": "hDLx2aD7hSgwmQqU4AJhLg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '409938385405',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);