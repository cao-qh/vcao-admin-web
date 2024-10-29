<template>
  <a-modal
    title="添加"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :body-style="{ maxHeight: '580px', overflow: 'auto' }"
  >
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item label="缩略图" name="slt">
        <UploadImage v-model:value="formState.slt" />
      </a-form-item>
      <a-form-item label="视频章节名称" name="mc">
        <a-input-password
          v-model:value.trim="formState.mc"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="视频链接" name="splj">
        <a-input-password
          v-model:value.trim="formState.splj"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="普通价格" name="ptjg">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.ptjg"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="会员价格" name="hyjg">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.hyjg"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="权重" name="qz">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.qz"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="PID" name="pid">
        <a-input v-model:value.trim="formState.pid" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="视频播放云服务文件ID" name="spbfysfwjid">
        <a-input
          v-model:value.trim="formState.spbfysfwjid"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="云点播ID" name="ydbid">
        <a-input v-model:value.trim="formState.ydbid" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="视频合集编码" name="sphjbm">
        <a-input v-model:value.trim="formState.sphjbm" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="内容" name="nr">
        <a-textarea v-model:value.trim="formState.nr" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="上下架" name="sxj">
        <a-radio-group v-model:value="formState.sxj">
          <a-radio-button
            v-for="item in shangxiajia"
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
import { reqAdd } from '@/api/table/search/index'
import UploadImage from '@/components/UploadImage/index.vue'

defineOptions({ name: 'Add' })

defineProps({
  shangxiajia: {
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
  bm: [{ required: true, message: '请输入' }],
  mc: [{ required: true, message: '请输入' }],
  qz: [{ required: true, message: '请选择' }],
  dl: [{ required: true, message: '请选择' }],
  qjy: [{ required: true, message: '请选择' }],
}

const show = () => {
  open.value = true
  Object.assign(formState, {
    bm: '',
    mc: '',
    qz: '',
    dl: '',
    qjy: '',
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
