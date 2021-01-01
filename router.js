import VueRouter from 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.4.9/vue-router.esm.browser.js';
import {About, Home, Projects} from './components.js';

export const router = new VueRouter({
  routes: [
    {
      path: '/about',
      component: About,
    },
    {
      name: 'home',
      path: '/',
      component: Home,
    },
    {
      name: 'projects',
      path: '/projects',
      component: Projects,
    }
  ],
});
