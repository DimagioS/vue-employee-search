<template>
  <div class="card" :class="computedClass">
    <div class="img">
      <img src="../assets/profile-photo.png" alt="user">
    </div>
    <div class="card-info">
      <p class="name"> {{ user?.username }}</p>
      <p class="email"> {{ user?.email }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    name: 'Card',
    props: {
      user: {
        type: Object,
        required: true,
      }
    },
    computed: {
    ...mapState(['activeUser']),
    computedClass() {
      return this.activeUser?.id === this.user?.id ? 'active' : '';
    }
  },
  }
</script>

<style src="../style/card.scss" scoped lang="scss"></style>
