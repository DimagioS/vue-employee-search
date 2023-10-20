<template>
  <div class="sidebar">
    <h2>Поиск сотрудников</h2>

    <input placeholder="Введите Id или имя">

    <p class="result-header">Результаты</p>
    <div class="result">
      <!-- <p>начните поиск </p> -->
      <div class="cards">
        <div class="card">
          <div class="img">
            <img src="../assets/415x415_1369476198592009862_1369477640844005775.jpg" alt="">
          </div>
          <div class="card-info">
            <p class="name">Bret</p>
            <p class="email">Sincere@april.biz</p>
          </div>
        </div>
        <div class="card active">
          <div class="img">
            <img src="../assets/415x415_1369476198592009862_1369477640844005775.jpg" alt="">
          </div>
          <div class="card-info">
            <p class="name">Bret</p>
            <p class="email">Sincere@april.biz</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sidebar'
  }
</script>

<style src="../style/sidebar.scss" scoped lang="scss"></style>
