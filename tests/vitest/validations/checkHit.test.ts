import { expect, test } from 'vitest'
import { createMockInput } from '../vitestUtils'

const bInput = createMockInput({
  group: 'input-b',
  baseAction: 'Hit',
  specAction: '1B',
})

test('validation should pass for batter input only', () => {
  expect(checkHit([bInput])).toBe('')
})

test('validation should pass for correct batter + runner input', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'adv',
    specAction: 'ADV',
  })
  expect(checkHit([bInput, r1Input])).toBe('')
})

test('validation should fail for FORCED out runner', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'out',
    specAction: 'GO',
  })
  expect(checkHit([bInput, r1Input])).toBe(useT('editor.validation.noHitAndO'))
})

test('validation should pass for NOT FORCED out runner', () => {
  const r2Input = createMockInput({
    group: 'input-r2',
    baseAction: 'out',
    specAction: 'GO',
  })
  expect(checkHit([bInput, r2Input])).toBe('')
})

test('validation should fail for APPEAL PLAY', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'out',
    specAction: 'A',
  })
  // #193 - here it shouldn't be reversed!
  expect(checkHit([r1Input, bInput])).toBe(useT('editor.validation.noHitAndA'))
})
