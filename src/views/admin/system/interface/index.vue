<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()" />
    <STable
      ref="table"
      :columns="columns"
      :data="reqData"
      :showPagination="true"
    >
      <template #toolbar>
        <a-button
          v-has="'Btn.Interface.Add'"
          type="primary"
          @click="add.show()"
        >
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'action'">
          <a v-has="'Btn.Interface.Update'" @click="update.show(row)">修改</a>
        </template>
      </template>
    </STable>

    <Add ref="add" @success="table.refresh()" />
    <Update ref="update" @success="table.refresh()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import { reqSearch } from '@/api/admin/system/interface'
import Add from './modules/Add.vue'
import Update from './modules/Update.vue'

const formItems = reactive([
  {
    type: 'input',
    label: '接口编码',
    filed: 'jiekouBianma',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '接口名称',
    filed: 'jiekouMingcheng',
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
    title: '接口编码',
    dataIndex: 'jiekouBianma',
    align: 'center',
  },
  {
    title: '接口名称',
    dataIndex: 'jiekouMingcheng',
    align: 'center',
  },
  {
    title: '中文参数',
    dataIndex: 'zhongwen',
    align: 'center',
  },
  {
    title: '英文参数',
    dataIndex: 'yingwen',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'beizhu',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
  },
]

const reqData = async (currentPage: number, pageSize: number) => {
  const data: any = {
    currentPage,
    pageSize,
  }
  formItems.forEach((item) => {
    if (item.value) {
      data[item.filed] = item.value
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

const add = ref()
const update = ref()
</script>

<style></style>
