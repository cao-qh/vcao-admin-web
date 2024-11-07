<template>
  <a-modal
    title="添加"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :width="880"
    :bodyStyle="{ maxHeight: '500px', overflow: 'auto' }"
  >
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-row>
        <a-col :xs="24" :sm="12">
          <a-form-item label="视频合集编码" name="shipinhejibianma">
            <a-input
              v-model:value.trim="formState.shipinhejibianma"
              placeholder="请输入"
              disabled
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="视频章节名称" name="mingcheng">
            <a-input
              v-model:value.trim="formState.mingcheng"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="视频链接" name="shipinlianjie">
            <a-input
              v-model:value.trim="formState.shipinlianjie"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="普通价格" name="pujia">
            <a-input-number
              :min="0"
              v-model:value.trim="formState.pujia"
              placeholder="请输入"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="会员价格" name="huiyuanjia">
            <a-input-number
              :min="0"
              v-model:value.trim="formState.huiyuanjia"
              placeholder="请输入"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="权重" name="quanzhong">
            <a-input-number
              :min="0"
              v-model:value.trim="formState.quanzhong"
              placeholder="请输入"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="PID" name="pid">
            <a-input v-model:value.trim="formState.pid" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="云播服务文件ID" name="wenjianId">
            <a-input
              v-model:value.trim="formState.wenjianId"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="云点播ID" name="yundianboId">
            <a-input
              v-model:value.trim="formState.yundianboId"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="12">
          <a-form-item label="内容" name="neirong">
            <a-textarea
              v-model:value.trim="formState.neirong"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="上下架" name="shangxiajia">
            <a-radio-group v-model:value="formState.shangxiajia">
              <a-radio-button
                v-for="item in shangxiajia"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12">
          <a-form-item label="缩略图" name="fileSLT">
            <UploadImage v-model:value="formState.fileSLT" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqAddChapter } from '@/api/VideoManager/VideoCollection'
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
  mingcheng: [{ required: true, message: '请输入' }],
  fileSLT: [{ required: true, message: '请选择' }],
  pujia: [{ required: true, message: '请输入' }],
  huiyuanjia: [{ required: true, message: '请输入' }],
  shipinlianjie: [{ required: true, message: '请输入' }],
  shangxiajia: [{ required: true, message: '请选择' }],
  quanzhong: [{ required: true, message: '请输入' }],
  neirong: [{ required: true, message: '请输入' }],
  yundianboId: [{ required: true, message: '请输入' }],
  shipinhejibianma: [{ required: true, message: '请输入' }],
}

const show = (shipinhejibianma: string) => {
  open.value = true
  Object.assign(formState, {
    shipinhejibianma: shipinhejibianma,
    mingcheng: '',
    fileSLT: null,
    pujia: '',
    huiyuanjia: '',
    shipinlianjie: '',
    shangxiajia: 1,
    quanzhong: '',
    neirong: '',
    pid: '',
    wenjianId: '',
    yundianboId: '',
  })
  formRef.value?.clearValidate()
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('formState :>> ', formState)

    const formData = new FormData()
    formData.append('mingcheng', formState.mingcheng)
    formData.append('fileSLT', formState.fileSLT)
    formData.append('pujia', formState.pujia)
    formData.append('huiyuanjia', formState.huiyuanjia)
    formData.append('shipinlianjie', formState.shipinlianjie)
    formData.append('shangxiajia', formState.shangxiajia)
    formData.append('quanzhong', formState.quanzhong)
    formData.append('neirong', formState.neirong)
    formData.append('yundianboId', formState.yundianboId)
    formData.append('wenjianId', formState.wenjianId)
    formData.append('pid', formState.pid)
    formData.append('shipinhejibianma', formState.shipinhejibianma)

    const res = await reqAddChapter(formData)
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
