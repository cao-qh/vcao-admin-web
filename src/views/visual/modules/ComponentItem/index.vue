<template>
  <a-button @click="onComponentItemClick">添加段落</a-button>
</template>

<script setup lang="ts">
const $emit = defineEmits(['click'])

const onComponentItemClick = () => {
  $emit('click')
}
</script>

<style></style>
