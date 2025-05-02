import { expect, test } from 'vitest'
import { createMockAction } from '../vitestUtils'

test('validation should pass -  not an OBR play', () => {
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'ste',
    specAction: 'SB',
  })
  expect(checkOBRs([r1Input])).toBe('')
})

const r1RLEInput = createMockAction({
  group: 'input-r1',
  baseAction: 'obr',
  specAction: 'OBR_rle',
})

test('validation should pass -  RLE is the only play', () => {
  expect(checkOBRs([r1RLEInput])).toBe('')
})

test('validation should fail -  RLE + other play', () => {
  const r2Input = createMockAction({
    group: 'input-r2',
    baseAction: 'exb',
    specAction: 'WP',
  })
  expect(checkOBRs([r2Input, r1RLEInput])).toBe(useT('editor.validation.noPlayAfterRLE'))
})

const r1HBBInput = createMockAction({
  group: 'input-r1',
  baseAction: 'obr',
  specAction: 'OBR_hbb',
})

test('validation should pass -  HBB + hit', () => {
  const bInput = createMockAction({
    group: 'input-b',
    baseAction: 'Hit',
    specAction: '1B',
  })
  expect(checkOBRs([r1HBBInput, bInput])).toBe('')
})

test('validation should fail -  HBB + FC', () => {
  const bInput = createMockAction({
    group: 'input-b',
    baseAction: 'FC',
    specAction: 'O',
  })
  expect(checkOBRs([r1HBBInput, bInput])).toBe(useT('editor.validation.noHBBWithoutHit'))
})
