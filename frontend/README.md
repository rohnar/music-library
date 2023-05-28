## Technical decisions
The most simple way of putting the views together would be by using routes to render the components, then basing the data fetching on the URL query. This would also take advantage of Vue-Routers history and links for specific queries could be saved and shared.

I approached it differently so that we would not need to depend on route, instead I using props and user interactions to fetch data. This allows for greater flexibility as we grow the user interface. Rather than having a component per route we can show multiple components at same time (for example, show all artists on the left and conditionally render the albums and songs on the right side depending on the selected artist), the "Explore" page shows the basic functionality for this. This may not be the vision for the product right now but gives greater flexibility for user interface in the future.

The useFetch composable contains all data fetching actions and takes advantage of axios's api for converting param objects into query strings.

One issue is that this makes the composable grow over time, one improvement would be to put reusable logic in a helper function ex: watchEffect on option change, get max page count etc in a seperate composable. Then any future actions would be able to reuse this.

I was tempted to make all state global but that tends to begin a nasty pattern of making everything global... right now every instance of useFetch would create a local state for that component. The state could easily be lifted by declaring the composable refs (options, res, maxPage) outside the functions. Global state is used for authentication status.

## Future improvements
Since this contains info on artist albums which would be relatively static for old albums, we could cache the results on the client, storing n latest results to reduce network requests.

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
