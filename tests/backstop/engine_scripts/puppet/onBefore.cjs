module.exports = async (page, scenario) => {
  await require('./loadCookies.cjs')(page, scenario)
}
