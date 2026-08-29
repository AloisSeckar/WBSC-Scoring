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

  for (const { name, width, height } of SCREENS) {
    test(`viewport ${name} renders correctly`, async () => {
      const page = await createPage(undefined, { viewport: { width, height }, deviceScaleFactor: 1 })

      const baseUrl = url('/')

      // display index page
      console.log(`[viewport ${name}] - display index page`)
      await page.goto(baseUrl, { waitUntil: 'hydration' })
      await page.waitForSelector('#canvas', { state: 'visible' })
      const testIndex = await compareScreenshot(page, {
        fileName: `page-index-${name}.png`,
        targetDir: 'test/screenshots',
        maxDiffPixelRatio: diffRatio,
      })
      expect(testIndex).toEqual(true)

      // invalid input
      console.log(`[viewport ${name}] - invalid input`)
      await page.click('#button-input-generate')
      const testIndexInvalid = await compareScreenshot(page, {
        fileName: `page-index-invalid-${name}.png`,
        targetDir: 'test/screenshots',
        maxDiffPixelRatio: diffRatio,
      })
      expect(testIndexInvalid).toEqual(true)

      // valid input
      console.log(`[viewport ${name}] - valid input`)
      await page.click('#validation-ok')
      await page.selectOption('#input-b-base-action', 'StrikeOut')
      await page.click('#button-input-generate')
      const testIndexValid = await compareScreenshot(page, {
        fileName: `page-index-valid-${name}.png`,
        targetDir: 'test/screenshots',
        maxDiffPixelRatio: diffRatio,
      })
      expect(testIndexValid).toEqual(true)

      // display all inputs
      console.log(`[viewport ${name}] - all inputs`)
      await page.click('#button-input-r1')
      await page.click('#button-input-r2')
      await page.click('#button-input-r3')
      const testIndexInputs = await compareScreenshot(page, {
        fileName: `page-index-inputs-${name}.png`,
        targetDir: 'test/screenshots',
        maxDiffPixelRatio: diffRatio,
      })
      expect(testIndexInputs).toEqual(true)

      // clear controls
      console.log(`[viewport ${name}] - clear`)
      await page.click('#button-input-clear')
      const testIndexInputsClear = await compareScreenshot(page, {
        fileName: `page-index-inputs-clear-${name}.png`,
        targetDir: 'test/screenshots',
        maxDiffPixelRatio: diffRatio,
      })
      expect(testIndexInputsClear).toEqual(true)

      // load from library
      console.log(`[viewport ${name}] - load from library`)
      await page.click('#button-input-import-lib')
      await page.click('#lib-select')
      await new Promise(resolve => setTimeout(resolve, 600))
      const testIndexLibrary = await compareScreenshot(page, {
        fileName: `page-index-library-${name}.png`,
        targetDir: 'test/screenshots',
        maxDiffPixelRatio: diffRatio,
      })
      expect(testIndexLibrary).toEqual(true)

      // display project page
      console.log(`[viewport ${name}] - display project page`)
      await page.goto(baseUrl + 'project', { waitUntil: 'hydration' })
      await page.waitForSelector('#project-description', { state: 'visible' })
      const testProject = await compareScreenshot(page, {
        fileName: `page-project-${name}.png`,
        targetDir: 'test/screenshots',
        maxDiffPixelRatio: diffRatio,
      })
      expect(testProject).toEqual(true)

      // display help page
      console.log(`[viewport ${name}] - display help page`)
      await page.goto(baseUrl + 'help', { waitUntil: 'hydration' })
      await page.waitForSelector('#using-the-program', { state: 'visible' })
      const testHelp = await compareScreenshot(page, {
        fileName: `page-help-${name}.png`,
        targetDir: 'test/screenshots',
        maxDiffPixelRatio: diffRatio,
      })
      expect(testHelp).toEqual(true)

      // display report page
      console.log(`[viewport ${name}] - display report page`)
      await page.goto(baseUrl + 'report', { waitUntil: 'hydration' })
      await page.waitForSelector('#reporting-bugs', { state: 'visible' })
      const testReport = await compareScreenshot(page, {
        fileName: `page-report-${name}.png`,
        targetDir: 'test/screenshots',
        maxDiffPixelRatio: diffRatio,
      })
      expect(testReport).toEqual(true)

      // translate with i18n
      console.log(`[viewport ${name}] - translate index to CS`)
      await page.goto(baseUrl, { waitUntil: 'hydration' })
      await page.waitForSelector('#canvas', { state: 'visible' })
      await page.click('#lang-cs')
      const testIndexLangCS = await compareScreenshot(page, {
        fileName: `page-index-lang-cs-${name}.png`,
        targetDir: 'test/screenshots',
        maxDiffPixelRatio: diffRatio,
      })
      expect(testIndexLangCS).toEqual(true)
      console.log(`[viewport ${name}] - translate index to IT`)
      await page.click('#lang-it')
      const testIndexLangIT = await compareScreenshot(page, {
        fileName: `page-index-lang-it-${name}.png`,
        targetDir: 'test/screenshots',
        maxDiffPixelRatio: diffRatio,
      })
      expect(testIndexLangIT).toEqual(true)
    }, 1000 * 60 * 5)
  }
})
