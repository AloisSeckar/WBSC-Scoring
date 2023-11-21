function getFunctionScenarioCfg (url) {
  return {
    url: 'http://localhost:3000/' + (url || ''),
    delay: 50
  }
}

const functionScenarios = [
  { label: 'visit-index', ...getFunctionScenarioCfg() },
  { label: 'visit-project', ...getFunctionScenarioCfg('project') },
  { label: 'visit-help', ...getFunctionScenarioCfg('help') },
  { label: 'visit-report', ...getFunctionScenarioCfg('report') },
  { label: 'generate-err', ...getFunctionScenarioCfg(), clickSelector: '#button-input-generate' },
  { label: 'generate-ok', ...getFunctionScenarioCfg(), onReadyScript: 'puppet/scenarios/generate-ok.js' },
  { label: 'inputs-none', ...getFunctionScenarioCfg(), onReadyScript: 'puppet/scenarios/inputs-none.js' },
  { label: 'inputs-all', ...getFunctionScenarioCfg(), onReadyScript: 'puppet/scenarios/inputs-all.js' },
  { label: 'inputs-clear', ...getFunctionScenarioCfg(), onReadyScript: 'puppet/scenarios/inputs-clear.js' },
  { label: 'lib-show', ...getFunctionScenarioCfg(), clickSelector: '#button-input-import-lib' }
]

function getImportScenarioCfg () {
  return {
    url: 'http://localhost:3000/',
    onReadyScript: 'puppet/scenarios/lib-action.js',
    selectors: ['#canvas'],
    viewports: [{ label: 'm', width: 1024, height: 768 }],
    delay: 50
  }
}

function getImportScenarios () {
  const scenarios = []
  const library = require('./assets/json/library.json')
  library.forEach(json => scenarios.push({ label: 'action-' + json.file, ...getImportScenarioCfg() }))
  return scenarios
}

module.exports = {
  id: 'wbsc',
  viewports: [
    { label: 's', width: 320, height: 480 },
    { label: 'm', width: 1024, height: 768 },
    { label: 'l', width: 1920, height: 1080 }
  ],
  onBeforeScript: 'puppet/onBefore.js',
  onReadyScript: 'puppet/onReady.js',
  scenarios: [
    // ...functionScenarios,
    ...getImportScenarios()
  ],
  paths: {
    bitmaps_reference: 'backstop_data/bitmaps_reference',
    bitmaps_test: 'backstop_data/bitmaps_test',
    engine_scripts: 'backstop_data/engine_scripts',
    html_report: 'backstop_data/html_report',
    ci_report: 'backstop_data/ci_report'
  },
  report: ['browser'],
  engine: 'puppeteer',
  engineOptions: {
    args: ['--no-sandbox'],
    headless: 'new'
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
  fileNameTemplate: '{scenarioLabel}_{viewportLabel}'
}
