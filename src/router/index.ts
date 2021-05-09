import Vue from 'vue'
import VueRouter, { RouteConfig, RouterMode } from 'vue-router'
import { config } from '~/config/app.config'
import { serviceCheck } from '~/services/account.service'
import { storageUtils } from '@xizher/js-utils'

// to fix: Error: Avoided redundant navigation to current location
const originalPush = VueRouter.prototype.push
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
   VueRouter.prototype.push = function push (location) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
   return originalPush.call(this, location).catch(err => err)
}

const { routesConfig, mode } = config.routerConfig
Vue.use(VueRouter)

const modules = import.meta.glob('../views/**/*.vue')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseRoute (item: any) : RouteConfig {
  if (item.redirect && item.path) {
    return item
  }
  let children
  if (item.children) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    children = item.children.map(i => parseRoute(i))
  }
  return {
    name: item.name,
    path: `/${item.name}`,
    component: modules[`../views/${item.name}.view.vue`],
    children,
  }
}

const routes: RouteConfig[] = [
  ...routesConfig.map(item => parseRoute(item)),
  // { path: '/', redirect: '/main' },
]

const router = new VueRouter({
  routes,
  mode: mode as RouterMode, // hash abstract history
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    serviceCheck().then(res => {
      if (!res.data) {
        router.push('/login')
      } else {
        storageUtils.local.set('account', res.data)
        next()
      }
    })
  } else {
    next()
  }
})

export default router
