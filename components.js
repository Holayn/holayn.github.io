import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

import {makeRectangle} from './rectangle.js';
import {navigate} from './utils.js';

import {defaultContent} from './about/default.js';
import {education} from './about/education.js';
import {interests} from './about/interests.js';

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

const cardContentMap = {
  default: defaultContent,
  education,
  interests
}

Vue.component('about-item', {
  template: /*html*/`
  <transition name="expand" :duration="{leave: leaveDuration}" mode="out-in" @after-enter="afterEnter">
    <div v-if="active" style="min-height: 5rem" @click="toggle" class="h-96 p-6 shadow-2xl cursor-pointer" key="expanded">
      <div class="text-2xl">
        {{section}}
      </div>
      <div class="pt-6 text-l">
      <transition name="fade" @after-leave="active = false" mode="out-in">
        <div v-if="!transitioning" v-html="getContent()"></div>
      </transition>
      </div>
    </div>
    <div v-else style="min-height: 5rem" @click="toggle" class="p-6 shadow-2xl cursor-pointer" key="collapsed">
      <div class="text-2xl">
        {{section}}
      </div>
    </div>
  </transition>
  `,
  props: ['section'],
  data: () => {
    return {
      active: false,
      transitioning: false,
      leaveDuration: 0,
    };
  },
  methods: {
    getContent() {
      return cardContentMap[this.section];
    },
    toggle() {
      if (this.active === false) {
        this.leaveDuration = 100;
        this.active = true;
        this.transitioning = true;
      } else {
        this.leaveDuration = 500;
        this.transitioning = true;
      }
    },
    afterEnter() {
      this.transitioning = false;
    }
  }
});

export const About = Vue.component('about', {
  template: '#about',
  data: () => {
    return {
      section: 'default',
      cardContent: cardContentMap['default'],

      // icons
      educationIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F2E9E4" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>',
      interestsIcon: '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#F2E9E4" width="18px" height="18px"><g><rect fill="none" height="24" width="24"/></g><g><g/><path d="M12,3c-0.46,0-0.93,0.04-1.4,0.14C7.84,3.67,5.64,5.9,5.12,8.66c-0.48,2.61,0.48,5.01,2.22,6.56C7.77,15.6,8,16.13,8,16.69 V19c0,1.1,0.9,2,2,2h0.28c0.35,0.6,0.98,1,1.72,1s1.38-0.4,1.72-1H14c1.1,0,2-0.9,2-2v-2.31c0-0.55,0.22-1.09,0.64-1.46 C18.09,13.95,19,12.08,19,10C19,6.13,15.87,3,12,3z M14,19h-4v-1h4V19z M14,17h-4v-1h4V17z M12.5,11.41V14h-1v-2.59L9.67,9.59 l0.71-0.71L12,10.5l1.62-1.62l0.71,0.71L12.5,11.41z"/></g></svg>',
      backpackIcon: '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#F2E9E4" width="18px" height="18px"><rect fill="none" height="24" width="24"/><g><path d="M17,6h-2V3c0-0.55-0.45-1-1-1h-4C9.45,2,9,2.45,9,3v3H7C5.9,6,5,6.9,5,8v11c0,1.1,0.9,2,2,2c0,0.55,0.45,1,1,1 c0.55,0,1-0.45,1-1h6c0,0.55,0.45,1,1,1c0.55,0,1-0.45,1-1c1.1,0,2-0.9,2-2V8C19,6.9,18.1,6,17,6z M9.5,18H8V9h1.5V18z M12.75,18 h-1.5V9h1.5V18z M13.5,6h-3V3.5h3V6z M16,18h-1.5V9H16V18z"/></g></svg>',
      mapIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F2E9E4" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>',
      picsIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F2E9E4" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="3.2"/><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>',
      resumeIcon: '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#F2E9E4" width="18px" height="18px"><g><rect fill="none" height="24" width="24"/><path d="M20.41,8.41l-4.83-4.83C15.21,3.21,14.7,3,14.17,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V9.83 C21,9.3,20.79,8.79,20.41,8.41z M7,7h7v2H7V7z M17,17H7v-2h10V17z M17,13H7v-2h10V13z"/></g></svg>',
    }
  },
  methods: {
    navigate,
  },
});

export const Projects = Vue.component('projects', {
  template: '#projects',
  methods: {
    navigate,
  },
  data: function() {
    return {
      loading: false,
      repoIds: [
        254956301, // chat
        146653740, // personal website
        262202529, // sale scraper
        216396300, // player
      ],
      repos: [],
    };
  },
  created: async function() {
    this.loading = true;
    this.repos = await (await fetch('https://api.github.com/users/Holayn/repos')).json();
    this.loading = false;
  },
  computed: {
    filteredRepos: function() {
      return this.repos.reduce((acc, val) => {
        if (this.repoIds.includes(val.id)) {
          acc.push({
            id: val.id,
            name: val.name,
          });
        }
        return acc;
      }, []);
    },
  }
});

export const Blog = Vue.component('blog', {
  template: '#xpskills',
  methods: {
    navigate,
  },
});

export const XpSkills = Vue.component('xpskills', {
  template: '#blog',
  methods: {
    navigate,
  },
})
