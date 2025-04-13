import { expect, test } from 'vitest'
import { createMockInput } from '../vitestUtils'

test('validation should pass -  no SB/CS play', () => {
  const bInput = createMockInput({
    group: 'input-b',
    baseAction: 'GroundOut',
    specAction: 'GO',
  })
  expect(checkSBCS([bInput])).toBe('')
})

test('validation should pass - both SBs', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'ste',
    specAction: 'SB',
  })
  const r2Input = createMockInput({
    group: 'input-r2',
    baseAction: 'ste',
    specAction: 'SB',
  })
  expect(checkSBCS([r2Input, r1Input])).toBe('')
})

test('validation should fail - SB + CS', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'ste',
    specAction: 'SB',
  })
  const r2Input = createMockInput({
    group: 'input-r2',
    baseAction: 'ste',
    specAction: 'CS',
  })
  expect(checkSBCS([r2Input, r1Input])).toBe(useT('editor.validation.noSBCS'))
})

test('validation should fail - SB + E2T', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'ste',
    specAction: 'SB',
  })
  const r1aInput = createMockInput({
    group: 'input-r1a',
    baseAction: 'err',
    specAction: 'ET',
    pos1: '2',
  })
  expect(checkSBCS([r1aInput, r1Input])).toBe(useT('editor.validation.invalidE2T'))
})

test('validation should pass - SB + e2T', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'ste',
    specAction: 'SB',
  })
  const r1aInput = createMockInput({
    group: 'input-r1a',
    baseAction: 'err',
    specAction: 'eT',
    pos1: '2',
  })
  expect(checkSBCS([r1aInput, r1Input])).toBe('')
})

test('validation should pass - CS + O/', () => {
  const r1Input = createMockInput({
    group: 'input-r1',
    baseAction: 'fc',
    specAction: 'O/',
  })
  const r2Input = createMockInput({
    group: 'input-r2',
    baseAction: 'ste',
    specAction: 'CS',
  })
  expect(checkSBCS([r2Input, r1Input])).toBe('')
})
