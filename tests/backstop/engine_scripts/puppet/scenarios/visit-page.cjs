module.exports = async (page) => {
  // "back to homepage" button
  await page.waitForSelector('.btn-link')
}
