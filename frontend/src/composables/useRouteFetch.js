//WIP centralize router events
import { useRoute } from 'vue-router'
const route = useRoute()
function getQuery() {
  console.log(route)
}

export { getQuery }
