<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()" />
    <STable ref="table" :columns="columns" :data="reqData">
      <template #toolbar>
        <a-button type="primary" @click="add.show()">添加</a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'action'">
          <a @click="update.show(row)">修改</a>
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
import { reqSearch } from '@/api/table/search/index'
import Add from './modules/Add.vue'
import Update from './modules/Update.vue'

const formItems = reactive([
  {
    type: 'input',
    label: '模板名',
    filed: 'mobanming',
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
    title: '模板名',
    dataIndex: '模板名',
    align: 'center',
  },
  {
    title: '参数',
    dataIndex: '参数',
    align: 'center',
  },
  {
    title: '接口模板',
    dataIndex: '接口模板',
    align: 'center',
  },
  {
    title: '接口模板备注',
    dataIndex: '接口模板备注',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
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

const add = ref()
const update = ref()
</script>

<style></style>
