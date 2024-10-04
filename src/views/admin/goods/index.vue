<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()" />

    <STable
      ref="table"
      :columns="columns"
      :data="getData"
      :scroll="{ y: 'calc(100vh - 290px)' }"
    >
      <template #toolbar>
        <a-button type="primary" @click="() => add.show()">添加</a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'qijinyong'">
          <a-popconfirm
            :title="`确定要${row.qijinyong == 1 ? '启' : '禁'}用吗？`"
            ok-text="是"
            cancel-text="否"
            @confirm="handelQqijinyong(row)"
          >
            <a-switch :checked="row.qijinyong === 1" />
          </a-popconfirm>
        </template>
        <template v-if="column.dataIndex === 'shangxiajia'">
          <a-popconfirm
            :title="`确定要${row.shangxiajia == 1 ? '上' : '下'}架吗？`"
            ok-text="是"
            cancel-text="否"
            @confirm="handelShangxiajia(row)"
          >
            <a-switch :checked="row.shangxiajia === 1" />
          </a-popconfirm>
        </template>

        <template v-if="column.dataIndex === 'goodspic'">
          <a-image
            :src="baseUrl + row.goodspic"
            width="60px"
            height="60px"
          ></a-image>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <div>
            <div>
              <a @click="() => edit.show(row)">修改套餐</a>
              <br />
              <a
                @click="
                  () => {
                    editDetail.show(row)
                  }
                "
              >
                修改详情
              </a>
              <br />
            </div>

            <!-- <a v-partner @click="() => config.show(row)">配置</a> -->
          </div>
        </template>
      </template>
    </STable>

    <Add
      ref="add"
      :del="del"
      :shangxiajia="shangXiaJia"
      :fanyongStatus="fanyongStatus"
      :operate="operate"
      :phonePool="phonePool"
      :province="province"
      @success="table.refresh()"
    />

    <Edit
      ref="edit"
      :del="del"
      :shangXiaJia="shangXiaJia"
      :fanyongStatus="fanyongStatus"
      :operate="operate"
      :phonePool="phonePool"
      :province="province"
      @success="table.refresh()"
    />

    <EditDetail
      ref="editDetail"
      :disPlatform="disPlatform"
      @success="table.refresh()"
    />

    <Config ref="config" @success="table.refresh()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, h } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import STable from '@/components/STable/index.vue'
import { selectGoods } from '@/api/admin/goods'
import {
  reqProvince,
  reqFanyongType,
  reqOperator,
  // reqPhonePool,
} from '@/api/common'
import EditDetail from './modules/EditDetail.vue'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import Config from './modules/Config.vue'
import { message } from 'ant-design-vue'
import useUserStore from '@/store/modules/user'

defineOptions({
  name: 'Goods',
})

const baseUrl = import.meta.env.VITE_SERVE

const del = [
  {
    value: 1,
    label: '启用',
    color: 'green',
  },
  {
    value: 2,
    label: '禁用',
    color: 'red',
  },
]

const shangXiaJia = [
  {
    value: 1,
    label: '上架',
    color: 'green',
  },
  {
    value: 2,
    label: '下架',
    color: 'red',
  },
]
const guishudi = {
  2: '分省',
}

const operate = {
  1: '移动',
  2: '联通',
  3: '电信',
  4: '全网',
}

// 禁用平台
const disPlatform = [
  {
    value: 1,
    label: '抖店',
  },
  {
    value: 2,
    label: '快手小店',
  },
  {
    value: 3,
    label: '直播',
  },
  {
    value: 4,
    label: '信息流',
  },
  {
    value: 5,
    label: '拼多多',
  },
  {
    value: 6,
    label: '京东',
  },
  {
    value: 7,
    label: '天猫',
  },
  {
    value: 8,
    label: '线下',
  },
  {
    value: 9,
    label: '推广连接',
  },
  {
    value: 10,
    label: '其他',
  },
]

const phonePool = ref<any>([])

const fanyongStatus = ref<any>([])

// const operate = ref<any>([])

const province = ref<any>([])

onMounted(() => {
  // reqPhonePool().then((res: any) => {
  //   if (res.code == 0) {
  //     phonePool.value = res.data
  //   }
  // })
  if (userStore.level == 0) {
    columns.push({
      title: '操作',
      dataIndex: 'action',
      width: '100px',
      align: 'center',
    })
  }
})

const userStore = useUserStore()

const formItems = reactive([
  {
    type: 'input',
    label: '产品名称',
    filed: 'mingcheng',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '产品编码',
    filed: 'bianma',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '运营商',
    filed: 'yunyingshang',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      value: '',
      label: '全部',
    },
    options: async () => {
      return Object.keys(operate).map((key) => {
        return {
          value: key,
          label: operate[key],
        }
      })
    },
  },
  {
    type: 'input',
    label: '归属地',
    filed: 'guishudi',
    value: '',
    placeholder: '请输入',
    // placeholder: '请选择',
    // defaultOption: {
    //   value: 1,
    //   label: '全国',
    // },
    // options: async () => {
    //   return Object.keys(guishudi).map((key) => {
    //     return {
    //       value: key,
    //       label: guishudi[key],
    //     }
    //   })
    // },
  },
  {
    type: 'select',
    label: '启禁用',
    filed: 'qijinyong',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      label: '全部',
      value: '',
    },
    options: del,
  },
  {
    type: 'select',
    label: '上下架',
    filed: 'shangxiajia',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      label: '全部',
      value: '',
    },
    options: shangXiaJia,
  },
])

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '上级产品名称',
    dataIndex: 'shangjiMingcheng',
    align: 'center',
    width: '100px',
  },
  {
    title: '上级产品编号',
    dataIndex: 'shangjiBianma',
    align: 'center',
  },
  {
    title: '兴投产品名称',
    dataIndex: 'mingcheng',
    align: 'center',
  },
  {
    title: '兴投产品编号',
    dataIndex: 'bianma',
    align: 'center',
  },
  {
    title: '运营商',
    dataIndex: 'yunyingshang',
    align: 'center',
  },
  {
    title: '渠道商',
    dataIndex: 'qudaoshangBianma',
    align: 'center',
  },
  {
    title: '归属地',
    dataIndex: 'guishudi',
    align: 'center',
  },
  {
    title: '产品月费',
    dataIndex: 'dinggoujiage',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'chuangjianshijian',
    align: 'center',
  },
  {
    title: '修改时间',
    dataIndex: 'gengxinshijian',
    align: 'center',
  },
  {
    title: '启禁用',
    dataIndex: 'qijinyong',
    align: 'center',
  },
  {
    title: '上下架',
    dataIndex: 'shangxiajia',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: 100,
  },
]

const table = ref()
const getData = async (currentPage: number, pageSize: number) => {
  const data: any = {
    currentPage,
    pageSize,
  }
  formItems.forEach((item) => {
    if (item.value) {
      data[item.filed] = item.value
    }
  })

  const res: any = await selectGoods(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.totalSize,
    }
  }
}

// 启禁用
const handelQqijinyong = async (row: any) => {
  const result: any = await reqQijinyong({
    id: row.id,
    del: row.del === 1 ? 2 : 1,
  })
  if (result.code == 200) {
    message.success(result.message)
  } else {
    message.error(result.message)
  }
}

// 上下架
const handelShangxiajia = async (row: any) => {
  const result: any = await reqShangxiajia({
    goodsId: row.id,
    shangXiaJia: row.shangXiaJia === 1 ? 2 : 1,
  })
  if (result.code == 0) {
    table.value.refresh()
    message.success(result.msg)
  } else {
    message.error(result.msg)
  }
}

// 查看详情
const editDetail = ref()
// 添加
const add = ref()
// 修改
const edit = ref()
// 配置
const config = ref()
</script>

<style></style>
