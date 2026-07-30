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

  fonts: {
    families: [
      { name: 'Open Sans', weights: [700], styles: ['normal'] },
    ],
  },

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
      auth: false,
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
      },
    },
  },

  security: {
    headers: {
      // allow Nuxt Content pages to be loaded
      contentSecurityPolicy: {
        'script-src': ['\'self\'', '\'nonce-{{nonce}}\'', '\'wasm-unsafe-eval\''],
      },
      crossOriginEmbedderPolicy: 'require-corp',
      crossOriginOpenerPolicy: 'same-origin',
    },
  },
})
