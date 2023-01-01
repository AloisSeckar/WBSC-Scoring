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

export type WBSCInput = {
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

export type WBSCOutput = {
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