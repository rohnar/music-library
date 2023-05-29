<script setup>
import Button from './common/Button.vue'
import useFetch from './common/Button.vue'
import { useRouter, useRoute } from 'vue-router'
import { getToken } from '../composables/useAuth'
const router = useRouter()
function login() {
    //simulate authentication
    getToken()
    router.push('/')
}
</script>
<template>
    <div class="landing">
        <h1>Welcome</h1>
        <p>Discover new tunes today</p>
        <Button @click="login">Sign in</Button>
    </div>
</template>
<style>
.landing {
    color: hsla(160, 100%, 37%, 1);
    border: solid hsla(160, 100%, 37%, 1) 2px;
    border-radius: 5px;
    padding: 20px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}
</style>
