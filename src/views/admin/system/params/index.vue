<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()" />
    <STable ref="table" :columns="columns" :data="reqData">
      <template #toolbar>
        <a-button v-has="'Btn.Params.Add'" type="primary" @click="add.show()">
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'qijinyong'">
          <a-popconfirm
            v-if="userStore.hasPermission('Switch.Params.Enable')"
            title="确定要修改吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="handelQijinyong(row)"
          >
            <a-switch :checked="row.qijinyong === 1" />
          </a-popconfirm>
          <span v-else>
            {{ row.qijinyong === 1 ? '启用' : '禁用' }}
          </span>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a v-has="'Btn.Params.Update'" @click="update.show(row)">
            修改参数模板
          </a>
          <a-divider type="vertical" />
          <a v-has="'Btn.Params.UpdateJson'" @click="updateJson.show(row)">
            修改json数据
          </a>
        </template>
      </template>
    </STable>

    <Add ref="add" @success="table.refresh()" />

    <Update ref="update" @success="table.refresh()" />

    <UpdateJson ref="updateJson" @success="table.refresh()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import { reqSearch, reqQijinyong } from '@/api/admin/system/params'
import Add from './modules/Add.vue'
import Update from './modules/Update.vue'
import UpdateJson from './modules/UpdateJson.vue'
import { message } from 'ant-design-vue'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()

const formItems = reactive([
  {
    type: 'input',
    label: '接口编码',
    filed: 'jiekouBianma',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '参数编码',
    filed: 'canshuBianma',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '参数名称',
    filed: 'canshuMingcheng',
    value: '',
    placeholder: '请输入',
  },
])

const table = ref()
const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '参数编码',
    dataIndex: 'canshuBianma',
    align: 'center',
  },
  {
    title: '参数名称',
    dataIndex: 'canshuMingcheng',
    align: 'center',
  },
  {
    title: '中英文参数',
    dataIndex: 'canshuZhongyingwen',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'canshuBeizhu',
    align: 'center',
  },
  {
    title: '接口编码',
    dataIndex: 'jiekouBianma',
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
  const result: any = await reqQijinyong({
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

const add = ref()
const update = ref()
const updateJson = ref()
</script>

<style></style>
