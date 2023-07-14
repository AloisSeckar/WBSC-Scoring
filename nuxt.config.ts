export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  i18n: {

  },
  pinia: {
    autoImports: ['defineStore']
  }
})
