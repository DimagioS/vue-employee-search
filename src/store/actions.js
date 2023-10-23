import axios from "axios";
import { formApiRequest, getUserFromCache, isValidQuery, manageUserCache, userExists } from "./utils";
import { ERROR_CODES } from "./config";

const actions = {
  setSearchQuery({ commit }, query) {
    commit('SET_SEARCH_QUERY', query);
  },

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
        const promises = queriesToFetch.map((user) => {
          const apiType = formApiRequest(user);

          return axios.get(apiType);
        });

        const responses = await Promise.all(promises);

        responses.forEach((response) => {
          const user = response.data?.[0];

          if (user !== undefined) {
            manageUserCache(commit, state, user);
            commit('SET_USER', user);
          } else {
            commit('SET_ERROR', ERROR_CODES.USER_NOT_FOUND.message);
          }

          queriesToFetch = [];
        })
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