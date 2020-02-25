import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const capitalize = ([first, ...rest], lowerRest = false) => first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''))

export default {
  async init (site) {
    for (const page of site.children) {
      routes.push({
        path: `/${page.uri}`,
        component: () => import(`@/views/${capitalize(page.template)}.vue`)
      })

      if (page.childTemplate) {
        routes.push({
          path: `/${page.uri}/:id`,
          component: () => import(`@/views/${capitalize(page.childTemplate)}.vue`)
        })
      }
    }

    // Add a catch-all route
    routes.push({
      path: '*',
      redirect: { name: 'home' }
    })

    return new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes
    })
  }
}
