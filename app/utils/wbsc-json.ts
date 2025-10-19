/* *************************************** */
/* wbsc-json.ts                            */
/* Processing JSON input of stored action  */
/* *************************************** */

// export current input selection as JSON file
// by https://bobbyhadz.com/blog/javascript-set-blob-filename
export function exportInputAsJSON() {
  const actions = trimInputs(useInputStore().getInputs())
  const json = JSON.stringify(actions)
  const blob = new Blob([json], {
    type: 'application/octet-stream',
  })

  const url = window.URL.createObjectURL(blob)

  const anchorElement = document.createElement('a')
  anchorElement.href = url
  anchorElement.download = 'wbsc-input.json'
  anchorElement.style.display = 'none'

  document.body.appendChild(anchorElement)
  anchorElement.click()

  window.URL.revokeObjectURL(url)
}

export function importFile() {
  document.getElementById(inputImportFile)?.click()
}

export async function importInputFromJSON() {
  const fileInput = document.getElementById(inputImportFile) as HTMLInputElement
  const file = fileInput?.files?.[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = async (event) => {
      await processFile(event.target?.result)
    }
    reader.readAsText(file)
  }
  // TODO we may want to log errors...
}

export async function importInputFromLib(fileName: string) {
  fetch('/json/' + fileName + '.json')
    .then(response => response.json())
    .then(async (fileData) => {
      await processFile(JSON.stringify(fileData))
    })
    // TODO we may want to log errors...
}

async function processFile(fileData: string | ArrayBuffer | null | undefined) {
  if (fileData) {
    clearInputs()
    useInputStore().inputB.visible = false
    const jsonData: WBSCActionJson[] = JSON.parse(fileData.toString())
    for (const input of jsonData) {
      await setInputFromJSON(input)
    }
    processAction()
  }
}

async function setInputFromJSON(input: WBSCActionJson) {
  const guiModel = useInputStore().getModel(input.group)

  guiModel.baseAction = input.baseAction
  await new Promise(resolve => setTimeout(resolve, 0))

  guiModel.specAction = input.specAction
  await new Promise(resolve => setTimeout(resolve, 0))

  guiModel.tie = !!input.tie
  guiModel.nodp = !!input.nodp
  guiModel.base = input.base
  guiModel.runtype = input.runtype

  const pos = input.pos
  if (pos) {
    // legacy .json - only one "pos" element that needs to be parsed
    // usually starts with a number (fielding position),
    // but hits are an exception (they can be 2-3 letter strings)
    if (!pos.match(/^\d/)) {
      useEvalStore().setTargetPosItems(input.group, 1)
      guiModel.pos1 = pos
    } else {
      const length = pos.length
      useEvalStore().setTargetPosItems(input.group, length)
      if (length > 0) {
        guiModel.pos1 = pos[0]!
      }
      if (length > 1) {
        guiModel.pos2 = pos[1]!
      }
      if (length > 2) {
        guiModel.pos3 = pos[2]!
      }
      if (length > 3) {
        guiModel.pos4 = pos[3]!
      }
    }
  } else {
    // since #217 - there are 4 separate variables
    const length = getPosSelected(input.pos1, input.pos2, input.pos3, input.pos4)
    useEvalStore().setTargetPosItems(input.group, length)
    guiModel.pos1 = input.pos1 || ''
    guiModel.pos2 = input.pos2 || ''
    guiModel.pos3 = input.pos3 || ''
    guiModel.pos4 = input.pos4 || ''
  }

  useInputStore().setVisible(input.group, true)
}

function getPosSelected(...args: (string | undefined | null)[]) {
  return args.filter(arg => !!arg).length
}

type WBSCInputJson = Pick<WBSCAction, 'group' | 'baseAction' | 'specAction' | 'origBase' | 'base' | 'tie' | 'nodp' | 'pos1' | 'pos2' | 'pos3' | 'pos4' | 'runtype'>

function trimInputs(actions: WBSCAction[]): WBSCInputJson[] {
  const trimmed: WBSCInputJson[] = []
  actions.forEach((action) => {
    trimmed.push({
      group: action.group,
      baseAction: action.baseAction,
      specAction: action.specAction,
      origBase: action.origBase,
      base: action.base,
      tie: action.tie,
      nodp: action.nodp,
      pos1: action.pos1,
      pos2: action.pos2,
      pos3: action.pos3,
      pos4: action.pos4,
      runtype: action.runtype,
    })
  })
  return trimmed
}
