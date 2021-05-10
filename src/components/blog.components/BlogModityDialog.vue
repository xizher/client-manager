<!-- eslint-disable vue/no-deprecated-v-bind-sync -->

<template>
  <v-dialog
    :value="visible"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar
        color="primary"
      >
        <v-btn
          icon
          @click="cancel"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>修改文档</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn
            text
            @click="submitExec"
          >
            提交
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <div class="form">
        <v-text-field
          v-model="title"
          label="标题"
          solo
          hide-details
        />
        <v-textarea
          v-model="description"
          solo
          hide-details
          label="概要"
        />
        <v-combobox
          v-model="keywords"
          label="关键词"
          multiple
          solo
          hide-details
          chips
        />
      </div>
      <MarkdownEditor
        :md-content.sync="content"
        style="height: calc(100vh - 64px)"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent, watch } from '@vue/composition-api'
import { useModity } from '~/hooks/blog.hooks'

export default defineComponent({
  components: {
    MarkdownEditor: () => import('../base/MarkdownEditor.vue')
  },
  props: {
    visible: { type: Boolean, default: false },
    item: { type: Object, default: () => {} },
  },
  emits: [
    'cancel'
  ],
  setup (props, { emit }) {
    const cancel = () => emit('cancel')
    const { submit, ...state } = useModity()
    watch(() => props.item, item => {
      Object.keys(state).forEach(key => state[key].value = item[key])
      state.content.value = item.content
    })
    const submitExec = () => {
      submit().then(success => {
        if (success) {
          cancel()
        }
      })
    }
    return {
      cancel,
      ...state,
      submitExec,
    }
  }
})
</script>

<style lang="scss" scoped>
.form {
  > * {
  margin: 8px;
  }
}
</style>
