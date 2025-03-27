export type PosSelectionLimit = {
  inputGroup: string
  limit: number
}

export type PosSelection = {
  inputGroup: string
  selection: string
}

export type Out = {
  batter: number
  base: number
}

export type ConcurrentPlay = {
  batter: number
  base: number
  out: boolean
  na: boolean
  text1: string
}

export type WBSCEval = {
  importShow: boolean
  errorShow: boolean
  errorText: string
  batter: number
  batterAction: boolean
  minPosItems: PosSelectionLimit[]
  targetPosItems: PosSelectionLimit[]
  maxPosItems: PosSelectionLimit[]
  posSelection: PosSelection[]
  outs: Out[]
  concurrentPlays: ConcurrentPlay[]
  gdp: boolean
  brokenDP: boolean
  exb: boolean
}

export const useEvalStore = defineStore('eval-store', {
  state: () => {
    const data: WBSCEval = {
      importShow: false,
      errorShow: false,
      errorText: '',
      batter: 1,
      batterAction: false,
      minPosItems: [],
      targetPosItems: [],
      maxPosItems: [],
      posSelection: [],
      outs: [],
      concurrentPlays: [],
      gdp: false,
      brokenDP: false,
      exb: false,
    }
    return data
  },
  actions: {
    softReset() {
      // reset necessary fields before scoring a new play
      // but not the whole store (see #257 and #265)
      this.batter = 1
      this.batterAction = false
      this.outs = []
      this.concurrentPlays = []
      this.gdp = false
      this.brokenDP = false
      this.exb = false
    },
    setError(errorText: string) {
      this.errorText = errorText
      this.errorShow = true
    },
    setMinPosItems(inputGroup: string, limit: number) {
      this.minPosItems = resetItemInArray(this.minPosItems, { inputGroup, limit })
    },
    setTargetPosItems(inputGroup: string, limit: number) {
      this.targetPosItems = resetItemInArray(this.targetPosItems, { inputGroup, limit })
    },
    setMaxPosItems(inputGroup: string, limit: number) {
      this.maxPosItems = resetItemInArray(this.maxPosItems, { inputGroup, limit })
    },
    setPosSelection(inputGroup: string, selection: string) {
      this.posSelection = resetItemInArray(this.posSelection, { inputGroup, selection })
    },
    pushConcurrentPlayIfNotAdded(play: ConcurrentPlay) {
      let notAddedYet = true
      for (let i = 0; i < this.concurrentPlays.length; i += 1) {
        if (this.concurrentPlays[i]?.batter === play.batter) {
          notAddedYet = false
          break
        }
      }
      if (notAddedYet) {
        this.concurrentPlays.push(play)
      }
    },
  },
  getters: {
    getMinPosItems: (state) => {
      return (inputGroup: string): number => {
        const item = state.minPosItems.find((i: PosSelectionLimit) => i.inputGroup === inputGroup)
        if (item) {
          return item.limit
        } else {
          return 0
        }
      }
    },
    getTargetPosItems: (state) => {
      return (inputGroup: string): number => {
        const item = state.targetPosItems.find((i: PosSelectionLimit) => i.inputGroup === inputGroup)
        if (item) {
          return item.limit
        } else {
          return 0
        }
      }
    },
    getMaxPosItems: (state) => {
      return (inputGroup: string): number => {
        const item = state.maxPosItems.find((i: PosSelectionLimit) => i.inputGroup === inputGroup)
        if (item) {
          return item.limit
        } else {
          return 0
        }
      }
    },
    getPosSelection: (state) => {
      return (inputGroup: string): string => {
        const item = state.posSelection.find((i: PosSelection) => i.inputGroup === inputGroup)
        if (item) {
          return item.selection
        } else {
          return ' '
        }
      }
    },
  },
})

function resetItemInArray<T extends { inputGroup: string }>(arr: T[], item: T): T[] {
  arr = arr.filter(i => i.inputGroup !== item.inputGroup)
  arr.push(item)
  return arr
}
