module.exports = async (page) => {
  await page.waitForSelector('#button-input-r3')
  // render all batter's inputs
  await page.click('#button-input-b1')
  await page.click('#button-input-b2')
  // TODO this is hack for "s"-screen, where the selector might be missing
  const b3 = await page.$('#button-input-b3')
  if (b3) {
    b3.click()
  }
  // render all R1 inputs
  await page.click('#button-input-r1')
  await page.click('#button-input-r1a')
  // TODO this is hack for "s"-screen, where the selector might be missing
  const r1b = await page.$('#button-input-r1b')
  if (r1b) {
    r1b.click()
  }
  // render all R2 inputs
  await page.click('#button-input-r2')
  // TODO this is hack for "s"-screen, where the selector might be missing
  const r2a = await page.$('#button-input-r2a')
  if (r2a) {
    r2a.click()
  }
  // render R3 inputs
  await page.click('#button-input-r3')
  // clear all rendered things via reset button
  await page.click('#button-input-clear')
}
