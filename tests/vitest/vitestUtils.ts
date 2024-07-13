// Element.checkVisibility() is not available in Vitest
global.Element.prototype.checkVisibility = function () {
  // in tests we allways just assume the element is visible
  return true
}

// checkBasicRules validation checks, if the length of "pos" input matches the number of displayed inputs
// we need to mock corresponding amount of elements to make this validation pass
export function createMockPosSelections(inputGroup: string, numberOfSelects: number) {
  const cleanup = document.getElementById(inputGroup)
  if (cleanup) {
    document.removeChild(cleanup)
  }

  const mockContainer = document.createElement('div')
  mockContainer.setAttribute('id', inputGroup)
  for (let i = 0; i < numberOfSelects; i++) {
    const mockSelect = document.createElement('select')
    mockSelect.setAttribute('id', inputGroup + inputPosition)
    mockSelect.setAttribute('class', classWbscPos)
    mockContainer.appendChild(mockSelect)
  }
  document.appendChild(mockContainer)
}
