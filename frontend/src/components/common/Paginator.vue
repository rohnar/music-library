<script setup>
import Button from './Button.vue'
const emit = defineEmits(['next', 'prev'])
const props = defineProps({
    pageNumber: {
        required: true
    },
    maxPage: {
        type: Number
    }
})
function prev() {
    if (props.pageNumber > 1) {
        emit('prev')
    }
}
function next() {
    if (props.pageNumber < props.maxPage) {
        emit('next')
    }
}
</script>
<template>
    <div class="container" v-if="maxPage">
        <Button @click="prev">Prev</Button>
        <span>{{ pageNumber }} / {{ maxPage }}</span>
        <Button @click="next">Next</Button>
    </div>
</template>
<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 1rem;
}
.container span {
    font-weight: bold;
}
</style>
