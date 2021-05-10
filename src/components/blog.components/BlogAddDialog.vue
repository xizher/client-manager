<!-- eslint-disable vue/no-deprecated-v-bind-sync -->

<template>
  <div>
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
          <v-toolbar-title>添加文档</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              text
              @click="dialog = true"
            >
              提交
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <MarkdownEditor
          :md-content.sync="content"
          style="height: calc(100vh - 64px)"
        />
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog"
      max-width="800"
    >
      <v-card>
        <v-card-title />
        <v-card-text class="form">
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
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="dialog = false"
          >
            取消
          </v-btn>
          <v-btn
            text
            @click="submitExec"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import { useCreate } from '~/hooks/blog.hooks'

export default defineComponent({
  components: {
    MarkdownEditor: () => import('../base/MarkdownEditor.vue')
  },
  props: {
    visible: { type: Boolean, default: false }
  },
  emits: [
    'cancel'
  ],
  setup (props, { emit }) {
    const cancel = () => emit('cancel')
    const { submit, ...state } = useCreate()
    const submitExec = () => {
      submit().then(success => {
        if (success) {
          dialog.value = false
          cancel()
        }
      })
    }
    const dialog = ref(false)
    return {
      cancel,
      ...state,
      dialog,
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
