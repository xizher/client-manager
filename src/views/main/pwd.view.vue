<template>
  <div>
    <CryptoKeyInput />
    <PwdAddBtn />
    <PwdTable />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import CryptoKeyInput from '~/components/pwd.components/CryptoKeyInput.vue'
import PwdAddBtn from '~/components/pwd.components/PwdAddBtn.vue'
import PwdTable from '~/components/pwd.components/PwdTable.vue'

export default defineComponent({
  components: {
    CryptoKeyInput,
    PwdTable,
    PwdAddBtn,
  },
  setup () {
    return {
    }
  }
})
</script>

<style scoped>

</style>
