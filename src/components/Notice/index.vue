<template>
  <div class="notice">
    <a-badge dot class="icon">
      <notification-outlined style="font-size: 18px" />
    </a-badge>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.notice {
  position: relative;
  width: 24px;
  height: 24px;

  .icon {
    position: absolute;
    top: 4px;
  }
}
</style>
