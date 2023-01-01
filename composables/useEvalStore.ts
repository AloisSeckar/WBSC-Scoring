export const useEvalStore = defineStore({
    id: 'eval-store',
    state: () => {
        const data: WBSCEval = {
            minPosItems: [],
            targetPosItems: [],
            maxPosItems: [],
            posSelection: [],
        }
        return data
    },
    actions: {
    },
    getters: {
        getPosSelection: (state) => {
            return (group: string) => {
                const item = state.posSelection.find(i => i.inputGroup === group)
                if (item) {
                    return item.selection
                } else {
                    return ['','']
                }
            }
        }
    }
})

export type WBSCEval = {
    minPosItems: PosSelectionLimit[],
    targetPosItems: PosSelectionLimit[],
    maxPosItems: PosSelectionLimit[],
    posSelection: PosSelection[],
}

export type PosSelectionLimit = {
    inputGroup: string,
    limit: number,
}

export type PosSelection = {
    inputGroup: string,
    selection: string[],
}