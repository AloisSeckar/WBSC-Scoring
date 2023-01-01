export const useEvalStore = defineStore({
    id: 'eval-store',
    state: () => {
        const data: WBSCEval = {
            batter: 1,
            minPosItems: [],
            targetPosItems: [],
            maxPosItems: [],
            posSelection: [],
            outs: [],
            concurrentPlays: [],
        }
        return data
    },
    actions: {
        setPosSelection(inputGroup: string, selection: string) {
            const allOthers = this.posSelection.filter(i => i.inputGroup !== inputGroup);
            allOthers.push({inputGroup, selection});
        }
    },
    getters: {
        getMinPosItems: (state) => {
            return (inputGroup: string): number  => {
                const item = state.minPosItems.find(i => i.inputGroup === inputGroup)
                if (item) {
                    return item.limit
                } else {
                    return 0
                }
            }
        },
        getMaxPosItems: (state) => {
            return (inputGroup: string): number  => {
                const item = state.maxPosItems.find(i => i.inputGroup === inputGroup)
                if (item) {
                    return item.limit
                } else {
                    return 0
                }
            }
        },
        getPosSelection: (state) => {
            return (inputGroup: string): string => {
                const item = state.posSelection.find(i => i.inputGroup === inputGroup)
                if (item) {
                    return item.selection
                } else {
                    return ' '
                }
            }
        }
    }
})

export type WBSCEval = {
    batter: number,
    minPosItems: PosSelectionLimit[],
    targetPosItems: PosSelectionLimit[],
    maxPosItems: PosSelectionLimit[],
    posSelection: PosSelection[],
    outs: Out[],
    concurrentPlays: ConcurrentPlay[],
}

export type PosSelectionLimit = {
    inputGroup: string,
    limit: number,
}

export type PosSelection = {
    inputGroup: string,
    selection: string,
}

export type Out = {
    batter: number, 
    base: number, 
}

export type ConcurrentPlay = {
    batter: number, 
    base: number, 
    out: boolean,
    na: boolean
}