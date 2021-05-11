<template>
  <div class="view-main">
    <RouterView class="content" />
    <BottomNav class="nav" />
  </div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted } from '@vue/composition-api'

export default defineComponent({
  components: {
    BottomNav: () => import('~/components/BottomNav.vue')
  },
  setup () {

    function handleResize () {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    onMounted(() => {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      window.addEventListener('resize', handleResize)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })
  }
})
</script>

<style lang="scss" scoped>
.view-main {
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
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
