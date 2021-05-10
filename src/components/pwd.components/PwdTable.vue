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
      <template #[`item.pwd`]="{ item }">
        {{ item.show ? decrypto(item.pwd) : '******************' }}
      </template>
      <template #[`item.actions`]="{ item }">
        <v-btn
          small
          @click="showDeleteDialog(item.id)"
        >
          删除
        </v-btn>
        <v-btn
          small
          @click="modity(item)"
        >
          编辑
        </v-btn>
        <v-btn
          small
          @click="item.show = !(!!item.show)"
        >
          {{ item.show ? '加密' : '解密' }}
        </v-btn>
        <v-btn
          small
          @click="copy(decrypto(item.pwd))"
        >
          复制
        </v-btn>
      </template>
    </v-data-table>
    <PwdModityDialog
      :visible.sync="modityVisible"
      :item="modityItem"
    />
    <v-dialog
      v-model="deleteVisible"
      max-width="290"
    >
      <v-card>
        <v-card-title>
          提醒
        </v-card-title>
        <v-card-text>确认删除？</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="deleteExec"
          >
            确认
          </v-btn>
          <v-btn
            text
            @click="deleteVisible = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import { useCryptoKey, useDelete, useList } from '~/hooks/pwd.hooks'
import { baseUtils } from '@xizher/js-utils'

export default defineComponent({
  components: {
    PwdModityDialog: () => import('./PwdModityDialog.vue')
  },
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
    const deleteVisible = ref(false)
    const deleteId = ref('')
    const showDeleteDialog = id => {
      deleteId.value = id
      deleteVisible.value = true
    }
    const deleteExec = () => {
      deleteById(deleteId.value)
      deleteVisible.value = false
    }
    return {
      ...useList(), decrypto, copy, deleteExec, modityVisible, modity, modityItem, deleteVisible, showDeleteDialog
    }
  }
})
</script>

<style scoped>

</style>
