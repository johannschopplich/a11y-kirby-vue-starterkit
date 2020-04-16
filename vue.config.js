const WorkboxPlugin = require('workbox-webpack-plugin')
const kirby = require('./kirby.config')
const del = require('del')

const serveKirby = true
const kirbyUrl = `http://${kirby.hostname}:${kirby.port}`

// Start Kirby backend server
if (process.env.NODE_ENV === 'development' && serveKirby) {
  kirby.start()
  console.log('\x1b[32m%s\x1b[0m', `Kirby backend running at ${kirbyUrl}\n`)
}

// Clean previous build assets
if (process.env.NODE_ENV === 'production') {
  del(`${kirby.baseDir}/{css,js,*.js}`)
}

module.exports = {
  outputDir: kirby.baseDir,
  indexPath: process.env.NODE_ENV === 'production' ? kirby.indexPath : 'index.html',

  pages: {
    index: {
      entry: 'src/main.js',
      template: 'src/index.html'
    }
  },

  productionSourceMap: false,

  devServer: {
    // If e.g. POST requests are sent to the Kirby server, the proxy for
    // local environment has to be changed to: `proxy: kirbyUrl`
    proxy: {
      '/*.json': {
        target: kirbyUrl
      }
    },
    // Ignore any file changes in `media` folder
    watchOptions: {
      ignored: [/media/]
    }
  },

  configureWebpack: {
    plugins: [
      new WorkboxPlugin.GenerateSW({
        include: ['css', 'js', 'index.html'],
        // Force the service worker to activate immediately,
        // instead of waiting for existing clients to close
        skipWaiting: true,

        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 30
              }
            }
          },
          {
            urlPattern: /\.json$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'content',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 14 // 14 days
              }
            }
          }
        ]
      })
    ]
  },

  // Exclude generated Kirby panel bundles in `media` folder from Vue CLI output
  chainWebpack: config => {
    config.plugin('copy').tap(([options]) => {
      options[0].ignore.push('media/**')
      return [options]
    })
  }
}
