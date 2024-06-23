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
  const inputStore = useInputStore()
  const inputs = [] as WBSCInput[]

  const r3Input = inputStore.inputR3
  if (r3Input.baseAction) {
    inputs.push(r3Input)
  }

  const r2aInput = inputStore.inputR2a
  if (r2aInput.baseAction) {
    inputs.push(r2aInput)
  }
  const r2Input = inputStore.inputR2
  if (r2Input.baseAction) {
    inputs.push(r2Input)
  }

  const r1bInput = inputStore.inputR1b
  if (r1bInput.baseAction) {
    inputs.push(r1bInput)
  }
  const r1aInput = inputStore.inputR1b
  if (r1aInput.baseAction) {
    inputs.push(r1aInput)
  }
  const r1Input = inputStore.inputR1
  if (r1Input.baseAction) {
    inputs.push(r1Input)
  }

  const b3Input = inputStore.inputB3
  if (b3Input.baseAction) {
    inputs.push(b3Input)
  }
  const b2Input = inputStore.inputB2
  if (b2Input.baseAction) {
    inputs.push(b2Input)
  }
  const b1Input = inputStore.inputB1
  if (b1Input.baseAction) {
    inputs.push(b1Input)
  }
  const bInput = inputStore.inputB
  if (bInput.baseAction) {
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
  fetch('/json/' + fileName)
    .then(response => response.json())
    .then(async (fileData) => {
      await processFile(JSON.stringify(fileData))
    })
    // TODO we may want to log errors...
}

async function processFile(fileData: string | ArrayBuffer | null | undefined) {
  if (fileData) {
    const jsonData: WBSCInput[] = JSON.parse(fileData.toString())
    jsonData?.reverse().forEach(async (input) => {
      // TODO process json file
      await setInputs(input)
    })
    processAction()
  }
}

async function setInputs(_input: WBSCInput) {
  // TODO process input from JSON file
}
