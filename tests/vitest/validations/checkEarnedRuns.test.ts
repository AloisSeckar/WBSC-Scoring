import { expect, test } from 'vitest'
import { createMockOutput } from '../vitestUtils'

test('validation should pass - no run scored', () => {
  const bOutput = createMockOutput({
    group: 'input-b',
    specAction: '1B',
    base: 1,
  })
  const r1Output = createMockOutput({
    group: 'input-r1',
    specAction: 'ADV',
    base: 2,
  })
  expect(checkEarnedRuns([r1Output, bOutput])).toBe('')
})

test('validation should pass - ER with no error', () => {
  const bOutput = createMockOutput({
    group: 'input-b',
    specAction: '3B',
    base: 3,
  })
  const r1Output = createMockOutput({
    group: 'input-r1',
    specAction: 'ADV',
    base: 4,
    run: 'e',
  })
  expect(checkEarnedRuns([r1Output, bOutput])).toBe('')
})

test('validation should fail - ER, but there was decessive error', () => {
  const bOutput = createMockOutput({
    group: 'input-b',
    specAction: 'O',
    base: 1,
  })
  const r1Output = createMockOutput({
    group: 'input-r1',
    specAction: 'EF',
    base: 2,
    errorTarget: 4,
    run: 'e',
  })
  expect(checkEarnedRuns([r1Output, bOutput])).toBe(useT('editor.validation.noER').replace('#p#', 'R1'))
})

test('validation should pass - TIE run is UE', () => {
  const bOutput = createMockOutput({
    group: 'input-b',
    specAction: '1B',
    base: 1,
  })
  const r2Output = createMockOutput({
    group: 'input-r2',
    specAction: 'ADV',
    base: 4,
    run: 'ue',
    tie: true,
  })
  expect(checkEarnedRuns([r2Output, bOutput])).toBe('')
})

test('validation should fail - TIE run cannot be ER', () => {
  const bOutput = createMockOutput({
    group: 'input-b',
    specAction: '1B',
    base: 1,
  })
  const r2Output = createMockOutput({
    group: 'input-r2',
    specAction: 'ADV',
    base: 4,
    run: 'e',
    tie: true,
  })
  expect(checkEarnedRuns([r2Output, bOutput])).toBe(useT('editor.validation.noTieER'))
})

test('validation should fail - TIE run cannot be TU', () => {
  const bOutput = createMockOutput({
    group: 'input-b',
    specAction: '2B',
    base: 2,
  })
  const r1Output = createMockOutput({
    group: 'input-r1',
    specAction: 'ADV',
    base: 4,
    run: 'tu',
    tie: true,
  })
  expect(checkEarnedRuns([r1Output, bOutput])).toBe(useT('editor.validation.noTieER'))
})
