<template>
  <a-modal
    title="详情"
    :open="open"
    :footer="null"
    :mask-closable="false"
    @cancel="open = false"
  >
    <a-descriptions v-if="data" :column="1" bordered>
      <a-descriptions-item label="缩略图">
        {{ data.slt }}
      </a-descriptions-item>
      <a-descriptions-item label="名称">{{ data.mc }}</a-descriptions-item>
      <a-descriptions-item label="普通价格">
        {{ data.ptjg }}
      </a-descriptions-item>
      <a-descriptions-item label="会员价格">
        {{ data.hyjg }}
      </a-descriptions-item>
      <a-descriptions-item label="推荐">
        {{ data.tj }}
      </a-descriptions-item>
      <a-descriptions-item label="简介">
        {{ data.jj }}
      </a-descriptions-item>
      <a-descriptions-item label="剧情介绍">
        {{ data.jqjs }}
      </a-descriptions-item>
    </a-descriptions>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { reqDetail } from '@/api/table/search/index'
import { message } from 'ant-design-vue'

defineOptions({ name: 'Detail' })

const open = ref<boolean>(false)
const data = ref<any>(null)

const show = async (row: any) => {
  const res = await reqDetail({ id: row.id })
  if (res.code == 0) {
    open.value = true
    data.value = res.data
  } else {
    message.error(res.msg)
  }
}

defineExpose({
  show,
})
</script>
