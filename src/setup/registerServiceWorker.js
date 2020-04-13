import runtime from 'serviceworker-webpack-plugin/lib/runtime'

if (process.env.NODE_ENV === 'production') {
  let newWorker
  if ('serviceWorker' in navigator) {
    // Create a global `serviceWorkerOption`, which contains all files to cache
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
                  bottom: 0;
                  left: 50%;
                  background-color: #333;
                  color: #fff;
                  font-family: system-ui, sans-serif;
                  border-top-left-radius: 0.25rem;
                  border-top-right-radius: 0.25rem;
                  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.25);
                  padding: 0.5rem 1rem;
                  transform: translateX(-50%);
                  text-align: center;
                  cursor: pointer;
                  z-index: 1000;
                `

                text.textContent = 'New app version available'
                text.style.cssText = `
                  margin-bottom: 0.25rem;
                `

                button.textContent = 'Click to refresh'
                button.style.cssText = `
                  font-size: 0.75em;
                  text-transform: uppercase;
                `

                document.body.appendChild(elem)
                elem.appendChild(text)
                elem.appendChild(button)

                // Send a message to the new service worker to skip waiting
                elem.addEventListener('click', () => {
                  newWorker.postMessage({ action: 'skipWaiting' })
                })
              }
            }
          })
        })
      })
      .catch(error => {
        console.log(`Error registering the Service Worker: ${error}`)
      })
  }

  let refreshing
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return
    window.location.reload()
    refreshing = true
  })
}
