import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

import {navigate} from '../../utils.js';
import {experiences} from './experiences.js';

Vue.component('experience-item', {
  template: /*html*/`
  <div class="grid grid-cols-8 p-6 gap-4">
    <div class="col-span-2 px-6">
      <img :src="img"/>
    </div>
    <div class="grid col-span-6 bright-text gap-4" style="grid-template-rows: auto auto 1fr;">
      <div class="italic">
        <div class="text-2xl">{{experience.name}}</div>
        <div class="text-xl">{{experience.date}}</div>
        <div class="text-xl">{{experience.role}}</div>
      </div>
      <div class="text-xl">Stack: {{experience.stack}}</div>
      <div>
        <div v-for="detail in experience.details" :key="detail.id" class="text-xl py-2">
          <div>{{detail.heading}}</div>
          <ul class="list-disc pl-6">
            <li v-for="content in detail.content">
              {{content}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  `,
  props: ['img', 'item'],
  data: () => {
    return {
      experiences,
    };
  },
  methods: {
  },
  computed: {
    experience: function() {
      return this.experiences[this.item];
    }
  }
});

export const XpSkills = Vue.component('xpskills', {
  template: '#xpskills',
  methods: {
    navigate,
  },
});