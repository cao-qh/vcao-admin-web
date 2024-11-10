<template>
  <a-modal
    title="修改"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :body-style="{ maxHeight: '580px', overflow: 'auto' }"
  >
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="积分类型" name="jifenleixing">
        <a-select v-model:value="formState.jifenleixing" placeholder="请选择">
          <a-select-option
            v-for="item in jifenleixing"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="时长" name="shichang">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.shichang"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <template v-if="formState.jifenleixing === 2">
        <a-form-item label="最低积分" name="zuidijifen">
          <a-input-number
            :min="0"
            v-model:value.trim="formState.zuidijifen"
            placeholder="请输入"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="最高积分" name="zuigaojifen">
          <a-input-number
            :min="0"
            v-model:value.trim="formState.zuigaojifen"
            placeholder="请输入"
            style="width: 100%"
          />
        </a-form-item>
      </template>
      <a-form-item
        v-if="formState.jifenleixing === 1"
        label="积分"
        name="jifen"
      >
        <a-input-number
          :min="0"
          v-model:value.trim="formState.jifen"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/ScoreManager/ViewScore'

defineOptions({ name: 'Edit' })

// 属性
defineProps({
  jifenleixing: {
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
  jifen: [{ required: true, message: '请输入' }],
  shichang: [{ required: true, message: '请输入' }],
  zuidijifen: [{ required: true, message: '请输入' }],
  zuigaojifen: [{ required: true, message: '请输入' }],
  jifenleixing: [{ required: true, message: '请选择' }],
}

const show = async (row: any) => {
  open.value = true
  formState.jifen = row.jifen
  formState.shichang = row.shichang
  formState.zuidijifen = row.zuidijifen
  formState.zuigaojifen = row.zuigaojifen
  formState.jifenleixing = row.jifenleixing
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
