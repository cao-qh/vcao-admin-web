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
      <a-form-item label="名称" name="mc">
        <a-input-password
          v-model:value.trim="formState.mc"
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
      <a-form-item label="点赞数" name="dzs">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.dzs"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="转发数" name="zfs">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.zfs"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="浏览数" name="lls">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.lls"
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
      <a-form-item label="总集数" name="zjs">
        <a-input-number
          :min="0"
          v-model:value.trim="formState.zjs"
          placeholder="请输入"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="推荐" name="tj">
        <a-input v-model:value.trim="formState.tj" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="更新状态" name="gxzt">
        <a-select v-model:value="formState.gxzt" placeholder="请选择">
          <a-select-option
            v-for="item in updateStatus"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="演员导演" name="yydy">
        <a-select
          v-model:value="formState.yydy"
          placeholder="请选择"
          mode="multiple"
        >
          <a-select-option :value="1">周星驰</a-select-option>
          <a-select-option :value="2">朱茵</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="类别" name="yydy">
        <a-select
          v-model:value="formState.yydy"
          placeholder="请选择"
          mode="multiple"
        >
          <a-select-option :value="1">大类1</a-select-option>
          <a-select-option :value="2">大类2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="简介" name="jj">
        <a-textarea v-model:value.trim="formState.jj" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="剧情介绍" name="jqjs">
        <a-textarea v-model:value.trim="formState.jqjs" placeholder="请输入" />
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
  updateStatus: {
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
