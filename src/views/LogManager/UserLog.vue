<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()" />

    <STable
      ref="table"
      :columns="columns"
      :data="getData"
      :scroll="{ y: 'calc(100vh - 420px)' }"
      :showPagination="true"
    ></STable>
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import STable from '@/components/STable/index.vue'
import { reqSearch } from '@/api/table/search/index'
import dayjs, { Dayjs } from 'dayjs'

defineOptions({
  name: 'User-Log',
})

onMounted(() => {})

const typeList: any = {
  1: '接口模板',
  2: '参数模板',
  3: '管理员',
  4: '分销商',
  5: '产品',
  6: '订单',
  7: '个人信息',
}

const actionList: any = {
  1: '登录',
  2: '添加',
  3: '修改',
  4: '删除',
  5: '配置',
  6: '下载',
  7: '跳转',
}

let kaiShiDate = ref(dayjs().format('YYYY-MM-DD'))
let jieShuDate = ref(dayjs().format('YYYY-MM-DD'))

const formItems = reactive([
  {
    type: 'datePicker',
    label: '开始时间',
    filed: 'kaiShiDate',
    value: kaiShiDate,
    disabledDate: (val: Dayjs) => {
      return (
        val < dayjs(jieShuDate.value).subtract(31, 'days') ||
        val > dayjs(jieShuDate.value)
      )
    },
    valueFormat: 'YYYY-MM-DD',
    placeholder: '请选择',
  },
  {
    type: 'datePicker',
    label: '结束时间',
    filed: 'jieShuDate',
    value: jieShuDate,
    disabledDate: (val: Dayjs) => {
      return val > dayjs().endOf('year')
    },
    valueFormat: 'YYYY-MM-DD',
    placeholder: '请选择',
    onChange: (date: string) => {
      console.log(date)
      if (
        dayjs(kaiShiDate.value) > dayjs(date) ||
        dayjs(kaiShiDate.value).add(31, 'days') < dayjs(date)
      ) {
        kaiShiDate.value = dayjs(date).startOf('day').format('YYYY-MM-DD')
      }
    },
  },
  {
    type: 'input',
    label: '日志详情',
    filed: 'xiangqing',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '日志类型',
    filed: 'leixing',
    value: 0,
    placeholder: '请选择',
    defaultOption: {
      value: 0,
      label: '全部',
    },
    options: async () => {
      return Object.keys(typeList).map((key: any) => {
        return {
          value: key,
          label: typeList[key],
        }
      })
    },
  },
  {
    type: 'select',
    label: '操作',
    filed: 'zhuangtai',
    value: 0,
    placeholder: '请选择',
    defaultOption: {
      value: 0,
      label: '全部',
    },
    options: async () => {
      return Object.keys(actionList).map((key) => {
        return {
          value: key,
          label: actionList[key],
        }
      })
    },
  },
])

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '日志类型',
    dataIndex: 'leixing',
    align: 'center',
    customRender({ text }: any) {
      return typeList[text]
    },
  },
  {
    title: '操作',
    dataIndex: 'zhuangtai',
    align: 'center',
    customRender({ text }: any) {
      return actionList[text]
    },
  },
  {
    title: '日志内容',
    dataIndex: 'xiangqing',
    align: 'center',
    width: 400,
  },
  {
    title: 'IP',
    dataIndex: 'ipS',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'chuangjianshijian',
    align: 'center',
  },
]

const table = ref()
const getData = async (currentPage: number, pageSize: number) => {
  const data: any = {
    currentPage,
    pageSize,
  }
  formItems.forEach((item) => {
    data[item.filed] = item.value
  })

  const res: any = await reqSearch(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.totalSize,
    }
  }
}
</script>

<style></style>
