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
        <a-button
          v-has="'Btn.UserManager.Add'"
          type="primary"
          @click="() => add.show()"
        >
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'qijinyong'">
          <a-popconfirm
            v-if="userStore.hasButton('Swh.UserManager.Enable')"
            title="确定要修改吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="handelQijinyong(row)"
          >
            <a-switch :checked="row.qijinyong === 1" />
          </a-popconfirm>
          <span v-else>
            {{ qijinyong.find((item) => item.value === row.qijinyong)?.label }}
          </span>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a v-has="'Btn.UserManager.Update'" @click="() => edit.show(row)">
            修改
          </a>
          <a-divider type="vertical" />
          <a
            v-has="'Btn.UserManager.Permission'"
            @click="() => permission.show(row)"
          >
            权限配置
          </a>
        </template>
      </template>
    </STable>

    <Add ref="add" :qijinyong="qijinyong" @success="table.refresh()" />
    <Edit ref="edit" @success="table.refresh()" />
    <Permission ref="permission" @success="table.refresh()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { reqSearch, reqEnable } from '@/api/PeopleManager/UserManager'
import { STable } from '@/components/STable'
import { message } from 'ant-design-vue'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import Permission from './modules/Permission.vue'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()

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
    label: '账户/手机号',
    field: 'shoujihao',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '姓名',
    field: 'xingming',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '启禁用',
    field: 'qijinyong',
    value: 1,
    placeholder: '请输入',
    options: qijinyong,
  },
])

const columns = [
  {
    title: '账户/手机号',
    dataIndex: 'shoujihao',
    align: 'center',
  },
  {
    title: '姓名',
    dataIndex: 'xingming',
    align: 'center',
  },
  {
    title: '邮箱',
    dataIndex: 'youxiang',
    align: 'center',
  },
  {
    title: '登录IP',
    dataIndex: 'ip',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'chuangjianshijian',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'gengxinshijian',
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
      data[item.field] = item.value
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
  const result = await reqEnable({
    shoujihao: row.shoujihao,
    qijinyong: row.qijinyong === 1 ? 2 : 1,
  })
  if (result.code == 0) {
    message.success(result.msg)
    table.value.refresh()
  } else {
    message.error(result.msg)
  }
}

const add = ref()
const edit = ref()
const permission = ref()
</script>

<style></style>
