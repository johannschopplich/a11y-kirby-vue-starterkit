const WorkboxPlugin = require('workbox-webpack-plugin')
const kirby = require('./kirby.config')
const del = require('del')

const serveKirby = true
const injectKirby = true
const publicPath = '/'
const apiUrl = ''

process.env.VUE_APP_API_URL = apiUrl
process.env.VUE_APP_KIRBY_URL = apiUrl || `http://${kirby.hostname}:${kirby.port}`

// Start Kirby backend server
if (process.env.NODE_ENV === 'development' && serveKirby) {
  kirby.start()
  console.log('\x1b[32m%s\x1b[0m', `Kirby backend running at ${process.env.VUE_APP_KIRBY_URL}\n`)
}

// Clean previous build assets
if (process.env.NODE_ENV === 'production') {
  if (injectKirby) {
    del(`${kirby.baseDir}/{css,js,*.js}`)
  } else {
    del('dist')
  }
}

module.exports = {
  outputDir: injectKirby ? kirby.baseDir : 'dist',
  indexPath: process.env.NODE_ENV === 'production' && injectKirby ? kirby.indexPath : 'index.html',
  publicPath: publicPath,

  pages: {
    index: {
      entry: 'src/main.js',
      template: 'src/index.html'
    }
  },

  productionSourceMap: false,

  devServer: {
    // Ignore any file changes in `media` folder
    watchOptions: {
      ignored: [/media/]
    },
    // Setup content proxy for local environment
    proxy: {
      '/*.json': {
        target: process.env.VUE_APP_KIRBY_URL,
        pathRewrite: { [publicPath]: '/' }
      }
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
