<template>
  <a-modal
    title="展示类别配置"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :maskClosable="false"
    width="600px"
    :body-style="{ maxHeight: '580px', overflow: 'auto' }"
  >
    <a-table
      rowKey="zhanshiliebiebianma"
      :columns="columns"
      :scroll="{ x: 500 }"
      bordered
      :dataSource="showClassList"
      :pagination="false"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'qijinyong'">
          <a-switch
            :checked="record.qijinyong === 1"
            @change="handleChange(record, $event)"
          ></a-switch>
        </template>
        <template v-if="column.dataIndex === 'quanzhong'">
          <a-input-number :min="0" v-model:value="record.quanzhong" />
        </template>
      </template>
    </a-table>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import {
  reqSearchShowClass,
  reqConfigShowClass,
} from '@/api/VideoManager/VideoCollection'

defineOptions({ name: 'Config' })

// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)
const showClassList = ref<any>([])
const bianma = ref<string>('')
const selectedRowKeys = ref<any>([])
const selectedRows = ref<any>([])

const columns = [
  {
    title: '展示类别编码',
    dataIndex: 'zhanshiliebiebianma',
    align: 'center',
  },
  {
    title: '展示类别名称',
    dataIndex: 'zhanshiliebiebianmaMC',
    align: 'center',
  },
  {
    title: '启禁用',
    dataIndex: 'qijinyong',
    align: 'center',
  },
  {
    title: '权重',
    dataIndex: 'quanzhong',
    align: 'center',
  },
]

const show = async (row: any) => {
  selectedRows.value = []
  selectedRowKeys.value = []
  const res: any = await reqSearchShowClass({ bianma: row.bianma })
  if (res.code == 0) {
    if (res.data.length == 0) {
      message.error('不存在视频合集')
      return
    }

    open.value = true
    showClassList.value = res.data
    bianma.value = row.bianma
    showClassList.value.forEach((item: any) => {
      if (item.peizhi == 1) {
        selectedRowKeys.value.push(item.zhanshiliebiebianma)
        selectedRows.value.push(item)
      }
    })
  } else {
    message.error(res.message)
  }
}

const submit = async () => {
  try {
    const data: any = []
    selectedRows.value.forEach((item: any) => {
      data.push({
        hejibianma: bianma.value,
        zhanshiliebiebianma: item.zhanshiliebiebianma,
        qijinyong: item.qijinyong || 2,
        quanzhong: item.quanzhong || 0,
      })
    })
    const res = await reqConfigShowClass(bianma.value, data)
    if (res.code == 0) {
      $emit('success')
      open.value = false
      message.success('修改成功')
    } else {
      message.error(res.msg)
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}

const handleChange = (item: any, e: any) => {
  if (e) {
    item.qijinyong = 1
  } else {
    item.qijinyong = 2
  }
}

const onSelectChange = (innerSelectedRowKeys: any, innerSelectedRows: any) => {
  selectedRowKeys.value = innerSelectedRowKeys
  selectedRows.value = innerSelectedRows
}

defineExpose({
  show,
})
</script>
