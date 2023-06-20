module.exports = async (page) => {
  await page.waitForSelector('#input-b-base-action')
  await page.select('#input-b-base-action', 'StrikeOut')
  await page.click('#button-input-generate')
}
