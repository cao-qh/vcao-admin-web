<template>
  <a-modal
    title="修改"
    :open="open"
    @ok="submit"
    @cancel="open = false"
    :width="880"
    :bodyStyle="{ maxHeight: '500px', overflow: 'auto' }"
  >
    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-row>
        <a-col :xs="24" :sm="12">
          <a-form-item label="编码" name="bianma">
            <a-input
              v-model:value.trim="formState.bianma"
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
import { reqEditChapter } from '@/api/VideoManager/VideoCollection'
import UploadImage from '@/components/UploadImage/index.vue'

defineOptions({ name: 'Edit' })

// 定义方法
const $emit = defineEmits(['success'])

defineProps({
  shangxiajia: {
    type: Array<any>,
    default: () => [],
  },
})

const open = ref<boolean>(false)
const baseUrl = import.meta.env.VITE_SERVE

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

const formRef = ref()
const formState = reactive<any>({})

const show = async (bianma: string, row: any) => {
  open.value = true
  formState.id = row.id
  formState.bianma = row.bianma
  formState.shipinhejibianma = bianma
  formState.mingcheng = row.mingcheng
  formState.fileSLT = baseUrl + row.suoluetu
  formState.pujia = row.pujia
  formState.huiyuanjia = row.huiyuanjia
  formState.shipinlianjie = row.shipinlianjie
  formState.shangxiajia = row.shangxiajia
  formState.quanzhong = row.quanzhong
  formState.neirong = row.neirong
  formState.yundianboId = row.yundianboId
  formState.pid = row.pid
  formState.wenjianId = row.wenjianId
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const formData = new FormData()
    formData.append('id', formState.id)
    formData.append('bianma', formState.bianma)
    formData.append('shipinhejibianma', formState.shipinhejibianma)
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

    const res = await reqEditChapter(formData)
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
