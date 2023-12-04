import { selectMuscles } from '../../services/supabase/select';

const state = {
  muscles: [],
  checkoutStatus: null,
};

// getters
const getters = {
  muscles: (state) => state.muscles,
};

// actions
const actions = {
  async getMuscles ({ commit }) {
    commit('setCheckoutStatus', null);
    commit('setMuscles', { items: [] });

    try {
      const response = await selectMuscles();
      commit('setMuscles', { items: response });
      commit('setCheckoutStatus', 'success');
    } catch(err) {
      commit('setCheckoutStatus', 'failed');
      commit('setMuscles', { items: [] });
    }
  },
};

// mutations
const mutations = {
  
  setMuscles (state, {items}) {
    state.muscles = items;
  },
  setCheckoutStatus (state, status) {
    state.checkoutStatus = status;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
