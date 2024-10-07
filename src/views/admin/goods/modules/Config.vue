<template>
  <a-modal
    title="配置代理"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :maskClosable="false"
  >
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, row }">
        <template v-if="column.key === 'dailiYongjinJine'">
          <a-input v-model:value="row.dailiYongjinJine" />
        </template>
        <template v-if="column.key === 'jiesuanfangshi'">
          <a-select v-model:value="row.jiesuanfangshi">
            <a-select-option :value="1">长期分成</a-select-option>
            <a-select-option :value="2">CPA一口价</a-select-option>
          </a-select>
        </template>
        <template v-if="column.key === 'jiesuanzhouqi'">
          <a-select v-model:value="row.jiesuanzhouqi">
            <a-select-option :value="1">实时</a-select-option>
            <a-select-option :value="2">日结</a-select-option>
            <a-select-option :value="3">周结</a-select-option>
            <a-select-option :value="4">双周结</a-select-option>
            <a-select-option :value="5">月结</a-select-option>
          </a-select>
        </template>
        <template v-if="column.dataIndex === 'shangxiajia'">
          <a-switch
            :checked="row.shangxiajia === 1"
            @change="handleChange(row)"
          />
        </template>
      </template>
    </a-table>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqConfig, reqConfigEdit } from '@/api/admin/goods'

defineOptions({ name: 'Config' })

// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)
const data = ref([])
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '代理编码',
    dataIndex: 'dailibianma',
    align: 'center',
    width: '100px',
  },
  {
    title: '佣金',
    dataIndex: 'dailiYongjinJine',
    align: 'center',
  },
  {
    title: '结算方式',
    dataIndex: 'jiesuanfangshi',
    align: 'center',
  },
  {
    title: '结算周期',
    dataIndex: 'jiesuanzhouqi',
    align: 'center',
  },
  {
    title: '上下架',
    dataIndex: 'shangxiajia',
    align: 'center',
  },
]

const show = async (row: any) => {
  const res: any = await reqConfig({ chanpinBianma: row.bianma })
  if (res.code == 0) {
    open.value = true
    data.value = res.data
  } else {
    message.error(res.msg)
  }
}

const submit = async () => {
  try {
    const res = await reqConfigEdit(data.value)
    if (res.code == 0) {
      $emit('success')
      open.value = false
      message.success(res.msg)
    } else {
      message.error(res.msg)
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}

const handleChange = (row: any) => {
  row.shangxiajia = row.shangxiajia === 2 ? 1 : 2
}

defineExpose({
  show,
})
</script>
