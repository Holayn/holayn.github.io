import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

import {makeRectangle, drawRectangle} from './rectangle.js';
import {navigate} from './utils.js';

import {education} from './about/education.js';
import {interests} from './about/interests.js';

export const Home = Vue.component('home', {
  template: '#home',
  methods: {
    navigate,
  },
  mounted: () => {
    makeRectangle(document.getElementById('top-rectangle'), 'top-text');
    makeRectangle(document.getElementById('left-rectangle'), 'left-text');
    makeRectangle(document.getElementById('right-rectangle'), 'right-text');
  },
});

const cardContentMap = {
  education,
  interests
}

export const About = Vue.component('about', {
  template: '#about',
  data: () => {
    return {
      section: '',
      cardContent: ''
    }
  },
  methods: {
    selectSection: function(section) {
      this.section = section;
      this.cardContent = cardContentMap[section];
    }
  },
  mounted: () => {
    const elems = document.getElementsByClassName('rectangle');
    for (let i=0; i<elems.length; i++) {
      drawRectangle(elems.item(i), 75);
    }

    function addPrevClass (e) {
      const target = e.target;
      let elemPtr = target;
      let dockItem;
      while (elemPtr.className !== 'dock-item' && elemPtr !== null) {
        elemPtr = elemPtr.parentNode;
      }
      dockItem = elemPtr;
      const prevDockItem = dockItem.previousElementSibling;
      if (prevDockItem) {
        prevDockItem.classList.add('prev');

        target.addEventListener('mouseout', function() {
          prevDockItem.classList.remove('prev');
        }, false);
      }
    }

    const dockElems = document.getElementsByClassName('dock-item');
    for (let i=0; i<elems.length; i++) {
      dockElems.item(i).addEventListener('mouseover', addPrevClass, false);
    }
  },
});
