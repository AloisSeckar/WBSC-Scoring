/* *************************************** */
/* wbsc-eval.js                            */
/* CORE file with input evaluation methods */
/* *************************************** */

import { WBSCInput, WBSCOutput } from '@/composables/useInputStore'

// triggered when user selects from 'base' action
function changeBaseAction (group: string) {
  if (group === inputB) {
    changeBatterBaseAction()
  } else {
    changeRunnerBaseAction(group)
  }
}

// triggered when user selects from 'specific' action
function changeSpecificAction (group: string) {
  if (group === inputB) {
    changeBatterSpecificAction()
  } else {
    changeRunnerSpecificAction(group)
  }
}

// ajdust 'specific' action according to selected 'base' action
function changeBatterBaseAction () {
  const baseAction = document.getElementById(inputB + inputBaseAction) as HTMLInputElement
  const actionOptions = renderBatterSpecificActionOptions(baseAction.value)
  const specificActionDisabled = actionOptions.length < 1

  const specificAction = document.getElementById(inputB + inputSpecAction) as HTMLInputElement
  specificAction.innerHTML = actionOptions.join(' ')
  specificAction.disabled = specificActionDisabled

  changeBatterSpecificAction()
}

// adjust 'involved' inputs according to selected 'specific' action
function changeBatterSpecificAction () {
  let fc = false
  let hit = false
  let out = false
  let minPosItems = 1
  let targetPosItems = 1
  let maxPosItems = 4
  let runTypeSelectDisabled = true

  const specificAction = document.getElementById(inputB + inputSpecAction) as HTMLInputElement
  const specificActionValue = specificAction.value
  switch (specificActionValue) {
    case 'FC':
    case 'SHFC':
    case 'KSFC':
    case 'KLFC':
      fc = true
      minPosItems = targetPosItems = maxPosItems = 2
      break
    case 'KS':
    case 'KL':
    case 'KSR':
    case 'KSB':
    case 'KSI':
    case 'KLR':
    case 'KLI':
    case 'OBR_BOB':
    case 'OBR_BIA':
    case 'OBR_TBB':
    case 'OBR_BIC':
    case 'OBR_RTA':
    case 'LT': // note - here it only means "no further action possible", not an actual out
      out = true
      // falls through
    case 'BB1':
    case 'IBB1':
    case 'HP':
    case 'KSWP':
    case 'KSPB':
    case 'KLWP':
    case 'KLPB':
    case 'INT':
      minPosItems = targetPosItems = maxPosItems = 0
      break
    case 'HR':
    case 'IHR':
      runTypeSelectDisabled = false
      // falls through
    case '1B':
    case '2B':
    case '3B':
    case '1BB':
    case '2BG':
      hit = true
      minPosItems = targetPosItems = maxPosItems = 1
      break
    case 'SF':
    case 'FSF':
    case 'IF':
    case 'OBR_DIF':
      out = true
      // falls through
    case 'O':
    case 'KSO':
    case 'KLO':
    case 'SFO':
    case 'EDF':
    case 'EDL':
    case 'EDP':
    case 'EDFB':
    case 'OB':
    case 'SHEF':
    case 'SFE':
      minPosItems = targetPosItems = maxPosItems = 1
      break
    case 'GO':
    case 'GOB':
    case 'GDP':
    case 'SH':
    case 'A':
      out = true
      // falls through
    case 'GDPE':
      minPosItems = 1
      targetPosItems = 2
      break
    case 'KST':
    case 'KLT':
    case 'F':
    case 'P':
    case 'L':
    case 'FF':
    case 'FP':
    case 'FL':
    case 'FB':
    case 'FFB':
    case 'OBR_BOT':
    case 'OBR_BIN':
    case 'OBR_OIN':
      out = true
      // falls through
    case 'KSE':
    case 'KLE':
    case 'KSET':
    case 'KLET':
    case 'EF':
    case 'ET':
    case 'SHE':
    case 'SHET':
      // no other adjustments
      break
    default:
      minPosItems = targetPosItems = maxPosItems = 0
  }

  useEvalStore().setMinPosItems(inputB, minPosItems)
  useEvalStore().setTargetPosItems(inputB, targetPosItems)
  useEvalStore().setMaxPosItems(inputB, maxPosItems)

  const groupID = inputB + inputPosition

  const container = document.getElementById(groupID) as HTMLElement
  const addItemButton = document.getElementById(groupID + inputAdd) as HTMLInputElement
  const removeItemButton = document.getElementById(groupID + inputRemove) as HTMLInputElement

  let itemsCreated = container.getElementsByClassName(classWbscPos).length
  while (itemsCreated > 0) {
    const posItemN = document.getElementById(groupID + itemsCreated) as HTMLElement
    container.removeChild(posItemN)
    itemsCreated -= 1
  }

  while (itemsCreated < targetPosItems) {
    itemsCreated += 1
    const posItemN = getPosSelectionSelect(inputB, itemsCreated)
    container.insertBefore(posItemN, addItemButton)
  }

  addItemButton.disabled = itemsCreated >= maxPosItems
  removeItemButton.disabled = itemsCreated <= minPosItems

  if (hit === true) {
    const posItem1 = document.getElementById(groupID + '1') as HTMLInputElement
    posItem1.innerHTML = renderHitLocationOptions().join(' ')

    const posSelection = useEvalStore().getPosSelection(groupID)
    if (isNaN(Number(posSelection[0]))) {
      posItem1.value = posSelection
    } else {
      posItem1.value = posSelection[0]
    }
  }

  if (fc === true) {
    const posItem2 = document.getElementById(groupID + '2') as HTMLInputElement
    posItem2.innerHTML = renderFCLocationOptions().join(' ')
    posItem2.value = useEvalStore().getPosSelection(groupID)[1]
  }

  const runTypeSelect = document.getElementById(inputB + inputRuntype) as HTMLInputElement
  runTypeSelect.disabled = runTypeSelectDisabled

  disableExtraInput(inputB, out === true)
}

// ajdust 'specific' action according to selected 'base' action
function changeRunnerBaseAction (group: string) {
  const runnerBaseAction = document.getElementById(group + inputBaseAction) as HTMLInputElement
  const actionOptions = renderRunnerSpecificActionOptions(runnerBaseAction.value, group)
  const specificActionDisabled = actionOptions.length < 1

  const specificAction = document.getElementById(group + inputSpecAction) as HTMLInputElement
  specificAction.innerHTML = actionOptions.join(' ')
  specificAction.disabled = specificActionDisabled

  changeRunnerSpecificAction(group)
}

// adjust 'involved' inputs according to selected 'specific' action
function changeRunnerSpecificAction (group: string) {
  let out = false
  let throwing = false
  let minPosItems = 1
  let targetPosItems = 1
  let maxPosItems = 4

  const runnerSpecificAction = document.getElementById(group + inputSpecAction) as HTMLInputElement
  const runnerSpecificActionValue = runnerSpecificAction.value
  switch (runnerSpecificActionValue) {
    case 'ADV':
    case 'WP':
    case 'PB':
    case 'BK':
    case 'IP':
    case 'SB':
    case 'oc':
    case 'se0':
    case 'se1':
    case 'se2':
    case 'se3':
    case 'OBR_rta':
    case 'NADV':
      minPosItems = targetPosItems = maxPosItems = 0
      break
    case 'OBR_hbb':
    case 'OBR_ppr':
    case 'OBR_rle':
    case 'OBR_rhe':
      out = true
      // falls through
    case 'POE':
    case 'O/':
    case 'ob':
      minPosItems = targetPosItems = maxPosItems = 1
      break
    case 'T':
      minPosItems = targetPosItems = maxPosItems = 2
      throwing = true
      break
    case 'PO':
      out = true
      minPosItems = targetPosItems = 2
      break
    case 'CSO':
    case 'GO':
    case 'GOT':
      out = true
      // falls through
    case 'CSE':
    case 'CSN':
      minPosItems = 1
      targetPosItems = 2
      break
    case 'OBR_rol':
    case 'OBR_rin':
    case 'A':
      out = true
      // falls through
    case 'EF':
    case 'ET':
    case 'ENF':
    case 'ENT':
    case 'CSET':
    case 'CSNT':
    case 'POEN':
    case 'eF':
    case 'eT':
      // no other adjustments
      break
    default:
      maxPosItems = 1
  }

  useEvalStore().setMinPosItems(group, minPosItems)
  useEvalStore().setTargetPosItems(group, targetPosItems)
  useEvalStore().setMaxPosItems(group, maxPosItems)

  const groupID = group + inputPosition

  const container = document.getElementById(groupID) as HTMLElement
  const addItemButton = document.getElementById(groupID + inputAdd) as HTMLInputElement
  const removeItemButton = document.getElementById(groupID + inputRemove) as HTMLInputElement

  let itemsCreated = container.getElementsByClassName(classWbscPos).length
  while (itemsCreated > 0) {
    const posItemN = document.getElementById(groupID + itemsCreated) as HTMLElement
    container.removeChild(posItemN)
    itemsCreated -= 1
  }

  while (itemsCreated < targetPosItems) {
    itemsCreated += 1
    const posItemN = getPosSelectionSelect(group, itemsCreated)
    container.insertBefore(posItemN, addItemButton)
  }

  addItemButton.disabled = itemsCreated >= maxPosItems
  removeItemButton.disabled = itemsCreated <= minPosItems

  if (throwing === true) {
    const posItem2 = document.getElementById(groupID + '2') as HTMLInputElement
    posItem2.innerHTML = renderFCLocationOptions().join(' ')
    posItem2.value = useEvalStore().getPosSelection(groupID)[1]
  }

  disableExtraInput(group, out === true)
}

// allows to select run type when home base is selected
function changeBase (group: string) {
  const baseSelect = document.getElementById(group + inputBase) as HTMLInputElement
  const baseSelectValue = baseSelect.value

  const runTypeSelect = document.getElementById(group + inputRuntype) as HTMLInputElement
  runTypeSelect.disabled = baseSelectValue !== '4'
}

// enhance user's input with output instructions
function processInput (input: WBSCInput, batter: number): WBSCOutput {
  const output: WBSCOutput = getEmptyOutput()
  output.batter = batter
  output.origBase = input.origBase
  output.base = input.base
  output.run = input.runtype
  output.errorTarget = input.base

  let pos = input.pos
  if (pos) {
    const lastPos = pos[pos.length - 1]
    if (lastPos === 'X') {
      pos = pos.substring(0, pos.length - 1) + '4'
    } else if (lastPos === 'Y') {
      pos = pos.substring(0, pos.length - 1) + '5'
    } else if (lastPos === 'Z') {
      pos = pos.substring(0, pos.length - 1) + '2'
    }
  } else {
    pos = ''
  }

  let possibleConcurrentPlay = false
  const action = input.specAction
  switch (action) {
    case 'EDFB':
      output.base = 0
      output.text1 = 'E' + pos + ' DF'
      output.na = true
      break
    case 'KST':
    case 'KLT':
      output.text2 = pos
      // falls through
    case 'KS':
    case 'KL':
    case 'KSR':
    case 'KLR':
    case 'KSB':
    case 'KSI':
    case 'KLI':
      output.base = 0
      output.text1 = action.endsWith('T') ? action.substring(0, 2) : action
      output.sub = '1'
      output.out = true
      possibleConcurrentPlay = true
      break
    case 'F':
    case 'P':
    case 'L':
    case 'FF':
    case 'FP':
    case 'FL':
    case 'IF':
    case 'SF':
      output.base = 0
      output.text1 = action + pos
      output.out = true
      break
    case 'FB':
    case 'FFB': {
      let pref = 'F'
      if (action.includes('FF')) {
        pref += 'F'
      }
      output.text1 = pref + pos + 'B'
      output.base = 0
      output.out = true
    }
      break
    case 'GDP':
    case 'SH':
    case 'FSF':
      output.text2 = pos
      // falls through
    case 'LT':
      output.base = 0
      output.text1 = action
      output.out = true
      break
    case 'OBR_BOT':
    case 'OBR_DIF':
    case 'OBR_BIN':
    case 'OBR_OIN':
      output.text2 = pos
      // falls through
    case 'OBR_BOB':
    case 'OBR_BIA':
    case 'OBR_TBB':
    case 'OBR_BIC':
    case 'OBR_RTA':
      output.text1 = action.substring(4)
      output.base = 0
      output.out = true
      possibleConcurrentPlay = true
      break
    case '1B':
    case '1BB':
      output.text1 = pos
      if (action.endsWith('BB')) {
        output.text1 += 'B'
      }
      output.hit = true
      break
    case 'O':
      output.text1 = action + pos
      break
    case 'FC':
      output.text1 = action
      output.text2 = pos
      break
    case 'KSWP':
    case 'KSPB':
    case 'KSFC':
    case 'KLWP':
    case 'KLPB':
    case 'KLFC':
      output.text1 = action.substring(0, 2)
      output.text2 = action.substring(2)
      if (action.includes('FC')) {
        output.text2 += ' ' + pos
      }
      output.sub = '1'
      possibleConcurrentPlay = true
      break
    case 'KSO':
    case 'KLO':
      output.sub = '1'
      possibleConcurrentPlay = true
      // falls through
    case 'SHFC':
    case 'SFO':
      output.text1 = action.substring(0, 2)
      output.text2 = action.substring(2) + pos
      break
    case 'KSET':
    case 'KSE':
    case 'KLET':
    case 'KLE':
      output.sub = '1'
      possibleConcurrentPlay = true
      // falls through
    case 'SHE':
    case 'SHET':
    case 'SHEF':
    case 'SFE':
      output.text1 = action.substring(0, 2)
      output.text2 = pos?.substring(0, pos.length - 1) + 'E' + pos?.substring(pos.length - 1)
      if (action.length > 3) {
        output.text2 += action.substring(3)
      }
      output.errorTarget = output.base
      output.base = output.origBase + 1
      break
    case 'INT':
      output.text1 = action
      break
    case '2B':
    case '2BG':
      output.base = 2
      output.text1 = pos
      if (action.endsWith('G')) {
        output.text2 = 'GR'
      }
      output.hit = true
      break
    case '3B':
      output.base = 3
      output.text1 = pos
      output.hit = true
      break
    case 'HR':
    case 'IHR':
      output.base = 4
      output.text1 = action
      output.text2 = pos
      output.hit = true
      break
    case 'BB1':
    case 'IBB1':
      output.sub = '1'
      // falls through
    case 'HP':
      if (action.length > 2) {
        output.text1 = action.substring(0, action.length - 1)
      } else {
        output.text1 = action
      }
      possibleConcurrentPlay = true
      break
    case 'WP':
    case 'PB':
    case 'SB':
      possibleConcurrentPlay = true
      // falls through
    case 'wp':
    case 'pb':
    case 'BK':
    case 'bk':
    case 'IP':
    case 'ip':
      output.text1 = action + '#b#'
      break
    case 'ADV':
      output.text1 = '#b#'
      break
    case 'se0':
      output.text1 = '(' + '#b#' + ')'
      break
    case 'se1': {
      let battingOrder = 1
      battingOrder += document.getElementById(inputR2) ? 1 : 0
      battingOrder += document.getElementById(inputR3) ? 1 : 0
      output.text1 = '(' + battingOrder + ')'
    }
      break
    case 'se2': {
      let battingOrder = 1
      battingOrder += document.getElementById(inputR3) ? 1 : 0
      output.text1 = '(' + battingOrder + ')'
    }
    // falls through
    case 'se3':
      output.text1 = '(1)'
      break
    case 'GO':
    case 'GOT':
    case 'GOB':
    case 'A':
      if (output.base === 1) {
        output.base = 0
      }
      output.text1 = pos
      if (action.startsWith('A')) {
        output.text1 = 'A' + pos
      } else if (action.endsWith('B')) {
        output.text1 += 'B'
      }
      output.out = true
      break
    case 'O/':
      output.num = true
      possibleConcurrentPlay = true
      // falls through
    case 'T':
    case 'OB':
    case 'ob':
      output.text1 = action + pos
      break
    case 'CSO':
    case 'PO':
      output.text1 = action.substring(0, 2)
      output.text2 = pos
      output.out = true
      output.num = true
      possibleConcurrentPlay = true
      break
    case 'CSN':
    case 'CSNT':
      output.na = true
      output.base = input.origBase
      // falls through
    case 'CSE':
    case 'CSET':
      output.text1 = action.substring(0, 2)
      output.text2 = pos?.substring(0, pos.length - 1) + 'E' + pos?.substring(pos.length - 1)
      if (action.endsWith('T')) {
        output.text2 += 'T'
      }
      output.num = true
      output.errorTarget = output.base
      if (!action.includes('N')) {
        output.base = input.origBase + 1
      }
      possibleConcurrentPlay = true
      break
    case 'POEN':
      output.na = true
      // falls through
    case 'POE':
      output.text1 = 'POA'
      if (pos.length > 1) {
        output.text2 = pos?.substring(0, pos.length - 1) + 'E' + pos?.substring(pos.length - 1)
      } else {
        output.text2 = (action === 'POE' ? 'e' : 'E') + pos + 'T'
      }
      output.num = true
      output.base = action === 'POE' ? output.origBase + 1 : input.origBase
      output.errorTarget = output.base
      possibleConcurrentPlay = true
      break
    case 'OBR_rle':
      output.num = true
      // falls through
    case 'OBR_rta':
    case 'OBR_hbb':
    case 'OBR_rol':
    case 'OBR_ppr':
    case 'OBR_rro':
    case 'OBR_rin':
    case 'OBR_rhe':
      output.text1 = action.substring(4).toUpperCase()
      output.text2 = pos || '2'
      output.out = true
      break
    case 'ENT':
    case 'ENF':
      output.na = true
      // falls through
    case 'EF':
    case 'ET':
    case 'EM':
    case 'eF':
    case 'eT':
      output.text1 = pos?.substring(0, pos.length - 1) + action.substring(0, 1) + pos?.substring(pos.length - 1)
      if (!action.endsWith('F')) {
        output.text1 += action.substring(action.length - 1)
      }
      if (action.includes('N')) {
        output.base = output.errorTarget = input.origBase
      } else {
        output.base = output.origBase + 1
        output.errorTarget = input.base
      }
      break
    case 'EDF':
    case 'EDL':
    case 'EDP':
      output.text1 = pos?.substring(0, pos.length - 1) + 'E' + pos?.substring(pos.length - 1) + action.substring(action.length - 1)
      output.errorTarget = output.base
      output.base = output.origBase + 1
      break
    case 'GDPE':
      output.text1 = 'GDP'
      output.text2 = pos?.substring(0, pos.length - 1) + 'E' + pos?.substring(pos.length - 1)
      output.errorTarget = output.base
      output.base = output.origBase + 1
      break
    case 'NADV':
      output.text1 = '*'
      if (output.base) {
        output.base -= 1
        output.errorTarget -= 1
      }
      break
  }

  if (possibleConcurrentPlay) {
    let notAddedYet = true
    const concurrentPlays = useEvalStore().concurrentPlays
    for (let i = 0; i < concurrentPlays.length; i += 1) {
      if (concurrentPlays[i].batter === batter) {
        notAddedYet = false
        break
      }
    }
    if (notAddedYet) {
      concurrentPlays.push({ ...output })
    }
  }

  return output
}

export {
  changeBaseAction, changeSpecificAction, changeBase, processInput
}
