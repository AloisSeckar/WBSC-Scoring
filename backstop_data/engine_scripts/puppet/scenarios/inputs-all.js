module.exports = async (page) => {
  await page.waitForSelector('#button-input-b')
  // render all batter's inputs
  await page.click('#button-input-b1')
  await page.click('#button-input-b2')
  await page.click('#button-input-b3')
  // render all R1 inputs
  await page.click('#button-input-r1')
  await page.click('#button-input-r1a')
  // TODO for some reason r1b fails on 's'
  // await page.click('#button-input-r1b')
  // render all R2 inputs
  await page.click('#button-input-r2')
  // TODO for some reason r2a fails on 's'
  // await page.click('#button-input-r2a')
  // render R3 inputs
  await page.click('#button-input-r3')
}
