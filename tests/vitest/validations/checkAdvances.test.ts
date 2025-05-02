import { expect, test } from 'vitest'
import { createMockAction } from '../vitestUtils'

const bInput = createMockAction({
  group: 'input-b',
  baseAction: 'Hit',
  specAction: '1B',
})

test('validation should pass for batter input only', () => {
  expect(checkAdvances([bInput])).toBe('')
})

test('validation should pass for runner input only', () => {
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'ste',
    specAction: 'SB',
  })
  expect(checkAdvances([r1Input])).toBe('')
})

test('validation should pass for correct batter + runner input', () => {
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'adv',
    specAction: 'ADV',
  })
  expect(checkHit([r1Input, bInput])).toBe('')
})

test('validation should fail if batter action missing', () => {
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'adv',
    specAction: 'ADV',
  })
  expect(checkAdvances([r1Input])).toBe(useT('editor.validation.noADVWithoutBatter'))
})

test('validation should fail if ADV is not first', () => {
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'ste',
    specAction: 'SB',
  })
  const r1aInput = createMockAction({
    group: 'input-r1a',
    baseAction: 'adv',
    specAction: 'ADV',
  })
  expect(checkAdvances([r1aInput, r1Input, bInput])).toBe(useT('editor.validation.invalidADV'))
})
