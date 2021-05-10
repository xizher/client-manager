<template>
  <v-bottom-sheet
    :value="visible"
    inset
    @click:outside="handleCancel"
  >
    <v-sheet class="text-center form">
      <v-text-field
        v-model="name"
        label="账户"
        solo
        hide-details
      />
      <v-text-field
        v-model="pwd"
        label="口令"
        type="password"
        solo
        hide-details
      />
      <v-text-field
        v-model="comment"
        label="备注"
        solo
        hide-details
      />
      <v-btn
        style="width: calc(100% - 16px)"
        @click="submitExec"
      >
        提交
      </v-btn>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import { defineComponent, watch } from '@vue/composition-api'
import { useCryptoKey, useModity } from '~/hooks/pwd.hooks'

export default defineComponent({
  props: {
    visible: { type: Boolean, default: false },
    item: { type: Object, default: () => {} },
  },
  emits: [
    'update:visible'
  ],
  setup (props, { emit }) {
    const { submit, ...state } = useModity()
    const [, decrypto] = useCryptoKey()
    watch(() => props.item, item => {
      Object.keys(state).forEach(key => state[key].value = item[key])
      state.pwd.value = decrypto(item.pwd)
    })
    const handleCancel = () => emit('update:visible', false)
    const submitExec = () => {
      submit().then(success => {
        if (success) {
          emit('update:visible', false)
        }
      })
    }
    return {
      handleCancel,
      ...state, submitExec
    }
  }
})
</script>

<style lang="scss" scoped>
.form {
  padding-top: 4px;
  > * {
  margin: 8px;
  }
}
</style>
