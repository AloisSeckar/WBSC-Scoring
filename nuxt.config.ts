export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  devtools: {
    enabled: false,
  },

  runtimeConfig: {
    public: {
      // default log level for consola
      // (less important logs will be ignored)
      logLevel: 'debug',
    },
  },

  compatibilityDate: '2024-11-25',

  nitro: {
    prerender: {
      routes: ['/help', '/project', '/report'],
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  i18n: {
    vueI18n: './i18n.config.ts',
    locales: ['en'],
    defaultLocale: 'en',
  },
})
