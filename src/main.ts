import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import appConfig from './config/app.config'

Vue.use(VueCompositionAPI)
Vue.use(appConfig)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
})
