<template>
  <v-bottom-navigation v-model="selectedKey">
    <v-btn
      v-for="item in navItems"
      :key="item.path"
      :value="item.path"
    >
      <span>{{ item.alias }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { defineComponent, ref, watchEffect } from '@vue/composition-api'
import { config } from '~/config/app.config'
import { useRouter } from '~/hooks/router.hooks'

export default defineComponent({
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

</style>
