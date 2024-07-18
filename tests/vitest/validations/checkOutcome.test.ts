import { expect, test } from 'vitest'
import { createMockOutput } from '../vitestUtils'

test('validation should pass for correct output', () => {
  const r1Output = createMockOutput({
    group: 'input-r1',
    specAction: 'ADV',
    base: 2,
  })
  const bOutput = createMockOutput({
    group: 'input-b',
    specAction: '1B',
    base: 1,
  })
  expect(checkOutcome([r1Output, bOutput])).toBe('')
})

test('validation should fail - runners cannot overtake his precessor', () => {
  const r2Output = createMockOutput({
    group: 'input-r2',
    specAction: 'ADV',
    base: 3,
    batter: 1,
  })
  const r1Output = createMockOutput({
    group: 'input-r1',
    specAction: 'ADV',
    base: 4,
    batter: 2,
  })
  expect(checkOutcome([r2Output, r1Output])).toBe(useT('editor.validation.noPassingRunner'))
})

test('validation should fail - runners cannot end on the same base', () => {
  const r2Output = createMockOutput({
    group: 'input-r2',
    specAction: 'ADV',
    base: 3,
    batter: 1,
  })
  const r1Output = createMockOutput({
    group: 'input-r1',
    specAction: 'ADV',
    base: 3,
    batter: 2,
  })
  expect(checkOutcome([r2Output, r1Output])).toBe(useT('editor.validation.noSameBase'))
})

test('validation should pass - extra actions for same runner must happen in order', () => {
  const r1aOutput = createMockOutput({
    group: 'input-r1a',
    specAction: 'ADV',
    base: 3,
  })
  const r1Output = createMockOutput({
    group: 'input-r1',
    specAction: 'ADV',
    base: 2,
  })
  expect(checkOutcome([r1aOutput, r1Output])).toBe('')
})

test('validation should fail - extra actions for same runner must happen in order', () => {
  const r1aOutput = createMockOutput({
    group: 'input-r1a',
    specAction: 'ADV',
    base: 2,
  })
  const r1Output = createMockOutput({
    group: 'input-r1',
    specAction: 'ADV',
    base: 3,
  })
  expect(checkOutcome([r1aOutput, r1Output])).toBe(useT('editor.validation.advanceInOrder'))
})

test('validation should pass - runner can advance and then be out', () => {
  const r1aOutput = createMockOutput({
    group: 'input-r1a',
    specAction: 'GO',
    base: 3,
    out: true,
  })
  const r1Output = createMockOutput({
    group: 'input-r1',
    specAction: 'ADV',
    base: 2,
  })
  expect(checkOutcome([r1aOutput, r1Output])).toBe('')
})

test('validation should fail - when the runner is out, he cannot advance further', () => {
  const r1aOutput = createMockOutput({
    group: 'input-r1a',
    specAction: 'ADV',
    base: 3,
  })
  const r1Output = createMockOutput({
    group: 'input-r1',
    specAction: 'GO',
    base: 2,
    out: true,
  })
  expect(checkOutcome([r1aOutput, r1Output])).toBe(useT('editor.validation.noAdvanceAfterOut'))
})

test('validation should fail - when the runner is out, he cannot be out again', () => {
  const r1aOutput = createMockOutput({
    group: 'input-r1a',
    specAction: 'GO',
    base: 3,
    out: true,
  })
  const r1Output = createMockOutput({
    group: 'input-r1',
    specAction: 'GO',
    base: 2,
    out: true,
  })
  expect(checkOutcome([r1aOutput, r1Output])).toBe(useT('editor.validation.noOutAfterOut'))
})

test('validation should fail - special case for "batter + same error"', () => {
  const b1Output = createMockOutput({
    group: 'input-b1',
    specAction: 'se0',
    base: 2,
  })
  const bOutput = createMockOutput({
    group: 'input-b',
    specAction: 'EF',
    base: 0,
    errorTarget: 1,
    out: true,
  })
  expect(checkOutcome([b1Output, bOutput])).toBe(useT('editor.validation.noAdvanceAfterOut'))
})
