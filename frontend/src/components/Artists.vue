<script setup>
import { useRouter, useRoute } from 'vue-router'
import Table from './common/Table.vue'
import { fetch, getArtists } from './../composables/useFetch.js'
import { getQuery } from './../composables/useRouteFetch.js'
import Paginator from './common/Paginator.vue'
const { options, res, totalPages, sort } = getArtists()
const emit = defineEmits(['selected'])
const router = useRouter()
const route = useRoute()
function select(item) {
  emit('selected', item)
}
function getThing() {
  console.log(route.query, route.path)
}
</script>

<template>
  <div class="greetings">
    <button @click="getThing">GET</button>
    <div class="green">
      <Paginator
        :max-page="totalPages"
        :page-number="options._page"
        @next="options._page++"
        @prev="options._page--"
      ></Paginator>
      <Table @header-click="sort" @row-click="select" :headers="['name']" :data="res"></Table>
    </div>
  </div>
</template>

<style scoped></style>
