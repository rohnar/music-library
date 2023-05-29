<script setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted, toRef, watchEffect, computed } from 'vue'
import Table from './common/Table.vue'
import Paginator from './common/Paginator.vue'
import Button from './common/Button.vue'
import { getAlbums } from './../composables/useFetch.js'
const props = defineProps({
    id: {
        type: [Number, String]
    },
    artistName: {
        type: String
    },
    searchable: {
        type: Boolean,
        default: true
    }
})
const artistId = computed(() => {
    return props.id //bit of a hack to get the composable to refetch on prop change
})
const router = useRouter()
const { res: albums, options, totalPages, sort } = getAlbums(artistId)

const emit = defineEmits(['selected'])
function select(item) {
    if (router?.currentRoute?.value?.name !== 'Explorer') {
        router.push({ name: 'Album / Songs', params: { id: item.id, albumName: item.name } })
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
        <h2 v-if="props?.artistName">
            <Button @click="router.go(-1)">Back</Button>{{ props.artistName }} / Albums
        </h2>
        <div class="table-header">
            <input
                v-if="searchable"
                placeholder="Search by name or year"
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
            @header-click="sort"
            @row-click="select"
            :headers="['name', 'year_released']"
            :data="albums"
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
