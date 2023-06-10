/* **************************************** */
/* wbsc-validation.js                       */
/* Validate user's input to eliminate plays */
/* that are clearly impossible.             */
/* **************************************** */

import { WBSCInput } from '@/composables/useInputStore'

const firstRunnerActions = [inputR1, inputR2, inputR3]
const hitActions = ['1B', '2B', '3B', 'HR', '1BB', '2BG', 'IHR']
const errorActions = [
  'EF', 'ET', 'eF', 'eT', 'EDF', 'EDL', 'EDP', 'INT', 'OB', 'ENF', 'ENT', 'KSET', 'KSE', 'KLET', 'KLE',
  'GDPE', 'SHE', 'SHET', 'SHEF', 'SFE', 'CSE', 'CSET', 'CSN', 'CSNT', 'POE'
]

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
    } else {
      validation = attachValidation(validation, 'Action must be properly defined')
    }
  })

  // 2) validations over all outputs
  validation = attachValidation(validation, checkMaxOuts(inputs))
  validation = attachValidation(validation, checkOutcome(inputs))
  validation = attachValidation(validation, checkHit(inputs))
  validation = attachValidation(validation, checkFC(inputs))
  validation = attachValidation(validation, checkGDP(inputs))
  validation = attachValidation(validation, checkSHSF(inputs))
  validation = attachValidation(validation, checkExtraBaseAdvances(inputs))
  validation = attachValidation(validation, checkSameError(inputs))

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
          if (playerWasOut) {
            validation = attachValidation(validation, 'One player cannot be out more than once')
          } else {
            playerWasOut = true
            validation = attachValidation(validation, 'Player cannot advance further after being out')
          }
        }
        const maxReachedBase = reachedBases[reachedBases.length - 1]
        const currentReachedBase = Math.max(output.base, output.errorTarget)
        if (currentReachedBase > maxReachedBase || (currentReachedBase === maxReachedBase && output.na === false)) {
          validation = attachValidation(validation, 'Extra advances of one player must happen in order')
        }
      } else {
        // special case for "batter + same error"
        if (input.group === inputB) {
          if (output.base === 0 && output.errorTarget > 1) {
            playerWasOut = true
            validation = attachValidation(validation, 'Player cannot advance further after being out')
          }
        }
        currentBatter = output.batter
        playerWasOut = output.out
        if (!playerWasOut) {
          reachedBases.push(output.base)
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

// if there is O/FC is selected for batter
// there has to be at least 1 correspondig situatuon for runners
// FC => advance by batter, O => out/decessive error
function checkFC (inputs: WBSCInput[]) {
  let validation = ''

  let oSituation = false
  let oPlay = false
  let fcSituation = false
  let fcPlay = false

  inputs.forEach((input) => {
    const output = input.output
    if (input.group === inputB) {
      if (input.specAction === 'O' || input.specAction === 'KSO' || input.specAction === 'KLO' || input.specAction === 'SFO') {
        oSituation = true
      } else if (input.specAction === 'FC' || input.specAction === 'SHFC') {
        fcSituation = true
      }
    } else if (firstRunnerActions.includes(input.group)) {
      if (output?.out || output?.text1.includes('E') || output?.text2?.includes('E')) {
        oPlay = true
      } else if (input.specAction === 'ADV') {
        fcPlay = true
      }
    }
  })

  if (oSituation && !oPlay) {
    validation = attachValidation(validation, 'FC - occupied is selected, but corresponding out/decessive error is missing')
  } else if (fcSituation && !fcPlay) {
    validation = attachValidation(validation, 'FC is selected, but corresponding runner advance is missing')
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

  let errB = false
  let errR1 = false
  let errR2 = false
  let errR3 = false
  inputs.forEach((input) => {
    if (errorActions.includes(input.specAction)) {
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

  return validation
}

// helper to attach new part of validation message to previous contents
function attachValidation (validation: string, newMessage: string) {
  if (validation !== '') {
    validation += '\n'
  }
  return validation + newMessage
}

export {
  checkUserInput
}
