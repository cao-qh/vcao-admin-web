<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()" />

    <STable
      ref="table"
      :columns="columns"
      :data="getData"
      :scroll="{ y: 'calc(100vh - 420px)' }"
      :showPagination="true"
    ></STable>
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import STable from '@/components/STable/index.vue'
import { reqSearchMemberBalanceChangeRecord } from '@/api/LogManager'
import { reqMember } from '@/api/common'
import dayjs from 'dayjs'

defineOptions({
  name: 'MemberBalanceChangeRecord',
})

// 状态
const type = [
  {
    value: 1,
    label: '充值',
  },
  {
    value: 2,
    label: '兑换',
  },
  {
    value: 3,
    label: '扣除',
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
    type: 'select',
    label: '会员编码',
    field: 'huiyuanBianma',
    value: '',
    placeholder: '请输入',
    options: async () => {
      const res = await reqMember()
      if (res.code == 0) {
        return res.data.map((item: any) => {
          return {
            label: `${item.bm}-${item.mc}`,
            value: item.bm,
          }
        })
      }
      return []
    },
    defaultOption: {
      value: '',
      label: '全部',
    },
  },
  {
    type: 'input',
    label: '金额',
    field: 'jine',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '类型',
    field: 'leixing',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      value: '',
      label: '全部',
    },
    options: type,
  },
  {
    type: 'input',
    label: '备注',
    field: 'beizhu',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '订单号',
    field: 'dingdanhao',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '购剧订单号',
    field: 'goujudingdanhao',
    value: '',
    placeholder: '请输入',
  },
])

const columns = [
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
    title: '金额',
    dataIndex: 'jine',
    align: 'center',
  },
  {
    title: '变动前',
    dataIndex: 'biandongqian',
    align: 'center',
  },
  {
    title: '变动后',
    dataIndex: 'biandonghou',
    align: 'center',
  },
  {
    title: '类型',
    dataIndex: 'leixing',
    align: 'center',
    customRender: ({ text }: { text: string }) => {
      const item = type.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '备注',
    dataIndex: 'beizhu',
    align: 'center',
  },
  {
    title: '订单号',
    dataIndex: 'dingdanhao',
    align: 'center',
  },
  {
    title: '购剧订单号',
    dataIndex: 'goujudingdanhao',
    align: 'center',
  },
  {
    title: '变动时间',
    dataIndex: 'chuangjianshiajin',
    align: 'center',
  },
]

const table = ref()

const getData = async (currentPage: number, pageSize: number) => {
  const data: any = {
    currentPage,
    pageSize,
  }
  formItems.forEach((item) => {
    data[item.field] = item.value
  })

  const res: any = await reqSearchMemberBalanceChangeRecord(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.totalSize,
    }
  }
}
</script>

<style></style>
