import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.less'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import '../github-markdown-css'

import dayjs from '@/utils/datjs'

Vue.filter('tiemCeart', (res) => {
  return dayjs(res).fromNow()
})
Vue.filter('timerCeart', (res) => {
  return dayjs(res).format('YYYY-MM-DD')
})

Vue.use(Vant)
Vue.use(dayjs)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
