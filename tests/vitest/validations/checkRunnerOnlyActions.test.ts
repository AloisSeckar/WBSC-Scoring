import { expect, test } from 'vitest'
import { createMockAction } from '../vitestUtils'

test('validation should pass if there are only batter actions', () => {
  const bInput = createMockAction({
    group: 'input-b',
    baseAction: 'Hit',
    specAction: '1B',
  })
  const b1Input = createMockAction({
    group: 'input-b1',
    baseAction: 'fdc',
    specAction: 'T',
  })
  expect(checkRunnerOnlyActions([b1Input, bInput])).toBe('')
})

test('validation should pass if there are only runner actions', () => {
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'adv',
    specAction: 'ADV',
  })
  const r1aInput = createMockAction({
    group: 'input-r1a',
    baseAction: 'err',
    specAction: 'EF',
  })
  const r2Input = createMockAction({
    group: 'input-r2',
    baseAction: 'adv',
    specAction: 'ADV',
  })
  expect(checkRunnerOnlyActions([r2Input, r1aInput, r1Input])).toBe('')
})

test('validation should pass for valid combination', () => {
  const bInput = createMockAction({
    group: 'input-b',
    baseAction: 'Hit',
    specAction: '1B',
  })
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'adv',
    specAction: 'ADV',
  })
  expect(checkRunnerOnlyActions([r1Input, bInput])).toBe('')
})

test('validation should fail for invalid combination', () => {
  const bInput = createMockAction({
    group: 'input-b',
    baseAction: 'Hit',
    specAction: '1B',
  })
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'ste',
    specAction: 'SB',
  })
  expect(checkRunnerOnlyActions([r1Input, bInput])).toBe(useT('editor.validation.runnerOnlyAction'))
})

test('validation should pass - BB + WP is possible', () => {
  const bInput = createMockAction({
    group: 'input-b',
    baseAction: 'Advance',
    specAction: 'BB1',
  })
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'exb',
    specAction: 'WP',
  })
  const r2Input = createMockAction({
    group: 'input-r2',
    baseAction: 'exb',
    specAction: 'WP',
  })
  expect(checkRunnerOnlyActions([r2Input, r1Input, bInput])).toBe('')
})

test('validation should pass - KS + PB is possible', () => {
  const bInput = createMockAction({
    group: 'input-b',
    baseAction: 'StrikeOut',
    specAction: 'KS',
  })
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'exb',
    specAction: 'PB',
  })
  const r2Input = createMockAction({
    group: 'input-r2',
    baseAction: 'exb',
    specAction: 'PB',
  })
  expect(checkRunnerOnlyActions([r2Input, r1Input, bInput])).toBe('')
})

test('validation should fail - KL + BK is impossible', () => {
  const bInput = createMockAction({
    group: 'input-b',
    baseAction: 'StrikeOut',
    specAction: 'KL',
  })
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'exb',
    specAction: 'BK',
  })

  expect(checkRunnerOnlyActions([r1Input, bInput])).toBe(useT('editor.validation.runnerOnlyAction'))
})

test('validation should pass - OB2 + IP is possible from 3rd', () => {
  const bInput = createMockAction({
    group: 'input-b',
    baseAction: 'Error',
    specAction: 'OB',
    pos1: '2',
  })
  const r3Input = createMockAction({
    group: 'input-r3',
    baseAction: 'exb',
    specAction: 'IP',
  })

  expect(checkRunnerOnlyActions([r3Input, bInput])).toBe('')
})
