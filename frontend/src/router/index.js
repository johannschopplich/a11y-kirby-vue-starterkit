import Vue from 'vue'
import VueRouter from 'vue-router'
import { capitalize } from '@/mixins/general'

import Home from '@/views/Home.vue'

Vue.use(VueRouter)

export default class Router {
  constructor (pages) {
    const routes = [
      {
        path: '/',
        name: 'home',
        component: Home
      }
    ]

    for (const page of pages) {
      routes.push({
        path: `/${page.url}`,
        component: () => import(`@/views/${this.capitalize(page.template)}.vue`)
      })

      if (page.hasChildren) {
        routes.push({
          path: `/${page.url}/:id`,
          component: () => import(`@/views/${this.capitalize(page.childTemplate)}.vue`)
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

  capitalize = capitalize.methods.capitalize
}
