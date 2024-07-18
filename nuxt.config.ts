export default defineNuxtConfig({
  compatibilityDate: '2024-07-05',
  ssr: false,
  devtools: { enabled: false },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
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
  runtimeConfig: {
    public: {
      // default log level for consola
      // (less important logs will be ignored)
      logLevel: 'debug',
    },
  },
})
