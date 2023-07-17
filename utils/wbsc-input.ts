/* *************************************** */
/* wbsc-input.js                           */
/* Preparing and adjusting user inputs     */
/* *************************************** */

import { WBSCInput, WBSCOutput } from '@/composables/useInputStore'

// create bar with action buttons
function renderActionButtons () {
  // in case of re-init (e.g. upon translation), remove previous
  document.getElementById(classTools)?.remove()

  const actionButtonsContainer = document.createElement('div')
  actionButtonsContainer.setAttribute('id', classTools)
  actionButtonsContainer.setAttribute('class', 'wbsc-buttons')

  const renderBatterButton = renderInputsButton(inputB)
  actionButtonsContainer.appendChild(renderBatterButton)

  const renderRunner1Button = renderInputsButton(inputR1)
  actionButtonsContainer.appendChild(renderRunner1Button)

  const renderRunner2Button = renderInputsButton(inputR2)
  actionButtonsContainer.appendChild(renderRunner2Button)

  const renderRunner3Button = renderInputsButton(inputR3)
  actionButtonsContainer.appendChild(renderRunner3Button)

  actionButtonsContainer.appendChild(document.createElement('br'))

  const generateButton = renderInputsButton(inputGenerate)
  generateButton.setAttribute('class', 'btn btn-generate')
  actionButtonsContainer.appendChild(generateButton)

  const clearButton = renderInputsButton(inputClear)
  clearButton.setAttribute('class', 'btn btn-clear')
  actionButtonsContainer.appendChild(clearButton)

  actionButtonsContainer.appendChild(document.createElement('br'))

  const importButton = renderInputsButton(inputImport)
  importButton.setAttribute('class', 'btn btn-json')
  actionButtonsContainer.appendChild(importButton)

  const jsonFileInput = document.createElement('input') as HTMLInputElement
  jsonFileInput.id = inputImportFile
  jsonFileInput.type = 'file'
  jsonFileInput.style.display = 'none'
  jsonFileInput.addEventListener('change', () => {
    importInputFromJSON()
  })
  actionButtonsContainer.appendChild(jsonFileInput)

  const importLibButton = renderInputsButton(inputImportLib)
  importLibButton.setAttribute('class', 'btn btn-json')
  actionButtonsContainer.appendChild(importLibButton)

  const exportButton = renderInputsButton(inputExport)
  exportButton.setAttribute('class', 'btn btn-json')
  actionButtonsContainer.appendChild(exportButton)

  const container = document.getElementById(classWbsc) as HTMLElement
  container.appendChild(actionButtonsContainer)
}

// create action button
//   group - new element's DOM id
//   parentDiv - null for buttons on action bar
//             - inputs group for button to add/remove additional inputs for consecutive actions
function renderInputsButton (group: string, parentDiv?: HTMLElement) {
  const renderButton = document.createElement('button')
  renderButton.setAttribute('id', 'button-' + group)
  renderButton.setAttribute('type', 'button')
  renderButton.setAttribute('class', 'btn btn-add')
  renderButton.addEventListener('click', function () {
    switch (group) {
      case inputGenerate:
        processAction()
        break
      case inputImport:
        document.getElementById(inputImportFile)?.click()
        break
      case inputImportLib:
        useEvalStore().importShow = true
        break
      case inputExport:
        exportInputAsJSON()
        break
      case inputClear:
        clearInputs()
        break
      default:
        renderInputs(group, parentDiv)
    }
  })
  renderButton.innerHTML = getLabelForRenderButton(group, true)

  return renderButton
}

// clear all user inputs and reset default state
function clearInputs () {
  hideInputs(inputB)
  hideInputs(inputR1)
  hideInputs(inputR2)
  hideInputs(inputR3)

  showInputs(inputB)

  clearJSONInput()

  useEvalStore().$reset()
  useInputStore().$reset()
  useCanvasStore().init()
}

// show or hide given input group
//   group - DOM id of encapsulating div
//   parentDiv - ancestor of encapsulating div in DOM hieararchy
function renderInputs (group: string, parentDiv?: HTMLElement) {
  const renderButton = document.getElementById('button-' + group) as HTMLElement
  if (renderButton.innerHTML.includes('+')) {
    showInputs(group, parentDiv)
  } else {
    hideInputs(group)
  }
}

// show given input group
// fuction renders all required inputs and places them into new div
//   group - DOM id of encapsulating div
//   parentDiv - ancestor of encapsulating div in DOM hieararchy
function showInputs (group: string, parentDiv?: HTMLElement) {
  const inputsContainer = document.createElement('div')
  inputsContainer.setAttribute('id', group)

  if (!parentDiv) {
    inputsContainer.setAttribute('class', classWbsc)

    const container = document.getElementById(classWbsc) as HTMLElement
    const hook = getProperLocationForInputs(group)
    container.insertBefore(inputsContainer, hook)
  } else {
    const parentDiv = getParentDiv(group, true)
    const container = document.getElementById(parentDiv) as HTMLElement
    container.appendChild(inputsContainer)
  }

  if (!parentDiv) {
    const batterLabel = document.createElement('label')
    batterLabel.innerHTML = getLabelForInputGroup(group)
    inputsContainer.appendChild(batterLabel)
    inputsContainer.appendChild(document.createElement('br'))
  }

  if (group !== inputB) {
    renderBaseSelection(group)
  } else {
    const runTypeLabel = document.createElement('label')
    runTypeLabel.innerHTML = useNuxtApp().$i18n.t('editor.run') + ':&nbsp;'
    inputsContainer.appendChild(runTypeLabel)

    const runTypeSelect = document.createElement('select')
    runTypeSelect.setAttribute('id', inputB + inputRuntype)
    runTypeSelect.innerHTML = renderRunTypeOptions().join(' ')
    runTypeSelect.disabled = true
    inputsContainer.appendChild(runTypeSelect)
    inputsContainer.appendChild(document.createElement('br'))
  }

  const actionLabel = document.createElement('label')
  actionLabel.innerHTML = useNuxtApp().$i18n.t('editor.action.action') + ':&nbsp;'
  inputsContainer.appendChild(actionLabel)

  const baseActionSelect = document.createElement('select')
  baseActionSelect.setAttribute('id', group + inputBaseAction)
  baseActionSelect.setAttribute('class', 'wbsc-base-action-select form-control')
  baseActionSelect.addEventListener('change', function () {
    changeBaseAction(group)
  })
  switch (group) {
    case inputB:
      baseActionSelect.innerHTML = renderBatterActionOptions().join(' ')
      break
    case inputB1:
    case inputB2:
    case inputB3:
      baseActionSelect.innerHTML = renderBatterRunnerActionOptions().join(' ')
      break
    case inputR1:
    case inputR1a:
    case inputR1b:
    case inputR2:
    case inputR2a:
    case inputR3:
      baseActionSelect.innerHTML = renderRunnerActionOptions().join(' ')
      break
  }
  inputsContainer.appendChild(baseActionSelect)

  const specificActionSelect = document.createElement('select')
  specificActionSelect.setAttribute('id', group + inputSpecAction)
  specificActionSelect.setAttribute('class', 'wbsc-specific-action-select form-control')
  specificActionSelect.addEventListener('change', function () {
    changeSpecificAction(group)
  })
  specificActionSelect.innerHTML = '<option class="blank" />'
  specificActionSelect.disabled = true
  inputsContainer.appendChild(specificActionSelect)

  renderPosSelection(group)

  const additionalInputsGroup = getAdditionalInputsGroup(group)
  if (additionalInputsGroup) {
    const renderExtraButton = renderInputsButton(additionalInputsGroup, inputsContainer)
    inputsContainer.appendChild(renderExtraButton)
    inputsContainer.appendChild(document.createElement('br'))
  }

  const renderButton = document.getElementById('button-' + group) as HTMLInputElement
  renderButton.setAttribute('class', 'btn btn-remove')
  renderButton.innerHTML = getLabelForRenderButton(group, false)

  disableParentExtraInput(group, true)
}

// hide given input group
// function removes div with all contents from document
//   group - DOM id of encapsulating div
function hideInputs (group: string) {
  const parentDiv = getParentDiv(group, false)
  const container = document.getElementById(parentDiv) as HTMLElement
  const inputsContainer = document.getElementById(group)
  if (inputsContainer) {
    container.removeChild(inputsContainer)
  }

  const renderButton = document.getElementById('button-' + group) as HTMLInputElement
  renderButton.setAttribute('class', 'btn btn-add')
  renderButton.innerHTML = getLabelForRenderButton(group, true)

  disableParentExtraInput(group, false)
}

// render select with target base where the action happened
// + possible TIE checker
// inside given input group
function renderBaseSelection (group: string) {
  const inputsContainer = document.getElementById(group) as HTMLElement

  if (group === inputR1 || group === inputR2) {
    const baseTIECheck = document.createElement('input')
    baseTIECheck.type = 'checkbox'
    baseTIECheck.setAttribute('class', 'wbsc-select')
    baseTIECheck.setAttribute('id', group + inputTie)
    inputsContainer.appendChild(baseTIECheck)

    const baseTIELabel = document.createElement('label')
    if (group === inputR1) {
      baseTIELabel.innerHTML = '&nbsp;Tiebreak (baseball)'
    } else {
      baseTIELabel.innerHTML = '&nbsp;Tiebreak (baseball/softball)'
    }
    inputsContainer.appendChild(baseTIELabel)

    inputsContainer.appendChild(document.createElement('br'))
  }

  const baseLabel = document.createElement('label')
  baseLabel.innerHTML = useNuxtApp().$i18n.t('editor.base.base') + ':&nbsp;'
  inputsContainer.appendChild(baseLabel)

  let runTypeSelectDisabled = true
  const baseSelect = document.createElement('select')
  baseSelect.setAttribute('id', group + inputBase)
  switch (group) {
    case inputB1:
    case inputR1:
      baseSelect.innerHTML = renderBaseOptions(1).join(' ')
      break
    case inputB2:
    case inputR1a:
    case inputR2:
      baseSelect.innerHTML = renderBaseOptions(2).join(' ')
      break
    case inputB3:
    case inputR1b:
    case inputR2a:
    case inputR3:
      baseSelect.innerHTML = renderBaseOptions(3).join(' ')
      runTypeSelectDisabled = false
      break
  }
  baseSelect.addEventListener('change', function () {
    changeBase(group)
  })
  inputsContainer.appendChild(baseSelect)

  const runTypeLabel = document.createElement('label')
  runTypeLabel.innerHTML = '&nbsp;' + useNuxtApp().$i18n.t('editor.run') + ':&nbsp;'
  inputsContainer.appendChild(runTypeLabel)

  const runTypeSelect = document.createElement('select')
  runTypeSelect.setAttribute('id', group + inputRuntype)
  runTypeSelect.innerHTML = renderRunTypeOptions().join(' ')
  runTypeSelect.disabled = runTypeSelectDisabled
  inputsContainer.appendChild(runTypeSelect)

  inputsContainer.appendChild(document.createElement('br'))
}

// render selects and buttons to adjust involved players/positions
// inside given input group
function renderPosSelection (group: string) {
  const groupID = group + inputPosition

  const inputsContainer = document.createElement('div')
  inputsContainer.setAttribute('id', groupID)

  const involvedLabel = document.createElement('label')
  involvedLabel.innerHTML = useNuxtApp().$i18n.t('editor.involved') + ':&nbsp;'
  inputsContainer.appendChild(involvedLabel)

  const addItemButton = document.createElement('button')
  addItemButton.setAttribute('id', groupID + inputAdd)
  addItemButton.setAttribute('type', 'button')
  addItemButton.setAttribute('class', 'btn btn-add')
  addItemButton.addEventListener('click', function () {
    renderPosSelectItem(group)
  })
  addItemButton.disabled = true
  addItemButton.innerHTML = '+P'
  inputsContainer.appendChild(addItemButton)

  const removeItemButton = document.createElement('button')
  removeItemButton.setAttribute('id', groupID + inputRemove)
  removeItemButton.setAttribute('type', 'button')
  removeItemButton.setAttribute('class', 'btn btn-remove')
  removeItemButton.addEventListener('click', function () {
    unRenderPosSelectItem(group)
  })
  removeItemButton.disabled = true
  removeItemButton.innerHTML = '-P'
  inputsContainer.appendChild(removeItemButton)

  const container = document.getElementById(group) as HTMLElement
  container.appendChild(document.createElement('br'))
  container.appendChild(inputsContainer)
}

// render one new select for players/locations inside given group
// select is added at the end if possible
function renderPosSelectItem (group: string) {
  const groupID = group + inputPosition
  const container = document.getElementById(groupID) as HTMLElement
  const renderButton = document.getElementById(groupID + inputAdd) as HTMLInputElement
  const unRenderButton = document.getElementById(groupID + inputRemove) as HTMLInputElement

  let itemsCreated = container.getElementsByClassName(classWbscPos).length
  if (itemsCreated < useEvalStore().getMaxPosItems(group)) {
    itemsCreated += 1
    const posItemN = getPosSelectionSelect(group, itemsCreated)
    container.insertBefore(posItemN, renderButton)
  }

  renderButton.disabled = itemsCreated >= useEvalStore().getMaxPosItems(group)
  unRenderButton.disabled = itemsCreated <= useEvalStore().getMinPosItems(group)
}

// removes one select for players/locations from given group
// select is removed from the end if possible
function unRenderPosSelectItem (group: string) {
  const groupID = group + inputPosition
  const container = document.getElementById(groupID) as HTMLElement
  const renderButton = document.getElementById(groupID + inputAdd) as HTMLInputElement
  const unRenderButton = document.getElementById(groupID + inputRemove) as HTMLInputElement

  let itemsCreated = container.getElementsByClassName(classWbscPos).length
  if (itemsCreated > useEvalStore().getMinPosItems(group)) {
    const posItemN = document.getElementById(groupID + itemsCreated) as HTMLElement
    container.removeChild(posItemN)
    itemsCreated--
  }

  renderButton.disabled = itemsCreated >= useEvalStore().getMaxPosItems(group)
  unRenderButton.disabled = itemsCreated <= useEvalStore().getMinPosItems(group)
}

// physically creates new select for players/locations
//   group - target inputs group
//   ord - position inside the group
function getPosSelectionSelect (group: string, ord: number) {
  const groupID = group + inputPosition

  const posItem = document.createElement('select')
  posItem.setAttribute('id', groupID + ord)
  posItem.setAttribute('class', classWbscPos)

  const posSelection = useEvalStore().getPosSelection(groupID)
  posItem.innerHTML = renderPlayerOptions().join(' ')
  if (posSelection.length > ord - 1) {
    posItem.value = posSelection[ord - 1]
  }

  posItem.addEventListener('change', function () {
    getPosSelection(group)
  })

  return posItem
}

// when there is more input groups for consecutive actions for one base
// (possible only for B or R1), only the last group can be removed
// therefore other removal buttons have to be disabled when new input group is added
//   group - target inputs group
//   disable - state of the button (true for 'disabled')
function disableParentExtraInput (group: string, disable: boolean) {
  let parentExtraButtonId = null
  switch (group) {
    case inputB2:
      parentExtraButtonId = inputB1
      break
    case inputB3:
      parentExtraButtonId = inputB2
      break
    case inputR1b:
      parentExtraButtonId = inputR1a
      break
  }
  if (parentExtraButtonId) {
    const parentExtraButton = document.getElementById('button-' + parentExtraButtonId) as HTMLInputElement
    parentExtraButton.disabled = disable
  }
}

// when specific action results into an out, we want to disable further action generating
// therefore we may disable the corresponding extra inputs render button
function disableExtraInput (group: string, disable: boolean) {
  let extraButtonId = null
  switch (group) {
    case inputB:
      extraButtonId = inputB1
      break
    case inputB1:
      extraButtonId = inputB2
      break
    case inputB2:
      extraButtonId = inputB3
      break
    case inputR1:
      extraButtonId = inputR1a
      break
    case inputR1a:
      extraButtonId = inputR1b
      break
    case inputR2:
      extraButtonId = inputR2a
      break
  }
  if (extraButtonId) {
    const extraButton = document.getElementById('button-' + extraButtonId) as HTMLInputElement
    if (extraButton.innerText === '+') {
      extraButton.disabled = disable
    }
  }
}

// find encapsulating div when showing/hiding input groups
//   group - given input group
//   show - triggering action (showing or hiding)
function getParentDiv (group: string, show: boolean) {
  let parentDiv
  switch (group) {
    case inputB1:
    case inputB2:
    case inputB3:
      parentDiv = inputB
      break
    case inputR1a:
    case inputR1b:
      parentDiv = inputR1
      break
    case inputR2a:
      parentDiv = inputR2
      break
    default:
      parentDiv = show ? group : classWbsc
  }
  return parentDiv
}

// find the next available input subgroup for consecutive actions
//   group - given input group
function getAdditionalInputsGroup (group: string) {
  let additionalInputsGroup
  switch (group) {
    case inputB:
      additionalInputsGroup = inputB1
      break
    case inputB1:
      additionalInputsGroup = inputB2
      break
    case inputB2:
      additionalInputsGroup = inputB3
      break
    case inputR1:
      additionalInputsGroup = inputR1a
      break
    case inputR1a:
      additionalInputsGroup = inputR1b
      break
    case inputR2:
      additionalInputsGroup = inputR2a
      break
    default:
      additionalInputsGroup = null
  }
  return additionalInputsGroup
}

// helps maintaining correct order of input groups (HP - 1B - 2B - 3B)
function getProperLocationForInputs (group: string) {
  let hook = document.getElementById(classTools)

  const r1inputs = document.getElementById(inputR1)
  const r2inputs = document.getElementById(inputR2)
  const r3inputs = document.getElementById(inputR3)

  switch (group) {
    case inputB:
    case inputB1:
    case inputB2:
    case inputB3:
      if (r1inputs) {
        hook = r1inputs
      } else if (r2inputs) {
        hook = r2inputs
      } else if (r3inputs) {
        hook = r3inputs
      }
      break
    case inputR1:
    case inputR1a:
    case inputR1b:
      if (r2inputs) {
        hook = r2inputs
      } else if (r3inputs) {
        hook = r3inputs
      }
      break
    case inputR2:
    case inputR2a:
      if (r3inputs) {
        hook = r3inputs
      }
      break
  }

  return hook
}

function getEmptyInput (plain: boolean): WBSCInput {
  const input: WBSCInput = {
    group: '',
    baseAction: '',
    specAction: '',
    origBase: 0,
    base: 0,
    tie: false
  }

  if (!plain) {
    input.validation = ''
    input.output = getEmptyOutput()
  }

  return input
}

function getEmptyOutput (): WBSCOutput {
  const output: WBSCOutput = {
    previousAdvance: false,
    batter: 0,
    origBase: 0,
    base: 0,
    text1: '',
    out: false,
    hit: false,
    num: false,
    errorTarget: 0,
    na: false
  }
  return output
}

// reset JSON file import button
function clearJSONInput () {
  const jsonInput = document.getElementById(inputImportFile) as HTMLInputElement
  if (jsonInput) {
    jsonInput.files = null
    jsonInput.value = ''
  }
}

export {
  renderActionButtons, renderInputs, clearInputs, renderPosSelectItem, unRenderPosSelectItem,
  getPosSelectionSelect, disableExtraInput, getEmptyInput, getEmptyOutput
}
