<template>
  <a-modal title="添加" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item label="名称" name="mingcheng">
        <a-input
          v-model:value.trim="formState.mingcheng"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="权重(%)" name="quanzhong">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.quanzhong"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="大类" name="shangjiBianma">
        <a-select v-model:value="formState.shangjiBianma" placeholder="请选择">
          <a-select-option
            v-for="item in largeClassList"
            :value="item.value"
            :key="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="启禁用" name="qijinyong">
        <a-radio-group v-model:value="formState.qijinyong">
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
import { reqAdd } from '@/api/VideoManager/VideoSmallClass'

defineOptions({ name: 'Add' })

defineProps({
  qijinyong: {
    type: Array<any>,
    default: () => [],
  },
  largeClassList: {
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
  mingcheng: [{ required: true, message: '请输入' }],
  quanzhong: [{ required: true, message: '请选择' }],
  shangjiBianma: [{ required: true, message: '请选择' }],
  qijinyong: [{ required: true, message: '请选择' }],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    mingcheng: '',
    quanzhong: 0,
    shangjiBianma: null,
    qijinyong: 1,
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
