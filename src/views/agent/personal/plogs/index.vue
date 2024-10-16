<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()" />

    <STable
      ref="table"
      :columns="columns"
      :data="getData"
      :scroll="{ y: 'calc(100vh - 380px)' }"
      :showPagination="true"
    ></STable>
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import STable from '@/components/STable/index.vue'
import { selectUserLog } from '@/api/agent/personal'
import dayjs, { Dayjs } from 'dayjs'

defineOptions({
  name: 'User-Log',
})

onMounted(() => {})

const typeList = {
  1: '产品',
  2: '订单',
  3: '个人信息',
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
    filed: 'startTime',
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
    filed: 'endTime',
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
    label: '日志内容',
    filed: 'xiangqing',
    value: '',
    placeholder: '请输入',
  },
  /* {
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
      return Object.keys(typeList).map((key) => {
        return {
          value: key,
          label: typeList[key],
        }
      })
    },
  },
  {
    type: 'select',
    label: '操作类型',
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
  }, */
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
    customRender({ text }) {
      return typeList[text]
    },
  },
  {
    title: '日志内容',
    dataIndex: 'xiangqing',
    align: 'center',
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
    if (item.value) {
      data[item.filed] = item.value
    }
  })

  const res: any = await selectUserLog(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.totalSize,
    }
  }
}
</script>

<style></style>
