const state = {
  searchQuery: '',
  users: [],
  activeUser: null,
  cachedUsersById: new Map(),
  cachedUsersByUsername: new Map(),
  isLoading: false,
  error: null,
}

export default state;