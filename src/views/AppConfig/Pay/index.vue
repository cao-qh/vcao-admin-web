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
      :scroll="{ y: 'calc(100vh - 420px)' }"
    >
      <template #toolbar>
        <a-button
          v-has="'Btn.Pay.Add'"
          type="primary"
          @click="() => add.show()"
        >
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'action'">
          <a v-has="'Btn.Pay.UpdateParams'" @click="() => editParams.show(row)">
            修改参数
          </a>
        </template>
      </template>
    </STable>

    <Add ref="add" :payType="payType" @success="table.refresh()" />

    <EditParams
      ref="editParams"
      :payType="payType"
      @success="table.refresh()"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import { reqSearch } from '@/api/AppConfig/Pay'
import Add from './modules/Add.vue'
import EditParams from './modules/EditParams.vue'

// 支付方式
const payType: any = [
  {
    value: 1,
    label: '微信小程序',
  },
  {
    value: 2,
    label: 'H5',
  },
  {
    value: 3,
    label: '公众号',
  },
  {
    value: 4,
    label: '支付宝',
  },
  {
    value: 5,
    label: '做任务',
  },
]

const formItems = reactive([
  {
    type: 'select',
    label: '支付方式',
    field: 'payType',
    value: '',
    placeholder: '请选择',
    options: payType,
    defaultOption: {
      label: '全部',
      value: '',
    },
  },
])

const columns = [
  {
    title: '支付方式',
    dataIndex: 'zhifenfangshi',
    align: 'center',
    customRender: ({ text }: any) => {
      const item = payType.find((item: any) => item.value == text)
      return item?.label
    },
  },
  {
    title: '支付参数',
    dataIndex: 'zhifucanshu',
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
