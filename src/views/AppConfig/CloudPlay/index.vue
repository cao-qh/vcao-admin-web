<template>
  <PageWrapper>
    <SearchForm
      ref="searchForm"
      :formItems="formItems"
      @search="table.refresh()"
    ></SearchForm>

    <STable
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="reqData"
      :showPagination="true"
      :scroll="{ y: 'calc(100vh - 450px)' }"
    >
      <template #toolbar>
        <a-button
          v-has="'Btn.CloudPlay.Add'"
          type="primary"
          @click="() => add.show()"
        >
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'action'">
          <a
            v-has="'Btn.CloudPlay.UpdateParams'"
            @click="() => editParams.show(row)"
          >
            修改参数
          </a>
        </template>
      </template>
    </STable>

    <Add ref="add" :cloudPlaform="cloudPlaform" @success="table.refresh()" />

    <EditParams
      ref="editParams"
      :cloudPlaform="cloudPlaform"
      @success="table.refresh()"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import { reqSearch } from '@/api/AppConfig/CloudPlay'
import Add from './modules/Add.vue'
import EditParams from './modules/EditParams.vue'

// 云点播方式
const cloudPlaform: any = [
  {
    value: 1,
    label: '腾讯',
  },
  {
    value: 2,
    label: '阿里',
  },
  {
    value: 3,
    label: '百度',
  },
  {
    value: 4,
    label: '自己',
  },
]

const formItems = reactive([
  {
    type: 'select',
    label: '云点播方式',
    field: 'yundianbofangshi',
    value: null,
    placeholder: '请选择',
    options: cloudPlaform,
  },
])

const columns = [
  {
    title: '云点播方式',
    dataIndex: 'yundianbofangshi',
    align: 'center',
    customRender: ({ text }: any) => {
      const item = cloudPlaform.find((item: any) => item.value == text)
      return item?.label
    },
  },
  {
    title: '云点播参数',
    dataIndex: 'yundianbocanshu',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '120px',
    align: 'center',
  },
]

const reqData = async (currentPage: number, pageSize: number) => {
  const data: any = {
    currentPage,
    pageSize,
    ...searchForm.value.getFormValues(),
  }

  const res: any = await reqSearch(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.total,
    }
  }
}

const searchForm = ref()
const table = ref()
// 添加记录
const add = ref()
// 修改
const editParams = ref()
</script>

<style></style>
