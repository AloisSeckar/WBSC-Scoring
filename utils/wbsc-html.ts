/* *************************************** */
/* wbsc-html.js                            */
/* Helpers to get html code to be inserted */
/* *************************************** */

// displayed title for given input group
function getLabelForInputGroup (group: string) {
  let label = '<strong>'
  switch (group) {
    case inputB:
      label += useNuxtApp().$i18n.t('editor.batter')
      break
    case inputR1:
      label += useNuxtApp().$i18n.t('editor.r1')
      break
    case inputR2:
      label += useNuxtApp().$i18n.t('editor.r2')
      break
    case inputR3:
      label += useNuxtApp().$i18n.t('editor.r3')
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
      label = useNuxtApp().$i18n.t('editor.button.generate')
      break
    case inputClear:
      label = useNuxtApp().$i18n.t('editor.button.clear')
      break
    case inputImport:
      label = '&#8664; ' + useNuxtApp().$i18n.t('editor.button.import')
      break
    case inputImportLib:
      label = '&#8664; ' + useNuxtApp().$i18n.t('editor.button.importLib')
      break
    case inputExport:
      label = useNuxtApp().$i18n.t('editor.button.export') + ' &#8663;'
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
    const second = useNuxtApp().$i18n.t('editor.base.second')
    if (base === 1) {
      options.push(`<option value="2" selected>${second}</option>`)
    } else {
      options.push(`<option value="2">${second}</option>`)
    }
  }
  if (base < 3) {
    const third = useNuxtApp().$i18n.t('editor.base.third')
    if (base === 2) {
      options.push(`<option value="3" selected>${third}</option>`)
    } else {
      options.push(`<option value="3">${third}</option>`)
    }
  }
  const home = useNuxtApp().$i18n.t('editor.base.home')
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
  options.push(`<option value="StrikeOut">${useNuxtApp().$i18n.t('editor.action.strikeOut.title')}</option>`)
  options.push(`<option value="GroundOut">${useNuxtApp().$i18n.t('editor.action.groundOut.title')}</option>`)
  options.push(`<option value="FlyOut">${useNuxtApp().$i18n.t('editor.action.flyOut.title')}</option>`)
  options.push(`<option value="Hit">${useNuxtApp().$i18n.t('editor.action.hit.title')}</option>`)
  options.push(`<option value="Sacrifice">${useNuxtApp().$i18n.t('editor.action.sacrifice.title')}</option>`)
  options.push(`<option value="FC">${useNuxtApp().$i18n.t('editor.action.fc.title')}</option>`)
  options.push(`<option value="Error">${useNuxtApp().$i18n.t('editor.action.error.title')}</option>`)
  options.push(`<option value="Advance">${useNuxtApp().$i18n.t('editor.action.advance.title1')}</option>`)
  options.push(`<option value="OBR">${useNuxtApp().$i18n.t('editor.action.obr.title')}</option>`)
  options.push(`<option value="Other">${useNuxtApp().$i18n.t('editor.action.other.title')}</option>`)
  return options
}

// list of basic actions for the running batter
function renderBatterRunnerActionOptions () {
  const options = []
  options.push('<option value=""></option>')
  options.push(`<option value="exb">${useNuxtApp().$i18n.t('editor.action.extraBase.title')}</option>`)
  options.push(`<option value="fdc">${useNuxtApp().$i18n.t('editor.action.fc.title')}</option>`)
  options.push(`<option value="err">${useNuxtApp().$i18n.t('editor.action.error.title')}</option>`)
  options.push(`<option value="out">${useNuxtApp().$i18n.t('editor.action.out.title')}</option>`)
  options.push(`<option value="obr">${useNuxtApp().$i18n.t('editor.action.obr.title')}</option>`)
  return options
}

// list of basic actions for the runner
function renderRunnerActionOptions () {
  const options = []
  options.push('<option value=""></option>')
  options.push(`<option value="adv">${useNuxtApp().$i18n.t('editor.action.advance.title')}</option>`)
  options.push(`<option value="nadv">${useNuxtApp().$i18n.t('editor.action.advance.titleN')}</option>`)
  options.push(`<option value="exb">${useNuxtApp().$i18n.t('editor.action.extraBase.title')}</option>`)
  options.push(`<option value="ste">${useNuxtApp().$i18n.t('editor.action.sb.title')}</option>`)
  options.push(`<option value="fdc">${useNuxtApp().$i18n.t('editor.action.fc.title')}</option>`)
  options.push(`<option value="err">${useNuxtApp().$i18n.t('editor.action.error.title')}</option>`)
  options.push(`<option value="out">${useNuxtApp().$i18n.t('editor.action.out.title')}</option>`)
  options.push(`<option value="obr">${useNuxtApp().$i18n.t('editor.action.obr.title')}</option>`)
  return options
}

// list of specific actions based on selected base action for batter
function renderBatterSpecificActionOptions (action: string) {
  const options = []
  const bSafe = useNuxtApp().$i18n.t('editor.action.batterSafe')
  const bOut = useNuxtApp().$i18n.t('editor.action.batterOut')
  switch (action) {
    case 'StrikeOut':
      options.push(`<optgroup label="${bOut}">`)
      options.push(`<option value="KS">${useNuxtApp().$i18n.t('editor.action.strikeOut.KS')}</option>`)
      options.push(`<option value="KL">${useNuxtApp().$i18n.t('editor.action.strikeOut.KL')}</option>`)
      options.push(`<option value="KST">${useNuxtApp().$i18n.t('editor.action.strikeOut.KST')}</option>`)
      options.push(`<option value="KLT">${useNuxtApp().$i18n.t('editor.action.strikeOut.KLT')}</option>`)
      options.push(`<option value="KSR">${useNuxtApp().$i18n.t('editor.action.strikeOut.KSR')}</option>`)
      options.push(`<option value="KLR">${useNuxtApp().$i18n.t('editor.action.strikeOut.KLR')}</option>`)
      options.push(`<option value="KSB">${useNuxtApp().$i18n.t('editor.action.strikeOut.KSB')}</option>`)
      options.push(`<option value="KSI">${useNuxtApp().$i18n.t('editor.action.strikeOut.KSI')}</option>`)
      options.push(`<option value="KLI">${useNuxtApp().$i18n.t('editor.action.strikeOut.KLI')}</option>`)
      options.push('</optgroup>')
      options.push(`<optgroup label="${bSafe}">`)
      options.push(`<option value="KSET">${useNuxtApp().$i18n.t('editor.action.strikeOut.KSET')}</option>`)
      options.push(`<option value="KSE">${useNuxtApp().$i18n.t('editor.action.strikeOut.KSE')}</option>`)
      options.push(`<option value="KSWP">${useNuxtApp().$i18n.t('editor.action.strikeOut.KSWP')}</option>`)
      options.push(`<option value="KSPB">${useNuxtApp().$i18n.t('editor.action.strikeOut.KSPB')}</option>`)
      options.push(`<option value="KSO">${useNuxtApp().$i18n.t('editor.action.strikeOut.KSO')}</option>`)
      options.push(`<option value="KSFC">${useNuxtApp().$i18n.t('editor.action.strikeOut.KSFC')}</option>`)
      options.push(`<option value="KLET">${useNuxtApp().$i18n.t('editor.action.strikeOut.KLET')}</option>`)
      options.push(`<option value="KLE">${useNuxtApp().$i18n.t('editor.action.strikeOut.KLE')}</option>`)
      options.push(`<option value="KLWP">${useNuxtApp().$i18n.t('editor.action.strikeOut.KLWP')}</option>`)
      options.push(`<option value="KLPB">${useNuxtApp().$i18n.t('editor.action.strikeOut.KLPB')}</option>`)
      options.push(`<option value="KLO">${useNuxtApp().$i18n.t('editor.action.strikeOut.KLO')}</option>`)
      options.push(`<option value="KLFC">${useNuxtApp().$i18n.t('editor.action.strikeOut.KLFC')}</option>`)
      options.push('</optgroup>')
      break
    case 'GroundOut':
      options.push(`<optgroup label="${bOut}">`)
      options.push(`<option value="GO">${useNuxtApp().$i18n.t('editor.action.groundOut.GO')}</option>`)
      options.push(`<option value="GOB">${useNuxtApp().$i18n.t('editor.action.groundOut.GOB')}</option>`)
      options.push(`<option value="GDP">${useNuxtApp().$i18n.t('editor.action.groundOut.GDP')}</option>`)
      options.push('</optgroup>')
      options.push(`<optgroup label="${bSafe}">`)
      options.push(`<option value="GDPE">${useNuxtApp().$i18n.t('editor.action.groundOut.GDPE')}</option>`)
      options.push('</optgroup>')
      break
    case 'FlyOut':
      options.push(`<optgroup label="${bOut}">`)
      options.push(`<option value="F">${useNuxtApp().$i18n.t('editor.action.flyOut.F')}</option>`)
      options.push(`<option value="P">${useNuxtApp().$i18n.t('editor.action.flyOut.P')}</option>`)
      options.push(`<option value="L">${useNuxtApp().$i18n.t('editor.action.flyOut.L')}</option>`)
      options.push(`<option value="FF">${useNuxtApp().$i18n.t('editor.action.flyOut.FF')}</option>`)
      options.push(`<option value="FP">${useNuxtApp().$i18n.t('editor.action.flyOut.FP')}</option>`)
      options.push(`<option value="FL">${useNuxtApp().$i18n.t('editor.action.flyOut.FL')}</option>`)
      options.push(`<option value="IF">${useNuxtApp().$i18n.t('editor.action.flyOut.IF')}</option>`)
      options.push(`<option value="FB">${useNuxtApp().$i18n.t('editor.action.flyOut.FB')}</option>`)
      options.push(`<option value="FFB">${useNuxtApp().$i18n.t('editor.action.flyOut.FFB')}</option>`)
      options.push('</optgroup>')
      break
    case 'Hit':
      options.push(`<optgroup label="${bSafe}">`)
      options.push(`<option value="1B">${useNuxtApp().$i18n.t('editor.action.hit.1B')}</option>`)
      options.push(`<option value="2B">${useNuxtApp().$i18n.t('editor.action.hit.2B')}</option>`)
      options.push(`<option value="3B">${useNuxtApp().$i18n.t('editor.action.hit.3B')}</option>`)
      options.push(`<option value="HR">${useNuxtApp().$i18n.t('editor.action.hit.HR')}</option>`)
      options.push(`<option value="1BB">${useNuxtApp().$i18n.t('editor.action.hit.1BB')}</option>`)
      options.push(`<option value="2BG">${useNuxtApp().$i18n.t('editor.action.hit.2BG')}</option>`)
      options.push(`<option value="IHR">${useNuxtApp().$i18n.t('editor.action.hit.IHR')}</option>`)
      options.push('</optgroup>')
      break
    case 'Sacrifice':
      options.push(`<optgroup label="${bOut}">`)
      options.push(`<option value="SH">${useNuxtApp().$i18n.t('editor.action.sacrifice.SH')}</option>`)
      options.push(`<option value="SF">${useNuxtApp().$i18n.t('editor.action.sacrifice.SF')}</option>`)
      options.push(`<option value="FSF">${useNuxtApp().$i18n.t('editor.action.sacrifice.FSF')}</option>`)
      options.push('</optgroup>')
      options.push(`<optgroup label="${bSafe}">`)
      options.push(`<option value="SHE">${useNuxtApp().$i18n.t('editor.action.sacrifice.SHE')}</option>`)
      options.push(`<option value="SHET">${useNuxtApp().$i18n.t('editor.action.sacrifice.SHET')}</option>`)
      options.push(`<option value="SHEF">${useNuxtApp().$i18n.t('editor.action.sacrifice.SHEF')}</option>`) // code ends with "F" for easier output transformation
      options.push(`<option value="SHFC">${useNuxtApp().$i18n.t('editor.action.sacrifice.SHFC')}</option>`)
      options.push(`<option value="SFE">${useNuxtApp().$i18n.t('editor.action.sacrifice.SFE')}</option>`)
      options.push(`<option value="SFO">${useNuxtApp().$i18n.t('editor.action.sacrifice.SFO')}</option>`)
      options.push('</optgroup>')
      break
    case 'FC':
      options.push(`<optgroup label="${bSafe}">`)
      options.push(`<option value="O">${useNuxtApp().$i18n.t('editor.action.fc.O')}</option>`)
      options.push(`<option value="FC">${useNuxtApp().$i18n.t('editor.action.fc.FC')}</option>`)
      options.push('</optgroup>')
      break
    case 'Error':
      options.push(`<optgroup label="${bSafe}">`)
      options.push(`<option value="EF">${useNuxtApp().$i18n.t('editor.action.error.EF')}</option>`)
      options.push(`<option value="ET">${useNuxtApp().$i18n.t('editor.action.error.ET')}</option>`)
      options.push(`<option value="EDF">${useNuxtApp().$i18n.t('editor.action.error.EDF')}</option>`)
      options.push(`<option value="EDL">${useNuxtApp().$i18n.t('editor.action.error.EDL')}</option>`)
      options.push(`<option value="EDP">${useNuxtApp().$i18n.t('editor.action.error.EDP')}</option>`)
      options.push(`<option value="EDFB">${useNuxtApp().$i18n.t('editor.action.error.EDFB')}</option>`)
      options.push(`<option value="INT">${useNuxtApp().$i18n.t('editor.action.error.INT')}</option>`)
      options.push(`<option value="OB">${useNuxtApp().$i18n.t('editor.action.error.OB')}</option>`)
      options.push('</optgroup>')
      break
    case 'Advance':
      options.push(`<optgroup label="${bSafe}">`)
      options.push(`<option value="BB1">${useNuxtApp().$i18n.t('editor.action.advance.BB1')}</option>`) // "1" indicates the numbering should be included in output
      options.push(`<option value="IBB1">${useNuxtApp().$i18n.t('editor.action.advance.IBB1')}</option>`) // "1" indicates the numbering should be included in output
      options.push(`<option value="HP">${useNuxtApp().$i18n.t('editor.action.advance.HP')}</option>`)
      options.push('</optgroup>')
      break
    case 'OBR':
      options.push(`<optgroup label="${bOut}">`)
      options.push(`<option value="OBR_BOB">${useNuxtApp().$i18n.t('editor.action.obr.OBR_BOB')}</option>`)
      options.push(`<option value="OBR_BIA">${useNuxtApp().$i18n.t('editor.action.obr.OBR_BIA')}</option>`)
      options.push(`<option value="OBR_TBB">${useNuxtApp().$i18n.t('editor.action.obr.OBR_TBB')}</option>`)
      options.push(`<option value="OBR_BIC">${useNuxtApp().$i18n.t('editor.action.obr.OBR_BIC')}</option>`)
      options.push(`<option value="OBR_BOO">${useNuxtApp().$i18n.t('editor.action.obr.OBR_BOO')}</option>`)
      options.push(`<option value="OBR_RTA">${useNuxtApp().$i18n.t('editor.action.obr.OBR_RTA')}</option>`)
      options.push(`<option value="OBR_DIF">${useNuxtApp().$i18n.t('editor.action.obr.OBR_DIF')}</option>`)
      options.push(`<option value="OBR_BIN">${useNuxtApp().$i18n.t('editor.action.obr.OBR_BIN')}</option>`)
      options.push(`<option value="OBR_OIN">${useNuxtApp().$i18n.t('editor.action.obr.OBR_OIN')}</option>`)
      options.push('</optgroup>')
      break
    case 'Other':
      options.push(`<optgroup label="${bOut}">`)
      options.push(`<option value="A">${useNuxtApp().$i18n.t('editor.action.other.A')}</option>`)
      options.push(`<option value="LT">${useNuxtApp().$i18n.t('editor.action.other.LT')}</option>`)
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
  const rSafe = useNuxtApp().$i18n.t('editor.action.runnerSafe')
  const rStay = useNuxtApp().$i18n.t('editor.action.runnerStay')
  const rOut = useNuxtApp().$i18n.t('editor.action.runnerOut')
  switch (action) {
    case 'adv':
      options.push(`<optgroup label="${rSafe}">`)
      options.push(`<option value="ADV">${useNuxtApp().$i18n.t('editor.action.advance.ADV')}</option>'`)
      options.push('</optgroup>')
      break
    case 'nadv':
      options.push(`<optgroup label="${rStay}">`)
      options.push(`<option value="NADV">${useNuxtApp().$i18n.t('editor.action.advance.NADV')}</option>`)
      options.push('</optgroup>')
      break
    case 'exb':
      options.push(`<optgroup label="${rSafe}">`)
      options.push(`<option value="WP">${useNuxtApp().$i18n.t('editor.action.extraBase.WP')}</option>`)
      options.push(`<option value="PB">${useNuxtApp().$i18n.t('editor.action.extraBase.PB')}</option>`)
      if ((group.includes('-r'))) {
        // only for runners, not the running batter
        options.push(`<option value="BK">${useNuxtApp().$i18n.t('editor.action.extraBase.BK')}</option>`)
        options.push(`<option value="IP">${useNuxtApp().$i18n.t('editor.action.extraBase.IP')}</option>`)
      }
      options.push('</optgroup>')
      break
    case 'ste':
      options.push(`<optgroup label="${rSafe}">`)
      options.push(`<option value="SB">${useNuxtApp().$i18n.t('editor.action.sb.SB')}</option>`)
      options.push(`<option value="CSE">${useNuxtApp().$i18n.t('editor.action.sb.CSE')}</option>`)
      options.push(`<option value="CSET">${useNuxtApp().$i18n.t('editor.action.sb.CSET')}</option>`)
      options.push(`<option value="CSN">${useNuxtApp().$i18n.t('editor.action.sb.CSN')}</option>`)
      options.push(`<option value="CSNT">${useNuxtApp().$i18n.t('editor.action.sb.CSNT')}</option>`)
      options.push(`<option value="POE">${useNuxtApp().$i18n.t('editor.action.sb.POE')}</option>`)
      options.push('</optgroup>')
      options.push(`<optgroup label="${rOut}">`)
      options.push(`<option value="CSO">${useNuxtApp().$i18n.t('editor.action.sb.CSO')}</option>`)
      options.push(`<option value="PO">${useNuxtApp().$i18n.t('editor.action.sb.PO')}</option>`)
      options.push('</optgroup>')
      break
    case 'fdc':
      options.push(`<optgroup label="${rSafe}">`)
      options.push(`<option value="T">${useNuxtApp().$i18n.t('editor.action.fc.T')}</option>`)
      options.push(`<option value="O/">${useNuxtApp().$i18n.t('editor.action.fc.O/')}</option>`)
      if ((!group.includes('-r'))) {
        // only for running batter, not the runners
        options.push(`<option value="oc">${useNuxtApp().$i18n.t('editor.action.fc.oc')}</option>`)
      }
      options.push('</optgroup>')
      break
    case 'err':
      options.push(`<optgroup label="${rSafe}">`)
      options.push(`<option value="EF">${useNuxtApp().$i18n.t('editor.action.error.EF')}</option>`)
      options.push(`<option value="ET">${useNuxtApp().$i18n.t('editor.action.error.ET')}</option>`)
      options.push(`<option value="eF">${useNuxtApp().$i18n.t('editor.action.error.eF')}</option>`)
      options.push(`<option value="et">${useNuxtApp().$i18n.t('editor.action.error.et')}</option>`)
      options.push(`<option value="se0">${useNuxtApp().$i18n.t('editor.action.error.se0')}</option>`)
      if (!(group.includes('r1'))) {
        options.push(`<option value="se1">${useNuxtApp().$i18n.t('editor.action.error.se1')}</option>`)
      }
      if (!(group.includes('r2'))) {
        options.push(`<option value="se2">${useNuxtApp().$i18n.t('editor.action.error.se2')}</option>`)
      }
      if (!(group.includes('r3'))) {
        options.push(`<option value="se3">${useNuxtApp().$i18n.t('editor.action.error.se3')}</option>`)
      }
      options.push(`<option value="ENF">${useNuxtApp().$i18n.t('editor.action.error.ENF')}</option>`)
      options.push(`<option value="ENT">${useNuxtApp().$i18n.t('editor.action.error.ENT')}</option>`)
      options.push(`<option value="ob">${useNuxtApp().$i18n.t('editor.action.error.OB')}</option>`)
      options.push('</optgroup>')
      break
    case 'out':
      options.push(`<optgroup label="${rOut}">`)
      options.push(`<option value="GO">${useNuxtApp().$i18n.t('editor.action.out.GO')}</option>`)
      options.push(`<option value="GOT">${useNuxtApp().$i18n.t('editor.action.out.GOT')}</option>`)
      options.push(`<option value="A">${useNuxtApp().$i18n.t('editor.action.out.A')}</option>`)
      options.push('</optgroup>')
      break
    case 'obr':
      options.push(`<optgroup label="${rOut}">`)
      options.push(`<option value="OBR_rta">${useNuxtApp().$i18n.t('editor.action.obr.OBR_RTA')}</option>`)
      options.push(`<option value="OBR_hbb">${useNuxtApp().$i18n.t('editor.action.obr.OBR_hbb')}</option>`)
      options.push(`<option value="OBR_rol">${useNuxtApp().$i18n.t('editor.action.obr.OBR_rol')}</option>`)
      options.push(`<option value="OBR_ppr">${useNuxtApp().$i18n.t('editor.action.obr.OBR_ppr')}</option>`)
      options.push(`<option value="OBR_rro">${useNuxtApp().$i18n.t('editor.action.obr.OBR_rro')}</option>`)
      options.push(`<option value="OBR_rin">${useNuxtApp().$i18n.t('editor.action.obr.OBR_rin')}</option>`)
      options.push(`<option value="OBR_rle">${useNuxtApp().$i18n.t('editor.action.obr.OBR_rle')}</option>`)
      options.push(`<option value="OBR_rhe">${useNuxtApp().$i18n.t('editor.action.obr.OBR_rhe')}</option>`)
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
