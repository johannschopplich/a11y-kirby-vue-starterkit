import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    debug: state.debug,
    lastLaunch: new Date().valueOf()
  })
})

export default new Vuex.Store({
  state: {
    debug: 0
  },

  mutations: {
    DEBUG_SET (state, payload) {
      state.debug = payload
    }
  },

  actions: {
    setDebug (context, payload) {
      context.commit('DEBUG_SET', payload)
    }
  },

  plugins: [vuexLocal.plugin]
})
