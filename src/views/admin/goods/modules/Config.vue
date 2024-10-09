<template>
  <a-modal
    title="配置代理"
    :open="open"
    :width="750"
    :bodyStyle="{ width: 'auto' }"
    @ok="submit"
    @cancel="open = false"
    :maskClosable="false"
  >
    <a-table
      rowKey="dailiBianma"
      :columns="columns"
      :data-source="data"
      bordered
      :pagination="false"
      :scroll="{ y: 600 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'peizhi'">
          <a-checkbox v-model:checked="record.peizhi"></a-checkbox>
        </template>
        <template v-if="column.dataIndex === 'dailiYongjinJine'">
          <a-input-number :min="0" v-model:value="record.dailiYongjinJine" />
        </template>
        <template v-if="column.dataIndex === 'jiesuanfangshi'">
          <a-select v-model:value="record.jiesuanfangshi" style="width: 100%">
            <a-select-option :value="1">长期分成</a-select-option>
            <a-select-option :value="2">CPA一口价</a-select-option>
          </a-select>
        </template>
        <template v-if="column.dataIndex === 'jiesuanzhouqi'">
          <a-select v-model:value="record.jiesuanzhouqi" style="width: 100%">
            <a-select-option :value="1">实时</a-select-option>
            <a-select-option :value="2">日结</a-select-option>
            <a-select-option :value="3">周结</a-select-option>
            <a-select-option :value="4">双周结</a-select-option>
            <a-select-option :value="5">月结</a-select-option>
          </a-select>
        </template>
        <template v-if="column.dataIndex === 'shangxiajia'">
          <a-switch
            :checked="record.shangxiajia === 1"
            @change="handleChange(record)"
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
const data = ref<any>([])

/* const selectedRowKeys = ref([])
const selectedRows = ref([])
const onSelectChange = (keys: any, rows: any) => {
  console.log(keys, rows)
  selectedRowKeys.value = keys
  selectedRows.value = rows
} */

const columns = [
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  //   align: 'center',
  //   width: 60,
  // },
  {
    title: '配置',
    dataIndex: 'peizhi',
    align: 'center',
    width: '80px',
  },
  {
    title: '代理编码',
    dataIndex: 'dailiBianma',
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
  // {
  //   title: '上下架',
  //   dataIndex: 'shangxiajia',
  //   align: 'center',
  //   width: 70,
  // },
]

const show = async (row: any) => {
  const res: any = await reqConfig({ chanpinBianma: row.bianma })
  if (res.code == 0) {
    open.value = true
    const list: any = []
    res.data.forEach((i: any) => {
      list.push({
        peizhi: i.peizhi === 1 ? true : false,
        chanpinBianma: i.chanpinBianma,
        dailiBianma: i.dailiBianma,
        dailiYongjinJine: i.dailiYongjinJine || 0,
        jiesuanfangshi: i.jiesuanfangshi || 1,
        jiesuanzhouqi: i.jiesuanzhouqi || 1,
        // shangxiajia: i.shangxiajia || 2,
        shangxiajia: 1,
      })
    })
    data.value = list
  } else {
    message.error(res.msg)
  }
}

const submit = async () => {
  try {
    const params = data.value.filter((i: any) => i.peizhi)
    const res = await reqConfigEdit(params)
    if (res.code == 0) {
      message.success(res.msg)
      $emit('success')
      open.value = false
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
