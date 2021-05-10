import Vue from 'vue'
import Vuetify, {
  VDataTable,
  VBtn,
  VTextField,
  VTextarea,
  VCombobox,
  VCheckbox,
  VBottomNavigation,
  VToolbar,
  VSnackbar,
  VDialog,
  VBottomSheet,
  VSpacer,
  VCard,
  VIcon,
  VToolbarTitle,
  VToolbarItems,
  VCardTitle,
  VCardText,
  VCardActions,
} from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VDataTable,
    VBtn,
    VTextField,
    VTextarea,
    VCombobox,
    VCheckbox,
    VBottomNavigation,
    VToolbar,
    VSnackbar,
    VDialog,
    VBottomSheet,
    VSpacer,
    VCard,
    VIcon,
    VToolbarTitle,
    VToolbarItems,
    VCardTitle,
    VCardText,
    VCardActions,
  }
})

export default new Vuetify()
