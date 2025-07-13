<template>
  <div>
    <a-button type="primary" @click="$emit('back')" style="margin-bottom: 10px">
      返回
    </a-button>

    <SearchForm
      :formItems="formItems"
      @search="table.refresh()"
      @reset="handleReset"
    ></SearchForm>

    <STable
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="reqData"
      :showPagination="true"
      :scroll="{ y: 'calc(100vh - 408px)' }"
    >
      <template #toolbar>
        <a-button type="primary" @click="() => add.show(bianma)">添加</a-button>
        <a-button type="primary" @click="() => batchImport.show()">
          批量添加
        </a-button>
      </template>
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'neirong'">
          <a-popover>
            <template #content>
              <p style="word-break: break-all">
                {{ row.neirong }}
              </p>
            </template>
            <span
              style="
                display: inline-block;
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              {{ row.neirong }}
            </span>
          </a-popover>
        </template>
        <template v-if="column.dataIndex === 'suoluetu'">
          <a-image
            :width="50"
            :src="baseUrl + row.suoluetu + `?time=${dayjs().format('x')}`"
          />
        </template>
        <template v-if="column.dataIndex === 'shangxiajia'">
          <a-popconfirm
            title="确定要修改吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="handleUpDown(row)"
          >
            <a-switch :checked="row.shangxiajia === 1" />
          </a-popconfirm>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a @click="() => edit.show(bianma, row)">修改</a>

          <span>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确定删除吗？"
              ok-text="是"
              cancel-text="否"
              @confirm="handleDelete(row)"
            >
              <a>删除</a>
            </a-popconfirm>
          </span>
        </template>
      </template>
    </STable>

    <Add ref="add" :shangxiajia="shangxiajia" @success="table.refresh()" />

    <Edit ref="edit" :shangxiajia="shangxiajia" @success="table.refresh()" />

    <BatchImport ref="batchImport" @success="table.refresh()" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { STable } from '@/components/STable'
import {
  reqSearchChapter,
  reqUpDownChapter,
  reqDeleteChapter,
} from '@/api/VideoManager/VideoCollection'
import { message } from 'ant-design-vue'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import BatchImport from './modules/BatchImport.vue'
import dayjs from 'dayjs'

defineEmits(['back'])

const props = defineProps({
  shangxiajia: {
    type: Array<any>,
    default: () => [],
  },
  bianma: {
    type: String,
    default: '',
  },
})

const formItems = reactive([
  {
    type: 'input',
    label: '章节名称',
    field: 'mingcheng',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '上下架',
    field: 'shangxiajia',
    value: null,
    placeholder: '请输入',
    options: props.shangxiajia,
  },
])

const columns = [
  {
    title: '编码',
    dataIndex: 'bianma',
    align: 'center',
  },
  {
    title: '视频章节名称',
    dataIndex: 'mingcheng',
    align: 'center',
  },
  {
    title: '缩略图',
    dataIndex: 'suoluetu',
    align: 'center',
  },
  {
    title: '视频链接',
    dataIndex: 'shipinlianjie',
    align: 'center',
  },
  {
    title: '普通价格',
    dataIndex: 'pujia',
    align: 'center',
  },
  {
    title: '会员价格',
    dataIndex: 'huiyuanjia',
    align: 'center',
  },
  {
    title: '权重',
    dataIndex: 'quanzhong',
    align: 'center',
  },
  {
    title: '内容',
    dataIndex: 'neirong',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'chuangjianshijian',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'gengxinshijian',
    align: 'center',
  },
  {
    title: 'PID',
    dataIndex: 'pid',
    align: 'center',
  },
  {
    title: '云播服务文件ID',
    dataIndex: 'wenjianId',
    align: 'center',
  },
  {
    title: '云点播ID',
    dataIndex: 'yundianboId',
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
    fixed: 'right',
  },
]

const baseUrl = import.meta.env.VITE_SERVE

const table = ref()
const reqData = async (currentPage: number, pageSize: number) => {
  const data: any = {
    currentPage,
    pageSize,
    shipinhejibianma: props.bianma,
  }
  formItems.forEach((item) => {
    if (item.value) {
      data[item.field] = item.value
    }
  })

  const res: any = await reqSearchChapter(data)
  if (res.code == 0) {
    return {
      data: res.data.list,
      total: res.data.total,
    }
  }
}

// 启禁用
const handleUpDown = async (row: any) => {
  const result = await reqUpDownChapter({
    id: row.id,
    bianma: row.bianma,
    shangxiajia: row.shangxiajia === 1 ? 2 : 1,
  })
  if (result.code == 0) {
    message.success(result.msg)
    table.value.refresh()
  } else {
    message.error(result.msg)
  }
}

// 提单
const handleDelete = async (row: any) => {
  const data = {
    id: row.id,
    bianma: row.bianma,
    shipinhejibianma: props.bianma,
  }
  const res = await reqDeleteChapter(data)
  if (res.code == 0) {
    message.success(res.msg)
    table.value.refresh()
  } else {
    message.error(res.msg)
  }
}

const handleReset = () => {
  formItems.forEach((item) => {
    item.value = ''
  })
  table.value.refresh()
}

const add = ref()
const edit = ref()
const batchImport = ref()
</script>

<style></style>
