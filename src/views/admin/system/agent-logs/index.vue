<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()" />
    <STable ref="table" :columns="columns" :data="reqData"></STable>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import { reqSearch } from '@/api/table/search/index'
import dayjs from 'dayjs'

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
    label: '详情',
    filed: '详情',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '账户',
    filed: '账户',
    value: '',
    placeholder: '请输入',
  },
])

const table = ref()
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '账号',
    dataIndex: '账号',
    align: 'center',
  },
  {
    title: '类型',
    dataIndex: '类型',
    align: 'center',
  },
  {
    title: '类别',
    dataIndex: '类别',
    align: 'center',
  },
  {
    title: '操作详情',
    dataIndex: '操作详情',
    align: 'center',
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: '创建时间',
    align: 'center',
  },
]

const reqData = async (page: number, limit: number) => {
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
</script>

<style></style>
