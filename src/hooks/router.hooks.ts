import { getCurrentInstance } from '@vue/composition-api'
import VueRouter from 'vue-router'

interface IRouterHook {
  push (path: string) : void
}

let router: VueRouter | undefined

export function useRouter () : IRouterHook {
  if (!router) {
    router = getCurrentInstance()?.proxy.$router
  }
  return {
    push (path: string) {
      router?.push(path)
    },
  }
}
