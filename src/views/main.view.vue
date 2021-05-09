<template>
  <div class="view-main">
    <RouterView class="content" />
    <BottomNav class="nav" />
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from '@vue/composition-api'
import BottomNav from '~/components/BottomNav.vue'
import { config } from '~/config/app.config'
import { useRouter } from '~/hooks/router.hooks'

export default defineComponent({
  components: { BottomNav },
  setup () {
    const { navConfig } = config
    const navItems = navConfig.items
    const selectedKey = ref(navConfig.defaultPath)
    const router = useRouter()
    watchEffect(() => router.push(selectedKey.value))
    return {
      navItems, selectedKey
    }
  }
})
</script>

<style lang="scss" scoped>
.view-main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    overflow: auto;
  }
  .nav {
    margin-top: auto;
    overflow-x: auto;
  }
}
</style>
