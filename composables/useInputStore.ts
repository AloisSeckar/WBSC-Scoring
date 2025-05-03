export const useInputStore = defineStore('input-store', {
  state: () => {
    return {
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
  },
  actions: {
    clear() {
      clearInput(this.inputB, inputB)
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
  },
  getters: {
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
