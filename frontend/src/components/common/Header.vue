<script>
import Button from './Button.vue'
</script>
<template>
  <div class="header-content">
    <div class="logo">
      <img alt="logo" class="logo" src="../../assets/logo.svg" height="30" />
      <span>Discover</span>
    </div>
    <div class="nav">
      <router-link to="/">Explore</router-link>
      <router-link to="/artists">Artists</router-link>
      <router-link to="/albums">Albums</router-link>
      <router-link to="/songs">Songs</router-link>
    </div>
    <router-link to="/login"><Button>Logout</Button></router-link>
  </div>
</template>
<style scoped>
.header-content {
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
  display: flex;
}
.header-content .logo {
  gap: 2rem;
  align-items: center;
  display: flex;
}
.header-content .nav {
  gap: 1rem;
  display: flex;
}
.header-content span {
  font-size: 2em;
  font-weight: bold;
}
</style>
