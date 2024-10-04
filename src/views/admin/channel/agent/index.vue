<template>
  <PageWrapper>
    <div v-if="!isConfigProduct">
      <SearchForm :formItems="formItems" @search="table.refresh()"></SearchForm>

      <STable :columns="columns" :data="reqData">
        <template #toolbar>
          <a-button type="primary" @click="add.show()">添加</a-button>
        </template>
        <template #bodyCell="{ column, row }">
          <template v-if="column.dataIndex === 'action'">
            <a @click="update.show(row)">编辑</a>
            <a-divider type="vertical" />
            <a @click="() => (isConfigProduct = true)">产品配置</a>
          </template>
        </template>
      </STable>

      <Add ref="add" @success="table.refresh()" />

      <Update ref="update" @success="table.refresh()" />
    </div>

    <ConfigProduct v-else @back="isConfigProduct = false" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import { reqSearch } from '@/api/table/search/index'
import Add from './modules/Add.vue'
import Update from './modules/Update.vue'
import ConfigProduct from './components/ConfigProduct/index.vue'

const status = [
  {
    value: 1,
    label: '启用',
  },
  {
    value: 2,
    label: '禁用',
  },
]

const formItems = reactive([
  {
    type: 'input',
    label: '代理账户',
    filed: 'name',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '状态',
    filed: 'status',
    value: null,
    placeholder: '请选择',
    options: status,
    defaultOption: {
      value: '',
      label: '全部',
    },
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
    dataIndex: 'zahnghao',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: '创建时间',
    align: 'center',
  },
  {
    title: '启禁用',
    dataIndex: 'qijinyong',
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
const isConfigProduct = ref(false)
</script>

<style></style>
