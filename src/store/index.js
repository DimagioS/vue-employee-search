import { createStore } from 'vuex';
import mutations from './mutations';
import actions from './actions';
import state from './state';

export default createStore({
  state() {
    return state
  },
  mutations,
  actions,
});
