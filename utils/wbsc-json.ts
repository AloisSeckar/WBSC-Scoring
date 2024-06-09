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
  const inputs = [] as WBSCInput[]

  const r3Input = getInput(inputR3, true)
  if (r3Input) {
    inputs.push(r3Input)
  }

  const r2aInput = getInput(inputR2a, true)
  if (r2aInput) {
    inputs.push(r2aInput)
  }
  const r2Input = getInput(inputR2, true)
  if (r2Input) {
    inputs.push(r2Input)
  }

  const r1bInput = getInput(inputR1b, true)
  if (r1bInput) {
    inputs.push(r1bInput)
  }
  const r1aInput = getInput(inputR1a, true)
  if (r1aInput) {
    inputs.push(r1aInput)
  }
  const r1Input = getInput(inputR1, true)
  if (r1Input) {
    inputs.push(r1Input)
  }

  const b3Input = getInput(inputB3, true)
  if (b3Input) {
    inputs.push(b3Input)
  }
  const b2Input = getInput(inputB2, true)
  if (b2Input) {
    inputs.push(b2Input)
  }
  const b1Input = getInput(inputB1, true)
  if (b1Input) {
    inputs.push(b1Input)
  }
  const bInput = getInput(inputB, true)
  if (bInput) {
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
    await clearInputs()
    // renderInputs(inputB)
    const jsonData: WBSCInput[] = JSON.parse(fileData.toString())
    jsonData?.reverse().forEach(async (input) => {
      await setInputs(input)
    })
    processAction()
  }
}

async function setInputs(input: WBSCInput) {
  const group = input.group
  const pos = input.pos

  useGUIStore().setVisible(group, true)
  await nextTick()

  /*
  let parentDiv
  if (group.match(/b\d$/)) {
    parentDiv = document.getElementById(inputB)
  } else if (group.endsWith('a') || group.endsWith('b')) {
    parentDiv = document.getElementById(group.slice(0, -1))
  }
  renderInputs(group, parentDiv || undefined)
  */

  const selectBaseAction = document.getElementById(group + inputBaseAction) as HTMLSelectElement
  selectBaseAction.value = input.baseAction
  selectBaseAction.dispatchEvent(new Event('change'))

  const selectSpecAction = document.getElementById(group + inputSpecAction) as HTMLSelectElement
  selectSpecAction.value = input.specAction
  selectSpecAction.dispatchEvent(new Event('change'))

  if (pos) {
    // for some inputs there are less pos selection items then initially generated
    let itemsCreated = document.getElementById(group)!.getElementsByClassName(classWbscPos).length
    while (itemsCreated > pos.length) {
      unRenderPosSelectItem(group)
      itemsCreated--
    }
    if (pos.match(/^\d/)) {
      for (let i = 0; i < pos.length; i++) {
        let posSelection = document.getElementById(group + inputPosition + (i + 1)) as HTMLSelectElement
        console.log(posSelection)
        if (!posSelection) {
          renderPosSelectItem(group)
          await nextTick()
          const x = group + inputPosition + (i + 1)
          console.log(x)
          posSelection = document.getElementById(x) as HTMLSelectElement
          console.log(posSelection)
          if (pos.match(/[XYZ]$/)) {
            posSelection.innerHTML = renderFCLocationOptions().join(' ') // default are player positions
          }
        }
        posSelection.value = pos[i] || '1'
      }
    } else {
      const hitSelection = document.getElementById(group + inputPosition + '1') as HTMLSelectElement
      hitSelection.value = pos
    }
  }

  if (group !== inputB) {
    const selectBase = document.getElementById(group + inputBase) as HTMLSelectElement
    selectBase.value = input.base?.toString()
  }

  const selectRuntype = document.getElementById(group + inputRuntype) as HTMLInputElement
  selectRuntype.disabled = input.base < 4 && !input.specAction.includes('HR')
  if (input.runtype) {
    selectRuntype.value = input.runtype
  }

  if (group === inputR1 || group === inputR2) {
    const checkTie = document.getElementById(group + inputTie) as HTMLInputElement
    checkTie.checked = input.tie
  }
  console.log('This happen when?')

  await nextTick()
}
