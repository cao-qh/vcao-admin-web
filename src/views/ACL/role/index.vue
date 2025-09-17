<template>
  <PageWrapper>
    <SearchForm
      :formItems="formItems"
      :searchLoading="searchLoading"
      @search="table.refresh()"
    />

    <a-space style="margin-bottom: 8px">
      <a-button type="primary" @click="handleAdd">添加职位</a-button>
    </a-space>

    <STable
      ref="table"
      row-key="id"
      :columns="columns"
      :data="reqData"
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
              @click="handleAssignPermission(row)"
            >
              <template #icon>
                <UserOutlined />
              </template>
              分配权限
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
              @confirm="deleteRole(row.id)"
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
    <AssignPermission ref="assignPermission" @success="table.refresh()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { reqAllRoleList, reqRemoveRole } from '@/api/acl/role'
import type { RoleData } from '@/api/acl/role/type'
import AddOrEdit from './modules/AddOrEdit.vue'
import AssignPermission from './modules/AssignPermission.vue'
import { message } from 'ant-design-vue'
import SearchForm from '@/components/SearchForm/index.vue'
import type { FormItems } from '@/components/SearchForm/type'
import STable from '@/components/STable/index.vue'
import type { RequestParams } from '@/api/type'

const formItems = reactive<FormItems>([
  {
    field: 'roleName',
    label: '职位搜索',
    type: 'input',
    placeholder: '请输入职位名称',
    value: '',
  },
])
const searchLoading = ref(false)

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '角色名称',
    dataIndex: 'roleName',
    align: 'center',
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
    data[item.field] = item.value
  })

  searchLoading.value = true
  const res = await reqAllRoleList(data)
  searchLoading.value = false

  if (res.code === 200) {
    return {
      data: res.data.records,
      total: res.data.total,
    }
  }
}

const addOrEdit = ref()
const handleAdd = () => {
  addOrEdit.value.show()
}

const handleEdit = (row: RoleData) => {
  addOrEdit.value.show(row)
}

const assignPermission = ref()
const handleAssignPermission = (row: RoleData) => {
  assignPermission.value.show(row)
}

const deleteRole = async (id: number) => {
  const res = await reqRemoveRole(id)
  if (res.code === 200) {
    message.success('删除成功')
    table.value.refresh(true)
  } else {
    message.error('删除失败')
  }
}
</script>
