import { expect, test } from 'vitest'
import { createMockAction } from '../vitestUtils'

import { checkSHSF } from '../../../app/utils/wbsc-validation'
import { useT } from '../../../app/composables/useTranslation'

test('validation should pass - not SH/SF action', () => {
  const bInput = createMockAction({
    group: 'input-b',
    baseAction: 'Hit',
    specAction: '1B',
  })
  expect(checkSHSF([bInput])).toBe('')
})

const bSHInput = createMockAction({
  group: 'input-b',
  baseAction: 'Sacrifice',
  specAction: 'SH',
})

const r1ADVInput = createMockAction({
  group: 'input-r1',
  baseAction: 'adv',
  specAction: 'ADV',
})

test('validation should fail - no runner advanced', () => {
  expect(checkSHSF([bSHInput])).toBe(useT('editor.validation.missingSHPlay'))
})

test('validation should pass - runner from 1st advanced', () => {
  expect(checkSHSF([r1ADVInput, bSHInput])).toBe('')
})

test('validation should fail - runner from 1st advanced, but runner from 2nd was out', () => {
  const r2Input = createMockAction({
    group: 'input-r2',
    baseAction: 'out',
    specAction: 'GO',
  })
  expect(checkSHSF([r2Input, r1ADVInput, bSHInput])).toBe(useT('editor.validation.noSHAndO'))
})

test('validation should fail - runner from 1st advanced, but runner from 3rd was out', () => {
  const r3Input = createMockAction({
    group: 'input-r3',
    baseAction: 'out',
    specAction: 'GO',
  })
  expect(checkSHSF([r3Input, r1ADVInput, bSHInput])).toBe(useT('editor.validation.noSHAndO'))
})

test('validation should pass - runner from 1st advanced one base, was out afterwards', () => {
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'adv',
    specAction: 'ADV',
  })
  const r1aInput = createMockAction({
    group: 'input-r1a',
    baseAction: 'out',
    specAction: 'GO',
  })
  expect(checkSHSF([r1aInput, r1Input, bSHInput])).toBe('')
})

const bSFInput = createMockAction({
  group: 'input-b',
  baseAction: 'Sacrifice',
  specAction: 'SF',
})

test('validation should fail - no runner advanced', () => {
  const shValidation = useT('editor.validation.missingSFPlay') + '\n' + useT('editor.validation.missingSFRun')
  expect(checkSHSF([bSFInput])).toBe(shValidation)
})

test('validation should fail - no runner scored', () => {
  expect(checkSHSF([r1ADVInput, bSFInput])).toBe(useT('editor.validation.missingSFRun'))
})

test('validation should pass - runner scored', () => {
  const r3Input = createMockAction({
    group: 'input-r3',
    baseAction: 'adv',
    specAction: 'ADV',
    base: 4,
  })
  expect(checkSHSF([r3Input, bSFInput])).toBe('')
})
