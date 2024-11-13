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
      <a-form-item label="姓名" name="mingzi">
        <a-input v-model:value.trim="formState.mingzi" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="角色" name="juese">
        <a-select v-model:value="formState.juese" placeholder="请选择">
          <a-select-option
            v-for="item in role"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="照片" name="fileTX">
        <UploadImage v-model:value="formState.fileTX" />
      </a-form-item>
      <a-form-item label="信息" name="xinxi">
        <a-textarea v-model:value.trim="formState.xinxi"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/VideoManager/VideoActor'
import UploadImage from '@/components/UploadImage/index.vue'

defineOptions({ name: 'Edit' })

defineProps({
  role: {
    type: Array<any>,
    default: () => [],
  },
})

// 定义方法
const $emit = defineEmits(['success'])

const baseUrl = import.meta.env.VITE_SERVE
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
  mingzi: [{ required: true, message: '请输入' }],
  juese: [{ required: true, message: '请选择' }],
  fileTX: [{ required: true, message: '请选择' }],
  xinxi: [{ required: true, message: '请选择' }],
}

const formRef = ref()
const formState = reactive<any>({})

const show = async (row: any) => {
  open.value = true
  formState.id = row.id
  formState.bianma = row.bianma
  formState.mingzi = row.mingzi
  formState.juese = row.juese
  formState.fileTX = baseUrl + row.zhaopian
  formState.xinxi = row.xinxi
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const formData = new FormData()
    formData.append('id', formState.id)
    formData.append('bianma', formState.bianma)
    formData.append('mingzi', formState.mingzi)
    formData.append('juese', formState.juese)
    formData.append('fileTX', formState.fileTX)
    formData.append('xinxi', formState.xinxi)

    const res = await reqEdit(formData)
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
