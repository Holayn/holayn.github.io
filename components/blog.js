import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

import {navigate} from '../../utils.js';

export const Blog = Vue.component('blog', {
  template: '#blog',
  methods: {
    navigate,
  },
});
