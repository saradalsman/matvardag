import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faSyncAlt,
  faPlus,
  faMinus,
  faTrash,
  faEdit,
  faBars
} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faChevronUp, faChevronDown, faChevronLeft, faSyncAlt, faPlus, faMinus, faTrash, faEdit, faBars);

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
