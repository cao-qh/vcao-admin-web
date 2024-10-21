<template>
  <a-flex>
    <div style="text-align: right; text-wrap: nowrap">
      <slot name="label"></slot>
    </div>
    <a-flex style="text-align: left" vertical align="start">
      <slot name="value"></slot>
    </a-flex>
  </a-flex>
</template>

<script setup lang="ts"></script>

<style></style>
