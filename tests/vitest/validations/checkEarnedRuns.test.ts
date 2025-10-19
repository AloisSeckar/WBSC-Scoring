import { expect, test } from 'vitest'
import { createMockAction } from '../vitestUtils'

import { checkEarnedRuns } from '../../../app/utils/wbsc-validation'
import { useT } from '../../../app/composables/useTranslation'

test('validation should pass - no run scored', () => {
  const bOutput = createMockAction({
    group: 'input-b',
    specAction: '1B',
    targetBase: 1,
  })
  const r1Output = createMockAction({
    group: 'input-r1',
    specAction: 'ADV',
    targetBase: 2,
  })
  expect(checkEarnedRuns([r1Output, bOutput])).toBe('')
})

test('validation should pass - ER with no error', () => {
  const bOutput = createMockAction({
    group: 'input-b',
    specAction: '3B',
    targetBase: 3,
  })
  const r1Output = createMockAction({
    group: 'input-r1',
    specAction: 'ADV',
    targetBase: 4,
    runtype: 'e',
  })
  expect(checkEarnedRuns([r1Output, bOutput])).toBe('')
})

test('validation should fail - ER, but there was decessive error', () => {
  const bOutput = createMockAction({
    group: 'input-b',
    specAction: 'O',
    targetBase: 1,
  })
  const r1Output = createMockAction({
    group: 'input-r1',
    specAction: 'EF',
    outputBase: 2,
    targetBase: 4,
    runtype: 'e',
  })
  expect(checkEarnedRuns([r1Output, bOutput])).toBe(useT('editor.validation.noER').replace('#p#', 'R1'))
})

test('validation should pass - TIE run is UE', () => {
  const bOutput = createMockAction({
    group: 'input-b',
    specAction: '1B',
    targetBase: 1,
  })
  const r2Output = createMockAction({
    group: 'input-r2',
    specAction: 'ADV',
    targetBase: 4,
    runtype: 'ue',
    tie: true,
  })
  expect(checkEarnedRuns([r2Output, bOutput])).toBe('')
})

test('validation should fail - TIE run cannot be ER', () => {
  const bOutput = createMockAction({
    group: 'input-b',
    specAction: '1B',
    targetBase: 1,
  })
  const r2Output = createMockAction({
    group: 'input-r2',
    specAction: 'ADV',
    targetBase: 4,
    runtype: 'e',
    tie: true,
  })
  expect(checkEarnedRuns([r2Output, bOutput])).toBe(useT('editor.validation.noTieER'))
})

test('validation should fail - TIE run cannot be TU', () => {
  const bOutput = createMockAction({
    group: 'input-b',
    specAction: '2B',
    targetBase: 2,
  })
  const r1Output = createMockAction({
    group: 'input-r1',
    specAction: 'ADV',
    targetBase: 4,
    runtype: 'tu',
    tie: true,
  })
  expect(checkEarnedRuns([r1Output, bOutput])).toBe(useT('editor.validation.noTieER'))
})
