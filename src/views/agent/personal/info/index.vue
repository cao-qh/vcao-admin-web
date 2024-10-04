<template>
  <PageWrapper>
    <a-descriptions title="个人信息" bordered>
      <a-descriptions-item label="账户">Cloud Database</a-descriptions-item>
      <a-descriptions-item label="密码">Prepaid</a-descriptions-item>
      <a-descriptions-item label="名称">YES</a-descriptions-item>
      <a-descriptions-item label="手机号">18888888888</a-descriptions-item>
      <a-descriptions-item label="创建时间">
        2018-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="修改时间">
        2019-04-24 18:00:00
      </a-descriptions-item>
    </a-descriptions>
    <div
      style="margin: 10px; width: 100%; display: flex; justify-content: center"
    >
      <a-button type="primary" @click="open = true">修改密码</a-button>
    </div>
    <Edit v-model:open="open" />
  </PageWrapper>
</template>

<script setup lang="ts">
import Edit from './Edit.vue'
import { ref } from 'vue'

const open = ref(false)
</script>

<style></style>
