<script setup>
import { toRef, computed } from 'vue'
import Table from './common/Table.vue'
import Paginator from './common/Paginator.vue'
import { useRoute, useRouter } from 'vue-router'
import { getAllSongs } from './../composables/useFetch.js'
const route = useRoute()
const albumId = computed(() => {
    return props.id
})
const props = defineProps({
    id: {
        type: [Number, String]
    },
    albumName: {
        type: String
    },
    searchable: {
        type: Boolean,
        default: true
    }
})
const { res: songs, options, totalPages, sort: sorter } = getAllSongs(albumId)
</script>

<template>
    <div>
        <h4>
            Showing all data would require changing table rendering and exposing song and artist
            keys for sorting
        </h4>
        <div class="table-header">
            <input
                v-if="searchable"
                placeholder="Search by name"
                :value="options.q"
                @blur="options.q = $event.target.value"
                @keyup.enter="options.q = $event.target.value"
            />
            <slot></slot>
            <Paginator
                :max-page="totalPages"
                :page-number="options._page"
                @next="options._page++"
                @prev="options._page--"
            ></Paginator>
        </div>
        <Table
            :show-active="false"
            @header-click="sorter"
            :headers="['artist', 'name', 'songs']"
            :data="songs"
        ></Table>
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
