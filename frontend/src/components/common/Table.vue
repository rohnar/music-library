<script setup>
import { ref } from 'vue'
import Button from './Button.vue'
const activeRow = ref(null)
defineProps({
  headers: {
    type: Array
    // required: true
  },
  data: {
    type: Array
    // required: true
  },
  showActive: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['headerClick', 'rowClick'])
function onHeaderClick(column) {
  emit('headerClick', column)
}
function onRowClick(row) {
  activeRow.value = row.id
  console.log(row, activeRow.value)
  emit('rowClick', row)
}
</script>
<template>
  <table>
    <tr>
      <th v-for="(item, h) in headers" :key="h">
        <div class="header"><Button @click="onHeaderClick(item)">SORT</Button>{{ item }}</div>
      </th>
    </tr>
    <tr
      v-for="(row, r) in data"
      :key="r"
      @click="onRowClick(row)"
      :class="{ 'active-row': row.id === activeRow && showActive, 'clickable-row': showActive }"
    >
      <td v-for="(key, index) in headers" :key="index">{{ row[key] }}</td>
    </tr>
  </table>
</template>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.header {
  display: flex;
  gap: 5px;
}

.active-row {
  background-color: rgb(0, 124, 6);
  color: white;
}
.clickable-row {
  cursor: pointer;
}
.clickable-row:hover:not(.active-row) {
  background-color: rgb(7, 34, 8);
}
</style>
