<script setup>
import { computed } from 'vue'
import Header from './components/common/Header.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const pageName = computed(() => {
    let { name } = router?.currentRoute?.value
    return name?.includes('/') ? '' : name
})
</script>

<template>
    <header>
        <Header></Header>
    </header>
    <main>
        <h2 class="page-title">{{ pageName }}</h2>
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
.page-title {
    margin: 0.5rem 0;
    border-radius: 8px;
    padding: 0.5rem 0.6rem;
}
</style>
