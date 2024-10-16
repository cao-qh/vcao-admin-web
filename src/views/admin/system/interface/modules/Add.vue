<template>
  <a-modal title="添加" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item label="名称" name="jiekouMingcheng">
        <a-input
          v-model:value.trim="formState.jiekouMingcheng"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="中文参数" name="zhongwen">
        <a-textarea
          v-model:value.trim="formState.zhongwen"
          placeholder="以-分隔，例如xx-xx-xx"
        ></a-textarea>
      </a-form-item>
      <a-form-item label="英文参数" name="yingwen">
        <a-textarea
          v-model:value.trim="formState.yingwen"
          placeholder="以-分隔，例如aa-bb-cc"
        ></a-textarea>
      </a-form-item>
      <a-form-item label="备注" name="beizhu">
        <a-textarea
          v-model:value.trim="formState.beizhu"
          placeholder="请输入"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqAdd } from '@/api/admin/system/interface'

defineOptions({ name: 'Add' })

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
  jiekouMingcheng: [{ required: true, message: '必填项' }],
  zhongwen: [{ required: true, message: '必填项' }],
  yingwen: [{ required: true, message: '必填项' }],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    jiekouMingcheng: '',
    zhongwen: '',
    yingwen: '',
  })
  formRef.value?.clearValidate()
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('formState :>> ', formState)
    const res: any = await reqAdd(formState)
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
