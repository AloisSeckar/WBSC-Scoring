module.exports = async (page) => {
  // "import from library" button
  await page.waitForSelector('#button-input-import-lib')
  await page.click('#button-input-import-lib')
}
