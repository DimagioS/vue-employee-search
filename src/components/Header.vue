<template>
  <div class="header">
    <div class="logo-container">
      <h1 class="logo">{{ title }}</h1>
    </div>
    <div class="user-container">
      <p class="user">Пользователь</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      title: {
        type: String,
        required: true,
      }
    }
  }
</script>

<style src="../style/header.scss" scoped lang="scss"></style>
