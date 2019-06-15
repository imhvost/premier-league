import './less/styles.less'
import './js/polyphiles.js'
import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import createRouter from './router'

Vue.use(Router)

const router = new Router(createRouter)

/* eslint-disable-next-line no-new */
new Vue({
  el: '#app',
  data: {
    currentSeason: '2019/20',
    seasons: {
      '2019/20': 2021
    }
  },
  render: h => h(App),
  router: router
})
