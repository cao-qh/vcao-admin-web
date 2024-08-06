<template>
  <PageWrapper :breadcrumb="false">
    <SearchForm :formItems="formItems" @search="table.refresh()" />

    <a-space style="margin-bottom: 8px">
      <a-button type="primary" @click="handleAdd">添加</a-button>
      <a-button
        :disabled="!deleteKeys.length"
        type="primary"
        danger
        @click="batchDelete"
      >
        批量删除
      </a-button>
    </a-space>

    <STable
      ref="table"
      :columns="columns"
      row-key="id"
      :row-selection="rowSelection"
      :data="reqData"
      :pageSizeOptions="['10', '20', '30']"
      :scroll="{ y: 'calc(100vh - 400px)' }"
      show-pagination
    >
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a-button
              type="primary"
              size="small"
              title="分配角色"
              @click="handleAssignRoles(row)"
            >
              <template #icon>
                <UserOutlined />
              </template>
              分配角色
            </a-button>
            <a-button
              type="primary"
              size="small"
              title="编辑"
              @click="handleEdit(row)"
            >
              <template #icon>
                <EditOutlined />
              </template>
              编辑
            </a-button>
            <a-popconfirm
              title="是否确认删除?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="deleteUser(row.id)"
            >
              <a-button type="primary" size="small" title="删除SPU" danger>
                <template #icon>
                  <DeleteOutlined />
                </template>
                删除
              </a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </STable>

    <AddOrEdit ref="addOrEdit" @success="table.refresh()" />
    <AssignRoles ref="assignRoles" @success="table?.refresh" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { reqUserInfo, reqRemoveUser, reqSelectUser } from '@/api/acl/user'
import type { User } from '@/api/acl/user/type'
import AddOrEdit from './modules/AddOrEdit.vue'
import AssignRoles from './modules/AssignRoles.vue'
import { message, Modal } from 'ant-design-vue'
import STable from '@/components/STable/index.vue'
import SearchForm from '@/components/SearchForm/index.vue'
import type { FormItems } from '@/components/SearchForm/type'
import type { RequestParams } from '@/api/type'

const formItems = reactive<FormItems>([
  {
    filed: 'username',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名',
    value: '',
  },
])

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '用户名字',
    dataIndex: 'username',
    align: 'center',
  },
  {
    title: '用户名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '用户角色',
    dataIndex: 'roleName',
    align: 'center',
    ellipsis: {
      showTitle: true,
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: '280px',
  },
]

const table = ref()

const reqData = async (page: number, limit: number) => {
  const data: RequestParams = {
    page,
    limit,
  }
  formItems.forEach((item) => {
    data[item.filed] = item.value
  })

  const res = await reqUserInfo(data)
  if (res.code == 200) {
    return {
      data: res.data.records,
      total: res.data.totalSize,
    }
  }
}

const selectionChange = (selectedRowKeys: number[]) => {
  deleteKeys.value = selectedRowKeys
}

const rowSelection = { type: 'checkbox', onChange: selectionChange }

const deleteUser = async (id: number) => {
  const res = await reqRemoveUser(id)
  if (res.code == 200) {
    message.success('删除成功')
    table.value.refresh(true)
  } else {
    message.error('删除失败')
  }
}

const addOrEdit = ref()
const handleAdd = () => {
  addOrEdit.value.show()
}
const handleEdit = (row: User) => {
  addOrEdit.value.show(row)
}

const assignRoles = ref()
const handleAssignRoles = (row: User) => {
  assignRoles.value.show(row)
}

const deleteKeys = ref<number[]>([])

const batchDelete = () => {
  Modal.confirm({
    title: '批量删除',
    content: '确定要删除选中项？',
    async onOk() {
      try {
        const res = await reqSelectUser(deleteKeys.value)
        if (res.code === 200) {
          message.success('删除成功')
          table.value.refresh(true)
          return 'ok'
        } else {
          throw new Error(`删除失败!${res.data}`)
        }
      } catch (error: any) {
        message.error(error.message)
        return 'error'
      }
    },
    onCancel() {},
  })
}
</script>

<style></style>
