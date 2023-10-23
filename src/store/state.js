const state = {
  searchQuery: '',
  users: [],
  cachedUsersById: new Map(),
  cachedUsersByUsername: new Map(),
  isLoading: false,
  error: null,
}

export default state;