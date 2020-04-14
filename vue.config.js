const WorkboxPlugin = require('workbox-webpack-plugin')
const kirby = require('./kirby.config')
const del = require('del')

const devApiUrl = `http://${kirby.hostname}:${kirby.port}`

process.env.VUE_APP_API_URL = process.env.NODE_ENV === 'development' ? devApiUrl : ''
if (process.env.NODE_ENV === 'development') kirby.start()
if (process.env.NODE_ENV === 'production') del(`${kirby.baseDir}/{css,js,*.js}`)

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

  // Ignore any file changes in `media` folder
  devServer: {
    watchOptions: {
      ignored: [/media/]
    },
    // Setup content api proxy for local environment
    proxy: {
      '**?content=json': {
        target: devApiUrl,
        ws: true,
        changeOrigin: true
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
            urlPattern: /\?content=json$/,
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
