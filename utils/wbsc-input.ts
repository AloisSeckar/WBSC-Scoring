/* *************************************** */
/* wbsc-input.ts                           */
/* Preparing and adjusting user inputs     */
/* *************************************** */

// TODO should be here?
// TODO rename to "init..."?

import type { WBSCInput, WBSCOutput } from '@/composables/useInputStore'

function getEmptyInput(group: string): WBSCInput {
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

function getEmptyOutput(): WBSCOutput {
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

export {
  getEmptyInput, getEmptyOutput,
}
