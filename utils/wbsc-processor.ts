/* *************************************** */
/* wbsc-processor.ts                       */
/* Transform and process user's input      */
/* *************************************** */

import type { WBSCInput } from '@/composables/useInputStore'

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

  useEvalStore().batterAction = false
  useEvalStore().gdp = false
  useEvalStore().brokenDP = false

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
    useEvalStore().batterAction = true
    bInput.output = processInput(bInput, playersInvolved)
    if (bErrorTarget > 0) {
      bInput.output.errorTarget = bErrorTarget
      bInput.output.run = bRunType
    }
  }

  mergeBatterIndicators(inputs)
  adjustWPPB(inputs)
  adjustIO(inputs)
  connectSpecialCases(inputs)

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
      const output = inputs[i]?.output
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
    if (current) {
      const action = current.specAction
      if (action === 'WP' || action === 'PB' || action === 'BK' || action === 'IP') {
        if (advanceEncountered) {
          current.specAction = action.toLowerCase()
        }
        advanceEncountered = true
      }
    }
  }
}

// helper for https://github.com/AloisSeckar/WBSC-Scoring/issues/188
function mergeBatterIndicators (inputArr: WBSCInput[]) {
  // render only one batter indicator - for the most advanced runner
  // other concurrent actions are connected to this play by other means
  let indicatorEncountered = false
  for (const input of inputArr) {
    if (input.output?.num) {
      if (indicatorEncountered) {
        input.output.num = false
      }
      indicatorEncountered = true
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
    const base = useEvalStore().outs[i]?.base
    if (base === 4 || base === 3) {
      runner23Out = true
    }
    if (base === 0) {
      batterOut = true
    }
  }
  for (let i = 0; i < useEvalStore().concurrentPlays.length; i += 1) {
    const base = useEvalStore().concurrentPlays[i]?.base
    const out = useEvalStore().concurrentPlays[i]?.out
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

// helper for https://github.com/AloisSeckar/WBSC-Scoring/issues/178
function adjustWPPB (inputArr: WBSCInput[]) {
  const strikeoutWPPB = inputArr.filter(i => ['KSWP', 'KSPB', 'KLWP', 'KLPB'].includes(i.specAction))?.length > 0
  if (strikeoutWPPB) {
    inputArr.forEach((i) => {
      if (i.output?.text1 === 'WP#b#') {
        i.output.text1 = 'wp#b#'
      }
      if (i.output?.text1 === 'PB#b#') {
        i.output.text1 = 'pb#b#'
      }
    })
    useEvalStore().concurrentPlays = useEvalStore().concurrentPlays.filter((p: ConcurrentPlay) => p.text1 !== 'WP#b#' && p.text1 !== 'PB#b#')
  }
}

// helper for https://github.com/AloisSeckar/WBSC-Scoring/issues/177
function adjustIO (inputArr: WBSCInput[]) {
  const batterAction = inputArr.filter(i => i.group === inputB)?.[0]?.specAction
  const isIO = batterAction === 'INT' || batterAction === 'OB'
  if (isIO) {
    inputArr.forEach((i) => {
      if (i.specAction === 'ADV') {
        i.output!.text1 = '[' + i.output!.text1 + ']'
      }
    })
  }
}

// helper for https://github.com/AloisSeckar/WBSC-Scoring/issues/189
function connectSpecialCases (inputArr: WBSCInput[]) {
  const batterInput = inputArr.find(i => i.group === inputB)
  const r1Input = inputArr.find(i => i.group === inputR1)
  const r2Input = inputArr.find(i => i.group === inputR2)
  const r3Input = inputArr.find(i => i.group === inputR3)
  const r1SpecAction = r1Input?.specAction || ''
  const r2SpecAction = r2Input?.specAction || ''
  const r3SpecAction = r3Input?.specAction || ''

  // #189 - connect SB / CS / O/ with an extra base error
  // #176 - also connect "same error" with applicable connection action
  const extraBaseErrors = ['eF', 'eT']
  const sameError = ['se1', 'se2', 'se3']
  const connectingActions = ['SB', 'SBPOA', 'CSE', 'CSET', 'CSN', 'CSNT', 'POE', 'POEN', 'POCSE', 'POCSEN', 'CSO', 'PO', 'POCS', 'T', 'O/']
  const r1error = extraBaseErrors.includes(r1SpecAction) || sameError.includes(r1SpecAction)
  const r1connect = r1error || connectingActions.includes(r1SpecAction)
  const r2error = extraBaseErrors.includes(r2SpecAction) || sameError.includes(r2SpecAction)
  const r2connect = r2error || connectingActions.includes(r2SpecAction)
  const r3error = extraBaseErrors.includes(r3SpecAction) || sameError.includes(r3SpecAction)
  const r3connect = r3error || connectingActions.includes(r3SpecAction)

  if (r1error && (r2connect || r3connect)) {
    const r1Output = r1Input!.output!
    useEvalStore().pushConcurrentPlayIfNotAdded({
      batter: r1Output.batter,
      base: r1Output.base,
      out: r1Output.out,
      na: r1Output.na,
      text1: r1Output.text1
    })
  }
  if (r2error && (r1connect || r3connect)) {
    const r2Output = r2Input!.output!
    useEvalStore().pushConcurrentPlayIfNotAdded({
      batter: r2Output.batter,
      base: r2Output.base,
      out: r2Output.out,
      na: r2Output.na,
      text1: r2Output.text1
    })
  }
  if (r3error && (r1connect || r2connect)) {
    const r3Output = r3Input!.output!
    useEvalStore().pushConcurrentPlayIfNotAdded({
      batter: r3Output.batter,
      base: r3Output.base,
      out: r3Output.out,
      na: r3Output.na,
      text1: r3Output.text1
    })
  }

  // connect SF + indifferece, if some runner advances because appeal play attempt for other runner (example 80)
  const batterAction = batterInput?.specAction
  const isSF = batterAction === 'SF' || batterAction === 'FSF'
  if (isSF) {
    const r1Indifference = r1Input?.specAction === 'O/'
    const r2Indifference = r2Input?.specAction === 'O/'

    if (r1Indifference || r2Indifference) {
      useEvalStore().pushConcurrentPlayIfNotAdded({
        batter: batterInput!.output!.batter,
        base: 0,
        out: true,
        na: false,
        text1: batterAction
      })
      if (r1Indifference) {
        useEvalStore().pushConcurrentPlayIfNotAdded({
          batter: r1Input!.output!.batter,
          base: 2,
          out: false,
          na: false,
          text1: r1Input!.output!.text1
        })
      }
      if (r2Indifference) {
        useEvalStore().pushConcurrentPlayIfNotAdded({
          batter: r2Input!.output!.batter,
          base: 3,
          out: false,
          na: false,
          text1: r2Input!.output!.text1
        })
      }
    }
  }

  // connect OB2 for batter + IP/BK to HP - a special case with obstructon during squeeze play (example 40 (42 for softball))
  const isOB2 = batterAction === 'OB' && batterInput?.pos === '2'
  if (isOB2) {
    const r3ToHP = r3Input?.specAction === 'BK' || r3Input?.specAction === 'IP'
    if (r3ToHP) {
      useEvalStore().pushConcurrentPlayIfNotAdded({
        batter: r3Input!.output!.batter,
        base: 4,
        out: false,
        na: false,
        text1: r3Input!.output!.text1
      })
      useEvalStore().pushConcurrentPlayIfNotAdded({
        batter: batterInput!.output!.batter,
        base: 1,
        out: false,
        na: false,
        text1: batterAction
      })
    }
  }

  // #182 - connect "indifference" with runner out, not KSO (example 74)
  const isKSO = batterAction === 'KSO' || batterAction === 'KLO'
  if (isKSO) {
    const playWithIndifference = inputArr.find(i => i.specAction === 'O/')
    const playWithOut = inputArr.find(i => ['GO', 'GOT'].includes(i.specAction))
    const playToFix = useEvalStore().concurrentPlays.find(p => p.base === 1)
    if (playWithIndifference && playWithOut && playToFix) {
      playToFix.base = playWithOut.base
      playToFix.batter = playWithOut.output!.batter
      playToFix.out = true
      playToFix.text1 = playWithOut.specAction
    }
  }
}

export {
  processAction, getPosSelection, getInput
}
