module.exports = async (page) => {
  // show 'Select situation to import' modal
  await page.waitForSelector('#button-input-import-lib')
  await page.click('#button-input-import-lib')
  await page.waitForTimeout(500)
}
