<script setup>
import { ref, watch } from 'vue'
import Button from './Button.vue'
const activeRow = ref(null)
const props = defineProps({
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
    emit('rowClick', row)
}
watch(
    () => props.data,
    () => {
        if (activeRow.value) {
            activeRow.value = null
        }
    }
)
</script>
<template>
    <table>
        <tr>
            <th v-for="(item, h) in headers" :key="h">
                <div class="header">
                    {{ item }}<Button @click="onHeaderClick(item)"> Sort </Button>
                </div>
            </th>
        </tr>
        <tr
            v-for="(row, r) in data"
            :key="r"
            @click="onRowClick(row)"
            :class="{
                'active-row': row.id === activeRow && showActive,
                'clickable-row': showActive
            }"
        >
            <td v-for="(key, index) in headers" :key="index">
                <div v-if="typeof row[key] === 'Object'">
                    <span v-for="(innerKey, innerIndex) in Object.keys(row[key])" :key="innerKey">
                        {{ innerKey }}
                    </span>
                </div>
                <span v-else>
                    {{ row[key] }}
                </span>
            </td>
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
    justify-content: space-between;
    align-items: center;
    gap: 8px;
}

.active-row {
    background-color: rgb(0, 124, 6);
    color: white;
}
.clickable-row {
    cursor: pointer;
}
.clickable-row:hover:not(.active-row) {
    background-color: rgba(147, 225, 150, 0.546);
}
</style>
