import { createStore } from 'vuex';
import muscles from './modules/muscles';
import session from './modules/session';


export default createStore({
  modules: {
    muscles,
    session,
  },
});
