## Technical decisions
Note: db.json needed to be tweaked: replaced snake_case id's with camelCase id's as per json-server docs. This allows for the relationships to work for queries like: 
```
artists/1/albums
artists?_embed=album
```

1. The simplest flow involves using routes to query the data. This takes advantage of Vue-Routers history and links for specific queries could be saved and shared. In the Artists and Albums pages you can click on a row in the table to take you to the corresponding child Albums and Songs.

    The components are also made to fetch based on props from the parents. This allows for greater flexibility as we grow the user interface. Multiple components can be shown at the same time (for example, show all artists on the left and conditionally render the albums and songs on the right side depending on the selected artist), the "Explore" page shows the basic functionality for this. This may not be the vision for the product right now but gives greater flexibility for user interface in the future.

2. The useFetch composable contains all data fetching actions and takes advantage of axios's api for converting param objects into query strings. This gives us a reusable way to fetch data and manage the filter and pagination.

    One issue is that this makes the useFetch composable grow over time, one improvement would be to put reusable logic in a helper function (ex: watchEffect on option change, get max page count...) in a seperate composable. Then any future actions would be able to reuse this. However, more abstraction = harder to read.

3. I was tempted to make all state global but that tends to begin a nasty pattern of making everything global... right now each instance of useFetch creates a local state for that component. The state could easily be lifted by declaring the composable refs (options, res, maxPage) outside the functions. Global state is used for authentication status in useAuth.

3. For the architect's JWT constraint, axios is configured to attach the jwt (stored in a cookie) for every request. The useAuth composable can be a place for checking for a jwt and requesting one when necessary - using a login. Can use json-server-auth to mock a 401 on the server and ensure handling for request failures are well handled. For now I have made a basic layout of the frontend states for authentication. Also, the jwt expires for 30 min and signs you out if you try to navigate.

## Future improvements
1. Since this contains info on artist albums which would be relatively static, we could cache the results on the client, storing n latest results to reduce network requests.

2. If the backend provides a payload which contains an array with nested artist/album/songs, a new view could contain all three entities. 
    This can be simulated right now using json-server's _embed and _expand keyword ('album?_expand=artist&_embed=songs' will show all data) and having the tables render the nested values.

2. Actions could use a helper function for managing the options object (request params) and initializing all watchers needed for reactive fetching. Currently this is repeated for the 3 main actions: getArtists, getAlbums and getSongs

3. The jwt can encode role information which can be used to set role information. A role can perform certain actions (such as the ones in my useFetch.js). These can also be "chunked" so that only actions available to the role are delivered to the client

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
