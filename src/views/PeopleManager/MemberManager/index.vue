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
          v-has="'Btn.HomeSetting.Add'"
          type="primary"
          @click="() => add.show()"
        >
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'qjy'">
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
          <a v-has="'Btn.HomeSetting.Update'" @click="() => edit.show(row)">
            修改
          </a>
        </template>
      </template>
    </STable>

    <Add ref="add" :qijinyong="qijinyong" @success="table.refresh()" />

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

// 启禁用
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
    filed: 'sjh',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '名称',
    filed: 'mc',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '启禁用',
    filed: 'qijinyong',
    value: '',
    placeholder: '请选择',
    options: qijinyong,
    defaultOption: {
      label: '全部',
      value: '',
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
    title: '账户/手机号',
    dataIndex: 'sjh',
    align: 'center',
  },
  {
    title: '名称',
    dataIndex: 'mc',
    align: 'center',
  },
  {
    title: '微信OpenID',
    dataIndex: 'wx',
    align: 'center',
  },
  {
    title: '会员价',
    dataIndex: 'hyj',
    align: 'center',
  },
  {
    title: '抖音OpenID',
    dataIndex: 'dy',
    align: 'center',
  },
  {
    title: '头像',
    dataIndex: 'tx',
    align: 'center',
  },
  {
    title: '会员',
    dataIndex: 'hy',
    align: 'center',
  },
  {
    title: '登录IP',
    dataIndex: 'dlip',
    align: 'center',
  },
  {
    title: '会员到期时间',
    dataIndex: 'dqsj',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'cjsh',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'gxsj',
    align: 'center',
  },
  {
    title: '启禁用',
    dataIndex: 'qjy',
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

// 启禁用
const handelQijinyong = async (row: any) => {
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
