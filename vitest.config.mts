import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    setupFiles: ['./tests/vitest/dotEnv.ts', './tests/vitest/vitestUtils.ts'],
  },
})
