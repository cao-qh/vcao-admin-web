<template>
  <PageWrapper>
    <SearchForm :formItems="formItems" @search="table.refresh()"></SearchForm>

    <STable
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="reqData"
      :showPagination="true"
      :scroll="{ y: 'calc(100vh - 450px)' }"
    >
      <template #toolbar>
        <a-button
          v-has="'Btn.HomeSetting.Add'"
          type="primary"
          @click="() => add.show()"
        >
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'tupian'">
          <a-image :width="50" :src="baseUrl + row.tupian" />
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a v-has="'Btn.HomeSetting.Update'" @click="() => edit.show(row)">
            修改
          </a>
          <a-divider type="vertical"></a-divider>
          <a-popconfirm
            title="确定删除吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="handleDelete(row)"
          >
            <a v-has="'Btn.HomeSetting.Delete'">删除</a>
          </a-popconfirm>
        </template>
      </template>
    </STable>

    <Add
      ref="add"
      :position="position"
      :jumpType="jumpType"
      :videoCollectionList="videoCollectionList"
      :videoChapterList="videoChapterList"
      :adList="adList"
      @success="table.refresh()"
    />

    <Edit
      ref="edit"
      :position="position"
      :jumpType="jumpType"
      :videoCollectionList="videoCollectionList"
      :videoChapterList="videoChapterList"
      :adList="adList"
      @success="table.refresh()"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import { reqSearch, reqDelete } from '@/api/AppConfig/HomeSetting'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import { message } from 'ant-design-vue'
import { reqVideoCollection, reqAd, reqVideoChapter } from '@/api/common'

const baseUrl = import.meta.env.VITE_SERVE

// 位置
const position: any = [
  {
    value: 1,
    label: '首页',
  },
  {
    value: 2,
    label: '追剧页',
  },
]

// 跳转类型
const jumpType: any = [
  {
    value: 1,
    label: '短剧',
  },
  {
    value: 2,
    label: '广告',
  },
]

const formItems = reactive([
  {
    type: 'select',
    label: '位置',
    field: 'weizhi',
    value: '',
    placeholder: '请输入',
    options: position,
    defaultOption: {
      label: '全部',
      value: '',
    },
  },
  {
    type: 'select',
    label: '跳转类型',
    field: 'tiaozhuanleixing',
    value: '',
    placeholder: '请选择',
    options: jumpType,
    defaultOption: {
      label: '全部',
      value: '',
    },
  },
])

const columns = [
  {
    title: '图片',
    dataIndex: 'tupian',
    align: 'center',
  },
  {
    title: '权重',
    dataIndex: 'quanzhong',
    align: 'center',
  },
  {
    title: '跳转类型',
    dataIndex: 'tiaozhuanleixing',
    align: 'center',
    customRender: ({ text }: any) => {
      const item = jumpType.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '视频合集编码',
    dataIndex: 'shipinhejibianma',
    align: 'center',
  },
  {
    title: '视频章节编码',
    dataIndex: 'shipinzhangjiebianma',
    align: 'center',
  },
  {
    title: '广告编码',
    dataIndex: 'guanggaobianma',
    align: 'center',
  },
  {
    title: '位置',
    dataIndex: 'weizhi',
    align: 'center',
    customRender: ({ text }: any) => {
      const item = position.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    align: 'center',
  },
]

const videoCollectionList = ref([])
const videoChapterList = ref([])
const adList = ref([])

onMounted(async () => {
  const [res1, res2, res3] = await Promise.all([
    reqVideoCollection(),
    reqVideoChapter(),
    reqAd(),
  ])

  if (res1.code == 0) {
    videoCollectionList.value = res1.data
  }
  if (res2.code == 0) {
    videoChapterList.value = res2.data
  }
  if (res3.code == 0) {
    adList.value = res3.data
  }
})

const reqData = async (currentPage: number, pageSize: number) => {
  const data: any = {
    currentPage,
    pageSize,
  }

  formItems.forEach((item) => {
    if (item.value) {
      data[item.field] = item.value
    }
  })

  const res: any = await reqSearch(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.total,
    }
  }
}

const handleDelete = async (row: any) => {
  const res = await reqDelete(row.id)
  if (res.code == 0) {
    table.value.refresh()
    message.success(res.msg)
  } else {
    message.error(res.msg)
  }
}

const table = ref()
// 添加记录
const add = ref()
// 修改
const edit = ref()
</script>

<style></style>
