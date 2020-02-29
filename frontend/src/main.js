import Vue from 'vue'
import App from '@/App.vue'
import Router from '@/setup/router'
import KirbyApi from '@/api/kirby'
import '@/setup/plugins'
import '@/setup/register-service-worker'

Vue.config.productionTip = false

;(async () => {
  const site = window.$site || (await KirbyApi.getPage('home')).site
  const router = await Router.init(site)

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
