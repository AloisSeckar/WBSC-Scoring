/* *************************************** */
/* wbsc-processor.ts                       */
/* Transform and process user's input      */
/* *************************************** */

import { WBSCInput } from '@/composables/useInputStore'

// triggered when user hits 'generate action'
// get current inputs, process them and display the output
function processAction () {
  const inputs = [] as WBSCInput[]
  const r3Input = getInput(inputR3)
  if (r3Input) {
    inputs.push(r3Input)
  }
  const r2aInput = getInput(inputR2a)
  if (r2aInput) {
    inputs.push(r2aInput)
  }
  const r2Input = getInput(inputR2)
  if (r2Input) {
    inputs.push(r2Input)
  }
  const r1bInput = getInput(inputR1b)
  if (r1bInput) {
    inputs.push(r1bInput)
  }
  const r1aInput = getInput(inputR1a)
  if (r1aInput) {
    inputs.push(r1aInput)
  }
  const r1Input = getInput(inputR1)
  if (r1Input) {
    inputs.push(r1Input)
  }
  const b3Input = getInput(inputB3)
  if (b3Input) {
    inputs.push(b3Input)
  }
  const b2Input = getInput(inputB2)
  if (b2Input) {
    inputs.push(b2Input)
  }
  let b1Input = getInput(inputB1)
  const bInput = getInput(inputB)
  let bErrorTarget = 0
  let bRunType = 'e'
  if (b1Input) {
    // special case 1 - extra advance on error
    // special case 2 - multiple-base hit with later appeal play on some of the runners
    if (b1Input.specAction === 'se0' || b1Input.specAction === 'oc') {
      // extra validation required (see #112)
      const extraValidation = checkBInput(b1Input.specAction, bInput?.specAction || '')
      if (extraValidation !== '') {
        useEvalStore().setError(extraValidation)
        return
      }
      bErrorTarget = b1Input.base
      bRunType = b1Input.runtype || 'e'
      b1Input = null
    } else {
      inputs.push(b1Input)
    }
  }
  if (bInput) {
    inputs.push(bInput)
  }

  checkMultipleRunnerAdvances(inputs)

  let playersInvolved = 0
  useEvalStore().outs = []
  useEvalStore().concurrentPlays = []

  // runner 3
  if (r3Input) {
    playersInvolved += 1
    r3Input.output = processInput(r3Input, playersInvolved)
    r3Input.output.previousAdvance = true
  }

  // runner 2
  if (r2Input) {
    playersInvolved += 1
  }
  const extraR2Input = []
  if (r2aInput) {
    r2aInput.output = processInput(r2aInput, playersInvolved)
    extraR2Input.push(r2aInput)
  }
  if (r2Input) {
    r2Input.output = processInput(r2Input, playersInvolved)
    r2Input.output.previousAdvance = true
  }

  // runner 1
  if (r1Input) {
    playersInvolved += 1
  }
  const extraR1Input = []
  if (r1bInput) {
    r1bInput.output = processInput(r1bInput, playersInvolved)
    extraR1Input.push(r1bInput)
  }
  if (r1aInput) {
    if (r1Input && r1Input.base) {
      r1aInput.origBase = r1Input.base
    }
    r1aInput.output = processInput(r1aInput, playersInvolved)
    extraR1Input.push(r1aInput)
  }
  if (r1Input) {
    r1Input.output = processInput(r1Input, playersInvolved)
    r1Input.output.previousAdvance = true
  }

  // batter
  if (bInput) {
    playersInvolved += 1
  }
  const extraBatterInput = []
  if (b3Input) {
    b3Input.output = processInput(b3Input, playersInvolved)
    extraBatterInput.push(b3Input)
  }
  if (b2Input) {
    if (b1Input && b1Input.base) {
      b2Input.origBase = b1Input.base
    }
    b2Input.output = processInput(b2Input, playersInvolved)
    extraBatterInput.push(b2Input)
  }
  if (b1Input) {
    if (bInput && bInput.base) {
      b1Input.origBase = bInput.base
    }
    b1Input.output = processInput(b1Input, playersInvolved)
    extraBatterInput.push(b1Input)
  }
  if (bInput) {
    bInput.output = processInput(bInput, playersInvolved)
    if (bErrorTarget > 0) {
      bInput.output.errorTarget = bErrorTarget
      bInput.output.run = bRunType
    }
  }

  const validation = checkUserInput(inputs)
  if (validation === '') {
    useCanvasStore().vOffset = 0

    const canvas = useCanvasStore().canvas as HTMLCanvasElement
    canvas.height = playersInvolved * h1 - ((playersInvolved - 1) * 8)

    if (!bInput) {
      useEvalStore().batter = playersInvolved + 1
    } else {
      useEvalStore().batter = playersInvolved
    }

    // current batter is not known in the time of input evaluation (we don't forsee number of players involved)
    // therefore placeholder is being used and here is replaced with actual number
    for (let i = 0; i < inputs.length; i += 1) {
      const output = inputs[i].output
      if (output) {
        output.text1 = output.text1.replace('#b#', useEvalStore().batter.toString())
      }
    }

    // render situations one by one
    let displayed = 0
    if (r3Input) {
      displayed += 1
      renderAction(displayed, true, r3Input)
      useCanvasStore().vOffset += h1 - 8
    }
    if (r2Input) {
      displayed += 1
      renderAction(displayed, true, r2Input, extraR2Input)
      useCanvasStore().vOffset += h1 - 8
    }
    if (r1Input) {
      displayed += 1
      renderAction(displayed, true, r1Input, extraR1Input)
      useCanvasStore().vOffset += h1 - 8
    }
    if (bInput) {
      displayed += 1
      renderAction(displayed, true, bInput, extraBatterInput)
      useCanvasStore().vOffset += h1 - 8
    }

    connectOutsIfNeeded()
    removeDuplicateConnectors()
    connectConcurrentPlaysIfNeeded()
  } else {
    useEvalStore().setError(validation)
  }
}

// get current value from 'base' select for given input group
function getBaseSelection (group: string): number {
  let base = 1

  const baseSelect = document.getElementById(group + inputBase) as HTMLInputElement
  if (baseSelect) {
    base = parseInt(baseSelect.value)
  }

  return base
}

// get current value from 'tiebreak' checker for given input group
function getTIESelection (group: string): boolean {
  let tie = false

  const tieCheck = document.getElementById(group + inputTie) as HTMLInputElement
  if (tieCheck) {
    tie = tieCheck.checked
  }

  return tie
}

// returns original base based on input group
function getOrigBase (group: string): number {
  switch (group) {
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

// get current value from 'run' select for given input group
function getRunTypeSelection (group: string): string {
  let run = 'e'

  const runtypeSelect = document.getElementById(group + inputRuntype) as HTMLInputElement
  if (runtypeSelect) {
    run = runtypeSelect.value
  }

  return run
}

// get current values from 'involved' selects for given input group
function getPosSelection (group: string) {
  let selection = ''

  const container = document.getElementById(group + inputPosition) as HTMLElement
  const posCount = container.getElementsByClassName(classWbscPos)
  for (let i = 0; i < posCount.length; i += 1) {
    const item = posCount.item(i) as HTMLInputElement
    selection += item.value
  }

  useEvalStore().setPosSelection(group + inputPosition, selection)

  return selection
}

// get and wrap current user input for given input group
function getInput (group: string, plain?: boolean): WBSCInput | null {
  let input = null

  const container = document.getElementById(group)
  if (container) {
    const baseAction = document.getElementById(group + inputBaseAction) as HTMLInputElement
    const specAction = document.getElementById(group + inputSpecAction) as HTMLInputElement

    input = getEmptyInput(!!plain)
    input.group = group
    input.baseAction = baseAction.value
    input.specAction = specAction.value
    input.tie = getTIESelection(group)
    input.origBase = getOrigBase(group)
    input.base = getBaseSelection(group)
    input.runtype = getRunTypeSelection(group)
    input.pos = getPosSelection(group)
  }

  return input
}

// helper for https://github.com/AloisSeckar/WBSC-Scoring/issues/10
function checkMultipleRunnerAdvances (inputArr: WBSCInput[]) {
  // first encountered will be uppercase, possible others lowercase
  let advanceEncountered = false
  for (let i = 0; i < inputArr.length; i += 1) {
    const current = inputArr[i]
    const action = current?.specAction
    if (action === 'WP' || action === 'PB' || action === 'BK' || action === 'IP') {
      if (advanceEncountered) {
        current.specAction = action.toLowerCase()
      }
      advanceEncountered = true
    }
  }
}

// helper for concurrent plays
// in situations with mupltiple outs some of the connectors may become obsolete
// as the situations were already bind together with multiple-out marker
// known cases:
// - ahead runner out at 3rd/Home + following runner advances to 2nd/3rd + batter out
function removeDuplicateConnectors () {
  let runner23Out = false
  let runner12Advance = false
  let batterOut = false
  for (let i = 0; i < useEvalStore().outs.length; i += 1) {
    const base = useEvalStore().outs[i].base
    if (base === 4 || base === 3) {
      runner23Out = true
    }
    if (base === 0) {
      batterOut = true
    }
  }
  for (let i = 0; i < useEvalStore().concurrentPlays.length; i += 1) {
    const base = useEvalStore().concurrentPlays[i].base
    const out = useEvalStore().concurrentPlays[i].out
    if ((base === 3 || base === 2) && !out) {
      runner12Advance = true
    }
  }

  // if conditions are met, remove the first connector
  // (evaluation always goes from most ahead runner)
  if (runner23Out === true && runner12Advance === true && batterOut === true) {
    useEvalStore().concurrentPlays.shift()
  }
}

export {
  processAction, getPosSelection, getInput
}
