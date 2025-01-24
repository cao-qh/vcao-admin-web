<template>
  <a-tooltip
    :overlayInnerStyle="{ 'max-height': '300px', 'overflow-y': 'auto' }"
  >
    <template #title>
      {{ content }}
    </template>
    <div
      style="
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
      "
    >
      {{ content }}
    </div>
  </a-tooltip>
</template>

<script setup lang="ts">
defineProps<{
  content: string
}>()
</script>

<style></style>
