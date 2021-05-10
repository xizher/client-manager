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
      <template #top>
        <v-toolbar flat>
          <v-btn
            block
            @click="blogAddDialogVisible = true"
          >
            添加
          </v-btn>
        </v-toolbar>
      </template>
      <template #[`item.publish`]="{ item }">
        <v-checkbox
          v-model="item.publish"
          @change="handleChange(item)"
        />
      </template>
      <template #[`item.actions`]="{ item }">
        <v-btn
          small
          @click="modity(item)"
        >
          详情
        </v-btn>
      </template>
    </v-data-table>
    <BlogAddDialog
      :visible="blogAddDialogVisible"
      @cancel="blogAddDialogVisible = false"
    />
    <BlogModityDialog
      :visible="blogModityDialogVisible"
      :item="modityItem"
      @cancel="blogModityDialogVisible = false"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import { useList, useModity } from '~/hooks/blog.hooks'

export default defineComponent({
  components: {
    BlogAddDialog: () => import('./BlogAddDialog.vue'),
    BlogModityDialog: () => import('./BlogModityDialog.vue'),
  },
  setup () {
    const blogAddDialogVisible = ref(false)
    const blogModityDialogVisible = ref(false)
    const modityItem = ref({})
    const modity = item => {
      blogModityDialogVisible.value = true
      modityItem.value = item
    }
    const { submit, ...state } = useModity()
    const handleChange = item => {
      Object.keys(state).forEach(key => state[key].value = item[key])
      submit()
    }
    return {
      ...useList(),
      blogAddDialogVisible,
      handleChange,
      blogModityDialogVisible,
      modity,
      modityItem,
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
