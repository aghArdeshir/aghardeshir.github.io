import { fileURLToPath } from 'url';
import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ardeshir Izadi's Blog",
  description: 'My thoughts and ideas as a Software Engineer',
  cleanUrls: true,
  base: '/blog/',
  themeConfig: {
    logo: '../favicon.ico',

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' }
    ],

    externalLinkIcon: true,

    sidebar: [
      {
        text: 'Blog Posts',
        items: [
          // { text: 'Markdown Examples', link: '/markdown-examples' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
          { text: 'Merge Request Mastery', link: '/merge-request-mastery' },
        ],
      },
    ],

    darkModeSwitchLabel: 'Dark/Light mode',

    lastUpdated: {
      formatOptions: {
        dateStyle: 'full',
      },
    },

    docFooter: {
      prev: 'My newer post',
      next: 'My older post',
    },

    editLink: {
      pattern:
        'https://github.com/aghArdeshir/aghardeshir.github.io/edit/main/blog/:path',
      text: 'Edit this post on GitHub',
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/aghArdeshir/aghardeshir.github.io',
      },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/ardeshir-izadi/' },
    ],
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPHero\.vue$/,
          replacement: fileURLToPath(
            new URL('./CustomizedHero.vue', import.meta.url)
          ),
        },
      ],
    },
  },
});
