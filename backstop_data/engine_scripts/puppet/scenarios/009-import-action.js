module.exports = async (page) => {
  // import from library
  await page.waitForSelector('#button-input-import-lib')
  await page.click('#button-input-import-lib')
  // pick "Out 6-3"
  await page.waitForSelector('#lib-items')
  await page.select('#lib-items', 'out-63.json')
  // select (and wait for generate action)
  await page.waitForSelector('#lib-select')
  await page.click('#lib-select')
  await page.waitForTimeout(1000)
}
