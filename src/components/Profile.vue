<template>
  <div class="profile">
    <p v-if="!activeUser" class="profile-instruction">Выберите сотрудника, чтобы посмотреть его профиль</p>
    <div v-else class="profile-main">
      <div class="profile-img">
        <img src="../assets/profile-photo.png" alt="">
      </div>
      <div class="profile-info">
        <h3 class="profile-name">{{ activeUser.name }} {{ activeUser.username }}</h3>
        <div class="profile-contact">
          <p>Email:  <span>{{ activeUser.email }}</span></p>
          <p>Phone:  <span>{{ activeUser.phone }}</span></p>
        </div>
        <div class="profile-about-me">
          <span>О себе:</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    name: 'Profile',
    computed: {
    ...mapState(['activeUser'])
  },
  }
</script>

<style src="../style/profile.scss" scoped lang="scss"></style>
