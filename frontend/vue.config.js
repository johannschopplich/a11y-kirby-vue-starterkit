process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  outputDir: '../public',
  productionSourceMap: false,

  // Modify the location of the generated HTML file only in production
  indexPath: process.env.NODE_ENV === 'production'
    ? '../site/templates/default.php'
    : 'index.html',

  pages: {
    index: {
      entry: 'src/main.js',
      template: 'src/index.html'
    }
  },

  devServer: {
    proxy: process.env.VUE_APP_BACKEND_URL || 'http://127.0.0.1:8080'
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
    title: process.env.VUE_APP_NAME,
    themeColor: process.env.VUE_APP_PWA_THEMECOLOR,
    msTileColor: process.env.VUE_APP_PWA_THEMECOLOR,
    iconPaths: {
      favicon16: 'img/icons/favicon-16x16.png',
      favicon32: 'img/icons/favicon-32x32.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    },
    // Add to home screen for Safari on iOS
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'default', // Possible values: `default`, `black`, and `black-translucent`
    // Generate manifest from the config object
    manifestOptions: {
      name: process.env.VUE_APP_NAME,
      short_name: process.env.VUE_APP_NAME,
      start_url: '/index.html',
      background_color: process.env.VUE_APP_PWA_THEMECOLOR,
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
          src: './img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },

    // Ability to disable service worker while keeping manifest generation
    // serviceWorker: false,

    // Configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // importWorkboxFrom: 'local',
      swSrc: 'src/sw.js',
      swDest: 'service-worker.js',
      exclude: [/\.map$/]
    }
  }
}
