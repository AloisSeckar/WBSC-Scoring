import vsharp from 'vite-plugin-vsharp'

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
  vite: {
    plugins: [vsharp()]
  },
  pinia: {
    autoImports: ['defineStore']
  }
})
