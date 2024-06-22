/* *************************************** */
/* wbsc-input.ts                           */
/* Preparing and adjusting user inputs     */
/* *************************************** */

// TODO should be here?

import type { WBSCInput, WBSCOutput } from '@/composables/useInputStore'

function getEmptyInput(plain: boolean): WBSCInput {
  const input: WBSCInput = {
    group: '',
    baseAction: '',
    specAction: '',
    origBase: 0,
    base: 0,
    tie: false,
  }

  if (!plain) {
    input.validation = ''
    input.output = getEmptyOutput()
  }

  return input
}

function getEmptyOutput(): WBSCOutput {
  const output: WBSCOutput = {
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
  }
  return output
}

export {
  getEmptyInput, getEmptyOutput,
}
