import VueRouter from 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.4.9/vue-router.esm.browser.js';
import {Blog} from './components/blog.js';
import {About} from './components/about/about.js';
import {Home} from './components/home.js';
import {Projects} from './components/projects.js';
import {XpSkills} from './components/xpskills/xpskills.js';

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
    },
    {
      name: 'blog',
      path: '/blog',
      component: Blog,
    },
    {
      name: 'xpskills',
      path: '/xpskills',
      component: XpSkills,
    }
  ],
});
