module.exports = async (page) => {
  // display all input groups
  await page.waitForSelector('#button-input-r1')
  await page.click('#button-input-r1')
  await page.waitForSelector('#button-input-r2')
  await page.click('#button-input-r2')
  await page.waitForSelector('#button-input-r3')
  await page.click('#button-input-r3')
  // clear all rendered things via reset button
  await page.click('#button-input-clear')
  // TODO not working for "-l" (inputs stay rendered)
}
