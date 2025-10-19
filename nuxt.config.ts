export default defineNuxtConfig({
  extends: [
    'nuxt-ignis',
  ],

  devtools: {
    enabled: false,
  },

  css: [
    '@/assets/css/tailwind.css',
  ],

  nitro: {
    prerender: {
      // TODO: it is currently not possible to pre-render pages
      // "Nuxt I18n server context has not been set up yet." error occurs
      // routes: ['/help', '/project', '/report'],
    },
  },

  security: {
    headers: {
      // allow Nuxt Content pages to be loaded
      contentSecurityPolicy: {
        'script-src': ['\'self\'', 'https:', '\'strict-dynamic\'', '\'nonce-{{nonce}}\'', '\'wasm-unsafe-eval\''],
      },
      crossOriginEmbedderPolicy: 'require-corp',
      crossOriginOpenerPolicy: 'same-origin',
    },
  },
})
