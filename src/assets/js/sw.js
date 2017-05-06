// Registering ServiceWorker
if ( 'serviceWorker' in navigator ) {
  navigator.serviceWorker.register( 'sw.js' ).then((registration) => {
    console.log( 'ServiceWorker registration successful. Scope: ' + registration.scope )
  }).catch((err) => {
    console.log( 'ServiceWorker registration failed. Error: ' + err);
  });
}
