import Vue from 'vue'
import VueRouter from 'vue-router'
import Default from '@/views/Default.vue'

Vue.use(VueRouter)

const capitalize = ([first, ...rest], lowerRest = false) => first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''))

export default {
  init: async site => {
    const routes = []

    // Published pages
    for (const page of site.children) {
      routes.push({
        path: `/${page.id}`,
        component: () => import(`@/views/${capitalize(page.template)}.vue`).catch(() => Default)
      })

      for (const child of page.children) {
        routes.push({
          path: `/${child.id}`,
          component: () => import(`@/views/${capitalize(child.template)}.vue`).catch(() => Default)
        })
      }
    }

    // Redirect `/home` to `/`
    routes.find(route => route.path === '/home').path = '/'
    routes.push({ path: '/home', redirect: '/' })

    // Catch-all fallback
    routes.push({ path: '*', component: Default })

    return new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes
    })
  }
}
