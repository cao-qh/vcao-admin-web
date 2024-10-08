<template>
  <a-modal
    title="配置"
    :open="open"
    @ok="submit"
    width="800px"
    :bodyStyle="{ height: '600px', overflow: 'auto' }"
    @cancel="open = false"
  >
    <a-list item-layout="horizontal" :data-source="selectRows">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-flex wrap="wrap" gap="middle" align="center">
            <div>产品编码：{{ item.chanpinBianma }}</div>
            <div>代理编码：{{ item.dailiBianma }}</div>
            <div>
              <span>结算方式：</span>
              <a-select
                placeholder="请选择"
                style="width: 100px"
                v-model:value="item.jiesuanfangshi"
              >
                <a-select-option
                  v-for="sitem in settlement"
                  :key="sitem.value"
                  :value="sitem.value"
                >
                  {{ sitem.label }}
                </a-select-option>
              </a-select>
            </div>
            <div>
              <span>结算周期：</span>
              <a-select
                placeholder="请选择"
                style="width: 100px"
                v-model:value="item.jiesuanzhouqi"
              >
                <a-select-option
                  v-for="jitem in jiesuanzhouqi"
                  :key="jitem.value"
                  :value="jitem.value"
                >
                  {{ jitem.label }}
                </a-select-option>
              </a-select>
            </div>
            <a-flex align="center">
              <span>代理佣金金额：</span>
              <a-input-number
                :min="0"
                :precision="2"
                placeholder="请输入"
                style="width: 150px"
                v-model:value="item.dailiYongjinJine"
              >
                <template #addonAfter>
                  <span>元</span>
                </template>
              </a-input-number>
            </a-flex>
            <div>
              <span>上下架：</span>
              <a-radio-group v-model:value="item.shangxiajia">
                <a-radio-button :value="1">上架</a-radio-button>
                <a-radio-button :value="2">下架</a-radio-button>
              </a-radio-group>
            </div>
          </a-flex>
        </a-list-item>
      </template>
    </a-list>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqConfigProduct } from '@/api/admin/channel/agent'

defineOptions({ name: 'Config' })

defineProps<{
  settlement: any
  jiesuanzhouqi: any
}>()

// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)

const DLbianma = ref('')
const selectRows = ref<any>([])

const show = async (dlBianma: string, selectrows: any) => {
  open.value = true
  DLbianma.value = dlBianma
  selectRows.value = selectrows.map((item: any) => {
    return {
      chanpinBianma: item.chanpinBianma,
      dailiBianma: DLbianma.value,
      dailiYongjinJine: item.dailiYongjinJine || 0,
      shangxiajia: item.shangxiajia || 1,
      jiesuanfangshi: item.jiesuanfangshi || 1,
      jiesuanzhouqi: item.jiesuanzhouqi || 1,
    }
  })
}

const submit = async () => {
  try {
    const res = await reqConfigProduct(selectRows.value)
    if (res.code == 0) {
      $emit('success')
      open.value = false
      message.success(res.msg)
    } else {
      message.error(res.msg)
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}

defineExpose({
  show,
})
</script>
