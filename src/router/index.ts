import Vue from 'vue'
import { defineComponent } from '@vue/composition-api'
import VueRouter, { RouteConfig, RouterMode } from 'vue-router'
import { config } from '~/config/app.config'

const { routesConfig, mode } = config.routerConfig
Vue.use(VueRouter)

const routes: RouteConfig[] = [
  ...routesConfig.map(item => {
    if (item.redirect && item.path) {
      return item
    }
    return {
      name: item.name,
      path: `/${item.name}`,
      component: defineComponent(() => import(`../views/${item.name}.view.vue`)),
    }
  }),
  // { path: '/', redirect: '/main' },
]

const router = new VueRouter({
  routes,
  mode: mode as RouterMode, // hash abstract history
})

export default router
