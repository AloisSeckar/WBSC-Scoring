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

  i18n: {
    compilation: { strictMessage: false },
    strategy: 'no_prefix',
  },

  ignis: {
    preset: {
      ui: 'tailwind',
    },
    default: {
      css: false,
    },
    content: {
      content: {
        enabled: true,
      },
      i18n: {
        enabled: true,
      },
      pslo: {
        enabled: true,
        content: true,
      }
    },
  },

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
