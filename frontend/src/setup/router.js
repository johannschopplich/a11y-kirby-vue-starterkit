import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const capitalize = ([first, ...rest], lowerRest = false) => first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''))

export default {
  async init (site) {
    const routes = []

    // Published pages
    for (const page of site.children) {
      routes.push({
        path: `/${page.id}`,
        component: () => import(`@/views/${capitalize(page.template)}.vue`)
      })

      if (page.children) {
        for (const childPage of page.children) {
          routes.push({
            path: `/${childPage.id}`,
            component: () => import(`@/views/${capitalize(childPage.template)}.vue`)
          })
        }
      }
    }

    // Redirect `/home` to `/`
    routes.find(route => route.path === '/home').path = '/'
    routes.push({ path: '/home', redirect: '/' })

    // Catch-all fallback for error route
    routes.push({ path: '*', redirect: '/error' })

    return new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes
    })
  }
}
