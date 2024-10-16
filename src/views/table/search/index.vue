<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()"></SearchForm>

    <STable
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="reqData"
      :showPagination="true"
      :scroll="{ y: 'calc(100vh - 450px)' }"
    >
      <template #toolbar>
        <a-button type="primary" @click="handleAdd">添加记录</a-button>
        <a-button type="primary" @click="handleBatchImport">批量导入</a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'qijinyong'">
          <a-popconfirm
            title="确定要修改吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="handelQijinyong(row)"
          >
            <a-switch :checked="row.qijinyong === 1" />
          </a-popconfirm>
        </template>
        <template v-if="column.dataIndex === 'zhuangtai'">
          <span
            :style="{
              color: getOrderStatus(row.zhuangtai).color,
            }"
          >
            {{ getOrderStatus(row.zhuangtai).label }}
          </span>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <template v-if="row.zhuangtai !== 2">
            <a-popconfirm
              title="确定提单吗？"
              ok-text="是"
              cancel-text="否"
              @confirm="handleSubmit(row.dingdanhao)"
            >
              <a>提单</a>
            </a-popconfirm>
            <a-divider type="vertical" />
            <a @click="handleChangeSubmit(row)">更换通道并提单</a>
          </template>
        </template>
      </template>
    </STable>

    <Add
      ref="add"
      :channel="channel"
      :faceValue="faceValue"
      @success="table.refresh()"
    />

    <BatchImport ref="batchImport" @success="table.refresh()" />

    <ChangeSubmit
      ref="changeSubmit"
      :channel="channel"
      :faceValue="faceValue"
      @success="table.refresh()"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import dayjs from 'dayjs'
import type { RecordSearchResponseData, Record } from '@/api/table/search/type'
import type { RequestParams } from '@/api/type'
import { reqSearch, reqSubmit, reqQijinyong } from '@/api/table/search/index'
import Add from './modules/Add.vue'
import BatchImport from './modules/BatchImport.vue'
import ChangeSubmit from './modules/ChangeSubmit.vue'
import { message } from 'ant-design-vue'

// 订单状态
const orderStatus: any = [
  {
    value: 1,
    label: '未提交',
    color: 'blue',
  },
  {
    value: 2,
    label: '已提交',
    color: 'green',
  },
  {
    value: 3,
    label: '处理中',
    color: 'orange',
  },
  {
    value: 4,
    label: '充值成功',
    color: 'green',
  },
  {
    value: 5,
    label: '充值失败',
    color: 'red',
  },
  {
    value: 6,
    label: '提交失败',
    color: 'red',
  },
]

// 通道
const channel: any = [
  {
    value: 1,
    label: '通道A',
  },
  {
    value: 2,
    label: '通道B',
  },
  {
    value: 3,
    label: '通道C',
  },
]

// 面值
const faceValue: any = [
  {
    value: 10,
    label: '10元',
  },
  {
    value: 20,
    label: '20元',
  },
  {
    value: 30,
    label: '30元',
  },
]

const formItems = reactive([
  {
    type: 'datePicker',
    label: '开始时间',
    filed: 'startTime',
    value: dayjs().subtract(15, 'day').format('YYYY-MM-DD HH:mm:ss'),
    showTime: true,
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
  },
  {
    type: 'datePicker',
    label: '结束时间',
    filed: 'endTime',
    value: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    showTime: true,
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
  },
  {
    type: 'input',
    label: '手机号',
    filed: 'phone',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '面值',
    filed: 'faceValue',
    value: '',
    placeholder: '请输入',
    options: faceValue,
    defaultOption: {
      label: '全部',
      value: '',
    },
  },
  {
    type: 'select',
    label: '通道',
    filed: 'tongdao',
    value: '',
    placeholder: '请选择',
    options: channel,
    defaultOption: {
      label: '全部',
      value: '',
    },
  },
  {
    type: 'select',
    label: '状态',
    filed: 'zhuangtai',
    value: '',
    placeholder: '请选择',
    options: orderStatus,
    defaultOption: {
      label: '全部',
      value: '',
    },
  },
])

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    align: 'center',
  },
  {
    title: '面值',
    dataIndex: 'mianzhi',
    align: 'center',
    customRender: ({ text }: { text: string }) => {
      const item = faceValue.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '代理账户',
    dataIndex: 'agentname',
    align: 'center',
  },
  {
    title: '通道',
    dataIndex: 'tongdao',
    align: 'center',
    customRender: ({ text }: { text: string }) => {
      const item = channel.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '订单状态',
    dataIndex: 'zhuangtai',
    align: 'center',
  },
  {
    title: '订单号',
    dataIndex: 'dingdanhao',
    align: 'center',
  },
  {
    title: '收货地址',
    dataIndex: 'address',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'beizhu',
    align: 'center',
  },
  {
    title: '充值时间',
    dataIndex: 'chongzhitime',
    align: 'center',
    customRender: ({ text }: { text: string }) => {
      return text && dayjs(text).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  {
    title: '反馈时间',
    dataIndex: 'fankuitime',
    align: 'center',
    customRender: ({ text }: { text: string }) => {
      return text && dayjs(text).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  {
    title: '启禁用',
    dataIndex: 'qijinyong',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
  },
]

const table = ref()

const reqData = async (currentPage: number, pageSize: number) => {
  const data: RequestParams = {
    currentPage,
    pageSize,
  }
  formItems.forEach((item) => {
    if (item.value) {
      data[item.filed] = item.value
    }
  })

  const res: RecordSearchResponseData = await reqSearch(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.total,
    }
  }
}

// 添加记录
const add = ref()

const handleAdd = () => {
  add.value.show()
}

// 批量导入
const batchImport = ref()
const handleBatchImport = () => {
  batchImport.value.show()
}

// 更换通道并提单
const changeSubmit = ref()
const handleChangeSubmit = (row: Record) => {
  changeSubmit.value.show(row)
}
// 提单
const handleSubmit = async (dingdanhao: string) => {
  const res = await reqSubmit(dingdanhao)
  if (res.code == 200) {
    message.success(res.message)
  } else {
    message.error(res.message)
  }
}

// 启禁用
const handelQijinyong = async (row: any) => {
  const result = await reqQijinyong({
    id: row.id,
    qijinyong: row.qijinyong === 1 ? 2 : 1,
  })
  if (result.code == 0) {
    message.success(result.message)
  } else {
    message.error(result.message)
  }
}

// 获取订单状态
const getOrderStatus = (value: number) => {
  const item: any = orderStatus.find((item: any) => item.value === value)
  return item
}
</script>

<style></style>
