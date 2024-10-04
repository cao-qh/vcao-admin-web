<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()" />

    <STable
      ref="table"
      row-key="id"
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
            :title="`确定要批量配置${selectedRowKeys.toString()}吗？`"
            ok-text="是"
            cancel-text="否"
          >
            <a-button type="primary" @click="handleExport">批量推送</a-button>
          </a-popconfirm>
          <a-button type="primary" @click="handleExport">导出</a-button>
        </a-space>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'ruwangInfo'">
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
        </template>
        <template v-if="column.dataIndex === 'taocan'">
          <MultipartTableCell>
            <template #label>
              <div>ID：</div>
              <div>套餐名：</div>
            </template>
            <template #value>
              <div>{{ row.goodsId }}</div>
              <div>{{ row.packageNickname }}</div>
            </template>
          </MultipartTableCell>
        </template>
        <template v-if="column.dataIndex === 'receiveInfo'">
          <MultipartTableCell>
            <template #label>
              <div>收货人：</div>
              <div>收电话：</div>
              <div>收地址：</div>
            </template>
            <template #value>
              <div>{{ row.takeName }}</div>
              <div>{{ row.takePhone }}</div>
              <div>{{ row.takeAddress }}</div>
            </template>
          </MultipartTableCell>
        </template>
        <template v-if="column.dataIndex === 'shouchongInfo'">
          <MultipartTableCell>
            <template #label>
              <div>首充状态：</div>
              <div>首充时间：</div>
              <div>首充金额：</div>
            </template>
            <template #value>
              <div>
                {{
                  shouchongStatus.find(
                    (item) => item.value === row.shouchongStatus,
                  )?.label
                }}
              </div>
              <div>{{ row.shouchongTime }}</div>
              <div>{{ row.shouchongPrice }}</div>
            </template>
          </MultipartTableCell>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <div>
            <a-popconfirm
              title="确定推送吗？"
              ok-text="是"
              cancel-text="否"
              @confirm="handlePush(row.orderId)"
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
import { STable, MultipartTableCell } from '@/components/STable'
import dayjs from 'dayjs'
import { reqSearch } from '@/api/table/search/index'
// import { message } from 'ant-design-vue'
// import { linkDownload } from '@/utils/download'
import useUserStore from '@/store/modules/user'

defineOptions({
  name: 'Order',
})

const userStore = useUserStore()

//#region 状态数据

// 订单状态
const statusOne = [
  {
    value: 1,
    label: '开卡失败',
    color: 'red',
  },
  {
    value: 2,
    label: '开卡中',
    color: 'blue',
  },
  {
    value: 3,
    label: '已发货',
    color: 'orange',
  },
  {
    value: 4,
    label: '已激活',
    color: 'green',
  },
]

// 二级订单状态
const statusTwo = [
  {
    value: 1,
    label: '失败已更换',
    color: 'orange',
  },
  {
    value: 2,
    label: '待处理',
    color: 'blue',
  },
  {
    value: 3,
    label: '受理成功',
    color: 'green',
  },
  {
    value: 4,
    label: '受理失败',
    color: 'red',
  },
  {
    value: 5,
    label: '未提交',
    color: 'blue',
  },
  {
    value: 6,
    label: '提交中',
    color: 'blue',
  },
  {
    value: 7,
    label: '处理中',
    color: 'blue',
  },
]

// 发货状态
const sendStatus = [
  {
    value: 1,
    label: '未发货',
    color: 'blue',
  },
  {
    value: 2,
    label: '已发货',
    color: 'orange',
  },
  {
    value: 3,
    label: '已签收',
    color: 'green',
  },
  {
    value: 4,
    label: '签收失败',
    color: 'red',
  },
]

// 退款状态
const tuikuanStatus = [
  {
    value: 1,
    label: '未退款',
    color: 'red',
  },
  {
    value: 2,
    label: '已退款',
    color: 'green',
  },
]

// 激活状态
const jihuoStatus = [
  {
    value: 1,
    label: '未激活',
    color: 'red',
  },
  {
    value: 2,
    label: '已激活',
    color: 'green',
  },
]

// 首充状态
const shouchongStatus = [
  {
    value: 1,
    label: '未首充',
    color: 'red',
  },
  {
    value: 2,
    label: '已首充',
    color: 'green',
  },
]

//#endregion

const formItems = reactive([
  {
    type: 'datePicker',
    label: '开始时间',
    filed: 'starttime',
    value: dayjs().subtract(15, 'day').format('YYYY-MM-DD'),
    valueFormat: 'YYYY-MM-DD',
    allowClear: false,
  },
  {
    type: 'datePicker',
    label: '结束时间',
    filed: 'endtime',
    value: dayjs().format('YYYY-MM-DD'),
    valueFormat: 'YYYY-MM-DD',
    allowClear: false,
  },
  {
    type: 'input',
    label: '订单号',
    filed: 'orderId',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '订单状态',
    filed: 'statusOne',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      label: '全部',
      value: '',
    },
    options: statusOne,
  },
  {
    type: 'select',
    label: '角色',
    filed: 'jueseStatus',
    value: 1,
    placeholder: '请选择',
    allowClear: false,
    options: [
      {
        value: 1,
        label: '自己的订单',
      },
      {
        value: 2,
        label: '下级的订单',
      },
    ],
  },
  {
    type: 'input',
    label: '入网号',
    filed: 'netPhone',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '二级订单状态',
    filed: 'statusTwo',
    hidden: userStore.level != 0,
    value: '',
    placeholder: '请选择',
    defaultOption: {
      label: '全部',
      value: '',
    },
    options: statusTwo,
  },
  {
    type: 'input',
    label: '收货电话',
    filed: 'takePhone',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '套餐名称',
    filed: 'packageNickname',
    value: '',
    placeholder: '请选择',
  },
  {
    type: 'select',
    label: '退款状态',
    filed: 'tuikuanStatus',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      label: '全部',
      value: '',
    },
    options: tuikuanStatus,
  },
  {
    type: 'select',
    label: '发货状态',
    filed: 'sendStatus',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      label: '全部',
      value: '',
    },
    options: sendStatus,
  },
  {
    type: 'select',
    label: '激活状态',
    filed: 'jihuoStatus',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      label: '全部',
      value: '',
    },
    options: jihuoStatus,
  },
  {
    type: 'select',
    label: '首充状态',
    filed: 'shouchongStatus',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      label: '全部',
      value: '',
    },
    options: shouchongStatus,
  },
  {
    type: 'input',
    label: '证件号',
    filed: 'netCardId',
    value: '',
    placeholder: '请输入',
  },
])

const table = ref()

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '账户名',
    dataIndex: 'userName',
    align: 'center',
  },
  {
    title: '北斗店铺ID',
    dataIndex: 'bdShopId',
    align: 'center',
  },
  {
    title: '订单号',
    dataIndex: 'orderId',
    align: 'center',
  },
  {
    title: '入网信息',
    dataIndex: 'ruwangInfo',
    align: 'center',
  },
  {
    title: '订单备注',
    dataIndex: 'note',
    align: 'center',
  },
  {
    title: '套餐',
    dataIndex: 'taocan',
    align: 'center',
  },
  // {
  //   title: '订单状态',
  //   dataIndex: 'statusOne',
  //   align: 'center',
  //   customRender: ({ text }: { text: any }) => {
  //     const item: any = statusOne.find((item) => item.value === text)
  //     return h('span', { style: { color: item.color } }, item.label)
  //   },
  // },
  // {
  //   title: '退款状态',
  //   dataIndex: 'tuikuanStatus',
  //   align: 'center',
  //   customRender: ({ text }: { text: any }) => {
  //     const item: any = tuikuanStatus.find((item) => item.value === text)
  //     return h('span', { style: { color: item.color } }, item.label)
  //   },
  // },
  // {
  //   title: '发货状态',
  //   dataIndex: 'sendStatus',
  //   align: 'center',
  //   customRender: ({ text }: { text: any }) => {
  //     const item: any = sendStatus.find((item) => item.value === text)
  //     return h('span', { style: { color: item.color } }, item.label)
  //   },
  // },
  // {
  //   title: '激活状态',
  //   dataIndex: 'jihuoStatus',
  //   align: 'center',
  //   customRender: ({ text }: { text: any }) => {
  //     const item: any = jihuoStatus.find((item) => item.value === text)
  //     return h('span', { style: { color: item.color } }, item.label)
  //   },
  // },
  {
    title: '激活时间',
    dataIndex: 'jihuoTime',
    align: 'center',
  },
  {
    title: '首充信息',
    dataIndex: 'shouchongInfo',
    align: 'center',
    width: '230px',
  },
  // {
  //   title: '首充状态',
  //   dataIndex: 'shouchongStatus',
  //   align: 'center',
  //   customRender: ({ text }: { text: any }) => {
  //     return shouchongStatus.find((item) => item.value === text)?.label
  //   },
  // },
  // {
  //   title: '首充时间',
  //   dataIndex: 'shouchongTime',
  //   align: 'center',
  // },
  // {
  //   title: '首充金额',
  //   dataIndex: 'shouchongPrice',
  //   align: 'center',
  // },
  {
    title: '累充金额',
    dataIndex: 'leichongPrice',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
  },
  {
    title: '反馈时间',
    dataIndex: 'resultTime',
    align: 'center',
  },
  {
    title: '订单描述',
    dataIndex: 'remarks',
    align: 'center',
  },
  {
    title: '收货信息',
    dataIndex: 'receiveInfo',
    align: 'center',
  },
  // {
  //   title: '收货人',
  //   dataIndex: 'takeName',
  //   align: 'center',
  // },
  // {
  //   title: '收货地址',
  //   dataIndex: 'takeAddress',
  //   align: 'center',
  // },
  // {
  //   title: '收货电话',
  //   dataIndex: 'takePhone',
  //   align: 'center',
  // },
  {
    title: '旺旺名',
    dataIndex: 'wwName',
    align: 'center',
  },

  {
    title: '操作',
    width: '120px',
    dataIndex: 'action',
    align: 'center',
  },
]

const getData = async (page: number, limit: number) => {
  const data: any = {
    page: page,
    size: limit,
  }
  formItems.forEach((item) => {
    if (item.value) {
      data[item.filed] = item.value
    }
  })

  const res: any = await reqSearch(data)
  if (res.code == 200) {
    return {
      data: res.data.list,
      total: res.data.total,
    }
  }
}

// 提单
const handlePush = async (orderId: any) => {
  /* const res = await reqSubmit({ orderId })
  if (res.code == 0) {
    message.success('提交成功')
    table.value.refresh()
  } else {
    message.error(res.msg)
  } */
}

// 导出
const handleExport = async () => {
  /* const starttime = formItems.find((item) => item.filed === 'starttime')?.value
  const endtime = formItems.find((item) => item.filed === 'endtime')?.value
  const jueseStatus = formItems.find(
    (item) => item.filed === 'jueseStatus',
  )?.value

  const res = await reqExport({
    starttime,
    endtime,
    jueseStatus,
  })
  if (res.code === 0) {
    const url = `${import.meta.env.VITE_SERVE}/tOrder/download/?filename=${res.data}`
    linkDownload(url)
  } else {
    message.error(res.msg)
  } */
}

const selectedRowKeys = ref<any>([])

const onSelectChange = (sRowKeys: any) => {
  selectedRowKeys.value = sRowKeys
}
</script>
