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
  { label: 'generate-err', ...getFunctionScenarioCfg(), clickSelector: '#button-input-generate' },
  { label: 'generate-ok', ...getFunctionScenarioCfg(), onReadyScript: 'puppet/scenarios/generate-ok.js' },
  { label: 'inputs-none', ...getFunctionScenarioCfg(), onReadyScript: 'puppet/scenarios/inputs-none.js' },
  { label: 'inputs-all', ...getFunctionScenarioCfg(), onReadyScript: 'puppet/scenarios/inputs-all.js' },
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

const actions = [
  'out-63', 'out-54b', 'out-f4', 'out-ff5', 'out-ff2b', 'ks', 'kl', 'ks-2', 'kl-23',
  'ksb', 'ksr', 'ksi', 'ks-wp', 'ks-e2t', 'ks-2e3', 'kso', 'ksfc', 'kl-pb', '1b-lf', '1b-1b', '2b-ll',
  '2b-8gr', '3b-rc', 'hr-8', 'hr-8ue', 'hr-8tu', 'hr-rl-i', 'hr-rc-4rbi', 'hr-rc-4rbi', 'sh-54', 'sf-8',
  'fc-o6', 'fc-64', 'error-5', 'error-6t', 'error-7f', 'error-4e3', '1b-9-e9', '1b-9-e9t', 'error-sh-e5t',
  'error-sh-5e4', 'error-sf-e8', 'gdp-643', 'gdp-64e3', 'out-if6', 'sb-single', 'sb-double', 'sb-e2t',
  'cs-26', 'cs-25-o', 'cs-2e6', 'a-13', 'lt'
]

function getImportScenarios () {
  const scenarios = []
  actions.forEach(a => scenarios.push({ label: 'action-' + a, ...getImportScenarioCfg() }))
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
    ...functionScenarios,
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
