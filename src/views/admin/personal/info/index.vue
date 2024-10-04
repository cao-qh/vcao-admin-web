<template>
  <PageWrapper>
    <a-descriptions title="个人信息" bordered>
      <a-descriptions-item label="账户">
        {{ userInfo.shoujihao }}
      </a-descriptions-item>
      <a-descriptions-item label="密码">
        {{ userInfo.mima }}
      </a-descriptions-item>
      <a-descriptions-item label="名称">
        {{ userInfo.mingcheng }}
      </a-descriptions-item>
      <a-descriptions-item label="IP">
        {{ userInfo.ipS }}
      </a-descriptions-item>
      <a-descriptions-item label="创建时间">
        {{ userInfo.chuangjianshijian }}
      </a-descriptions-item>
      <a-descriptions-item label="修改时间">
        {{ userInfo.gengxinshijian }}
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
import { selectUserInfo } from '@/api/admin/personal'
import Edit from './Edit.vue'
import { message } from 'ant-design-vue'
const open = ref(false)
let userInfo = ref<any>({})

const getData = async () => {
  const res = await selectUserInfo()
  if (res.code === 0) {
    userInfo.value = { ...res.data }
  } else {
    message.error(res.msg)
  }
}
getData()
</script>

<style></style>
