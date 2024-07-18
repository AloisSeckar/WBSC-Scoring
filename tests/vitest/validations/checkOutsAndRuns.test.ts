import { expect, test } from 'vitest'
import { createMockOutput } from '../vitestUtils'

const bOutput = createMockOutput({
  group: 'input-b',
  specAction: 'GO',
  out: true,
})
const r1Output = createMockOutput({
  group: 'input-r1',
  specAction: 'GO',
  out: true,
})
const r2Output = createMockOutput({
  group: 'input-r2',
  specAction: 'GO',
  out: true,
})
const r3Output = createMockOutput({
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
  const r3RunOutput = createMockOutput({
    group: 'input-r3',
    specAction: 'ADV',
    base: 4,
  })
  expect(checkOutsAndRuns([bOutput, r1Output, r2Output, r3RunOutput])).toBe(useT('editor.validation.3OutsNoRuns'))
})
