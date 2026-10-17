import process from 'node:process'
import { loadVitestConfig } from 'nuxt-spec/config'
import { defineVitestProject } from '@nuxt/test-utils/config'
import { availableParallelism } from 'node:os'

const projects = []

const args = process.argv.join(' ')
const perProjectConfig = args.includes('--project')
const validations = !perProjectConfig || args.includes('validations')
const actions = !perProjectConfig || args.includes('actions')
const screenshots = !perProjectConfig || args.includes('screenshots')
const suite = actions ? 'actions' : screenshots ? 'screenshots' : 'validations'

// tests of input-validation functions
// currently require Nuxt env due to reliance on Nuxt composables
// TODO should be strictly split between validation logic and Nuxt processing
if (validations) {
  projects.push(await defineVitestProject({
    extends: true,
    test: {
      name: 'validations',
      include: ['test/validations/**/*.{test,spec}.ts'],
      environment: 'nuxt',
    },
  }))
}

// CORE test suite
// check if defined actions are rendered in the correct way
if (actions) {
  projects.push({
    extends: true,
    test: {
      name: 'actions',
      include: ['test/actions/**/*.{test,spec}.ts'],
      environment: 'node',
      maxConcurrency: availableParallelism() / 2,
    },
  })
}

// additional visual regression tests
// check how pages are rendered in different resolutions
if (screenshots) {
  projects.push({
    extends: true,
    test: {
      name: 'screenshots',
      include: ['test/screenshots/**/*.{test,spec}.ts'],
      environment: 'node',
      maxConcurrency: availableParallelism() / 2,
    },
  })
}

export default loadVitestConfig({
  test: {
    projects,
    reporters: process.env.GITHUB_ACTIONS ? ['default', 'github-actions', 'junit'] : ['default', 'junit'],
    outputFile: { junit: `test/${suite}/__current__/junit.xml` },
  },
}, false)
