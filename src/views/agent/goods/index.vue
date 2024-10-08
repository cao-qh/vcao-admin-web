<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()" />

    <STable
      ref="table"
      :columns="columns"
      :data="getData"
      :scroll="{ y: 'calc(100vh - 290px)' }"
      :showPagination="true"
    >
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'shangxiajia'">
          <a-popconfirm
            :title="`确定要${row.shangxiajia == 2 ? '上' : '下'}架吗？`"
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
          <a
            @click="
              () => {
                editDetail.show(row)
              }
            "
          >
            产品详情
          </a>
        </template>
      </template>
    </STable>

    <EditDetail ref="editDetail" @success="table.refresh()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import STable from '@/components/STable/index.vue'
import { reqGoods, reqShangxiajia } from '@/api/agent/goods'
import EditDetail from './modules/EditDetail.vue'
import { message } from 'ant-design-vue'

defineOptions({
  name: 'Goods',
})

const baseUrl = import.meta.env.VITE_SERVE

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

const operate = {
  1: '移动',
  2: '联通',
  3: '电信',
  4: '全网',
}

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
    title: '产品名称',
    dataIndex: 'shangjiMingcheng',
    align: 'center',
    width: '100px',
  },
  {
    title: '产品编号',
    dataIndex: 'shangjiBianma',
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
    dataIndex: 'qudaoshangBianmaMC',
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

  const res: any = await reqGoods(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.totalSize,
    }
  }
}

// 上下架
const handelShangxiajia = async (row: any) => {
  const result: any = await reqShangxiajia({
    id: row.id,
    chanpinBianma: row.bianma,
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
</script>

<style></style>
