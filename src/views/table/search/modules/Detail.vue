<template>
  <a-modal
    title="详情"
    :open="open"
    :footer="null"
    :mask-closable="false"
    @cancel="open = false"
  >
    <a-descriptions v-if="data" :column="1" bordered>
      <a-descriptions-item label="代理名称">
        {{ data.agentname }}
      </a-descriptions-item>
      <a-descriptions-item label="电话">{{ data.phone }}</a-descriptions-item>
      <a-descriptions-item label="充值时间">
        {{ data.chongzhitime }}
      </a-descriptions-item>
      <a-descriptions-item label="反馈时间">
        {{ data.fankuitime }}
      </a-descriptions-item>
      <a-descriptions-item label="备注">
        {{ data.beizhu }}
      </a-descriptions-item>
    </a-descriptions>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { Record } from '@/api/table/search/type'
import { reqDetail } from '@/api/table/search/index'
import { message } from 'ant-design-vue'

defineOptions({ name: 'Add' })
// 属性
defineProps({
  channel: {
    type: Object,
    default: () => {},
  },
  faceValue: {
    type: Object,
    default: () => {},
  },
})

const open = ref<boolean>(false)
const data = ref<any>(null)

const show = async (row: Record) => {
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
