<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()"></SearchForm>

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
          v-has="'Btn.MemberOrder.Add'"
          type="primary"
          @click="() => add.show()"
        >
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'sxj'">
          <a-popconfirm
            v-if="userStore.hasPermission('Swh.MemberOrder.UpDown')"
            title="确定要修改吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="handleUpDown(row)"
          >
            <a-switch :checked="row.sxj === 1" />
          </a-popconfirm>
          <span v-else>
            {{ row.sxj === 1 ? '上架' : '下架' }}
          </span>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a v-has="'Btn.MemberOrder.Update'" @click="() => edit.show(row)">
            修改
          </a>
        </template>
      </template>
    </STable>

    <Add ref="add" @success="table.refresh()" />

    <Edit ref="edit" @success="table.refresh()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import { reqSearch, reqQijinyong } from '@/api/table/search/index'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import { message } from 'ant-design-vue'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()

// 上下架
const upDown: any = [
  {
    value: 1,
    label: '上架',
  },
  {
    value: 2,
    label: '下架',
  },
]

const formItems = reactive([
  {
    type: 'input',
    label: '时长',
    filed: 'sc',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '上下架',
    filed: 'upDown',
    value: '',
    placeholder: '请选择',
    options: upDown,
    defaultOption: {
      label: '全部',
      value: '',
    },
  },
])

const columns = [
  {
    title: '图片',
    dataIndex: 'tp',
    align: 'center',
  },
  {
    title: '时长',
    dataIndex: 'sc',
    align: 'center',
  },
  {
    title: '原价',
    dataIndex: 'yj',
    align: 'center',
  },
  {
    title: '优惠价',
    dataIndex: 'yhj',
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
    width: '100px',
    align: 'center',
  },
]

const reqData = async (currentPage: number, pageSize: number) => {
  const data: any = {
    currentPage,
    pageSize,
  }

  const res: any = await reqSearch(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.total,
    }
  }
}

// 上下架
const handleUpDown = async (row: any) => {
  const result = await reqQijinyong({
    id: row.id,
    qijinyong: row.qijinyong === 1 ? 2 : 1,
  })
  if (result.code == 0) {
    message.success(result.msg)
  } else {
    message.error(result.msg)
  }
}

const table = ref()
// 添加记录
const add = ref()
// 修改
const edit = ref()
</script>

<style></style>
