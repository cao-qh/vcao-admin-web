<template>
  <PageWrapper>
    <a-button
      v-has="`btn.Trademark.add`"
      style="margin-bottom: 8px"
      type="primary"
      @click="handleAdd"
    >
      <template #icon>
        <PlusOutlined />
      </template>
      添加品牌
    </a-button>

    <!-- 表格 -->
    <STable
      ref="table"
      row-key="id"
      :data="reqData"
      :columns="columns"
      :scroll="{ y: 'calc(100vh - 340px)' }"
      show-pagination
    >
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'logoUrl'">
          <a :href="row.logoUrl" target="_blank">
            <img style="width: 80px; height: 80px" :src="row.logoUrl" />
          </a>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a-button type="primary" size="small" @click="handleEdit(row)">
              <template #icon>
                <EditOutlined />
              </template>
            </a-button>
            <a-popconfirm
              :title="`确定删除${row.tmName}吗？`"
              ok-text="是"
              cancel-text="否"
              @confirm="handleDelete(row.id)"
            >
              <a-button type="primary" size="small" danger>
                <template #icon>
                  <DeleteOutlined />
                </template>
              </a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </STable>

    <AddOrEdit ref="addOrEdit" @success="table.refresh()" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqHasTrademark, reqDeleteTradeMark } from '@/api/product/trademark'
import AddOrEdit from './modules/AddOrEdit.vue'
import type { TradeMarkResponseData } from '@/api/product/trademark/type'
import STable from '@/components/STable/index.vue'
import type { TradeMark } from '@/api/product/trademark/type'

// 定义组件名
defineOptions({ name: 'Trademark' })

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '品牌名称',
    dataIndex: 'tmName',
    align: 'center',
  },
  {
    title: '品牌LOGO',
    dataIndex: 'logoUrl',
    align: 'center',
  },
  {
    title: '品牌操作',
    dataIndex: 'action',
    align: 'center',
  },
]
const table = ref()

const reqData = async (page: number, limit: number) => {
  const res: TradeMarkResponseData = await reqHasTrademark(page, limit)
  if (res.code == 200) {
    return {
      data: res.data.records,
      total: res.data.total,
    }
  }
}

const addOrEdit = ref()

// 处理添加
const handleAdd = () => {
  addOrEdit.value.show()
}

// 处理编辑
const handleEdit = (row: TradeMark) => {
  addOrEdit.value.show(row)
}

// 处理删除
const handleDelete = async (id: number) => {
  const res = await reqDeleteTradeMark(id)
  if (res.code == 200) {
    message.success(res.message)
    // 重新获取数据
    table.value.refresh()
    return true
  } else {
    message.error(res.message)
  }
}
</script>
