import { expect, test } from 'vitest'
import { createMockAction } from '../vitestUtils'

const bOutput = createMockAction({
  group: 'input-b',
  specAction: 'O',
  targetBase: 1,
})
const r1Out = createMockAction({
  group: 'input-r1',
  specAction: 'GO',
  targetBase: 2,
})
const r2Out = createMockAction({
  group: 'input-r2',
  specAction: 'GO',
  targetBase: 3,
})
const r3Out = createMockAction({
  group: 'input-r3',
  specAction: 'GO',
  targetBase: 4,
})

test('validation should pass - runner forced at 2nd', () => {
  expect(checkFO([r1Out, bOutput])).toBe('')
})

test('validation should pass - runner forced at 3rd', () => {
  const r1Safe = structuredClone(r1Out)
  r1Safe.specAction = 'adv'
  expect(checkFO([r2Out, r1Safe, bOutput])).toBe('')
})

test('validation should pass - runner forced at HP', () => {
  const r1Safe = structuredClone(r1Out)
  r1Safe.specAction = 'adv'
  const r2Safe = structuredClone(r2Out)
  r2Safe.specAction = 'adv'
  expect(checkFO([r3Out, r2Safe, r1Safe, bOutput])).toBe('')
})

test('validation should fail - runner not forced at 2nd', () => {
  expect(checkFO([r1Out])).toBe(useT('editor.validation.notFO2'))
})

test('validation should fail - runner not forced at 3rd', () => {
  expect(checkFO([r2Out, bOutput])).toBe(useT('editor.validation.notFO3'))
})

test('validation should fail - runner not forced at 3rd', () => {
  expect(checkFO([r3Out, r1Out, bOutput])).toBe(useT('editor.validation.notFOH'))
})

test('validation should fail - out at 3rd is not forced', () => {
  const r1Wrong = structuredClone(r1Out)
  r1Wrong.targetBase = 3
  expect(checkFO([r1Wrong, bOutput])).toBe(useT('editor.validation.noDistantFO'))
})

test('validation should pass - runner is forced to return after fly-out', () => {
  const bFlyOut = structuredClone(bOutput)
  bFlyOut.specAction = 'F'
  expect(checkFO([r2Out, bFlyOut])).toBe('')
})
