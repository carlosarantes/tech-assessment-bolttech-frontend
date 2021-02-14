import 'es6-promise/auto'

import Vue from 'vue'

import store from "./store";
import App from './App.vue'

import VueRouter from 'vue-router'
import VTooltip from 'v-tooltip'
import VueToastify from "vue-toastify";
import 'v-tooltip/dist/v-tooltip.css'

Vue.use(VueToastify);
Vue.use(VTooltip)
Vue.use(VueRouter);

import LoginForm from "./components/auth/LoginForm";
import Registration from "./components/auth/Registration";
import Panel from "./components/Panel";

const router = new VueRouter({
  routes : [
    { path: '/', component: LoginForm },
    { path: '/login', component: LoginForm },
    { path: '/registration', component: Registration },
    { path: '/dashboard', component: Panel }
  ]
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
