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
      clearInput(this.inputB, inputB)
      this.inputB.visible = true
      clearInput(this.inputB1, inputB1)
      clearInput(this.inputB2, inputB2)
      clearInput(this.inputB3, inputB3)
      clearInput(this.inputR1, inputR1)
      clearInput(this.inputR1a, inputR1a)
      clearInput(this.inputR1b, inputR1b)
      clearInput(this.inputR2, inputR2)
      clearInput(this.inputR2a, inputR2a)
      clearInput(this.inputR3, inputR3)
    },
    setVisible(inputGroup: string, visible: boolean) {
      switch (inputGroup) {
        case inputB:
          this.inputB.visible = visible
          break
        case inputB1:
          this.inputB1.visible = visible
          break
        case inputB2:
          this.inputB2.visible = visible
          break
        case inputB3:
          this.inputB3.visible = visible
          break
        case inputR1:
          this.inputR1.visible = visible
          break
        case inputR1a:
          this.inputR1a.visible = visible
          break
        case inputR1b:
          this.inputR1b.visible = visible
          break
        case inputR2:
          this.inputR2.visible = visible
          break
        case inputR2a:
          this.inputR2a.visible = visible
          break
        case inputR3:
          this.inputR3.visible = visible
          break
      }
    },
  },
  getters: {
    isVisible: (state) => {
      return (inputGroup: string): boolean => {
        switch (inputGroup) {
          case inputB:
            return state.inputB.visible
          case inputB1:
            return state.inputB1.visible
          case inputB2:
            return state.inputB2.visible
          case inputB3:
            return state.inputB3.visible
          case inputR1:
            return state.inputR1.visible
          case inputR1a:
            return state.inputR1a.visible
          case inputR1b:
            return state.inputR1b.visible
          case inputR2:
            return state.inputR2.visible
          case inputR2a:
            return state.inputR2a.visible
          case inputR3:
            return state.inputR3.visible
          default:
            return false
        }
      }
    },
    getModel: (state) => {
      return (inputGroup: string): WBSCAction => {
        switch (inputGroup) {
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
            return getEmptyAction(inputGroup)
        }
      }
    },
    getExtra1Model: (state) => {
      return (inputGroup: string): WBSCAction => {
        switch (inputGroup) {
          case inputB:
            return state.inputB1
          case inputR1:
            return state.inputR1a
          case inputR2:
            return state.inputR2a
          default:
            return getEmptyAction(inputGroup)
        }
      }
    },
    getExtra2Model: (state) => {
      return (inputGroup: string): WBSCAction => {
        switch (inputGroup) {
          case inputB:
            return state.inputB2
          case inputR1:
            return state.inputR1b
          default:
            return getEmptyAction(inputGroup)
        }
      }
    },
    getExtra3Model: (state) => {
      return (inputGroup: string): WBSCAction => {
        switch (inputGroup) {
          case inputB:
            return state.inputB3
          default:
            return getEmptyAction(inputGroup)
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
