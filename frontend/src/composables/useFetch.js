import axios, { isCancel, AxiosError } from 'axios'
import { ref, watch, watchEffect } from 'vue'
import Cookies from 'js-cookie'
//currently state and methods are encapsulated, could move state outside of functions to make
//global artist, album, song and param objects

/* AXIOS CONFIG - important for JWT authorization */
const axiosDefaults = {
    baseURL: 'http://localhost:5000',
    withCredentials: true
}
let instance = axios.create(axiosDefaults)
instance.interceptors.request.use(function (config) {
    const token = Cookies.get('jwtToken')
    if (!token) {
        //mock error when token isn't present
        //return Promise.reject('Missing token')
    }
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
})

/* HELPERS */
//data fetching
async function fetch(path, options) {
    try {
        let res = await instance.get(path, { params: { ...options } })
        return res
    } catch (err) {
        console.error(err)
    }
}

//sorting
function setSort(name, options) {
    options.value._sort = name
    options.value._order ? delete options.value._order : (options.value._order = 'desc')
}

/* ACTIONS */
//further improvement would involve making a general action to reduce redundancy and divide these actions for different roles & permissions

/* ARTISTS */
function getArtists() {
    const res = ref(null)
    const totalPages = ref(null)
    const options = ref({
        _page: 1,
        _limit: 10
    })
    const refetch = () => {
        fetch('/artists', options.value)
            .then((response) => {
                res.value = response.data
                totalPages.value = Math.ceil(
                    (response.headers['x-total-count'] * options.value._limit) /
                        options.value._limit ** 2
                )
            })
            .catch((error) => {
                console.error(error)
            })
    }
    watchEffect(() => {
        refetch()
    })
    function sort(e) {
        setSort(e, options)
    }
    return {
        res,
        options,
        refetch,
        sort,
        totalPages
    }
}

/* ALBUMS */
function getAlbums(artistId) {
    const res = ref(null)
    const totalPages = ref(null)
    const options = ref({
        _page: 1,
        _limit: 10
    })
    const refetch = (artistId) => {
        let endpoint = artistId?.value ? `/artists/${artistId.value}/albums` : '/albums'
        fetch(endpoint, options.value)
            .then((response) => {
                res.value = response.data
                totalPages.value = Math.ceil(
                    (response.headers['x-total-count'] * options.value._limit) /
                        options.value._limit ** 2
                )
            })
            .catch((error) => {
                console.error(error)
            })
    }
    function sort(e) {
        setSort(e, options)
    }
    watch(artistId, () => {
        options.value._page = 1
        refetch(artistId)
    })
    watch(options,() => {refetch(artistId)},{ deep: true, immediate: true })
    return {
        res,
        options,
        refetch,
        sort,
        totalPages
    }
}
/* SONGS */
function getSongs(albumId) {
    const res = ref(null)
    const totalPages = ref(null)
    const options = ref({
        _page: 1,
        _limit: 10
    })
    const refetch = (albumId) => {
        //note: can get all song info using albums?_expand=artist&_embed=songs
        let endpoint = albumId.value ? `/albums/${albumId.value}/songs` : '/songs'

        fetch(endpoint, options.value)
            .then((response) => {
                res.value = response.data
                totalPages.value = Math.ceil(
                    (response.headers['x-total-count'] * options.value._limit) /
                        options.value._limit ** 2
                )
            })
            .catch((error) => {
                console.error(error)
            })
    }
    function sort(e) {
        setSort(e, options)
    }
    watch(albumId, () => {
        options.value._page = 1
        refetch(albumId)
    })
    watch(options,() => {refetch(albumId)},{ deep: true, immediate: true })
    return {
        res,
        options,
        refetch,
        sort,
        totalPages
    }
}

/* ALL - experimental */
function getAllSongs(albumId) {
    const res = ref(null)
    const totalPages = ref(null)
    const options = ref({
        _page: 1,
        _limit: 10
    })
    const refetch = (albumId) => {
        //note: can get all song info using albums?_expand=artist&_embed=songs
        let endpoint = albumId.value
            ? `/albums/${albumId.value}/songs`
            : '/albums?_expand=artist&_embed=songs'

        fetch(endpoint, options.value)
            .then((response) => {
                res.value = response.data
                totalPages.value = Math.ceil(
                    (response.headers['x-total-count'] * options.value._limit) /
                        options.value._limit ** 2
                )
            })
            .catch((error) => {
                console.error(error)
            })
    }
    function sort(e) {
        setSort(e, options)
    }
    watch(albumId, () => {
        options.value._page = 1
        refetch(albumId)
    })
    watch(options,() => {refetch(albumId)},{ deep: true, immediate: true })
    return {
        res,
        options,
        refetch,
        sort,
        totalPages
    }
}

export { fetch, getArtists, getAlbums, getSongs, setSort, getAllSongs }
