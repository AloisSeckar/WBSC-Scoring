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
      this.$reset()

      const canvas = document.getElementById('canvas') as HTMLCanvasElement
      const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D

      if (canvas) {
        canvas.width = 325
        canvas.height = 250

        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
      }

      this.canvas = canvas
      this.ctx = ctx

      drawBackground(1)
    }
  },
  getters: {
  }
})
