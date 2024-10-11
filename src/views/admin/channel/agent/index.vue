<template>
  <PageWrapper>
    <div v-if="!isConfigProduct.show">
      <SearchForm :formItems="formItems" @search="table.refresh()"></SearchForm>

      <STable
        ref="table"
        :columns="columns"
        :data="reqData"
        :show-pagination="true"
      >
        <template #toolbar>
          <a-button v-has="'Btn.Agent.Add'" type="primary" @click="add.show()">
            添加
          </a-button>
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
            <a v-has="'Btn.Agent.UpdateAPI'" @click="updateAPI.show(row)">
              修改API
            </a>
            <a-divider type="vertical" />
            <a v-has="'Btn.Agent.Update'" @click="update.show(row)">资料卡</a>
            <a-divider type="vertical" />
            <a v-has="'Btn.Agent.Config'" @click="handleConfigProduct(row)">
              产品配置
            </a>
          </template>
        </template>
      </STable>

      <Add ref="add" @success="table.refresh()" />

      <Update ref="update" @success="table.refresh()" />
    </div>

    <ConfigProduct
      v-else
      :DLbianma="isConfigProduct.DLbianma"
      @back="isConfigProduct.show = false"
    />

    <UpdateAPI ref="updateAPI" @success="table.refresh()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import { reqSearch, reqQijinyong } from '@/api/admin/channel/agent'
import Add from './modules/Add.vue'
import Update from './modules/Update.vue'
import ConfigProduct from './components/ConfigProduct/index.vue'
import { message } from 'ant-design-vue'
import UpdateAPI from './modules/UpdateAPI.vue'

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
    label: '代理账户',
    filed: 'shoujihao',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '状态',
    filed: 'qijinyong',
    value: null,
    placeholder: '请选择',
    options: qijinyong,
    defaultOption: {
      value: '',
      label: '全部',
    },
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
    title: '代理账户',
    dataIndex: 'shoujihao',
    align: 'center',
  },
  {
    title: '代理名称',
    dataIndex: 'mingcheng',
    align: 'center',
  },
  {
    title: '手机号',
    dataIndex: 'shoujihao',
    align: 'center',
  },
  {
    title: '邮箱',
    dataIndex: 'youxiang',
    align: 'center',
  },
  {
    title: '禁用IP',
    dataIndex: 'youxiang',
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'beizhu',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'chuangjianshijian',
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
      total: res.data.totalSize,
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

const add = ref()
const update = ref()
const isConfigProduct = reactive({
  show: false,
  DLbianma: '',
})

const handleConfigProduct = (row: any) => {
  isConfigProduct.DLbianma = row.bianma
  isConfigProduct.show = true
}

const updateAPI = ref()
</script>

<style></style>
