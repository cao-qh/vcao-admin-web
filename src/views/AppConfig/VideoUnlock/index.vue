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
      :scroll="{ y: 'calc(100vh - 410px)' }"
    >
      <template #toolbar>
        <a-button
          v-has="'Btn.VideoUnlock.Add'"
          type="primary"
          @click="() => add.show()"
        >
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'action'">
          <a v-has="'Btn.VideoUnlock.Update'" @click="() => edit.show(row)">
            修改
          </a>
        </template>
      </template>
    </STable>

    <Add
      ref="add"
      :lockType="lockType"
      :adList="adList"
      :videoCollectionList="videoCollectionList"
      @success="table.refresh()"
    />

    <Edit
      ref="edit"
      :lockType="lockType"
      :adList="adList"
      :videoCollectionList="videoCollectionList"
      @success="table.refresh()"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import { reqSearch } from '@/api/AppConfig/VideoUnlock'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import { reqAd, reqVideoCollection } from '@/api/common'

// 表单
const searchForm = ref()
// 表格
const table = ref()
// 添加记录
const add = ref()
// 修改
const edit = ref()
// 广告列表
const adList = ref<any>([])
// 视频合集列表
const videoCollectionList = ref<any>([])

// 锁方式
const lockType = [
  {
    label: '支付',
    value: 1,
  },
  {
    label: '广告',
    value: 2,
  },
]

const formItems = reactive([
  {
    type: 'select',
    label: '解锁方式',
    field: 'jiesuofangshi',
    value: '',
    placeholder: '请选择',
    allowClear: false,
    options: lockType,
    onChange: (value: any) => {
      const item = searchForm.value.getFormItem('guanggaobianma')
      item.hidden = !(value == 2)
    },
    defaultOption: {
      label: '全部',
      value: '',
    },
  },
  {
    type: 'select',
    label: '广告编码',
    field: 'guanggaobianma',
    value: '',
    hidden: true,
    placeholder: '请选择',
    options: async () => {
      const res: any = await reqAd()
      if (res.code == 0) {
        adList.value = res.data.map((item: any) => {
          return {
            label: item.mingcheng,
            value: item.bianma,
          }
        })
        return adList.value
      }
    },
    defaultOption: {
      label: '全部',
      value: '',
    },
  },
  {
    type: 'select',
    label: '视频合集',
    field: 'hejibianma',
    value: '',
    placeholder: '请选择',
    options: async () => {
      const res: any = await reqVideoCollection()
      if (res.code == 0) {
        videoCollectionList.value = res.data.map((item: any) => {
          return {
            label: item.mc,
            value: item.bm,
          }
        })
        return videoCollectionList.value
      }
    },
    defaultOption: {
      label: '全部',
      value: '',
    },
  },
])

const columns = [
  {
    title: '解锁方式',
    dataIndex: 'jiesuofangshi',
    align: 'center',
    customRender: ({ text }: any) => {
      const item = lockType.find((item) => item.value == text)
      return item?.label
    },
  },
  {
    title: '广告',
    dataIndex: 'guanggaobianma',
    align: 'center',
    customRender: ({ text }: any) => {
      const item = adList.value.find((item: any) => item.value == text)
      return item?.label
    },
  },
  {
    title: '合集编码',
    dataIndex: 'hejibianma',
    align: 'center',
    customRender: ({ text }: any) => {
      const item = videoCollectionList.value.find(
        (item: any) => item.value == text,
      )
      return item?.label
    },
  },
  {
    title: '权重',
    dataIndex: 'quanzhong',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '100px',
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
</script>

<style></style>
