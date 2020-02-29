/* global workbox */

// Wait for user's confirmation to update the app
// Listen for messages of type `SKIP_WAITING` and run the skipWaiting() method,
// forcing the service worker to activate right away
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

workbox.core.setCacheNameDetails({ prefix: 'app' })
workbox.core.clientsClaim()

// Cache images
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|webp|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
      })
    ]
  })
)

// Cache api requests (Kirby JSON content representations)
workbox.routing.registerRoute(
  /.*\.json/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 // 1 day
      })
    ]
  })
)

// Cache and respond to requests for URLs in the manifest
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
