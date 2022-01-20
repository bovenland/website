export const state = () => ({
  isHamburgerActive: false
})

export const mutations = {
  Toggle(state) {
    state.isHamburgerActive = !state.isHamburgerActive;
  },
  SetActive(state, active) {
    state.isHamburgerActive = active;
  }
}