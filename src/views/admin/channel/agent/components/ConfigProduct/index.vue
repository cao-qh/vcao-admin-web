<template>
  <div>
    <a-button type="primary" style="margin-bottom: 10px" @click="$emit('back')">
      返回
    </a-button>
    <SearchForm :formItems="formItems" @search="table.refresh()"></SearchForm>

    <STable
      :columns="columns"
      :data="reqData"
      row-key="id"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
    >
      <template #toolbar>
        <a-popconfirm
          :title="`确定要批量配置${selectedRowKeys.toString()}吗？`"
          ok-text="是"
          cancel-text="否"
        >
          <a-button type="primary" @click="handleBatchConfig">
            批量配置
          </a-button>
        </a-popconfirm>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'action'">
          <a-popconfirm title="确定要配置吗？" ok-text="是" cancel-text="否">
            <a>配置</a>
          </a-popconfirm>
        </template>
      </template>
    </STable>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import { reqSearch } from '@/api/table/search/index'

defineOptions({ name: 'ConfigProduct' })

const $emit = defineEmits(['back'])

// 运营商
const operators = [
  {
    value: 1,
    label: '移动',
  },
  {
    value: 2,
    label: '联通',
  },
  {
    value: 3,
    label: '电信',
  },
  {
    value: 4,
    label: '广电',
  },
]

// 结算方式
const settlement = [
  {
    value: 1,
    label: '长期分成',
  },
  {
    value: 2,
    label: 'CPA一口价',
  },
]

const formItems = reactive([
  {
    type: 'input',
    label: '产品名称',
    filed: 'name',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '产品编码',
    filed: 'name',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '运营商',
    filed: 'name',
    value: '',
    placeholder: '请输入',
    options: operators,
    defaultOption: {
      value: '',
      label: '全部',
    },
  },
  {
    type: 'input',
    label: '归属地',
    filed: 'name',
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
    title: '引流图',
    dataIndex: 'zahnghao',
    align: 'center',
  },
  {
    title: '产品名称',
    dataIndex: '创建时间',
    align: 'center',
  },
  {
    title: '结算方式',
    dataIndex: 'qijinyong',
    align: 'center',
  },
  {
    title: '结算周期',
    dataIndex: 'qijinyong',
    align: 'center',
  },
  {
    title: '结算价格',
    dataIndex: 'qijinyong',
    align: 'center',
  },
  {
    title: '销售权限',
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

const selectedRowKeys = ref<any>([])

const onSelectChange = (sRowKeys: any) => {
  selectedRowKeys.value = sRowKeys
}

const handleBatchConfig = () => {}
</script>

<style></style>
