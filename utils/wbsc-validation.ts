/* **************************************** */
/* wbsc-validation.js                       */
/* Validate user's input to eliminate plays */
/* that are clearly impossible.             */
/* **************************************** */

import { WBSCInput } from '@/composables/useInputStore'

const firstRunnerActions = [inputR1, inputR2, inputR3]
const hitActions = ['1B', '2B', '3B', 'HR', '1BB', '2BG', 'IHR']
const decisiveErrorActions = [
  'EF', 'ET', 'EDF', 'EDL', 'EDP', 'INT', 'OB', 'ENF', 'ENT', 'KSET', 'KSE', 'KLET', 'KLE',
  'GDPE', 'SHE', 'SHET', 'SHEF', 'SFE', 'CSE', 'CSET', 'CSN', 'CSNT', 'POE'
]
const errorActions = [...decisiveErrorActions, 'eF', 'eT']
const noAdvActions = ['ENF', 'ENT', 'CSN', 'CSNT']

// validation sequence to be run over given outputs
// (this should be the single point of entry to validatons)
// (called from wbsc-processor.processAction())
function checkUserInput (inputs: WBSCInput[]) {
  let validation = ''

  // 1) validations to be run over each input separately
  inputs.forEach((input) => {
    if (input && input.baseAction && input.specAction) {
      const minPosItems = useEvalStore().getMinPosItems(input.group)
      const posSelection = input.pos
      if (minPosItems > 0 && (!posSelection || posSelection.length < minPosItems)) {
        validation = attachValidation(validation, `At least ${minPosItems} involved positions must be selected for current action`)
      } else if (posSelection) {
        const container = document.getElementById(input.group) as HTMLElement
        const allPosSelects = container.getElementsByClassName(classWbscPos)
        const filteredPosSelects = [...allPosSelects].filter(i => i.id.startsWith(input.group + '-'))
        if (filteredPosSelects.length > posSelection.length) {
          validation = attachValidation(validation, 'All positions must be selected')
        } else {
          validation = attachValidation(validation, checkPosSelection(posSelection))
        }
      }
      if ((input.specAction.includes('EN') || input.specAction.includes('CSN')) && input.base - input.origBase > 1) {
        validation = attachValidation(validation, '\'No advance\' action may not result into further advance')
      }
      if (input.specAction === 'SB' && input.base - input.origBase > 1) {
        validation = attachValidation(validation, '\'Stolen base\' may not result into further advance')
      }
      if (['CSE', 'CSET', 'CSN', 'CSNT'].includes(input.specAction) && input.pos === '2') {
        validation = attachValidation(validation, 'Catcher may not be credited with an error when trying to catch runner stealing, unless there is further advance due to it')
      }
    } else {
      validation = attachValidation(validation, 'Action must be properly defined')
    }
  })

  // 2) validations over all outputs
  validation = attachValidation(validation, checkMaxOuts(inputs))
  validation = attachValidation(validation, checkOutcome(inputs))
  validation = attachValidation(validation, checkHit(inputs))
  validation = attachValidation(validation, checkFO(inputs))
  validation = attachValidation(validation, checkFC(inputs))
  validation = attachValidation(validation, checkGDP(inputs))
  validation = attachValidation(validation, checkSHSF(inputs))
  validation = attachValidation(validation, checkExtraBaseAdvances(inputs))
  validation = attachValidation(validation, checkSameError(inputs))
  validation = attachValidation(validation, checkEarnedRuns(inputs))

  return validation
}

// validates given 'involved' sequence
function checkPosSelection (selection: string) {
  let validation = ''

  if (selection.length > 1) {
    if (!selection.endsWith('LL') && selection[selection.length - 2] === selection[selection.length - 1]) {
      validation = 'A player cannot assist directly to self'
    }
  }
  if (selection.length > 2) {
    const alreadyEncounteredPositions = [false, false, false, false, false, false, false, false, false, false]
    for (let i = 0; i < selection.length - 1; i += 1) {
      const current = parseInt(selection[i])
      if (alreadyEncounteredPositions[current] === true) {
        if (validation !== '') {
          validation += '\n'
        }
        validation += 'A player cannot have more than 1 assist in a play'
        break
      }
      alreadyEncounteredPositions[current] = true
    }
  }

  return validation
}

// there cannot be more than 3 outs
function checkMaxOuts (inputs: WBSCInput[]) {
  let outs = 0

  inputs.forEach((input) => {
    const output = input.output
    if (output && output.out === true) {
      outs++
    }
  })

  if (outs > 3) {
    return 'There cannot be more than 3 outs in one play'
  } else {
    return ''
  }
}

// runner cannot overtake his precessor
// runners cannot end on the same base
// extra actions for same runner must happen in order
// when the runner is out, he cannot advance further
function checkOutcome (inputs: WBSCInput[]) {
  let validation = ''

  let currentBatter = -1
  let playerWasOut = false
  const reachedBases: number[] = []

  inputs.forEach((input) => {
    const output = input.output
    if (output) {
      if (currentBatter === output.batter) {
        if (output.out) {
          // this is probably a dead code after #60
          if (playerWasOut) {
            validation = attachValidation(validation, 'One player cannot be out more than once')
          } else {
            playerWasOut = true
            validation = attachValidation(validation, 'Player cannot advance further after being out')
          }
        }
        const maxReachedBase = reachedBases[reachedBases.length - 1]
        const currentReachedBase = Math.max(output.base, output.errorTarget)
        if (currentReachedBase > maxReachedBase || (currentReachedBase === maxReachedBase && noAdvActions.includes(input.specAction))) {
          validation = attachValidation(validation, 'Extra advances of one player must happen in order')
        }
      } else {
        // special case for "batter + same error"
        // this is probably a dead code after #60
        if (input.group === inputB) {
          if (output.base === 0 && output.errorTarget > 1) {
            playerWasOut = true
            validation = attachValidation(validation, 'Player cannot advance further after being out')
          }
        }
        currentBatter = output.batter
        playerWasOut = output.out
        if (!playerWasOut) {
          reachedBases.push(Math.max(output.base, output.errorTarget))
        }
      }
    }
  })

  for (let i = 0; i < reachedBases.length - 1; i += 1) {
    const reachedBase1 = reachedBases[i]
    const reachedBase2 = reachedBases[i + 1]

    if (reachedBase2 > reachedBase1) {
      validation = attachValidation(validation, 'Player cannot pass another runner')
    }

    if (reachedBase1 !== 4 && reachedBase1 === reachedBase2) {
      validation = attachValidation(validation, 'Two players cannot finish on the same base')
    }
  }

  return validation
}

// HIT can only be credited to batter, if there is no forced out
function checkHit (inputs: WBSCInput[]) {
  let validation = ''

  let hitPlay = false
  let forceOut = false
  let appealPlay = false

  inputs.reverse().forEach((input) => {
    switch (input.group) {
      case inputB:
        if (hitActions.includes(input.specAction)) {
          hitPlay = true
        }
        break
      case inputR1:
      case inputR2:
      case inputR3:
        if (input.specAction === 'GO') {
          forceOut = true
        } else if (input.specAction === 'A') {
          appealPlay = true
        }
        break
    }
  })

  if (hitPlay && forceOut) {
    validation = attachValidation(validation, 'It is not possible to score a HIT, if there is a forced out. Use \'FC - Occupied\' instead.')
  } else if (hitPlay && appealPlay) {
    validation = attachValidation(validation, 'It is not possible to score a HIT, if there is an appeal play. Use \'FC - Occupied\' instead.')
  }

  return validation
}

// forced out may only happen if runner is being forced to run by runners behind him
function checkFO (inputs: WBSCInput[]) {
  let validation = ''

  const givenFO = [false, false, false]
  const possibleFO = [false, false, false]
  let impossibleFO = false

  inputs.forEach((input) => {
    switch (input.group) {
      case inputB:
        possibleFO[0] = true // runner at 1st may be forced out at 2nd
        break
      case inputR1:
        possibleFO[1] = true // runner at 2nd may be forced out at 3rd
        if (input.specAction === 'GO') {
          if (input.output?.base === 2) {
            givenFO[0] = true
          } else {
            impossibleFO = true
          }
        }
        break
      case inputR2:
        possibleFO[2] = true // runner at 3rd may be forced out at HP
        if (input.specAction === 'GO') {
          if (input.output?.base === 3) {
            givenFO[1] = true
          } else {
            impossibleFO = true
          }
        }
        break
      case inputR3:
        if (input.specAction === 'GO') {
          if (input.output?.base === 4) {
            givenFO[2] = true
          } else {
            impossibleFO = true
          }
        }
        break
      default:
        if (input.specAction === 'GO') {
          impossibleFO = true
        }
    }
  })

  if (givenFO[0] && !possibleFO[0]) {
    validation = attachValidation(validation, 'Force out at 2nd is not possible, because the runner from 1st is not forced to advance')
  }
  if (givenFO[1] && !possibleFO[1]) {
    validation = attachValidation(validation, 'Force out at 3rd is not possible, because the runner from 2nd is not forced to advance')
  }
  if (givenFO[2] && !possibleFO[2]) {
    validation = attachValidation(validation, 'Force out at Home is not possible, because the runner from 3rd is not forced to advance')
  }

  if (impossibleFO) {
    validation = attachValidation(validation, 'Force out is only possible at the closest base to advance on')
  }

  return validation
}

// if there is O/FC is selected for batter
// there has to be at least 1 correspondig situatuon for runners
// FC => advance by batter, O => out/decessive error
// special case: K+FC must be toghether with PB
function checkFC (inputs: WBSCInput[]) {
  let validation = ''

  let oSituation = false
  let oPlay = false
  let fcSituation = false
  let fcPlay = false
  let kfcSituation = false
  let kfcPlay = false

  inputs.forEach((input) => {
    const output = input.output
    if (input.group === inputB) {
      if (input.specAction === 'O' || input.specAction === 'KSO' || input.specAction === 'KLO' || input.specAction === 'SFO') {
        oSituation = true
      } else if (input.specAction === 'FC' || input.specAction === 'SHFC') {
        fcSituation = true
      } else if (input.specAction === 'KSFC' || input.specAction === 'KLFC') {
        kfcSituation = true
      }
    } else if (firstRunnerActions.includes(input.group)) {
      if (output?.out || output?.text1.includes('E') || output?.text2?.includes('E')) {
        oPlay = true
      } else if (input.specAction === 'ADV') {
        fcPlay = true
      } else if (input.specAction === 'PB') {
        kfcPlay = true
      }
    }
  })

  if (oSituation && !oPlay) {
    validation = attachValidation(validation, 'FC - occupied is selected, but corresponding out/decessive error is missing')
  }
  if (fcSituation && !fcPlay) {
    validation = attachValidation(validation, 'FC is selected, but corresponding runner advance is missing')
  }
  if (kfcSituation && !kfcPlay) {
    validation = attachValidation(validation, 'If strikeout with FC is selected, there must be a passed ball')
  }

  return validation
}

// if GDP (GDPE) is selected for batter
// there has to be at least 1 correspondig out/decessive error situatuon for runners
function checkGDP (inputs: WBSCInput[]) {
  let validation = ''

  let gdpSelected = false
  let gdpOut = false

  inputs.forEach((input) => {
    const output = input.output
    if (output?.text1 === 'GDP' || output?.text1 === 'GDPE') {
      gdpSelected = true
    } else if (output?.out || output?.text1.includes('E') || output?.text2?.includes('E')) {
      gdpOut = true
    }
  })

  if (gdpSelected && !gdpOut) {
    validation = attachValidation(validation, 'GDP is selected, but corresponding out/decessive error is missing')
  }

  return validation
}

// if SH is selected for batter, there has to be at least 1 correspondig "advance by batter" runner action
// if SF is selected for the batter, there has to be at least 1 corresponding "advance by batter" runner who scored
function checkSHSF (inputs: WBSCInput[]) {
  let validation = ''

  let shSelected = false
  let sfSelected = false
  let advanceByBatter = false
  let runScored = false

  inputs.forEach((input) => {
    if (input?.specAction.startsWith('SH')) {
      shSelected = true
    } else if (input?.specAction.startsWith('SF') || input?.specAction === 'FSF') {
      sfSelected = true
    } else if (input?.specAction === 'ADV') {
      advanceByBatter = true
      if (input?.base === 4) {
        runScored = true
      }
    } else {
      // TODO check for forced out
      // there cannot be forced out + SH play
    }
  })

  if (shSelected && !advanceByBatter) {
    validation = attachValidation(validation, 'SH is selected, but no runner advanced by batter')
  }
  if (sfSelected) {
    if (!advanceByBatter) {
      validation = attachValidation(validation, 'SF is selected, but no runner advanced by batter')
    }
    if (!runScored) {
      validation = attachValidation(validation, 'SF is selected, but no runner scored')
    }
  }

  return validation
}

// WP/PB cannot occur after another play
//   => must be the first runner play
// possible exceptions:
//   - SB can be followed by WP/PB
//   - there can be advance because of BB and then WP/PB
//     (not IBB or HP, because it is dead-ball)
// IP/BK may only be the first (and only) runner play (because it is dead-ball)
function checkExtraBaseAdvances (inputs: WBSCInput[]) {
  let validation = ''

  let invalidWP = false
  let invalidPB = false
  let invalidIP = false
  let invalidBK = false

  inputs.forEach((input) => {
    const isWP = input.specAction === 'WP'
    if (isWP && !firstRunnerActions.includes(input.group)) {
      if (!isAfterBB(inputs) && !isAfterSB(inputs)) {
        invalidWP = true
      }
    }

    const isPB = input.specAction === 'PB'
    if (isPB && !firstRunnerActions.includes(input.group)) {
      if (!isAfterBB(inputs) && !isAfterSB(inputs)) {
        invalidPB = true
      }
    }

    const isIP = input.specAction === 'IP'
    if (isIP && !firstRunnerActions.includes(input.group)) {
      invalidIP = true
    }

    const isBK = input.specAction === 'BK'
    if (isBK && !firstRunnerActions.includes(input.group)) {
      invalidBK = true
    }
  })

  if (invalidWP) {
    validation = attachValidation(validation, 'WP cannot happen after another play (except SB and BB)')
  }
  if (invalidPB) {
    validation = attachValidation(validation, 'WP cannot happen after another play (except SB and BB)')
  }
  if (invalidIP) {
    validation = attachValidation(validation, 'IP must be the only runner play at the moment')
  }
  if (invalidBK) {
    validation = attachValidation(validation, 'BK must be the only runner play at the moment')
  }

  return validation
}

function isAfterBB (inputs: WBSCInput[]) {
  return inputs.some(i => i.group === inputB && i.specAction === 'BB1')
}
function isAfterSB (inputs: WBSCInput[]) {
  return inputs.some(i => firstRunnerActions.includes(i.group) && i.specAction === 'SB')
}

// HIT can only be credited to batter, if there is no forced out
function checkSameError (inputs: WBSCInput[]) {
  let validation = ''

  // TODO some other computations may be also optimized like this?
  const seB = inputs.some(i => i.specAction === 'se0')
  const seR1 = inputs.some(i => i.specAction === 'se1')
  const seR2 = inputs.some(i => i.specAction === 'se2')
  const seR3 = inputs.some(i => i.specAction === 'se3')

  // error action happened
  let errB = false
  let errR1 = false
  let errR2 = false
  let errR3 = false

  inputs.forEach((input) => {
    if (isError(input, errorActions)) {
      switch (input.group) {
        case inputB:
        case inputB1:
        case inputB2:
        case inputB3:
          errB = true
          break
        case inputR1:
        case inputR1a:
        case inputR1b:
          errR1 = true
          break
        case inputR2:
        case inputR2a:
          errR2 = true
          break
        case inputR3:
          errR3 = true
          break
      }
    }
  })

  if (seB && !errB) {
    validation = attachValidation(validation, 'Advance by \'Same error (Batter)\' is selected, \nbut no corresponding error play was given')
  }
  if (seR1 && !errR1) {
    validation = attachValidation(validation, 'Advance by \'Same error (Runner at 1st)\' is selected, \nbut no corresponding error play was given')
  }
  if (seR2 && !errR2) {
    validation = attachValidation(validation, 'Advance by \'Same error (Runner at 2nd)\' is selected, \nbut no corresponding error play was given')
  }
  if (seR3 && !errR3) {
    validation = attachValidation(validation, 'Advance by \'Same error (Runner at 3rd)\' is selected, \nbut no corresponding error play was given')
  }

  // there may be only one "same error" (and "same occupied") action per each runner
  // 'oc' and 'se0 for batter' must be dealt differently, because in this case b1Input gets deleted
  if (inputs.some(i => i.specAction === 'oc')) {
    if (inputs.some(i => i.specAction === 'oc' && i.group !== inputB1)) {
      validation = attachValidation(validation, 'Further advance after \'FC - Occupied\' may happen only once,\n adjust target base instead')
    }
  }
  if (seB) {
    const seBInvalid = inputs.some(i => i.specAction === 'se0' && (i.group === inputB2 || i.group === inputB3))
    const seBActions = inputs.filter(i => i.specAction === 'se0').map(i => getRunner(i.group))
    if (seBInvalid || seBActions.length !== new Set(seBActions).size) {
      validation = attachValidation(validation, 'Further advance on \'Same error (B)\' may happen only once,\n adjust target base instead')
    }
  }
  if (seR1) {
    const seBActions = inputs.filter(i => i.specAction === 'se1').map(i => getRunner(i.group))
    if (seBActions.length !== new Set(seBActions).size) {
      validation = attachValidation(validation, 'Further advance on \'Same error (R1)\' may happen only once,\n adjust target base instead')
    }
  }
  if (seR2) {
    const seBActions = inputs.filter(i => i.specAction === 'se2').map(i => getRunner(i.group))
    if (seBActions.length !== new Set(seBActions).size) {
      validation = attachValidation(validation, 'Further advance on \'Same error (R2)\' may happen only once,\n adjust target base instead')
    }
  }
  if (seR3) {
    const seBActions = inputs.filter(i => i.specAction === 'se3').map(i => getRunner(i.group))
    if (seBActions.length !== new Set(seBActions).size) {
      validation = attachValidation(validation, 'Further advance on \'Same error (R3)\' may happen only once,\n adjust target base instead')
    }
  }

  return validation
}

// RUN cannot be marked as "earned" once there was a decessive error
function checkEarnedRuns (inputs: WBSCInput[]) {
  let validation = ''

  // run marked as earned
  let bER = false
  let r1ER = false
  let r2ER = false
  let r3ER = false
  // decessive error action happenend
  let errB = false
  let errR1 = false
  let errR2 = false
  let errR3 = false

  inputs.forEach((input) => {
    const err = isError(input, decisiveErrorActions)
    const earned = isEarnedRun(input)

    switch (input.group) {
      case inputB:
      case inputB1:
      case inputB2:
      case inputB3:
        if (err) {
          errB = true
        }
        if (earned) {
          bER = true
        }
        break
      case inputR1:
      case inputR1a:
      case inputR1b:
        if (err) {
          errR1 = true
        }
        if (earned) {
          r1ER = true
        }
        break
      case inputR2:
      case inputR2a:
        if (err) {
          errR2 = true
        }
        if (earned) {
          r2ER = true
        }
        break
      case inputR3:
        if (err) {
          errR3 = true
        }
        if (earned) {
          r3ER = true
        }
        break
    }
  })

  if (bER && errB) {
    validation = attachValidation(validation, 'Earned run is selected (Batter), \nbut this is not possible with a decisive error')
  }
  if (r1ER && errR1) {
    validation = attachValidation(validation, 'Earned run is selected (Runner at 1st), \nbut this is not possible with a decisive error')
  }
  if (r2ER && errR2) {
    validation = attachValidation(validation, 'Earned run is selected (Runner at 2nd), \nbut this is not possible with a decisive error')
  }
  if (r3ER && errR3) {
    validation = attachValidation(validation, 'Earned run is selected (Runner at 3rd), \nbut this is not possible with a decisive error')
  }

  return validation
}

// separate validator for batter edge-cases (see #112)
function checkBInput (b1Action: string, bAction: string): string {
  let validation = ''

  if (b1Action === 'se0' && !decisiveErrorActions.includes(bAction)) {
    validation = attachValidation(validation, 'Advance by \'Same error (Batter)\' is selected, \nbut no corresponding error play was given')
  }
  if (b1Action === 'oc' && bAction !== 'O') {
    validation = attachValidation(validation, 'Advance after \'FC - Occupied\' is selected, \nbut no corresponding FC play was given')
  }

  return validation
}

// helper to link input to certain player
function getRunner (group: string): string {
  switch (group) {
    case inputR3:
      return 'R3'
    case inputR2:
    case inputR2a:
      return 'R2'
    case inputR1:
    case inputR1a:
    case inputR1b:
      return 'R1'
    default:
      return 'B'
  }
}

// helper to decide whether there is an error action in current input
function isError (input: WBSCInput, actionList: string[]): boolean {
  return actionList.includes(input?.specAction)
}
// helper to decide whether there is an earned run in current input
function isEarnedRun (input: WBSCInput): boolean {
  return (input?.output?.base === 4 || input?.output?.errorTarget === 4) && input?.output?.run === 'e'
}

// helper to attach new part of validation message to previous contents
function attachValidation (validation: string, newMessage: string) {
  if (validation !== '') {
    validation += '\n'
  }
  return validation + newMessage
}

export {
  checkUserInput, checkBInput
}
