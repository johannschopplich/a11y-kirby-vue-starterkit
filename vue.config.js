const WorkboxPlugin = require('workbox-webpack-plugin')

const config = require('./kirby.config')
const devApi = `http://${config.host}:${config.port}`
process.env.VUE_APP_API_URL = process.env.NODE_ENV === 'production' ? config.prodApi : devApi

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

  // Ignore generated Kirby assets in `media` folder
  chainWebpack: config => {
    config.plugin('copy').tap(([options]) => {
      options[0].ignore.push('media/**')
      return [options]
    })
  },

  // Setup content api proxy for local environment
  pluginOptions: {
    proxy: {
      context: (path, req) => req.url.endsWith('?content=json'),
      options: { target: `http://${config.host}:${config.port}` }
    }
  },

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
            urlPattern: /\?content=json/,
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
  }
}
