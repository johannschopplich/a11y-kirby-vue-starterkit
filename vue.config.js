const WorkboxPlugin = require('workbox-webpack-plugin')

const config = require('./kirby.config')
const devApiUrl = `http://${config.devHost}:${config.devPort}`
process.env.VUE_APP_API_URL = process.env.NODE_ENV === 'production' ? config.apiUrl : devApiUrl

module.exports = {
  publicPath: config.publicPath,
  outputDir: 'public',

  // Modify the location of the generated HTML file only in production
  indexPath: process.env.NODE_ENV === 'production'
    ? '../site/snippets/vue-index.php'
    : 'index.html',

  pages: {
    index: {
      entry: 'src/main.js',
      template: 'src/index.html'
    }
  },

  productionSourceMap: false,

  configureWebpack: {
    plugins: [
      new WorkboxPlugin.GenerateSW({
        include: ['css', 'js', 'index.html'],

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

  // Exclude generated Kirby panel bundles in `media` folder from Vue CLI output
  chainWebpack: config => {
    config.plugin('copy').tap(([options]) => {
      options[0].ignore.push('media/**')
      return [options]
    })
  }
}
