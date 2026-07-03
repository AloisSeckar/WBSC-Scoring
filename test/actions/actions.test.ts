import { availableParallelism } from 'node:os'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'
import type { NuxtPage } from '@nuxt/test-utils/e2e'
import { setup, createPage, url } from '@nuxt/test-utils/e2e'
import { compareScreenshot } from 'nuxt-spec/utils'
import library from '../../app/assets/json/library.json' with { type: 'json' }

// allowed difference in screenshot comparison (mitigating platform differences)
const diffRatio = process.env.VITE_TEST_DIFF_RATIO ? parseFloat(process.env.VITE_TEST_DIFF_RATIO) : 0.01

// number of parallel executions (based on available CPUs)
const WORKERS = Math.max(1, availableParallelism() / 2)

const chunkSize = Math.ceil(library.length / WORKERS)
const chunks = Array.from({ length: WORKERS }, (_, i) =>
  library.slice(i * chunkSize, (i + 1) * chunkSize),
).filter(c => c.length > 0)

describe(`actions from library render correctly`, async () => {
  await setup({
    rootDir: fileURLToPath(new URL(`../..`, import.meta.url)),
    server: true,
    dev: true,
  })

  test.concurrent.each(chunks.map((entries, i) => ({ entries, group: i + 1 })))(
    'group $group renders correctly',
    async ({ entries, group }) => {
      const indexUrl = url('/')
      const page = await createPage(undefined, { viewport: { width: 999, height: 2300 }, deviceScaleFactor: 1 })
      await page.goto(indexUrl, { /* waitUntil: 'hydration' */})
      const failed: string[] = []
      try {
        for (const { file } of entries) {
          try {
            console.log(`[group ${group}] running test for \`${file}\``)
            await withTimeout(doAction(page, file), 15000, file)
          }
          catch (e) {
            failed.push(`${e instanceof Error ? e.message : e}`)
            // reset page state so subsequent actions can still run
            await page.goto(indexUrl, {}).catch(() => {})
          }
        }
      }
      finally {
        await page.context().close()
      }
      if (failed.length > 0) {
        throw new Error(`${failed.length} action(s) failed:\n${failed.join('\n')}`)
      }
    },
    1000 * 60 * 5,
  )
})

async function doAction(page: NuxtPage, action: string) {
  // import from library
  await page.waitForSelector('#button-input-import-lib')
  await page.click('#button-input-import-lib')
  // pick given action
  await page.waitForSelector('#lib-items')
  await page.selectOption('#lib-items', action)
  // select (and wait for generate action)
  await page.waitForSelector('#lib-select')
  await page.click('#lib-select')
  // wait for modal overlay to fade
  await new Promise(resolve => setTimeout(resolve, 400))
  // test screenshot
  expect(await compareScreenshot(page, { fileName: `action-${action}.png`, targetDir: 'test/actions', selector: '#canvas', maxDiffPixelRatio: diffRatio })).toEqual(true)
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout>
  return Promise.race([
    promise.finally(() => clearTimeout(timeoutId)),
    new Promise<T>((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
    }),
  ])
}
