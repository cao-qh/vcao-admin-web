<template>
  <a-modal title="添加" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item label="编码" name="bm">
        <a-input v-model:value.trim="formState.bm" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="名称" name="mc">
        <a-input-password
          v-model:value.trim="formState.mc"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="权重" name="qz">
        <a-input-password
          v-model:value.trim="formState.qz"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="大类" name="qz">
        <a-select v-model:value="formState.dl" placeholder="请选择">
          <a-select-option value="1">大类1</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="启禁用" name="qjy">
        <a-radio-group v-model:value="formState.qjy">
          <a-radio-button
            v-for="item in qijinyong"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqAdd } from '@/api/table/search/index'

defineOptions({ name: 'Add' })

defineProps({
  qijinyong: {
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
  bm: [{ required: true, message: '请输入' }],
  mc: [{ required: true, message: '请输入' }],
  qz: [{ required: true, message: '请选择' }],
  dl: [{ required: true, message: '请选择' }],
  qjy: [{ required: true, message: '请选择' }],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    bm: '',
    mc: '',
    qz: '',
    dl: '',
    qjy: '',
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
