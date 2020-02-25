process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  outputDir: '../public',
  productionSourceMap: false,

  // Modify the location of the generated HTML file only in production
  indexPath: process.env.NODE_ENV === 'production'
    ? '../site/templates/default.php'
    : 'index.html',

  devServer: {
    proxy: process.env.VUE_APP_BACKEND_URL
  },

  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        prependData: `
          @import "@/styles/_variables.scss";
        `
      }
    }
  },

  pwa: {
    name: process.env.VUE_APP_NAME,
    themeColor: process.env.PWA_THEMECOLOR,
    msTileColor: process.env.VUE_APP_PWA_MSTILECOLOR,
    appleMobileWebAppCapable: 'yes',
    // Possible values: `default`, `black`, and `black-translucent`
    appleMobileWebAppStatusBarStyle: 'default',
    // Generate `manifest.json` from the config object
    // rather than directly copy it from the public folder
    manifestOptions: {
      start_url: '/index.html',
      background_color: '#ffffff',
      // Copy all default icons and add new maskable icon
      icons: [
        {
          src: './img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        // Android Oreo introduced adaptive icons, a new icon format that enforces
        // the same shape for all icons on the home screen:
        // https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive
        // Icons that don’t follow the new format are given a white background
        {
          src: './img/icons/android-maskable-196x196.png',
          sizes: '196x196',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },

    // Configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // importWorkboxFrom: 'local',
      swSrc: 'src/service-worker.js',
      swDest: 'service-worker.js',
      exclude: [/\.map$/]
    }
  }
}
