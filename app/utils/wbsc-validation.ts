/* **************************************** */
/* wbsc-validation.ts                       */
/* Validate user's input to eliminate plays */
/* that are clearly impossible.             */
/* **************************************** */

import { inputB, inputR1, inputR2, inputR3 } from './wbsc-constants'

const firstRunnerActions = [inputR1, inputR2, inputR3]
export const firstActions = [inputB, inputR1, inputR2, inputR3]
const hitActions = ['1B', '2B', '3B', 'HR', '1BB', '2BG', 'IHR']
const decisiveErrorActions = [
  'EF', 'EFB', 'ET', 'EDF', 'EDL', 'EDP', 'INT', 'OB', 'ENF', 'ENT', 'KSET', 'KSE', 'KLET', 'KLE',
  'GDPE', 'SHE', 'SHET', 'SHEF', 'SFE', 'CSE', 'CSET', 'CSN', 'CSNT', 'POE', 'POEN',
]
const errorActions = [...decisiveErrorActions, 'eF', 'eT', 'eDF']
const runnersOnlyActions = [
  'WP', 'PB', 'BK', 'IP', 'SB', 'SBPOA', 'CSE', 'CSET', 'CSN', 'CSNT',
  'POE', 'POEN', 'POCSE', 'POCSEN', 'CSO', 'PO', 'POCS',
]
export const noAdvActions = ['ENF', 'ENT', 'CSN', 'CSNT', 'POEN', 'POCSEN', 'NADV']

// validation sequence to be run over given inputs/outputs
// (this should be the single point of entry to validatons)
// (called from wbsc-processor.processAction())
export function checkUserInput(actions: WBSCAction[]) {
  let validation = ''

  validation = attachValidation(validation, checkBasicRules(actions))
  validation = attachValidation(validation, checkRunnerOnlyActions(actions))
  validation = attachValidation(validation, checkOutsAndRuns(actions))
  validation = attachValidation(validation, checkOutcome(actions))
  validation = attachValidation(validation, checkHit(actions))
  validation = attachValidation(validation, checkAdvances(actions))
  validation = attachValidation(validation, checkFO(actions))
  validation = attachValidation(validation, checkFC(actions))
  validation = attachValidation(validation, checkGDP(actions))
  validation = attachValidation(validation, checkSHSF(actions))
  validation = attachValidation(validation, checkSBCS(actions))
  validation = attachValidation(validation, checkExtraBaseAdvances(actions))
  validation = attachValidation(validation, checkNoAdvances(actions))
  validation = attachValidation(validation, checkOBRs(actions))
  validation = attachValidation(validation, checkDeadBallPlays(actions))
  validation = attachValidation(validation, checkExtraBaseDroppedFlyError(actions))
  validation = attachValidation(validation, checkSameError(actions))
  validation = attachValidation(validation, checkEarnedRuns(actions))

  return validation
}

// do some basic validations over inputs
export function checkBasicRules(actions: WBSCAction[]) {
  let validation = ''

  if (actions.length === 0) {
    return useT('editor.validation.noEmptyInput')
  }

  actions.forEach((action) => {
    if (action.baseAction && action.specAction) {
      const minPosItems = useEvalStore().getMinPosItems(action.group)
      const posSelection = getPos(action)
      if (minPosItems > 0 && (!posSelection || posSelection.length < minPosItems)) {
        let message = useT('editor.validation.minPositions')
        message = message.replace('%pos%', minPosItems.toString())
        validation = attachValidation(validation, message)
      } else if (posSelection) {
        const container = document.getElementById(action.group) as HTMLElement
        const allPosSelects = container.getElementsByClassName(classWbscPos)
        const filteredPosSelects = [...allPosSelects].filter(i => i.id.startsWith(action.group + '-') && i.checkVisibility())
        if (filteredPosSelects.length > posSelection.length) {
          validation = attachValidation(validation, useT('editor.validation.allPositions'))
        } else {
          validation = attachValidation(validation, checkPosSelection(posSelection))
        }
      }
      if ((action.specAction.includes('EN') || action.specAction.includes('CSN')) && action.base - action.origBase > 1) {
        validation = attachValidation(validation, useT('editor.validation.noNAAdvance'))
      }
      if (action.specAction === 'SB' && action.base - action.origBase > 1) {
        validation = attachValidation(validation, useT('editor.validation.noSBAdvance'))
      }
      if (['CSE', 'CSET', 'CSN', 'CSNT'].includes(action.specAction) && getPos(action) === '2') {
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
export function checkRunnerOnlyActions(actions: WBSCAction[]) {
  // basically it is not allowed to combine batter + runner-only action
  const batterAction = actions.some(i => i.group === inputB)
  let invalidCombination = batterAction && actions.some(i => runnersOnlyActions.includes(i.specAction))

  if (invalidCombination) {
    // additional check for exceptions
    const batterInput = actions.find(i => i.group === inputB)
    const batterSpecAction = batterInput!.specAction
    const runnerActions = actions.filter(i => i.group.startsWith('input-r'))
    if (batterSpecAction === 'BB1') {
      // exception 1 - BB + WP/PB is possible
      invalidCombination = runnerActions.some(i => !['ADV', 'WP', 'PB'].includes(i.specAction))
    } else if (batterSpecAction.startsWith('KS') || batterSpecAction.startsWith('KL')) {
      // exception 2 - KS/KL - only BK/IP is impossible
      invalidCombination = runnerActions.some(i => ['BK', 'IP'].includes(i.specAction))
    } else if (batterSpecAction === 'OB' && getPos(batterInput!) === '2') {
      // exception 3 - OB2 + BK/IP is possible from 3rd
      const r3SpecAction = actions.find(i => i.group === inputR3)?.specAction
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
export function checkOutsAndRuns(actions: WBSCAction[]) {
  let outs = 0
  let runs = 0

  actions.forEach((action) => {
    if (action.out === true) {
      outs++
    }
    if (action.targetBase === 4 && action.out === false) {
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
export function checkOutcome(actions: WBSCAction[]) {
  let validation = ''

  let currentBatter = -1
  let playerWasOut = false
  const reachedBases: number[] = []

  actions.forEach((action) => {
    if (currentBatter === action.batter) {
      if (action.out) {
        // this is probably a dead code after #60
        if (playerWasOut) {
          validation = attachValidation(validation, useT('editor.validation.noOutAfterOut'))
        } else {
          playerWasOut = true
          validation = attachValidation(validation, useT('editor.validation.noAdvanceAfterOut'))
        }
      }
      const currentReachedBase = Math.max(action.base, action.outputBase)
      const maxReachedBase = reachedBases[reachedBases.length - 1] || currentReachedBase

      if (currentReachedBase > maxReachedBase || (currentReachedBase === maxReachedBase && noAdvActions.includes(action.specAction))) {
        validation = attachValidation(validation, useT('editor.validation.advanceInOrder'))
      }
    } else {
      // special case for "batter + same error"
      // this is probably a dead code after #60
      if (action.group === inputB) {
        if (action.base === 0 && action.outputBase > 1) {
          playerWasOut = true
          validation = attachValidation(validation, useT('editor.validation.noAdvanceAfterOut'))
        }
      }
      currentBatter = action.batter
      playerWasOut = action.out
      if (!playerWasOut) {
        reachedBases.push(Math.max(action.base, action.outputBase))
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
export function checkHit(actions: WBSCAction[]) {
  let validation = ''

  let hitPlay = false
  let runnerAt1 = false
  let runnerAt2 = false
  let forceOut = false
  let appealPlay = false

  actions.toReversed().forEach((action) => {
    switch (action.group) {
      case inputB:
        if (hitActions.includes(action.specAction)) {
          hitPlay = true
        }
        break
      case inputR1:
        runnerAt1 = true
        appealPlay = action.specAction === 'A'
        forceOut = action.specAction.startsWith('GO') || (appealPlay && hitPlay)
        break
      case inputR2:
        runnerAt2 = true
        appealPlay = appealPlay || action.specAction === 'A'
        forceOut = forceOut || (runnerAt1 && (action.specAction.startsWith('GO') || appealPlay))
        break
      case inputR3:
        appealPlay = appealPlay || action.specAction === 'A'
        forceOut = forceOut || (runnerAt1 && runnerAt2 && (action.specAction.startsWith('GO') || appealPlay))
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
export function checkAdvances(actions: WBSCAction[]) {
  let validation = ''

  if (actions.some(i => i.specAction === 'ADV') && !actions.some(i => i.group === inputB)) {
    validation = attachValidation(validation, useT('editor.validation.noADVWithoutBatter'))
  }

  actions.forEach((action) => {
    if (action.specAction === 'ADV' && ![inputR1, inputR2, inputR3].includes(action.group)) {
      validation = attachValidation(validation, useT('editor.validation.invalidADV'))
    }
  })
  return validation
}

// forced out may only happen if runner is being forced to run by runners behind him
// #154 - exception: runner is forced to return to base after fly-out
export function checkFO(actions: WBSCAction[]) {
  let validation = ''

  const givenFO = [false, false, false]
  const possibleFO = [false, false, false]
  let impossibleFO = false
  let flyout = false

  actions.toReversed().forEach((action) => {
    switch (action.group) {
      case inputB:
        possibleFO[0] = true // runner at 1st may be forced out at 2nd
        flyout = ['F', 'P', 'L', 'FF', 'FP', 'FL', 'FB', 'FFB'].includes(action.specAction)
        break
      case inputR1:
        possibleFO[1] = !!possibleFO[0] // runner at 2nd may be forced out at 3rd
        if (action.specAction === 'GO') {
          if (action.targetBase === 2) {
            givenFO[0] = true
          } else {
            impossibleFO = true
          }
        }
        break
      case inputR2:
        possibleFO[2] = !!possibleFO[0] && !!possibleFO[1] // runner at 3rd may be forced out at HP
        if (action.specAction === 'GO') {
          if (action.targetBase === 3) {
            givenFO[1] = true
          } else {
            impossibleFO = true
          }
        }
        break
      case inputR3:
        if (action.specAction === 'GO') {
          if (action.targetBase === 4) {
            givenFO[2] = true
          } else {
            impossibleFO = true
          }
        }
        break
      default:
        if (action.specAction === 'GO') {
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
export function checkFC(actions: WBSCAction[]) {
  let validation = ''

  let oSituation = false
  let oTarget = ''
  let oPlay = false
  let fcSituation = false
  let fcPlay = false
  let kfcSituation = false
  let kfcPlay = false

  actions.forEach((action) => {
    if (action.group === inputB) {
      if (['O', 'OCB', 'KSO', 'KLO', 'SFO'].includes(action.specAction)) {
        oSituation = true
        oTarget = getPos(action).at(0) || ''
      } else if (action.specAction === 'FC' || action.specAction === 'SHFC') {
        fcSituation = true
      } else if (action.specAction === 'KSFC' || action.specAction === 'KLFC') {
        kfcSituation = true
      }
    } else if (firstRunnerActions.includes(action.group)) {
      if (['GOT', 'GO', 'A', 'OBR_rin'].includes(action.specAction) || decisiveErrorActions.includes(action.specAction)) {
        oPlay = true
      } else if (action.specAction === 'ADV') {
        fcPlay = true
      } else if (action.specAction === 'PB') {
        kfcPlay = true
      }
    }
    // runners may also advance on "FC - occupied" (#209)
    if (action.specAction === 'o') {
      oSituation = true
      oTarget = getPos(action).at(0) || ''
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
    for (const action of actions) {
      if (firstRunnerActions.includes(action.group)) {
        if (oTarget === getPos(action).at(0) && action.specAction !== 'eDF') {
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
export function checkGDP(actions: WBSCAction[]) {
  let validation = ''

  let gdpSelected = false
  let gdpoSelected = false
  let gdpOuts = 0

  actions.forEach((action) => {
    // TODO maybe change impl to rely on "specAction" rather than "text1"?
    if (action.text1 === 'GDP' || action.text1 === 'GDPB' || action.text1 === 'GDPE') {
      gdpSelected = true
    } else if (action.text1 === 'GDPO') {
      gdpoSelected = true
    } else if (action.out || action.text1.includes('E') || action.text2?.includes('E')) {
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
export function checkSHSF(actions: WBSCAction[]) {
  let validation = ''

  let shSelected = false
  let sfSelected = false
  let advanceByBatter = false
  let runScored = false

  actions.forEach((action) => {
    if (action.specAction.startsWith('SH')) {
      shSelected = true
    } else if (action.specAction.startsWith('SF') || action.specAction === 'FSF') {
      sfSelected = true
    } else if (action.specAction === 'ADV') {
      advanceByBatter = true
      if (action.base === 4) {
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
    if (actions.some(i => firstRunnerActions.includes(i.group) && i.specAction.startsWith('GO'))) {
      validation = attachValidation(validation, useT('editor.validation.noSHAndO'))
    }
  }

  return validation
}

// there cannot be SB and CS in the same play
// when CS, other advances are indifference (O/)
// #277 - there cannot be decisive E2T after SB
export function checkSBCS(actions: WBSCAction[]) {
  let validation = ''

  let sbSelected = false
  let csSelected = false
  let invalidE2T = false

  actions.forEach((action) => {
    if (action.specAction === 'SB') {
      sbSelected = true
      if (action.group === inputR1) {
        const r1a = actions.find(i => i.group === inputR1a)
        invalidE2T = r1a?.specAction === 'ET' && r1a.pos1 === '2'
      } else if (action.group === inputR2) {
        const r2a = actions.find(i => i.group === inputR2a)
        invalidE2T = r2a?.specAction === 'ET' && r2a.pos1 === '2'
      }
    } else if (action.specAction.startsWith('CS')) {
      csSelected = true
    }
  })

  if (sbSelected && csSelected) {
    validation = attachValidation(validation, useT('editor.validation.noSBCS'))
  }
  if (invalidE2T) {
    validation = attachValidation(validation, useT('editor.validation.invalidE2T'))
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
export function checkExtraBaseAdvances(actions: WBSCAction[]) {
  let validation = ''

  let isWP = false
  let isPB = false
  let isBK = false
  let isIP = false

  let invalidWP = false
  let invalidPB = false

  actions.forEach((action) => {
    if (action.specAction.toUpperCase() === 'WP') {
      isWP = true
      if (!firstRunnerActions.includes(action.group) && !isAfterBB(actions) && !isAfterSB(actions)) {
        invalidWP = true
      }
    }
    if (action.specAction.toUpperCase() === 'PB') {
      isPB = true
      if (!firstRunnerActions.includes(action.group) && !isAfterBB(actions) && !isAfterSB(actions)) {
        invalidPB = true
      }
    }
    if (action.specAction.toUpperCase() === 'BK') {
      isBK = true
    }
    if (action.specAction.toUpperCase() === 'IP') {
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

function isAfterBB(actions: WBSCAction[]) {
  return actions.some(i => i.group === inputB && i.specAction === 'BB1')
}
function isAfterSB(actions: WBSCAction[]) {
  return actions.some(i => firstRunnerActions.includes(i.group) && i.specAction === 'SB')
}

// "no advance" must be the last play and target must be the closest base
// - this validation only checks the target base
// - last play is ensured by disabling extra inputs via `changeSpecificAction` result in wbsc-eval
export function checkNoAdvances(actions: WBSCAction[]) {
  let validation = ''

  let invalidNADV = false
  actions.toReversed().forEach((i) => {
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
// #285 RIN validations
export function checkOBRs(actions: WBSCAction[]) {
  let validation = ''

  let isRLE = false

  actions.forEach((action) => {
    if (action.specAction === 'OBR_rle') {
      isRLE = true
    }
  })

  if (isRLE && actions.length > 1) {
    validation = attachValidation(validation, useT('editor.validation.noPlayAfterRLE'))
  }

  const isHBB = actions.some(i => i.specAction === 'OBR_hbb')
  if (isHBB) {
    const bAction = actions.find(i => i.group === inputB)?.specAction
    if (bAction !== '1B') {
      validation = attachValidation(validation, useT('editor.validation.noHBBWithoutHit'))
    }
  }

  // #285 - batter can only be RIN out if a runner is also out
  const isBatterRIN = actions.some(i => i.specAction === 'OBR_RIN')
  if (isBatterRIN) {
    if (!actions.some(i => [inputR1, inputR2, inputR3].includes(i.group) && i.out === true)) {
      validation = attachValidation(validation, useT('editor.validation.noRINWithoutOut'))
    }
  }

  // #285 - RIN for runner is deadball => batter gets FC - Occupied and not a hit
  const isHit = actions.some(i => i.baseAction === 'Hit')
  if (isHit) {
    if (actions.some(i => [inputR1, inputR2, inputR3].includes(i.group) && i.specAction === 'OBR_rin')) {
      validation = attachValidation(validation, useT('editor.validation.noHitWithRIN'))
    }
  }

  return validation
}

// #206 - when there is a "dead-ball" play, only necessary forced advances of other runners are possible
// exception: OB2 + BK/IP (obstruction during squeeze play)
// #281 - dropped foul ball error must be the only play scored (ball is dead upon dropped in foul territory)
export function checkDeadBallPlays(actions: WBSCAction[]) {
  if (actions.some(i => i.specAction === 'EDFB') && actions.length > 1) {
    return useT('editor.validation.noPlayAfterEDFB')
  }

  if (actions.some(i => ['INT', 'OB', 'IBB1', 'HP'].includes(i.specAction))) {
    if (actions.some(i => i.group !== inputB && !i.specAction.includes('ADV') && (i.group !== inputR3 || !['BK', 'IP'].includes(i.specAction)))) {
      return useT('editor.validation.noPlayAfterDeadBall')
    }
    // the above still allows un-forced advances of R2 or R3
    const possibleAdvR2 = actions.some(i => i.group === inputR1)
    if (!possibleAdvR2 && actions.some(i => i.group === inputR2 && i.specAction === 'ADV')) {
      return useT('editor.validation.noPlayAfterDeadBall')
    }
    const possibleAdvR3 = possibleAdvR2 && actions.some(i => i.group === inputR2)
    if (!possibleAdvR3 && actions.some(i => i.group === inputR3 && i.specAction === 'ADV')) {
      return useT('editor.validation.noPlayAfterDeadBall')
    }
  }

  if (actions.some(i => i.specAction === 'BK')) {
    if (actions.some(i => i.specAction.toUpperCase() !== 'BK' && (i.group !== inputB || i.specAction !== 'OB' || getPos(i) !== '2'))) {
      return useT('editor.validation.noPlayAfterBK')
    }
  }

  if (actions.some(i => i.specAction === 'IP')) {
    if (actions.some(i => i.specAction.toUpperCase() !== 'IP' && (i.group !== inputB || i.specAction !== 'OB' || getPos(i) !== '2'))) {
      return useT('editor.validation.noPlayAfterIP')
    }
  }

  return ''
}

// eDF for runner is only possible when batter gets FC - occupied (#172)
export function checkExtraBaseDroppedFlyError(actions: WBSCAction[]) {
  let validation = ''

  const droppedFlyExtra = actions.some(o => o.specAction === 'eDF')
  if (droppedFlyExtra) {
    if (!actions.some(o => o.specAction === 'O' || o.specAction === 'OCB')) {
      validation = attachValidation(validation, useT('editor.validation.eDF'))
    }
  }

  return validation
}

// there must be corresponding error to link "same error" with
export function checkSameError(actions: WBSCAction[]) {
  let validation = ''

  // TODO some other computations may be also optimized like this?
  const seB = actions.some(o => o.specAction === 'se0')
  const seR1 = actions.some(o => o.specAction === 'se1')
  const seR2 = actions.some(o => o.specAction === 'se2')
  const seR3 = actions.some(o => o.specAction === 'se3')

  // error action happened
  let errB = false
  let errR1 = false
  let errR2 = false
  let errR3 = false

  actions.forEach((action) => {
    if (isError(action, errorActions)) {
      switch (action.group) {
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
  if (actions.some(o => o.specAction === 'oc')) {
    if (actions.some(o => o.specAction === 'oc' && o.group !== inputB1)) {
      validation = attachValidation(validation, useT('editor.validation.noExAdvFC'))
    }
  }
  if (seB) {
    const seBInvalid = actions.some(o => o.specAction === 'se0' && (o.group === inputB2 || o.group === inputB3))
    const seBActions = actions.filter(o => o.specAction === 'se0').map(o => getRunner(o.group))
    if (seBInvalid || seBActions.length !== new Set(seBActions).size) {
      validation = attachValidation(validation, useT('editor.validation.noExAdvSE').replace('#p#', 'B'))
    }
  }
  if (seR1) {
    const seBActions = actions.filter(o => o.specAction === 'se1').map(o => getRunner(o.group))
    if (seBActions.length !== new Set(seBActions).size) {
      validation = attachValidation(validation, useT('editor.validation.noExAdvSE').replace('#p#', 'R1'))
    }
  }
  if (seR2) {
    const seBActions = actions.filter(o => o.specAction === 'se2').map(o => getRunner(o.group))
    if (seBActions.length !== new Set(seBActions).size) {
      validation = attachValidation(validation, useT('editor.validation.noExAdvSE').replace('#p#', 'R2'))
    }
  }
  if (seR3) {
    const seBActions = actions.filter(o => o.specAction === 'se3').map(o => getRunner(o.group))
    if (seBActions.length !== new Set(seBActions).size) {
      validation = attachValidation(validation, useT('editor.validation.noExAdvSE').replace('#p#', 'R3'))
    }
  }

  return validation
}

// RUN cannot be marked as "earned" once there was a decessive error
export function checkEarnedRuns(actions: WBSCAction[]) {
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

  actions.forEach((action) => {
    const err = isError(action, decisiveErrorActions)
    const earned = isEarnedRun(action)
    const teamUnearned = isTeamUnearnedRun(action)

    switch (action.group) {
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
        tieR1 = action.tie
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
        tieR2 = action.tie
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
function isError(action: WBSCAction, actionList: string[]): boolean {
  return actionList.includes(action.specAction)
}
// helper to decide whether there is an earned run in current input
function isEarnedRun(action: WBSCAction): boolean {
  return (action.targetBase === 4 || action.outputBase === 4) && action.runtype === 'e'
}
// helper to decide whether there is a team unearned run in current input
function isTeamUnearnedRun(action: WBSCAction): boolean {
  return (action.targetBase === 4 || action.outputBase === 4) && action.runtype === 'tu'
}

// helper to attach new part of validation message to previous contents
function attachValidation(validation: string, newMessage: string) {
  if (validation !== '') {
    validation += '\n'
  }
  return validation + newMessage
}
