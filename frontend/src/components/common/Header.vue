<script setup>
import Button from './Button.vue'
import { logout, isAuthenticated } from '../../composables/useAuth.js'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
    <div class="header-content">
        <div class="logo">
            <img alt="logo" class="logo" src="../../assets/logo.svg" height="30" />
            <span>MusicDB</span>
        </div>
        <div class="nav">
            <router-link active-class="active-nav" to="/">Explorer</router-link>
            <router-link active-class="active-nav" to="/artists">Artists</router-link>
            <router-link active-class="active-nav" to="/albums">Albums</router-link>
            <router-link active-class="active-nav" to="/songs">Songs</router-link>
            <router-link active-class="active-nav" style="color: rgb(180, 180, 180)" to="/allSongs"
                >All [Experiment]</router-link
            >
        </div>
        <Button v-if="isAuthenticated" @click="logout(), router.push('/login')">Logout </Button>
    </div>
</template>
<style scoped>
.active-nav {
    text-shadow: 0 0 1px rgb(86, 216, 86);
    text-decoration: underline dotted;
}
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
