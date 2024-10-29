<template>
  <div>
    <a-button type="primary" @click="$emit('back')" style="margin-bottom: 10px">
      返回
    </a-button>

    <SearchForm :formItems="formItems" @search="table.refresh()"></SearchForm>

    <STable
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="reqData"
      :showPagination="true"
      :scroll="{ y: 'calc(100vh - 408px)' }"
    >
      <template #toolbar>
        <a-button type="primary" @click="() => add.show()">添加</a-button>
        <a-button type="primary" @click="() => batchImport.show()">
          批量添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'sxj'">
          <a-popconfirm
            title="确定要修改吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="handelQijinyong(row)"
          >
            <a-switch :checked="row.qijinyong === 1" />
          </a-popconfirm>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a @click="() => edit.show(row)">修改</a>

          <span>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确定删除吗？"
              ok-text="是"
              cancel-text="否"
              @confirm="handleSubmit(row.dingdanhao)"
            >
              <a>删除</a>
            </a-popconfirm>
          </span>
        </template>
      </template>
    </STable>

    <Add ref="add" :shangxiajia="shangxiajia" @success="table.refresh()" />

    <Edit ref="edit" @success="table.refresh()" />

    <BatchImport ref="batchImport" @success="table.refresh()" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import { reqSearch, reqQijinyong, reqSubmit } from '@/api/table/search/index'
import { message } from 'ant-design-vue'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import BatchImport from './modules/BatchImport.vue'

defineEmits(['back'])

const props = defineProps({
  shangxiajia: {
    type: Array<any>,
    default: () => [],
  },
})

const formItems = reactive([
  {
    type: 'input',
    label: '合集编码',
    filed: 'hjbm',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '章节名称',
    filed: 'zjmc',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '上下架',
    filed: 'shangxiajia',
    value: '',
    placeholder: '请输入',
    options: props.shangxiajia,
    defaultOption: {
      value: '',
      label: '全部',
    },
  },
])

const columns = [
  {
    title: '编码',
    dataIndex: 'bm',
    align: 'center',
  },
  {
    title: '视频章节名称',
    dataIndex: 'spzjmc',
    align: 'center',
  },
  {
    title: '缩略图',
    dataIndex: 'slt',
    align: 'center',
  },
  {
    title: '视频链接',
    dataIndex: 'spls',
    align: 'center',
  },
  {
    title: '普通价格',
    dataIndex: 'ptjg',
    align: 'center',
  },
  {
    title: '会员价格',
    dataIndex: 'hyjg',
    align: 'center',
  },
  {
    title: '权重',
    dataIndex: 'qz',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'cjsj',
    align: 'center',
  },
  {
    title: '上下架',
    dataIndex: 'sxj',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: 100,
    fixed: 'right',
  },
]

const table = ref()
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

// 启禁用
const handelQijinyong = async (row: any) => {
  const result = await reqQijinyong({
    id: row.id,
    qijinyong: row.qijinyong === 1 ? 2 : 1,
  })
  if (result.code == 0) {
    message.success(result.msg)
    table.value.refresh()
  } else {
    message.error(result.msg)
  }
}

// 提单
const handleSubmit = async (dingdanhao: string) => {
  const res = await reqSubmit(dingdanhao)
  if (res.code == 0) {
    message.success(res.msg)
  } else {
    message.error(res.msg)
  }
}

const add = ref()
const edit = ref()
const batchImport = ref()
</script>

<style></style>
