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
      <template #toolbar>
        <a-popconfirm
          title="确定导出？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleDownload"
        >
          <a-button type="primary">导出</a-button>
        </a-popconfirm>
      </template>
    </STable>
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import STable from '@/components/STable/index.vue'
import { collectDaySelect, collectDayDownload } from '@/api/agent/collect'
import { reqGoodsBianma } from '@/api/common'
import { message } from 'ant-design-vue'
import dayjs, { Dayjs } from 'dayjs'

defineOptions({
  name: 'Collect',
})

const guishudi = {
  2: '分省',
}

const operate = {
  1: '移动',
  2: '联通',
  3: '电信',
  4: '全网',
}

onMounted(() => {})

let kaishiDate = ref(dayjs().format('YYYY-MM-DD'))
let jieshuDate = ref(dayjs().format('YYYY-MM-DD'))

const formItems = reactive([
  /* {
    type: 'datePicker',
    label: '开始时间',
    filed: 'kaishiDate',
    value: kaishiDate,
    disabledDate: (val: Dayjs) => {
      return (
        val < dayjs(jieshuDate.value).subtract(31, 'days') ||
        val > dayjs(jieshuDate.value)
      )
    },
    valueFormat: 'YYYY-MM-DD',
    placeholder: '请选择',
  },
  {
    type: 'datePicker',
    label: '结束时间',
    filed: 'jieshuDate',
    value: jieshuDate,
    disabledDate: (val: Dayjs) => {
      return val > dayjs().endOf('year')
    },
    valueFormat: 'YYYY-MM-DD',
    placeholder: '请选择',
    onChange: (date: string) => {
      console.log(date)
      if (
        dayjs(kaishiDate.value) > dayjs(date) ||
        dayjs(kaishiDate.value).add(31, 'days') < dayjs(date)
      ) {
        kaishiDate.value = dayjs(date).startOf('day').format('YYYY-MM-DD')
      }
    },
  }, */
  {
    type: 'select',
    label: '产品编码',
    filed: 'chanpinbianma',
    value: '',
    placeholder: '请选择',
    defaultOption: {
      value: '',
      label: '全部',
    },
    options: async () => {
      const res = await reqGoodsBianma()
      if (res.code === 0) {
        return Object.keys(res.data).map((key) => {
          return {
            value: res.data[key]?.chanPinBianMa,
            label:
              res.data[key]?.chanPinName + ' - ' + res.data[key]?.chanPinBianMa,
          }
        })
      } else {
        return []
      }
    },
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
  // {
  //   type: 'select',
  //   label: '归属地',
  //   filed: 'guishudi',
  //   value: 1,
  //   placeholder: '请选择',
  //   defaultOption: {
  //     value: 1,
  //     label: '全国',
  //   },
  //   options: async () => {
  //     return Object.keys(guishudi).map((key) => {
  //       return {
  //         value: key,
  //         label: guishudi[key],
  //       }
  //     })
  //   },
  // },
  {
    type: 'input',
    label: '归属地',
    filed: 'guishudi',
    value: '',
    placeholder: '请输入',
  },
])

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '产品编码',
    dataIndex: 'chanpinbianma',
    align: 'center',
  },
  {
    title: '产品名称',
    dataIndex: 'mingcheng',
    align: 'center',
  },
  {
    title: '资费',
    dataIndex: 'zifei',
    align: 'center',
  },
  {
    title: '校验成功',
    dataIndex: 'jiaoyanchenggong_num',
    align: 'center',
  },
  {
    title: '校验失败',
    dataIndex: 'jiaoyanshibai_num',
    align: 'center',
  },
  {
    title: '订购成功',
    dataIndex: 'shoulichenggong_num',
    align: 'center',
  },
  {
    title: '订购失败',
    dataIndex: 'shoulishibai_num',
    align: 'center',
  },
  {
    title: '未处理',
    dataIndex: 'weichuli_num',
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
  data.kaishiDate = kaishiDate
  data.jieshuDate = jieshuDate

  const res: any = await collectDaySelect(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.totalSize,
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

// 导出
const handleDownload = async () => {
  const params = {}
  formItems.forEach((i: any) => {
    params[i.filed] = i.value
  })
  const result: any = await collectDayDownload(params)
  if (result.code == 0) {
    message.success(result.msg)
  } else {
    message.error(result.msg)
  }
}
</script>

<style></style>
