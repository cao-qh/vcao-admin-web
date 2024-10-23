<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="锁方式" name="sfs">
        <a-select v-model:value="formState.sfs" placeholder="请选择">
          <a-select-option
            v-for="item in lockType"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-if="formState.sfs == 1" label="广告" name="gg">
        <a-input v-model:value.trim="formState.gg" placeholder="请输入" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/table/search/index'

defineOptions({ name: 'Edit' })

// 定义方法
const $emit = defineEmits(['success'])

// 属性
defineProps({
  lockType: {
    type: Array<any>,
    default: () => [],
  },
})

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
  sfs: [{ required: true, message: '请输入' }],
  gg: [{ required: true, message: '请输入' }],
}

const show = async (row: any) => {
  open.value = true
  formState.sfs = row.sfs
  formState.gg = row.gg
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
