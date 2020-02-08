import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import store from './store'
import i18n from './setup/i18n'
import './setup/plugins'

import ky from './api/ky'
import KirbyApi from './api/kirby'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.prototype.$ky = ky
Vue.prototype.$api = new KirbyApi()

Vue.prototype.$api.get('site').then(site => {
  new Vue({
    router: new Router(site.children),
    store,
    i18n,
    data: {
      site: site,
      currentPage: {},
      pageTitle: null
    },

    computed: {
      isHomePage () {
        return this.$route.name === 'home'
      }
    },

    mounted () {
      this.$watch(
        vm => [vm.$route.path, vm.pageTitle].join(),
        () => {
          const subTitle = !this.isHomePage ? `${this.pageTitle || ''} – ` : ''
          document.title = subTitle + this.$root.site.title
        }
      )
    },

    methods: {
      scrollTop () {
        window.scrollTo(0, 0)
      }
    },

    render: h => h(App)
  }).$mount('#app')
})
