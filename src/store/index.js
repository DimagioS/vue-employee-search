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
      cachedUsers: {},
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

    SET_CACHED_USERS(state, payload) {
      state.cachedUsers[payload.id] = payload.user;
    },

    REMOVE_OLDEST_CACHED_USER(state) {
      const keys = Object.keys(state.cachedUsers);
      const firstKey = keys[0];
      delete state.cachedUsers[firstKey];
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
        let idsToFetch = [];
        let cachedUserIds = Object.keys(state.cachedUsers);
        const querysArray = [...new Set(state.searchQuery.split(',').map((user) => user.trim()))];

        querysArray.forEach((query) => {
          if (cachedUserIds.indexOf(query) === -1 && query !== '') {
            idsToFetch.push(query);
          } else {
            commit('SET_USER', state.cachedUsers[query]);
            return; 
          }
        });

        commit('SET_LOADING', true);

        try {
          const promises = idsToFetch.map((user) => {
            const apiType = isNaN(user) 
              ? `${API_URL_USERNAME}=${user}` 
              : `${API_URL_ID}=${user}`;
  
            return axios.get(apiType);
          });

          const responses = await Promise.all(promises);

          responses.forEach((response) => {
            const user = response.data?.[0];

            if (user !== undefined) {
              if (cachedUserIds.length >= MAX_CACHE_SIZE) {
                commit('REMOVE_OLDEST_CACHED_USER');
              }

              commit('SET_CACHED_USERS', { user, id: user.id });
              commit('SET_USER', user);
            }

            idsToFetch = [];
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
