<template>
  <a-modal title="添加" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item label="积分类型" name="jflx">
        <a-select v-model:value="formState.jflx" placeholder="请选择">
          <a-select-option
            v-for="item in scoreType"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="积分" name="jf">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.jf"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="最低积分" name="zdjf">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.zdjf"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="最高积分" name="zgjf">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.zgjf"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="广告" name="gg">
        <a-select v-model:value="formState.gg" placeholder="请选择">
          <a-select-option
            v-for="item in scoreType"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqAdd } from '@/api/table/search/index'

defineOptions({ name: 'Add' })

// 定义方法
const $emit = defineEmits(['success'])

defineProps({
  scoreType: {
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
  jflx: [{ required: true, message: '请选择' }],
  jf: [{ required: true, message: '请输入' }],
  zdjf: [{ required: true, message: '请输入' }],
  zgjf: [{ required: true, message: '请输入' }],
  gg: [{ required: true, message: '请选择' }],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    jflx: '',
    jf: '',
    zdjf: '',
    zgjf: '',
    gg: '',
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
