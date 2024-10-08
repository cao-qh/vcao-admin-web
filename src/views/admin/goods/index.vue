<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()" />

    <STable
      ref="table"
      :columns="columns"
      :showPagination="true"
      :data="getData"
      :scroll="{ y: 'calc(100vh - 290px)' }"
    >
      <template #toolbar>
        <a-button
          type="primary"
          @click="() => add.show()"
          v-has="'Btn.Goods.Add'"
        >
          <PlusOutlined />
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'qijinyong'">
          <a-popconfirm
            :title="`确定要${row.qijinyong == 2 ? '启' : '禁'}用吗？`"
            ok-text="是"
            cancel-text="否"
            @confirm="handelQijinyong(row)"
            :disabled="!userStore.hasPermission('Switch.Goods.Enable')"
          >
            <a-switch
              :checked="row.qijinyong === 1"
              :disabled="!userStore.hasPermission('Switch.Goods.Enable')"
            />
          </a-popconfirm>
        </template>
        <template v-if="column.dataIndex === 'shangxiajia'">
          <a-popconfirm
            :title="`确定要${row.shangxiajia == 2 ? '上' : '下'}架吗？`"
            ok-text="是"
            cancel-text="否"
            @confirm="handelShangxiajia(row)"
            :disabled="!userStore.hasPermission('Switch.Goods.UpDown')"
          >
            <a-switch
              :checked="row.shangxiajia === 1"
              :disabled="!userStore.hasPermission('Switch.Goods.UpDown')"
            />
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
            <a @click="() => edit.show(row)" v-has="'Btn.Goods.Update'">修改</a>
            <br />
            <a
              v-has="'Btn.Goods.DetailQuery'"
              @click="
                () => {
                  editDetail.show(row)
                }
              "
            >
              产品详情
            </a>
            <br />
            <a @click="() => config.show(row)" v-has="'Btn.Goods.ConfigAgent'">
              配置代理
            </a>
          </div>
        </template>
      </template>
    </STable>

    <Add
      ref="add"
      :del="del"
      :shangxiajia="shangXiaJia"
      :operate="operate"
      :guishudi="guishudi"
      @success="table.refresh()"
    />

    <Edit
      ref="edit"
      :operate="operate"
      :guishudi="guishudi"
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
import { reactive, ref } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import STable from '@/components/STable/index.vue'
import { selectGoods, reqUseBan, reqShangxiajia } from '@/api/admin/goods'
import EditDetail from './modules/EditDetail.vue'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import Config from './modules/Config.vue'
import { message } from 'ant-design-vue'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()

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

const guishudi = [
  '北京市',
  '天津市',
  '上海市',
  '重庆市',
  '河北省',
  '山西省',
  '辽宁省',
  '吉林省',
  '黑龙江省',
  '江苏省',
  '浙江省',
  '安徽省',
  '福建省',
  '江西省',
  '山东省',
  '河南省',
  '湖北省',
  '湖南省',
  '广东省',
  '海南省',
  '四川省',
  '贵州省',
  '云南省',
  '陕西省',
  '甘肃省',
  '青海省',
  '台湾省',
  '内蒙古自治区',
  '广西壮族自治区',
  '西藏自治区',
  '宁夏回族自治区',
  '新疆维吾尔自治区',
  '香港特别行政区',
  '澳门特别行政区',
]

const operate: any = {
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
    type: 'select',
    label: '归属地',
    filed: 'guishudi',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      value: '',
      label: '全国',
    },
    options: async () => {
      return guishudi.map((item) => {
        return {
          value: item,
          label: item,
        }
      })
    },
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
    title: '编号',
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
    title: '产品名称',
    dataIndex: 'mingcheng',
    align: 'center',
  },
  {
    title: '产品编号',
    dataIndex: 'bianma',
    align: 'center',
  },
  {
    title: '运营商',
    dataIndex: 'yunyingshang',
    align: 'center',
    customRender(obj: any) {
      return operate[obj.text]
    },
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
const handelQijinyong = async (row: any) => {
  const result: any = await reqUseBan({
    id: row.id,
    qijinyong: row.qijinyong === 1 ? 2 : 1,
  })
  if (result.code == 0) {
    table.value.refresh()
    message.success(result.msg)
  } else {
    message.error(result.msg)
  }
}

// 上下架
const handelShangxiajia = async (row: any) => {
  const result: any = await reqShangxiajia({
    id: row.id,
    shangxiajia: row.shangxiajia === 1 ? 2 : 1,
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
