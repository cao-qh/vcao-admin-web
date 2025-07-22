<template>
  <div>
    <STable
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="reqData"
      :showPagination="false"
      :scroll="{ y: 'calc(100vh - 340px)' }"
    >
      <template #toolbar="{ dataSource }">
        <a-button
          v-if="dataSource.length < 2"
          v-has="'Btn.TreasureboxAndLottery.Add'"
          type="primary"
          @click="() => add.show()"
        >
          添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'action'">
          <a
            v-has="'Btn.TreasureboxAndLottery.Update'"
            @click="() => edit.show(row)"
          >
            修改
          </a>
          <a-divider type="vertical"></a-divider>
          <a-popconfirm
            title="确定删除吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="handleDelete(row.id)"
          >
            <a v-has="'Btn.TreasureboxAndLottery.Delete'">删除</a>
          </a-popconfirm>
        </template>
      </template>
    </STable>

    <Add
      ref="add"
      :adList="adList"
      :jifenleixing="jifenleixing"
      @success="table.refresh()"
    />

    <Edit
      ref="edit"
      :adList="adList"
      :jifenleixing="jifenleixing"
      @success="table.refresh()"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { STable } from '@/components/STable'
import { reqSearch, reqDelete } from '@/api/ScoreManager/TreasureboxAndLottery'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import { message } from 'ant-design-vue'
import { reqAd } from '@/api/common'

defineOptions({ name: 'TreasureboxAndLottery' })

const jifenleixing = [
  {
    value: 1,
    label: '开宝箱',
  },
  {
    value: 2,
    label: '开心抽抽',
  },
]

const columns = [
  {
    title: '积分类型',
    dataIndex: 'jifenleixing',
    align: 'center',
    customRender: ({ text }: any) => {
      return jifenleixing.find((item) => item.value == text)?.label
    },
  },
  {
    title: '广告编码',
    dataIndex: 'guanggaobianma',
    align: 'center',
  },
  {
    title: '最低积分',
    dataIndex: 'zuidijifen',
    align: 'center',
  },
  {
    title: '最高积分',
    dataIndex: 'zuigaojifen',
    align: 'center',
  },

  {
    title: '抽抽次数',
    dataIndex: 'chouchoucishu',
    align: 'center',
  },
  {
    title: '开宝箱时长',
    dataIndex: 'kaibaoxiangshichang',
    align: 'center',
  },
  {
    title: '广告设置',
    dataIndex: 'tguanggaoShezhi',
    align: 'center',
    customRender: ({ text }: any) => {
      return text.mingcheng
    },
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    align: 'center',
  },
]

const adList = ref([])

onMounted(async () => {
  const res: any = await reqAd()
  if (res.code == 0) {
    adList.value = res.data.map((item: any) => {
      return {
        label: item.mingcheng,
        value: item.bianma,
      }
    })
  }
})

const reqData = async () => {
  const res: any = await reqSearch()
  if (res.code == 0) {
    return {
      data: res.data,
      total: res.data.length,
    }
  } else {
    return {
      data: [],
    }
  }
}

const handleDelete = async (id: any) => {
  const res = await reqDelete(id)
  if (res.code == 0) {
    message.success(res.msg)
    table.value.refresh()
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
