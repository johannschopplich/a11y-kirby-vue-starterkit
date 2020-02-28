import Vue from 'vue'
import App from '@/App.vue'
import Router from '@/setup/router'
import '@/setup/plugins'
import '@/registerServiceWorker'

import ky from '@/api/ky'
import KirbyApi from '@/api/kirby'

Vue.config.productionTip = false

;(async () => {
  const site = window.$site || (await KirbyApi.getPage('home')).site
  const router = await Router.init(site)

  Vue.prototype.$ky = ky
  Vue.prototype.$api = KirbyApi
  Vue.prototype.$site = site

  new Vue({
    router,

    computed: {
      isHomePage () {
        return this.$route.name === 'home'
      }
    },

    render: h => h(App)
  }).$mount('#app')
})()
