import { getSession, setSession } from '../../services/session/session';

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
    commit('setSession', { items: null });

    try {
      const session = getSession();
      commit('setSession', { items: session });
    } catch(err) {
      commit('setSession', { items: null });
    }
  },
  closeSession({ commit }) {
    commit('setSession', { items: null });
    setSession(null);

  },
};

// mutations
const mutations = {
  
  setSession (state, {items}  ) {
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
