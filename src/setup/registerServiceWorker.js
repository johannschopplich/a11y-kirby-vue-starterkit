import { Workbox } from 'workbox-window'

let wb = null

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  wb = new Workbox(`${process.env.BASE_URL}service-worker.js`)

  wb.addEventListener('activated', event => {
    // `event.isUpdate` will be true if another version of the service
    // worker was controlling the page when this version was registered.
    if (!event.isUpdate) {
      console.log('Service worker activated for the first time!')
    }
  })

  wb.addEventListener('waiting', () => {
    console.log('A new service worker has installed, but it can\'t activate until all tabs running the current version have fully unloaded.')
  })

  wb.addEventListener('controlling', () => {
    window.location.reload()
  })

  wb.register()
}

export default wb
