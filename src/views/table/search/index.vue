<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()"></SearchForm>

    <a-space style="margin-bottom: 8px">
      <a-button type="primary" @click="handleAdd">
        <template #icon>
          <PlusOutlined />
        </template>
        添加记录
      </a-button>

      <a-button type="primary" @click="handleBatchImport">
        <template #icon>
          <UploadOutlined />
        </template>
        批量导入
      </a-button>
    </a-space>

    <STable
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="reqData"
      :showPagination="true"
      :scroll="{ y: 'calc(100vh - 408px)' }"
    >
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'qijinyong'">
          <a-popconfirm
            title="确定要启用吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="handelQqijinyong(row)"
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
            <a @click="handleChangeSubmit(row)">更换通道并提单</a>
          </template>
        </template>
      </template>
    </STable>

    <Add
      ref="add"
      :channel="CHANNEL"
      :faceValue="FACE_VALUE"
      @success="table.refresh()"
    />
    <BatchImport ref="batchImport" @success="table.refresh()" />
    <ChangeSubmit
      ref="changeSubmit"
      :channel="CHANNEL"
      :faceValue="FACE_VALUE"
      @success="table.refresh()"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import STable from '@/components/STable/index.vue'
import dayjs from 'dayjs'
import type { StringKey } from './type'
import type {
  RecordSearchResponseData,
  RecordSearchParams,
  Record,
} from '@/api/table/search/type'
import { reqSearch, reqSubmit, reqQijinyong } from '@/api/table/search/index'
import Add from './modules/Add.vue'
import BatchImport from './modules/BatchImport.vue'
import ChangeSubmit from './modules/ChangeSubmit.vue'
import { message } from 'ant-design-vue'

const ORDER_STATUS: StringKey = {
  1: '未提交',
  2: '已提交',
  3: '处理中',
  4: '充值成功',
  5: '充值失败',
  6: '提交失败',
}

// 通道
const CHANNEL: StringKey = {
  1: '通道A',
  2: '通道B',
  3: '通道C',
}

// 面值
const FACE_VALUE: StringKey = {
  10: '10元',
  20: '20元',
  30: '30元',
}

const formItems = reactive([
  {
    type: 'datePicker',
    label: '开始时间',
    filed: 'staticTime',
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
    placeholder: '请输入手机号',
  },
  {
    type: 'input',
    label: '面值',
    filed: 'mianzhi',
    value: '',
    placeholder: '请输入面值',
  },
  {
    type: 'input',
    label: '通道',
    filed: 'tongdao',
    value: '',
    placeholder: '请输入通道',
  },
  {
    type: 'select',
    label: '状态',
    filed: 'zhuangtai',
    value: null,
    placeholder: '请选择',
    options: Object.keys(ORDER_STATUS).map((key) => ({
      value: key,
      label: ORDER_STATUS[key],
    })),
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
      return FACE_VALUE[text]
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
      return CHANNEL[text]
    },
  },
  {
    title: '订单状态',
    dataIndex: 'zhuangtai',
    align: 'center',
    customRender: ({ text }: { text: string }) => {
      return ORDER_STATUS[text]
    },
  },
  {
    title: '订单号',
    dataIndex: 'dingdanhao',
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

const reqData = async (page: number, limit: number) => {
  const data: RecordSearchParams = {
    page: page,
    size: limit,
    staticTime: '',
    endTime: '',
  }
  formItems.forEach((item) => {
    if (item.value) {
      data[item.filed] = item.value
    }
  })

  const res: RecordSearchResponseData = await reqSearch(data)
  if (res.code == 200) {
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
const handelQqijinyong = async (row: any) => {
  const result = await reqQijinyong({
    id: row.id,
    qijinyong: row.qijinyong === 1 ? 2 : 1,
  })
  if (result.code == 200) {
    message.success(result.message)
  } else {
    message.error(result.message)
  }
}
</script>

<style></style>
