import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import appConfig from './config/app.config'
import services from './services'
import vuetify from './plugins/vuetify'
import './styles/index.scss'

Vue.use(VueCompositionAPI)
Vue.use(appConfig)
Vue.use(services)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  vuetify,
})
