<template>
  <PageWrapper>
    <SearchForm
      ref="searchForm"
      :formItems="formItems"
      @search="table.refresh()"
    />

    <STable
      ref="table"
      row-key="dingdanhao"
      :columns="columns"
      :data="getData"
      :showPagination="true"
      :scroll="{ x: 2050, y: 'calc(100vh - 420px)' }"
    >
      <template #toolbar>
        <a-button
          v-has="'Btn.MemberBuyOrder.Download'"
          type="primary"
          @click="handleExport"
        >
          导出
        </a-button>
      </template>
    </STable>
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import dayjs from 'dayjs'
import { reqSearch, reqExport } from '@/api/OrderManager/MemberBuyOrder'
import { reqMember } from '@/api/common'
import { message } from 'ant-design-vue'

defineOptions({
  name: 'MemberBuyOrder',
})

// 支付方式
const payWay: any = [
  {
    value: 1,
    label: '微信小程序',
  },
  {
    value: 2,
    label: 'H5',
  },
  {
    value: 3,
    label: '公众号',
  },
  {
    value: 4,
    label: '支付宝',
  },
  {
    value: 5,
    label: '做任务',
  },
]

// 支付类型
const payType = [
  {
    value: 1,
    label: '未支付',
    color: 'red',
  },
  {
    value: 2,
    label: '已支付',
    color: 'green',
  },
]

// 购买类型
const buyType = [
  {
    value: 1,
    label: '全剧',
    color: 'red',
  },
  {
    value: 2,
    label: '单章',
    color: 'green',
  },
  {
    value: 3,
    label: '小时会员',
    color: 'green',
  },
]

const formItems = reactive([
  {
    type: 'datePicker',
    label: '开始时间',
    field: 'startTime',
    value: dayjs().subtract(15, 'day').format('YYYY-MM-DD'),
    valueFormat: 'YYYY-MM-DD',
    allowClear: false,
  },
  {
    type: 'datePicker',
    label: '结束时间',
    field: 'endTime',
    value: dayjs().format('YYYY-MM-DD'),
    valueFormat: 'YYYY-MM-DD',
    allowClear: false,
  },
  {
    type: 'input',
    label: '订单号',
    field: 'dingdanhao',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '会员',
    field: 'huiyuanBianma',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      label: '全部',
      value: '',
    },
    options: async () => {
      const res = await reqMember()
      if (res.code == 0) {
        return res.data.map((item: any) => {
          return {
            label: item.mc,
            value: item.bm,
          }
        })
      }
    },
  },
  {
    type: 'select',
    label: '支付类型',
    field: 'zhifuleixing',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      label: '全部',
      value: '',
    },
    options: payType,
  },
  {
    type: 'select',
    label: '购买类型',
    field: 'maileiixng',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      label: '全部',
      value: '',
    },
    options: buyType,
  },
])

const searchForm = ref()
const table = ref()

const columns = [
  {
    title: '订单号',
    dataIndex: 'dingdanhao',
    align: 'center',
  },
  {
    title: '会员编码',
    dataIndex: 'huiyuanBianma',
    align: 'center',
  },
  {
    title: '会员名称',
    dataIndex: 'huiYuanMingCheng',
    align: 'center',
  },
  {
    title: '原始价格',
    dataIndex: 'yuanshijiage',
    align: 'center',
  },
  {
    title: '支付价格',
    dataIndex: 'zhifujiage',
    align: 'center',
  },
  {
    title: '支付方式',
    dataIndex: 'zhifufangshi',
    align: 'center',
    customRender: ({ text }: any) => {
      const item: any = payWay.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '支付类型',
    dataIndex: 'zhifuleixing',
    align: 'center',
    customRender: ({ text }: any) => {
      const item: any = payType.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '购买类型',
    dataIndex: 'maileiixng',
    align: 'center',
    customRender: ({ text }: any) => {
      const item: any = buyType.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '视频合集',
    dataIndex: 'shiPinHejiMingCheng',
    align: 'center',
  },
  {
    title: '视频章节',
    dataIndex: 'shiPinZhangJieMingCheng',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'chuangjianshijian',
    align: 'center',
  },
  {
    title: '发起支付时间',
    dataIndex: 'faqizhifushijian',
    align: 'center',
  },
  {
    title: '支付成功时间',
    dataIndex: 'zhifuchenggong',
    align: 'center',
  },
  {
    title: '第三方订单号',
    dataIndex: 'disanfangdingdanhao',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'beizhu',
    align: 'center',
  },
  {
    title: '时长',
    dataIndex: 'shichang',
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
      data[item.field] = item.value
    }
  })

  const res: any = await reqSearch(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.totalSize,
    }
  }
}

// 导出
const handleExport = async () => {
  const res = await reqExport(searchForm.value.getFormValues())
  if (res.code === 0) {
    message.success(res.msg)
  } else {
    message.error(res.msg)
  }
}
</script>
