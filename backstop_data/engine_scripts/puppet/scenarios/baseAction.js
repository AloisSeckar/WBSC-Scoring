// BackstopJS test scenario 03
module.exports = async (page) => {
  // pick "base action = Strike out"
  await page.waitForSelector('#input-b-base-action')
  await page.select('#input-b-base-action', 'StrikeOut')
  // generate action
  await page.click('#button-input-generate')
}
