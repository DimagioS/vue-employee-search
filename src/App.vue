<template>
  <div class="app">
    <Header :title="'Жилфонд'" />
    <div class="main">
      <Sidebar />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
  }
}
</script>

<style src="./style/app.scss" lang="scss"></style>
