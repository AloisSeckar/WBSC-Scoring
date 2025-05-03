/* *************************************** */
/* wbsc-input.ts                           */
/* Preparing and adjusting user inputs     */
/* *************************************** */

// TODO rename to "init..."?

export function getEmptyAction(group: string): WBSCAction {
  const input: WBSCAction = {
    group,
    // change here needs to be copied into useInputStore.clearInput
    // TODO should be unified?
    batter: 1,
    baseAction: '',
    specAction: '',
    base: 0,
    origBase: getOrigBase(group),
    targetBase: 0,
    outputBase: 0,
    tie: false,
    nodp: false,
    pos1: '',
    pos2: '',
    pos3: '',
    pos4: '',
    runtype: 'e',
    text1: '',
    text2: '',
    sub: '',
    num: false,
    out: false,
    na: false,
  }

  return input
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
