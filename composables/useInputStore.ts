export const useInputStore = defineStore({
    id: 'input-store',
    state: () => {
        const data: WBSCInput = {}
        return data
    },
    actions: {
    },
    getters: {
    }
})

export type WBSCInput = {
    baseAction?: string,
    specAction?: string,
    base?: string,
    tie?: string,
    pos?: string,
    runtype?: string,
    validation?: string,

    extraInput?: WBSCInput[],
}