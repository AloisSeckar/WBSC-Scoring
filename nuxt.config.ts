export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  i18n: {

  },
  nitro: {
    prerender: {
      routes: ['/help', '/project', '/report']
    }
  },
  pinia: {
    autoImports: ['defineStore']
  }
})
