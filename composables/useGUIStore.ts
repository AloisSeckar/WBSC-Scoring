export const useGUIStore = defineStore({
  id: 'gui-store',
  state: () => {
    return {
      inputB: true,
      inputB1: false,
      inputB2: false,
      inputB3: false,
      inputR1: false,
      inputR1a: false,
      inputR1b: false,
      inputR2: false,
      inputR2a: false,
      inputR3: false,
    }
  },
  actions: {
    setVisible(inputGroup: string, visible: boolean) {
      switch (inputGroup) {
        case inputB:
          this.inputB = visible
          break
        case inputB1:
          this.inputB1 = visible
          break
        case inputB2:
          this.inputB2 = visible
          break
        case inputB3:
          this.inputB3 = visible
          break
        case inputR1:
          this.inputR1 = visible
          break
        case inputR1a:
          this.inputR1a = visible
          break
        case inputR1b:
          this.inputR1b = visible
          break
        case inputR2:
          this.inputR2 = visible
          break
        case inputR2a:
          this.inputR2a = visible
          break
        case inputR3:
          this.inputR3 = visible
          break
      }
    },
  },
  getters: {
    isVisible: (state) => {
      return (inputGroup: string): boolean => {
        switch (inputGroup) {
          case inputB:
            return state.inputB
          case inputB1:
            return state.inputB1
          case inputB2:
            return state.inputB2
          case inputB3:
            return state.inputB3
          case inputR1:
            return state.inputR1
          case inputR1a:
            return state.inputR1a
          case inputR1b:
            return state.inputR1b
          case inputR2:
            return state.inputR2
          case inputR2a:
            return state.inputR2a
          case inputR3:
            return state.inputR3
          default:
            return false
        }
      }
    },
  },
})
