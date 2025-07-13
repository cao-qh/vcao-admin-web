<template>
  <a-modal
    title="配置演员"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :maskClosable="false"
    width="800px"
    :body-style="{ maxHeight: '580px', overflow: 'auto' }"
  >
    <a-table
      rowKey="bianma"
      :columns="columns"
      bordered
      :dataSource="actorList"
      :pagination="false"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'xinxi'">
          <a-popover>
            <template #content>
              <p>{{ record.xinxi }}</p>
            </template>
            <span
              style="
                display: inline-block;
                width: 200px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              {{ record.xinxi }}
            </span>
          </a-popover>
        </template>
        <template v-if="column.dataIndex === 'zhaopian'">
          <a-image :width="50" :src="baseUrl + record.zhaopian" />
        </template>
      </template>
    </a-table>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import {
  reqSearchActor,
  reqConfigActor,
} from '@/api/VideoManager/VideoCollection'

defineOptions({ name: 'Config' })

// 定义方法
const $emit = defineEmits(['success'])

const baseUrl = import.meta.env.VITE_SERVE
const open = ref<boolean>(false)
const actorList = ref<any>([])
const bianma = ref<string>('')
const selectedRowKeys = ref<any>([])
const selectedRows = ref<any>([])

const role = [
  {
    value: 1,
    label: '演员',
  },
  {
    value: 2,
    label: '导演',
  },
  {
    value: 3,
    label: '其他',
  },
]

const columns = [
  {
    title: '编码',
    dataIndex: 'bianma',
    align: 'center',
  },
  {
    title: '姓名',
    dataIndex: 'mingzi',
    align: 'center',
  },
  {
    title: '角色',
    dataIndex: 'juese',
    align: 'center',
    customRender: ({ text }: any) => {
      const item = role.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '照片',
    dataIndex: 'zhaopian',
    align: 'center',
  },
  {
    title: '信息',
    dataIndex: 'xinxi',
    align: 'center',
    width: 10,
  },
]

const show = async (row: any) => {
  selectedRows.value = []
  selectedRowKeys.value = []
  const res: any = await reqSearchActor({ bianma: row.bianma })
  if (res.code == 0) {
    if (res.data.length == 0) {
      message.error('无可配置演员')
      return
    }

    open.value = true
    actorList.value = res.data
    bianma.value = row.bianma
    actorList.value.forEach((item: any) => {
      if (item.peizhi == 1) {
        selectedRowKeys.value.push(item.bianma)
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
        shipinjuesebianma: item.bianma, //角色编码
        shipinhejibianma: bianma.value, //合集编码
      })
    })
    const res = await reqConfigActor(bianma.value, data)
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

const onSelectChange = (innerSelectedRowKeys: any, innerSelectedRows: any) => {
  selectedRowKeys.value = innerSelectedRowKeys
  selectedRows.value = innerSelectedRows
}

defineExpose({
  show,
})
</script>
