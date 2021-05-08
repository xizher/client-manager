import { reactive, Ref, toRefs } from '@vue/composition-api'

export interface IMessageState {
  visible: boolean
  text: string
}

export interface IMessageStateRef {
  visible: Ref<boolean>
  text: Ref<string>
}

let state : IMessageState | null = null

function useMessageState () : IMessageStateRef {
  if (!state) {
    state = reactive({
      visible: false,
      text: ''
    })
  }
  return { ...toRefs(state) }
}

export default useMessageState

export interface IMessageHook {
  show (msg: string) : void
}

export function useMessage () : IMessageHook {
  return {
    show (msg: string) {
      state && (state.text = msg)
      state && (state.visible = true)
    }
  }
}
