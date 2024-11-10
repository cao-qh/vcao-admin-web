<template>
  <PageWrapper>
    <a-space size="large">
      <span v-if="data">金额：{{ data.jine }}</span>
      <a-button type="primary" v-if="!data" @click="() => add.show()">
        添加
      </a-button>
      <template v-else>
        <a-button type="primary" @click="() => edit.show(data)">修改</a-button>
        <a-button type="primary" @click="handleDelete">删除</a-button>
      </template>
    </a-space>

    <Add ref="add" @success="gatData()" />

    <Edit ref="edit" @success="gatData()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqSearch, reqDelete } from '@/api/ScoreManager/ScoreExchange'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import { message } from 'ant-design-vue'

const data = ref<any>(null)
const add = ref()
const edit = ref()

onMounted(() => {
  gatData()
})

const gatData = async () => {
  const res = await reqSearch()
  if (res.code == 0) {
    data.value = res.data
  } else {
    data.value = null
  }
}

// 删除
const handleDelete = async () => {
  const res = await reqDelete()
  if (res.code == 0) {
    message.success(res.msg)
    gatData()
  } else {
    message.error(res.msg)
  }
}
</script>
