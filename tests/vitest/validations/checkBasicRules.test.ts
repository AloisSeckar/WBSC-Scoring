import { expect, test } from 'vitest'
import { createMockAction, createMockPosSelections } from '../vitestUtils'

import { checkBasicRules } from '../../../app/utils/wbsc-validation'
import { useT } from '../../../app/composables/useTranslation'

const okInput = createMockAction({
  group: 'input-b',
  baseAction: 'GroundOut',
  specAction: 'GO',
  pos1: '6',
  pos2: '3',
})

test('validation should fail for empty input', () => {
  expect(checkBasicRules([])).toBe(useT('editor.validation.noEmptyInput'))
})

test('validation should pass for correct input', () => {
  createMockPosSelections('input-b', 2)
  expect(checkBasicRules([okInput])).toBe('')
})

test('validation should fail if more pos selects displayed', () => {
  createMockPosSelections('input-b', 3)
  expect(checkBasicRules([okInput])).toBe(useT('editor.validation.allPositions'))
})

test('validation should fail for incomplete inputs', () => {
  createMockPosSelections('input-b', 2)
  const noBaseActionInput = { ...okInput }
  noBaseActionInput.baseAction = ''
  expect(checkBasicRules([noBaseActionInput])).toBe(useT('editor.validation.properAction'))
  const noSpecActionInput = { ...okInput }
  noSpecActionInput.specAction = ''
  expect(checkBasicRules([noSpecActionInput])).toBe(useT('editor.validation.properAction'))
})

test('validation should fail with incorrect pos selection', () => {
  createMockPosSelections('input-b', 2)
  const wrongPosInput = { ...okInput }
  wrongPosInput.pos2 = '6'
  expect(checkBasicRules([wrongPosInput])).toBe(useT('editor.validation.noSelfAsist'))
})

// TODO editor.validation.minPositions
// TODO editor.validation.noNAAdvance
// TODO editor.validation.noSBAdvance
// TODO editor.validation.noE2TSB
