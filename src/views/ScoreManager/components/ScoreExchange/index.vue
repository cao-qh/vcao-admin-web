<template>
  <div>
    <template v-if="data">
      <div style="margin-bottom: 10px">金额：{{ data.jine }}</div>
      <a-space>
        <a-button
          v-has="'Btn.ScoreExchange.Update'"
          type="primary"
          @click="() => edit.show(data)"
        >
          修改
        </a-button>
        <a-button
          v-has="'Btn.ScoreExchange.Delete'"
          type="primary"
          @click="handleDelete"
        >
          删除
        </a-button>
      </a-space>
    </template>

    <div v-else>
      <a-empty>
        <template #description>
          <span>未配置积分兑换</span>
        </template>
        <a-button
          v-has="'Btn.ScoreExchange.Add'"
          type="primary"
          @click="add.show()"
        >
          现在添加
        </a-button>
      </a-empty>
    </div>

    <Add ref="add" @success="gatData()" />

    <Edit ref="edit" @success="gatData()" />
  </div>
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
