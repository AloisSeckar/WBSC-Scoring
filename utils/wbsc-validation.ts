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

  if (inputs.length === 0) {
    return useT('editor.validation.noEmptyInput')
  }

  // 1) validations to be run over each input separately
  inputs.forEach((input) => {
    if (input && input.baseAction && input.specAction) {
      const minPosItems = useEvalStore().getMinPosItems(input.group)
      const posSelection = input.pos
      if (minPosItems > 0 && (!posSelection || posSelection.length < minPosItems)) {
        let message = useT('editor.validation.minPositions')
        message = message.replace('%pos%', minPosItems.toString())
        validation = attachValidation(validation, message)
      } else if (posSelection) {
        const container = document.getElementById(input.group) as HTMLElement
        const allPosSelects = container.getElementsByClassName(classWbscPos)
        const filteredPosSelects = [...allPosSelects].filter(i => i.id.startsWith(input.group + '-'))
        if (filteredPosSelects.length > posSelection.length) {
          validation = attachValidation(validation, useT('editor.validation.allPositions'))
        } else {
          validation = attachValidation(validation, checkPosSelection(posSelection))
        }
      }
      if ((input.specAction.includes('EN') || input.specAction.includes('CSN')) && input.base - input.origBase > 1) {
        validation = attachValidation(validation, useT('editor.validation.noNAAdvance'))
      }
      if (input.specAction === 'SB' && input.base - input.origBase > 1) {
        validation = attachValidation(validation, useT('editor.validation.noSBAdvance'))
      }
      if (['CSE', 'CSET', 'CSN', 'CSNT'].includes(input.specAction) && input.pos === '2') {
        validation = attachValidation(validation, useT('editor.validation.noE2TSB'))
      }
    } else {
      validation = attachValidation(validation, useT('editor.validation.properAction'))
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
  validation = attachValidation(validation, checkSBCS(inputs))
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
      validation = useT('editor.validation.noSelfAsist')
    }
  }
  if (selection.length > 2) {
    const alreadyEncounteredPositions = [false, false, false, false, false, false, false, false, false, false]
    for (let i = 0; i < selection.length - 1; i += 1) {
      const current = parseInt(selection[i])
      if (alreadyEncounteredPositions[current] === true) {
        validation = attachValidation(validation, useT('editor.validation.noMultipleAsist'))
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
    return useT('editor.validation.max3Outs')
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
            validation = attachValidation(validation, useT('editor.validation.noOutAfterOut'))
          } else {
            playerWasOut = true
            validation = attachValidation(validation, useT('editor.validation.noAdvanceAfterOut'))
          }
        }
        const maxReachedBase = reachedBases[reachedBases.length - 1]
        const currentReachedBase = Math.max(output.base, output.errorTarget)
        if (currentReachedBase > maxReachedBase || (currentReachedBase === maxReachedBase && noAdvActions.includes(input.specAction))) {
          validation = attachValidation(validation, useT('editor.validation.advanceInOrder'))
        }
      } else {
        // special case for "batter + same error"
        // this is probably a dead code after #60
        if (input.group === inputB) {
          if (output.base === 0 && output.errorTarget > 1) {
            playerWasOut = true
            validation = attachValidation(validation, useT('editor.validation.noAdvanceAfterOut'))
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
      validation = attachValidation(validation, useT('editor.validation.noPassingRunner'))
    }

    if (reachedBase1 !== 4 && reachedBase1 === reachedBase2) {
      validation = attachValidation(validation, useT('editor.validation.noSameBase'))
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
    validation = attachValidation(validation, useT('editor.validation.noHitAndFO'))
  } else if (hitPlay && appealPlay) {
    validation = attachValidation(validation, useT('editor.validation.noHitAndA'))
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
    validation = attachValidation(validation, useT('editor.validation.notFO2'))
  }
  if (givenFO[1] && !possibleFO[1]) {
    validation = attachValidation(validation, useT('editor.validation.notFO3'))
  }
  if (givenFO[2] && !possibleFO[2]) {
    validation = attachValidation(validation, useT('editor.validation.notFOH'))
  }

  if (impossibleFO) {
    validation = attachValidation(validation, useT('editor.validation.noDistantFO'))
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
    validation = attachValidation(validation, useT('editor.validation.missingOPlay'))
  }
  if (fcSituation && !fcPlay) {
    validation = attachValidation(validation, useT('editor.validation.missingFCPlay'))
  }
  if (kfcSituation && !kfcPlay) {
    validation = attachValidation(validation, useT('editor.validation.missingPBPlay'))
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
    validation = attachValidation(validation, useT('editor.validation.missingGDPPlay'))
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
    validation = attachValidation(validation, useT('editor.validation.missingSHPlay'))
  }
  if (sfSelected) {
    if (!advanceByBatter) {
      validation = attachValidation(validation, useT('editor.validation.missingSFPlay'))
    }
    if (!runScored) {
      validation = attachValidation(validation, useT('editor.validation.missingSFRun'))
    }
  }

  return validation
}

// there cannot be SB and CS in the same play
// when CS, other advances are indifference (O/)
function checkSBCS (inputs: WBSCInput[]) {
  let validation = ''

  let sbSelected = false
  let csSelected = false

  inputs.forEach((input) => {
    if (input?.specAction === 'SB') {
      sbSelected = true
    } else if (input?.specAction.startsWith('CS')) {
      csSelected = true
    }
  })

  if (sbSelected && csSelected) {
    validation = attachValidation(validation, useT('editor.validation.noSBCS'))
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

  let isWP = false
  let isPB = false
  let isIP = false
  let isBK = false

  let invalidWP = false
  let invalidPB = false
  let invalidIP = false
  let invalidBK = false

  inputs.forEach((input) => {
    if (input.specAction.toUpperCase() === 'WP') {
      isWP = true
    }
    if (isWP && !firstRunnerActions.includes(input.group)) {
      if (!isAfterBB(inputs) && !isAfterSB(inputs)) {
        invalidWP = true
      }
    }

    if (input.specAction.toUpperCase() === 'PB') {
      isPB = true
    }
    if (isPB && !firstRunnerActions.includes(input.group)) {
      if (!isAfterBB(inputs) && !isAfterSB(inputs)) {
        invalidPB = true
      }
    }

    if (input.specAction.toUpperCase() === 'IP') {
      isIP = true
    }
    if (isIP && !firstRunnerActions.includes(input.group)) {
      invalidIP = true
    }

    if (input.specAction.toUpperCase() === 'BK') {
      isBK = true
    }
    if (isBK && !firstRunnerActions.includes(input.group)) {
      invalidBK = true
    }
  })

  if (Number(isWP) + Number(isPB) + Number(isIP) + Number(isBK) > 1) {
    validation = attachValidation(validation, useT('editor.validation.noMixedExtraAdvances'))
  }

  if (invalidWP) {
    validation = attachValidation(validation, useT('editor.validation.noWPAfterPlay'))
  }
  if (invalidPB) {
    validation = attachValidation(validation, useT('editor.validation.noPBAfterPlay'))
  }
  if (invalidIP) {
    validation = attachValidation(validation, useT('editor.validation.noPlayAfterIP'))
  }
  if (invalidBK) {
    validation = attachValidation(validation, useT('editor.validation.noPlayAfterBK'))
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
    validation = attachValidation(validation, useT('editor.validation.noSE0'))
  }
  if (seR1 && !errR1) {
    validation = attachValidation(validation, useT('editor.validation.noSE1'))
  }
  if (seR2 && !errR2) {
    validation = attachValidation(validation, useT('editor.validation.noSE2'))
  }
  if (seR3 && !errR3) {
    validation = attachValidation(validation, useT('editor.validation.noSE3'))
  }

  // there may be only one "same error" (and "same occupied") action per each runner
  // 'oc' and 'se0 for batter' must be dealt differently, because in this case b1Input gets deleted
  if (inputs.some(i => i.specAction === 'oc')) {
    if (inputs.some(i => i.specAction === 'oc' && i.group !== inputB1)) {
      validation = attachValidation(validation, useT('editor.validation.noExAdvFC'))
    }
  }
  if (seB) {
    const seBInvalid = inputs.some(i => i.specAction === 'se0' && (i.group === inputB2 || i.group === inputB3))
    const seBActions = inputs.filter(i => i.specAction === 'se0').map(i => getRunner(i.group))
    if (seBInvalid || seBActions.length !== new Set(seBActions).size) {
      validation = attachValidation(validation, useT('editor.validation.noExAdvSE0'))
    }
  }
  if (seR1) {
    const seBActions = inputs.filter(i => i.specAction === 'se1').map(i => getRunner(i.group))
    if (seBActions.length !== new Set(seBActions).size) {
      validation = attachValidation(validation, useT('editor.validation.noExAdvSE1'))
    }
  }
  if (seR2) {
    const seBActions = inputs.filter(i => i.specAction === 'se2').map(i => getRunner(i.group))
    if (seBActions.length !== new Set(seBActions).size) {
      validation = attachValidation(validation, useT('editor.validation.noExAdvSE2'))
    }
  }
  if (seR3) {
    const seBActions = inputs.filter(i => i.specAction === 'se3').map(i => getRunner(i.group))
    if (seBActions.length !== new Set(seBActions).size) {
      validation = attachValidation(validation, useT('editor.validation.noExAdvSE3'))
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

  // only relevant for runners at 1st and 2nd
  // run marked as team-unearned
  let r1TU = false
  let r2TU = false
  // it was a TIE runner
  let tieR1 = false
  let tieR2 = false

  inputs.forEach((input) => {
    const err = isError(input, decisiveErrorActions)
    const earned = isEarnedRun(input)
    const teamUnearned = isTeamUnearnedRun(input)

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
        tieR1 = input.tie
        // falls through
      case inputR1a:
      case inputR1b:
        if (err) {
          errR1 = true
        }
        if (earned) {
          r1ER = true
        }
        if (teamUnearned) {
          r1TU = true
        }
        break
      case inputR2:
        tieR2 = input.tie
        // falls through
      case inputR2a:
        if (err) {
          errR2 = true
        }
        if (earned) {
          r2ER = true
        }
        if (teamUnearned) {
          r2TU = true
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
    validation = attachValidation(validation, useT('editor.validation.noER0'))
  }
  if (r1ER && errR1) {
    validation = attachValidation(validation, useT('editor.validation.noER1'))
  }
  if (r2ER && errR2) {
    validation = attachValidation(validation, useT('editor.validation.noER2'))
  }
  if (r3ER && errR3) {
    validation = attachValidation(validation, useT('editor.validation.noER3'))
  }
  if ((tieR1 && (r1ER || r1TU)) || (tieR2 && (r2ER || r2TU))) {
    validation = attachValidation(validation, useT('editor.validation.noTieER'))
  }

  return validation
}

// separate validator for batter edge-cases (see #112)
function checkBInput (b1Action: string, bAction: string): string {
  let validation = ''

  if (b1Action === 'se0' && !decisiveErrorActions.includes(bAction)) {
    validation = attachValidation(validation, attachValidation(validation, useT('editor.validation.noSE0')))
  }
  if (b1Action === 'oc' && bAction !== 'O') {
    validation = attachValidation(validation, useT('editor.validation.missingOAdv'))
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
// helper to decide whether there is a team unearned run in current input
function isTeamUnearnedRun (input: WBSCInput): boolean {
  return (input?.output?.base === 4 || input?.output?.errorTarget === 4) && input?.output?.run === 'tu'
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
