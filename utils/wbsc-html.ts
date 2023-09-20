/* *************************************** */
/* wbsc-html.js                            */
/* Helpers to get html code to be inserted */
/* *************************************** */

// displayed title for given input group
function getLabelForInputGroup (group: string) {
  let label = '<strong>'
  switch (group) {
    case inputB:
      label += useT('editor.batter')
      break
    case inputR1:
      label += useT('editor.r1')
      break
    case inputR2:
      label += useT('editor.r2')
      break
    case inputR3:
      label += useT('editor.r3')
      break
  }
  label += '</strong>'
  return label
}

// displayed text for given action button
function getLabelForRenderButton (group: string, render: boolean) {
  let label = ''
  switch (group) {
    case inputGenerate:
      label = useT('editor.button.generate')
      break
    case inputClear:
      label = useT('editor.button.clear')
      break
    case inputImport:
      label = '&#8664; ' + useT('editor.button.import')
      break
    case inputImportLib:
      label = '&#8664; ' + useT('editor.button.importLib')
      break
    case inputExport:
      label = useT('editor.button.export') + ' &#8663;'
      break
    default:
      if (render === true) {
        label += '+'
      } else {
        label += '-'
      }
      switch (group) {
        case inputB:
          label += 'B'
          break
        case inputR1:
          label += 'R1'
          break
        case inputR2:
          label += 'R2'
          break
        case inputR3:
          label += 'R3'
          break
      }
  }
  return label
}

// list of existing player positions / basic field locations
function renderPlayerOptions () {
  const options = []
  options.push('<option value=""></option>')
  options.push('<option value="1">P</option>')
  options.push('<option value="2">C</option>')
  options.push('<option value="3">1B</option>')
  options.push('<option value="4">2B</option>')
  options.push('<option value="5">3B</option>')
  options.push('<option value="6">SS</option>')
  options.push('<option value="7">LF</option>')
  options.push('<option value="8">CF</option>')
  options.push('<option value="9">RF</option>')
  return options
}

// list of extra field locations to describe hits
function renderHitLocationOptions () {
  const options = renderPlayerOptions()
  options.push('<option value="LL">LL</option>')
  options.push('<option value="LS">LS</option>')
  options.push('<option value="LC">LC</option>')
  options.push('<option value="MI">MI</option>')
  options.push('<option value="RC">RC</option>')
  options.push('<option value="RS">RS</option>')
  options.push('<option value="RL">RL</option>')
  return options
}

// list of target bases for fielder's choice
function renderFCLocationOptions () {
  const options = []
  options.push('<option value="X">2nd</option>')
  options.push('<option value="Y">3rd</option>')
  options.push('<option value="Z">HP</option>')
  return options
}

// list of available advances
//   base - original base
function renderBaseOptions (base: number) {
  const options = []
  if (base < 2) {
    const second = useT('editor.base.second')
    if (base === 1) {
      options.push(`<option value="2" selected>${second}</option>`)
    } else {
      options.push(`<option value="2">${second}</option>`)
    }
  }
  if (base < 3) {
    const third = useT('editor.base.third')
    if (base === 2) {
      options.push(`<option value="3" selected>${third}</option>`)
    } else {
      options.push(`<option value="3">${third}</option>`)
    }
  }
  const home = useT('editor.base.home')
  if (base === 3) {
    options.push(`<option value="4" selected>${home}</option>`)
  } else {
    options.push(`<option value="4">${home}</option>`)
  }
  return options
}

// list of possible run types
function renderRunTypeOptions () {
  const options = []
  options.push('<option value="e">ER</option>')
  options.push('<option value="ue">UE</option>')
  options.push('<option value="tu">TU</option>')
  return options
}

// list of basic actions for the batter
function renderBatterActionOptions () {
  const options = []
  options.push('<option value=""></option>')
  options.push(`<option value="StrikeOut">${useT('editor.action.strikeOut.title')}</option>`)
  options.push(`<option value="GroundOut">${useT('editor.action.groundOut.title')}</option>`)
  options.push(`<option value="FlyOut">${useT('editor.action.flyOut.title')}</option>`)
  options.push(`<option value="Hit">${useT('editor.action.hit.title')}</option>`)
  options.push(`<option value="Sacrifice">${useT('editor.action.sacrifice.title')}</option>`)
  options.push(`<option value="FC">${useT('editor.action.fc.title')}</option>`)
  options.push(`<option value="Error">${useT('editor.action.error.title')}</option>`)
  options.push(`<option value="Advance">${useT('editor.action.advance.title1')}</option>`)
  options.push(`<option value="OBR">${useT('editor.action.obr.title')}</option>`)
  options.push(`<option value="Other">${useT('editor.action.other.title')}</option>`)
  return options
}

// list of basic actions for the running batter
function renderBatterRunnerActionOptions () {
  const options = []
  options.push('<option value=""></option>')
  options.push(`<option value="exb">${useT('editor.action.extraBase.title')}</option>`)
  options.push(`<option value="fdc">${useT('editor.action.fc.title')}</option>`)
  options.push(`<option value="err">${useT('editor.action.error.title')}</option>`)
  options.push(`<option value="out">${useT('editor.action.out.title')}</option>`)
  options.push(`<option value="obr">${useT('editor.action.obr.title')}</option>`)
  return options
}

// list of basic actions for the runner
function renderRunnerActionOptions () {
  const options = []
  options.push('<option value=""></option>')
  options.push(`<option value="adv">${useT('editor.action.advance.title')}</option>`)
  options.push(`<option value="nadv">${useT('editor.action.advance.titleN')}</option>`)
  options.push(`<option value="exb">${useT('editor.action.extraBase.title')}</option>`)
  options.push(`<option value="ste">${useT('editor.action.sb.title')}</option>`)
  options.push(`<option value="fdc">${useT('editor.action.fc.title')}</option>`)
  options.push(`<option value="err">${useT('editor.action.error.title')}</option>`)
  options.push(`<option value="out">${useT('editor.action.out.title')}</option>`)
  options.push(`<option value="obr">${useT('editor.action.obr.title')}</option>`)
  return options
}

// list of specific actions based on selected base action for batter
function renderBatterSpecificActionOptions (action: string) {
  const options = []
  const bSafe = useT('editor.action.batterSafe')
  const bOut = useT('editor.action.batterOut')
  switch (action) {
    case 'StrikeOut':
      options.push(`<optgroup label="${bOut}">`)
      options.push(`<option value="KS">${useT('editor.action.strikeOut.KS')}</option>`)
      options.push(`<option value="KL">${useT('editor.action.strikeOut.KL')}</option>`)
      options.push(`<option value="KST">${useT('editor.action.strikeOut.KST')}</option>`)
      options.push(`<option value="KLT">${useT('editor.action.strikeOut.KLT')}</option>`)
      options.push(`<option value="KSR">${useT('editor.action.strikeOut.KSR')}</option>`)
      options.push(`<option value="KLR">${useT('editor.action.strikeOut.KLR')}</option>`)
      options.push(`<option value="KSB">${useT('editor.action.strikeOut.KSB')}</option>`)
      options.push(`<option value="KSI">${useT('editor.action.strikeOut.KSI')}</option>`)
      options.push(`<option value="KLI">${useT('editor.action.strikeOut.KLI')}</option>`)
      options.push('</optgroup>')
      options.push(`<optgroup label="${bSafe}">`)
      options.push(`<option value="KSET">${useT('editor.action.strikeOut.KSET')}</option>`)
      options.push(`<option value="KSE">${useT('editor.action.strikeOut.KSE')}</option>`)
      options.push(`<option value="KSWP">${useT('editor.action.strikeOut.KSWP')}</option>`)
      options.push(`<option value="KSPB">${useT('editor.action.strikeOut.KSPB')}</option>`)
      options.push(`<option value="KSO">${useT('editor.action.strikeOut.KSO')}</option>`)
      options.push(`<option value="KSFC">${useT('editor.action.strikeOut.KSFC')}</option>`)
      options.push(`<option value="KLET">${useT('editor.action.strikeOut.KLET')}</option>`)
      options.push(`<option value="KLE">${useT('editor.action.strikeOut.KLE')}</option>`)
      options.push(`<option value="KLWP">${useT('editor.action.strikeOut.KLWP')}</option>`)
      options.push(`<option value="KLPB">${useT('editor.action.strikeOut.KLPB')}</option>`)
      options.push(`<option value="KLO">${useT('editor.action.strikeOut.KLO')}</option>`)
      options.push(`<option value="KLFC">${useT('editor.action.strikeOut.KLFC')}</option>`)
      options.push('</optgroup>')
      break
    case 'GroundOut':
      options.push(`<optgroup label="${bOut}">`)
      options.push(`<option value="GO">${useT('editor.action.groundOut.GO')}</option>`)
      options.push(`<option value="GOB">${useT('editor.action.groundOut.GOB')}</option>`)
      options.push(`<option value="GDP">${useT('editor.action.groundOut.GDP')}</option>`)
      options.push('</optgroup>')
      options.push(`<optgroup label="${bSafe}">`)
      options.push(`<option value="GDPE">${useT('editor.action.groundOut.GDPE')}</option>`)
      options.push('</optgroup>')
      break
    case 'FlyOut':
      options.push(`<optgroup label="${bOut}">`)
      options.push(`<option value="F">${useT('editor.action.flyOut.F')}</option>`)
      options.push(`<option value="P">${useT('editor.action.flyOut.P')}</option>`)
      options.push(`<option value="L">${useT('editor.action.flyOut.L')}</option>`)
      options.push(`<option value="FF">${useT('editor.action.flyOut.FF')}</option>`)
      options.push(`<option value="FP">${useT('editor.action.flyOut.FP')}</option>`)
      options.push(`<option value="FL">${useT('editor.action.flyOut.FL')}</option>`)
      options.push(`<option value="IF">${useT('editor.action.flyOut.IF')}</option>`)
      options.push(`<option value="FB">${useT('editor.action.flyOut.FB')}</option>`)
      options.push(`<option value="FFB">${useT('editor.action.flyOut.FFB')}</option>`)
      options.push('</optgroup>')
      break
    case 'Hit':
      options.push(`<optgroup label="${bSafe}">`)
      options.push(`<option value="1B">${useT('editor.action.hit.1B')}</option>`)
      options.push(`<option value="2B">${useT('editor.action.hit.2B')}</option>`)
      options.push(`<option value="3B">${useT('editor.action.hit.3B')}</option>`)
      options.push(`<option value="HR">${useT('editor.action.hit.HR')}</option>`)
      options.push(`<option value="1BB">${useT('editor.action.hit.1BB')}</option>`)
      options.push(`<option value="2BG">${useT('editor.action.hit.2BG')}</option>`)
      options.push(`<option value="IHR">${useT('editor.action.hit.IHR')}</option>`)
      options.push('</optgroup>')
      break
    case 'Sacrifice':
      options.push(`<optgroup label="${bOut}">`)
      options.push(`<option value="SH">${useT('editor.action.sacrifice.SH')}</option>`)
      options.push(`<option value="SF">${useT('editor.action.sacrifice.SF')}</option>`)
      options.push(`<option value="FSF">${useT('editor.action.sacrifice.FSF')}</option>`)
      options.push('</optgroup>')
      options.push(`<optgroup label="${bSafe}">`)
      options.push(`<option value="SHE">${useT('editor.action.sacrifice.SHE')}</option>`)
      options.push(`<option value="SHET">${useT('editor.action.sacrifice.SHET')}</option>`)
      options.push(`<option value="SHEF">${useT('editor.action.sacrifice.SHEF')}</option>`) // code ends with "F" for easier output transformation
      options.push(`<option value="SHFC">${useT('editor.action.sacrifice.SHFC')}</option>`)
      options.push(`<option value="SFE">${useT('editor.action.sacrifice.SFE')}</option>`)
      options.push(`<option value="SFO">${useT('editor.action.sacrifice.SFO')}</option>`)
      options.push('</optgroup>')
      break
    case 'FC':
      options.push(`<optgroup label="${bSafe}">`)
      options.push(`<option value="O">${useT('editor.action.fc.O')}</option>`)
      options.push(`<option value="FC">${useT('editor.action.fc.FC')}</option>`)
      options.push('</optgroup>')
      break
    case 'Error':
      options.push(`<optgroup label="${bSafe}">`)
      options.push(`<option value="EF">${useT('editor.action.error.EF')}</option>`)
      options.push(`<option value="ET">${useT('editor.action.error.ET')}</option>`)
      options.push(`<option value="EDF">${useT('editor.action.error.EDF')}</option>`)
      options.push(`<option value="EDL">${useT('editor.action.error.EDL')}</option>`)
      options.push(`<option value="EDP">${useT('editor.action.error.EDP')}</option>`)
      options.push(`<option value="EDFB">${useT('editor.action.error.EDFB')}</option>`)
      options.push(`<option value="INT">${useT('editor.action.error.INT')}</option>`)
      options.push(`<option value="OB">${useT('editor.action.error.OB')}</option>`)
      options.push('</optgroup>')
      break
    case 'Advance':
      options.push(`<optgroup label="${bSafe}">`)
      options.push(`<option value="BB1">${useT('editor.action.advance.BB1')}</option>`) // "1" indicates the numbering should be included in output
      options.push(`<option value="IBB1">${useT('editor.action.advance.IBB1')}</option>`) // "1" indicates the numbering should be included in output
      options.push(`<option value="HP">${useT('editor.action.advance.HP')}</option>`)
      options.push('</optgroup>')
      break
    case 'OBR':
      options.push(`<optgroup label="${bOut}">`)
      options.push(`<option value="OBR_BOB">${useT('editor.action.obr.OBR_BOB')}</option>`)
      options.push(`<option value="OBR_BIA">${useT('editor.action.obr.OBR_BIA')}</option>`)
      options.push(`<option value="OBR_TBB">${useT('editor.action.obr.OBR_TBB')}</option>`)
      options.push(`<option value="OBR_BIC">${useT('editor.action.obr.OBR_BIC')}</option>`)
      options.push(`<option value="OBR_BOT">${useT('editor.action.obr.OBR_BOT')}</option>`)
      options.push(`<option value="OBR_RTA">${useT('editor.action.obr.OBR_RTA')}</option>`)
      options.push(`<option value="OBR_DIF">${useT('editor.action.obr.OBR_DIF')}</option>`)
      options.push(`<option value="OBR_BIN">${useT('editor.action.obr.OBR_BIN')}</option>`)
      options.push(`<option value="OBR_OIN">${useT('editor.action.obr.OBR_OIN')}</option>`)
      options.push('</optgroup>')
      break
    case 'Other':
      options.push(`<optgroup label="${bOut}">`)
      options.push(`<option value="A">${useT('editor.action.other.A')}</option>`)
      options.push(`<option value="LT">${useT('editor.action.other.LT')}</option>`)
      options.push('</optgroup>')
      break
  }
  return options
}

// list of specific actions based on selected base action for runner
//   action - selected base action
//   group - invoking input group
function renderRunnerSpecificActionOptions (action: string, group: string) {
  const options = []
  const rSafe = useT('editor.action.runnerSafe')
  const rStay = useT('editor.action.runnerStay')
  const rOut = useT('editor.action.runnerOut')
  switch (action) {
    case 'adv':
      options.push(`<optgroup label="${rSafe}">`)
      options.push(`<option value="ADV">${useT('editor.action.advance.ADV')}</option>'`)
      options.push('</optgroup>')
      break
    case 'nadv':
      options.push(`<optgroup label="${rStay}">`)
      options.push(`<option value="NADV">${useT('editor.action.advance.NADV')}</option>`)
      options.push('</optgroup>')
      break
    case 'exb':
      options.push(`<optgroup label="${rSafe}">`)
      options.push(`<option value="WP">${useT('editor.action.extraBase.WP')}</option>`)
      options.push(`<option value="PB">${useT('editor.action.extraBase.PB')}</option>`)
      if ((group.includes('-r'))) {
        // only for runners, not the running batter
        options.push(`<option value="BK">${useT('editor.action.extraBase.BK')}</option>`)
        options.push(`<option value="IP">${useT('editor.action.extraBase.IP')}</option>`)
      }
      options.push('</optgroup>')
      break
    case 'ste':
      options.push(`<optgroup label="${rSafe}">`)
      options.push(`<option value="SB">${useT('editor.action.sb.SB')}</option>`)
      options.push(`<option value="CSE">${useT('editor.action.sb.CSE')}</option>`)
      options.push(`<option value="CSET">${useT('editor.action.sb.CSET')}</option>`)
      options.push(`<option value="CSN">${useT('editor.action.sb.CSN')}</option>`)
      options.push(`<option value="CSNT">${useT('editor.action.sb.CSNT')}</option>`)
      options.push(`<option value="POE">${useT('editor.action.sb.POE')}</option>`)
      options.push(`<option value="POEN">${useT('editor.action.sb.POEN')}</option>`)
      options.push('</optgroup>')
      options.push(`<optgroup label="${rOut}">`)
      options.push(`<option value="CSO">${useT('editor.action.sb.CSO')}</option>`)
      options.push(`<option value="PO">${useT('editor.action.sb.PO')}</option>`)
      options.push('</optgroup>')
      break
    case 'fdc':
      options.push(`<optgroup label="${rSafe}">`)
      options.push(`<option value="T">${useT('editor.action.fc.T')}</option>`)
      options.push(`<option value="O/">${useT('editor.action.fc.O/')}</option>`)
      if ((!group.includes('-r'))) {
        // only for running batter, not the runners
        options.push(`<option value="oc">${useT('editor.action.fc.oc')}</option>`)
      }
      options.push('</optgroup>')
      break
    case 'err':
      options.push(`<optgroup label="${rSafe}">`)
      options.push(`<option value="EF">${useT('editor.action.error.EF')}</option>`)
      options.push(`<option value="ET">${useT('editor.action.error.ET')}</option>`)
      options.push(`<option value="eF">${useT('editor.action.error.eF')}</option>`)
      options.push(`<option value="eT">${useT('editor.action.error.eT')}</option>`)
      options.push(`<option value="se0">${useT('editor.action.error.se0')}</option>`)
      if (!(group.includes('r1'))) {
        options.push(`<option value="se1">${useT('editor.action.error.se1')}</option>`)
      }
      if (!(group.includes('r2'))) {
        options.push(`<option value="se2">${useT('editor.action.error.se2')}</option>`)
      }
      if (!(group.includes('r3'))) {
        options.push(`<option value="se3">${useT('editor.action.error.se3')}</option>`)
      }
      options.push(`<option value="ENF">${useT('editor.action.error.ENF')}</option>`)
      options.push(`<option value="ENT">${useT('editor.action.error.ENT')}</option>`)
      options.push(`<option value="ob">${useT('editor.action.error.OB')}</option>`)
      options.push('</optgroup>')
      break
    case 'out':
      options.push(`<optgroup label="${rOut}">`)
      options.push(`<option value="GO">${useT('editor.action.out.GO')}</option>`)
      options.push(`<option value="GOT">${useT('editor.action.out.GOT')}</option>`)
      options.push(`<option value="A">${useT('editor.action.out.A')}</option>`)
      options.push('</optgroup>')
      break
    case 'obr':
      options.push(`<optgroup label="${rOut}">`)
      options.push(`<option value="OBR_rta">${useT('editor.action.obr.OBR_RTA')}</option>`)
      options.push(`<option value="OBR_hbb">${useT('editor.action.obr.OBR_hbb')}</option>`)
      options.push(`<option value="OBR_rol">${useT('editor.action.obr.OBR_rol')}</option>`)
      options.push(`<option value="OBR_ppr">${useT('editor.action.obr.OBR_ppr')}</option>`)
      options.push(`<option value="OBR_rro">${useT('editor.action.obr.OBR_rro')}</option>`)
      options.push(`<option value="OBR_rin">${useT('editor.action.obr.OBR_rin')}</option>`)
      options.push(`<option value="OBR_rle">${useT('editor.action.obr.OBR_rle')}</option>`)
      options.push(`<option value="OBR_rhe">${useT('editor.action.obr.OBR_rhe')}</option>`)
      options.push('</optgroup>')
      break
  }
  return options
}

export {
  getLabelForInputGroup, getLabelForRenderButton, renderPlayerOptions, renderHitLocationOptions,
  renderFCLocationOptions, renderBaseOptions, renderRunTypeOptions, renderBatterActionOptions,
  renderBatterRunnerActionOptions, renderRunnerActionOptions, renderBatterSpecificActionOptions,
  renderRunnerSpecificActionOptions
}
