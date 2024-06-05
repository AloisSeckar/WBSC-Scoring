export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
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
    provider: import.meta.env.PROD ? 'netlify' : 'ipx',
    dir: 'assets/img',
  },
  nitro: {
    prerender: {
      routes: ['/help', '/project', '/report'],
    },
  },
})
