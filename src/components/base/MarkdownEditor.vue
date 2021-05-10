<template>
  <VMdEditor
    v-model="text"
    left-toolbar="h bold italic strikethrough quote | ul ol table hr | link image code"
  />
</template>

<script>
import { defineComponent, ref, watch } from '@vue/composition-api'
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor'
import '@kangc/v-md-editor/lib/style/codemirror-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import Codemirror from 'codemirror'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/lib/codemirror.css'
VMdEditor.Codemirror = Codemirror
VMdEditor.use(githubTheme)

export default defineComponent({
  components: {
    VMdEditor,
  },
  props: {
    mdContent: { type: String, default: '' }
  },
  emits: [
    'update:mdContent'
  ],
  setup (props, { emit }) {
    const text = ref(props.mdContent)
    watch(text, val => {
      emit('update:mdContent', val)
    })
    watch(props, p => {
      if (p.mdContent !== text.value) {
        text.value = p.mdContent
      }
    })
    return {
      text,
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
