import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';
import {navigate} from '../../utils.js';

const cardContentMap = {
  backpack: getBackpack(),
  education: getEducation(),
  interests: getInterests(),
  map: getMap(),
  pics: getPics(),
  profiles: getProfiles(),
  resume: getResume(),
}

Vue.component('about-item', {
  template: /*html*/`
  <div @click="toggle" class="p-6 cursor-pointer">
    <div class="relative text-2xl">
      {{section}}
    </div>
    <transition name="expand" mode="out-in" @enter="startTransition" @after-enter="endTransition" @before-leave="startTransition" @after-leave="endTransition">
      <div v-if="active" class="text-l overflow-hidden" key="expanded">
        <div class="pt-6" v-html="getContent()"></div>
      </div>
    </transition>
  </div>
  `,
  props: ['section'],
  data: () => {
    return {
      active: false,
    };
  },
  methods: {
    getContent() {
      return cardContentMap[this.section];
    },
    toggle() {
      this.active = !this.active;
    },
    startTransition(el) {
      el.style.height = el.scrollHeight + 'px'
    },

    endTransition(el) {
      el.style.height = ''
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

function getEducation() {
  return /*html*/`
    <div class="text-xl">Marist College, B.S. in Computer Science</div>
    <div>Minors: Math, Music, I.T., I.S.</div>
    <div>Favorite Coursework: Algorithms, OS, Compilers, Web Development, Theory of Programming Languages</div>
  `;
}

function getInterests() {
  return /*html*/`
    <div class="inline text-xl">Piano</div>
    <div>Been playing since I was 5</div>
    <div>Because making music is fun</div>
    <div>Also played the clarinet from middle school through college</div>
    <div class="p-6">
      accomplishments:
      <ul class="list-disc pl-6">
        <li>nov 2018: delivered college senior recital @ Marist College</li>
        <li>april 2018: performed Warsaw Concerto w/ Marist College Wind Symphony</li>
        <li>aug 2016 - dec 2018: Marist Nelly Goletti Music Scholarship Recipient, performed recitals and background music for various occasions</li>
        <li>aug 2015: MTNA New York State Young Artist 2nd place</li>
        <li>july 2015: performed Poulenc Double Piano concerto with PMI</li>
        <li>may 2015: delivered high school senior recital</li>
        <li>feb 2015: performed 3rd Beethoven Piano Concerto w/ Punahou Symphony Orchestra</li>
        <li>jan 2015: MTNA Southwest Regional Senior Honorable Mention</li>
        <li>nov 2014: MTNA Hawaii State Senior 1st place</li>
      </ul>
    </div>

    <div class="inline text-xl">Coding</div>
    <div>Because I like making things and the engineering aspects that go into it</div>
    <div>See <a href="./#/projects" class="bright-text">here</a> for what I'm working on</div>
    <div class="p-6"></div>

    <div class="inline text-xl">Gaming</div>
    <div>Because they're fun, especially with frens</div>
    <a href="https://steamcommunity.com/id/Holayn" target="_blank" class="bright-text">steam profile</a>
    <div class="p-6">
      other games:
      <ul class="list-disc pl-6">
        <li>league of legends</li>
        <li>teamfight tactics</li>
        <li>board games</li>
      </ul>
    </div>
  `;
}

function getProfiles() {
  return /*html*/`
    <div>
      <a href="https://www.linkedin.com/in/kaiwonghi/" target="_blank" class="bright-text">linkedin</a> (warning - super out of date)
    </div>
  `;
}

function getBackpack() {
  return /*html*/`
    <div class="inline text-xl">things that I can't go without - stuff I would put in my life backpack - in no particular order</div>
    <div class="p-6">
      <ul class="list-disc pl-6">
        <li>nice shoes/boots: sneakers (colehaan), chelseas, docs</li>
        <li>nice fitting pants</li>
        <li>pc with solid specs</li>
        <li>grand piano</li>
        <li>pet bird - cockatiel/parrotlet</li>
      </ul>
    </div>
  `;
}

function getMap() {
  return /*html*/`
    <div class="inline text-xl">where I'm headed to in life</div>
    <div class="p-6">
      <ul class="list-disc pl-6">
        <li>make enough money for a sizable nest egg / financial independence</li>
        <li>retire early and/or start a business</li>
      </ul>
    </div>
  `;
}

function getPics() {
  return /*html*/`
    nothing here yet
  `;
}

function getResume() {
  return /*html*/`
    <div>this site serves as a living resume, but if you want a version that's condensed into one document...</div>
    <a href="https://github.com/Holayn/resume/raw/master/resume.pdf" class="bright-text">download</a>
  `;
}
