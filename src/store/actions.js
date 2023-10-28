import { fetchUsersByQueries, getUserFromCache, isValidQuery, userExists } from "./utils";
import { ERROR_CODES } from "./config";

const actions = {
  async fetchUsers({ commit, state }) {
    commit('RESET_STATE');
    if (state.searchQuery === '') return;

    if (isValidQuery(state.searchQuery)) {
      let queriesToFetch = [];
      const querysArray = [...new Set(state.searchQuery.split(',').map((user) => user.trim()))];

      querysArray.forEach((query) => {
        const foundUser = getUserFromCache(state, query);

        if (userExists(state, foundUser)) return;

        foundUser ? commit('SET_USER', foundUser) : queriesToFetch.push(query);
      });

      commit('SET_LOADING', true);

      try {
        await fetchUsersByQueries(queriesToFetch, commit, state);
      } catch (error) {
        commit('SET_ERROR', ERROR_CODES.DATA_FETCH_ERROR.message);
      } finally {
        commit('SET_LOADING', false);
      }
    } else {
      commit('SET_ERROR', ERROR_CODES.INVALID_FORMAT.message)
    }
  },
}

export default actions;
