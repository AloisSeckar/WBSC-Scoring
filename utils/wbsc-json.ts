/* *************************************** */
/* wbsc-json.ts                            */
/* Processing JSON input of stored action  */
/* *************************************** */

import type { WBSCInput } from '@/composables/useInputStore'

// export current input selection as JSON file
// by https://bobbyhadz.com/blog/javascript-set-blob-filename
export function exportInputAsJSON() {
  const json = JSON.stringify(getRawInputs())
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

// TODO this is (nearly) the same as being done in wbsc-processor.processAction
// except one special evaluation (bErrorTarget) and we dont use output+validation here
// refactor to be able to have such code only once...
function getRawInputs(): WBSCInput[] {
  const GUI = useGUIStore()

  const inputStore = useInputStore()
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
  if (GUI.inputB1 && b1Input.baseAction) {
    inputs.push(b1Input)
  }
  const bInput = inputStore.inputB
  if (GUI.inputB && bInput.baseAction) {
    inputs.push(bInput)
  }

  return inputs
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
    useGUIStore().inputB = false
    const jsonData: WBSCInputJson[] = JSON.parse(fileData.toString())
    for (const input of jsonData) {
      await setInputFromJSON(input)
    }
    processAction()
  }
}

async function setInputFromJSON(input: WBSCInputJson) {
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

  useGUIStore().setVisible(input.group, true)
}

function getPosSelected(...args: (string | undefined | null)[]) {
  return args.filter(arg => !!arg).length
}
