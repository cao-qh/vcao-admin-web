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
import { reqSearch } from '@/api/table/search/index'
import dayjs from 'dayjs'

defineOptions({
  name: 'UserLog',
})

// 类型
const type = [
  {
    value: 1,
    label: '添加',
  },
  {
    value: 2,
    label: '兑换',
  },
]

// 模块
const module = [
  {
    value: 1,
    label: '签到',
  },
  {
    value: 2,
    label: '开宝箱',
  },
  {
    value: 3,
    label: '抽抽',
  },
  {
    value: 4,
    label: '看短剧',
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
    type: 'select',
    label: '类型',
    filed: 'type',
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
    label: '会员名称',
    filed: 'hymc',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '模块',
    filed: 'module',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      value: '',
      label: '全部',
    },
    options: module,
  },
])

const columns = [
  {
    title: '会员名称',
    dataIndex: 'hymc',
    align: 'center',
  },
  {
    title: '积分',
    dataIndex: 'jf',
    align: 'center',
  },
  {
    title: '变动前',
    dataIndex: 'bdq',
    align: 'center',
  },
  {
    title: '变动后',
    dataIndex: 'bdh',
    align: 'center',
  },
  {
    title: '类型',
    dataIndex: 'type',
    align: 'center',
    customRender: ({ text }: { text: string }) => {
      const item = type.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '备注',
    dataIndex: 'bz',
    align: 'center',
  },
  {
    title: '订单号',
    dataIndex: 'ddh',
    align: 'center',
  },
  {
    title: '获取积分模式',
    dataIndex: 'module',
    align: 'center',
    customRender: ({ text }: { text: string }) => {
      const item = module.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '变动时间',
    dataIndex: 'bdsj',
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
    data[item.filed] = item.value
  })

  const res: any = await reqSearch(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.totalSize,
    }
  }
}
</script>

<style></style>
