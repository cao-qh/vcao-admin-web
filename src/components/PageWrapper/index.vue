<template>
  <div class="page-wrapper">
    <a-card class="content-card" :bordered="false">
      <slot></slot>
    </a-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.page-wrapper {
  padding: 15px;
  .content-card {
    padding: 0;
  }
}
</style>
