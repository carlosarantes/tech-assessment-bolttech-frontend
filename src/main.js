import 'es6-promise/auto'

import Vue from 'vue'

import store from "./store";
import App from './App.vue'

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
