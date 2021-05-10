<template>
  <div>
    <BlogTable />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    BlogTable: () => import('~/components/blog.components/BlogTable.vue'),
  },
  setup () {
    return {

    }
  }
})
</script>

<style scoped>

</style>
