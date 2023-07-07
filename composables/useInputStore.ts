export const useInputStore = defineStore({
  id: 'input-store',
  state: () => {
    return getEmptyInput(false)
  },
  actions: {
  },
  getters: {
  }
})

export type WBSCOutput = {
    previousAdvance: boolean,
    batter: number,
    origBase: number,
    base: number,
    text1: string,
    text2?: string,
    out: boolean,
    hit: boolean,
    sub?: string,
    sup?: string,
    run?: string,
    num: boolean,
    errorTarget: number,
    na: boolean,
}

export type WBSCInput = {
    group: string,
    baseAction: string,
    specAction: string,
    origBase: number,
    base: number,
    tie: boolean,
    pos?: string,
    runtype?: string,

    validation?: string,
    output?: WBSCOutput,

    extraInput?: WBSCInput[],
}
