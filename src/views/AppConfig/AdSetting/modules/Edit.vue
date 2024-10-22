<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="广告类型" name="gglx">
        <a-select v-model:value="formState.gglx" placeholder="请选择" disabled>
          <a-select-option
            v-for="item in adType"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="广告名称" name="ggmc">
        <a-input v-model:value.trim="formState.ggmc" placeholder="请输入" />
      </a-form-item>
      <template v-if="formState.gglx == 1">
        <a-form-item label="有效观看视频时长" name="yxygspsc">
          <a-input
            v-model:value.trim="formState.yxygspsc"
            placeholder="请输入"
          />
        </a-form-item>
      </template>
      <template v-if="formState.gglx == 2">
        <a-form-item label="落地页返回状态" name="ldyfhzt">
          <a-input
            v-model:value.trim="formState.ldyfhzt"
            placeholder="请输入"
          />
        </a-form-item>
      </template>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/table/search/index'

defineOptions({ name: 'Edit' })

// 属性
defineProps({
  adType: {
    type: Array<any>,
    default: () => [],
  },
})

// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)

// 表单布局
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 13 },
  },
}

const formRef = ref()
const formState = reactive<any>({})

const rules = {
  ggmc: [{ required: true, message: '请输入' }],
  gglx: [{ required: true, message: '请选择' }],
  yxygspsc: [{ required: true, message: '请输入' }],
  ldyfhzt: [{ required: true, message: '请输入' }],
}

const show = async (row: any) => {
  open.value = true
  formState.ggmc = row.ggmc
  formState.gglx = row.gglx || 1
  formState.yxygspsc = row.yxygspsc
  formState.ldyfhzt = row.ldyfhzt
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const res = await reqEdit(formState)
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
