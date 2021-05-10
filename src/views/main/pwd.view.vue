<template>
  <div>
    <CryptoKeyInput />
    <PwdAddBtn />
    <PwdTable />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    CryptoKeyInput: () => import('~/components/pwd.components/CryptoKeyInput.vue'),
    PwdAddBtn: () => import('~/components/pwd.components/PwdAddBtn.vue'),
    PwdTable: () => import('~/components/pwd.components/PwdTable.vue'),
  },
  setup () {
    return {
    }
  }
})
</script>

<style scoped>

</style>
