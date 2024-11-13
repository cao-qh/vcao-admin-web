<template>
  <a-modal title="添加" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
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
      <a-form-item label="启禁用" name="zhuangtai">
        <a-radio-group v-model:value="formState.zhuangtai">
          <a-radio-button
            v-for="item in qijinyong"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-radio-button>
        </a-radio-group>
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
import { reqAdd } from '@/api/VideoManager/VideoActor'
import UploadImage from '@/components/UploadImage/index.vue'

defineOptions({ name: 'Add' })

defineProps({
  role: {
    type: Array<any>,
    default: () => [],
  },
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
  mingzi: [{ required: true, message: '请输入' }],
  juese: [{ required: true, message: '请选择' }],
  zhuangtai: [{ required: true, message: '请选择' }],
  fileTX: [{ required: true, message: '请选择' }],
  xinxi: [{ required: true, message: '请输入' }],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    mingzi: '',
    juese: '',
    zhuangtai: 1,
    fileTX: null,
    xinxi: '',
  })
  formRef.value?.clearValidate()
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('formState :>> ', formState)
    const formData = new FormData()
    formData.append('mingzi', formState.mingzi)
    formData.append('juese', formState.juese)
    formData.append('zhuangtai', formState.zhuangtai)
    formData.append('fileTX', formState.fileTX)
    formData.append('xinxi', formState.xinxi)
    const res = await reqAdd(formData)
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
