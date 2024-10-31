<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
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
import { reqEdit } from '@/api/table/search/index'

defineOptions({ name: 'Edit' })

defineProps({
  scoreType: {
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
  jflx: [{ required: true, message: '请选择' }],
  jf: [{ required: true, message: '请输入' }],
  zdjf: [{ required: true, message: '请输入' }],
  zgjf: [{ required: true, message: '请输入' }],
  gg: [{ required: true, message: '请选择' }],
}

const show = async (row: any) => {
  open.value = true
  formState.jflx = row.jflx
  formState.jf = row.jf
  formState.zdjf = row.zdjf
  formState.zgjf = row.zgjf
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
