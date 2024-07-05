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
    origBase: 0,
    base: 0,
    tie: false,
    pos1: '',
    pos2: '',
    pos3: '',
    pos4: '',
    runtype: 'ER',
  }

  return input
}

export function getEmptyOutput(): WBSCOutput {
  const output: WBSCOutput = {
    group: '',
    specAction: '',
    previousAdvance: false,
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
  }
  return output
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

  // reset batter input
  setTimeout(() => {
    const baseSelect = document.getElementById(`${inputB}-base-action`) as HTMLInputElement
    baseSelect.dispatchEvent(new Event('change'))
  })
}
