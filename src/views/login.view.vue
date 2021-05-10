<template>
  <LoginWarp />
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    LoginWarp: () => import('~/components/LoginWarp.vue')
  },
  setup () {
    return {

    }
  }
})
</script>

<style scoped>

</style>
