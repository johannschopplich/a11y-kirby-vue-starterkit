const DEBUG = false
const CACHE_NAME = new Date().toISOString()
const { assets } = global.serviceWorkerOption
const assetsToCache = [...assets, './'].map(path => new URL(path, global.location).toString())

self.addEventListener('install', event => {
  event.waitUntil(
    global.caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(assetsToCache))
      .then(() => {
        if (DEBUG) console.log('Cached assets: main', assetsToCache)
      })
  )
})

self.addEventListener('activate', event => {
  if (DEBUG) console.log('Service Worker activating…')
  event.waitUntil(
    global.caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete the caches that are not the current one
          if (cacheName.indexOf(CACHE_NAME) === 0) return null
          return global.caches.delete(cacheName)
        })
      )
    })
  )
})

// Catch `skipWaiting` action and switch to the new service worker
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') self.skipWaiting()
})

// Basic strategy to check if anything changed on the server-side and if yes, fetch it
self.addEventListener('fetch', event => {
  const request = event.request
  const { method, url } = request
  const requestUrl = new URL(url)

  // Ignore non-get requests
  if (method !== 'GET') return

  // Ignore different origin
  if (requestUrl.origin !== location.origin) return

  const resource = global.caches.match(request).then(response => {
    if (response) {
      if (DEBUG) console.log(`[SW] Fetch URL ${requestUrl.href} from cache`)
      return response
    }

    // Load and cache known assets
    return fetch(request)
      .then(responseNetwork => {
        if (!responseNetwork || !responseNetwork.ok) {
          if (DEBUG) console.log(`[SW] URL [${requestUrl.toString()}] wrong responseNetwork: ${responseNetwork.status} ${responseNetwork.type}`)
          return responseNetwork
        }

        if (DEBUG) console.log(`[SW] URL ${requestUrl.href} fetched`)

        const responseCache = responseNetwork.clone()

        global.caches
          .open(CACHE_NAME)
          .then(cache => cache.put(request, responseCache))
          .then(() => {
            if (DEBUG) console.log(`[SW] Cache asset: ${requestUrl.href}`)
          })

        return responseNetwork
      })
      .catch(() => {
        // User is landing on the page
        return event.request.mode === 'navigate' ? global.caches.match('./') : null
      })
  })

  event.respondWith(resource)
})
