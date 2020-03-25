import runtime from 'serviceworker-webpack-plugin/lib/runtime'

if (process.env.NODE_ENV === 'production') {
  let newWorker
  if ('serviceWorker' in navigator) {
    // Create a global `serviceWorkerOption`, which contains all the file names for caching
    runtime.register()

    navigator.serviceWorker
      .register(`${process.env.BASE_URL}sw.js`)
      .then(serviceWorker => {
        serviceWorker.addEventListener('updatefound', () => {
          newWorker = serviceWorker.installing
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                const elem = document.createElement('div')
                const text = document.createElement('div')
                const button = document.createElement('div')

                elem.style.cssText = `
                  position: fixed;
                  right: 0;
                  bottom: 0;
                  min-width: 320px;
                  margin: 10px;
                  background-color: rgba(0, 0, 0, 0.25);
                  border-radius: .5rem;
                  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
                  font-family: monospace; color: white;
                  font-weight: 700;
                  text-align: center;
                  cursor: pointer;
                  z-index: 1000;
                `
                text.innerHTML = 'New app version available'
                text.style.cssText = `
                  padding-top: 10px;
                  font-size: 12px
                `
                button.innerHTML = 'Click to refresh'
                button.style.cssText = `
                  padding: 10px;
                  background-color: transparent;
                  border: 0;
                  color: white;
                  font-size: 10px;
                `

                document.body.appendChild(elem)
                elem.appendChild(text)
                elem.appendChild(button)

                // Send a message to the new service worker to skip waiting for the user to reload
                elem.addEventListener('click', () => {
                  newWorker.postMessage({ action: 'skipWaiting' })
                })
              }
            }
          })
        })
      })
      .catch(error => {
        console.log('Error registering the Service Worker: ' + error)
      })
  }

  let refreshing
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return
    window.location.reload()
    refreshing = true
  })
}
