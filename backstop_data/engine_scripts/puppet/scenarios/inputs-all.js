module.exports = async (page) => {
  // TODO failing for 's'
  await page.waitForSelector('#button-input-r3')
  // render all batter's inputs
  await page.click('#button-input-b1')
  await page.click('#button-input-b2')
  await page.click('#button-input-b3')
  // render all R1 inputs
  await page.click('#button-input-r1')
  await page.click('#button-input-r1a')
  await page.click('#button-input-r1b')
  // render all R2 inputs
  await page.click('#button-input-r2')
  await page.click('#button-input-r2a')
  // render R3 inputs
  await page.click('#button-input-r3')
}
