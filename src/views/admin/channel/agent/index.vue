<template>
  <PageWrapper>
    <div v-if="!isConfigProduct.show">
      <SearchForm :formItems="formItems" @search="table.refresh()"></SearchForm>

      <STable
        ref="table"
        :columns="columns"
        :data="reqData"
        :show-pagination="true"
      >
        <template #toolbar>
          <a-button v-has="'Btn.Agent.Add'" type="primary" @click="add.show()">
            添加
          </a-button>
        </template>
        <template #bodyCell="{ column, row }">
          <template v-if="column.dataIndex === 'action'">
            <a v-has="'Btn.Agent.Update'" @click="update.show(row)">修改</a>
            <a-divider type="vertical" />
            <a v-has="'Btn.Agent.Config'" @click="handleConfigProduct(row)">
              产品配置
            </a>
          </template>
        </template>
      </STable>

      <Add ref="add" @success="table.refresh()" />

      <Update ref="update" @success="table.refresh()" />
    </div>

    <ConfigProduct
      v-else
      :DLbianma="isConfigProduct.DLbianma"
      @back="isConfigProduct.show = false"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import { reqSearch } from '@/api/admin/channel/agent'
import Add from './modules/Add.vue'
import Update from './modules/Update.vue'
import ConfigProduct from './components/ConfigProduct/index.vue'

const qijinyong = [
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
    label: '手机号',
    filed: 'shoujihao',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '状态',
    filed: 'status',
    value: null,
    placeholder: '请选择',
    options: qijinyong,
    defaultOption: {
      value: '',
      label: '全部',
    },
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
    title: '手机号',
    dataIndex: 'shoujihao',
    align: 'center',
  },
  {
    title: '启禁用',
    dataIndex: 'qijinyong',
    align: 'center',
    customRender: ({ text }: { text: any }) => {
      const item: any = qijinyong.find((item) => item.value === text)
      return item ? item.label : ''
    },
  },
  {
    title: '创建时间',
    dataIndex: 'chuangjianshijian',
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
      total: res.data.totalSize,
    }
  }
}

const add = ref()
const update = ref()
const isConfigProduct = reactive({
  show: false,
  DLbianma: '',
})

const handleConfigProduct = (row: any) => {
  isConfigProduct.DLbianma = row.bianma
  isConfigProduct.show = true
}
</script>

<style></style>
