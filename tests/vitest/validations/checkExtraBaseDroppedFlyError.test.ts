import { expect, test } from 'vitest'
import { createMockOutput } from '../vitestUtils'

test('validation should pass - not eDF action', () => {
  const rInput = createMockOutput({
    group: 'input-r1',
    specAction: 'eF',
  })
  expect(checkExtraBaseDroppedFlyError([rInput])).toBe('')
})

const r2Input = createMockOutput({
  group: 'input-r2',
  specAction: 'eDF',
})

const invalid = useT('editor.validation.eDF')

test('validation should fail - missing batter action', () => {
  expect(checkExtraBaseDroppedFlyError([r2Input])).toBe(invalid)
})

test('validation should fail - invalid batter action', () => {
  const bInput = createMockOutput({
    group: 'input-b',
    specAction: 'KS',
  })
  expect(checkExtraBaseDroppedFlyError([r2Input, bInput])).toBe(invalid)
})

test('validation should pass - FC - occupied', () => {
  const bInput = createMockOutput({
    group: 'input-b',
    specAction: 'O',
  })
  expect(checkExtraBaseDroppedFlyError([r2Input, bInput])).toBe('')
})

test('validation should pass - FC - occupied - bunt', () => {
  const bInput = createMockOutput({
    group: 'input-b',
    specAction: 'OCB',
  })
  expect(checkExtraBaseDroppedFlyError([r2Input, bInput])).toBe('')
})
