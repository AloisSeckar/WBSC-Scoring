export const useInputStore = defineStore({
  id: 'input-store',
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
      clearInput(this.inputB)
      clearInput(this.inputB1)
      clearInput(this.inputB2)
      clearInput(this.inputB3)
      clearInput(this.inputR1)
      clearInput(this.inputR1a)
      clearInput(this.inputR1b)
      clearInput(this.inputR2)
      clearInput(this.inputR2a)
      clearInput(this.inputR3)
    },
  },
  getters: {
    getModel: (state) => {
      return (inputGroup: string): WBSCInput => {
        switch (inputGroup) {
          case inputB:
            return state.inputB
          case inputR1:
            return state.inputR1
          case inputR2:
            return state.inputR2
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

function clearInput(input: WBSCInput) {
  input.baseAction = ''
  input.specAction = ''
  input.origBase = 0
  input.base = 0
  input.tie = false
  input.pos1 = ''
  input.pos2 = ''
  input.pos3 = ''
  input.pos4 = ''
  input.runtype = 'ER'
}

export function getPos(input: WBSCInput): string {
  return (input.pos1 || '') + (input.pos2 || '') + (input.pos3 || '') + (input.pos4 || '')
}

export type WBSCOutput = {
  group: string
  specAction: string
  previousAdvance: boolean
  batter: number
  origBase: number
  base: number
  text1: string
  text2?: string
  out: boolean
  hit: boolean
  sub?: string
  run?: string
  num: boolean
  errorTarget: number
  tie: boolean
  na: boolean
  extraOutput?: WBSCOutput[]
}

export type WBSCInput = {
  group: string
  baseAction: string
  specAction: string
  origBase: number
  base: number
  tie: boolean
  pos1: string
  pos2: string
  pos3: string
  pos4: string
  runtype: string
}
