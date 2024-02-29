export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  image: {
    dir: 'assets/img'
  },
  nitro: {
    prerender: {
      routes: ['/help', '/project', '/report']
    }
  }
})
