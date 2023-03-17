export const useInputStore = defineStore({
  id: 'input-store',
  state: () => {
    return getEmptyInput()
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
    text2: string | null,
    out: boolean,
    hit: boolean,
    sub: string | null,
    sup: string | null,
    run: string | null,
    num: boolean,
    errorTarget: number,
    na: boolean,
}

export type WBSCInput = {
    group: string,
    baseAction: string,
    specAction: string,
    base: number,
    tie: boolean,
    pos: string | null,
    runtype: string | null,
    validation: string,

    output: WBSCOutput,

    extraInput: WBSCInput[] | null,
}
