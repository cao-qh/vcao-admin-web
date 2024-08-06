<template>
  <PageWrapper>测试提交</PageWrapper>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { onMounted } from 'vue'

onMounted(() => {
  message.success('欢迎使用')
})
</script>

<style></style>
