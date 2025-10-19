import { expect, test } from 'vitest'
import { createMockAction } from '../vitestUtils'

import { checkOBRs } from '../../../app/utils/wbsc-validation'
import { useT } from '../../../app/composables/useTranslation'

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

const bHitInput = createMockAction({
  group: 'input-b',
  baseAction: 'Hit',
  specAction: '1B',
})

test('validation should pass -  HBB + hit', () => {
  expect(checkOBRs([r1HBBInput, bHitInput])).toBe('')
})

test('validation should fail -  HBB + FC', () => {
  const bInput = createMockAction({
    group: 'input-b',
    baseAction: 'FC',
    specAction: 'O',
  })
  expect(checkOBRs([r1HBBInput, bInput])).toBe(useT('editor.validation.noHBBWithoutHit'))
})

const bRINInput = createMockAction({
  group: 'input-b',
  baseAction: 'OBR',
  specAction: 'OBR_RIN',
})

test('validation should pass -  RIN + runner out', () => {
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'Out',
    specAction: 'FO',
    out: true,
  })
  expect(checkOBRs([r1Input, bRINInput])).toBe('')
})

const r1AdvInput = createMockAction({
  group: 'input-r1',
  baseAction: 'ADV',
  specAction: 'adv',
})

test('validation should fail -  RIN + no out', () => {
  expect(checkOBRs([bRINInput])).toBe(useT('editor.validation.noRINWithoutOut'))
  expect(checkOBRs([r1AdvInput, bRINInput])).toBe(useT('editor.validation.noRINWithoutOut'))
})

test('validation should pass -  Hit + runner advanced', () => {
  expect(checkOBRs([r1AdvInput, bHitInput])).toBe('')
})

test('validation should fail -  Hit + RIN', () => {
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'obr',
    specAction: 'OBR_rin',
  })
  expect(checkOBRs([r1Input, bHitInput])).toBe(useT('editor.validation.noHitWithRIN'))
})
