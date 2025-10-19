function getFunctionScenarioCfg(url) {
  return {
    url: 'http://localhost:3000/' + (url || ''),
    delay: 50,
  }
}

const functionScenarios = [
  { label: 'visit-index', ...getFunctionScenarioCfg(), onReadyScript: 'puppet/scenarios/visit-index.cjs' },
  { label: 'visit-project', ...getFunctionScenarioCfg('project'), onReadyScript: 'puppet/scenarios/visit-page.cjs' },
  { label: 'visit-help', ...getFunctionScenarioCfg('help'), onReadyScript: 'puppet/scenarios/visit-page.cjs' },
  { label: 'visit-report', ...getFunctionScenarioCfg('report'), onReadyScript: 'puppet/scenarios/visit-page.cjs' },
  { label: 'generate-err', ...getFunctionScenarioCfg(), onReadyScript: 'puppet/scenarios/generate-err.cjs' },
  { label: 'generate-ok', ...getFunctionScenarioCfg(), onReadyScript: 'puppet/scenarios/generate-ok.cjs' },
  { label: 'inputs-none', ...getFunctionScenarioCfg(), onReadyScript: 'puppet/scenarios/inputs-none.cjs' },
  { label: 'inputs-all', ...getFunctionScenarioCfg(), onReadyScript: 'puppet/scenarios/inputs-all.cjs' },
  { label: 'inputs-clear', ...getFunctionScenarioCfg(), onReadyScript: 'puppet/scenarios/inputs-clear.cjs' },
  { label: 'lib-show', ...getFunctionScenarioCfg(), onReadyScript: 'puppet/scenarios/lib-show.cjs' },
]

function getImportScenarioCfg() {
  return {
    url: 'http://localhost:3000/',
    onReadyScript: 'puppet/scenarios/lib-action.cjs',
    selectors: ['#canvas'],
    viewports: [{ label: 'm', width: 1024, height: 768 }],
    delay: 50,
  }
}

function getImportScenarios() {
  const scenarios = []
  const library = require('./app/assets/json/library.json')
  library.forEach(json => scenarios.push({ label: 'action-' + json.file, ...getImportScenarioCfg() }))
  return scenarios
}

module.exports = {
  id: 'wbsc',
  viewports: [
    { label: 's', width: 325, height: 480 },
    { label: 'm', width: 1024, height: 768 },
    { label: 'l', width: 1920, height: 1080 },
  ],
  onBeforeScript: 'puppet/onBefore.cjs',
  onReadyScript: 'puppet/onReady.cjs',
  scenarios: [
    ...functionScenarios,
    ...getImportScenarios(),
  ],
  paths: {
    bitmaps_reference: 'tests/backstop/bitmaps_reference',
    bitmaps_test: 'tests/backstop/bitmaps_test',
    engine_scripts: 'tests/backstop/engine_scripts',
    html_report: 'tests/backstop/html_report',
    ci_report: 'tests/backstop/ci_report',
  },
  report: ['browser'],
  engine: 'puppeteer',
  engineOptions: {
    args: ['--no-sandbox'],
    headless: 'new',
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
  fileNameTemplate: '{scenarioLabel}_{viewportLabel}',
}
