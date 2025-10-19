/* *************************************** */
/* wbsc-processor.ts                       */
/* Transform and process user's input      */
/* *************************************** */

// triggered when user hits 'generate action'
// get current inputs, process them and display the output
function processAction() {
  log.info('Getting input')

  const inputStore = useInputStore()

  // #265
  useEvalStore().softReset()

  // get all inputs that are visible and filled
  const actions = inputStore.getInputs()

  // edge-cases for batter
  const b1Input = inputStore.inputB1
  const bInput = inputStore.inputB
  let bActionTarget: WBSCBase = 0
  let bRunType = 'e'
  let omitB1 = false
  if (b1Input.visible && b1Input.baseAction) {
    // special case 1 - extra advance on error
    // special case 2 - multiple-base hit with later appeal play on some of the runners
    if (b1Input.specAction === 'se0' || b1Input.specAction === 'oc') {
      // extra validation required (see #112)
      const extraValidation = checkBInput(b1Input.specAction, bInput?.specAction || '')
      if (extraValidation !== '') {
        useEvalStore().setError(extraValidation)
        return
      }
      bActionTarget = b1Input.base // here must be the "input" base, because evaluation happens later
      bRunType = b1Input.runtype || 'e'
      // result of subsequent action was transfered to input-b
      // remove input-b1 from actions to be evaluated and rendered
      omitB1 = true
      actions.splice(actions.findIndex(a => a.group === inputB1), 1)
    }
  }

  log.info('Evaluating output')

  useEvalStore().outs = []
  useEvalStore().concurrentPlays = []

  useEvalStore().batterAction = false
  useEvalStore().gdp = false
  useEvalStore().brokenDP = false

  // do basic evaluation for each input
  actions.forEach((action) => {
    processInput(action)
  })

  // edge-cases for runner 1
  if (actions.some(a => a.group === inputR1a)) {
    // adjust r1a input, if r1 input spans across 2 bases
    inputStore.inputR1a.origBase = inputStore.inputR1.base
  }

  // edge-cases for batter
  if (actions.some(a => a.group === inputB)) {
    // indicate batter being involved in this play (not only the runners)
    // (used for proper displaying of the batter indicator in corner in plays like CS or O/)
    useEvalStore().batterAction = true

    // adjust b2 input, if b1 input spans across 2 bases
    if (actions.some(a => a.group === inputB2)) {
      inputStore.inputB2.origBase = inputStore.inputB1.base
    }

    // adjust b1 input, if b input spans across 2 bases
    if (actions.some(a => a.group === inputB1) && !omitB1) {
      inputStore.inputB1.origBase = inputStore.inputB.base
    }

    // adjust b input for extra advance on error or hit reverted by appeal play
    if (bActionTarget > 0) {
      bInput.targetBase = bActionTarget
      bInput.outputBase = bInput.origBase + 1 as WBSCBase
      bInput.runtype = bRunType
    }

    // adjust inputs for double or triple followed by an error (#226)
    if ((bInput?.specAction.startsWith('2') || bInput?.specAction.startsWith('3'))
      && (b1Input?.specAction.startsWith('e') || b1Input?.specAction.startsWith('E'))) {
      b1Input.origBase = bInput.targetBase as WBSCBase
      b1Input.outputBase = bInput.targetBase + 1 as WBSCBase
    }
  }

  mergeBatterIndicators(actions)
  adjustWPPB(actions)
  adjustIO(actions)
  connectSpecialCases(actions)

  const inputsVisible = [
    inputStore.isVisible(inputB),
    inputStore.isVisible(inputR1),
    inputStore.isVisible(inputR2),
    inputStore.isVisible(inputR3),
  ]
  const playersInvolved = inputsVisible.filter(Boolean).length

  log.info('Validating data')

  const validation = checkUserInput(actions)
  if (validation === '') {
    log.info('Rendering output')

    useCanvasStore().vOffset = 0

    const canvas = useCanvasStore().canvas as HTMLCanvasElement
    canvas.height = playersInvolved * h1 - ((playersInvolved - 1) * 8)

    if (!bInput.visible) {
      useEvalStore().batter = playersInvolved + 1
    } else {
      useEvalStore().batter = playersInvolved
    }

    // current batter is not known in the time of input evaluation (we don't forsee number of players involved)
    // therefore placeholder is being used and here is replaced with actual number

    const batter = useEvalStore().batter.toString()
    actions.forEach((a) => {
      a.text1 = a.text1.replace('#b#', batter)
    })

    // render situations one by one
    let displayed = 0
    actions.forEach((action) => {
      // start rendering only for basic positions (B, R1, R2 or R3)
      // possible extra actions are injected are injected as extra params
      if (firstActions.includes(action.group)) {
        displayed += 1
        renderAction(displayed, true, action, getExtraActions(action.group, omitB1))
        useCanvasStore().vOffset += h1 - 8
      }
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

// extract subsequent actions for given player from a "flat" input array
// omitB1 is special case for extra base errors or FCs - see evaluation in processAction
function getExtraActions(group: string, omitB1: boolean): WBSCAction[] {
  const extraActions = [] as WBSCAction[]

  const inputStore = useInputStore()
  const b1 = inputStore.inputB1
  const b2 = inputStore.inputB2
  const b3 = inputStore.inputB3
  const r1a = inputStore.inputR1a
  const r1b = inputStore.inputR1b
  const r2a = inputStore.inputR2a

  switch (group) {
    case inputB:
      if (b1.visible && b1.baseAction && !omitB1) {
        extraActions.push(b1)
      }
      if (b2.visible && b2.baseAction) {
        extraActions.push(b2)
      }
      if (b3.visible && b3.baseAction) {
        extraActions.push(b3)
      }
      break
    case inputR1:
      if (r1a.visible && r1a.baseAction) {
        extraActions.push(r1a)
      }
      if (r1b.visible && r1b.baseAction) {
        extraActions.push(r1b)
      }
      break
    case inputR2:
      if (r2a.visible && r2a.baseAction) {
        extraActions.push(r2a)
      }
      break
  }
  return extraActions
}

// helper for https://github.com/AloisSeckar/WBSC-Scoring/issues/188
function mergeBatterIndicators(actions: WBSCAction[]) {
  // render only one batter indicator - for the most advanced runner
  // other concurrent actions are connected to this play by other means
  let indicatorEncountered = false
  actions.forEach((action) => {
    if (action.num) {
      if (indicatorEncountered) {
        action.num = false
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
function adjustWPPB(actions: WBSCAction[]) {
  const strikeoutWPPB = actions.filter(a => ['KSWP', 'KSPB', 'KLWP', 'KLPB'].includes(a.specAction))?.length > 0
  if (strikeoutWPPB) {
    actions.forEach((action) => {
      if (action.text1 === 'WP#b#') {
        action.text1 = 'wp#b#'
      }
      if (action.text1 === 'PB#b#') {
        action.text1 = 'pb#b#'
      }
    })
    useEvalStore().concurrentPlays = useEvalStore().concurrentPlays.filter((p: ConcurrentPlay) => p.text1 !== 'WP#b#' && p.text1 !== 'PB#b#')
  }
}

// helper for https://github.com/AloisSeckar/WBSC-Scoring/issues/177
function adjustIO(actions: WBSCAction[]) {
  const batterAction = useInputStore().inputB.specAction
  const isIO = batterAction === 'INT' || batterAction === 'OB'
  if (isIO) {
    actions.forEach((a) => {
      if (a.specAction === 'ADV') {
        a.text1 = '[' + a.text1 + ']'
      }
    })
  }
}

// helper for various special cases of concurrent plays
function connectSpecialCases(actions: WBSCAction[]) {
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

  const bOutput = actions.find(a => a.group === inputB)
  const r1Output = actions.find(a => a.group === inputR1)
  const r2Output = actions.find(a => a.group === inputR2)
  const r3Output = actions.find(a => a.group === inputR3)

  if (r1error && (r2connect || r3connect) && r1Output) {
    useEvalStore().pushConcurrentPlayIfNotAdded({
      batter: r1Output.batter,
      base: r1Output.outputBase,
      out: r1Output.out,
      na: r1Output.na,
      text1: r1Output.text1,
    })
  }
  if (r2error && (r1connect || r3connect) && r2Output) {
    useEvalStore().pushConcurrentPlayIfNotAdded({
      batter: r2Output.batter,
      base: r2Output.outputBase,
      out: r2Output.out,
      na: r2Output.na,
      text1: r2Output.text1,
    })
  }
  if (r3error && (r1connect || r2connect) && r3Output) {
    useEvalStore().pushConcurrentPlayIfNotAdded({
      batter: r3Output.batter,
      base: r3Output.outputBase,
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
    const playWithIndifference = actions.find(a => a.specAction === 'O/')
    const playWithOut = actions.find(a => ['GO', 'GOT'].includes(a.specAction))
    const playToFix = useEvalStore().concurrentPlays.find(p => p.base === 1)
    if (playWithIndifference && playWithOut && playToFix) {
      playToFix.base = playWithOut.outputBase
      playToFix.batter = playWithOut.batter
      playToFix.out = true
      playToFix.text1 = playWithOut.specAction
    }
  }

  // #164 - connect DIF + error/out
  const isDIF = batterAction === 'OBR_DIF'
  if (isDIF) {
    actions.forEach((action) => {
      if (['OBR_DIF', 'GO', 'GOT', 'eF', 'eT'].includes(action.specAction)) {
        useEvalStore().pushConcurrentPlayIfNotAdded({
          batter: action.batter,
          base: action.outputBase,
          out: action.out,
          na: false,
          text1: action.text1,
        })
      }
    })
  }

  // #168 - connect dropped fly error (ExF) + error/out
  const droppedFly = ['EDF', 'EDL', 'EDP'].includes(batterAction)
  if (droppedFly) {
    actions.forEach((action) => {
      if (['EDF', 'EDL', 'EDP', 'GO', 'GOT'].includes(action.specAction)) {
        useEvalStore().pushConcurrentPlayIfNotAdded({
          batter: action.batter,
          base: action.outputBase,
          out: action.out,
          na: false,
          text1: action.text1,
        })
      }
    })
  }

  // #172 - connect dropped fly extra base error + batter's action (occupied)
  const droppedFlyExtra = actions.some(a => a.specAction === 'eDF')
  if (droppedFlyExtra) {
    actions.forEach((action) => {
      if (['O', 'OCB', 'eDF'].includes(action.specAction)) {
        useEvalStore().pushConcurrentPlayIfNotAdded({
          batter: action.batter,
          base: action.outputBase,
          out: action.out,
          na: false,
          text1: action.text1,
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
        base: r2Output!.outputBase,
        out: false,
        na: false,
        text1: r2Output!.text1,
      })
    }
    if (r1WpOrPb && !r2WpOrPb) {
      // runner 1 advance on WP/PB
      useEvalStore().pushConcurrentPlayIfNotAdded({
        batter: r1Output!.batter,
        base: r1Output!.outputBase,
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
          base: output!.outputBase,
          out: output!.out,
          na: false,
          text1: output!.text1,
        })
      })
    }
  }
}

// helper for deter

export {
  processAction,
}
