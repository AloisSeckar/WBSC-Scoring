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

  // @ts-expect-error there is likely a mismatch in @nuxt/schema versions in latest nuxt-ignis
  // TODO remove once nuxt-ignis v6 is implemented
  nitro: {
    prerender: {
      // TODO: it is currently not possible to pre-render pages
      // "Nuxt I18n server context has not been set up yet." error occurs
      // should be fixed in nuxt-ignis v6
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
