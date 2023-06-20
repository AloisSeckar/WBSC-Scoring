/* *************************************** */
/* wbsc-html.js                            */
/* Helpers to get html code to be inserted */
/* *************************************** */

// displayed title for given input group
function getLabelForInputGroup (group: string) {
  let label = '<strong>'
  switch (group) {
    case inputB:
      label += 'Batter'
      break
    case inputR1:
      label += 'Runner at 1st'
      break
    case inputR2:
      label += 'Runner at 2nd'
      break
    case inputR3:
      label += 'Runner at 3rd'
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
      label = 'Generate action'
      break
    case inputImport:
      label = '&#8664; Import from file'
      break
    case inputImportLib:
      label = '&#8664; Import from library'
      break
    case inputExport:
      label = 'Export selection &#8663;'
      break
    case inputClear:
      label = 'Clear'
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
    if (base === 1) {
      options.push('<option value="2" selected>2nd</option>')
    } else {
      options.push('<option value="2">2nd</option>')
    }
  }
  if (base < 3) {
    if (base === 2) {
      options.push('<option value="3" selected>3rd</option>')
    } else {
      options.push('<option value="3">3rd</option>')
    }
  }
  if (base === 3) {
    options.push('<option value="4" selected>Home</option>')
  } else {
    options.push('<option value="4">Home</option>')
  }
  return options
}

// list of possible run types
function renderRunTypeOptions () {
  const options = []
  options.push('<option value="e">Earned</option>')
  options.push('<option value="ue">Unearned</option>')
  options.push('<option value="tu">Team unearned</option>')
  return options
}

// list of basic actions for the batter
function renderBatterActionOptions () {
  const options = []
  options.push('<option value=""></option>')
  options.push('<option id="b-action-k" value="StrikeOut">Strike out</option>')
  options.push('<option id="b-action-go" value="GroundOut">Ground out</option>')
  options.push('<option id="b-action-fp" value="FlyOut">Fly out</option>')
  options.push('<option id="b-action-hit" value="Hit">Hit</option>')
  options.push('<option id="b-action-sac" value="Sacrifice">Sacrifice</option>')
  options.push('<option id="b-action-fc" value="FC">Fielder\'s choice</option>')
  options.push('<option id="b-action-e" value="Error">Error</option>')
  options.push('<option id="b-action-adv" value="Advance">Advance to 1st</option>')
  options.push('<option id="b-action-obr" value="OBR">Out by rule</option>')
  options.push('<option id="b-action-other" value="Other">Other out</option>')
  return options
}

// list of basic actions for the running batter
function renderBatterRunnerActionOptions () {
  const options = []
  options.push('<option value=""></option>')
  options.push('<option value="exb">Extra base</option>')
  options.push('<option value="fdc">Fielder\'s choice</option>')
  options.push('<option value="err">Error</option>')
  options.push('<option value="out">Out</option>')
  options.push('<option value="obr">Out by rule</option>')
  return options
}

// list of basic actions for the runner
function renderRunnerActionOptions () {
  const options = []
  options.push('<option value=""></option>')
  options.push('<option value="adv">Advanced by batter</option>')
  options.push('<option value="nadv">No advance</option>')
  options.push('<option value="exb">Extra base</option>')
  options.push('<option value="ste">Steal / CS</option>')
  options.push('<option value="fdc">Fielder\'s choice</option>')
  options.push('<option value="err">Error</option>')
  options.push('<option value="out">Out</option>')
  options.push('<option value="obr">Out by rule</option>')
  return options
}

// list of specific actions based on selected base action for batter
function renderBatterSpecificActionOptions (action: string) {
  const options = []
  switch (action) {
    case 'StrikeOut':
      options.push('<optgroup label="Batter is out">')
      options.push('<option value="KS">Swinging</option>')
      options.push('<option value="KL">Looking</option>')
      options.push('<option value="KST">Swinging with tag/throw out</option>')
      options.push('<option value="KLT">Looking with tag/throw out</option>')
      options.push('<option value="KSR">Swinging - out by Rule</option>')
      options.push('<option value="KLR">Looking - out by Rule</option>')
      options.push('<option value="KSB">Swinging - Bunting foul third strike</option>')
      options.push('<option value="KSI">Swinging - offensive Interference</option>')
      options.push('<option value="KLI">Looking - offensive Interference</option>')
      options.push('</optgroup>')
      options.push('<optgroup label="Batter is safe">')
      options.push('<option value="KSET">Swinging with throwing error</option>')
      options.push('<option value="KSE">Swinging with fielding error</option>')
      options.push('<option value="KSWP">Swinging with wild pitch</option>')
      options.push('<option value="KSPB">Swinging with passed ball</option>')
      options.push('<option value="KSO">Swinging with putting out runner</option>')
      options.push('<option value="KSFC">Swinging with fielder\'s choice</option>')
      options.push('<option value="KLET">Looking with throwing error</option>')
      options.push('<option value="KLE">Looking with fielding error</option>')
      options.push('<option value="KLWP">Looking with wild pitch</option>')
      options.push('<option value="KLPB">Looking with passed ball</option>')
      options.push('<option value="KLO">Looking with putting out runner</option>')
      options.push('<option value="KLFC">Looking with fielder\'s choice</option>')
      options.push('</optgroup>')
      break
    case 'GroundOut':
      options.push('<optgroup label="Batter is out">')
      options.push('<option value="GO">Ground out</option>')
      options.push('<option value="GOB">Ground out - bunt</option>')
      options.push('<option value="GDP">Grounded into double play</option>')
      options.push('</optgroup>')
      options.push('<optgroup label="Batter is safe">')
      options.push('<option value="GDPE">GDP with error</option>')
      options.push('</optgroup>')
      break
    case 'FlyOut':
      options.push('<optgroup label="Batter is out">')
      options.push('<option value="F">Fly out</option>')
      options.push('<option value="P">Pop out</option>')
      options.push('<option value="L">Line out</option>')
      options.push('<option value="FF">Fouled fly out</option>')
      options.push('<option value="FP">Fouled pop out</option>')
      options.push('<option value="FL">Fouled line out</option>')
      options.push('<option value="IF">Infield fly</option>')
      options.push('<option value="FB">Fly out - bunt</option>')
      options.push('<option value="FFB">Fouled fly out - bunt</option>')
      options.push('</optgroup>')
      break
    case 'Hit':
      options.push('<optgroup label="Batter is safe">')
      options.push('<option value="1B">Single</option>')
      options.push('<option value="2B">Double</option>')
      options.push('<option value="3B">Triple</option>')
      options.push('<option value="HR">Home run</option>')
      options.push('<option value="1BB">Single - bunt</option>')
      options.push('<option value="2BG">Double - ground rule</option>')
      options.push('<option value="IHR">Home run - inside the park</option>')
      options.push('</optgroup>')
      break
    case 'Sacrifice':
      options.push('<optgroup label="Batter is out">')
      options.push('<option value="SH">Sacrifice bunt</option>')
      options.push('<option value="SF">Sacrifice fly</option>')
      options.push('<option value="FSF">Sacrifice fly in foul territory</option>')
      options.push('</optgroup>')
      options.push('<optgroup label="Batter is safe">')
      options.push('<option value="SHE">Sacrifice bunt with fielding error</option>')
      options.push('<option value="SHET">Sacrifice bunt with throwing error</option>')
      options.push('<option value="SHEF">Sacrifice bunt with dropped fly</option>') // code ends with "F" for easier output transformation
      options.push('<option value="SHFC">Sacrifice bunt with FC</option>')
      options.push('<option value="SFE">Sacrifice fly with error</option>')
      options.push('<option value="SFO">Dropped sacrifice fly + forced out</option>')
      options.push('</optgroup>')
      break
    case 'FC':
      options.push('<optgroup label="Batter is safe">')
      options.push('<option value="O">Occupied</option>')
      options.push('<option value="FC">Fielder\'s choice</option>')
      options.push('</optgroup>')
      break
    case 'Error':
      options.push('<optgroup label="Batter is safe">')
      options.push('<option value="EF">Fielding error</option>')
      options.push('<option value="ET">Throwing error</option>')
      options.push('<option value="EDF">Dropped fly</option>')
      options.push('<option value="EDL">Dropped fly - line</option>')
      options.push('<option value="EDP">Dropped fly - pop</option>')
      options.push('<option value="EDFB">Dropped foul</option>')
      options.push('<option value="INT">Catcher\'s interference</option>')
      options.push('<option value="OB">Obstruction</option>')
      options.push('</optgroup>')
      break
    case 'Advance':
      options.push('<optgroup label="Batter is safe">')
      options.push('<option value="BB1">Base on balls</option>') // "1" indicates the numbering should be included in output
      options.push('<option value="IBB1">Intentional base on balls</option>') // "1" indicates the numbering should be included in output
      options.push('<option value="HP">Hit by pitch</option>')
      options.push('</optgroup>')
      break
    case 'OBR':
      options.push('<optgroup label="Batter is out">')
      options.push('<option value="OBR_BOB">Batter Out of the Box</option>')
      options.push('<option value="OBR_BIA">Batter\'s Illegal Action</option>')
      options.push('<option value="OBR_TBB">Touched by Batted Ball</option>')
      options.push('<option value="OBR_BIC">Batter Interfering with the Catcher</option>')
      options.push('<option value="OBR_BOO">Batting Out of Order</option>')
      options.push('<option value="OBR_RTA">Refusing To Advance</option>')
      options.push('<option value="OBR_DIF">Dropped Infield Fly</option>')
      options.push('<option value="OBR_BIN">Batter Interference</option>')
      options.push('<option value="OBR_OIN">Other Interference</option>')
      options.push('</optgroup>')
      break
    case 'Other':
      options.push('<optgroup label="Batter is out">')
      options.push('<option value="A">Appeal play</option>')
      options.push('<option value="LT">Lost turn</option>')
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
  switch (action) {
    case 'adv':
      options.push('<optgroup label="Runner is safe">')
      options.push('<option value="ADV">Advanced by batter</option>')
      options.push('</optgroup>')
      break
    case 'nadv':
      options.push('<optgroup label="Runner stays">')
      options.push('<option value="NADV">No advance</option>')
      options.push('</optgroup>')
      break
    case 'exb':
      options.push('<optgroup label="Runner is safe">')
      options.push('<option value="WP">Wild pitch</option>')
      options.push('<option value="PB">Passed ball</option>')
      if ((group.includes('-r'))) {
        // only for runners, not the running batter
        options.push('<option value="BK">Balk (baseball)</option>')
        options.push('<option value="IP">Illegal pitch (softball)</option>')
      }
      options.push('</optgroup>')
      break
    case 'ste':
      options.push('<optgroup label="Runner is safe">')
      options.push('<option value="SB">Stolen base</option>')
      options.push('<option value="CSE">Caught stealing with fielding error</option>')
      options.push('<option value="CSET">Caught stealing with throwing error</option>')
      options.push('<option value="CSN">Caught stealing with fielding error (no advance)</option>')
      options.push('<option value="CSNT">Caught stealing with throwing error (no advance)</option>')
      options.push('<option value="POE">Picked off with (throwing) error</option>')
      options.push('</optgroup>')
      options.push('<optgroup label="Runner is out">')
      options.push('<option value="CSO">Caught stealing</option>')
      options.push('<option value="PO">Picked off</option>')
      options.push('</optgroup>')
      break
    case 'fdc':
      options.push('<optgroup label="Runner is safe">')
      options.push('<option value="T">On the throw</option>')
      options.push('<option value="O/">Indifference</option>')
      options.push('</optgroup>')
      break
    case 'err':
      options.push('<optgroup label="Runner is safe">')
      options.push('<option value="EF">Decisive fielding</option>')
      options.push('<option value="ET">Decisive throwing</option>')
      options.push('<option value="eF">Extra base fielding</option>')
      options.push('<option value="et">Extra base throwing</option>')
      options.push('<option value="se0">Same error (Batter)</option>')
      if (!(group.includes('r1'))) {
        options.push('<option value="se1">Same error (Runner at 1st)</option>')
      }
      if (!(group.includes('r2'))) {
        options.push('<option value="se2">Same error (Runner at 2nd)</option>')
      }
      if (!(group.includes('r3'))) {
        options.push('<option value="se3">Same error (Runner at 3rd)</option>')
      }
      options.push('<option value="ENF">Decisive fielding (no advance)</option>')
      options.push('<option value="ENT">Decisive throwing (no advance)</option>')
      options.push('<option value="ob">Obstruction</option>')
      options.push('</optgroup>')
      break
    case 'out':
      options.push('<optgroup label="Runner is out">')
      options.push('<option value="GO">Force out</option>')
      options.push('<option value="GOT">Tag out</option>')
      options.push('<option value="A">Appeal play</option>')
      options.push('</optgroup>')
      break
    case 'obr':
      options.push('<optgroup label="Runner is out">')
      options.push('<option value="OBR_rta">Refusing To Advance</option>')
      options.push('<option value="OBR_hbb">Hit by fair Batted Ball</option>')
      options.push('<option value="OBR_rol">Running Out of Line</option>')
      options.push('<option value="OBR_ppr">Passing a Preceding Runner</option>')
      options.push('<option value="OBR_rro">Running the bases in Reverse Order</option>')
      options.push('<option value="OBR_rin">Runner Interference</option>')
      options.push('<option value="OBR_rle">Runner Left Early (softball)</option>')
      options.push('<option value="OBR_rhe">Removal of Helmet (softball)</option>')
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
