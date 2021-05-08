<template>
  <v-snackbar
    v-model="visible"
    timeout="3000"
    top
    centered
  >
    {{ text }}
    <template #action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import useMessageState from '~hooks/message.hooks'
export default defineComponent({
  name: '',
  setup () {
    return {
      ...useMessageState()
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
