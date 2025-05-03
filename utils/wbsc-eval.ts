/* *************************************** */
/* wbsc-eval.ts                            */
/* CORE file with input evaluation methods */
/* *************************************** */

// triggered when user selects from 'specific' action
// returns true, if action cannot be followed by another (= must be last)
function changeSpecificAction(specAction: string, inputGroup: string) {
  if (inputGroup === inputB) {
    return changeBatterSpecificAction(specAction)
  } else {
    return changeRunnerSpecificAction(specAction, inputGroup)
  }
}

// adjust 'involved' inputs according to selected 'specific' action
// returns true, if action cannot be followed by another (= must be last)
function changeBatterSpecificAction(specAction: string) {
  let last = false

  let minPosItems = 1
  let targetPosItems = 1
  let maxPosItems = 4

  switch (specAction) {
    case 'FC':
    case 'SHFC':
    case 'KSFC':
    case 'KLFC':
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
    case 'OBR_BIN':
    case 'OBR_RTA':
    case 'LT':
      last = true
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
    case 'SF':
    case 'FSF':
    case 'IF':
    case 'OBR_DIF':
    case 'EDFB':
      last = true
      // falls through
    case 'HR':
    case 'IHR':
    case '1B':
    case '2B':
    case '3B':
    case '1BB':
    case '2BG':
    case 'KSO':
    case 'KLO':
    case 'SFO':
    case 'EDF':
    case 'EDL':
    case 'EDP':
    case 'OB':
    case 'SHEF':
    case 'SFE':
    case 'O':
    case 'OCB':
    case 'GDPO':
    case 'OBR_OIN':
      minPosItems = targetPosItems = maxPosItems = 1
      break
    case 'GO':
    case 'GOB':
    case 'GDP':
    case 'GDPB':
    case 'SH':
    case 'A':
      last = true
      // falls through
    case 'GDPE':
      minPosItems = 1
      targetPosItems = 2
      break
    case 'OBR_BOT':
      // #284 - pre-select catcher as the most probable player
      useInputStore().inputB.pos1 = '2'
      // falls through
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
    case 'OBR_ROL':
    case 'OBR_RIN':
      last = true
      // falls through
    case 'KSE':
    case 'KLE':
    case 'KSET':
    case 'KLET':
    case 'EF':
    case 'EFB':
    case 'ET':
    case 'SHE':
    case 'SHET':
      // no pos adjustments
      break
    default:
      last = specAction === ''
      minPosItems = targetPosItems = maxPosItems = 0
  }

  useEvalStore().setMinPosItems(inputB, minPosItems)
  useEvalStore().setTargetPosItems(inputB, targetPosItems)
  useEvalStore().setMaxPosItems(inputB, maxPosItems)

  return last
}

// adjust 'involved' inputs according to selected 'specific' action
// returns true, if action cannot be followed by another (= must be last)
function changeRunnerSpecificAction(specAction: string, inputGroup: string) {
  let last = false

  let minPosItems = 1
  let targetPosItems = 1
  let maxPosItems = 4

  switch (specAction) {
    case 'OBR_rta':
    case 'NADV':
      last = true
      // falls through
    case 'ADV':
    case 'WP':
    case 'PB':
    case 'BK':
    case 'IP':
    case 'SB':
    case 'SBPOA':
    case 'oc':
    case 'se0':
    case 'se1':
    case 'se2':
    case 'se3':
      minPosItems = targetPosItems = maxPosItems = 0
      break
    case 'OBR_hbb':
    case 'OBR_ppr':
    case 'OBR_rro':
    case 'OBR_rle':
    case 'OBR_rhe':
      last = true
      // falls through
    case 'eDF':
    case 'POE':
    case 'O/':
    case 'ob':
    case 'o':
      minPosItems = targetPosItems = maxPosItems = 1
      break
    case 'T':
      minPosItems = targetPosItems = maxPosItems = 2
      break
    case 'PO':
      last = true
      minPosItems = targetPosItems = 2
      break
    case 'CSO':
    case 'CSN':
    case 'POCS':
    case 'GO':
    case 'GOT':
      last = true
      // falls through
    case 'CSE':
      minPosItems = 1
      targetPosItems = 2
      break
    case 'POCSEN':
      last = true
      // falls through
    case 'POCSE':
      minPosItems = targetPosItems = 1
      break
    case 'OBR_rol':
    case 'OBR_rin':
    case 'OBR_oin':
    case 'A':
    case 'ENF':
    case 'ENT':
    case 'CSNT':
    case 'POEN':
      last = true
      // falls through
    case 'EF':
    case 'ET':
    case 'eF':
    case 'eT':
    case 'CSET':
      // no pos adjustments
      break
    default:
      last = specAction === ''
      minPosItems = targetPosItems = maxPosItems = 0
  }

  useEvalStore().setMinPosItems(inputGroup, minPosItems)
  useEvalStore().setTargetPosItems(inputGroup, targetPosItems)
  useEvalStore().setMaxPosItems(inputGroup, maxPosItems)

  return last
}

// enhance user's input with output instructions
// incoming data object is modified within this method
// (makes more sense than cloning and returning a new copy)
function processInput(data: WBSCAction, batter: number) {
  // TODO can be set prior to this method?
  data.batter = batter

  data.targetBase = data.base
  data.outputBase = data.base

  // soft reset special values
  data.sub = ''
  data.num = false
  data.out = false
  data.na = false

  let pos = getPos(data)
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
  const action = data.specAction
  switch (action) {
    case 'EDFB':
      data.outputBase = 0
      data.text1 = 'E' + pos
      data.na = true
      break
    case 'KST':
    case 'KLT':
      data.text2 = pos
      // falls through
    case 'KS':
    case 'KL':
    case 'KSR':
    case 'KLR':
    case 'KSB':
    case 'KSI':
    case 'KLI':
      data.outputBase = 0
      data.text1 = action.endsWith('T') ? action.substring(0, 2) : action
      data.sub = '1'
      data.out = true
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
      data.outputBase = 0
      data.text1 = action + pos
      data.out = true
      break
    case 'FB':
    case 'FFB': {
      let pref = 'F'
      if (action.includes('FF')) {
        pref += 'F'
      }
      data.text1 = pref + pos + 'B'
      data.outputBase = 0
      data.out = true
    }
      break
    case 'GDP':
      useEvalStore().gdp = true
      // falls through
    case 'SH':
    case 'FSF':
      data.text2 = pos
      // falls through
    case 'LT':
      data.outputBase = 0
      data.text1 = action
      data.out = true
      break
    case 'OBR_BOB':
    case 'OBR_BIA':
    case 'OBR_TBB':
    case 'OBR_BIN':
    case 'OBR_RTA':
      pos = '2'
      // falls through
    case 'OBR_BOT':
    case 'OBR_ROL':
    case 'OBR_DIF':
    case 'OBR_RIN':
    case 'OBR_OIN':
      data.text1 = action.substring(4)
      data.text2 = pos
      data.outputBase = 0
      data.out = true
      possibleConcurrentPlay = true
      break
    case '1B':
    case '1BB':
      data.text1 = pos
      if (action.endsWith('BB')) {
        data.text1 += 'B'
      }
      break
    case 'O':
      data.text1 = action + pos
      data.targetBase = 1
      break
    case 'OCB':
      data.text1 = 'O' + pos + 'B'
      data.targetBase = 1
      break
    case 'FC':
      data.text1 = action
      data.text2 = pos
      data.targetBase = 1
      break
    case 'KSWP':
    case 'KSPB':
    case 'KSFC':
    case 'KLWP':
    case 'KLPB':
    case 'KLFC':
      data.text1 = action.substring(0, 2)
      data.text2 = action.substring(2)
      if (action.includes('FC')) {
        data.text2 += ' ' + pos
      }
      data.sub = '1'
      possibleConcurrentPlay = true
      break
    case 'KSO':
    case 'KLO':
      data.sub = '1'
      possibleConcurrentPlay = true
      // falls through
    case 'SHFC':
    case 'SFO':
      data.text1 = action.substring(0, 2)
      data.text2 = action.substring(2) + pos
      break
    case 'KSET':
    case 'KSE':
    case 'KLET':
    case 'KLE':
      data.sub = '1'
      possibleConcurrentPlay = true
      // falls through
    case 'SHE':
    case 'SHET':
    case 'SHEF':
    case 'SFE':
      data.text1 = action.substring(0, 2)
      data.text2 = pos?.substring(0, pos.length - 1) + 'E' + pos?.substring(pos.length - 1)
      if (action.length > 3) {
        data.text2 += action.substring(3)
      }
      data.outputBase = data.origBase + 1 as WBSCBase
      break
    case 'INT':
      data.text1 = action
      break
    case '2B':
    case '2BG':
      data.outputBase = data.targetBase = 2
      data.text1 = pos
      if (action.endsWith('G')) {
        data.text2 = 'GR'
      }
      break
    case '3B':
      data.outputBase = data.targetBase = 3
      data.text1 = pos
      break
    case 'HR':
    case 'IHR':
      data.outputBase = data.targetBase = 4
      data.text1 = action
      data.text2 = pos
      break
    case 'BB1':
    case 'IBB1':
      data.sub = '1'
      // falls through
    case 'HP':
      if (action.length > 2) {
        data.text1 = action.substring(0, action.length - 1)
      } else {
        data.text1 = action
      }
      possibleConcurrentPlay = true
      break
    case 'WP':
    case 'PB':
      if (!useEvalStore().exb) {
        useEvalStore().exb = true
        possibleConcurrentPlay = true
        data.text1 = action + '#b#'
      } else {
        data.text1 = action.toLowerCase() + '#b#'
      }
      // #179 - multiple base advance should render same as an error
      data.outputBase = data.origBase + 1 as WBSCBase
      break
    case 'SB':
      possibleConcurrentPlay = true
      data.text1 = action + '#b#'
      break
    case 'BK':
    case 'IP':
      if (!useEvalStore().exb) {
        useEvalStore().exb = true
        data.text1 = action + '#b#'
      } else {
        data.text1 = action.toLowerCase() + '#b#'
      }
      break
    case 'SBPOA':
      possibleConcurrentPlay = true
      data.text1 = 'SB#b#'
      data.text2 = 'POA'
      break
    case 'ADV':
      data.text1 = '#b#'
      break
    case 'se0':
      data.text1 = '(' + '#b#' + ')'
      break
    case 'se1': {
      let battingOrder = 1
      battingOrder += useGUIStore().inputR2 ? 1 : 0
      battingOrder += useGUIStore().inputR3 ? 1 : 0
      data.text1 = '(' + battingOrder + ')'
    }
      break
    case 'se2': {
      let battingOrder = 1
      battingOrder += useGUIStore().inputR3 ? 1 : 0
      data.text1 = '(' + battingOrder + ')'
    }
      break
    case 'se3':
      data.text1 = '(1)'
      break
    case 'GO':
    case 'GOT':
    case 'GOB':
    case 'A':
      if (data.base === 1) {
        data.targetBase = data.outputBase = 0
      }
      data.text1 = pos
      if (action.startsWith('A')) {
        data.text1 = 'A' + pos
      } else if (action.endsWith('B')) {
        data.text1 += 'B'
      }
      data.out = true
      break
    case 'O/':
      data.num = true
      possibleConcurrentPlay = true
      // falls through
    case 'T':
    case 'OB':
    case 'ob':
      data.text1 = action + pos
      break
    case 'o':
      data.text1 = 'O' + pos
      break
    case 'CSO':
    case 'PO':
    case 'POCS':
      data.text1 = action === 'CSO' ? action.substring(0, 2) : action
      data.text2 = pos
      data.out = true
      data.num = true
      possibleConcurrentPlay = true
      break
    case 'CSN':
    case 'CSNT':
      data.na = true
      data.targetBase = data.outputBase = data.origBase
      // falls through
    case 'CSE':
    case 'CSET':
      data.text1 = action.substring(0, 2)
      data.text2 = pos?.substring(0, pos.length - 1) + 'E' + pos?.substring(pos.length - 1)
      if (action.endsWith('T')) {
        data.text2 += 'T'
      }
      data.num = true
      if (action.includes('N')) {
        data.outputBase = data.targetBase = data.origBase
      } else {
        data.outputBase = data.origBase + 1 as WBSCBase
      }
      possibleConcurrentPlay = true
      // do not wrap "short" no-advance plays
      if (data.na && data.text1.length < 3 && data.text2.length < 4) {
        data.text1 += data.text2
        data.text2 = ''
      }
      break
    case 'POEN':
    case 'POCSEN':
      data.na = true
      // falls through
    case 'POE':
    case 'POCSE':
      data.text1 = 'POA'
      if (action.includes('CS')) {
        data.text1 += 'CS'
      }
      if (pos.length > 1) {
        data.text2 = pos?.substring(0, pos.length - 1) + 'E' + pos?.substring(pos.length - 1)
      } else {
        data.text2 = (action === 'POE' ? 'e' : 'E') + pos + 'T'
      }
      data.num = true
      if (action.includes('N')) {
        data.outputBase = data.targetBase = data.origBase
      } else {
        data.outputBase = data.origBase + 1 as WBSCBase
      }
      possibleConcurrentPlay = true
      break
    case 'OBR_rle':
    case 'OBR_rhe':
    case 'OBR_rin':
    case 'OBR_oin':
      data.num = true
      // falls through
    case 'OBR_rta':
    case 'OBR_hbb':
    case 'OBR_rol':
    case 'OBR_ppr':
    case 'OBR_rro':
      data.text1 = action.substring(4).toUpperCase()
      data.text2 = pos || '2'
      data.out = true
      break
    case 'ENT':
    case 'ENF':
      data.na = true
      // falls through
    case 'EF':
    case 'EFB':
    case 'ET':
    case 'EM':
    case 'eF':
    case 'eT':
    case 'eDF':
      data.text1 = pos?.substring(0, pos.length - 1) + action.substring(0, 1) + pos?.substring(pos.length - 1)
      if (!action.endsWith('F')) {
        data.text1 += action.substring(action.length - 1)
      } else if (action === 'eDF') {
        data.text1 += 'F'
      }
      if (data.text1.length > 4) {
        const tempText = data.text1
        data.text1 = tempText.substring(0, tempText.toUpperCase().indexOf('E'))
        data.text2 = tempText.substring(tempText.toUpperCase().indexOf('E'))
      }
      if (action.includes('N')) {
        data.outputBase = data.targetBase = data.origBase
      } else {
        data.outputBase = data.origBase + 1 as WBSCBase
      }
      break
    case 'EDF':
    case 'EDL':
    case 'EDP':
      data.text1 = pos?.substring(0, pos.length - 1) + 'E' + pos?.substring(pos.length - 1) + action.substring(action.length - 1)
      data.outputBase = data.origBase + 1 as WBSCBase
      break
    case 'GDPE':
      useEvalStore().brokenDP = true
      // falls through
    case 'GDPB':
    case 'GDPO':
      data.text1 = 'GDP'
      if (action.includes('E')) {
        data.text2 = pos?.substring(0, pos.length - 1) + 'E' + pos?.substring(pos.length - 1)
        data.outputBase = data.origBase + 1 as WBSCBase
      } else if (action.includes('B')) {
        data.text2 = pos + 'B'
        data.out = true
      } else {
        data.text2 = 'O' + pos
      }
      useEvalStore().gdp = true
      break
    case 'NADV':
      data.text1 = '*'
      data.outputBase = data.targetBase = data.origBase
      break
  }

  if (possibleConcurrentPlay && firstActions.includes(data.group)) {
    useEvalStore().pushConcurrentPlayIfNotAdded({
      batter: data.batter,
      base: data.outputBase,
      out: data.out,
      na: data.na,
      text1: data.text1,
    })
  }
}

export {
  changeBaseAction, changeSpecificAction, changeBase, processInput,
}
