import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

import {navigate} from '../../utils.js';
import {githubToken} from '../globals.js';

export const BlogPost = Vue.component('blogpost', {
  template: '#blogpost',
  data: function() {
    return {
      loading: false,
      post: {},
    };
  },
  methods: {
    getPost: async function() {
      this.loading = true;
      const {body, created_at, title} = await (await
        fetch(`https://api.github.com/repos/Holayn/holayn.github.io/issues/${this.$route.query.post}`, {
          headers: {
            'Authorization': `Basic ${btoa(`holayn:${githubToken}`)}`,
          }
        })
      ).json();

      const sections = parseBody(body);

      this.post = {
        ...sections,
        date: new Date(created_at),
        title,
      }

      this.loading = false;
    },
    imageLoaded(post) {
      Vue.set(post, 'imageLoaded', true);
    },
    navigate,
  },
  created: async function() {
    this.getPost();
  },
});

function parseBody(body) {
  const sections = body.split(' <#> ');
  return sections.reduce((acc, encodedSection) => {
    const section = encodedSection.match(/<!([a-z]*)>/);
    acc[section[1]] = encodedSection.split(section[0])[1];
    return acc;
  }, {});
}
