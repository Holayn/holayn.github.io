import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';
import VueRouter from 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.4.9/vue-router.esm.browser.js';

import {router} from './router.js';

Vue.use(VueRouter);

const vm = new Vue({
  el: '#app',
  router,
});
