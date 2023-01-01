export const useCanvasStore = defineStore({
    id: 'canvas-store',
    state: () => {
        const item: CanvasInfo = {}
        return item
    },
    actions: {
        init() {
            const canvas = document.getElementById('canvas') as HTMLCanvasElement;
            const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;

            this.canvas = canvas
            this.ctx = ctx
        }
    },
    getters: {
    }
})

export type CanvasInfo = {
    canvas?: HTMLCanvasElement,
    ctx?: CanvasRenderingContext2D,
}
