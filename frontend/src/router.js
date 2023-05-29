import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from './composables/useAuth'
import Login from './components/Login.vue'
import Explore from './components/Explore.vue'
import Artists from './components/Artists.vue'
import Albums from './components/Albums.vue'
import Songs from './components/Songs.vue'
import AllSongsExperiment from './components/AllSongsExperiment.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', name: 'Login', component: Login },
        { path: '/', name: 'Explorer', component: Explore },
        { path: '/artists', name: 'Artists', component: Artists },
        {
            path: '/:artistName/:id/albums',
            name: 'Artist / Albums',
            component: Albums,
            props: true
        },
        { path: '/albums', name: 'Albums', component: Albums },
        { path: '/:albumName/:id/songs', name: 'Album / Songs', component: Songs, props: true },
        { path: '/songs', name: 'Songs', component: Songs },
        { path: '/allSongs', name: 'All Songs (Experiment)', component: AllSongsExperiment }
    ]
})

//protect from invalid users by determining authentication status before route change
router.beforeEach((to, from, next) => {
    if (!isAuthenticated() && to.name !== 'Login') {
        window.alert('Session has timed out, please log in')
        next({ name: 'Login' })
    } else next()
})

export { router }
