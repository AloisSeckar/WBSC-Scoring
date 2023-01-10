export const useEvalStore = defineStore({
    id: 'eval-store',
    state: () => {
        const data: WBSCEval = {
            errorShow: false,
            errorText: '',
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
        setError(errorText: string) {
            this.errorText = errorText;
            this.errorShow = true;
        },
        // TODO try to optimize with higher order function...
        setMinPosItems(inputGroup: string, limit: number) {
            this.minPosItems = this.minPosItems.filter(i => i.inputGroup !== inputGroup);
            this.minPosItems.push({inputGroup, limit});
        },
        setTargetPosItems(inputGroup: string, limit: number) {
            this.targetPosItems = this.targetPosItems.filter(i => i.inputGroup !== inputGroup);
            this.targetPosItems.push({inputGroup, limit});
        },
        setMaxPosItems(inputGroup: string, limit: number) {
            this.maxPosItems = this.maxPosItems.filter(i => i.inputGroup !== inputGroup);
            this.maxPosItems.push({inputGroup, limit});
        },
        setPosSelection(inputGroup: string, selection: string) {
            this.posSelection = this.posSelection.filter(i => i.inputGroup !== inputGroup);
            this.posSelection.push({inputGroup, selection});
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
    errorShow: boolean,
    errorText: string,
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