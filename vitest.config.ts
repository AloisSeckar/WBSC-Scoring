import { loadVitestConfig } from 'nuxt-spec/config'
import { defineVitestProject } from '@nuxt/test-utils/config'

export default loadVitestConfig({
  test: {
    projects: [
      await defineVitestProject({
        test: {
          name: 'wnscoring',
          include: ['tests/vitest/**/*.{test,spec}.ts'],
          environment: 'nuxt',
        },
      }),
    ],
    setupFiles: ['./tests/vitest/dotEnv.ts', './tests/vitest/vitestUtils.ts'],
  },
})

// import { defineVitestConfig } from '@nuxt/test-utils/config'

// export default defineVitestConfig({
//   test: {
//     environment: 'nuxt',
//     setupFiles: ['./tests/vitest/dotEnv.ts', './tests/vitest/vitestUtils.ts'],
//   },
// })
