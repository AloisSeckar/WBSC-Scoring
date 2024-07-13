import { expect, test } from 'vitest'
import { createMockPosSelections } from '../vitestUtils'

const okInput: WBSCInput = {
  group: 'input-b',
  baseAction: 'GroundOut',
  specAction: 'GO',
  origBase: 0,
  base: 1,
  tie: false,
  nodp: false,
  pos1: '6',
  pos2: '3',
  pos3: '',
  pos4: '',
  runtype: 'e',
}

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

test('validation should pass for incomplete inputs', () => {
  createMockPosSelections('input-b', 2)
  const noBaseActionInput = { ...okInput }
  noBaseActionInput.baseAction = ''
  expect(checkBasicRules([noBaseActionInput])).toBe(useT('editor.validation.properAction'))
  const noSpecActionInput = { ...okInput }
  noSpecActionInput.specAction = ''
  expect(checkBasicRules([noBaseActionInput])).toBe(useT('editor.validation.properAction'))
})

// TODO editor.validation.minPositions
// TODO editor.validation.noNAAdvance
// TODO editor.validation.noSBAdvance
// TODO editor.validation.noE2TSB
