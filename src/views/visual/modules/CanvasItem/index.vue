<template>
  <component
    class="canvas-item"
    :is="item.name"
    @click="$emit('click', item.id)"
  >
    {{ item.text }}
  </component>
</template>

<script setup lang="ts">
import type { Props } from './type'

defineOptions({ name: 'CanvasItem' })

defineProps<Props>()
</script>

<style></style>
