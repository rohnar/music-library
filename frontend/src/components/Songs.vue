<script setup>
import { toRef, computed } from 'vue'
import Table from './common/Table.vue'
import Paginator from './common/Paginator.vue'
import Button from './common/Button.vue'
import { useRoute, useRouter } from 'vue-router'
import { getSongs } from './../composables/useFetch.js'
const router = useRouter()
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
const { res: songs, options, totalPages, sort: sorter } = getSongs(albumId)
function search($event) {
    options.value._page = 1
    options.value.q = $event.target.value
}
</script>

<template>
    <div>
        <h2 v-if="props?.albumName">
            <Button @click="router.go(-1)">Back</Button>{{ props.albumName }} / Songs
        </h2>
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
        <Table
            :show-active="false"
            @header-click="sorter"
            :headers="['track', 'name']"
            :data="songs"
        ></Table>
    </div>
</template>

<style scoped>
h2 {
    display: flex;
    align-items: center;
    gap: 1rem;
}
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
