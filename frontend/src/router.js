import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import Explore from './components/Explore.vue'
import Artists from './components/Artists.vue'
import Albums from './components/Albums.vue'
import Songs from './components/Songs.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: Login },
    { path: '/', component: Explore },
    { path: '/artists', component: Artists },
    { path: '/albums', component: Albums },
    { path: '/songs', component: Songs }
  ]
})

export { router }
