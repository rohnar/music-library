<script setup>
import Button from './common/Button.vue'
import useFetch from './common/Button.vue'

function getToken() {
    //simulate sign in request
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
}
function authenticate() {
    //simulate authentication
    //if token, sign in
    
}
</script>
<template>
    <div class="landing">
        <h1>Welcome</h1>
        <p>Discover new tunes today</p>
        <Button @click="authenticate">Sign in</Button>
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