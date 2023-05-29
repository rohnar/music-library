<script setup>
import { useRouter, useRoute } from 'vue-router'
import Table from './common/Table.vue'
import { fetch, getArtists } from './../composables/useFetch.js'
import Paginator from './common/Paginator.vue'
const { options, res, totalPages, sort, refetch } = getArtists()
const emit = defineEmits(['selected'])
const router = useRouter()
const route = useRoute()
const props = defineProps({
    searchable: {
        type: Boolean,
        default: true
    }
})
function select(item) {
    if (router?.currentRoute?.value?.name !== 'Explorer') {
        router.push({ name: 'Artist / Albums', params: { id: item.id, artistName: item.name } })
    }
    emit('selected', item)
}
function search($event) {
    options.value._page = 1
    options.value.q = $event.target.value
}
</script>

<template>
    <div>
        <div class="table-header">
            <input
                v-if="searchable"
                placeholder="Search by name"
                :value="options.q"
                @blur="search"
                @keyup.enter="search"
            />
            <slot></slot>
            <Paginator
                :max-page="totalPages"
                :page-number="options._page"
                @next="options._page++"
                @prev="options._page--"
            ></Paginator>
        </div>
        <Table @header-click="sort" @row-click="select" :headers="['name']" :data="res"></Table>
    </div>
</template>

<style scoped>
.table-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    margin: 4px 0;
    padding: 0.5rem;
    border: lightgrey 1px solid;
}
.table-header input {
    width: 600px;
    border-radius: 5px;
    border: 2px rgb(136, 226, 136) solid;
    padding: 5px;
}
</style>
