<template>
  <v-text-field
    v-model="key"
    class="crypto-key-input"
    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :type="show ? 'text' : 'password'"
    label="key"
    solo
    dense
    hide-details
    @click:append="show = !show"
  />
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import { useCryptoKey } from '~hooks/pwd.hooks'

export default defineComponent({
  setup () {
    const [key] = useCryptoKey()
    const show = ref(false)

    return {
      key,
      show,
    }
  }
})
</script>

<style scoped>
.crypto-key-input {
  margin: 4px;
}
</style>
