import { WBSCInput } from '@/composables/useInputStore'

// export current input selection as JSON file
// by https://bobbyhadz.com/blog/javascript-set-blob-filename
export function exportInputAsJSON () {
  const json = JSON.stringify(getRawInputs())
  const blob = new Blob([json], {
    type: 'application/octet-stream'
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
function getRawInputs (): WBSCInput[] {
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
