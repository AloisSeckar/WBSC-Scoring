import { expect, test } from 'vitest'

test('validation should pass - no se0/oc play', () => {
  expect(checkBInput('T', '1B')).toBe('')
})

test('validation should pass - se0 + error play', () => {
  expect(checkBInput('se0', 'ET')).toBe('')
})

test('validation should fail - se0 + not-error play', () => {
  expect(checkBInput('se0', '1B')).toBe(useT('editor.validation.noSE').replace('#p#', 'B'))
})

test('validation should pass - oc + O play', () => {
  expect(checkBInput('oc', 'O')).toBe('')
})

test('validation should fail - oc + not-O play', () => {
  expect(checkBInput('oc', '1B')).toBe(useT('editor.validation.missingOAdv'))
})
