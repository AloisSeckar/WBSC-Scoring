module.exports = async (page, scenario) => {
  const action = scenario.label.substring(7)
  // import from library
  await page.waitForSelector('#button-input-import-lib')
  await page.click('#button-input-import-lib')
  // pick given action
  await page.waitForSelector('#lib-items')
  await page.select('#lib-items', action)
  // select (and wait for generate action)
  await page.waitForSelector('#lib-select')
  await page.click('#lib-select')
  await new Promise(resolve => setTimeout(resolve, 400))
}
