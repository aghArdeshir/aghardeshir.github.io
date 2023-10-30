import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ardeshir Izadi's Personal Blog",
  description: "My thoughts and ideas as a Software Engineer",
  cleanUrls: true,
  base: '/blog/',
  themeConfig: {
    logo: '../favicon.ico',

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Blog Posts',
        items: [
          // { text: 'Markdown Examples', link: '/markdown-examples' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
          { text: 'Merge Request Mastery', link: '/merge-request-mastery' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aghArdeshir/aghardeshir.github.io' }
    ]
  }
})
