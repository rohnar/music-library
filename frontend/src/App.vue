<script setup>
import Artists from './components/Artists.vue'
import Header from './components/common/Header.vue'
</script>

<template>
  <header>
    <Header></Header>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
