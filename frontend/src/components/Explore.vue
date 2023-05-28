<script setup>
import { onMounted, ref, watch } from 'vue'
import Button from '../components/common/Button.vue'
import Artists from './Artists.vue'
import Albums from './Albums.vue'
import Songs from './Songs.vue'
const artist = ref(null)
const album = ref(null)
</script>

<template>
  <div class="explore-layout">
    <div>
      <Artists class="artists" @selected="artist = $event"></Artists>
    </div>
    <div>
      <h2 @click="artist = null">{{ artist?.name }}</h2>
      <Albums @selected="album = $event" :artist-id="artist?.id"></Albums>
    </div>
    <div>
      <h2 @click="album = null">{{ artist?.name }} / {{ album?.name }}</h2>
      <Songs :album-id="album?.id"></Songs>
    </div>
  </div>
</template>

<style scoped>
.explore-layout {
}
.explore-layout h2:hover {
  cursor: pointer;
  text-decoration: underline;
  /* font-weight: bold; */
}
</style>
