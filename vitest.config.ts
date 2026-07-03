import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { loadVitestConfig } from 'nuxt-spec/config'
import { defineVitestProject } from '@nuxt/test-utils/config'
import { availableParallelism } from 'node:os'

const screenshotReportSetup = fileURLToPath(new URL('../utils/screenshot.ts', import.meta.resolve('nuxt-spec/config')))

const projects = []

const args = process.argv.join(' ')
console.warn(args)
const perProjectConfig = args.includes('--project')
console.warn('perProjectConfig', perProjectConfig)
const validations = !perProjectConfig || args.includes('validations')
console.warn('validations', validations)
const actions = !perProjectConfig || args.includes('actions')
console.warn('actions', actions)

if (validations) {
  projects.push(await defineVitestProject({
    test: {
      name: 'validations',
      include: ['test/validations/**/*.{test,spec}.ts'],
      environment: 'nuxt',
    },
  }))
}

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

export default loadVitestConfig({
  test: {
    projects,
  },
}, false)
