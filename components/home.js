import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

import {navigate} from '../../utils.js';
import {makeRectangle} from '../rectangle.js';


export const Home = Vue.component('home', {
  template: '#home',
  methods: {
    makeRectangles() {
      makeRectangle(this.$refs['top-rectangle'], 'top-text');
      makeRectangle(this.$refs['left-rectangle'], 'left-text');
      makeRectangle(this.$refs['right-rectangle'], 'right-text');
      makeRectangle(this.$refs['bottom-rectangle'], 'bottom-text');
    },
    navigate,
    onResize() {
      // Only call makeRectangles() when hitting breakpoint
      if (window.innerWidth < 1024 && !window.smallWidth) {
        window.smallWidth = true;
        this.makeRectangles();
      } else if (window.innerWidth >= 1024 && window.smallWidth) {
        window.smallWidth = false;
        this.makeRectangles();
      }
    }
  },
  mounted: function() {
    this.makeRectangles();
    window.addEventListener('resize', this.onResize);
  },
  destroyed: function() {
    window.removeEventListener('resize', this.onResize);
  },
});