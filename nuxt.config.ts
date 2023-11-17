// @ts-ignore: noImplicitAny - JS module with no types...
import vsharp from 'vite-plugin-vsharp'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
    '@vueuse/nuxt'
  ],
  nitro: {
    prerender: {
      routes: ['/help', '/project', '/report']
    }
  },
  vite: {
    plugins: [vsharp()]
  }
})
