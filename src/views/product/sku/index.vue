<template>
  <PageWrapper>
    <STable
      ref="table"
      :columns="columns"
      row-key="id"
      :data="reqData"
      :scroll="{ y: 'calc(100vh - 300px)' }"
    >
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'skuDefaultImg'">
          <a :href="row.skuDefaultImg" target="_blank">
            <img style="width: 80px; height: 80px" :src="row.skuDefaultImg" />
          </a>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a-button
              type="primary"
              size="small"
              title="上架"
              @click="updateSale(row)"
            >
              <template #icon>
                <ArrowUpOutlined v-if="row.isSale === 1" />
                <ArrowDownOutlined v-else />
              </template>
            </a-button>
            <a-button
              type="primary"
              size="small"
              title="修改"
              @click="updateSku"
            >
              <template #icon>
                <EditOutlined />
              </template>
            </a-button>
            <a-button
              type="primary"
              size="small"
              title="查看SKU列表"
              @click="findSku(row)"
            >
              <template #icon>
                <InfoCircleOutlined />
              </template>
            </a-button>
            <a-popconfirm
              title="是否确认删除?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="deleteSpu(row.id)"
            >
              <a-button type="primary" size="small" title="删除SPU" danger>
                <template #icon>
                  <DeleteOutlined />
                </template>
              </a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </STable>

    <GoodsInfo ref="goodsInfo" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
//引入请求
import {
  reqSkuList,
  reqSaleSku,
  reqCancelSale,
  reqRemoveSku,
} from '@/api/product/sku'
import type { SkuResponseData, SkuData } from '@/api/product/sku/type'
import { message } from 'ant-design-vue'
import GoodsInfo from './modules/GoodsInfo.vue'
import STable from '@/components/STable/index.vue'

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
    width: '80px',
  },
  {
    title: '名称',
    dataIndex: 'skuName',
    align: 'center',
    width: '150px',
    ellipsis: {
      showTitle: true,
    },
  },
  {
    title: '描述',
    dataIndex: 'skuDesc',
    align: 'center',
    width: '150px',

    ellipsis: {
      showTitle: true,
    },
  },
  {
    title: '默认图片',
    dataIndex: 'skuDefaultImg',
    align: 'center',
    width: '150px',
  },
  {
    title: '重量(g)',
    dataIndex: 'weight',
    align: 'center',
    width: '150px',
  },
  {
    title: '价格(元)',
    dataIndex: 'price',
    align: 'center',
    width: '150px',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: '250px',
    fixed: 'right',
  },
]

const table = ref()

const reqData = async (page: number, limit: number) => {
  const res: SkuResponseData = await reqSkuList(page, limit)
  if (res.code == 200) {
    return {
      data: res.data.records,
      total: res.data.total,
    }
  }
}

//商品的上架与下架的操作
const updateSale = async (row: SkuData) => {
  //如果当前商品的isSale==1,说明当前商品是上架的额状态->更新为下架
  //否则else情况与上面情况相反
  if (row.isSale == 1) {
    //下架操作
    await reqCancelSale(row.id as number)
    //提示信息
    message.success('下架成功')
    //发请求获取当前更新完毕的全部已有的SKU
    table.value.refresh()
  } else {
    //下架操作
    await reqSaleSku(row.id as number)
    //提示信息
    message.success('上架成功')
    //发请求获取当前更新完毕的全部已有的SKU
    table.value.refresh()
  }
}

const updateSku = () => {
  message.success('正在开发中...')
}

const goodsInfo = ref()
const findSku = (row: SkuData) => {
  goodsInfo.value.show(row.id)
}

const deleteSpu = async (id: number) => {
  //删除某一个已有商品的情况
  let result: any = await reqRemoveSku(id)
  if (result.code == 200) {
    //提示信息
    message.success('删除成功')
    //获取已有全部商品
    table.value.refresh()
  } else {
    //删除失败
    message.error('删除失败')
  }
}
</script>
