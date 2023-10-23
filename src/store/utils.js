import { API_URL_ID, API_URL_USERNAME, MAX_CACHE_SIZE } from "./config";

export function isValidQuery(query) {
  const regex = /^\s*([a-zA-Z0-9]+)(\s*,\s*[a-zA-Z0-9]+)*\s*$/;
  
  return regex.test(query);
}

export function getUserFromCache(state, query) {
  if (isNaN(query)) {
    return state.cachedUsersByUsername.get(query);
  } else {
    return state.cachedUsersById.get(parseInt(query));
  }
}

export function userExists(state, foundUser) {
  return state.users?.find(user => user?.id === foundUser?.id);
}

export function formApiRequest(user) {
  return isNaN(user) 
    ? `${API_URL_USERNAME}=${user}`
    : `${API_URL_ID}=${user}`;
}

export function manageUserCache(commit, state, user) {
  if (state.cachedUsersById.size >= MAX_CACHE_SIZE) {
    commit('REMOVE_OLDEST_CACHED_USER');
  }

  commit('SET_CACHED_USERS', { user: user, id: user.id, username: user.username });
}
