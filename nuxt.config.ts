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
      routes: ['/help', '/project', '/report'],
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
