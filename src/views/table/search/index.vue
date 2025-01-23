<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()"></SearchForm>

    <STable
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="reqData"
      :showPagination="true"
      :scroll="{ x: 'max-content', y: 'calc(100vh - 450px)' }"
    >
      <template #toolbar>
        <a-button type="primary" @click="() => add.show()">添加记录</a-button>
        <a-button type="primary" @click="() => batchImport.show()">
          批量导入
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'zhanghuxinxi'">
          <MultipartTableCell
            :data-list="[
              {
                label: '手机号：',
                value: row.phone,
                labelStyle: {
                  paddingLeft: '15px',
                },
              },
              {
                label: '代理账户：',
                value: row.agentname,
              },
            ]"
          />
        </template>
        <template v-if="column.dataIndex === 'dingdanxinxi'">
          <MultipartTableCell
            :data-list="[
              {
                label: '订单状态：',
                value: getOrderStatus(row.zhuangtai).label,
                valueStyle: {
                  color: getOrderStatus(row.zhuangtai).color,
                },
              },
              {
                label: '订单号：',
                value: row.dingdanhao,
                labelStyle: {
                  paddingLeft: '14px',
                },
              },
            ]"
          />
        </template>
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
            <a @click="() => edit.show(row)">修改</a>
            <a-divider type="vertical" />
            <a @click="() => detail.show(row)">详情</a>
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

    <Edit
      ref="edit"
      :channel="channel"
      :faceValue="faceValue"
      @success="table.refresh()"
    />

    <Detail ref="detail" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable, MultipartTableCell } from '@/components/STable'
import dayjs from 'dayjs'
import { reqSearch, reqSubmit, reqQijinyong } from '@/api/table/search/index'
import Add from './modules/Add.vue'
import BatchImport from './modules/BatchImport.vue'
import Edit from './modules/Edit.vue'
import { message } from 'ant-design-vue'
import Detail from './modules/Detail.vue'

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
    field: 'startTime',
    value: dayjs().subtract(15, 'day').format('YYYY-MM-DD HH:mm:ss'),
    showTime: true,
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
  },
  {
    type: 'datePicker',
    label: '结束时间',
    field: 'endTime',
    value: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    showTime: true,
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
  },
  {
    type: 'input',
    label: '手机号',
    field: 'phone',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '面值',
    field: 'faceValue',
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
    field: 'tongdao',
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
    field: 'zhuangtai',
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
    width: '80px',
  },
  {
    title: '账户信息',
    dataIndex: 'zhanghuxinxi',
    align: 'center',
    width: '200px',
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
    title: '通道',
    dataIndex: 'tongdao',
    align: 'center',
    customRender: ({ text }: { text: string }) => {
      const item = channel.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '订单信息',
    dataIndex: 'dingdanxinxi',
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
  const data: any = {
    currentPage,
    pageSize,
  }
  formItems.forEach((item) => {
    if (item.value) {
      data[item.field] = item.value
    }
  })

  const res: any = await reqSearch(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.total,
    }
  }
}

// 添加记录
const add = ref()
// 批量导入
const batchImport = ref()
// 修改
const edit = ref()
// 详情
const detail = ref()

// 提单
const handleSubmit = async (dingdanhao: string) => {
  const res = await reqSubmit(dingdanhao)
  if (res.code == 0) {
    message.success(res.msg)
  } else {
    message.error(res.msg)
  }
}

// 启禁用
const handelQijinyong = async (row: any) => {
  const result = await reqQijinyong({
    id: row.id,
    qijinyong: row.qijinyong === 1 ? 2 : 1,
  })
  if (result.code == 0) {
    message.success(result.msg)
  } else {
    message.error(result.msg)
  }
}

// 获取订单状态
const getOrderStatus = (value: number) => {
  const item: any = orderStatus.find((item: any) => item.value === value)
  return item
}
</script>

<style></style>
