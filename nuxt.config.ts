export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  image: {
    dir: 'assets/img',
  },
  nitro: {
    prerender: {
      routes: ['/help', '/project', '/report'],
    },
  },
})
