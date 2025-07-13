<template>
  <PageWrapper>
    <a-descriptions title="个人信息" bordered>
      <a-descriptions-item label="姓名">
        {{ userInfo.xingming }}
      </a-descriptions-item>
      <a-descriptions-item label="手机号">
        {{ userInfo.shoujihao }}
      </a-descriptions-item>
      <a-descriptions-item label="邮箱">
        {{ userInfo.youxiang }}
      </a-descriptions-item>
      <a-descriptions-item label="启禁用">
        {{ userInfo.qijinyong == 1 ? '启用' : '禁用' }}
      </a-descriptions-item>
      <a-descriptions-item label="IP">
        {{ userInfo.ip }}
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
      <a-button type="primary" @click="() => edit.show(userInfo)">
        修改
      </a-button>
    </div>
    <Edit ref="edit" @success="getData" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { selectUserInfo } from '@/api/Personal'
import Edit from './Edit.vue'
import { message } from 'ant-design-vue'

const userInfo = ref<any>({})
const edit = ref()

const getData = async () => {
  const res: any = await selectUserInfo()
  if (res.code === 0) {
    userInfo.value = {
      ...res.data,
    }
  } else {
    message.error(res.msg)
  }
}
getData()
</script>

<style></style>
