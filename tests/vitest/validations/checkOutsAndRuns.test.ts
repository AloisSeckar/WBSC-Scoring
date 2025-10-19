import { expect, test } from 'vitest'
import { createMockAction } from '../vitestUtils'

import { checkOutsAndRuns } from '../../../app/utils/wbsc-validation'
import { useT } from '../../../app/composables/useTranslation'

const bOutput = createMockAction({
  group: 'input-b',
  specAction: 'GO',
  out: true,
})
const r1Output = createMockAction({
  group: 'input-r1',
  specAction: 'GO',
  out: true,
})
const r2Output = createMockAction({
  group: 'input-r2',
  specAction: 'GO',
  out: true,
})
const r3Output = createMockAction({
  group: 'input-r3',
  specAction: 'GO',
  out: true,
})

test('validation should pass if there is one out', () => {
  expect(checkOutsAndRuns([bOutput])).toBe('')
})

test('validation should pass if there are 3 outs', () => {
  expect(checkOutsAndRuns([bOutput, r1Output, r2Output])).toBe('')
})

test('validation should fail if there are 4 outs', () => {
  expect(checkOutsAndRuns([bOutput, r1Output, r2Output, r3Output])).toBe(useT('editor.validation.max3Outs'))
})

test('validation should fail if there are 3 outs + run', () => {
  const r3RunOutput = createMockAction({
    group: 'input-r3',
    specAction: 'ADV',
    targetBase: 4,
  })
  expect(checkOutsAndRuns([bOutput, r1Output, r2Output, r3RunOutput])).toBe(useT('editor.validation.3OutsNoRuns'))
})
