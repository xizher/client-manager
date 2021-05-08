<template>
  <div id="app">
    <MessageBar />
    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    MessageBar: defineAsyncComponent(() => import('~cp/MessageBar.vue'))
  },
  setup () {
     //
  }
})
</script>

<style>

</style>
