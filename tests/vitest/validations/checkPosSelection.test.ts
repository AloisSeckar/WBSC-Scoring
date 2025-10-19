import { expect, test } from 'vitest'

import { checkPosSelection } from '../../../app/utils/wbsc-validation'
import { useT } from '../../../app/composables/useTranslation'

test('validation should pass for an unassisted out', () => {
  expect(checkPosSelection('1')).toBe('')
})

test('validation should pass for an out with assists', () => {
  expect(checkPosSelection('643')).toBe('')
})

test('validation should fail for a self-asist', () => {
  expect(checkPosSelection('55')).toBe(useT('editor.validation.noSelfAsist'))
})

test('validation should pass for asist + out', () => {
  expect(checkPosSelection('252')).toBe('')
})

test('validation should fail for multiple-asist', () => {
  expect(checkPosSelection('2525')).toBe(useT('editor.validation.noMultipleAsist'))
})
