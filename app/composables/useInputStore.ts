export const ALL_INPUTS = [inputB, inputB1, inputB2, inputB3, inputR1, inputR1a, inputR1b, inputR2, inputR2a, inputR3]
export const ALL_INPUTS_REV = ALL_INPUTS.toReversed()

export const useInputStore = defineStore('input-store', {
  state: () => {
    const inputs = {
      inputB: getEmptyAction(inputB),
      inputB1: getEmptyAction(inputB1),
      inputB2: getEmptyAction(inputB2),
      inputB3: getEmptyAction(inputB3),
      inputR1: getEmptyAction(inputR1),
      inputR1a: getEmptyAction(inputR1a),
      inputR1b: getEmptyAction(inputR1b),
      inputR2: getEmptyAction(inputR2),
      inputR2a: getEmptyAction(inputR2a),
      inputR3: getEmptyAction(inputR3),
    }
    inputs.inputB.visible = true
    return inputs
  },
  actions: {
    clear() {
      ALL_INPUTS.forEach((group) => {
        clearInput(this.getModel(group), group)
      })
      this.inputB.visible = true
    },
    isVisible(group: string): boolean {
      const input = this.getModel(group)
      return input.visible
    },
    setVisible(group: string, visible: boolean) {
      const input = this.getModel(group)
      input.visible = visible
    },
    getInputs(): WBSCAction[] {
      const inputs: WBSCAction[] = []

      // go through all inputs and add them conditionally, if they are visible and filled
      ALL_INPUTS_REV.forEach((group) => {
        const input = this.getModel(group)
        if (input.visible && input.baseAction) {
          inputs.push(input)
        }
      })

      // assign batter numbers to actions (will be 1-4, based on number of inputs user filled)
      const visibleBeforeR2 = this.isVisible(inputR3) ? 1 : 0
      const visibleBeforeR1 = visibleBeforeR2 + (this.isVisible(inputR2) ? 1 : 0)
      const visibleBeforeB = visibleBeforeR1 + (this.isVisible(inputR1) ? 1 : 0)
      inputs.forEach((i) => {
        switch (i.group) {
          case inputR3:
            i.batter = 1
            break
          case inputR2a:
          case inputR2:
            i.batter = visibleBeforeR2 + 1
            break
          case inputR1b:
          case inputR1a:
          case inputR1:
            i.batter = visibleBeforeR1 + 1
            break
          case inputB3:
          case inputB2:
          case inputB1:
          case inputB:
            i.batter = visibleBeforeB + 1
            break
        }
      })

      return inputs
    },
  },
  getters: {
    getModel: (state) => {
      return (group: string): WBSCAction => {
        switch (group) {
          case inputB:
            return state.inputB
          case inputB1:
            return state.inputB1
          case inputB2:
            return state.inputB2
          case inputB3:
            return state.inputB3
          case inputR1:
            return state.inputR1
          case inputR1a:
            return state.inputR1a
          case inputR1b:
            return state.inputR1b
          case inputR2:
            return state.inputR2
          case inputR2a:
            return state.inputR2a
          case inputR3:
            return state.inputR3
          default:
            return getEmptyAction(group)
        }
      }
    },
    // used in WBSCInput component
    getExtra1Model: (state) => {
      return (group: string): WBSCAction => {
        switch (group) {
          case inputB:
            return state.inputB1
          case inputR1:
            return state.inputR1a
          case inputR2:
            return state.inputR2a
          default:
            return getEmptyAction(group)
        }
      }
    },
    getExtra2Model: (state) => {
      return (group: string): WBSCAction => {
        switch (group) {
          case inputB:
            return state.inputB2
          case inputR1:
            return state.inputR1b
          default:
            return getEmptyAction(group)
        }
      }
    },
    getExtra3Model: (state) => {
      return (group: string): WBSCAction => {
        switch (group) {
          case inputB:
            return state.inputB3
          default:
            return getEmptyAction(group)
        }
      }
    },
  },
})

function clearInput(input: WBSCAction, group: string) {
  // change here needs to be copied into wbsc-input.clearInput
  // TODO test if this resets values properly
  input.batter = 1
  input.visible = false
  input.baseAction = ''
  input.specAction = ''
  input.base = 0
  input.origBase = getOrigBase(group)
  input.targetBase = 0
  input.outputBase = 0
  input.tie = false
  input.nodp = false
  input.pos1 = ''
  input.pos2 = ''
  input.pos3 = ''
  input.pos4 = ''
  input.runtype = 'e'
  input.text1 = ''
  input.text2 = ''
  input.sub = ''
  input.num = false
  input.out = false
  input.na = false
}

export function getPos(input: WBSCAction): string {
  return (input.pos1 || '') + (input.pos2 || '') + (input.pos3 || '') + (input.pos4 || '')
}
