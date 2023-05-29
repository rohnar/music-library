<script setup></script>
<template>
    <button class="ml-button">
        <slot></slot>
    </button>
</template>
<style scoped>
.ml-button {
    background-color: rgb(243, 255, 243);
    padding: 0.3rem;
    border-radius: 5px;
    border: 1px solid rgb(0, 160, 27);
    cursor: pointer;
}
.ml-button:hover {
    background-color: rgb(228, 255, 228);
    padding: 0.3rem;
    box-shadow: rgb(152, 224, 152) 0 0 3px 2px;
}
</style>
