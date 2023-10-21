import axios from 'axios';
import { createStore } from 'vuex';

const API_URL_USERNAME = 'https://jsonplaceholder.typicode.com/users?username';
const API_URL_ID = 'https://jsonplaceholder.typicode.com/users?id';

export default createStore({
  state() {
    return {
      searchQuery: '',
      users: [],
    }
  },

  mutations: {
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },

    SET_USERS(state, users) {
      state.users = users;
    },
  },

  actions: {
    setSearchQuery({ commit }, query) {
      commit('SET_SEARCH_QUERY', query);
    },

    async fetchUsers({ commit, state }) {
      const regex = /^([a-zA-Z0-9]+)(,\s*[a-zA-Z0-9]+)*$/;

      if (regex.test(state.searchQuery)) {
        try {
          const promises = state.searchQuery.split(',').map((user) => {
            console.log(user.trim());
            if (user.trim() === '') return;
  
            let apiType = isNaN(user.trim()) 
              ? `${API_URL_USERNAME}=${user.trim()}` 
              : `${API_URL_ID}=${user.trim()}`;
  
            return axios.get(apiType);
          });

          const responses = await Promise.all(promises);
          const result = responses.map((response) => response.data?.[0]).filter(Boolean);

          commit('SET_USERS', result);
        } catch (error) {
          console.error('Произошла ошибка при получении данных:', error);
        }
      } else {
        console.log('Введенный формат неверен');
      }
    },
  }
})
