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
  name: 'AdwatchOrOrderRecord',
})

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
    label: '订单号',
    filed: 'ddh',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '会员名称',
    filed: 'hymc',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      value: '',
      label: '全部',
    },
    options: [],
  },
  {
    type: 'input',
    label: '有效数据',
    filed: 'yxsj',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '广告名称',
    filed: 'ggmc',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      value: '',
      label: '全部',
    },
    options: [],
  },
])

const columns = [
  {
    title: '会员名称',
    dataIndex: 'hymc',
    align: 'center',
  },
  {
    title: '广告名称',
    dataIndex: 'ggmc',
    align: 'center',
  },
  {
    title: '订单号',
    dataIndex: 'ddh',
    align: 'center',
  },
  {
    title: '上级落地页返回状态',
    dataIndex: 'sldlyfhzt',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'cjsj',
    align: 'center',
  },
  {
    title: '结束时间',
    dataIndex: 'jssj',
    align: 'center',
  },
  {
    title: '有效数据',
    dataIndex: 'yxsj',
    align: 'center',
  },
  {
    title: '观看时长',
    dataIndex: 'gksc',
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
