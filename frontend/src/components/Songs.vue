<script setup>
import {toRef} from 'vue'
import Table from './common/Table.vue'
import Paginator from './common/Paginator.vue'
import { getSongs } from './../composables/useFetch.js'

const props = defineProps({
  albumId: {
    type: Number
  }
})
const { res: songs, options, totalPages, sort: sorter } = getSongs(toRef(() => props.albumId))
</script>

<template>
  <div class="greetings">
    <div>
      <Paginator
        :max-page="totalPages"
        :page-number="options._page"
        @next="options._page++"
        @prev="options._page--"
      ></Paginator>
      <Table :show-active="false" @header-click="sorter" :headers="['track','name']" :data="songs"></Table>
    </div>
  </div>
</template>

<style scoped></style>
