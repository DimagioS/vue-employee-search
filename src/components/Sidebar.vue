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
        <div class="card" v-for="user in users" :key="user.id">
          <div class="img">
            <img src="../assets/profile-photo.png" alt="user">
          </div>
          <div class="card-info">
            <p class="name">{{ user?.username }}</p>
            <p class="email">{{ user?.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { debounce } from 'lodash';
import Loader from './shared/Loader.vue';
import Error from './shared/Error.vue';

export default {
  name: 'Sidebar',

  data() {
    return {
      debouncedFetchUsers: debounce(this.fetchUsers, 500),
    }
  },

  computed: {
    ...mapState(['searchQuery', 'users', 'isLoading', 'error'])
  },

  methods: {
    ...mapActions(['setSearchQuery', 'fetchUsers']),
    updateSearchQuery(event) {
      this.setSearchQuery(event.target.value);

      this.debouncedFetchUsers();
    }
  },

  components: { Loader, Error }
}
</script>

<style src="../style/sidebar.scss" scoped lang="scss"></style>
