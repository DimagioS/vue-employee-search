import axios from "axios";
import { API_URL_ID, API_URL_USERNAME, ERROR_CODES, MAX_CACHE_SIZE } from "./config";

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

export async function fetchUsersByQueries(queriesToFetch, commit, state) {
  const promises = queriesToFetch.map(user => {
    const apiType = formApiRequest(user);
    return axios.get(apiType);
  });
  
  const responses = await Promise.all(promises);
  
  responses.forEach(response => {
    const user = response.data?.[0];
    
    if (user !== undefined) {
      manageUserCache(commit, state, user);
      commit('SET_USER', user);
    } else {
      commit('SET_ERROR', ERROR_CODES.USER_NOT_FOUND.message);
    }
  });
  
  queriesToFetch = [];
}
