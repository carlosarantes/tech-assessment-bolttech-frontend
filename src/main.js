import dotenv from 'dotenv';
dotenv.config();

import 'es6-promise/auto';

import Vue from 'vue';

import store from "./store";
import App from './App.vue';

import VueRouter from 'vue-router';
import VTooltip from 'v-tooltip';
import VueToastify from "vue-toastify";
import 'v-tooltip/dist/v-tooltip.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);

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
