module.exports = async (page) => {
  await page.waitForSelector('#button-input-import-lib')
  await page.click('#button-input-import-lib')
  await page.waitForSelector('#lib-items')
  await page.select('#lib-items', 'out-63.json')
  await page.waitForSelector('#lib-select')
  await page.click('#lib-select')
  await page.waitForTimeout(1000)
}
