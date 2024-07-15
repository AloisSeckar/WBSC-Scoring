import { expect, test } from 'vitest'
import { createMockOutput } from '../vitestUtils'

test('validation should pass - no "se" action', () => {
  const bOutput = createMockOutput({
    group: 'input-b',
    specAction: '1B',
  })
  const r1Output = createMockOutput({
    group: 'input-r1',
    specAction: 'ADV',
  })
  expect(checkSameError([r1Output, bOutput])).toBe('')
})

test('validation should pass - correct "se" action', () => {
  const bOutput = createMockOutput({
    group: 'input-b',
    specAction: 'ET',
  })
  const r1Output = createMockOutput({
    group: 'input-r1',
    specAction: 'se0',
  })
  expect(checkSameError([r1Output, bOutput])).toBe('')
})

test('validation should fail - no "se" action for R2', () => {
  const bOutput = createMockOutput({
    group: 'input-b',
    specAction: 'ET',
  })
  const r1Output = createMockOutput({
    group: 'input-r1',
    specAction: 'se2',
  })
  expect(checkSameError([r1Output, bOutput])).toBe(useT('editor.validation.noSE').replace('#p#', 'R2'))
})

test('validation should pass - batter can have 1 extra "occupied" play', () => {
  const bOutput = createMockOutput({
    group: 'input-b',
    specAction: '1B',
  })
  const b1Output = createMockOutput({
    group: 'input-b1',
    specAction: 'oc',
  })
  expect(checkSameError([b1Output, bOutput])).toBe('')
})

test('validation should fail - batter can only have 1 extra "occupied" play', () => {
  const bOutput = createMockOutput({
    group: 'input-b',
    specAction: '1B',
  })
  const b1Output = createMockOutput({
    group: 'input-b1',
    specAction: 'oc',
  })
  const b2Output = createMockOutput({
    group: 'input-b2',
    specAction: 'oc',
  })
  expect(checkSameError([b2Output, b1Output, bOutput])).toBe(useT('editor.validation.noExAdvFC'))
})

test('validation should pass - can only have one "se" action', () => {
  const bOutput = createMockOutput({
    group: 'input-b',
    specAction: 'ET',
  })
  const r1Output = createMockOutput({
    group: 'input-r1',
    specAction: 'se0',
  })
  const r1aOutput = createMockOutput({
    group: 'input-r1a',
    specAction: 'se0',
  })
  expect(checkSameError([r1aOutput, r1Output, bOutput])).toBe(useT('editor.validation.noExAdvSE').replace('#p#', 'B'))
})
