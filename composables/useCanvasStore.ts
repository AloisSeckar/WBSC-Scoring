export type CanvasInfo = {
    canvas?: HTMLCanvasElement,
    ctx?: CanvasRenderingContext2D,
    hOffset: number,
    vOffset: number,
}

export const useCanvasStore = defineStore({
  id: 'canvas-store',
  state: () => {
    const item: CanvasInfo = {
      hOffset: 75,
      vOffset: 0
    }
    return item
  },
  actions: {
    init () {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement
      const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D

      this.canvas = canvas
      this.ctx = ctx
    }
  },
  getters: {
  }
})
