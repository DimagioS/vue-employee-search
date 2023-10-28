const mutations = {
  SET_SEARCH_QUERY(state, query) {
    state.searchQuery = query;
  },

  SET_USER(state, users) {
    state.users.push(users);
  },

  SET_ACTIVE_USER(state, userId) {
    state.activeUser = state.users.find((user) => user.id === userId);
  },

  REMOVE_ACTIVE_USER(state) {
    const isActiveUserInList = state.users.find((user) => user?.id === state.activeUser?.id);
    
    if (!isActiveUserInList) {
      state.activeUser = null;
    }
  },

  SET_CACHED_USERS(state, payload) {
    state.cachedUsersById.set(payload.id, payload.user);
    state.cachedUsersByUsername.set(payload.username, payload.user);
  },

  REMOVE_OLDEST_CACHED_USER(state) {
    const firstIdKey = state.cachedUsersById.keys().next().value;
    const firstUsernameKey = state.cachedUsersByUsername.keys().next().value;

    state.cachedUsersById.delete(firstIdKey);
    state.cachedUsersByUsername.delete(firstUsernameKey);
  },

  SET_LOADING(state, loading) {
    state.isLoading = loading;
  },

  SET_ERROR(state, error) {
    state.error = error;
  },

  RESET_STATE(state) {
    state.users = [];
    state.error = null;
  }
}

export default mutations;