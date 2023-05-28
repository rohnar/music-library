<script setup></script>
<template>
  <button class="ml-button">
    <slot></slot>
  </button>
</template>
<style scoped>
.ml-button {
  background-color: aliceblue;
  padding: 0.3rem;
  border-radius: 5px;
  cursor: pointer;
}
.ml-button:hover {
  padding: 0.3rem;
  box-shadow: rgb(152, 224, 152) 0 0 3px 2px;
}
</style>
