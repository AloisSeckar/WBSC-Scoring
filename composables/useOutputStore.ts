export const useOutputStore = defineStore({
    id: 'output-store',
    state: () => {
        const data: WBSCOutput = {}
        return data
    },
    actions: {
    },
    getters: {
    }
})

export type WBSCOutput = {
    player?: string,
    origBase?: number,
    base?: number,
    text1?: string,
    text2?: string,
    out?: boolean,
    hit?: boolean,
    sub?: string,
    sup?: string,
    num?: string,
    run?: string,
    errorTarget?: string | null,
    na?: boolean,
}