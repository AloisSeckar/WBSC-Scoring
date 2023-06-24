module.exports = async (page, action) => {
  // import from library
  await page.waitForSelector('#button-input-import-lib')
  await page.click('#button-input-import-lib')
  // pick "Out 63"
  await page.waitForSelector('#lib-items')
  await page.select('#lib-items', action + '.json')
  // select (and wait for generate action)
  await page.waitForSelector('#lib-select')
  await page.click('#lib-select')
  await page.waitForTimeout(1000)
}
