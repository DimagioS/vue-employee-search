<template>
  <div class="app">
    <Header :title="'Жилфонд'" />
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style src="./style/app.scss" lang="scss"></style>
