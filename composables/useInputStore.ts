export const useInputStore = defineStore('input-store', {
  state: () => {
    return {
      inputB: getEmptyInput(inputB),
      inputB1: getEmptyInput(inputB1),
      inputB2: getEmptyInput(inputB2),
      inputB3: getEmptyInput(inputB3),
      inputR1: getEmptyInput(inputR1),
      inputR1a: getEmptyInput(inputR1a),
      inputR1b: getEmptyInput(inputR1b),
      inputR2: getEmptyInput(inputR2),
      inputR2a: getEmptyInput(inputR2a),
      inputR3: getEmptyInput(inputR3),
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
      return (inputGroup: string): WBSCInput => {
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
            return getEmptyInput(inputGroup)
        }
      }
    },
    getExtra1Model: (state) => {
      return (inputGroup: string): WBSCInput => {
        switch (inputGroup) {
          case inputB:
            return state.inputB1
          case inputR1:
            return state.inputR1a
          case inputR2:
            return state.inputR2a
          default:
            return getEmptyInput(inputGroup)
        }
      }
    },
    getExtra2Model: (state) => {
      return (inputGroup: string): WBSCInput => {
        switch (inputGroup) {
          case inputB:
            return state.inputB2
          case inputR1:
            return state.inputR1b
          default:
            return getEmptyInput(inputGroup)
        }
      }
    },
    getExtra3Model: (state) => {
      return (inputGroup: string): WBSCInput => {
        switch (inputGroup) {
          case inputB:
            return state.inputB3
          default:
            return getEmptyInput(inputGroup)
        }
      }
    },
  },
})

function clearInput(input: WBSCInput, inputGroup: string) {
  input.baseAction = ''
  input.specAction = ''
  input.origBase = getOrigBase(inputGroup)
  input.base = 0
  input.tie = false
  input.nodp = false
  input.pos1 = ''
  input.pos2 = ''
  input.pos3 = ''
  input.pos4 = ''
  input.runtype = 'e'
}

export function getPos(input: WBSCInput): string {
  return (input.pos1 || '') + (input.pos2 || '') + (input.pos3 || '') + (input.pos4 || '')
}

export type WBSCBase = 0 | 1 | 2 | 3 | 4

export type WBSCOutput = {
  group: string
  specAction: string
  batter: number
  origBase: WBSCBase
  base: WBSCBase
  errorTarget: WBSCBase
  text1: string
  text2?: string
  out: boolean
  hit: boolean
  sub?: string
  run?: string
  num: boolean
  tie: boolean
  nodp: boolean
  na: boolean
  extraOutput?: WBSCOutput[]
}

export type WBSCInput = {
  group: string
  baseAction: string
  specAction: string
  origBase: WBSCBase
  base: WBSCBase
  tie: boolean
  nodp: boolean
  pos1: string
  pos2: string
  pos3: string
  pos4: string
  runtype: string
}

export type WBSCInputJson = WBSCInput & { pos?: string }
