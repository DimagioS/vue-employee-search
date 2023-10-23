import axios from 'axios';
import { createStore } from 'vuex';

const API_URL_USERNAME = 'https://jsonplaceholder.typicode.com/users?username';
const API_URL_ID = 'https://jsonplaceholder.typicode.com/users?id';
const MAX_CACHE_SIZE = 50;

export default createStore({
  state() {
    return {
      searchQuery: '',
      users: [],
      cachedUsersBuId: new Map(),
      isLoading: false,
    }
  },

  mutations: {
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },

    SET_USER(state, users) {
      state.users.push(users);
    },

    RESET_USERS(state) {
      state.users = [];
    },

    SET_CACHED_USERS_BY_ID(state, payload) {
      state.cachedUsersBuId.set(payload.id, payload.user) 
    },

    REMOVE_OLDEST_CACHED_USER(state) {
      const firstKey = state.cachedUsersBuId.keys().next().value;
      state.cachedUsersBuId.delete(firstKey);
    },

    SET_LOADING(state, loading) {
      state.isLoading = loading;
    },
  },

  actions: {
    setSearchQuery({ commit }, query) {
      commit('SET_SEARCH_QUERY', query);
    },

    async fetchUsers({ commit, state }) {
      if (state.searchQuery === '') {
        commit('RESET_USERS');
        return;
      }

      const regex = /^\s*([a-zA-Z0-9]+)(\s*,\s*[a-zA-Z0-9]+)*\s*$/;

      if (regex.test(state.searchQuery)) {
        commit('RESET_USERS');
        let queriesToFetch = [];
        const querysArray = [...new Set(state.searchQuery.split(',').map((user) => user.trim()))];

        querysArray.forEach((query) => {
          if (state.cachedUsersBuId.has(parseInt(query))) {
            commit('SET_USER', state.cachedUsersBuId.get(parseInt(query)));
            return; 
          } else {
            queriesToFetch.push(query);
          }
        });

        commit('SET_LOADING', true);

        try {
          const promises = queriesToFetch.map((user) => {
            const apiType = isNaN(user) 
              ? `${API_URL_USERNAME}=${user}` 
              : `${API_URL_ID}=${user}`;
  
            return axios.get(apiType);
          });

          const responses = await Promise.all(promises);

          responses.forEach((response) => {
            const user = response.data?.[0];

            if (user !== undefined) {
              if (state.cachedUsersBuId.size >= MAX_CACHE_SIZE) {
                commit('REMOVE_OLDEST_CACHED_USER');
              }

              commit('SET_CACHED_USERS_BY_ID', { user: user, id: user.id });
              commit('SET_USER', user);
            }

            queriesToFetch = [];
          })
        } catch (error) {
          console.error('Произошла ошибка при получении данных:', error);
        } finally {
          commit('SET_LOADING', false);
        }
      } else {
        console.log('Введенный формат неверен');
      }
    },
  }
})
