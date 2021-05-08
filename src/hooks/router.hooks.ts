import { getCurrentInstance } from '@vue/composition-api'

interface IRouterHook {
  push (path: string) : void
}

export function useRouter () : IRouterHook {
  const router = getCurrentInstance()?.proxy.$router
  return {
    push (path: string) {
      router?.push(path)
    },
  }
}
