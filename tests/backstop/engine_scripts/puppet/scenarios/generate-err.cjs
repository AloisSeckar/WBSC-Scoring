module.exports = async (page) => {
  // pick no action and try to generate right away
  await page.waitForSelector('#input-b-base-action')
  await page.waitForSelector('#button-input-generate')
  await page.click('#button-input-generate')
}
