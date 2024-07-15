import { expect, test } from 'vitest'
import { createMockInput } from '../vitestUtils'

test('validation should pass - not a dead-ball play', () => {
  const bInput = createMockInput({
    group: 'input-b',
    baseAction: 'FC',
    specAction: 'O',
  })
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'out',
    specAction: 'GO',
  })
  expect(checkDeadBallPlays([bInput, r1Input])).toBe('')
})

const bINTInput = createMockInput({
  group: 'input-b',
  baseAction: 'Error',
  specAction: 'INT',
})

const r1Input = createMockInput({
  group: 'input-r1',
  baseAction: 'adv',
  specAction: 'ADV',
})
const r2Input = createMockInput({
  group: 'input-r2',
  baseAction: 'adv',
  specAction: 'ADV',
})
const r3Input = createMockInput({
  group: 'input-r3',
  baseAction: 'adv',
  specAction: 'ADV',
})

test('validation should pass - only ADV after dead-ball play', () => {
  expect(checkDeadBallPlays([bINTInput, r1Input, r2Input, r3Input])).toBe('')
})

test('validation should fail - other situation after dead-ball play', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'out',
    specAction: 'GO',
  })
  expect(checkDeadBallPlays([bINTInput, r1Input])).toBe(useT('editor.validation.noPlayAfterDeadBall'))
})

test('validation should fail - ADV of not-forced runner at 2nd after dead-ball play', () => {
  expect(checkDeadBallPlays([bINTInput, r2Input])).toBe(useT('editor.validation.noPlayAfterDeadBall'))
})

test('validation should fail - ADV of not-forced runner at 3rd after dead-ball play', () => {
  expect(checkDeadBallPlays([bINTInput, r3Input])).toBe(useT('editor.validation.noPlayAfterDeadBall'))
})

const bOBInput = createMockInput({
  group: 'input-b',
  baseAction: 'Error',
  specAction: 'OB',
  pos1: '2',
})

const rBKInput = createMockInput({
  group: 'input-r3',
  baseAction: 'exb',
  specAction: 'BK',
})

test('validation should fail - BK + other play', () => {
  expect(checkDeadBallPlays([r1Input, rBKInput])).toBe(useT('editor.validation.noPlayAfterBK'))
})

test('validation should pass - BK at 3rd + OB2 exception', () => {
  expect(checkDeadBallPlays([bOBInput, rBKInput])).toBe('')
})

const rIPInput = createMockInput({
  group: 'input-r3',
  baseAction: 'exb',
  specAction: 'IP',
})

test('validation should fail - IP + other play', () => {
  expect(checkDeadBallPlays([r1Input, rIPInput])).toBe(useT('editor.validation.noPlayAfterIP'))
})

test('validation should pass - IP at 3rd + OB2 exception', () => {
  expect(checkDeadBallPlays([bOBInput, rIPInput])).toBe('')
})
