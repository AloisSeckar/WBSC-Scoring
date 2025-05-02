/* *************************************** */
/* wbsc-input.ts                           */
/* Preparing and adjusting user inputs     */
/* *************************************** */

// TODO rename to "init..."?

import type { WBSCInput, WBSCOutput } from '@/composables/useInputStore'

export function getEmptyInput(group: string): WBSCInput {
  const input: WBSCInput = {
    group,
    baseAction: '',
    specAction: '',
    origBase: getOrigBase(group),
    base: 0,
    tie: false,
    nodp: false,
    pos1: '',
    pos2: '',
    pos3: '',
    pos4: '',
    runtype: 'e',
  }

  return input
}

export function getEmptyOutput(): WBSCOutput {
  const output: WBSCOutput = {
    group: '',
    specAction: '',
    batter: 0,
    origBase: 0,
    base: 0,
    text1: '',
    out: false,
    hit: false,
    num: false,
    errorTarget: 0,
    na: false,
    tie: false,
    nodp: false,
  }
  return output
}

// returns original base based on input group
export function getOrigBase(inputGroup: string): WBSCBase {
  switch (inputGroup) {
    case inputR3:
    case inputR2a:
    case inputR1b:
    case inputB3:
      return 3
    case inputR2:
    case inputR1a:
    case inputB2:
      return 2
    case inputR1:
    case inputB1:
      return 1
    default:
      return 0
  }
}

// clear all user inputs and reset default state
export function clearInputs() {
  useGUIStore().$reset()
  useEvalStore().$reset()
  useInputStore().clear()
  useCanvasStore().init()

  // json
  const jsonInput = document.getElementById(inputImportFile) as HTMLInputElement
  if (jsonInput) {
    jsonInput.files = null
    jsonInput.value = ''
  }
}
