import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

import {navigate} from '../../utils.js';
import {githubToken} from '../globals.js';

export const Projects = Vue.component('projects', {
  template: '#projects',
  methods: {
    getTags: async function(repoName) {
      return await (await
        fetch(`https://api.github.com/repos/Holayn/${repoName}/tags`, {
          headers: {
            'Authorization': `Basic ${btoa(`holayn:${githubToken}`)}`,
          }
        })
      ).json();
    },
    goToSourceCode: function(repoUrl) {
      console.log('hi');
      window.open(repoUrl, '_blank');
    },
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
      sourceCodeIcon: '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#F2E9E4" width="3rem" height="3rem"><g><rect fill="none" height="24" width="24"/><path d="M20,6h-8l-2-2H4C2.9,4,2.01,4.9,2.01,6L2,18c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M14,16H6v-2h8V16z M18,12H6v-2h12V12z"/></g></svg>',
    };
  },
  created: async function() {
    this.loading = true;
    const repos = (await (await
      // sorry, access token has public permissions only :^)
      fetch('https://api.github.com/users/Holayn/repos', {
        headers: {
          'Authorization': `Basic ${btoa(`holayn:${githubToken}`)}`,
        }
      })
    ).json()).reduce((acc, repo) => {
      if (this.repoIds.includes(repo.id)) {
        acc.push(repo);
      }
      return acc;
    }, []);
    const tagsReqs = await Promise.all(repos.map(repo => this.getTags(repo.name)));
    this.repos = repos.map((repo, index) => {
      return {
        ...repo,
        tags: tagsReqs[index],
      };
    });
    this.loading = false;
  },
});
