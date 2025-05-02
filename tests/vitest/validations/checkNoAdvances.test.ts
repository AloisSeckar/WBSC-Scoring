import { expect, test } from 'vitest'
import { createMockAction } from '../vitestUtils'

test('validation should pass -  not a "no advance" play', () => {
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'ste',
    specAction: 'SB',
  })
  expect(checkNoAdvances([r1Input])).toBe('')
})

test('validation should pass - "no advance" play at closest base', () => {
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'ste',
    specAction: 'CSN',
    origBase: 1,
    base: 2,
  })
  expect(checkNoAdvances([r1Input])).toBe('')
})

test('validation should fail - "no advance" play at +1 base', () => {
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'ste',
    specAction: 'CSN',
    origBase: 1,
    base: 3,
  })
  expect(checkNoAdvances([r1Input])).toBe(useT('editor.validation.noAdvanceOnNA'))
})
