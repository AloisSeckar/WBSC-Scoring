/* **************************************** */
/* wbsc-validation.js                       */
/* Validate user's input to eliminate plays */
/* that are clearly impossible.             */
/* **************************************** */

import { WBSCInput } from './useInputStore'

// validation sequence to be run over given outputs
// (this should be the single point of entry to validatons)
// (called from wbsc-processor.processAction())
function checkUserInput (inputs: WBSCInput[]) {
  let validation = ''

  // 1) validations to be run over each input separately
  for (let i = 0; i < inputs.length; i += 1) {
    if (inputs[i] != null) {
      if (inputs[i].baseAction && inputs[i].specAction) {
        const minPosItems = useEvalStore().getMinPosItems(inputs[i].group)
        const posSelection = inputs[i].pos
        if (minPosItems > 0 && (!posSelection || posSelection.length < minPosItems)) {
          validation = attachValidation(validation, `At least ${minPosItems} involved positions must be selected for current action`)
        } else if (posSelection) {
          validation = attachValidation(validation, checkPosSelection(posSelection))
        }
      } else {
        validation = attachValidation(validation, 'Action must be properly defined')
      }
    }
  }

  // 2) validations over all outputs
  validation = attachValidation(validation, checkMaxOuts(inputs))
  validation = attachValidation(validation, checkOutcome(inputs))
  validation = attachValidation(validation, checkGDP(inputs))

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

  for (let i = 0; i < inputs.length; i += 1) {
    const output = inputs[i].output
    if (output && output.out === true) {
      outs++
    }
  }

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
  const reachedBases = []

  for (let i = 0; i < inputs.length; i += 1) {
    const output = inputs[i].output
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
        currentBatter = output.batter
        playerWasOut = output.out
        reachedBases.push(output.base)
      }
    }
  }

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

// if GDP (GDPE) is selected for batter
// there has to be at least 1 correspondig out/decessive error situatuon for runners
function checkGDP (inputs: WBSCInput[]) {
  let validation = ''

  let gdpSelected = false
  let gdpOut = false

  for (let i = 0; i < inputs.length; i += 1) {
    const output = inputs[i].output
    if (output) {
      if (output.text1 === 'GDP' || output.text1 === 'GDPE') {
        gdpSelected = true
      } else if (output.out === true || output.text1.includes('E') ||
                (output.text2 && output.text2.includes('E'))) {
        gdpOut = true
      }
    }
  }

  if (gdpSelected === true && gdpOut === false) {
    validation = attachValidation(validation, 'GDP is selected, but corresponding out/decessive error is missing')
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
