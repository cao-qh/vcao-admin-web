<template>
  <a-modal
    :title="title"
    :open="open"
    :confirmLoading="loading"
    @ok="submit"
    @cancel="open = false"
  >
    <a-spin :spinning="loading">
      <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
        <a-form-item label="品牌名称" name="tmName">
          <a-input v-model:value="formState.tmName" />
        </a-form-item>
        <a-form-item label="品牌Logo" name="logoUrl">
          <a-upload
            v-model:file-list="fileList"
            name="file"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="/api/admin/product/fileUpload"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img
              v-if="formState.logoUrl"
              :src="formState.logoUrl"
              alt="avatar"
              style="width: 100px"
            />
            <div v-else>
              <loading-outlined v-if="uploadLoading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import type { TradeMark } from '@/api/product/trademark/type'
import { reqAddOrUpdateTradeMark } from '@/api/product/trademark'

defineOptions({ name: 'AddOrEdit' })
// 定义方法
const $emit = defineEmits(['success'])

const open = ref<boolean>(false)
const title = ref<string>('')
const loading = ref<boolean>(false)

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

interface FormState {
  id?: number
  logoUrl: string
  tmName: string
}

const formRef = ref<any>()
const formState = reactive<FormState>({
  logoUrl: '',
  tmName: '',
})

const rules = {
  tmName: [{ required: true, message: '请输入品牌名称' }],
  logoUrl: [{ required: true, message: '请上传品牌Logo' }],
}

const fileList = ref([])
const uploadLoading = ref<boolean>(false)

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  if (
    file.type == 'image/jpeg' ||
    file.type == 'image/png' ||
    file.type == 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 4) {
      return true
    } else {
      message.error('图片大小不能超过4M')
      return false
    }
  } else {
    message.error('上传格式为PNG|JPG|GIF')
    return false
  }
}

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'uploading') {
    uploadLoading.value = true
    return
  }
  if (info.file.status === 'done') {
    uploadLoading.value = false
    formState.logoUrl = info.file.response.data
  }
  if (info.file.status === 'error') {
    uploadLoading.value = false
    message.error('upload error')
  }
}

const show = (row: TradeMark) => {
  open.value = true
  Object.assign(formState, {
    id: 0,
    logoUrl: '',
    tmName: '',
  })

  formRef.value?.clearValidate()

  if (row) {
    // 修改
    title.value = '修改品牌'
    Object.assign(formState, row)
  } else {
    // 添加
    title.value = '添加品牌'
    console.log('添加')
  }
}

const submit = async () => {
  try {
    await formRef.value.validate()
    loading.value = true
    const res = await reqAddOrUpdateTradeMark(formState)
    loading.value = false
    if (res.code == 200) {
      $emit('success')
      open.value = false
      message.success(formState.id ? '修改成功' : '添加成功')
    } else {
      message.error(formState.id ? '修改失败' : '添加失败')
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}

defineExpose({
  show,
})
</script>

<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
