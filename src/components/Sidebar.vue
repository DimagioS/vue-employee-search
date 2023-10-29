<template>
  <div class="sidebar">
    <h2>Поиск сотрудников</h2>

    <input :value="searchQuery" @input="updateSearchQuery" placeholder="Введите Id или фамилию">

    <p class="result-header">Результаты</p>
    <div class="result">
      <p v-if="users.length === 0 && error === null">Начните поиск</p>
      <Loader v-if="isLoading" />
      <Error v-if="error" :error="error" />
      <div class="cards">
        <Card 
          v-for="user in users" 
          :key="user.id" 
          :user="user"
          @click="() => setActiveUserId(user.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { debounce } from 'lodash';
import Loader from './shared/Loader.vue';
import Error from './shared/Error.vue';
import Card from './Card.vue';

export default {
  name: 'Sidebar',

  setup() {
    const store = useStore();
    
    const searchQuery = computed(() => store.state.searchQuery);
    const users = computed(() => store.state.users);
    const isLoading = computed(() => store.state.isLoading);
    const error = computed(() => store.state.error);

    const SET_SEARCH_QUERY = payload => store.commit('SET_SEARCH_QUERY', payload);
    const REMOVE_ACTIVE_USER = () => store.commit('REMOVE_ACTIVE_USER');
    const SET_ACTIVE_USER = payload => store.commit('SET_ACTIVE_USER', payload);
    
    const fetchUsers = () => store.dispatch('fetchUsers');

    const debouncedFetchUsers = debounce(fetchUsers, 500);
    const debouncedResetActiveUser = debounce(REMOVE_ACTIVE_USER, 500);

    const updateSearchQuery = (event) => {
      SET_SEARCH_QUERY(event.target.value);

      debouncedFetchUsers();
      debouncedResetActiveUser();
    }

    const setActiveUserId = (id) => {
      SET_ACTIVE_USER(id);
    }

    return {
      searchQuery,
      users,
      isLoading,
      error,
      updateSearchQuery,
      setActiveUserId,
    }
  },

  components: { Loader, Error, Card }
}
</script>

<style src="../style/sidebar.scss" scoped lang="scss"></style>
