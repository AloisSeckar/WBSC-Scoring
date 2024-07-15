import { expect, test } from 'vitest'
import { createMockInput } from '../vitestUtils'

const bInput = createMockInput({
  group: 'input-b',
  baseAction: 'Hit',
  specAction: '1B',
})

test('validation should pass for batter input only', () => {
  expect(checkAdvances([bInput])).toBe('')
})

test('validation should pass for runner input only', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'ste',
    specAction: 'SB',
  })
  expect(checkAdvances([r1Input])).toBe('')
})

test('validation should pass for correct batter + runner input', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'adv',
    specAction: 'ADV',
  })
  expect(checkHit([bInput, r1Input])).toBe('')
})

test('validation should fail if batter action missing', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'adv',
    specAction: 'ADV',
  })
  expect(checkAdvances([r1Input])).toBe(useT('editor.validation.noADVWithoutBatter'))
})

test('validation should fail if ADV is not first', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'ste',
    specAction: 'SB',
  })
  const r1aInput = createMockInput({
    group: 'input-r1a',
    baseAction: 'adv',
    specAction: 'ADV',
  })
  expect(checkAdvances([bInput, r1Input, r1aInput])).toBe(useT('editor.validation.invalidADV'))
})
