export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt'
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
