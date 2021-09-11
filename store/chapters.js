export const state = () => ({
  chapter: undefined,
  storyRoute: []
})

export const actions = {
  setChapter ({ commit }, chapter) {
    commit('setChapter', chapter)
  },

  setStoryRoute ({ commit }, storyRoute) {
    commit('setStoryRoute', storyRoute)
  }
}

export const mutations = {
  setChapter (state, chapter) {
    state.chapter = chapter
  },

  setStoryRoute (state, storyRoute) {
    state.storyRoute = storyRoute
  }
}
