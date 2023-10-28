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
          @click="() => getUserId(user.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import { debounce } from 'lodash';
import Loader from './shared/Loader.vue';
import Error from './shared/Error.vue';
import Card from './Card.vue';

export default {
  name: 'Sidebar',

  data() {
    return {
      debouncedFetchUsers: debounce(this.fetchUsers, 500),
      debouncedResetActiveUser: debounce(this.REMOVE_ACTIVE_USER, 500),
    }
  },

  computed: {
    ...mapState(['searchQuery', 'users', 'isLoading', 'error'])
  },

  methods: {
    ...mapMutations(['SET_SEARCH_QUERY', 'REMOVE_ACTIVE_USER', 'SET_ACTIVE_USER']),
    ...mapActions(['fetchUsers']),
    updateSearchQuery(event) {
      this.SET_SEARCH_QUERY(event.target.value);

      this.debouncedFetchUsers();
      this.debouncedResetActiveUser();
    },
    getUserId(id) {
      this.SET_ACTIVE_USER(id)
    }
  },

  components: { Loader, Error, Card }
}
</script>

<style src="../style/sidebar.scss" scoped lang="scss"></style>
