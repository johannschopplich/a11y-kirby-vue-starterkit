const path = require('path')
const config = require('./kirby.config')
const WorkboxPlugin = require('workbox-webpack-plugin')

process.env.VUE_APP_API_URL = process.env.NODE_ENV === 'production' ? config.prodApi : config.devApi

module.exports = {
  outputDir: 'public',

  // Modify the location of the generated HTML file only in production
  indexPath: process.env.NODE_ENV === 'production'
    ? path.join(__dirname, 'site/snippets/vue-index.php')
    : 'index.html',

  pages: {
    index: {
      entry: 'src/main.js',
      template: 'src/index.html'
    }
  },

  productionSourceMap: false,

  pluginOptions: {
    proxy: {
      context: (path, req) => req.url.endsWith('?content=json'),
      options: { target: `http://${config.host}:${config.port}` }
    }
  },

  configureWebpack: {
    plugins: [
      new WorkboxPlugin.GenerateSW({
        exclude: [/\.(?:json|png|jpg|jpeg|svg|ico|htaccess)$/, /index\..*/, 'media'],

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
            urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'api',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 7 // 7 days
              }
            }
          }
        ]
      })
    ]
  }
}
