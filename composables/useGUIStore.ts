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
