<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout" :rules="rules">
      <a-form-item label="图片" name="tp">
        <UploadImage
          v-model:value.trim="formState.tp"
          placeholder="请输入"
        ></UploadImage>
      </a-form-item>
      <a-form-item label="权重" name="qz">
        <a-input v-model:value.trim="formState.qz" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="位置" name="wz">
        <a-select v-model:value="formState.wz" placeholder="请选择">
          <a-select-option
            v-for="item in position"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="跳转类型" name="tzlx">
        <a-select v-model:value="formState.tzlx" placeholder="请选择">
          <a-select-option
            v-for="item in jumpType"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <template v-if="formState.tzlx == 1">
        <a-form-item label="视频合集编码" name="sphjbm">
          <a-input v-model:value.trim="formState.sphjbm" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="视频章节编码" name="spzjbm">
          <a-input v-model:value.trim="formState.sphjbm" placeholder="请输入" />
        </a-form-item>
      </template>
      <template v-if="formState.tzlx == 2">
        <a-form-item label="广告" name="gg">
          <a-input v-model:value.trim="formState.gg" placeholder="请输入" />
        </a-form-item>
      </template>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/table/search/index'
import UploadImage from '@/components/UploadImage/index.vue'

defineOptions({ name: 'Edit' })

// 属性
defineProps({
  position: {
    type: Array<any>,
    default: () => [],
  },
  jumpType: {
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
  tp: [{ required: true, message: '请选择' }],
  qz: [{ required: true, message: '请输入' }],
  wz: [{ required: true, message: '请选择' }],
  tzlx: [{ required: true, message: '请选择' }],
  sphjbm: [{ required: true, message: '请输入' }],
  spzjbm: [{ required: true, message: '请输入' }],
  gg: [{ required: true, message: '请输入' }],
}

const show = async (row: any) => {
  open.value = true
  formState.tp = row.tp
  formState.qz = row.qz
  formState.wz = row.wz
  formState.tjlx = row.tjlx
  formState.tzlx = row.tzlx
  formState.sphjbm = row.sphjbm
  formState.spzjbm = row.spzjbm
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
