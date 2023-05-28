<script setup>
import { toRef } from 'vue'
import Table from './common/Table.vue'
import Paginator from './common/Paginator.vue'
import { getAlbums } from './../composables/useFetch.js'
const props = defineProps({
  artistId: {
    type: Number
  }
})
const { res: albums, options, totalPages, sort } = getAlbums(toRef(() => props.artistId))
const emit = defineEmits(['selected'])

function select(item) {
  emit('selected', item)
}
</script>

<template>
  <div class="greetings">
    <div class="green">
      <Paginator
        :max-page="totalPages"
        :page-number="options._page"
        @next="options._page++"
        @prev="options._page--"
      ></Paginator>
      <Table
        @header-click="sort"
        @row-click="select"
        :headers="['name', 'year_released']"
        :data="albums"
      ></Table>
    </div>
  </div>
</template>

<style scoped></style>
