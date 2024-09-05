<template>
  <a-flex>
    <div style="flex: 1; text-align: right; text-wrap: nowrap">
      <slot name="label"></slot>
    </div>
    <a-flex style="flex: 3; text-align: left" vertical align="start">
      <slot name="value"></slot>
    </a-flex>
  </a-flex>
</template>

<script setup lang="ts"></script>

<style></style>
