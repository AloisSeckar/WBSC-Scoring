module.exports = async (page) => {
  // "score play" button
  await page.waitForSelector('#input-b-base-action')
}
