import { expect, test } from 'vitest'
import { createMockInput } from '../vitestUtils'

test('validation should pass if there are only batter actions', () => {
  const bInput = createMockInput({
    group: 'input-b',
    baseAction: 'Hit',
    specAction: '1B',
  })
  const b1Input = createMockInput({
    group: 'input-b1',
    baseAction: 'fdc',
    specAction: 'T',
  })
  expect(checkRunnerOnlyActions([b1Input, bInput])).toBe('')
})

test('validation should pass if there are only runner actions', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'adv',
    specAction: 'ADV',
  })
  const r1aInput = createMockInput({
    group: 'input-r1a',
    baseAction: 'err',
    specAction: 'EF',
  })
  const r2Input = createMockInput({
    group: 'input-r2',
    baseAction: 'adv',
    specAction: 'ADV',
  })
  expect(checkRunnerOnlyActions([r2Input, r1aInput, r1Input])).toBe('')
})

test('validation should pass for valid combination', () => {
  const bInput = createMockInput({
    group: 'input-b',
    baseAction: 'Hit',
    specAction: '1B',
  })
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'adv',
    specAction: 'ADV',
  })
  expect(checkRunnerOnlyActions([r1Input, bInput])).toBe('')
})

test('validation should fail for invalid combination', () => {
  const bInput = createMockInput({
    group: 'input-b',
    baseAction: 'Hit',
    specAction: '1B',
  })
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'ste',
    specAction: 'SB',
  })
  expect(checkRunnerOnlyActions([r1Input, bInput])).toBe(useT('editor.validation.runnerOnlyAction'))
})

test('validation should pass - BB + WP is possible', () => {
  const bInput = createMockInput({
    group: 'input-b',
    baseAction: 'Advance',
    specAction: 'BB1',
  })
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'exb',
    specAction: 'wp',
  })
  const r2Input = createMockInput({
    group: 'input-r2',
    baseAction: 'exb',
    specAction: 'WP',
  })
  expect(checkRunnerOnlyActions([r2Input, r1Input, bInput])).toBe('')
})

test('validation should pass - KS + PB is possible', () => {
  const bInput = createMockInput({
    group: 'input-b',
    baseAction: 'StrikeOut',
    specAction: 'KS',
  })
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'exb',
    specAction: 'pb',
  })
  const r2Input = createMockInput({
    group: 'input-r2',
    baseAction: 'exb',
    specAction: 'PB',
  })
  expect(checkRunnerOnlyActions([r2Input, r1Input, bInput])).toBe('')
})

test('validation should fail - KL + BK is impossible', () => {
  const bInput = createMockInput({
    group: 'input-b',
    baseAction: 'StrikeOut',
    specAction: 'KL',
  })
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'exb',
    specAction: 'BK',
  })

  expect(checkRunnerOnlyActions([r1Input, bInput])).toBe(useT('editor.validation.runnerOnlyAction'))
})

test('validation should pass - OB2 + IP is possible from 3rd', () => {
  const bInput = createMockInput({
    group: 'input-b',
    baseAction: 'Error',
    specAction: 'OB',
    pos1: '2',
  })
  const r3Input = createMockInput({
    group: 'input-r3',
    baseAction: 'exb',
    specAction: 'IP',
  })

  expect(checkRunnerOnlyActions([r3Input, bInput])).toBe('')
})
