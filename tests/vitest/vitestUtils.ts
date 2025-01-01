import { defu } from 'defu'

// Element.checkVisibility() is not available in Vitest
global.Element.prototype.checkVisibility = function () {
  // in tests we allways just assume the element is visible
  return true
}

// factory method to get WBSCInput instances
// we use "Partial" TS object to define WBSCInput-like structure, but with all fiels optional
// we use "defu" library to simply merge given values with defaults
export function createMockInput(values: Partial<WBSCInput>): WBSCInput {
  return defu(values, getEmptyInput('mock'))
}

// factory method to get WBSCOutput instances
// we use "Partial" TS object to define WBSCInput-like structure, but with all fiels optional
// we use "defu" library to simply merge given values with defaults
export function createMockOutput(values: Partial<WBSCOutput>): WBSCOutput {
  return defu(values, getEmptyOutput()) as WBSCOutput
}

// checkBasicRules validation checks, if the length of "pos" input matches the number of displayed inputs
// we need to mock corresponding amount of elements to make this validation pass
export function createMockPosSelections(inputGroup: string, numberOfSelects: number) {
  const cleanup = document.getElementById(inputGroup)
  if (cleanup) {
    document.body.removeChild(cleanup)
  }

  const mockContainer = document.createElement('div')
  mockContainer.setAttribute('id', inputGroup)
  for (let i = 0; i < numberOfSelects; i++) {
    const mockSelect = document.createElement('select')
    mockSelect.setAttribute('id', inputGroup + inputPosition)
    mockSelect.setAttribute('class', classWbscPos)
    mockContainer.appendChild(mockSelect)
  }
  document.body.appendChild(mockContainer)
}
