// BackstopJS test scenario 006
module.exports = async (page) => {
  // hide batter's inputs
  await page.waitForSelector('#button-input-b')
  await page.click('#button-input-b')
}
