import Vue from 'vue'
import App from '@/App.vue'
import Router from '@/setup/router'
import KirbyApi from '@/setup/api/kirby-api'
// import '@/setup/registerServiceWorker'
import '@/setup/plugins'

Vue.config.productionTip = false

;(async () => {
  const api = KirbyApi.init(process.env.VUE_APP_API_URL)
  const home = await api.getPage('home')
  const router = await Router.init(home.site)

  Vue.prototype.$api = api
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