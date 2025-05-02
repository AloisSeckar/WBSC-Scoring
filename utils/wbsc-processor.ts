/* *************************************** */
/* wbsc-processor.ts                       */
/* Transform and process user's input      */
/* *************************************** */

import type { WBSCInput, WBSCOutput } from '@/composables/useInputStore'

// triggered when user hits 'generate action'
// get current inputs, process them and display the output
function processAction() {
  log.info('Getting input')

  // #265
  useEvalStore().softReset()

  const GUI = useGUIStore()
  const inputStore = useInputStore()

  // TODO skip "inputs" array creation
  const inputs = [] as WBSCInput[]

  const r3Input = inputStore.inputR3
  if (GUI.inputR3 && r3Input.baseAction) {
    inputs.push(r3Input)
  }

  const r2aInput = inputStore.inputR2a
  if (GUI.inputR2a && r2aInput.baseAction) {
    inputs.push(r2aInput)
  }

  const r2Input = inputStore.inputR2
  if (GUI.inputR2 && r2Input.baseAction) {
    inputs.push(r2Input)
  }

  const r1bInput = inputStore.inputR1b
  if (GUI.inputR1b && r1bInput.baseAction) {
    inputs.push(r1bInput)
  }

  const r1aInput = inputStore.inputR1a
  if (GUI.inputR1a && r1aInput.baseAction) {
    inputs.push(r1aInput)
  }

  const r1Input = inputStore.inputR1
  if (GUI.inputR1 && r1Input.baseAction) {
    inputs.push(r1Input)
  }

  const b3Input = inputStore.inputB3
  if (GUI.inputB3 && b3Input.baseAction) {
    inputs.push(b3Input)
  }

  const b2Input = inputStore.inputB2
  if (GUI.inputB2 && b2Input.baseAction) {
    inputs.push(b2Input)
  }

  const b1Input = inputStore.inputB1
  const bInput = inputStore.inputB
  let bErrorTarget: WBSCBase = 0
  let bRunType = 'e'
  let omitB1 = false
  if (GUI.inputB1 && b1Input.baseAction) {
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
      omitB1 = true
    } else {
      inputs.push(b1Input)
    }
  }

  if (GUI.inputB && bInput.baseAction) {
    inputs.push(bInput)
  }

  log.info('Evaluating output')

  let playersInvolved = 0
  useEvalStore().outs = []
  useEvalStore().concurrentPlays = []

  useEvalStore().batterAction = false
  useEvalStore().gdp = false
  useEvalStore().brokenDP = false

  // TODO revision of this approach
  const outputs = [] as WBSCOutput[]

  // runner 3
  let r3Output: WBSCOutput
  if (GUI.inputR3 && r3Input.baseAction) {
    playersInvolved += 1
    r3Output = processInput(r3Input, playersInvolved)
    outputs.push(r3Output)
  }

  // runner 2
  let r2Output: WBSCOutput
  if (GUI.inputR2 && r2Input.baseAction) {
    playersInvolved += 1

    const extraR2Output: WBSCOutput[] = []
    if (GUI.inputR2a && r2aInput.baseAction) {
      extraR2Output.push(processInput(r2aInput, playersInvolved))
    }

    r2Output = processInput(r2Input, playersInvolved)
    r2Output.extraOutput = extraR2Output
    outputs.push(r2Output)
  }

  // runner 1
  let r1Output: WBSCOutput
  if (GUI.inputR1 && r1Input.baseAction) {
    playersInvolved += 1

    const extraR1Output: WBSCOutput[] = []
    if (GUI.inputR1b && r1bInput.baseAction) {
      extraR1Output.push(processInput(r1bInput, playersInvolved))
    }
    if (GUI.inputR1a && r1aInput.baseAction) {
      if (r1Input.base) {
        r1aInput.origBase = r1Input.base
      }
      extraR1Output.push(processInput(r1aInput, playersInvolved))
    }

    r1Output = processInput(r1Input, playersInvolved)
    r1Output.extraOutput = extraR1Output
    outputs.push(r1Output)
  }

  // batter
  let bOutput: WBSCOutput
  let b1Output: WBSCOutput
  if (GUI.inputB && bInput.baseAction) {
    playersInvolved += 1

    const extraBatterOutput: WBSCOutput[] = []
    if (GUI.inputB3 && b3Input.baseAction) {
      extraBatterOutput.push(processInput(b3Input, playersInvolved))
    }
    if (GUI.inputB2 && b2Input.baseAction) {
      if (b1Input.base) {
        b2Input.origBase = b1Input.base
      }
      extraBatterOutput.push(processInput(b2Input, playersInvolved))
    }
    if (GUI.inputB1 && b1Input.baseAction && !omitB1) {
      if (bInput.base) {
        b1Input.origBase = bInput.base
      }
      b1Output = processInput(b1Input, playersInvolved)
      extraBatterOutput.push(b1Output)
    }

    useEvalStore().batterAction = true
    bOutput = processInput(bInput, playersInvolved)
    if (bErrorTarget > 0) {
      bOutput.errorTarget = bErrorTarget
      bOutput.run = bRunType
    }
    bOutput.extraOutput = extraBatterOutput
    outputs.push(bOutput)
  }

  // special case - double or triple followed by an error (#226)
  if ((bInput.specAction.startsWith('2') || bInput.specAction.startsWith('3'))
    && (b1Input.specAction.startsWith('e') || b1Input.specAction.startsWith('E'))) {
    b1Output!.base = bOutput!.base + 1 as WBSCBase
    b1Output!.origBase = bOutput!.base + 1 as WBSCBase
  }

  mergeBatterIndicators(outputs)
  adjustWPPB(outputs)
  adjustIO(outputs)
  connectSpecialCases(outputs)

  log.info('Validating data')

  const validation = checkUserInput(inputs, outputs)
  if (validation === '') {
    log.info('Rendering output')

    useCanvasStore().vOffset = 0

    const canvas = useCanvasStore().canvas as HTMLCanvasElement
    canvas.height = playersInvolved * h1 - ((playersInvolved - 1) * 8)

    if (!GUI.inputB) {
      useEvalStore().batter = playersInvolved + 1
    } else {
      useEvalStore().batter = playersInvolved
    }

    // current batter is not known in the time of input evaluation (we don't forsee number of players involved)
    // therefore placeholder is being used and here is replaced with actual number
    const batter = useEvalStore().batter.toString()
    outputs.forEach((o) => {
      o.text1 = o.text1.replace('#b#', batter)
      o.extraOutput?.forEach((o) => {
        o.text1 = o.text1.replace('#b#', batter)
      })
    })

    // render situations one by one
    let displayed = 0
    outputs.forEach((output) => {
      displayed += 1
      renderAction(displayed, true, output)
      useCanvasStore().vOffset += h1 - 8
    })

    connectOutsIfNeeded()
    removeDuplicateConnectors()
    connectConcurrentPlaysIfNeeded()
    log.info('Output rendered')
  } else {
    log.info('Invalid user input')
    useEvalStore().setError(validation)
  }
}

// helper for https://github.com/AloisSeckar/WBSC-Scoring/issues/188
function mergeBatterIndicators(outputs: WBSCOutput[]) {
  // render only one batter indicator - for the most advanced runner
  // other concurrent actions are connected to this play by other means
  let indicatorEncountered = false
  outputs.forEach((output) => {
    if (output.num) {
      if (indicatorEncountered) {
        output.num = false
      }
      indicatorEncountered = true
    }
  })
}

// helper for concurrent plays
// in situations with mupltiple outs some of the connectors may become obsolete
// as the situations were already bind together with multiple-out marker
// known cases:
// - ahead runner out at 3rd/Home + following runner advances to 2nd/3rd + batter out
function removeDuplicateConnectors() {
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
function adjustWPPB(outputs: WBSCOutput[]) {
  const strikeoutWPPB = outputs.filter(o => ['KSWP', 'KSPB', 'KLWP', 'KLPB'].includes(o.specAction))?.length > 0
  if (strikeoutWPPB) {
    outputs.forEach((output) => {
      if (output.text1 === 'WP#b#') {
        output.text1 = 'wp#b#'
      }
      if (output.text1 === 'PB#b#') {
        output.text1 = 'pb#b#'
      }
    })
    useEvalStore().concurrentPlays = useEvalStore().concurrentPlays.filter((p: ConcurrentPlay) => p.text1 !== 'WP#b#' && p.text1 !== 'PB#b#')
  }
}

// helper for https://github.com/AloisSeckar/WBSC-Scoring/issues/177
function adjustIO(outputs: WBSCOutput[]) {
  const batterAction = useInputStore().inputB.specAction
  const isIO = batterAction === 'INT' || batterAction === 'OB'
  if (isIO) {
    outputs.forEach((o) => {
      if (o.specAction === 'ADV') {
        o.text1 = '[' + o.text1 + ']'
      }
    })
  }
}

// helper for various special cases of concurrent plays
function connectSpecialCases(outputs: WBSCOutput[]) {
  const inputStore = useInputStore()
  const batterInput = inputStore.inputB
  const r1Input = inputStore.inputR1
  const r2Input = inputStore.inputR2
  const r3Input = inputStore.inputR3
  const r1SpecAction = r1Input?.specAction || ''
  const r2SpecAction = r2Input?.specAction || ''
  const r3SpecAction = r3Input?.specAction || ''

  // #189 - connect SB / CS / O/ with an extra base error
  // #176 - also connect "same error" with applicable connection action
  const extraBaseErrors = ['eF', 'eT'] // eDF doesn't apply here
  const sameError = ['se1', 'se2', 'se3']
  const connectingActions = ['SB', 'SBPOA', 'CSE', 'CSET', 'CSN', 'CSNT', 'POE', 'POEN', 'POCSE', 'POCSEN', 'CSO', 'PO', 'POCS', 'T', 'O/']
  const r1error = extraBaseErrors.includes(r1SpecAction) || sameError.includes(r1SpecAction)
  const r1connect = r1error || connectingActions.includes(r1SpecAction)
  const r2error = extraBaseErrors.includes(r2SpecAction) || sameError.includes(r2SpecAction)
  const r2connect = r2error || connectingActions.includes(r2SpecAction)
  const r3error = extraBaseErrors.includes(r3SpecAction) || sameError.includes(r3SpecAction)
  const r3connect = r3error || connectingActions.includes(r3SpecAction)

  const bOutput = outputs.find(o => o.group === inputB)
  const r1Output = outputs.find(o => o.group === inputR1)
  const r2Output = outputs.find(o => o.group === inputR2)
  const r3Output = outputs.find(o => o.group === inputR3)

  if (r1error && (r2connect || r3connect) && r1Output) {
    useEvalStore().pushConcurrentPlayIfNotAdded({
      batter: r1Output.batter,
      base: r1Output.base,
      out: r1Output.out,
      na: r1Output.na,
      text1: r1Output.text1,
    })
  }
  if (r2error && (r1connect || r3connect) && r2Output) {
    useEvalStore().pushConcurrentPlayIfNotAdded({
      batter: r2Output.batter,
      base: r2Output.base,
      out: r2Output.out,
      na: r2Output.na,
      text1: r2Output.text1,
    })
  }
  if (r3error && (r1connect || r2connect) && r3Output) {
    useEvalStore().pushConcurrentPlayIfNotAdded({
      batter: r3Output.batter,
      base: r3Output.base,
      out: r3Output.out,
      na: r3Output.na,
      text1: r3Output.text1,
    })
  }

  // connect SF + indifferece, if some runner advances because appeal play attempt for other runner (example 80)
  const batterAction = batterInput?.specAction
  const isSF = batterAction === 'SF' || batterAction === 'FSF'
  if (isSF) {
    const r1Indifference = r1Input?.specAction === 'O/'
    const r2Indifference = r2Input?.specAction === 'O/'

    if (r1Indifference || r2Indifference) {
      if (bOutput) {
        useEvalStore().pushConcurrentPlayIfNotAdded({
          batter: bOutput.batter,
          base: 0,
          out: true,
          na: false,
          text1: batterAction,
        })
      }
      if (r1Indifference && r1Output) {
        useEvalStore().pushConcurrentPlayIfNotAdded({
          batter: r1Output.batter,
          base: 2,
          out: false,
          na: false,
          text1: r1Output.text1,
        })
      }
      if (r2Indifference && r2Output) {
        useEvalStore().pushConcurrentPlayIfNotAdded({
          batter: r2Output.batter,
          base: 3,
          out: false,
          na: false,
          text1: r2Output.text1,
        })
      }
    }
  }

  // connect OB2 for batter + IP/BK to HP - a special case with obstructon during squeeze play (example 40 (42 for softball))
  const isOB2 = batterAction === 'OB' && getPos(batterInput) === '2'
  if (isOB2) {
    const r3ToHP = r3Input?.specAction === 'BK' || r3Input?.specAction === 'IP'
    if (r3ToHP) {
      if (r3Output) {
        useEvalStore().pushConcurrentPlayIfNotAdded({
          batter: r3Output.batter,
          base: 4,
          out: false,
          na: false,
          text1: r3Output.text1,
        })
      }
      if (bOutput) {
        useEvalStore().pushConcurrentPlayIfNotAdded({
          batter: bOutput.batter,
          base: 1,
          out: false,
          na: false,
          text1: batterAction,
        })
      }
    }
  }

  // #182 - connect "indifference" with runner out, not KSO (example 74)
  const isKSO = batterAction === 'KSO' || batterAction === 'KLO'
  if (isKSO) {
    const playWithIndifference = outputs.find(o => o.specAction === 'O/')
    const playWithOut = outputs.find(o => ['GO', 'GOT'].includes(o.specAction))
    const playToFix = useEvalStore().concurrentPlays.find(p => p.base === 1)
    if (playWithIndifference && playWithOut && playToFix) {
      playToFix.base = playWithOut.base
      playToFix.batter = playWithOut.batter
      playToFix.out = true
      playToFix.text1 = playWithOut.specAction
    }
  }

  // #164 - connect DIF + error/out
  const isDIF = batterAction === 'OBR_DIF'
  if (isDIF) {
    outputs.forEach((output) => {
      if (['OBR_DIF', 'GO', 'GOT', 'eF', 'eT'].includes(output.specAction)) {
        useEvalStore().pushConcurrentPlayIfNotAdded({
          batter: output.batter,
          base: output.base,
          out: output.out,
          na: false,
          text1: output.text1,
        })
      }
    })
  }

  // #168 - connect dropped fly error (ExF) + error/out
  const droppedFly = ['EDF', 'EDL', 'EDP'].includes(batterAction)
  if (droppedFly) {
    outputs.forEach((output) => {
      if (['EDF', 'EDL', 'EDP', 'GO', 'GOT'].includes(output.specAction)) {
        useEvalStore().pushConcurrentPlayIfNotAdded({
          batter: output.batter,
          base: output.base,
          out: output.out,
          na: false,
          text1: output.text1,
        })
      }
    })
  }

  // #172 - connect dropped fly extra base error + batter's action (occupied)
  const droppedFlyExtra = outputs.some(o => o.specAction === 'eDF')
  if (droppedFlyExtra) {
    outputs.forEach((output) => {
      if (['O', 'OCB', 'eDF'].includes(output.specAction)) {
        useEvalStore().pushConcurrentPlayIfNotAdded({
          batter: output.batter,
          base: output.base,
          out: output.out,
          na: false,
          text1: output.text1,
        })
      }
    })
  }

  // #256 - connect putout at home + WP/PB
  const outAtHome = r3SpecAction === 'GOT'
  const r1WpOrPb = r1Output && (r1SpecAction === 'WP' || r1SpecAction === 'PB')
  const r2WpOrPb = r2Output && (r2SpecAction === 'WP' || r2SpecAction === 'PB')

  if (outAtHome && (r1WpOrPb || r2WpOrPb)) {
    // runner from 3rd out at HP
    useEvalStore().pushConcurrentPlayIfNotAdded({
      batter: r3Output!.batter,
      base: 4,
      out: true,
      na: false,
      text1: r3Output!.text1,
    })
    if (r2WpOrPb) {
      // runner 2 advance on WP/PB
      useEvalStore().pushConcurrentPlayIfNotAdded({
        batter: r2Output!.batter,
        base: r2Output!.base,
        out: false,
        na: false,
        text1: r2Output!.text1,
      })
    }
    if (r1WpOrPb && !r2WpOrPb) {
      // runner 1 advance on WP/PB
      useEvalStore().pushConcurrentPlayIfNotAdded({
        batter: r1Output!.batter,
        base: r1Output!.base,
        out: false,
        na: false,
        text1: r1Output!.text1,
      })
    }
  }

  // #279 - strikeout + indifference advance + runner out (but no DP)
  const nodpStrikeout = ['KSR', 'KLR', 'KSWP', 'KLWP', 'KSPB', 'KLWP', 'KSO', 'KLO'].includes(batterAction)
  if (nodpStrikeout) {
    const connected = []
    if ((['GOT', 'GO', 'A'].includes(r1SpecAction) && r1Input.nodp) || r1SpecAction === 'O/') {
      connected.push(r1Output)
    }
    if ((['GOT', 'GO', 'A'].includes(r2SpecAction) && r2Input.nodp) || r2SpecAction === 'O/') {
      connected.push(r2Output)
    }
    if ((['GOT', 'GO', 'A'].includes(r3SpecAction) && r3Input.nodp) || r3SpecAction === 'O/') {
      connected.push(r3Output)
    }
    if (connected.length > 1) {
      connected.forEach((output) => {
        useEvalStore().pushConcurrentPlayIfNotAdded({
          batter: output!.batter,
          base: output!.base,
          out: output!.out,
          na: false,
          text1: output!.text1,
        })
      })
    }
  }
}

export {
  processAction,
}
