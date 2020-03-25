import Vue from 'vue'
import App from '@/App.vue'
import Router from '@/setup/router'
import KirbyApi from '@/api/kirby'
import '@/setup/registerServiceWorker'
import '@/setup/plugins'

Vue.config.productionTip = false

;(async () => {
  const home = await KirbyApi.getPage('')
  const router = await Router.init(home.site)

  Vue.prototype.$api = KirbyApi
  Vue.prototype.$home = home
  Vue.prototype.$site = home.site

  new Vue({
    router,

    computed: {
      isHomePage () {
        return this.$route.name === 'home'
      }
    },

    methods: {
      scrollTop () {
        window.scrollTo(0, 0)
      }
    },

    render: h => h(App)
  }).$mount('#app')
})()
