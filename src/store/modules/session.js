import { getSession } from '../../services/session/session';

const state = {
  session: {},
};

// getters
const getters = {
  session: (state) => state.session,
};

// actions
const actions = {
  async getSession ({ commit }) {
    commit('setSession', { items: {} });

    try {
      const session = getSession();
      commit('setSession', { items: session });
    } catch(err) {
      commit('setSession', { items: {} });
    }
  },
};

// mutations
const mutations = {
  
  setSession (state, {items}) {
    state.session = items;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
