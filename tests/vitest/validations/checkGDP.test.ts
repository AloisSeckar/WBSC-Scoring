import { expect, test } from 'vitest'
import { createMockOutput } from '../vitestUtils'

test('validation should pass - not GDP action', () => {
  const bOutput = createMockOutput({
    group: 'input-b',
    specAction: '1B',
    text1: '1B',
    base: 1,
  })
  expect(checkGDP([bOutput])).toBe('')
})

const bGDPOutput = createMockOutput({
  group: 'input-b',
  specAction: 'GDP',
  text1: 'GDP',
  base: 1,
})
const r1Output = createMockOutput({
  group: 'input-r1',
  specAction: 'GO',
  base: 2,
  out: true,
})
const r2Output = createMockOutput({
  group: 'input-r2',
  specAction: 'GO',
  base: 3,
  out: true,
})

test('validation should fail - GDP action with no runner out', () => {
  expect(checkGDP([bGDPOutput])).toBe(useT('editor.validation.missingGDPPlay'))
})

test('validation should pass - GDP action with runner out', () => {
  expect(checkGDP([r1Output, bGDPOutput])).toBe('')
})

const bGDPOOutput = structuredClone(bGDPOutput)
bGDPOOutput.text1 = 'GDPO'

test('validation should fail - GDPO action with only one runner out', () => {
  expect(checkGDP([r1Output, bGDPOOutput])).toBe(useT('editor.validation.missingGDPOPlay'))
})

test('validation should pass - GDPO action with two runners out', () => {
  expect(checkGDP([r2Output, r1Output, bGDPOOutput])).toBe('')
})

test('validation should pass - GDP action with decisive error at runner', () => {
  const r1ErrorOutput = createMockOutput({
    group: 'input-r1',
    specAction: 'EF',
    text1: '4E6',
    base: 2,
    out: false,
  })
  expect(checkGDP([r1ErrorOutput, bGDPOutput])).toBe('')
})
