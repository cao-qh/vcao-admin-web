<template>
  <PageWrapper>
    <SearchForm
      ref="searchForm"
      :formItems="formItems"
      @search="table.refresh()"
    ></SearchForm>

    <STable
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="reqData"
      :showPagination="true"
      :scroll="{ x: 1600, y: 'calc(100vh - 430px)' }"
    >
      <template #toolbar>
        <a-button
          v-has="'Btn.MemberManager.Add'"
          type="primary"
          @click="() => add.show()"
        >
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'openid'">
          <MultipartTableCell>
            <template #label>
              <div>抖音：</div>
              <div>微信：</div>
            </template>
            <template #value>
              <div>{{ row.dyopenid }}</div>
              <div>{{ row.wxopenid }}</div>
            </template>
          </MultipartTableCell>
        </template>
        <template v-if="column.dataIndex === 'touxiang'">
          <a-image :width="50" :src="baseUrl + row.touxiang" />
        </template>
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
          <a v-has="'Btn.MemberManager.Update'" @click="() => edit.show(row)">
            修改
          </a>
          <!-- <div v-has="'Btn.MemberManager.Order'">
            <a-divider type="vertical" />
            <a @click="order.show(row)">订购</a>
          </div> -->
          <div v-has="'Btn.MemberManager.Balance'">
            <a-divider type="vertical" />
            <a @click="balance.show(row)">充值余额</a>
          </div>
          <div v-has="'Btn.MemberManager.Score'">
            <a-divider type="vertical" />
            <a @click="score.show(row)">新增积分</a>
          </div>
        </template>
      </template>
    </STable>

    <Add ref="add" :qijinyong="qijinyong" @success="table.refresh()" />

    <Edit ref="edit" @success="table.refresh()" />

    <Order ref="order" @success="table.refresh()" />

    <Balance ref="balance" @success="table.refresh()" />

    <Score ref="score" @success="table.refresh()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable, MultipartTableCell } from '@/components/STable'
import { reqSearch, reqEnable } from '@/api/PeopleManager/MemberManager'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import Order from './modules/Order.vue'
import Balance from './modules/Balance.vue'
import Score from './modules/Score.vue'
import { message } from 'ant-design-vue'

const baseUrl = import.meta.env.VITE_SERVE

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
    field: 'zhanghu',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '名称',
    field: 'mingcheng',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '启禁用',
    field: 'qijinyong',
    value: 1,
    placeholder: '请选择',
    options: qijinyong,
  },
])

const columns = [
  {
    title: '账户/手机号',
    dataIndex: 'zhanghu',
    align: 'center',
  },
  {
    title: '名称',
    dataIndex: 'mingcheng',
    align: 'center',
  },
  {
    title: '编码',
    dataIndex: 'bianma',
    align: 'center',
  },
  {
    title: '头像',
    dataIndex: 'touxiang',
    align: 'center',
  },
  {
    title: 'OpenID',
    dataIndex: 'openid',
    align: 'center',
  },
  {
    title: '会员等级',
    dataIndex: 'huiyuandengji',
    align: 'center',
  },
  {
    title: '余额',
    dataIndex: 'yue',
    align: 'center',
  },
  {
    title: '积分',
    dataIndex: 'jifen',
    align: 'center',
  },
  {
    title: '会员到期时间',
    dataIndex: 'huiyuandaoqishijian',
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
    title: '登录IP',
    dataIndex: 'dengluip',
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
    width: '150px',
    align: 'center',
  },
]

const reqData = async (currentPage: number, pageSize: number) => {
  const data: any = {
    currentPage,
    pageSize,
    ...searchForm.value.getFormValues(),
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
  const result = await reqEnable({
    bianma: row.bianma,
    qijinyong: row.qijinyong === 1 ? 2 : 1,
  })
  if (result.code == 0) {
    message.success(result.msg)
    table.value.refresh()
  } else {
    message.error(result.msg)
  }
}

const searchForm = ref()
const table = ref()
// 添加记录
const add = ref()
// 修改
const edit = ref()
// 订购
const order = ref()
// 余额
const balance = ref()
// 积分
const score = ref()
</script>

<style></style>
