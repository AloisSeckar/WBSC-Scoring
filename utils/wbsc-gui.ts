/* *************************************** */
/* wbsc-gui.ts                             */
/* helper functions for working with GUI   */
/* *************************************** */

export function getBaseOptionsValue(inputGroup: string) {
  switch (inputGroup) {
    case inputB1:
    case inputR1:
      return 1
    case inputB2:
    case inputR1a:
    case inputR2:
      return 2
    case inputB3:
    case inputR1b:
    case inputR2a:
    case inputR3:
      return 3
  }
  return 0
}

export function renderBaseOptions(base: number): GUIOption[] {
  const options = []
  if (base < 2) {
    options.push({ value: 2, label: useT('editor.base.second'), selected: base === 1 })
  }
  if (base < 3) {
    options.push({ value: 3, label: useT('editor.base.third'), selected: base === 2 })
  }
  options.push({ value: 4, label: useT('editor.base.home'), selected: base === 3 })
  return options
}

export function renderBaseActionOptions(inputGroup: string): GUIOption[] {
  switch (inputGroup) {
    case inputB:
      return renderBatterActionOptions()
    case inputB1:
    case inputB2:
    case inputB3:
      return renderBatterRunnerActionOptions()
    case inputR1:
    case inputR1a:
    case inputR1b:
    case inputR2:
    case inputR2a:
    case inputR3:
      return renderRunnerActionOptions()
    default:
      return []
  }
}

function renderBatterActionOptions(): GUIOption[] {
  return [
    { value: '', label: '' },
    { value: 'StrikeOut', label: useT('editor.action.strikeOut.title') },
    { value: 'GroundOut', label: useT('editor.action.groundOut.title') },
    { value: 'FlyOut', label: useT('editor.action.flyOut.title') },
    { value: 'Hit', label: useT('editor.action.hit.title') },
    { value: 'Sacrifice', label: useT('editor.action.sacrifice.title') },
    { value: 'FC', label: useT('editor.action.fc.title') },
    { value: 'Error', label: useT('editor.action.error.title') },
    { value: 'Advance', label: useT('editor.action.advance.title') },
    { value: 'OBR', label: useT('editor.action.obr.title') },
    { value: 'Other', label: useT('editor.action.other.title') },
  ]
}

function renderBatterRunnerActionOptions(): GUIOption[] {
  return [
    { value: '', label: '' },
    { value: 'exb', label: useT('editor.action.extraBase.title') },
    { value: 'fdc', label: useT('editor.action.fc.title') },
    { value: 'err', label: useT('editor.action.error.title') },
    { value: 'out', label: useT('editor.action.out.title') },
    { value: 'obr', label: useT('editor.action.obr.title') },
  ]
}

function renderRunnerActionOptions(): GUIOption[] {
  return [
    { value: '', label: '' },
    { value: 'adv', label: useT('editor.action.advance.title') },
    { value: 'nadv', label: useT('editor.action.advance.titleN') },
    { value: 'exb', label: useT('editor.action.extraBase.title') },
    { value: 'ste', label: useT('editor.action.sb.title') },
    { value: 'fdc', label: useT('editor.action.fc.title') },
    { value: 'err', label: useT('editor.action.error.title') },
    { value: 'out', label: useT('editor.action.out.title') },
    { value: 'obr', label: useT('editor.action.obr.title') },
  ]
}

export function renderBatterSpecificActionOptions(baseAction: string): GUIOption[] {
  const options = []
  const bSafe = useT('editor.action.batterSafe')
  const bOut = useT('editor.action.batterOut')
  switch (baseAction) {
    case 'StrikeOut':
      options.push({ group: bOut, value: 'KS', label: useT('editor.action.strikeOut.KS') })
      options.push({ group: bOut, value: 'KL', label: useT('editor.action.strikeOut.KL') })
      options.push({ group: bOut, value: 'KST', label: useT('editor.action.strikeOut.KST') })
      options.push({ group: bOut, value: 'KLT', label: useT('editor.action.strikeOut.KLT') })
      options.push({ group: bOut, value: 'KSR', label: useT('editor.action.strikeOut.KSR') })
      options.push({ group: bOut, value: 'KLR', label: useT('editor.action.strikeOut.KLR') })
      options.push({ group: bOut, value: 'KSB', label: useT('editor.action.strikeOut.KSB') })
      options.push({ group: bOut, value: 'KSI', label: useT('editor.action.strikeOut.KSI') })
      options.push({ group: bOut, value: 'KLI', label: useT('editor.action.strikeOut.KLI') })

      options.push({ group: bSafe, value: 'KSET', label: useT('editor.action.strikeOut.KSET') })
      options.push({ group: bSafe, value: 'KSE', label: useT('editor.action.strikeOut.KSE') })
      options.push({ group: bSafe, value: 'KSWP', label: useT('editor.action.strikeOut.KSWP') })
      options.push({ group: bSafe, value: 'KSPB', label: useT('editor.action.strikeOut.KSPB') })
      options.push({ group: bSafe, value: 'KSO', label: useT('editor.action.strikeOut.KSO') })
      options.push({ group: bSafe, value: 'KSFC', label: useT('editor.action.strikeOut.KSFC') })
      options.push({ group: bSafe, value: 'KLET', label: useT('editor.action.strikeOut.KLET') })
      options.push({ group: bSafe, value: 'KLE', label: useT('editor.action.strikeOut.KLE') })
      options.push({ group: bSafe, value: 'KLWP', label: useT('editor.action.strikeOut.KLWP') })
      options.push({ group: bSafe, value: 'KLPB', label: useT('editor.action.strikeOut.KLPB') })
      options.push({ group: bSafe, value: 'KLO', label: useT('editor.action.strikeOut.KLO') })
      options.push({ group: bSafe, value: 'KLFC', label: useT('editor.action.strikeOut.KLFC') })
      break
    case 'GroundOut':
      options.push({ group: bOut, value: 'GO', label: useT('editor.action.groundOut.GO') })
      options.push({ group: bOut, value: 'GOB', label: useT('editor.action.groundOut.GOB') })
      options.push({ group: bOut, value: 'GDP', label: useT('editor.action.groundOut.GDP') })
      options.push({ group: bSafe, value: 'GDPB', label: useT('editor.action.groundOut.GDPB') })
      options.push({ group: bSafe, value: 'GDPO', label: useT('editor.action.groundOut.GDPO') })
      options.push({ group: bSafe, value: 'GDPE', label: useT('editor.action.groundOut.GDPE') })
      break
    case 'FlyOut':
      options.push({ group: bOut, value: 'F', label: useT('editor.action.flyOut.F') })
      options.push({ group: bOut, value: 'P', label: useT('editor.action.flyOut.P') })
      options.push({ group: bOut, value: 'L', label: useT('editor.action.flyOut.L') })
      options.push({ group: bOut, value: 'FF', label: useT('editor.action.flyOut.FF') })
      options.push({ group: bOut, value: 'FP', label: useT('editor.action.flyOut.FP') })
      options.push({ group: bOut, value: 'FL', label: useT('editor.action.flyOut.FL') })
      options.push({ group: bOut, value: 'IF', label: useT('editor.action.flyOut.IF') })
      options.push({ group: bOut, value: 'FB', label: useT('editor.action.flyOut.FB') })
      options.push({ group: bOut, value: 'FFB', label: useT('editor.action.flyOut.FFB') })
      break
    case 'Hit':
      options.push({ group: bSafe, value: '1B', label: useT('editor.action.hit.1B') })
      options.push({ group: bSafe, value: '2B', label: useT('editor.action.hit.2B') })
      options.push({ group: bSafe, value: '3B', label: useT('editor.action.hit.3B') })
      options.push({ group: bSafe, value: 'HR', label: useT('editor.action.hit.HR') })
      options.push({ group: bSafe, value: '1BB', label: useT('editor.action.hit.1BB') })
      options.push({ group: bSafe, value: '2BG', label: useT('editor.action.hit.2BG') })
      options.push({ group: bSafe, value: 'IHR', label: useT('editor.action.hit.IHR') })
      break
    case 'Sacrifice':
      options.push({ group: bOut, value: 'SH', label: useT('editor.action.sacrifice.SH') })
      options.push({ group: bOut, value: 'SF', label: useT('editor.action.sacrifice.SF') })
      options.push({ group: bOut, value: 'FSF', label: useT('editor.action.sacrifice.FSF') })
      options.push({ group: bSafe, value: 'SHE', label: useT('editor.action.sacrifice.SHE') })
      options.push({ group: bSafe, value: 'SHET', label: useT('editor.action.sacrifice.SHET') })
      options.push({ group: bSafe, value: 'SHEF', label: useT('editor.action.sacrifice.SHEF') })
      options.push({ group: bSafe, value: 'SHFC', label: useT('editor.action.sacrifice.SHFC') })
      options.push({ group: bSafe, value: 'SFE', label: useT('editor.action.sacrifice.SFE') })
      options.push({ group: bSafe, value: 'SFO', label: useT('editor.action.sacrifice.SFO') })
      break
    case 'FC':
      options.push({ group: bSafe, value: 'O', label: useT('editor.action.fc.O') })
      options.push({ group: bSafe, value: 'OCB', label: useT('editor.action.fc.OCB') })
      options.push({ group: bSafe, value: 'FC', label: useT('editor.action.fc.FC') })
      break
    case 'Error':
      options.push({ group: bSafe, value: 'EF', label: useT('editor.action.error.EF') })
      options.push({ group: bSafe, value: 'EFB', label: useT('editor.action.error.EFB') })
      options.push({ group: bSafe, value: 'ET', label: useT('editor.action.error.ET') })
      options.push({ group: bSafe, value: 'EDF', label: useT('editor.action.error.EDF') })
      options.push({ group: bSafe, value: 'EDL', label: useT('editor.action.error.EDL') })
      options.push({ group: bSafe, value: 'EDP', label: useT('editor.action.error.EDP') })
      options.push({ group: bSafe, value: 'EDFB', label: useT('editor.action.error.EDFB') })
      options.push({ group: bSafe, value: 'INT', label: useT('editor.action.error.INT') })
      options.push({ group: bSafe, value: 'OB', label: useT('editor.action.error.OB') })
      break
    case 'Advance':
      options.push({ group: bSafe, value: 'BB1', label: useT('editor.action.advance.BB1') })
      options.push({ group: bSafe, value: 'IBB1', label: useT('editor.action.advance.IBB1') }) // "1" indicates the numbering should be included in output
      options.push({ group: bSafe, value: 'HP', label: useT('editor.action.advance.HP') }) // "1" indicates the numbering should be included in output
      break
    case 'OBR':
      options.push({ group: bOut, value: 'OBR_BOB', label: useT('editor.action.obr.OBR_BOB') })
      options.push({ group: bOut, value: 'OBR_BIA', label: useT('editor.action.obr.OBR_BIA') })
      options.push({ group: bOut, value: 'OBR_TBB', label: useT('editor.action.obr.OBR_TBB') })
      options.push({ group: bOut, value: 'OBR_BIC', label: useT('editor.action.obr.OBR_BIC') })
      options.push({ group: bOut, value: 'OBR_BOT', label: useT('editor.action.obr.OBR_BOT') })
      options.push({ group: bOut, value: 'OBR_RTA', label: useT('editor.action.obr.OBR_RTA') })
      options.push({ group: bOut, value: 'OBR_DIF', label: useT('editor.action.obr.OBR_DIF') })
      options.push({ group: bOut, value: 'OBR_BIN', label: useT('editor.action.obr.OBR_BIN') })
      options.push({ group: bOut, value: 'OBR_OIN', label: useT('editor.action.obr.OBR_OIN') })
      break
    case 'Other':
      options.push({ group: bOut, value: 'A', label: useT('editor.action.other.A') })
      options.push({ group: bOut, value: 'LT', label: useT('editor.action.other.LT') })
      break
  }
  return options
}

export function renderRunnerSpecificActionOptions(baseAction: string, inputGroup: string): GUIOption[] {
  const options = []
  const rSafe = useT('editor.action.runnerSafe')
  const rStay = useT('editor.action.runnerStay')
  const rOut = useT('editor.action.runnerOut')
  switch (baseAction) {
    case 'adv':
      options.push({ group: rSafe, value: 'ADV', label: useT('editor.action.advance.ADV') })
      break
    case 'nadv':
      options.push({ group: rStay, value: 'NADV', label: useT('editor.action.advance.NADV') })
      break
    case 'exb':
      options.push({ group: rSafe, value: 'WP', label: useT('editor.action.extraBase.WP') })
      options.push({ group: rSafe, value: 'PB', label: useT('editor.action.extraBase.PB') })
      if ((inputGroup.includes('-r'))) {
        // only for runners, not the running batter
        options.push({ group: rSafe, value: 'BK', label: useT('editor.action.extraBase.BK') })
        options.push({ group: rSafe, value: 'IP', label: useT('editor.action.extraBase.IP') })
      }
      break
    case 'ste':
      options.push({ group: rSafe, value: 'SB', label: useT('editor.action.sb.SB') })
      options.push({ group: rSafe, value: 'SBPOA', label: useT('editor.action.sb.SBPOA') })
      options.push({ group: rSafe, value: 'CSE', label: useT('editor.action.sb.CSE') })
      options.push({ group: rSafe, value: 'CSET', label: useT('editor.action.sb.CSET') })
      options.push({ group: rSafe, value: 'CSN', label: useT('editor.action.sb.CSN') })
      options.push({ group: rSafe, value: 'CSNT', label: useT('editor.action.sb.CSNT') })
      options.push({ group: rSafe, value: 'POE', label: useT('editor.action.sb.POE') })
      options.push({ group: rSafe, value: 'POEN', label: useT('editor.action.sb.POEN') })
      options.push({ group: rSafe, value: 'POCSE', label: useT('editor.action.sb.POCSE') })
      options.push({ group: rSafe, value: 'POCSEN', label: useT('editor.action.sb.POCSEN') })
      options.push({ group: rOut, value: 'CSO', label: useT('editor.action.sb.CSO') })
      options.push({ group: rOut, value: 'PO', label: useT('editor.action.sb.PO') })
      options.push({ group: rOut, value: 'POCS', label: useT('editor.action.sb.POCS') })
      break
    case 'fdc':
      options.push({ group: rSafe, value: 'T', label: useT('editor.action.fc.T') })
      options.push({ group: rSafe, value: 'O/', label: useT('editor.action.fc.O/') })
      if ((!inputGroup.includes('-r'))) {
        // only for running batter, not the runners
        options.push({ group: rSafe, value: 'oc', label: useT('editor.action.fc.oc') })
      } else {
        // only for runners
        options.push({ group: rSafe, value: 'o', label: useT('editor.action.fc.oc') })
      }
      break
    case 'err':
      options.push({ group: rSafe, value: 'EF', label: useT('editor.action.error.EF') })
      options.push({ group: rSafe, value: 'ET', label: useT('editor.action.error.ET') })
      options.push({ group: rSafe, value: 'eF', label: useT('editor.action.error.eF') })
      options.push({ group: rSafe, value: 'eT', label: useT('editor.action.error.eT') })
      options.push({ group: rSafe, value: 'se0', label: useT('editor.action.error.se0') })
      if (!(inputGroup.includes('r1'))) {
        options.push({ group: rSafe, value: 'se1', label: useT('editor.action.error.se1') })
      }
      if (!(inputGroup.includes('r2'))) {
        options.push({ group: rSafe, value: 'se2', label: useT('editor.action.error.se2') })
      }
      if (!(inputGroup.includes('r3'))) {
        options.push({ group: rSafe, value: 'se3', label: useT('editor.action.error.se3') })
      }
      options.push({ group: rSafe, value: 'ENF', label: useT('editor.action.error.ENF') })
      options.push({ group: rSafe, value: 'ENT', label: useT('editor.action.error.ENT') })
      options.push({ group: rSafe, value: 'ob', label: useT('editor.action.error.OB') })
      break
    case 'out':
      options.push({ group: rOut, value: 'GOT', label: useT('editor.action.out.GOT') })
      if ((inputGroup.includes('-r'))) {
        // only for runners, not the running batter
        options.push({ group: rOut, value: 'GO', label: useT('editor.action.out.GO') })
      }
      options.push({ group: rOut, value: 'A', label: useT('editor.action.out.A') })
      break
    case 'obr':
      options.push({ group: rOut, value: 'OBR_rta', label: useT('editor.action.obr.OBR_RTA') })
      options.push({ group: rOut, value: 'OBR_hbb', label: useT('editor.action.obr.OBR_hbb') })
      options.push({ group: rOut, value: 'OBR_rol', label: useT('editor.action.obr.OBR_rol') })
      options.push({ group: rOut, value: 'OBR_ppr', label: useT('editor.action.obr.OBR_ppr') })
      options.push({ group: rOut, value: 'OBR_rro', label: useT('editor.action.obr.OBR_rro') })
      options.push({ group: rOut, value: 'OBR_rin', label: useT('editor.action.obr.OBR_rin') })
      options.push({ group: rOut, value: 'OBR_oin', label: useT('editor.action.obr.OBR_oin') })
      options.push({ group: rOut, value: 'OBR_rle', label: useT('editor.action.obr.OBR_rle') })
      options.push({ group: rOut, value: 'OBR_rhe', label: useT('editor.action.obr.OBR_rhe') })
      break
  }
  return options
}

export function getExtra1Group(inputGroup: string) {
  switch (inputGroup) {
    case inputB:
      return inputB1
    case inputR1:
      return inputR1a
    case inputR2:
      return inputR2a
    default:
      return '???'
  }
}
export function getExtra2Group(inputGroup: string) {
  switch (inputGroup) {
    case inputB:
      return inputB2
    case inputR1:
      return inputR1b
    default:
      return '???'
  }
}
export function getExtra3Group(inputGroup: string) {
  switch (inputGroup) {
    case inputB:
      return inputB3
    default:
      return '???'
  }
}

// list of existing player positions / basic field locations
export function getPlayerLocations() {
  const options: GUIOption[] = []
  options.push({ value: '', label: '' })
  options.push({ value: '1', label: 'P' })
  options.push({ value: '2', label: 'C' })
  options.push({ value: '3', label: '1B' })
  options.push({ value: '4', label: '2B' })
  options.push({ value: '5', label: '3B' })
  options.push({ value: '6', label: 'SS' })
  options.push({ value: '7', label: 'LF' })
  options.push({ value: '8', label: 'CF' })
  options.push({ value: '9', label: 'RF' })
  return options
}

// list of extra field locations to describe hits
export function getHitLocations() {
  const options: GUIOption[] = getPlayerLocations()
  options.push({ value: 'LL', label: 'LL' })
  options.push({ value: 'GLL', label: 'GLL' })
  options.push({ value: 'LS', label: 'LS' })
  options.push({ value: 'LC', label: 'LC' })
  options.push({ value: 'MI', label: 'MI' })
  options.push({ value: 'RC', label: 'RC' })
  options.push({ value: 'RS', label: 'RS' })
  options.push({ value: 'GRL', label: 'GRL' })
  options.push({ value: 'RL', label: 'RL' })
  return options
}

// list of target bases for fielder's choice
export function getFCLocations() {
  const options: GUIOption[] = []
  options.push({ value: 'X', label: '2nd' })
  options.push({ value: 'Y', label: '3rd' })
  options.push({ value: 'Z', label: 'HP' })
  return options
}
