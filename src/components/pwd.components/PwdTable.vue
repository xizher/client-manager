<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/no-deprecated-v-bind-sync -->
<template>
  <div>
    <v-data-table
      data-app="true"
      :headers="headers"
      :options.sync="options"
      :server-items-length="total"
      :items="dataSource"
      :loading="loading"
    >
      <template #item.pwd="{ item }">
        {{ item.show ? decrypto(item.pwd) : '******************' }}
      </template>
      <template #item.actions="{ item }">
        <v-btn @click="deleteById(item.id)">
          删除
        </v-btn>
        <v-btn @click="modity(item)">
          编辑
        </v-btn>
        <v-btn @click="item.show = !(!!item.show)">
          {{ item.show ? '加密' : '解密' }}
        </v-btn>
        <v-btn @click="copy(decrypto(item.pwd))">
          复制
        </v-btn>
      </template>
    </v-data-table>
    <PwdModityDialog
      :visible.sync="modityVisible"
      :item="modityItem"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import { useCryptoKey, useDelete, useList } from '~/hooks/pwd.hooks'
import { baseUtils } from '@xizher/js-utils'
import PwdModityDialog from './PwdModityDialog.vue'

export default defineComponent({
  components: { PwdModityDialog },
  setup () {
    const [, decrypto] = useCryptoKey()
    const copy = pwd => baseUtils.copyText(pwd)
    const deleteById = useDelete()
    const modityItem = ref({})
    const modityVisible = ref(false)
    const modity = item => {
      modityVisible.value = true
      modityItem.value = item
    }
    return {
      ...useList(), decrypto, copy, deleteById, modityVisible, modity, modityItem
    }
  }
})
</script>

<style scoped>

</style>
