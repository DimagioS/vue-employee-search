<template>
  <div class="error">
    <span>{{ error }}</span>
  </div>
</template>

<script>
  export default {
    name: 'Error',
    props: {
      error: {
        type: String,
        required: true,
      }
    }
  }
</script>

<style src="../style/error.scss" scoped lang="scss"></style>
