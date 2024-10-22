<template>
  <a-modal title="添加" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item label="广告名称" name="ggmc">
        <a-input v-model:value.trim="formState.ggmc" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="广告编码" name="ggbm">
        <a-input v-model:value.trim="formState.ggbm" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="广告类型" name="gglx">
        <a-select v-model:value="formState.gglx" placeholder="请选择">
          <a-select-option
            v-for="item in adType"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
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
import { reqAdd } from '@/api/table/search/index'

defineOptions({ name: 'Add' })

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
  ggbm: [{ required: true, message: '请输入' }],
  gglx: [{ required: true, message: '请选择' }],
  yxygspsc: [{ required: true, message: '请输入' }],
  ldyfhzt: [{ required: true, message: '请输入' }],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    ggmc: '',
    ggbm: '',
    gglx: undefined,
    yxygspsc: '',
    ldyfhzt: '',
  })
  formRef.value?.clearValidate()
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('formState :>> ', formState)
    const res = await reqAdd(formState)
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
