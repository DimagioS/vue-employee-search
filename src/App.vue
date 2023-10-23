<template>
  <div class="app">
    <Header :title="'Жилфонд'" />
    <div class="main">
      <Sidebar />
      <Profile />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Profile from './components/Profile.vue';

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    Profile,
  }
}
</script>

<style src="./style/globals/app.scss" lang="scss"></style>
