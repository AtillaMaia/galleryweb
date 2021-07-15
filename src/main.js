// import Vue from 'vue'
// import App from './App.vue'

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')


import Vue from 'vue'
import App from './App.vue'
import router from './routes.js'
import store from './store'
import IdleVue from 'idle-vue'
import 'bootstrap/dist/css/bootstrap.min.css'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as farThumbsUp, faComment as farComment} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(farThumbsUp, faThumbsUp, farComment)

Vue.component('font-awesome-icon', FontAwesomeIcon)

const eventsHub = new Vue()

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 3600000 // 1h
 })

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin)) {
    if (!store.getters.loggedIn) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')