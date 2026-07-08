import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { loadVitestConfig } from 'nuxt-spec/config'
import { defineVitestProject } from '@nuxt/test-utils/config'
import { availableParallelism } from 'node:os'

const screenshotReportSetup = fileURLToPath(new URL('../utils/screenshot.ts', import.meta.resolve('nuxt-spec/config')))

const projects = []

const args = process.argv.join(' ')
const perProjectConfig = args.includes('--project')
const validations = !perProjectConfig || args.includes('validations')
const actions = !perProjectConfig || args.includes('actions')
const screenshots = !perProjectConfig || args.includes('screenshots')

// tests of input-validation functions
// currently require Nuxt env due to reliance on Nuxt composables
// TODO should be strictly split between validation logic and Nuxt processing
if (validations) {
  projects.push(await defineVitestProject({
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
    test: {
      name: 'actions',
      include: ['test/actions/**/*.{test,spec}.ts'],
      environment: 'node',
      globalSetup: [screenshotReportSetup],
      maxConcurrency: availableParallelism() / 2,
    },
  })
}

// additional visual regression tests
// check how pages are rendered in different resolutions
if (screenshots) {
  projects.push({
    test: {
      name: 'screenshots',
      include: ['test/screenshots/**/*.{test,spec}.ts'],
      environment: 'node',
      globalSetup: [screenshotReportSetup],
      maxConcurrency: availableParallelism() / 2,
    },
  })
}

export default loadVitestConfig({
  test: {
    projects,
  },
}, false)
