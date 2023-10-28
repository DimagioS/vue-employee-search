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
import { computed, toRef } from 'vue';
import { useStore } from 'vuex'
  export default {
    name: 'Card',
    props: {
      user: {
        type: Object,
        required: true,
      }
    },
    setup(props) {
      const store = useStore();
      const user = toRef(props, 'user');
      const activeUser = computed(() => store.state.activeUser);

      const computedClass = computed(() => activeUser.value?.id === user.value?.id ? 'active' : '');

      return { computedClass }
    },
  }
</script>

<style src="../style/card.scss" scoped lang="scss"></style>
