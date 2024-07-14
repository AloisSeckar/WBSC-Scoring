/* **************************************** */
/* wbsc-validation.ts                       */
/* Validate user's input to eliminate plays */
/* that are clearly impossible.             */
/* **************************************** */

import type { WBSCInput, WBSCOutput } from '@/composables/useInputStore'

const firstRunnerActions = [inputR1, inputR2, inputR3]
export const firstActions = [inputB, inputR1, inputR2, inputR3]
const hitActions = ['1B', '2B', '3B', 'HR', '1BB', '2BG', 'IHR']
const decisiveErrorActions = [
  'EF', 'EFB', 'ET', 'EDF', 'EDL', 'EDP', 'INT', 'OB', 'ENF', 'ENT', 'KSET', 'KSE', 'KLET', 'KLE',
  'GDPE', 'SHE', 'SHET', 'SHEF', 'SFE', 'CSE', 'CSET', 'CSN', 'CSNT', 'POE', 'POEN',
]
const errorActions = [...decisiveErrorActions, 'eF', 'eT']
const runnersOnlyActions = [
  'WP', 'PB', 'BK', 'IP', 'SB', 'SBPOA', 'CSE', 'CSET', 'CSN', 'CSNT',
  'POE', 'POEN', 'POCSE', 'POCSEN', 'CSO', 'PO', 'POCS',
]
export const noAdvActions = ['ENF', 'ENT', 'CSN', 'CSNT', 'POEN', 'NADV']

// validation sequence to be run over given inputs/outputs
// (this should be the single point of entry to validatons)
// (called from wbsc-processor.processAction())
export function checkUserInput(inputs: WBSCInput[], outputs: WBSCOutput[]) {
  let validation = ''

  // "extra" outputs are now nested inside main 4
  // but validations were designed for "flat" array
  // TODO this should be solved some better way..
  const flattenedOutputs: WBSCOutput[] = []
  outputs.forEach((output) => {
    output.extraOutput?.forEach((output) => {
      flattenedOutputs.push(output)
    })
    flattenedOutputs.push(output)
  })

  validation = attachValidation(validation, checkBasicRules(inputs))
  validation = attachValidation(validation, checkRunnerOnlyActions(inputs))
  validation = attachValidation(validation, checkOutsAndRuns(flattenedOutputs))
  validation = attachValidation(validation, checkOutcome(flattenedOutputs))
  validation = attachValidation(validation, checkHit(inputs))
  validation = attachValidation(validation, checkAdvances(inputs))
  validation = attachValidation(validation, checkFO(flattenedOutputs))
  validation = attachValidation(validation, checkFC(inputs))
  validation = attachValidation(validation, checkGDP(flattenedOutputs))
  validation = attachValidation(validation, checkSHSF(inputs))
  validation = attachValidation(validation, checkSBCS(inputs))
  validation = attachValidation(validation, checkExtraBaseAdvances(inputs))
  validation = attachValidation(validation, checkNoAdvances(inputs))
  validation = attachValidation(validation, checkOBRs(inputs))
  validation = attachValidation(validation, checkDeadBallPlays(inputs))
  validation = attachValidation(validation, checkSameError(flattenedOutputs))
  validation = attachValidation(validation, checkEarnedRuns(flattenedOutputs))

  return validation
}

// do some basic validations over inputs
export function checkBasicRules(inputs: WBSCInput[]) {
  let validation = ''

  if (inputs.length === 0) {
    return useT('editor.validation.noEmptyInput')
  }

  inputs.forEach((input) => {
    if (input.baseAction && input.specAction) {
      const minPosItems = useEvalStore().getMinPosItems(input.group)
      const posSelection = getPos(input)
      if (minPosItems > 0 && (!posSelection || posSelection.length < minPosItems)) {
        let message = useT('editor.validation.minPositions')
        message = message.replace('%pos%', minPosItems.toString())
        validation = attachValidation(validation, message)
      } else if (posSelection) {
        const container = document.getElementById(input.group) as HTMLElement
        const allPosSelects = container.getElementsByClassName(classWbscPos)
        const filteredPosSelects = [...allPosSelects].filter(i => i.id.startsWith(input.group + '-') && i.checkVisibility())
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
      if (['CSE', 'CSET', 'CSN', 'CSNT'].includes(input.specAction) && getPos(input) === '2') {
        validation = attachValidation(validation, useT('editor.validation.noE2TSB'))
      }
    } else {
      validation = attachValidation(validation, useT('editor.validation.properAction'))
    }
  })

  return validation
}

// validates given 'involved' sequence
export function checkPosSelection(selection: string) {
  let validation = ''

  if (selection.match(/^\d+/)) {
    if (selection.length > 1) {
      if (selection[selection.length - 2] === selection[selection.length - 1]) {
        validation = useT('editor.validation.noSelfAsist')
      }
    }
    if (selection.length > 2) {
      const alreadyEncounteredPositions = [false, false, false, false, false, false, false, false, false, false]
      for (let i = 0; i < selection.length - 1; i += 1) {
        const current = parseInt(selection[i] || '1')
        if (alreadyEncounteredPositions[current] === true) {
          validation = attachValidation(validation, useT('editor.validation.noMultipleAsist'))
          break
        }
        alreadyEncounteredPositions[current] = true
      }
    }
  }

  return validation
}

// #204 - check runners-only actions
export function checkRunnerOnlyActions(inputs: WBSCInput[]) {
  // basically it is not allowed to combine batter + runner-only action
  const batterAction = inputs.some(i => i.group === inputB)
  let invalidCombination = batterAction && inputs.some(i => runnersOnlyActions.includes(i.specAction))

  if (invalidCombination) {
    // additional check for exceptions
    const batterInput = inputs.find(i => i.group === inputB)
    const batterSpecAction = batterInput!.specAction
    const runnerActions = inputs.filter(i => i.group.startsWith('input-r'))
    if (batterSpecAction === 'BB1') {
      // exception 1 - BB + WP/PB is possible
      invalidCombination = runnerActions.some(i => !['ADV', 'WP', 'wp', 'PB', 'pb'].includes(i.specAction))
    } else if (batterSpecAction.startsWith('KS') || batterSpecAction.startsWith('KL')) {
      // exception 2 - KS/KL - only BK/IP is impossible
      invalidCombination = runnerActions.some(i => ['BK', 'bk', 'IP', 'ip'].includes(i.specAction))
    } else if (batterSpecAction === 'OB' && getPos(batterInput!) === '2') {
      // exception 3 - OB2 + BK/IP is possible from 3rd
      const r3SpecAction = inputs.find(i => i.group === inputR3)?.specAction
      if (r3SpecAction === 'BK' || r3SpecAction === 'IP') {
        invalidCombination = false
      }
    }
  }

  if (invalidCombination) {
    return useT('editor.validation.runnerOnlyAction')
  } else {
    return ''
  }
}

// there cannot be more than 3 outs
// there cannot be 3 outs + a run
export function checkOutsAndRuns(outputs: WBSCOutput[]) {
  let outs = 0
  let runs = 0

  outputs.forEach((output) => {
    if (output?.out === true) {
      outs++
    }
    if (output?.base === 4 && output?.out === false) {
      runs++
    }
  })

  if (outs > 3) {
    return useT('editor.validation.max3Outs')
  } else if (outs === 3 && runs > 0) {
    return useT('editor.validation.3OutsNoRuns')
  } else {
    return ''
  }
}

// runner cannot overtake his precessor
// runners cannot end on the same base
// extra actions for same runner must happen in order
// when the runner is out, he cannot advance further
export function checkOutcome(outputs: WBSCOutput[]) {
  let validation = ''

  let currentBatter = -1
  let playerWasOut = false
  const reachedBases: number[] = []

  outputs.forEach((output) => {
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
        const maxReachedBase = reachedBases[reachedBases.length - 1] || output.base
        const currentReachedBase = Math.max(output.base, output.errorTarget)

        if (currentReachedBase > maxReachedBase || (currentReachedBase === maxReachedBase && noAdvActions.includes(output.specAction))) {
          validation = attachValidation(validation, useT('editor.validation.advanceInOrder'))
        }
      } else {
        // special case for "batter + same error"
        // this is probably a dead code after #60
        if (output.group === inputB) {
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
    const reachedBase1 = reachedBases[i] || 0
    const reachedBase2 = reachedBases[i + 1] || 0

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
export function checkHit(inputs: WBSCInput[]) {
  let validation = ''

  let hitPlay = false
  let runnerAt1 = false
  let runnerAt2 = false
  let forceOut = false
  let appealPlay = false

  // TODO #193 - remove this + fix tests (all #193 remarks)
  inputs.reverse().forEach((input) => {
    switch (input.group) {
      case inputB:
        if (hitActions.includes(input.specAction)) {
          hitPlay = true
        }
        break
      case inputR1:
        runnerAt1 = true
        appealPlay = input.specAction === 'A'
        forceOut = input.specAction.startsWith('GO') || (appealPlay && hitPlay)
        break
      case inputR2:
        runnerAt2 = true
        appealPlay = appealPlay || input.specAction === 'A'
        forceOut = forceOut || (runnerAt1 && (input.specAction.startsWith('GO') || appealPlay))
        break
      case inputR3:
        appealPlay = appealPlay || input.specAction === 'A'
        forceOut = forceOut || (runnerAt1 && runnerAt2 && (input.specAction.startsWith('GO') || appealPlay))
        break
    }
  })

  if (hitPlay && forceOut) {
    if (appealPlay) {
      validation = attachValidation(validation, useT('editor.validation.noHitAndA'))
    } else {
      validation = attachValidation(validation, useT('editor.validation.noHitAndO'))
    }
  }

  return validation
}

// ADVANCE BY BATTER may only appear at the FIRST runner input
// additionally it require batter's action
function checkAdvances(inputs: WBSCInput[]) {
  let validation = ''

  if (inputs.some(i => i.specAction === 'ADV') && !inputs.some(i => i.group === inputB)) {
    validation = attachValidation(validation, useT('editor.validation.noADVWithoutBatter'))
  }

  inputs.forEach((input) => {
    if (input.specAction === 'ADV' && ![inputR1, inputR2, inputR3].includes(input.group)) {
      validation = attachValidation(validation, useT('editor.validation.invalidADV'))
    }
  })
  return validation
}

// forced out may only happen if runner is being forced to run by runners behind him
// #154 - exception: runner is forced to return to base after fly-out
function checkFO(outputs: WBSCOutput[]) {
  let validation = ''

  const givenFO = [false, false, false]
  const possibleFO = [false, false, false]
  let impossibleFO = false
  let flyout = false

  outputs.toReversed().forEach((output) => {
    switch (output.group) {
      case inputB:
        possibleFO[0] = true // runner at 1st may be forced out at 2nd
        flyout = ['F', 'P', 'L', 'FF', 'FP', 'FL', 'FB', 'FFB'].includes(output.specAction)
        break
      case inputR1:
        possibleFO[1] = !!possibleFO[0] // runner at 2nd may be forced out at 3rd
        if (output.specAction === 'GO') {
          if (output.base === 2) {
            givenFO[0] = true
          } else {
            impossibleFO = true
          }
        }
        break
      case inputR2:
        possibleFO[2] = !!possibleFO[0] && !!possibleFO[1] // runner at 3rd may be forced out at HP
        if (output.specAction === 'GO') {
          if (output.base === 3) {
            givenFO[1] = true
          } else {
            impossibleFO = true
          }
        }
        break
      case inputR3:
        if (output.specAction === 'GO') {
          if (output.base === 4) {
            givenFO[2] = true
          } else {
            impossibleFO = true
          }
        }
        break
      default:
        if (output.specAction === 'GO') {
          impossibleFO = true
        }
    }
  })

  if (!flyout) {
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
  }

  return validation
}

// if there is O/FC is selected for batter
// there has to be at least 1 correspondig situation for runners
// also linked play must start with mentioned fielder (#152)
// FC => advance by batter, O => out/decessive error
// special case: K+FC must be toghether with PB
function checkFC(inputs: WBSCInput[]) {
  let validation = ''

  let oSituation = false
  let oTarget = ''
  let oPlay = false
  let fcSituation = false
  let fcPlay = false
  let kfcSituation = false
  let kfcPlay = false

  inputs.forEach((input) => {
    if (input.group === inputB) {
      if (['O', 'OCB', 'KSO', 'KLO', 'SFO'].includes(input.specAction)) {
        oSituation = true
        oTarget = getPos(input).at(0) || ''
      } else if (input.specAction === 'FC' || input.specAction === 'SHFC') {
        fcSituation = true
      } else if (input.specAction === 'KSFC' || input.specAction === 'KLFC') {
        kfcSituation = true
      }
    } else if (firstRunnerActions.includes(input.group)) {
      if (['GOT', 'GO', 'A', 'OBR_rin'].includes(input.specAction) || errorActions.includes(input.specAction)) {
        oPlay = true
      } else if (input.specAction === 'ADV') {
        fcPlay = true
      } else if (input.specAction === 'PB') {
        kfcPlay = true
      }
    }
    // runners may also advance on "FC - occupied" (#209)
    if (input.specAction === 'o') {
      oSituation = true
      oTarget = getPos(input).at(0) || ''
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

  if (oTarget) {
    let matchedPlay = false
    for (const input of inputs) {
      if (firstRunnerActions.includes(input.group)) {
        if (oTarget === getPos(input).at(0)) {
          matchedPlay = true
          break
        }
      }
    }
    if (!matchedPlay) {
      validation = attachValidation(validation, useT('editor.validation.invalidOPlay'))
    }
  }

  return validation
}

// if GDP / GDPB / GDPO / GDPE is selected for batter
// there has to be at least 1 (2 for GDPO) correspondig out/decessive error situatuon for runners
function checkGDP(outputs: WBSCOutput[]) {
  let validation = ''

  let gdpSelected = false
  let gdpoSelected = false
  let gdpOuts = 0

  outputs.forEach((output) => {
    if (output?.text1 === 'GDP' || output?.text1 === 'GDPB' || output?.text1 === 'GDPE') {
      gdpSelected = true
    } else if (output?.text1 === 'GDPO') {
      gdpoSelected = true
    } else if (output?.out || output?.text1.includes('E') || output?.text2?.includes('E')) {
      gdpOuts++
    }
  })

  if (gdpSelected && gdpOuts < 1) {
    validation = attachValidation(validation, useT('editor.validation.missingGDPPlay'))
  } else if (gdpoSelected && gdpOuts < 2) {
    validation = attachValidation(validation, useT('editor.validation.missingGDPOPlay'))
  }

  return validation
}

// if SH is selected for batter, there has to be at least 1 correspondig "advance by batter" runner action
// if SF is selected for the batter, there has to be at least 1 corresponding "advance by batter" runner who scored
// #219 - if SH is selected for batter, there cannot be forced out / decessive error of any runner
function checkSHSF(inputs: WBSCInput[]) {
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

  if (!validation && shSelected) {
    let runnerAt1 = false
    let runnerAt2 = false
    let forceOut = false

    inputs.forEach((input) => {
      switch (input.group) {
        case inputR1:
          runnerAt1 = true
          forceOut = input.specAction.startsWith('GO')
          break
        case inputR2:
          runnerAt2 = true
          forceOut = forceOut || (runnerAt1 && input.specAction.startsWith('GO'))
          break
        case inputR3:
          forceOut = forceOut || (runnerAt1 && runnerAt2 && input.specAction.startsWith('GO'))
          break
      }
    })

    if (forceOut) {
      validation = attachValidation(validation, useT('editor.validation.noSHAndO'))
    }
  }

  return validation
}

// there cannot be SB and CS in the same play
// when CS, other advances are indifference (O/)
function checkSBCS(inputs: WBSCInput[]) {
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
// WP/PB/IP/BK cannot be mixed
// further IP/BK validation moved to checkDeadBallPlays (#206)
function checkExtraBaseAdvances(inputs: WBSCInput[]) {
  let validation = ''

  let isWP = false
  let isPB = false
  let isBK = false
  let isIP = false

  let invalidWP = false
  let invalidPB = false

  inputs.forEach((input) => {
    if (input.specAction.toUpperCase() === 'WP') {
      isWP = true
      if (!firstRunnerActions.includes(input.group) && !isAfterBB(inputs) && !isAfterSB(inputs)) {
        invalidWP = true
      }
    }
    if (input.specAction.toUpperCase() === 'PB') {
      isPB = true
      if (!firstRunnerActions.includes(input.group) && !isAfterBB(inputs) && !isAfterSB(inputs)) {
        invalidPB = true
      }
    }
    if (input.specAction.toUpperCase() === 'BK') {
      isBK = true
    }
    if (input.specAction.toUpperCase() === 'IP') {
      isIP = true
    }
  })

  if (Number(isWP) + Number(isPB) + Number(isBK) + Number(isIP) > 1) {
    validation = attachValidation(validation, useT('editor.validation.noMixedExtraAdvances'))
  }

  if (invalidWP) {
    validation = attachValidation(validation, useT('editor.validation.noWPAfterPlay'))
  }
  if (invalidPB) {
    validation = attachValidation(validation, useT('editor.validation.noPBAfterPlay'))
  }

  return validation
}

function isAfterBB(inputs: WBSCInput[]) {
  return inputs.some(i => i.group === inputB && i.specAction === 'BB1')
}
function isAfterSB(inputs: WBSCInput[]) {
  return inputs.some(i => firstRunnerActions.includes(i.group) && i.specAction === 'SB')
}

// "no advance" must be the last play and target must be the closest base
// (last play is ensured by disabling extra inputs in wbsc-eval.ts)
function checkNoAdvances(inputs: WBSCInput[]) {
  let validation = ''

  let invalidNADV = false
  inputs.toReversed().forEach((i) => {
    if (noAdvActions.includes(i.specAction) && (i.base - i.origBase > 1)) {
      invalidNADV = true
    }
  })

  if (invalidNADV) {
    validation = attachValidation(validation, useT('editor.validation.noAdvanceOnNA'))
  }

  return validation
}

// edge case - RLE is dead-ball
// maybe can eventually be merged with `checkDeadBallPlays`?
// #130 HBB - requires a single hit for batter
function checkOBRs(inputs: WBSCInput[]) {
  let validation = ''

  let isRLE = false

  inputs.forEach((input) => {
    if (input.specAction === 'OBR_rle') {
      isRLE = true
    }
  })

  if (isRLE && inputs.length > 1) {
    validation = attachValidation(validation, useT('editor.validation.noPlayAfterRLE'))
  }

  const isHBB = inputs.some(i => i.specAction === 'OBR_hbb')
  if (isHBB) {
    const bAction = inputs.find(i => i.group === inputB)?.specAction
    if (bAction !== '1B') {
      validation = attachValidation(validation, useT('editor.validation.noHBBWithoutHit'))
    }
  }

  return validation
}

// #206 - when there is a "dead-ball" play, only necessary forced advances of other runners are possible
// exception: OB2 + BK/IP (obstruction during squeeze play)
function checkDeadBallPlays(inputs: WBSCInput[]) {
  if (inputs.some(i => ['INT', 'OB', 'IBB1', 'HP'].includes(i.specAction))) {
    if (inputs.some(i => i.group !== inputB && !i.specAction.includes('ADV') && (i.group !== inputR3 || !['BK', 'IP'].includes(i.specAction)))) {
      return useT('editor.validation.noPlayAfterDeadBall')
    }
    // the above still allows un-forced advances of R2 or R3
    const possibleAdvR2 = inputs.some(i => i.group === inputR1)
    if (!possibleAdvR2 && inputs.some(i => i.group === inputR2 && i.specAction === 'ADV')) {
      return useT('editor.validation.noPlayAfterDeadBall')
    }
    const possibleAdvR3 = possibleAdvR2 && inputs.some(i => i.group === inputR2)
    if (!possibleAdvR3 && inputs.some(i => i.group === inputR3 && i.specAction === 'ADV')) {
      return useT('editor.validation.noPlayAfterDeadBall')
    }
  }

  if (inputs.some(i => i.specAction === 'BK')) {
    if (inputs.some(i => i.specAction.toUpperCase() !== 'BK' && (i.group !== inputB || i.specAction !== 'OB' || getPos(i) !== '2'))) {
      return useT('editor.validation.noPlayAfterBK')
    }
  }

  if (inputs.some(i => i.specAction === 'IP')) {
    if (inputs.some(i => i.specAction.toUpperCase() !== 'IP' && (i.group !== inputB || i.specAction !== 'OB' || getPos(i) !== '2'))) {
      return useT('editor.validation.noPlayAfterIP')
    }
  }

  return ''
}

// HIT can only be credited to batter, if there is no forced out
function checkSameError(outputs: WBSCOutput[]) {
  let validation = ''

  // TODO some other computations may be also optimized like this?
  const seB = outputs.some(o => o.specAction === 'se0')
  const seR1 = outputs.some(o => o.specAction === 'se1')
  const seR2 = outputs.some(o => o.specAction === 'se2')
  const seR3 = outputs.some(o => o.specAction === 'se3')

  // error action happened
  let errB = false
  let errR1 = false
  let errR2 = false
  let errR3 = false

  outputs.forEach((output) => {
    if (isError(output, errorActions)) {
      switch (output.group) {
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
    validation = attachValidation(validation, useT('editor.validation.noSE').replace('#p#', 'B'))
  }
  if (seR1 && !errR1) {
    validation = attachValidation(validation, useT('editor.validation.noSE').replace('#p#', 'R1'))
  }
  if (seR2 && !errR2) {
    validation = attachValidation(validation, useT('editor.validation.noSE').replace('#p#', 'R2'))
  }
  if (seR3 && !errR3) {
    validation = attachValidation(validation, useT('editor.validation.noSE').replace('#p#', 'R3'))
  }

  // there may be only one "same error" (and "same occupied") action per each runner
  // 'oc' and 'se0 for batter' must be dealt differently, because in this case b1Input gets deleted
  if (outputs.some(o => o.specAction === 'oc')) {
    if (outputs.some(o => o.specAction === 'oc' && o.group !== inputB1)) {
      validation = attachValidation(validation, useT('editor.validation.noExAdvFC'))
    }
  }
  if (seB) {
    const seBInvalid = outputs.some(o => o.specAction === 'se0' && (o.group === inputB2 || o.group === inputB3))
    const seBActions = outputs.filter(o => o.specAction === 'se0').map(o => getRunner(o.group))
    if (seBInvalid || seBActions.length !== new Set(seBActions).size) {
      validation = attachValidation(validation, useT('editor.validation.noExAdvSE').replace('#p#', 'B'))
    }
  }
  if (seR1) {
    const seBActions = outputs.filter(o => o.specAction === 'se1').map(o => getRunner(o.group))
    if (seBActions.length !== new Set(seBActions).size) {
      validation = attachValidation(validation, useT('editor.validation.noExAdvSE').replace('#p#', 'R1'))
    }
  }
  if (seR2) {
    const seBActions = outputs.filter(o => o.specAction === 'se2').map(o => getRunner(o.group))
    if (seBActions.length !== new Set(seBActions).size) {
      validation = attachValidation(validation, useT('editor.validation.noExAdvSE').replace('#p#', 'R2'))
    }
  }
  if (seR3) {
    const seBActions = outputs.filter(o => o.specAction === 'se3').map(o => getRunner(o.group))
    if (seBActions.length !== new Set(seBActions).size) {
      validation = attachValidation(validation, useT('editor.validation.noExAdvSE').replace('#p#', 'R3'))
    }
  }

  return validation
}

// RUN cannot be marked as "earned" once there was a decessive error
function checkEarnedRuns(outputs: WBSCOutput[]) {
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

  outputs.forEach((output) => {
    const err = isError(output, decisiveErrorActions)
    const earned = isEarnedRun(output)
    const teamUnearned = isTeamUnearnedRun(output)

    switch (output.group) {
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
        tieR1 = output.tie
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
        tieR2 = output.tie
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
    validation = attachValidation(validation, useT('editor.validation.noER').replace('#p#', 'B'))
  }
  if (r1ER && errR1) {
    validation = attachValidation(validation, useT('editor.validation.noER').replace('#p#', 'R1'))
  }
  if (r2ER && errR2) {
    validation = attachValidation(validation, useT('editor.validation.noER').replace('#p#', 'R2'))
  }
  if (r3ER && errR3) {
    validation = attachValidation(validation, useT('editor.validation.noER').replace('#p#', 'R3'))
  }
  if ((tieR1 && (r1ER || r1TU)) || (tieR2 && (r2ER || r2TU))) {
    validation = attachValidation(validation, useT('editor.validation.noTieER'))
  }

  return validation
}

// separate validator for batter edge-cases (see #112)
export function checkBInput(b1Action: string, bAction: string): string {
  let validation = ''

  if (b1Action === 'se0' && !decisiveErrorActions.includes(bAction)) {
    validation = attachValidation(validation, attachValidation(validation, useT('editor.validation.noSE').replace('#p#', 'B')))
  }
  if (b1Action === 'oc' && bAction !== 'O' && bAction !== 'OCB') {
    validation = attachValidation(validation, useT('editor.validation.missingOAdv'))
  }

  return validation
}

// helper to link input to certain player
function getRunner(group: string): string {
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
function isError(output: WBSCOutput, actionList: string[]): boolean {
  return actionList.includes(output.specAction)
}
// helper to decide whether there is an earned run in current input
function isEarnedRun(output: WBSCOutput): boolean {
  return (output.base === 4 || output.errorTarget === 4) && output.run === 'e'
}
// helper to decide whether there is a team unearned run in current input
function isTeamUnearnedRun(output: WBSCOutput): boolean {
  return (output.base === 4 || output.errorTarget === 4) && output.run === 'tu'
}

// helper to attach new part of validation message to previous contents
function attachValidation(validation: string, newMessage: string) {
  if (validation !== '') {
    validation += '\n'
  }
  return validation + newMessage
}
