<template>
  <PageWrapper>
    <div>{{ msg }}</div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const msg = ref(import.meta.env.MODE)
</script>
