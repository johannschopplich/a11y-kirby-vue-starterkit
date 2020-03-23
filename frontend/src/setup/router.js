import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Default from '@/views/Default.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    redirect: { name: 'home' }
  },
  {
    path: '*',
    name: 'Default',
    component: Default
  }
]

const capitalize = ([first, ...rest], lowerRest = false) => first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''))

export default {
  async init (site) {
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

    return new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes
    })
  }
}
