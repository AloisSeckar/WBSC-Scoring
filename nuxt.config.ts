export default defineNuxtConfig({
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
