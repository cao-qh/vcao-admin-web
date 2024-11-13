<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="编码" name="bianma">
        <a-input
          v-model:value.trim="formState.bianma"
          placeholder="请输入"
          disabled
        />
      </a-form-item>
      <a-form-item label="名称" name="mingcheng">
        <a-input
          v-model:value.trim="formState.mingcheng"
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
      <a-form-item label="权重(%)" name="quanzhong">
        <a-input
          v-model:value.trim="formState.quanzhong"
          placeholder="请输入"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/VideoManager/VideoSmallClass'

defineOptions({ name: 'Edit' })

defineProps({
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

const rules = {
  bianma: [{ required: true, message: '请输入' }],
  mingcheng: [{ required: true, message: '请输入' }],
  quanzhong: [{ required: true, message: '请选择' }],
  shangjiBianma: [{ required: true, message: '请选择' }],
}

const formRef = ref()
const formState = reactive<any>({})

const show = async (row: any) => {
  open.value = true
  formState.id = row.id
  formState.bianma = row.bianma
  formState.mingcheng = row.mingcheng
  formState.shangjiBianma = row.shangjiBianma
  formState.quanzhong = row.quanzhong
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
