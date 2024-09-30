<template>
  <PageWrapper>
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
        <a-button type="primary">添加</a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'qijinyong'">
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
          <a>修改</a>
          <a-divider type="vertical" />
          <a>权限配置</a>
        </template>
      </template>
    </STable>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { reqSearch, reqQijinyong } from '@/api/table/search/index'
import { STable } from '@/components/STable'
import { message } from 'ant-design-vue'

const formItems = reactive([
  {
    type: 'input',
    label: '账户',
    filed: 'phone',
    value: '',
    placeholder: '请输入',
  },
])

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
    title: '昵称',
    dataIndex: 'nicheng',
    align: 'center',
  },

  {
    title: '电话',
    dataIndex: 'dianhua',
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

const table = ref()

const reqData = async (page: number, limit: number) => {
  const data: any = {
    page: page,
    size: limit,
    staticTime: '',
    endTime: '',
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
</script>

<style></style>
