<template>
  <div>
    <div v-if="data" style="margin-bottom: 10px">
      <div v-if="data.jifenleixing == 1">积分：{{ data.jifen }}</div>
      <template v-if="data.jifenleixing == 2">
        <div>最低分：{{ data.zuidijifen }}</div>
        <div>最高分：{{ data.zuigaojifen }}</div>
      </template>
      <div>时长：{{ data.shichang }}</div>
      <div>
        积分类型：{{
          jifenleixing.find((item) => item.value === data.jifenleixing)?.label
        }}
      </div>
    </div>
    <a-space>
      <a-button
        v-has="'Btn.ViewScore.Add'"
        type="primary"
        v-if="!data"
        @click="() => add.show()"
      >
        添加
      </a-button>
      <template v-else>
        <a-button
          v-has="'Btn.ViewScore.Update'"
          type="primary"
          @click="() => edit.show(data)"
        >
          修改
        </a-button>
        <a-button
          v-has="'Btn.ViewScore.Delete'"
          type="primary"
          @click="handleDelete"
        >
          删除
        </a-button>
      </template>
    </a-space>

    <Add ref="add" :jifenleixing="jifenleixing" @success="gatData()" />

    <Edit ref="edit" :jifenleixing="jifenleixing" @success="gatData()" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqSearch, reqDelete } from '@/api/ScoreManager/ViewScore'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import { message } from 'ant-design-vue'

const data = ref<any>(null)
const add = ref()
const edit = ref()

const jifenleixing = [
  {
    value: 1,
    label: '固定',
  },
  {
    value: 2,
    label: '区间',
  },
]

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
