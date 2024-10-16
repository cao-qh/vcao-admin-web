<template>
  <a-space style="margin-bottom: 8px">
    <slot name="toolbar" :dataSource="dataSource"></slot>
  </a-space>
  <a-table
    bordered
    :columns="columns"
    :row-key="rowKey"
    :row-selection="
      rowSelection ? Object.assign(innerRowSelection, rowSelection) : null
    "
    :pagination="showPagination ? pagination : false"
    :data-source="dataSource"
    :scroll="Object.assign(innerScroll, scroll)"
    :defaultExpandedRowKeys="defaultExpandedRowKeys"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, record }">
      <slot name="bodyCell" :column="column" :row="record"></slot>
    </template>
    <template #summary>
      <slot name="summary"></slot>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import type { STableProps } from './type'

defineOptions({ name: 'STable' })

const props = withDefaults(defineProps<STableProps>(), {
  columns: () => [],
  data: () => [],
  loadData: true,
  pageSizeOptions: () => ['10', '20', '30'],
  showPagination: false,
})

const dataSource = ref([])

// 内部表格滚动属性
const innerScroll = reactive({
  x: '1000px',
})

// 分页器对象
const pagination = reactive({
  pageSize: Number(props.pageSizeOptions[0]),
  total: 0,
  pageSizeOptions: props.pageSizeOptions,
  current: 1,
  showSizeChanger: true,
  showTotal: (total: number) => `共 ${total} 条`,
})

onMounted(() => {
  props.loadData && getData()
})

const getData = async () => {
  const dataObj = await props.data(pagination.current, pagination.pageSize)

  if (dataObj) {
    const { data, total } = dataObj
    dataSource.value = data
    pagination.total = total
  }
}

// 处理表格变化
const handleTableChange = (pag: any) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  getData()
}

// 处理表格刷新
const refresh = (reset: boolean) => {
  if (reset) pagination.current = 1
  getData()
}

const innerOnSelectChange = (selectedRowkeys: Key[]) => {
  innerSelectRowKeys.value = Array.from(
    new Set(innerSelectRowKeys.value.concat(selectedRowkeys)),
  )
}
const innerOnSelectSelect = (record: any, selected: boolean) => {
  if (!selected) {
    const startIndex = innerSelectRowKeys.value.indexOf(
      record[props.rowKey as string],
    )
    if (startIndex > -1) {
      innerSelectRowKeys.value.splice(startIndex, 1)
    }
  }
}
const innerOnSelectAll = (
  selected: boolean,
  selectedRows: any,
  changeRows: any,
) => {
  if (!selected) {
    for (let i = 0; i < changeRows.length; i++) {
      const row = changeRows[i]
      const index = innerSelectRowKeys.value.indexOf(
        row[props.rowKey as string],
      )
      if (index > -1) {
        innerSelectRowKeys.value.splice(index, 1)
      }
    }
  }
}

// 组件内的rowSelection对象
type Key = string | number
const innerSelectRowKeys = ref<Key[]>([])
const innerRowSelection = ref({
  selectedRowKeys: innerSelectRowKeys,
  onChange: innerOnSelectChange,
  onSelect: innerOnSelectSelect,
  onSelectAll: innerOnSelectAll,
})

defineExpose({
  refresh,
  pagination,
})
</script>

<style></style>
