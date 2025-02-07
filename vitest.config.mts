import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      overrides: {
        // NUXT_PUBLIC_IGNIS_I18N_ENABLED
        runtimeConfig: {
          public: {
            ignis: {
              i18n: {
                enabled: true,
              },
            },
          },
        },
      },
    },
    setupFiles: ['./tests/vitest/dotEnv.ts', './tests/vitest/vitestUtils.ts'],
  },
})
