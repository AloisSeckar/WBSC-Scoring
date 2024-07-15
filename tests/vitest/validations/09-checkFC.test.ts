import { expect, test } from 'vitest'
import { createMockInput } from '../vitestUtils'

test('validation should pass - not FC action', () => {
  const bInput = createMockInput({
    group: 'input-b',
    baseAction: 'Hit',
    specAction: '1B',
  })
  expect(checkFC([bInput])).toBe('')
})

const bOInput = createMockInput({
  group: 'input-b',
  baseAction: 'FC',
  specAction: 'O',
})

test('validation should fail - O-play with no runner action', () => {
  expect(checkFC([bOInput])).toBe(useT('editor.validation.missingOPlay'))
})

test('validation should pass - O-play with forced-out runner', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'GroundOut',
    specAction: 'GO',
  })
  expect(checkFC([bOInput, r1Input])).toBe('')
})

test('validation should pass - O-play with decisive error at runner', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'err',
    specAction: 'ET',
  })
  expect(checkFC([bOInput, r1Input])).toBe('')
})

test('validation should fail - O-play with decisive error at runner, but after he advanced', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'adv',
    specAction: 'ADV',
  })
  const r1aInput = createMockInput({
    group: 'input-r1a',
    baseAction: 'err',
    specAction: 'ET',
  })
  expect(checkFC([bOInput, r1Input, r1aInput])).toBe(useT('editor.validation.missingOPlay'))
})

const bFCInput = createMockInput({
  group: 'input-b',
  baseAction: 'FC',
  specAction: 'FC',
})

test('validation should fail - FC action with no runner action', () => {
  expect(checkFC([bFCInput])).toBe(useT('editor.validation.missingFCPlay'))
})

test('validation should pass - FC action with runner advance', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'adv',
    specAction: 'ADV',
  })
  expect(checkFC([bFCInput, r1Input])).toBe('')
})

const bKSFCInput = createMockInput({
  group: 'input-b',
  baseAction: 'StrikeOut',
  specAction: 'KSFC',
})

test('validation should fail - KSFC action with no runner action', () => {
  expect(checkFC([bKSFCInput])).toBe(useT('editor.validation.missingPBPlay'))
})

test('validation should pass - KSFC action with PB at runner', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'exb',
    specAction: 'PB',
  })
  expect(checkFC([bKSFCInput, r1Input])).toBe('')
})

const bO1Input = structuredClone(bOInput)
bO1Input.pos1 = '1'

test('validation should pass - correct O-play target', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'GroundOut',
    specAction: 'GO',
    pos1: '1',
    pos2: '6',
  })
  expect(checkFC([bO1Input, r1Input])).toBe('')
})

test('validation should fail - incorrect O-play target', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'GroundOut',
    specAction: 'GO',
    pos1: '4',
    pos2: '6',
  })
  expect(checkFC([bO1Input, r1Input])).toBe(useT('editor.validation.invalidOPlay'))
})
