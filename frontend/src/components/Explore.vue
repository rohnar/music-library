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
        <div class="artists" v-if="!album">
            <Artists :searchable="false" class="artists" @selected="artist = $event">
                <h3>Artists</h3>
            </Artists>
        </div>
        <div class="albums" v-if="artist">
            <Albums :searchable="false" @selected="album = $event" :id="artist?.id">
                <h3 @click="album = null">{{ artist?.name }} / Albums</h3>
            </Albums>
        </div>
        <div class="songs" v-if="album">
            <Songs :searchable="false" :id="album?.id">
                <h3 @click="album = null">{{ album?.name }}</h3>
            </Songs>
        </div>
    </div>
</template>

<style scoped>
.explore-layout {
    display: grid;
    height: 100%;
    grid-template-columns: 1fr 1fr;
}
.explore-layout h3:hover {
    cursor: pointer;
    text-decoration: underline;
}
.explore-layout > div {
    padding: 10px;
}
</style>
