<template>
  <a-modal title="修改" :open="open" @ok="submit" @cancel="open = false">
    <a-form ref="formRef" :model="formState" v-bind="layout">
      <a-form-item label="图片" name="tuPianFile">
        <UploadImage
          v-model:value.trim="formState.tuPianFile"
          placeholder="请输入"
        ></UploadImage>
      </a-form-item>
      <a-form-item label="权重" name="quanzhong">
        <a-input
          v-model:value.trim="formState.quanzhong"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="位置" name="weizhi">
        <a-select v-model:value="formState.weizhi" placeholder="请选择">
          <a-select-option
            v-for="item in position"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="跳转类型" name="tiaozhuanleixing">
        <a-select
          v-model:value="formState.tiaozhuanleixing"
          placeholder="请选择"
        >
          <a-select-option
            v-for="item in jumpType"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <template v-if="formState.tiaozhuanleixing == 1">
        <a-form-item label="视频合集编码" name="shipinhejibianma">
          <a-select
            v-model:value="formState.shipinhejibianma"
            placeholder="请选择"
          >
            <a-select-option
              v-for="item in videoCollectionList"
              :key="item.bm"
              :value="item.bm"
            >
              {{ item.mc }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="视频章节编码" name="shipinzhangjiebianma">
          <a-select
            v-model:value="formState.shipinzhangjiebianma"
            placeholder="请选择"
          >
            <a-select-option
              v-for="item in videoChapterList"
              :key="item.bianma"
              :value="item.bianma"
            >
              {{ item.mingcheng }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </template>
      <template v-if="formState.tiaozhuanleixing == 2">
        <a-form-item label="广告" name="guanggaobianma">
          <a-select
            v-model:value="formState.guanggaobianma"
            placeholder="请选择"
          >
            <a-select-option
              v-for="item in adList"
              :key="item.bianma"
              :value="item.bianma"
            >
              {{ item.mingcheng }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </template>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqEdit } from '@/api/AppConfig/HomeSetting'
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
  videoCollectionList: {
    type: Array<any>,
    default: () => [],
  },
  videoChapterList: {
    type: Array<any>,
    default: () => [],
  },
  adList: {
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

const show = async (row: any) => {
  open.value = true
  formState.id = row.id
  formState.tuPianFile = import.meta.env.VITE_SERVE + row.tupian
  formState.quanzhong = row.quanzhong
  formState.weizhi = row.weizhi
  formState.tiaozhuanleixing = row.tiaozhuanleixing
  formState.shipinhejibianma = row.shipinhejibianma
  formState.shipinzhangjiebianma = row.shipinzhangjiebianma
  formState.guanggaobianma = row.guanggaobianma
}

const submit = async () => {
  try {
    await formRef.value.validate()

    const formData = new FormData()
    formData.append('id', formState.id)
    if (typeof formState.tuPianFile == 'object') {
      formData.append('tuPianFile', formState.tuPianFile)
    }
    formData.append('quanzhong', formState.quanzhong)
    formData.append('weizhi', formState.weizhi)
    formData.append('tiaozhuanleixing', formState.tiaozhuanleixing)
    formData.append('shipinhejibianma', formState.shipinhejibianma)
    formData.append('shipinzhangjiebianma', formState.shipinzhangjiebianma)
    formData.append('guanggaobianma', formState.guanggaobianma)

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
