import { expect, test } from 'vitest'
import { createMockInput } from '../vitestUtils'

test('validation should pass - not SH/SF action', () => {
  const bInput = createMockInput({
    group: 'input-b',
    baseAction: 'Hit',
    specAction: '1B',
  })
  expect(checkSHSF([bInput])).toBe('')
})

const bSHInput = createMockInput({
  group: 'input-b',
  baseAction: 'Sacrifice',
  specAction: 'SH',
})

const r1ADVInput = createMockInput({
  group: 'input-r1',
  baseAction: 'adv',
  specAction: 'ADV',
})

test('validation should fail - no runner advanced', () => {
  expect(checkSHSF([bSHInput])).toBe(useT('editor.validation.missingSHPlay'))
})

test('validation should pass - runner from 1st advanced', () => {
  expect(checkSHSF([bSHInput, r1ADVInput])).toBe('')
})

test('validation should fail - runner from 1st advanced, but runner from 2nd is forced out', () => {
  const r2Input = createMockInput({
    group: 'input-r2',
    baseAction: 'out',
    specAction: 'GO',
  })
  expect(checkSHSF([bSHInput, r1ADVInput, r2Input])).toBe(useT('editor.validation.noSHAndO'))
})

test('validation should pass - runner from 1st advanced and runner from 3rd was not forced', () => {
  const r3Input = createMockInput({
    group: 'input-r3',
    baseAction: 'out',
    specAction: 'GO',
  })
  expect(checkSHSF([bSHInput, r1ADVInput, r3Input])).toBe('')
})

const bSFInput = createMockInput({
  group: 'input-b',
  baseAction: 'Sacrifice',
  specAction: 'SF',
})

test('validation should fail - no runner advanced', () => {
  const shValidation = useT('editor.validation.missingSFPlay') + '\n' + useT('editor.validation.missingSFRun')
  expect(checkSHSF([bSFInput])).toBe(shValidation)
})

test('validation should fail - no runner scored', () => {
  expect(checkSHSF([bSFInput, r1ADVInput])).toBe(useT('editor.validation.missingSFRun'))
})

test('validation should pass - runner scored', () => {
  const r3Input = createMockInput({
    group: 'input-r3',
    baseAction: 'adv',
    specAction: 'ADV',
    base: 4,
  })
  expect(checkSHSF([bSFInput, r3Input])).toBe('')
})
