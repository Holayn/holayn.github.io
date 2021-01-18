import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

import {navigate} from '../../utils.js';
import {githubToken} from '../globals.js';

const maxPostsPerFetch = 10;

Vue.component('blog-item', {
  template: /*html*/`
    <div class="blog-item">
      <div class="flex justify-center bright-text text-4xl">
        {{post.title}}
      </div>
      <div class="flex justify-center bright-text text-2xl">
        {{post.date.toDateString()}}
      </div>
      <div class="flex justify-center">
        <div class="card blog w-full lg:max-w-2xl shadow-xl lg:rounded-md">
          <div>
            <div v-show="!post.imageLoaded" class="flex justify-center pt-16" key="loading">
              <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>
            <img v-show="post.imageLoaded" @load="imageLoaded(post)" :src="post.images" class="lg:rounded-t-md"/>
          </div>
          <div class="text-md p-6">
            {{post.text}}
          </div>
        </div>
      </div>
    </div>
  `,
  props: ['post'],
  methods: {
    imageLoaded(post) {
      Vue.set(post, 'imageLoaded', true);
    },
  }
});

export const Blog = Vue.component('blog', {
  template: '#blog',
  data: function() {
    return {
      hasMorePages: false,
      loading: false,
      nextPageToFetch: 0,
      posts: [],
    };
  },
  methods: {
    getPosts: async function(page) {
      this.loading = true;
      const posts = await (await
        fetch(`https://api.github.com/repos/Holayn/holayn.github.io/issues?creator=Holayn&labels=blog-post&per_page=${maxPostsPerFetch}&page=${page}`, {
          headers: {
            'Authorization': `Basic ${btoa(`holayn:${githubToken}`)}`,
          }
        })
      ).json();
      if (posts.length === maxPostsPerFetch) {
        this.hasMorePages = true;
        this.nextPageToFetch++;
      } else {
        this.hasMorePages = false;
      }

      this.posts.push(...posts.map(({body, created_at, title}) => {
        const sections = parseBody(body);
        return {
          ...sections,
          date: new Date(created_at),
          title,
        }
      }));

      this.loading = false;
    },
    navigate,
  },
  created: async function() {
    this.getPosts(this.nextPageToFetch);

    window.addEventListener('scroll', function() {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        // reached bottom
        if (this.hasMorePages) {
          this.getPosts(this.nextPageToFetch);
        }
      }
    });
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
