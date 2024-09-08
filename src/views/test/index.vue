<template>
  <PageWrapper>
    <SvgIcon name="logo" width="40px" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const msg = ref(import.meta.env.MODE)
</script>
