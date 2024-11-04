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

defineOptions({
  name: 'MemberBuyRecord',
})

const formItems = reactive([
  {
    type: 'select',
    label: '视频合集编码',
    field: 'sphjbm',
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
    label: '会员名称',
    field: 'hymc',
    value: '',
    placeholder: '请输入',
  },
])

const columns = [
  {
    title: '会员名称',
    dataIndex: 'hymc',
    align: 'center',
  },
  {
    title: '视频合集名',
    dataIndex: 'sphjm',
    align: 'center',
  },
  {
    title: '视频章节名',
    dataIndex: 'spzjm',
    align: 'center',
  },
  {
    title: '购剧时间',
    dataIndex: 'gjsj',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'gxsj',
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
    data[item.field] = item.value
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
