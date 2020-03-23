module.exports = {
  outputDir: '../public',
  productionSourceMap: false,

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

  devServer: {
    proxy: process.env.VUE_APP_BACKEND_URL || 'http://127.0.0.1:8080',
    disableHostCheck: true
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
}
