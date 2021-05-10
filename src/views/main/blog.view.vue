<template>
  <div>
    <BlogTable />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import BlogTable from '~/components/blog.components/BlogTable.vue'

export default defineComponent({
  components: {
    BlogTable,
  },
  setup () {
    return {

    }
  }
})
</script>

<style scoped>

</style>
