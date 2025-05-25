export default defineNuxtConfig({
  extends: [
    'nuxt-ignis',
  ],

  devtools: {
    enabled: false,
  },

  css: [
    '@/assets/css/tailwind.css',
  ],

  nitro: {
    prerender: {
      routes: ['/help', '/project', '/report'],
    },
  },
})
