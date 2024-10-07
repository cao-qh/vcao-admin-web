<template>
  <PageWrapper>
    <a-descriptions
      title="API信息"
      bordered
      :column="1"
      :labelStyle="{ textAlign: 'center', width: '200px' }"
      :contentStyle="{ textAlign: 'center' }"
    >
      <a-descriptions-item label="密钥">
        {{ userInfo.miyao }}
      </a-descriptions-item>
      <a-descriptions-item label="回调地址">
        {{ userInfo.huitiaoUrl }}
      </a-descriptions-item>
      <a-descriptions-item label="IP白名单">
        {{ userInfo.ipS }}
      </a-descriptions-item>
    </a-descriptions>
    <div
      style="margin: 10px; width: 100%; display: flex; justify-content: center"
    >
      <a-button type="primary" @click="open = true">修改</a-button>
    </div>
    <Edit v-model:open="open" :userInfo="userInfo" @reload="getData" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { selectUserApi } from '@/api/agent/personal'
import Edit from './Edit.vue'
import { message } from 'ant-design-vue'
const open = ref(false)
let userInfo = ref<any>({})

const getData = async () => {
  const res = await selectUserApi()
  if (res.code === 0) {
    userInfo.value = { ...res.data }
  } else {
    message.error(res.msg)
  }
}
getData()
</script>

<style></style>
