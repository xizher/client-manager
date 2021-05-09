<template>
  <div>
    <v-btn
      block
      @click="show = true"
    >
      新增
    </v-btn>

    <v-bottom-sheet
      v-model="show"
      inset
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
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import { useCreate } from '~/hooks/pwd.hooks'

export default defineComponent({
  setup () {
    const show = ref(false)
    const { submit, ...state } = useCreate()
    const submitExec = () => {
      submit().then(success => {
        if (success) {
          show.value = false
        }
      })
    }
    return {
      show, ...state, submitExec
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
