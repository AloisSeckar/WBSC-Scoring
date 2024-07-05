export default defineNuxtConfig({
  compatibilityDate: '2024-07-05',
  ssr: false,
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  nitro: {
    prerender: {
      routes: ['/help', '/project', '/report'],
    },
  },
})
