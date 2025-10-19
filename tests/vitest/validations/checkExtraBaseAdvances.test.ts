import { expect, test } from 'vitest'
import { createMockAction } from '../vitestUtils'

import { checkExtraBaseAdvances } from '../../../app/utils/wbsc-validation'
import { useT } from '../../../app/composables/useTranslation'

test('validation should pass -  no WP/PB/BK/IP play', () => {
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'ste',
    specAction: 'SB',
  })
  expect(checkExtraBaseAdvances([r1Input])).toBe('')
})

test('validation should pass -  two WP plays possible', () => {
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'exb',
    specAction: 'WP',
  })
  const r2Input = createMockAction({
    group: 'input-r2',
    baseAction: 'exb',
    specAction: 'WP',
  })
  expect(checkExtraBaseAdvances([r2Input, r1Input])).toBe('')
})

test('validation should fail -  mixed WP and PB', () => {
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'exb',
    specAction: 'WP',
  })
  const r2Input = createMockAction({
    group: 'input-r2',
    baseAction: 'exb',
    specAction: 'PB',
  })
  expect(checkExtraBaseAdvances([r2Input, r1Input])).toBe(useT('editor.validation.noMixedExtraAdvances'))
})

test('validation should pass -  PB is first action', () => {
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'exb',
    specAction: 'PB',
  })
  const r1aInput = createMockAction({
    group: 'input-r1a',
    baseAction: 'err',
    specAction: 'eT',
  })
  expect(checkExtraBaseAdvances([r1aInput, r1Input])).toBe('')
})

test('validation should fail -  PB is second action', () => {
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'err',
    specAction: 'eT',
  })
  const r1aInput = createMockAction({
    group: 'input-r1a',
    baseAction: 'exb',
    specAction: 'PB',
  })
  expect(checkExtraBaseAdvances([r1aInput, r1Input])).toBe(useT('editor.validation.noPBAfterPlay'))
})

test('validation should pass -  PB is second action, but after SB', () => {
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'ste',
    specAction: 'SB',
  })
  const r1aInput = createMockAction({
    group: 'input-r1a',
    baseAction: 'exb',
    specAction: 'PB',
  })
  expect(checkExtraBaseAdvances([r1aInput, r1Input])).toBe('')
})

test('validation should fail -  WP is second action', () => {
  const bInput = createMockAction({
    group: 'input-b',
    baseAction: 'Hit',
    specAction: '1B',
  })
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'adv',
    specAction: 'ADV',
  })
  const r1aInput = createMockAction({
    group: 'input-r1a',
    baseAction: 'exb',
    specAction: 'WP',
  })
  expect(checkExtraBaseAdvances([r1aInput, r1Input, bInput])).toBe(useT('editor.validation.noWPAfterPlay'))
})
test('validation should pass -  WP is second action, but after BB', () => {
  const bInput = createMockAction({
    group: 'input-b',
    baseAction: 'Advance',
    specAction: 'BB1',
  })
  const r1Input = createMockAction({
    group: 'input-r1',
    baseAction: 'adv',
    specAction: 'ADV',
  })
  const r1aInput = createMockAction({
    group: 'input-r1a',
    baseAction: 'exb',
    specAction: 'WP',
  })
  expect(checkExtraBaseAdvances([r1aInput, r1Input, bInput])).toBe('')
})
