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
        <template v-if="column.dataIndex === 'shangXiaJia'">
          <a-popconfirm
            title="确定要上下架吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="handelShangxiajia(row)"
          >
            <a-switch :checked="row.shangXiaJia === 1" />
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
      :shangXiaJia="shangXiaJia"
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
import { reqGoods, reqShangxiajia } from '@/api/goods'
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

const fanyongStatus2 = [
  {
    value: 1,
    label: '首充',
  },
  {
    value: 2,
    label: '激活',
  },
]

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

const operate = ref<any>([])

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
    label: '自拟套餐名称',
    filed: 'packageNickname',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '上级套餐编码',
    filed: 'goodsCode',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '返佣类型',
    filed: 'fanyongId',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      value: '',
      label: '全部',
    },
    options: async () => {
      const res: any = await reqFanyongType()
      if (res.code == 0) {
        fanyongStatus.value = res.data.map((item: any) => {
          return {
            value: item.id,
            label: item.name,
          }
        })
      }
      return fanyongStatus.value
    },
  },
  {
    type: 'select',
    label: '运营商',
    filed: 'operateId',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      value: '',
      label: '全部',
    },
    options: async () => {
      const res: any = await reqOperator()
      if (res.code == 0) {
        operate.value = res.data.map((item: any) => {
          return {
            value: item.id,
            label: item.name,
          }
        })
      }
      return operate.value
    },
  },
  {
    type: 'select',
    label: '省份',
    filed: 'provinceId',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      value: '',
      label: '全部',
    },
    options: async () => {
      const res: any = await reqProvince()
      if (res.code == 0) {
        province.value = res.data.map((item: any) => {
          return {
            value: item.id,
            label: item.name,
          }
        })
      }
      return province.value
    },
  },
  {
    type: 'select',
    label: '启禁用',
    filed: 'del',
    hidden: userStore.level != 0,
    value: null,
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
    filed: 'shangXiaJia',
    value: null,
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
    title: '套餐图片',
    dataIndex: 'goodspic',
    align: 'center',
    width: '100px',
  },
  {
    title: '自拟套餐名称',
    dataIndex: 'packageNickname',
    align: 'center',
  },
  {
    title: '上级套餐名称',
    dataIndex: 'goodsName',
    align: 'center',
  },
  {
    title: '启禁用',
    dataIndex: 'del',
    align: 'center',
    customRender: ({ text }: { text: any }) => {
      const item: any = del.find((item) => item.value === text)
      return h('span', { style: { color: item.color } }, item.label)
    },
  },
  {
    title: '返佣状态',
    dataIndex: 'fanyongStatus',
    align: 'center',
    customRender: ({ text }: { text: any }) => {
      return fanyongStatus2.find((item: any) => item.value === text)?.label
    },
  },
  {
    title: '运营商',
    dataIndex: 'operateId',
    align: 'center',
    customRender: ({ text }: { text: any }) => {
      return operate.value.find((item: any) => item.value === text)?.label
    },
  },

  {
    title: '抓单sku编码',
    dataIndex: 'goodsSku',
    align: 'center',
  },
  {
    title: '套餐佣金(元)',
    dataIndex: 'goodsPrice',
    align: 'center',
  },
  {
    title: '套餐价格(元)',
    dataIndex: 'price',
    align: 'center',
  },
  {
    title: '是否需要证件照',
    dataIndex: 'picjudge',
    align: 'center',
    customRender: ({ text }: { text: any }) => {
      return text && (text == 1 ? '需要' : '不需要')
    },
  },
  // {
  //   title: '是否选号',
  //   dataIndex: 'phonelibs',
  //   align: 'center',
  //   customRender: ({ text }: { text: any }) => {
  //     return text && (text == 1 ? '选号' : '不选号')
  //   },
  // },
  {
    title: '省份',
    dataIndex: 'provinceIdName',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    align: 'center',
  },
  {
    title: '套餐介绍',
    dataIndex: 'goodsDe',
    align: 'center',
  },
  {
    title: '我的佣金',
    dataIndex: 'myYongJin',
    align: 'center',
  },
  // {
  //   title: '号池',
  //   dataIndex: 'tphonepoolId',
  //   align: 'center',
  // },
  {
    title: '上下架',
    dataIndex: 'shangXiaJia',
    align: 'center',
    customRender: ({ text }: { text: any }) => {
      const item: any = shangXiaJia.find((item) => item.value === text)
      return h('span', { style: { color: item.color } }, item.label)
    },
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

  const res: any = await reqGoods(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.total,
    }
  }
}

// 启禁用
// const handelQqijinyong = async (row: any) => {
//   const result: any = await reqQijinyong({
//     id: row.id,
//     del: row.del === 1 ? 2 : 1,
//   })
//   if (result.code == 200) {
//     message.success(result.message)
//   } else {
//     message.error(result.message)
//   }
// }

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
