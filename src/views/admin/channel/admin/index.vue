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
        <a-button type="primary" @click="() => add.show()">添加</a-button>
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
          <a @click="() => update.show(row)">修改</a>
          <a-divider type="vertical" />
          <a @click="() => permission.show(row)">权限配置</a>
        </template>
      </template>
    </STable>

    <Add ref="add" @success="table.refresh()" />
    <Update ref="update" @success="table.refresh()" />
    <Permission ref="permission" @success="table.refresh()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { reqSearch, reqQijinyong } from '@/api/admin/channel/admin'
import { STable } from '@/components/STable'
import { message } from 'ant-design-vue'
import Add from './modules/Add.vue'
import Update from './modules/Update.vue'
import Permission from './modules/Permission.vue'

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
    dataIndex: 'mingcheng',
    align: 'center',
  },

  {
    title: '电话',
    dataIndex: 'shoujihao',
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
  } else {
    message.error(result.msg)
  }
}

const add = ref()
const update = ref()
const permission = ref()
</script>

<style></style>
