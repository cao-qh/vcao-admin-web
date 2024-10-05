<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()" />

    <STable
      ref="table"
      row-key="dingdanhao"
      :columns="columns"
      :data="getData"
      :showPagination="true"
      :scroll="{ x: 2500 }"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
    >
      <template #toolbar>
        <a-space>
          <a-popconfirm
            :title="`确定要批量推送吗？`"
            ok-text="是"
            cancel-text="否"
            @confirm="handleBatchPush"
          >
            <a-button type="primary" @click="handleExport">批量推送</a-button>
          </a-popconfirm>
          <a-button type="primary" @click="handleExport">导出</a-button>
        </a-space>
      </template>
      <template #bodyCell="{ column, row }">
        <!-- <template v-if="column.dataIndex === 'ruwangInfo'">
          <MultipartTableCell>
            <template #label>
              <div>入网名：</div>
              <div>入网号：</div>
              <div>证件号：</div>
            </template>
            <template #value>
              <div>{{ row.netName }}</div>
              <div>{{ row.netPhone }}</div>
              <div>{{ row.netCardId }}</div>
            </template>
          </MultipartTableCell>
        </template> -->
        <template v-if="column.dataIndex === 'action'">
          <div>
            <a-popconfirm
              title="确定推送吗？"
              ok-text="是"
              cancel-text="否"
              @confirm="handlePush(row.dingdanhao)"
            >
              <a>推送</a>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </STable>
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref, h } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import dayjs from 'dayjs'
import { reqOrder, reqPush, reqBatchPush, reqExport } from '@/api/agent/order'
import { message } from 'ant-design-vue'

defineOptions({
  name: 'Order',
})

// 订单状态
const status = [
  {
    value: 1,
    label: '校验失败',
    color: 'red',
  },
  {
    value: 2,
    label: '校验成功',
    color: 'blue',
  },
  {
    value: 3,
    label: '受理成功',
    color: 'orange',
  },
  {
    value: 4,
    label: '受理失败',
    color: 'green',
  },
  {
    value: 5,
    label: '未处理',
    color: 'green',
  },
]

const formItems = reactive([
  {
    type: 'datePicker',
    label: '开始时间',
    filed: 'kaishiDate',
    value: dayjs().subtract(15, 'day').format('YYYY-MM-DD'),
    valueFormat: 'YYYY-MM-DD',
    allowClear: false,
  },
  {
    type: 'datePicker',
    label: '结束时间',
    filed: 'jieshuDate',
    value: dayjs().format('YYYY-MM-DD'),
    valueFormat: 'YYYY-MM-DD',
    allowClear: false,
  },
  {
    type: 'select',
    label: '订单状态',
    filed: 'zhuangtai',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      label: '全部',
      value: '',
    },
    options: status,
  },
  {
    type: 'input',
    label: '兴投订单号',
    filed: 'dingdanhao',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '下级订单号',
    filed: 'dingdanhaoXiaji',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '产品编码',
    filed: 'chanpinbianma',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '产品名称',
    filed: 'chanpinmingcheng',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '手机号',
    filed: 'shoujihao',
    value: '',
    placeholder: '请输入',
  },
])

const table = ref()

const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '兴投订单编码',
    dataIndex: 'dingdanhao',
    align: 'center',
  },
  {
    title: '下级订单号',
    dataIndex: 'dingdanhaoXiaji',
    align: 'center',
  },
  {
    title: '兴投产品编码',
    dataIndex: 'chanpinbianma',
    align: 'center',
  },
  {
    title: '下游渠道商',
    dataIndex: 'xiayouqudaoshang',
    align: 'center',
  },
  {
    title: '产品名称',
    dataIndex: 'chanpinmingcheng',
    align: 'center',
  },
  {
    title: '办理手机号',
    dataIndex: 'shoujihao',
    align: 'center',
  },
  {
    title: '验证码',
    dataIndex: 'yanzhengma',
    align: 'center',
  },
  {
    title: '触点',
    dataIndex: 'xiajiChudian',
    align: 'center',
  },
  {
    title: '产品页面链接',
    dataIndex: 'xiajiLuodiyeUrl',
    align: 'center',
  },
  {
    title: '下级备注',
    dataIndex: 'xiajiBeizhu',
    align: 'center',
  },
  {
    title: '订单状态',
    dataIndex: 'zhuangtai',
    align: 'center',
    customRender: ({ text }: { text: any }) => {
      const item: any = status.find((item) => item.value === text)
      return h('span', { style: { color: item.color } }, item.label)
    },
  },
  {
    title: '校验结果',
    dataIndex: 'jiaoyanJieguo',
    align: 'center',
  },
  {
    title: '结果返回',
    dataIndex: 'shouliJieguo',
    align: 'center',
  },
  {
    title: '订购价格',
    dataIndex: 'dinggoujiage',
    align: 'center',
  },
  {
    title: '省份',
    dataIndex: 'shengfen',
    align: 'center',
  },
  {
    title: '地址',
    dataIndex: 'dishi',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'chuangjianshijian',
    align: 'center',
  },
  {
    title: '校验时间',
    dataIndex: 'jiaoyanshijian',
    align: 'center',
  },
  {
    title: '返回时间',
    dataIndex: 'shoulishijian',
    align: 'center',
  },
  {
    title: '操作',
    width: '120px',
    dataIndex: 'action',
    align: 'center',
  },
]

const getData = async (currentPage: number, pageSize: number) => {
  const data: any = {
    currentPage,
    pageSize,
  }
  formItems.forEach((item) => {
    if (item.value) {
      data[item.filed] = item.value
    }
  })

  const res: any = await reqOrder(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.totalSize,
    }
  }
}

// 推送
const handlePush = async (tOrderId: any) => {
  const res = await reqPush({ tOrderId })
  if (res.code == 0) {
    message.success(res.msg)
    table.value.refresh()
  } else {
    message.error(res.msg)
  }
}

// 导出
const handleExport = async () => {
  const data: any = {}
  formItems.forEach((item) => {
    if (item.value) {
      data[item.filed] = item.value
    }
  })

  const res = await reqExport(data)
  if (res.code === 0) {
    message.success(res.msg)
  } else {
    message.error(res.msg)
  }
}

const selectedRowKeys = ref<any>([])
const onSelectChange = (sRowKeys: any) => {
  selectedRowKeys.value = sRowKeys
}
// 批量推送
const handleBatchPush = async () => {
  const res = await reqBatchPush({ tOrderIds: selectedRowKeys.value.join(',') })
  if (res.code == 0) {
    message.success(res.msg)
    table.value.refresh()
  } else {
    message.error(res.msg)
  }
}
</script>
