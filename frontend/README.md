## UI overview
### Explorer (home): 
clicking on the Artist and Album rows reveals more options on the right side.
### Artist/Album/Songs nav links: 
The idea is for these pages to have more filtering capability. You can also drill down from artist to song by clicking on rows
## Technical decisions
Note: db.json needed to be tweaked: replaced snake_case id's with camelCase id's as per json-server docs. This allows for the relationships to work for queries like: 
```
artists/1/albums
artists?_embed=album
```

1. The Artist, Album and Song components work by refetching data when the options object from the composable is altered. It will also refetch when it is passed a parent id (ex: artistId for Albums.vue and albumId for Songs.vue).

    The parent id prop is set by parents and vue-router which enables us to use url parameters (see "Artists/Albums/Songs" nav links) as well as a typical parent/child structure (see "Explorer").

    The idea behind this was to make flexible components and utility functions that can evolve with the application and UI requirements.

2. The useFetch composable contains all data fetching actions. This gives us a reusable way to fetch data and manage the filter and pagination.

    One issue is that this makes the useFetch composable grow over time, one improvement would be to put reusable logic in a helper function (ex: watchEffect on option change, get max page count...) in a seperate composable. Then any future actions would be able to reuse this. However, more abstraction could be harder to read.

3. I was tempted to make all state global but that tends to begin a nasty pattern of making everything global... right now each instance of useFetch creates a local state for that component. The state could easily be lifted by declaring the composable refs (options, res, maxPage) outside the functions. The useAuth.js is meant to keep a global state.

3. For the architect's JWT constraint, axios is configured to attach a jwt cookie and Authorization header for every request. The useAuth composable can be a place for checking for a jwt and requesting one when necessary - using a login. Next step: can use json-server-auth to mock 403 on the server and ensure request failures are well handled. For now I have made a basic layout of the frontend states for authentication. Also, the jwt expires for 30 min and signs you out if you try to navigate.

## Future improvements
1. Since this contains info on artist albums which would be relatively static, we could cache the results, storing n latest results to reduce network requests.

2. If the backend provides a payload which contains an array with nested artist/album/songs, a new view could contain all three entities. 
    This can be simulated right now using json-server's _embed and _expand keyword ('album?_expand=artist&_embed=songs' will show all data) and having the tables render the nested values. /allSongs shows this in a rough form.

2. Actions could use a helper function for managing the options object (request params) and initializing all watchers needed for reactive fetching. Currently this is repeated for the 3 main actions: getArtists, getAlbums and getSongs

3. The jwt can encode role information which can be used to set role information. A role can perform certain actions (such as the ones in my useFetch.js). These can also be chunked so that only actions available to the role are delivered to the client

# VUE 3 README

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
