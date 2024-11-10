<template>
  <PageWrapper>
    <template v-if="!chapter.open">
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
        :scroll="{ x: 1500, y: 'calc(100vh - 480px)' }"
      >
        <template #toolbar>
          <a-button
            v-has="'Btn.VideoCollection.Add'"
            type="primary"
            @click="() => add.show()"
          >
            添加
          </a-button>
        </template>
        <template #bodyCell="{ column, row }">
          <template v-if="column.dataIndex === 'suoluetu'">
            <a-image
              :width="50"
              :src="baseUrl + row.suoluetu + `?time=${dayjs().format('x')}`"
            />
          </template>
          <template v-if="column.dataIndex === 'jianjie'">
            <a-popover>
              <template #content>
                <p>{{ row.jianjie }}</p>
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
                {{ row.jianjie }}
              </span>
            </a-popover>
          </template>
          <template v-if="column.dataIndex === 'juqingjieshao'">
            <a-popover>
              <template #content>
                <p>{{ row.juqingjieshao }}</p>
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
                {{ row.juqingjieshao }}
              </span>
            </a-popover>
          </template>
          <template v-if="column.dataIndex === 'shangxiajia'">
            <a-popconfirm
              v-if="userStore.hasButton('Btn.VideoCollection.UpDown')"
              title="确定要修改吗？"
              ok-text="是"
              cancel-text="否"
              @confirm="handelUpDown(row)"
            >
              <a-switch :checked="row.shangxiajia === 1" />
            </a-popconfirm>
            <span v-else>
              {{
                shangxiajia.find((item) => item.value === row.shangxiajia)
                  ?.label
              }}
            </span>
          </template>
          <template v-if="column.dataIndex === 'action'">
            <a
              v-has="'Btn.VideoCollection.Update'"
              @click="() => edit.show(row)"
            >
              修改
            </a>
            <span v-has="'Btn.VideoCollection.ConfigActor'">
              <a-divider type="vertical" />
              <a @click="() => configActor.show(row)">演员配置</a>
            </span>
            <span v-has="'Btn.VideoCollection.ConfigSmallClass'">
              <a-divider type="vertical" />
              <a @click="() => configSmallClass.show(row)">小类配置</a>
            </span>
            <span v-has="'Btn.VideoCollection.Chapter'">
              <a-divider type="vertical" />
              <a @click="handleChapter(row.bianma)">视频章节</a>
            </span>
            <span v-has="'Btn.VideoCollection.ConfigShowClass'">
              <a-divider type="vertical" />
              <a @click="() => configShowClass.show(row)">展示类别配置</a>
            </span>
          </template>
        </template>
      </STable>

      <Add
        ref="add"
        :shangxiajia="shangxiajia"
        :updateStatus="updateStatus"
        :recommend="recommend"
        :actorRoleList="actorRoleList"
        :smallClassList="smallClassList"
        @success="table.refresh()"
      />

      <Edit
        ref="edit"
        :updateStatus="updateStatus"
        :recommend="recommend"
        @success="table.refresh()"
      />

      <ConfigActor ref="configActor" @success="table.refresh()" />

      <ConfigSmallClass ref="configSmallClass" @success="table.refresh()" />

      <ConfigShowClass ref="configShowClass" @success="table.refresh()" />
    </template>
    <VideoChapter
      v-else
      @back="chapter.open = false"
      :shangxiajia="shangxiajia"
      :bianma="chapter.bianma"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { reqSearch, reqUpDown } from '@/api/VideoManager/VideoCollection'
import { STable } from '@/components/STable'
import { message } from 'ant-design-vue'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import useUserStore from '@/store/modules/user'
import VideoChapter from './components/VideoChapter/index.vue'
import { reqSmallClass, reqActorRole } from '@/api/common'
import dayjs from 'dayjs'
import ConfigActor from './modules/ConfigActor.vue'
import ConfigSmallClass from './modules/ConfigSmallClass.vue'
import ConfigShowClass from './modules/ConfigShowClass.vue'

const userStore = useUserStore()

// 是否再视频章节
const chapter = reactive({
  open: false,
  bianma: '',
})
const baseUrl = import.meta.env.VITE_SERVE

// 上下架
const shangxiajia = [
  {
    value: 1,
    label: '上架',
  },
  {
    value: 2,
    label: '下架',
  },
]

// 推荐
const recommend = [
  {
    value: 1,
    label: '推荐',
  },
  {
    value: 2,
    label: '不推荐',
  },
]

// 更新状态
const updateStatus = [
  {
    value: 1,
    label: '更新',
  },
  {
    value: 2,
    label: '完结',
  },
]

const formItems = reactive([
  {
    type: 'input',
    label: '名称',
    field: 'mingcheng',
    value: '',
    placeholder: '请输入',
  },
  {
    type: 'select',
    label: '上下架',
    field: 'shangxiajia',
    value: 0,
    placeholder: '请输入',
    options: shangxiajia,
    defaultOption: {
      value: 0,
      label: '全部',
    },
  },
  {
    type: 'select',
    label: '推荐',
    field: 'tuijian',
    value: 0,
    placeholder: '请输入',
    options: recommend,
    defaultOption: {
      value: 0,
      label: '全部',
    },
  },
  {
    type: 'select',
    label: '视频合集小类',
    field: 'xiaoleis',
    mode: 'multiple',
    value: [],
    placeholder: '请输入',
    options: async () => {
      const res = await reqSmallClass()
      if (res.code == 0) {
        smallClassList.value = res.data.map((item: any) => ({
          value: item.bm,
          label: item.mc,
        }))
      }
      return smallClassList.value
    },
    defaultOption: {
      value: '',
      label: '全部',
    },
  },
  {
    type: 'select',
    label: '更新状态',
    field: 'gengxinzhuangtai',
    value: 0,
    placeholder: '请输入',
    options: updateStatus,
    defaultOption: {
      value: 0,
      label: '全部',
    },
  },
])

const columns = [
  {
    title: '编码',
    dataIndex: 'bianma',
    align: 'center',
  },
  {
    title: '名称',
    dataIndex: 'mingcheng',
    align: 'center',
  },
  {
    title: '缩略图',
    dataIndex: 'suoluetu',
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
    title: '简介',
    dataIndex: 'jianjie',
    align: 'center',
  },
  {
    title: '剧情介绍',
    dataIndex: 'juqingjieshao',
    align: 'center',
  },
  {
    title: '推荐',
    dataIndex: 'tuijian',
    align: 'center',
    customRender: ({ text }: any) => {
      const item = recommend.find((item: any) => item.value == text)
      return item && item.label
    },
  },
  {
    title: '创建时间',
    dataIndex: 'chuangjianshijian',
    align: 'center',
  },
  {
    title: '点赞数',
    dataIndex: 'dianzan',
    align: 'center',
  },
  {
    title: '转发数',
    dataIndex: 'zhuanfa',
    align: 'center',
  },
  {
    title: '浏览数',
    dataIndex: 'liulanshu',
    align: 'center',
  },
  {
    title: '权重',
    dataIndex: 'quanzhong',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'gengxinshijian',
    align: 'center',
  },
  {
    title: '总集数',
    dataIndex: 'zongjishu',
    align: 'center',
  },
  {
    title: '更新状态',
    dataIndex: 'gengxinzhuangtai',
    align: 'center',
    customRender: ({ text }: any) => {
      const item = updateStatus.find((item: any) => item.value == text)
      return item && item.label
    },
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
    width: 240,
    fixed: 'right',
  },
]

const searchForm = ref()
const table = ref()
const actorRoleList = ref([])
const smallClassList = ref([])

onMounted(async () => {
  const res = await reqActorRole()
  if (res.code == 0) {
    actorRoleList.value = res.data
  }
})

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

// 启禁用
const handelUpDown = async (row: any) => {
  const result = await reqUpDown({
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

const handleChapter = (bianma: string) => {
  chapter.bianma = bianma
  chapter.open = true
}

const add = ref()
const edit = ref()
const configActor = ref()
const configSmallClass = ref()
const configShowClass = ref()
</script>

<style></style>
