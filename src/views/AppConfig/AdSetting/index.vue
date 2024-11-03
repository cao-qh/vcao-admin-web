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
          v-has="'Btn.AdSetting.Add'"
          type="primary"
          @click="() => add.show()"
        >
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'shangxiajia'">
          <a-popconfirm
            v-if="userStore.hasPermission('Swh.AdSetting.UpDown')"
            title="确定要修改吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="handleUpDown(row)"
          >
            <a-switch :checked="row.shangxiajia === 1" />
          </a-popconfirm>
          <span v-else>
            {{ row.shangxiajia === 1 ? '上架' : '下架' }}
          </span>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a v-has="'Btn.AdSetting.Update'" @click="() => edit.show(row)">
            修改
          </a>
        </template>
      </template>
    </STable>

    <Add
      ref="add"
      :adType="adType"
      :status="status"
      @success="table.refresh()"
    />

    <Edit
      ref="edit"
      :adType="adType"
      :status="status"
      @success="table.refresh()"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import { reqSearch, reqUpDown } from '@/api/AppConfig/AdSetting'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import { message } from 'ant-design-vue'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()

// 广告类型
const adType: any = [
  {
    value: 1,
    label: '视频',
  },
  {
    value: 2,
    label: '落地页',
  },
]

// 落地页返回状态
const status: any = [
  {
    value: 1,
    label: '下单成功',
  },
  {
    value: 2,
    label: '订购成功',
  },
]

const formItems = reactive([
  {
    type: 'input',
    label: '广告名称',
    filed: 'mingcheng',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'input',
    label: '广告编码',
    filed: 'bianma',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '广告类型',
    filed: 'guanggaoleixing',
    value: '',
    placeholder: '请选择',
    options: adType,
    defaultOption: {
      label: '全部',
      value: '',
    },
  },
])

const columns = [
  {
    title: '广告名称',
    dataIndex: 'mingcheng',
    align: 'center',
  },
  {
    title: '广告编码',
    dataIndex: 'bianma',
    align: 'center',
  },
  {
    title: '广告类型',
    dataIndex: 'guanggaoleixing',
    align: 'center',
    customRender: ({ text }: { text: number }) => {
      return adType.find((item: any) => item.value == text)?.label
    },
  },
  {
    title: '落地页返回状态',
    dataIndex: 'luodiyefanhui',
    align: 'center',
    customRender: ({ text }: { text: number }) => {
      const item = status.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '有效观看视频时长',
    dataIndex: 'youxiaoshichang',
    align: 'center',
  },
  {
    title: '链接',
    dataIndex: 'guanggaolianjie',
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
    width: '100px',
    align: 'center',
  },
]

const reqData = async (currentPage: number, pageSize: number) => {
  const data: any = {
    currentPage,
    pageSize,
  }

  formItems.forEach((item) => {
    if (item.value) {
      data[item.filed] = item.value
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

// 上下架
const handleUpDown = async (row: any) => {
  const result = await reqUpDown({
    bianma: row.bianma,
    shangxiajia: row.shangxiajia === 1 ? 2 : 1,
  })
  if (result.code == 0) {
    table.value.refresh()
    message.success(result.msg)
  } else {
    message.error(result.msg)
  }
}

const table = ref()
// 添加记录
const add = ref()
// 修改
const edit = ref()
</script>

<style></style>
