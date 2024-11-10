<template>
  <PageWrapper>
    <div v-if="data">
      <div>广告编码：{{ data.guanggaobianma }}</div>
      <div>积分：{{ data.jifen }}</div>
      <div>最低积分：{{ data.zuidijifen }}</div>
      <div>最高积分：{{ data.zuigaojifen }}</div>
      <div>积分类型：{{ data.jifenleixing }}</div>
      <div>广告名称：{{ data.guanggaomingcheng }}</div>
    </div>
    <a-space>
      <a-button
        v-has="'Btn.AdScore.Add'"
        type="primary"
        v-if="!data"
        @click="() => add.show()"
      >
        添加
      </a-button>
      <template v-else>
        <a-button
          v-has="'Btn.AdScore.Update'"
          type="primary"
          @click="() => edit.show(data)"
        >
          修改
        </a-button>
        <a-button
          v-has="'Btn.AdScore.Delete'"
          type="primary"
          @click="handleDelete"
        >
          删除
        </a-button>
      </template>
    </a-space>

    <Add
      ref="add"
      :jifenleixing="jifenleixing"
      :adList="adList"
      @success="gatData()"
    />

    <Edit
      ref="edit"
      :jifenleixing="jifenleixing"
      :adList="adList"
      @success="gatData()"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqSearch, reqDelete } from '@/api/ScoreManager/AdScore'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import { message } from 'ant-design-vue'
import { reqAd } from '@/api/common'

const data = ref<any>(null)
const add = ref()
const edit = ref()
const adList = ref([])

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
  reqAd().then((res) => {
    if (res.code == 0) {
      adList.value = res.data.map((item: any) => {
        return {
          label: item.mingcheng,
          value: item.bianma,
        }
      })
    }
  })
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
