export default defineNuxtConfig({
  extends: [
    'nuxt-ignis',
  ],

  devtools: {
    enabled: false,
  },

  nitro: {
    prerender: {
      routes: ['/help', '/project', '/report'],
    },
  },
})
