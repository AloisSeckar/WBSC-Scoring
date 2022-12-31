export const useGraphicsStore = defineStore({
    id: 'canvas-store',
    state: () => {
        const canvasInfo: CanvasInfo = {
        }
        const dim = 250
        const graphicsInfo: GraphicsInfo = {
            vOffset: 0,
            hOffset: 75,
            w: dim,
            h: dim,
            w2: dim / 2,
            w3: dim / 3,
            w4: dim / 4,
            h2: dim / 2,
            h3: dim / 3,
            h4: dim / 4,
            h5: dim / 5,
        }
        return {
            canvasInfo,
            graphicsInfo,
        }
    },
    actions: {
        setCanvasInfo() {
            const canvas = document.getElementById('canvas') as HTMLCanvasElement;
            const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;

            this.canvasInfo.canvas = canvas
            this.canvasInfo.ctx = ctx
        }
    },
    getters: {
    }
})

export type CanvasInfo = {
    canvas?: HTMLCanvasElement,
    ctx?: CanvasRenderingContext2D,
}

export type GraphicsInfo = {
    vOffset: number,
    hOffset: number,

    w: number,
    w2: number,
    w3: number,
    w4: number,
    h: number,
    h2: number,
    h3: number,
    h4: number,
    h5: number,
}