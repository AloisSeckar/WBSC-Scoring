import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'
import { setup, createPage, url } from '@nuxt/test-utils/e2e'
import { compareScreenshot } from 'nuxt-spec/utils'

// allowed difference in screenshot comparison (mitigating platform differences)
const diffRatio = process.env.VITE_TEST_DIFF_RATIO ? parseFloat(process.env.VITE_TEST_DIFF_RATIO) : 0.01

// pre-defined viewports to test rendering against
const SCREENS = [
  { name: 'sm', width: 414, height: 896 },
  { name: 'md', width: 800, height: 600 },
  { name: 'lg', width: 1600, height: 1200 },
]

describe(`pages render correctly in different resolutions`, async () => {
  await setup({
    rootDir: fileURLToPath(new URL(`../..`, import.meta.url)),
    server: true,
    dev: true,
    browserOptions: {
      type: 'chromium',
      // --no-sandbox is required in CI (because Chromium runs under root there)
      launch: process.env.CHROMIUM_SANDBOX_DISABLED ? { args: ['--no-sandbox'] } : {},
    },
  })

  test.concurrent.each(SCREENS)(
    'viewport $name renders correctly',
    async ({ name, width, height }) => {
      const page = await createPage(undefined, { viewport: { width, height }, deviceScaleFactor: 1 })

      const baseUrl = url('/')

      // display index page
      console.log(`[viewport ${name}] running test for \`index\``)
      await page.goto(baseUrl, { waitUntil: 'hydration' })
      await page.waitForSelector('#canvas', { state: 'visible' })
      const testIndex = await compareScreenshot(page, {
        fileName: `page-index-${name}.png`,
        targetDir: 'test/screenshots',
        maxDiffPixelRatio: diffRatio,
      })
      expect(testIndex).toEqual(true)

      // display project page
      console.log(`[viewport ${name}] running test for \`project\``)
      await page.goto(baseUrl + 'project', { waitUntil: 'hydration' })
      await page.waitForSelector('#project-description', { state: 'visible' })
      const testProject = await compareScreenshot(page, {
        fileName: `page-project-${name}.png`,
        targetDir: 'test/screenshots',
        maxDiffPixelRatio: diffRatio,
      })
      expect(testProject).toEqual(true)

      // display help page
      console.log(`[viewport ${name}] running test for \`help\``)
      await page.goto(baseUrl + 'help', { waitUntil: 'hydration' })
      await page.waitForSelector('#using-the-program', { state: 'visible' })
      const testHelp = await compareScreenshot(page, {
        fileName: `page-help-${name}.png`,
        targetDir: 'test/screenshots',
        maxDiffPixelRatio: diffRatio,
      })
      expect(testHelp).toEqual(true)

      // display report page
      console.log(`[viewport ${name}] running test for \`report\``)
      await page.goto(baseUrl + 'report', { waitUntil: 'hydration' })
      await page.waitForSelector('#reporting-bugs', { state: 'visible' })
      const testReport = await compareScreenshot(page, {
        fileName: `page-report-${name}.png`,
        targetDir: 'test/screenshots',
        maxDiffPixelRatio: diffRatio,
      })
      expect(testReport).toEqual(true)
    },
    1000 * 60 * 5,
  )
})
