// const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
// const path = require('path')

const config = require('./kirby.config')
process.env.VUE_APP_API_URL = (process.env.NODE_ENV === 'production' ? config.prodApi : '') || config.devApi

module.exports = {
  outputDir: '../public',

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

  pluginOptions: {
    proxy: {
      context: (path, req) => req.url.endsWith('?content=json'),
      options: { target: `http://${config.host}:${config.port}` }
    }
  }

  // css: {
  //   loaderOptions: {
  //     sass: {
  //       implementation: require('sass'),
  //       prependData: `
  //         @import "@/styles/_variables.scss";
  //       `
  //     }
  //   }
  // },

  // configureWebpack: {
  //   plugins: [
  //     new ServiceWorkerWebpackPlugin({
  //       entry: path.join(__dirname, 'src/sw.js'),
  //       filename: 'sw.js'
  //     })
  //   ]
  // }
}
