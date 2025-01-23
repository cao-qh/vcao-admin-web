<template>
  <div>
    <a-flex v-for="row in dataList" :key="row.label">
      <span
        style="width: max-content; text-align: right; text-wrap: nowrap"
        :style="row.labelStyle || ''"
      >
        {{ row.label }}
      </span>
      <span
        style="text-align: left; word-break: break-all"
        :style="row.valueStyle || ''"
      >
        {{ row.value }}
      </span>
    </a-flex>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  dataList: Array<{
    label: string
    value: string
    labelStyle?: Record<string, any>
    valueStyle?: Record<string, any>
  }>
}>()
</script>

<style></style>
